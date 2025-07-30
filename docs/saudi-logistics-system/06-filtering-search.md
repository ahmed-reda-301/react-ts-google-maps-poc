# Advanced Filtering and Search - Saudi Arabia System

## Overview

This file documents the comprehensive filtering and search system for the Saudi trip tracking system, enabling users to efficiently find and manage trucks, trips, and locations with advanced search capabilities.

## 1. Search Architecture

### Search Data Structure
```typescript
interface SearchableEntity {
  id: string;
  type: 'truck' | 'driver' | 'trip' | 'location' | 'alert';
  searchableFields: string[];
  metadata: Record<string, any>;
  lastUpdated: Date;
  searchScore?: number;
}

interface SearchIndex {
  entities: Map<string, SearchableEntity>;
  fieldIndex: Map<string, Set<string>>; // field -> entity IDs
  textIndex: Map<string, Set<string>>; // text -> entity IDs
  geoIndex: GeoSpatialIndex;
  lastIndexUpdate: Date;
}

interface SearchQuery {
  text?: string;
  filters: SearchFilters;
  sorting: SearchSorting;
  pagination: SearchPagination;
  geoFilter?: GeoFilter;
}

interface SearchFilters {
  // Truck filters
  truckStatus?: TruckStatus[];
  truckType?: TruckType[];
  plateNumber?: string;
  company?: string[];
  region?: string[];
  
  // Driver filters
  driverName?: string;
  driverLicense?: string;
  driverExperience?: NumberRange;
  
  // Trip filters
  tripStatus?: TripStatus[];
  origin?: string[];
  destination?: string[];
  departureDate?: DateRange;
  arrivalDate?: DateRange;
  cargoType?: string[];
  
  // Alert filters
  alertType?: AlertType[];
  alertSeverity?: AlertSeverity[];
  alertStatus?: AlertStatus[];
  
  // Location filters
  locationType?: LocationType[];
  operatingHours?: string[];
  capacity?: NumberRange;
  
  // Time filters
  timeRange?: DateRange;
  lastUpdate?: DateRange;
}

interface SearchSorting {
  field: string;
  direction: 'asc' | 'desc';
  secondarySort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

interface SearchPagination {
  page: number;
  pageSize: number;
  offset?: number;
}

interface GeoFilter {
  center: LatLng;
  radius: number; // meters
  bounds?: LatLngBounds;
  polygon?: LatLng[];
}
```

### Advanced Search Engine
```typescript
class AdvancedSearchEngine {
  private searchIndex: SearchIndex;
  private searchHistory: SearchQuery[] = [];
  private savedSearches: Map<string, SearchQuery> = new Map();
  private searchAnalytics: SearchAnalytics;

  constructor() {
    this.searchIndex = {
      entities: new Map(),
      fieldIndex: new Map(),
      textIndex: new Map(),
      geoIndex: new GeoSpatialIndex(),
      lastIndexUpdate: new Date()
    };
    this.searchAnalytics = new SearchAnalytics();
  }

  // Index entities for search
  indexEntity(entity: SearchableEntity): void {
    // Add to main index
    this.searchIndex.entities.set(entity.id, entity);

    // Index searchable fields
    entity.searchableFields.forEach(field => {
      const fieldValue = this.getFieldValue(entity, field);
      if (fieldValue) {
        if (!this.searchIndex.fieldIndex.has(field)) {
          this.searchIndex.fieldIndex.set(field, new Set());
        }
        this.searchIndex.fieldIndex.get(field)!.add(entity.id);

        // Index text content
        const textTokens = this.tokenizeText(fieldValue.toString());
        textTokens.forEach(token => {
          if (!this.searchIndex.textIndex.has(token)) {
            this.searchIndex.textIndex.set(token, new Set());
          }
          this.searchIndex.textIndex.get(token)!.add(entity.id);
        });
      }
    });

    // Index geographic data
    if (entity.metadata.location) {
      this.searchIndex.geoIndex.addPoint(entity.id, entity.metadata.location);
    }

    this.searchIndex.lastIndexUpdate = new Date();
  }

  // Perform advanced search
  async search(query: SearchQuery): Promise<SearchResult> {
    const startTime = performance.now();
    
    // Get candidate entity IDs
    let candidateIds = new Set<string>();
    
    // Text search
    if (query.text) {
      const textResults = this.performTextSearch(query.text);
      candidateIds = textResults;
    } else {
      // If no text search, start with all entities
      candidateIds = new Set(this.searchIndex.entities.keys());
    }

    // Apply filters
    candidateIds = this.applyFilters(candidateIds, query.filters);

    // Apply geo filter
    if (query.geoFilter) {
      candidateIds = this.applyGeoFilter(candidateIds, query.geoFilter);
    }

    // Convert to entities and calculate scores
    const entities = Array.from(candidateIds)
      .map(id => this.searchIndex.entities.get(id)!)
      .filter(entity => entity);

    // Calculate relevance scores
    entities.forEach(entity => {
      entity.searchScore = this.calculateRelevanceScore(entity, query);
    });

    // Sort results
    const sortedEntities = this.sortResults(entities, query.sorting);

    // Apply pagination
    const paginatedResults = this.paginateResults(sortedEntities, query.pagination);

    const endTime = performance.now();
    const searchTime = endTime - startTime;

    // Record search analytics
    this.searchAnalytics.recordSearch(query, paginatedResults.length, searchTime);

    // Add to search history
    this.searchHistory.unshift(query);
    if (this.searchHistory.length > 100) {
      this.searchHistory.pop();
    }

    return {
      results: paginatedResults,
      totalCount: sortedEntities.length,
      searchTime,
      query,
      suggestions: this.generateSearchSuggestions(query),
      facets: this.generateFacets(candidateIds)
    };
  }

  // Perform text search with fuzzy matching
  private performTextSearch(text: string): Set<string> {
    const tokens = this.tokenizeText(text);
    const results = new Set<string>();
    
    tokens.forEach(token => {
      // Exact match
      const exactMatches = this.searchIndex.textIndex.get(token);
      if (exactMatches) {
        exactMatches.forEach(id => results.add(id));
      }

      // Fuzzy match
      const fuzzyMatches = this.findFuzzyMatches(token);
      fuzzyMatches.forEach(matchToken => {
        const matches = this.searchIndex.textIndex.get(matchToken);
        if (matches) {
          matches.forEach(id => results.add(id));
        }
      });
    });

    return results;
  }

  // Apply search filters
  private applyFilters(candidateIds: Set<string>, filters: SearchFilters): Set<string> {
    const filteredIds = new Set<string>();

    candidateIds.forEach(id => {
      const entity = this.searchIndex.entities.get(id);
      if (!entity) return;

      // Apply type-specific filters
      switch (entity.type) {
        case 'truck':
          if (this.matchesTruckFilters(entity, filters)) {
            filteredIds.add(id);
          }
          break;
        case 'driver':
          if (this.matchesDriverFilters(entity, filters)) {
            filteredIds.add(id);
          }
          break;
        case 'trip':
          if (this.matchesTripFilters(entity, filters)) {
            filteredIds.add(id);
          }
          break;
        case 'location':
          if (this.matchesLocationFilters(entity, filters)) {
            filteredIds.add(id);
          }
          break;
        case 'alert':
          if (this.matchesAlertFilters(entity, filters)) {
            filteredIds.add(id);
          }
          break;
      }
    });

    return filteredIds;
  }

  // Match truck-specific filters
  private matchesTruckFilters(entity: SearchableEntity, filters: SearchFilters): boolean {
    const truck = entity.metadata as Truck;

    if (filters.truckStatus && !filters.truckStatus.includes(truck.status)) {
      return false;
    }

    if (filters.truckType && !filters.truckType.includes(truck.type)) {
      return false;
    }

    if (filters.plateNumber && !truck.plateNumber.toLowerCase().includes(filters.plateNumber.toLowerCase())) {
      return false;
    }

    if (filters.company && !filters.company.includes(truck.company?.id)) {
      return false;
    }

    if (filters.region && !filters.region.includes(truck.currentRegion)) {
      return false;
    }

    return true;
  }

  // Match driver-specific filters
  private matchesDriverFilters(entity: SearchableEntity, filters: SearchFilters): boolean {
    const driver = entity.metadata as Driver;

    if (filters.driverName && !driver.name.toLowerCase().includes(filters.driverName.toLowerCase())) {
      return false;
    }

    if (filters.driverLicense && !driver.licenseNumber.includes(filters.driverLicense)) {
      return false;
    }

    if (filters.driverExperience) {
      const experience = driver.experienceYears;
      if (experience < filters.driverExperience.min || experience > filters.driverExperience.max) {
        return false;
      }
    }

    return true;
  }

  // Calculate relevance score
  private calculateRelevanceScore(entity: SearchableEntity, query: SearchQuery): number {
    let score = 0;

    // Text relevance
    if (query.text) {
      score += this.calculateTextRelevance(entity, query.text);
    }

    // Recency boost
    const daysSinceUpdate = (Date.now() - entity.lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 10 - daysSinceUpdate); // Boost recent updates

    // Type-specific scoring
    switch (entity.type) {
      case 'truck':
        score += this.calculateTruckRelevance(entity, query);
        break;
      case 'trip':
        score += this.calculateTripRelevance(entity, query);
        break;
    }

    return score;
  }

  // Generate search suggestions
  private generateSearchSuggestions(query: SearchQuery): string[] {
    const suggestions: string[] = [];

    // Popular searches
    const popularSearches = this.searchAnalytics.getPopularSearches();
    suggestions.push(...popularSearches.slice(0, 3));

    // Auto-complete suggestions
    if (query.text && query.text.length > 2) {
      const autoComplete = this.generateAutoComplete(query.text);
      suggestions.push(...autoComplete.slice(0, 5));
    }

    // Filter-based suggestions
    const filterSuggestions = this.generateFilterSuggestions(query.filters);
    suggestions.push(...filterSuggestions.slice(0, 3));

    return [...new Set(suggestions)]; // Remove duplicates
  }

  // Save search for later use
  saveSearch(name: string, query: SearchQuery): void {
    this.savedSearches.set(name, query);
  }

  // Get saved searches
  getSavedSearches(): Map<string, SearchQuery> {
    return this.savedSearches;
  }

  // Get search history
  getSearchHistory(): SearchQuery[] {
    return this.searchHistory;
  }
}
```

## 2. Advanced Filtering Interface

### Multi-level Filter Component
```typescript
interface AdvancedFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableOptions: FilterOptions;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  availableOptions,
  showAdvanced,
  onToggleAdvanced
}) => {
  const [activeFilterGroup, setActiveFilterGroup] = useState<string>('trucks');
  const [filterPresets, setFilterPresets] = useState<FilterPreset[]>([]);

  // Update filters
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFiltersChange({});
  };

  // Apply filter preset
  const applyPreset = (preset: FilterPreset) => {
    onFiltersChange(preset.filters);
  };

  return (
    <div className="advanced-filters">
      {/* Filter header */}
      <div className="filters-header">
        <h3>Filters</h3>
        <div className="filter-actions">
          <button onClick={onToggleAdvanced}>
            {showAdvanced ? 'Simple' : 'Advanced'}
          </button>
          <button onClick={clearAllFilters}>Clear All</button>
        </div>
      </div>

      {/* Filter presets */}
      <div className="filter-presets">
        <h4>Quick Filters</h4>
        <div className="preset-buttons">
          <button onClick={() => applyPreset({ name: 'Active Trucks', filters: { truckStatus: ['moving', 'stopped'] } })}>
            Active Trucks
          </button>
          <button onClick={() => applyPreset({ name: 'Delayed Trips', filters: { tripStatus: ['delayed'] } })}>
            Delayed Trips
          </button>
          <button onClick={() => applyPreset({ name: 'Critical Alerts', filters: { alertSeverity: ['critical'] } })}>
            Critical Alerts
          </button>
          <button onClick={() => applyPreset({ name: 'Today\'s Trips', filters: { departureDate: { start: new Date(), end: new Date() } } })}>
            Today's Trips
          </button>
        </div>
      </div>

      {/* Filter groups */}
      <div className="filter-groups">
        <div className="filter-tabs">
          <button
            className={activeFilterGroup === 'trucks' ? 'active' : ''}
            onClick={() => setActiveFilterGroup('trucks')}
          >
            Trucks
          </button>
          <button
            className={activeFilterGroup === 'drivers' ? 'active' : ''}
            onClick={() => setActiveFilterGroup('drivers')}
          >
            Drivers
          </button>
          <button
            className={activeFilterGroup === 'trips' ? 'active' : ''}
            onClick={() => setActiveFilterGroup('trips')}
          >
            Trips
          </button>
          <button
            className={activeFilterGroup === 'alerts' ? 'active' : ''}
            onClick={() => setActiveFilterGroup('alerts')}
          >
            Alerts
          </button>
        </div>

        {/* Truck filters */}
        {activeFilterGroup === 'trucks' && (
          <div className="filter-group">
            <FilterSection title="Status">
              <MultiSelectFilter
                options={availableOptions.truckStatuses}
                selected={filters.truckStatus || []}
                onChange={(values) => updateFilter('truckStatus', values)}
                placeholder="Select truck status"
              />
            </FilterSection>

            <FilterSection title="Type">
              <MultiSelectFilter
                options={availableOptions.truckTypes}
                selected={filters.truckType || []}
                onChange={(values) => updateFilter('truckType', values)}
                placeholder="Select truck type"
              />
            </FilterSection>

            <FilterSection title="Plate Number">
              <TextFilter
                value={filters.plateNumber || ''}
                onChange={(value) => updateFilter('plateNumber', value)}
                placeholder="Enter plate number"
              />
            </FilterSection>

            <FilterSection title="Company">
              <MultiSelectFilter
                options={availableOptions.companies}
                selected={filters.company || []}
                onChange={(values) => updateFilter('company', values)}
                placeholder="Select company"
              />
            </FilterSection>

            <FilterSection title="Region">
              <MultiSelectFilter
                options={availableOptions.regions}
                selected={filters.region || []}
                onChange={(values) => updateFilter('region', values)}
                placeholder="Select region"
              />
            </FilterSection>
          </div>
        )}

        {/* Driver filters */}
        {activeFilterGroup === 'drivers' && (
          <div className="filter-group">
            <FilterSection title="Driver Name">
              <TextFilter
                value={filters.driverName || ''}
                onChange={(value) => updateFilter('driverName', value)}
                placeholder="Enter driver name"
              />
            </FilterSection>

            <FilterSection title="License Number">
              <TextFilter
                value={filters.driverLicense || ''}
                onChange={(value) => updateFilter('driverLicense', value)}
                placeholder="Enter license number"
              />
            </FilterSection>

            <FilterSection title="Experience (Years)">
              <RangeFilter
                min={0}
                max={50}
                value={filters.driverExperience || { min: 0, max: 50 }}
                onChange={(range) => updateFilter('driverExperience', range)}
              />
            </FilterSection>
          </div>
        )}

        {/* Trip filters */}
        {activeFilterGroup === 'trips' && (
          <div className="filter-group">
            <FilterSection title="Trip Status">
              <MultiSelectFilter
                options={availableOptions.tripStatuses}
                selected={filters.tripStatus || []}
                onChange={(values) => updateFilter('tripStatus', values)}
                placeholder="Select trip status"
              />
            </FilterSection>

            <FilterSection title="Origin">
              <LocationFilter
                selected={filters.origin || []}
                onChange={(values) => updateFilter('origin', values)}
                placeholder="Select origin"
                locations={availableOptions.locations}
              />
            </FilterSection>

            <FilterSection title="Destination">
              <LocationFilter
                selected={filters.destination || []}
                onChange={(values) => updateFilter('destination', values)}
                placeholder="Select destination"
                locations={availableOptions.locations}
              />
            </FilterSection>

            <FilterSection title="Departure Date">
              <DateRangeFilter
                value={filters.departureDate}
                onChange={(range) => updateFilter('departureDate', range)}
              />
            </FilterSection>

            <FilterSection title="Cargo Type">
              <MultiSelectFilter
                options={availableOptions.cargoTypes}
                selected={filters.cargoType || []}
                onChange={(values) => updateFilter('cargoType', values)}
                placeholder="Select cargo type"
              />
            </FilterSection>
          </div>
        )}

        {/* Alert filters */}
        {activeFilterGroup === 'alerts' && (
          <div className="filter-group">
            <FilterSection title="Alert Type">
              <MultiSelectFilter
                options={availableOptions.alertTypes}
                selected={filters.alertType || []}
                onChange={(values) => updateFilter('alertType', values)}
                placeholder="Select alert type"
              />
            </FilterSection>

            <FilterSection title="Severity">
              <MultiSelectFilter
                options={availableOptions.alertSeverities}
                selected={filters.alertSeverity || []}
                onChange={(values) => updateFilter('alertSeverity', values)}
                placeholder="Select severity"
              />
            </FilterSection>

            <FilterSection title="Status">
              <MultiSelectFilter
                options={availableOptions.alertStatuses}
                selected={filters.alertStatus || []}
                onChange={(values) => updateFilter('alertStatus', values)}
                placeholder="Select status"
              />
            </FilterSection>
          </div>
        )}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="advanced-filter-options">
          <FilterSection title="Time Range">
            <DateRangeFilter
              value={filters.timeRange}
              onChange={(range) => updateFilter('timeRange', range)}
              presets={[
                { label: 'Last Hour', value: { start: new Date(Date.now() - 3600000), end: new Date() } },
                { label: 'Last 24 Hours', value: { start: new Date(Date.now() - 86400000), end: new Date() } },
                { label: 'Last Week', value: { start: new Date(Date.now() - 604800000), end: new Date() } },
                { label: 'Last Month', value: { start: new Date(Date.now() - 2592000000), end: new Date() } }
              ]}
            />
          </FilterSection>

          <FilterSection title="Last Update">
            <DateRangeFilter
              value={filters.lastUpdate}
              onChange={(range) => updateFilter('lastUpdate', range)}
            />
          </FilterSection>
        </div>
      )}

      {/* Active filters summary */}
      <ActiveFiltersSummary
        filters={filters}
        onRemoveFilter={(key, value) => {
          const currentValues = filters[key as keyof SearchFilters] as any[];
          if (Array.isArray(currentValues)) {
            const newValues = currentValues.filter(v => v !== value);
            updateFilter(key as keyof SearchFilters, newValues);
          } else {
            updateFilter(key as keyof SearchFilters, undefined);
          }
        }}
      />
    </div>
  );
};
```

## 3. Smart Search Interface

### Intelligent Search Bar
```typescript
interface SmartSearchBarProps {
  onSearch: (query: SearchQuery) => void;
  placeholder?: string;
  suggestions?: string[];
  recentSearches?: string[];
  savedSearches?: Map<string, SearchQuery>;
}

const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  onSearch,
  placeholder = "Search trucks, drivers, trips...",
  suggestions = [],
  recentSearches = [],
  savedSearches = new Map()
}) => {
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-complete suggestions
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState<SearchSuggestion[]>([]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (text.length > 2) {
        generateAutoCompleteSuggestions(text);
      }
    }, 300),
    []
  );

  // Generate auto-complete suggestions
  const generateAutoCompleteSuggestions = async (text: string) => {
    const suggestions: SearchSuggestion[] = [];

    // Truck suggestions
    const truckSuggestions = await searchTrucks(text);
    suggestions.push(...truckSuggestions.map(truck => ({
      type: 'truck',
      text: truck.plateNumber,
      description: `${truck.driver.name} - ${truck.status}`,
      icon: '🚛',
      data: truck
    })));

    // Driver suggestions
    const driverSuggestions = await searchDrivers(text);
    suggestions.push(...driverSuggestions.map(driver => ({
      type: 'driver',
      text: driver.name,
      description: `License: ${driver.licenseNumber}`,
      icon: '👤',
      data: driver
    })));

    // Location suggestions
    const locationSuggestions = await searchLocations(text);
    suggestions.push(...locationSuggestions.map(location => ({
      type: 'location',
      text: location.name,
      description: location.type,
      icon: '📍',
      data: location
    })));

    setAutoCompleteSuggestions(suggestions.slice(0, 10));
  };

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setShowSuggestions(true);
    setActiveSuggestionIndex(-1);
    
    if (value.length > 2) {
      debouncedSearch(value);
    } else {
      setAutoCompleteSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearch = (text?: string) => {
    const searchQuery = text || searchText;
    if (searchQuery.trim()) {
      // Parse search query for smart filters
      const parsedQuery = parseSearchQuery(searchQuery);
      
      onSearch(parsedQuery);
      
      // Add to search history
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
      setSearchHistory(newHistory);
      
      setShowSuggestions(false);
      setSearchText(searchQuery);
    }
  };

  // Parse natural language search queries
  const parseSearchQuery = (text: string): SearchQuery => {
    const query: SearchQuery = {
      text: text,
      filters: {},
      sorting: { field: 'relevance', direction: 'desc' },
      pagination: { page: 1, pageSize: 20 }
    };

    // Extract filters from natural language
    const patterns = [
      // Status patterns
      { pattern: /status:(\w+)/i, filter: 'truckStatus' },
      { pattern: /(moving|stopped|loading|maintenance)/i, filter: 'truckStatus' },
      
      // Location patterns
      { pattern: /in (\w+)/i, filter: 'region' },
      { pattern: /from (\w+)/i, filter: 'origin' },
      { pattern: /to (\w+)/i, filter: 'destination' },
      
      // Time patterns
      { pattern: /today/i, filter: 'timeRange', value: 'today' },
      { pattern: /yesterday/i, filter: 'timeRange', value: 'yesterday' },
      { pattern: /this week/i, filter: 'timeRange', value: 'week' },
      
      // Alert patterns
      { pattern: /alerts?/i, filter: 'entityType', value: 'alert' },
      { pattern: /(critical|high|medium|low) alerts?/i, filter: 'alertSeverity' },
      
      // Driver patterns
      { pattern: /driver:(\w+)/i, filter: 'driverName' },
      
      // Plate number patterns
      { pattern: /plate:(\w+)/i, filter: 'plateNumber' },
      { pattern: /\b[A-Z]{1,3}\s?\d{1,4}\b/i, filter: 'plateNumber' }
    ];

    patterns.forEach(({ pattern, filter, value }) => {
      const match = text.match(pattern);
      if (match) {
        const filterValue = value || match[1];
        (query.filters as any)[filter] = filterValue;
        
        // Remove matched text from search query
        query.text = text.replace(match[0], '').trim();
      }
    });

    return query;
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const totalSuggestions = autoCompleteSuggestions.length + searchHistory.length + savedSearches.size;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < totalSuggestions - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : totalSuggestions - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          const allSuggestions = [
            ...autoCompleteSuggestions.map(s => s.text),
            ...searchHistory,
            ...Array.from(savedSearches.keys())
          ];
          handleSearch(allSuggestions[activeSuggestionIndex]);
        } else {
          handleSearch();
        }
        break;
      
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  return (
    <div className="smart-search-bar">
      <div className="search-input-container">
        <input
          ref={searchInputRef}
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="search-input"
        />
        
        <button
          onClick={() => handleSearch()}
          className="search-button"
        >
          🔍
        </button>

        {/* Voice search button */}
        <VoiceSearchButton
          onVoiceResult={(text) => {
            setSearchText(text);
            handleSearch(text);
          }}
        />
      </div>

      {/* Search suggestions dropdown */}
      {showSuggestions && (
        <div className="search-suggestions">
          {/* Auto-complete suggestions */}
          {autoCompleteSuggestions.length > 0 && (
            <div className="suggestion-group">
              <div className="suggestion-group-title">Suggestions</div>
              {autoCompleteSuggestions.map((suggestion, index) => (
                <div
                  key={`auto-${index}`}
                  className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
                  onClick={() => handleSearch(suggestion.text)}
                >
                  <span className="suggestion-icon">{suggestion.icon}</span>
                  <div className="suggestion-content">
                    <div className="suggestion-text">{suggestion.text}</div>
                    <div className="suggestion-description">{suggestion.description}</div>
                  </div>
                  <span className="suggestion-type">{suggestion.type}</span>
                </div>
              ))}
            </div>
          )}

          {/* Recent searches */}
          {searchHistory.length > 0 && (
            <div className="suggestion-group">
              <div className="suggestion-group-title">Recent Searches</div>
              {searchHistory.slice(0, 5).map((search, index) => (
                <div
                  key={`recent-${index}`}
                  className={`suggestion-item ${(autoCompleteSuggestions.length + index) === activeSuggestionIndex ? 'active' : ''}`}
                  onClick={() => handleSearch(search)}
                >
                  <span className="suggestion-icon">🕒</span>
                  <div className="suggestion-content">
                    <div className="suggestion-text">{search}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved searches */}
          {savedSearches.size > 0 && (
            <div className="suggestion-group">
              <div className="suggestion-group-title">Saved Searches</div>
              {Array.from(savedSearches.entries()).slice(0, 3).map(([name, query], index) => (
                <div
                  key={`saved-${index}`}
                  className={`suggestion-item ${(autoCompleteSuggestions.length + searchHistory.length + index) === activeSuggestionIndex ? 'active' : ''}`}
                  onClick={() => onSearch(query)}
                >
                  <span className="suggestion-icon">⭐</span>
                  <div className="suggestion-content">
                    <div className="suggestion-text">{name}</div>
                    <div className="suggestion-description">{query.text || 'Advanced search'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

## 4. Geographic Search

### Map-based Search Interface
```typescript
interface MapSearchProps {
  onAreaSearch: (bounds: LatLngBounds) => void;
  onRadiusSearch: (center: LatLng, radius: number) => void;
  onRouteSearch: (route: LatLng[]) => void;
  searchResults: SearchResult[];
}

const MapSearch: React.FC<MapSearchProps> = ({
  onAreaSearch,
  onRadiusSearch,
  onRouteSearch,
  searchResults
}) => {
  const [searchMode, setSearchMode] = useState<'area' | 'radius' | 'route'>('area');
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const [searchOverlays, setSearchOverlays] = useState<google.maps.MVCObject[]>([]);

  // Initialize drawing manager
  useEffect(() => {
    if (window.google && window.google.maps.drawing) {
      const manager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.RECTANGLE,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE
          ]
        },
        rectangleOptions: {
          fillColor: '#2196F3',
          fillOpacity: 0.2,
          strokeColor: '#2196F3',
          strokeWeight: 2,
          clickable: false,
          editable: true
        },
        circleOptions: {
          fillColor: '#4CAF50',
          fillOpacity: 0.2,
          strokeColor: '#4CAF50',
          strokeWeight: 2,
          clickable: false,
          editable: true
        },
        polygonOptions: {
          fillColor: '#FF9800',
          fillOpacity: 0.2,
          strokeColor: '#FF9800',
          strokeWeight: 2,
          clickable: false,
          editable: true
        },
        polylineOptions: {
          strokeColor: '#9C27B0',
          strokeWeight: 3,
          clickable: false,
          editable: true
        }
      });

      setDrawingManager(manager);

      // Handle overlay completion
      manager.addListener('overlaycomplete', (event: any) => {
        handleOverlayComplete(event);
      });
    }
  }, []);

  // Handle completed drawing
  const handleOverlayComplete = (event: any) => {
    const overlay = event.overlay;
    const type = event.type;

    // Add to search overlays
    setSearchOverlays(prev => [...prev, overlay]);

    switch (type) {
      case google.maps.drawing.OverlayType.RECTANGLE:
        const bounds = overlay.getBounds();
        onAreaSearch(bounds);
        break;

      case google.maps.drawing.OverlayType.CIRCLE:
        const center = overlay.getCenter();
        const radius = overlay.getRadius();
        onRadiusSearch(center, radius);
        break;

      case google.maps.drawing.OverlayType.POLYGON:
        const polygonPath = overlay.getPath().getArray();
        const polygonBounds = new google.maps.LatLngBounds();
        polygonPath.forEach((point: google.maps.LatLng) => {
          polygonBounds.extend(point);
        });
        onAreaSearch(polygonBounds);
        break;

      case google.maps.drawing.OverlayType.POLYLINE:
        const routePath = overlay.getPath().getArray();
        onRouteSearch(routePath);
        break;
    }

    // Stop drawing mode
    if (drawingManager) {
      drawingManager.setDrawingMode(null);
    }
  };

  // Clear search overlays
  const clearSearchOverlays = () => {
    searchOverlays.forEach(overlay => {
      if (overlay.setMap) {
        overlay.setMap(null);
      }
    });
    setSearchOverlays([]);
  };

  return (
    <div className="map-search">
      {/* Search mode controls */}
      <div className="search-mode-controls">
        <button
          className={searchMode === 'area' ? 'active' : ''}
          onClick={() => {
            setSearchMode('area');
            drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
          }}
        >
          📐 Area Search
        </button>
        
        <button
          className={searchMode === 'radius' ? 'active' : ''}
          onClick={() => {
            setSearchMode('radius');
            drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
          }}
        >
          ⭕ Radius Search
        </button>
        
        <button
          className={searchMode === 'route' ? 'active' : ''}
          onClick={() => {
            setSearchMode('route');
            drawingManager?.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
          }}
        >
          🛣️ Route Search
        </button>

        <button onClick={clearSearchOverlays}>
          🗑️ Clear
        </button>
      </div>

      {/* Search instructions */}
      <div className="search-instructions">
        {searchMode === 'area' && (
          <p>Draw a rectangle or polygon on the map to search within that area</p>
        )}
        {searchMode === 'radius' && (
          <p>Draw a circle on the map to search within that radius</p>
        )}
        {searchMode === 'route' && (
          <p>Draw a route on the map to search along that path</p>
        )}
      </div>

      {/* Search results summary */}
      {searchResults.length > 0 && (
        <div className="search-results-summary">
          <h4>Search Results ({searchResults.length})</h4>
          <div className="results-breakdown">
            {Object.entries(groupBy(searchResults, 'type')).map(([type, results]) => (
              <div key={type} className="result-type">
                <span className="type-name">{type}:</span>
                <span className="type-count">{results.length}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

## 5. Search Analytics and Optimization

### Search Performance Monitor
```typescript
class SearchAnalytics {
  private searchMetrics: SearchMetric[] = [];
  private popularQueries: Map<string, number> = new Map();
  private slowQueries: SearchMetric[] = [];
  private failedQueries: SearchMetric[] = [];

  // Record search metrics
  recordSearch(query: SearchQuery, resultCount: number, searchTime: number): void {
    const metric: SearchMetric = {
      id: generateId(),
      query,
      resultCount,
      searchTime,
      timestamp: new Date(),
      userId: getCurrentUserId(),
      success: resultCount >= 0
    };

    this.searchMetrics.push(metric);

    // Track popular queries
    if (query.text) {
      const count = this.popularQueries.get(query.text) || 0;
      this.popularQueries.set(query.text, count + 1);
    }

    // Track slow queries
    if (searchTime > 1000) { // Slower than 1 second
      this.slowQueries.push(metric);
    }

    // Track failed queries
    if (resultCount === 0) {
      this.failedQueries.push(metric);
    }

    // Cleanup old metrics (keep last 1000)
    if (this.searchMetrics.length > 1000) {
      this.searchMetrics = this.searchMetrics.slice(-1000);
    }
  }

  // Get search analytics
  getAnalytics(): SearchAnalyticsData {
    const totalSearches = this.searchMetrics.length;
    const averageSearchTime = this.searchMetrics.reduce((sum, metric) => sum + metric.searchTime, 0) / totalSearches;
    const averageResultCount = this.searchMetrics.reduce((sum, metric) => sum + metric.resultCount, 0) / totalSearches;
    
    const successRate = (this.searchMetrics.filter(m => m.success).length / totalSearches) * 100;
    const zeroResultRate = (this.failedQueries.length / totalSearches) * 100;

    return {
      totalSearches,
      averageSearchTime,
      averageResultCount,
      successRate,
      zeroResultRate,
      popularQueries: Array.from(this.popularQueries.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      slowQueries: this.slowQueries.slice(-10),
      searchTrends: this.calculateSearchTrends()
    };
  }

  // Calculate search trends
  private calculateSearchTrends(): SearchTrend[] {
    const trends: SearchTrend[] = [];
    const timeRanges = ['1h', '24h', '7d', '30d'];

    timeRanges.forEach(range => {
      const cutoff = this.getTimeRangeCutoff(range);
      const recentSearches = this.searchMetrics.filter(m => m.timestamp.getTime() > cutoff);
      
      trends.push({
        timeRange: range,
        searchCount: recentSearches.length,
        averageTime: recentSearches.reduce((sum, m) => sum + m.searchTime, 0) / recentSearches.length,
        successRate: (recentSearches.filter(m => m.success).length / recentSearches.length) * 100
      });
    });

    return trends;
  }

  // Get popular searches
  getPopularSearches(): string[] {
    return Array.from(this.popularQueries.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([query]) => query);
  }

  // Optimize search performance
  optimizeSearch(): SearchOptimization[] {
    const optimizations: SearchOptimization[] = [];

    // Suggest index improvements for slow queries
    if (this.slowQueries.length > 0) {
      const slowQueryPatterns = this.analyzeSlowQueryPatterns();
      optimizations.push({
        type: 'index_optimization',
        description: 'Add indexes for frequently used filter combinations',
        impact: 'high',
        suggestions: slowQueryPatterns
      });
    }

    // Suggest caching for popular queries
    const popularQueries = this.getPopularSearches();
    if (popularQueries.length > 0) {
      optimizations.push({
        type: 'caching',
        description: 'Cache results for popular search queries',
        impact: 'medium',
        suggestions: popularQueries
      });
    }

    return optimizations;
  }
}
```

## Benefits and Advantages

### 1. Enhanced User Experience
- **Intelligent Search**: Natural language processing and smart query parsing
- **Auto-completion**: Real-time suggestions and auto-complete functionality
- **Visual Search**: Map-based geographic search capabilities
- **Search History**: Quick access to recent and saved searches

### 2. Powerful Filtering
- **Multi-level Filters**: Hierarchical filtering with preset combinations
- **Dynamic Filters**: Context-aware filter options based on available data
- **Custom Filter Presets**: Save and reuse common filter combinations
- **Real-time Updates**: Filters update dynamically as data changes

### 3. Advanced Search Capabilities
- **Fuzzy Matching**: Find results even with typos or partial matches
- **Relevance Scoring**: Intelligent ranking of search results
- **Geographic Search**: Area, radius, and route-based searching
- **Cross-entity Search**: Search across trucks, drivers, trips, and alerts simultaneously

### 4. Performance Optimization
- **Search Analytics**: Monitor and optimize search performance
- **Intelligent Caching**: Cache popular searches for faster results
- **Progressive Loading**: Load results incrementally for better performance
- **Search Optimization**: Automatic suggestions for improving search speed

## Conclusion

The advanced filtering and search system provides comprehensive capabilities for efficiently finding and managing all aspects of the Saudi trip tracking system, with intelligent features that adapt to user behavior and optimize performance over time.