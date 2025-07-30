# Performance Optimization - Saudi Arabia System

## Overview

This file documents comprehensive performance optimization strategies for the Saudi trip tracking system, focusing on handling thousands of trucks, real-time updates, and maintaining smooth user experience.

## 1. Rendering Optimization

### React Component Optimization
```typescript
// Memoized truck marker component
const OptimizedTruckMarker = React.memo<TruckMarkerProps>(
  ({ truck, isSelected, onTruckClick }) => {
    const markerIcon = useMemo(() => ({
      url: getTruckIconUrl(truck),
      scaledSize: new google.maps.Size(isSelected ? 50 : 40, isSelected ? 50 : 40),
      anchor: new google.maps.Point(isSelected ? 25 : 20, isSelected ? 25 : 20),
      rotation: truck.heading
    }), [truck.type, truck.status, truck.heading, isSelected]);

    return (
      <Marker
        position={truck.currentLocation}
        icon={markerIcon}
        onClick={() => onTruckClick(truck)}
        zIndex={isSelected ? 1000 : truck.priority * 100}
      />
    );
  },
  // Custom comparison function
  (prevProps, nextProps) => {
    const prev = prevProps.truck;
    const next = nextProps.truck;
    
    return (
      prev.id === next.id &&
      prev.currentLocation.lat === next.currentLocation.lat &&
      prev.currentLocation.lng === next.currentLocation.lng &&
      prev.heading === next.heading &&
      prev.status === next.status &&
      prev.type === next.type &&
      prevProps.isSelected === nextProps.isSelected
    );
  }
);

// Virtualized truck list for large datasets
const VirtualizedTruckList: React.FC<{ trucks: Truck[] }> = ({ trucks }) => {
  const [containerHeight, setContainerHeight] = useState(600);
  const itemHeight = 80;
  const overscan = 5;

  const { virtualItems, totalSize } = useVirtualizer({
    count: trucks.length,
    getScrollElement: () => document.getElementById('truck-list-container'),
    estimateSize: () => itemHeight,
    overscan
  });

  return (
    <div
      id="truck-list-container"
      style={{ height: containerHeight, overflow: 'auto' }}
    >
      <div style={{ height: totalSize, position: 'relative' }}>
        {virtualItems.map(virtualItem => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: itemHeight,
              transform: `translateY(${virtualItem.start}px)`
            }}
          >
            <TruckListItem truck={trucks[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Optimized map component with clustering
const OptimizedMapView: React.FC<MapViewProps> = ({ trucks, zoom, center }) => {
  const [visibleTrucks, setVisibleTrucks] = useState<Truck[]>([]);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  // Only render trucks within map bounds
  useEffect(() => {
    if (mapBounds) {
      const filtered = trucks.filter(truck => 
        mapBounds.contains(new google.maps.LatLng(
          truck.currentLocation.lat,
          truck.currentLocation.lng
        ))
      );
      setVisibleTrucks(filtered);
    }
  }, [trucks, mapBounds]);

  // Throttled bounds change handler
  const handleBoundsChanged = useCallback(
    throttle((map: google.maps.Map) => {
      const bounds = map.getBounds();
      if (bounds) {
        setMapBounds(bounds);
      }
    }, 500),
    []
  );

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      onBoundsChanged={handleBoundsChanged}
      options={{
        // Disable unnecessary features for better performance
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        keyboardShortcuts: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }}
    >
      {/* Use clustering for better performance */}
      <MarkerClusterer
        options={{
          gridSize: 60,
          maxZoom: 15,
          minimumClusterSize: 3
        }}
      >
        {(clusterer) =>
          visibleTrucks.map(truck => (
            <OptimizedTruckMarker
              key={truck.id}
              truck={truck}
              clusterer={clusterer}
              isSelected={false}
              onTruckClick={() => {}}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
};
```

### Batch Updates and Debouncing
```typescript
// Batch update manager for truck positions
class BatchUpdateManager {
  private updateQueue: Map<string, Truck> = new Map();
  private batchTimeout: NodeJS.Timeout | null = null;
  private readonly BATCH_DELAY = 100; // 100ms
  private readonly MAX_BATCH_SIZE = 50;
  private subscribers: Set<(trucks: Truck[]) => void> = new Set();

  // Add truck update to batch
  addUpdate(truck: Truck): void {
    this.updateQueue.set(truck.id, truck);

    // Process batch if it gets too large
    if (this.updateQueue.size >= this.MAX_BATCH_SIZE) {
      this.processBatch();
    } else {
      // Schedule batch processing
      this.scheduleBatchProcessing();
    }
  }

  // Schedule batch processing
  private scheduleBatchProcessing(): void {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    this.batchTimeout = setTimeout(() => {
      this.processBatch();
    }, this.BATCH_DELAY);
  }

  // Process accumulated updates
  private processBatch(): void {
    if (this.updateQueue.size === 0) return;

    const trucks = Array.from(this.updateQueue.values());
    this.updateQueue.clear();

    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }

    // Notify all subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(trucks);
      } catch (error) {
        console.error('Error in batch update callback:', error);
      }
    });
  }

  // Subscribe to batch updates
  subscribe(callback: (trucks: Truck[]) => void): () => void {
    this.subscribers.add(callback);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }
}

// Debounced search hook
const useDebouncedSearch = (searchTerm: string, delay: number = 300) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, delay]);

  return debouncedTerm;
};

// Throttled map events
const useThrottledMapEvents = (map: google.maps.Map | null) => {
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [zoom, setZoom] = useState<number>(10);

  useEffect(() => {
    if (!map) return;

    const handleBoundsChanged = throttle(() => {
      const newBounds = map.getBounds();
      if (newBounds) {
        setBounds(newBounds);
      }
    }, 500);

    const handleZoomChanged = throttle(() => {
      setZoom(map.getZoom() || 10);
    }, 300);

    const boundsListener = map.addListener('bounds_changed', handleBoundsChanged);
    const zoomListener = map.addListener('zoom_changed', handleZoomChanged);

    return () => {
      google.maps.event.removeListener(boundsListener);
      google.maps.event.removeListener(zoomListener);
    };
  }, [map]);

  return { bounds, zoom };
};
```

## 2. Data Management Optimization

### Intelligent Caching System
```typescript
// Multi-level cache implementation
class IntelligentCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private persistentCache: LocalStorageCache;
  private readonly MAX_MEMORY_ENTRIES = 1000;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private cacheStats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0
  };

  constructor() {
    this.persistentCache = new LocalStorageCache('saudi-logistics-cache');
    this.startCleanupTimer();
  }

  // Get data from cache
  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      this.cacheStats.hits++;
      return memoryEntry.data as T;
    }

    // Try persistent cache
    const persistentEntry = await this.persistentCache.get(key);
    if (persistentEntry && !this.isExpired(persistentEntry)) {
      // Promote to memory cache
      this.memoryCache.set(key, persistentEntry);
      this.cacheStats.hits++;
      return persistentEntry.data as T;
    }

    this.cacheStats.misses++;
    return null;
  }

  // Set data in cache
  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.CACHE_TTL,
      accessCount: 0,
      lastAccessed: Date.now()
    };

    // Add to memory cache
    this.memoryCache.set(key, entry);

    // Add to persistent cache for important data
    if (this.shouldPersist(key)) {
      await this.persistentCache.set(key, entry);
    }

    // Evict old entries if memory cache is full
    if (this.memoryCache.size > this.MAX_MEMORY_ENTRIES) {
      this.evictLeastRecentlyUsed();
    }
  }

  // Check if entry is expired
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  // Evict least recently used entries
  private evictLeastRecentlyUsed(): void {
    const entries = Array.from(this.memoryCache.entries());
    entries.sort(([,a], [,b]) => a.lastAccessed - b.lastAccessed);
    
    const toEvict = entries.slice(0, Math.floor(this.MAX_MEMORY_ENTRIES * 0.1));
    toEvict.forEach(([key]) => {
      this.memoryCache.delete(key);
      this.cacheStats.evictions++;
    });
  }

  // Determine if data should be persisted
  private shouldPersist(key: string): boolean {
    // Persist truck data, location data, but not temporary search results
    return key.startsWith('truck:') || 
           key.startsWith('location:') || 
           key.startsWith('route:');
  }

  // Start cleanup timer
  private startCleanupTimer(): void {
    setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute
  }

  // Cleanup expired entries
  private cleanup(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    this.memoryCache.forEach((entry, key) => {
      if (this.isExpired(entry)) {
        toDelete.push(key);
      }
    });

    toDelete.forEach(key => {
      this.memoryCache.delete(key);
    });
  }

  // Get cache statistics
  getStats(): CacheStats {
    return {
      ...this.cacheStats,
      memorySize: this.memoryCache.size,
      hitRate: this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses)
    };
  }
}

// Optimized data fetching with caching
class OptimizedDataService {
  private cache: IntelligentCache;
  private requestQueue: Map<string, Promise<any>> = new Map();

  constructor() {
    this.cache = new IntelligentCache();
  }

  // Fetch truck data with caching and deduplication
  async fetchTruckData(truckId: string): Promise<Truck> {
    const cacheKey = `truck:${truckId}`;
    
    // Check cache first
    const cached = await this.cache.get<Truck>(cacheKey);
    if (cached) {
      return cached;
    }

    // Check if request is already in progress
    const existingRequest = this.requestQueue.get(cacheKey);
    if (existingRequest) {
      return existingRequest;
    }

    // Make new request
    const request = this.fetchTruckFromAPI(truckId);
    this.requestQueue.set(cacheKey, request);

    try {
      const truck = await request;
      await this.cache.set(cacheKey, truck, 30000); // Cache for 30 seconds
      return truck;
    } finally {
      this.requestQueue.delete(cacheKey);
    }
  }

  // Batch fetch multiple trucks
  async fetchMultipleTrucks(truckIds: string[]): Promise<Truck[]> {
    const results: (Truck | null)[] = await Promise.all(
      truckIds.map(async (id) => {
        try {
          return await this.fetchTruckData(id);
        } catch (error) {
          console.error(`Failed to fetch truck ${id}:`, error);
          return null;
        }
      })
    );

    return results.filter((truck): truck is Truck => truck !== null);
  }

  // Prefetch data based on user behavior
  async prefetchData(context: PrefetchContext): Promise<void> {
    const prefetchTasks: Promise<any>[] = [];

    // Prefetch nearby trucks
    if (context.mapBounds) {
      const nearbyTruckIds = await this.findTrucksInBounds(context.mapBounds);
      prefetchTasks.push(
        ...nearbyTruckIds.map(id => this.fetchTruckData(id))
      );
    }

    // Prefetch route data for selected trip
    if (context.selectedTripId) {
      prefetchTasks.push(this.fetchRouteData(context.selectedTripId));
    }

    // Execute prefetch tasks in background
    Promise.allSettled(prefetchTasks).catch(error => {
      console.warn('Prefetch failed:', error);
    });
  }
}
```

## 3. Network Optimization

### Efficient Data Loading
```typescript
// Progressive data loading strategy
class ProgressiveDataLoader {
  private loadingStates: Map<string, LoadingState> = new Map();
  private priorityQueue: PriorityQueue<DataRequest> = new PriorityQueue();
  private concurrentRequests = 0;
  private readonly MAX_CONCURRENT = 6;

  // Load data with priority
  async loadData<T>(request: DataRequest): Promise<T> {
    // Check if already loading
    const existingState = this.loadingStates.get(request.id);
    if (existingState) {
      return existingState.promise;
    }

    // Create loading state
    const loadingState: LoadingState = {
      id: request.id,
      priority: request.priority,
      promise: this.executeRequest<T>(request),
      startTime: Date.now()
    };

    this.loadingStates.set(request.id, loadingState);

    try {
      return await loadingState.promise;
    } finally {
      this.loadingStates.delete(request.id);
    }
  }

  // Execute request with concurrency control
  private async executeRequest<T>(request: DataRequest): Promise<T> {
    // Wait for available slot
    while (this.concurrentRequests >= this.MAX_CONCURRENT) {
      await this.waitForSlot();
    }

    this.concurrentRequests++;

    try {
      switch (request.type) {
        case 'truck_data':
          return await this.loadTruckData(request.params) as T;
        case 'route_data':
          return await this.loadRouteData(request.params) as T;
        case 'location_data':
          return await this.loadLocationData(request.params) as T;
        default:
          throw new Error(`Unknown request type: ${request.type}`);
      }
    } finally {
      this.concurrentRequests--;
    }
  }

  // Load truck data with progressive enhancement
  private async loadTruckData(params: any): Promise<Truck> {
    // Load basic truck info first
    const basicData = await this.fetchBasicTruckData(params.truckId);
    
    // Load additional data in background
    const enhancedDataPromise = this.fetchEnhancedTruckData(params.truckId);
    
    // Return basic data immediately
    const truck: Truck = {
      ...basicData,
      isLoading: true
    };

    // Enhance with additional data when available
    enhancedDataPromise.then(enhancedData => {
      Object.assign(truck, enhancedData, { isLoading: false });
    }).catch(error => {
      console.warn('Failed to load enhanced truck data:', error);
      truck.isLoading = false;
    });

    return truck;
  }

  // Intelligent preloading based on user behavior
  startIntelligentPreloading(userBehavior: UserBehaviorTracker): void {
    userBehavior.onMapMove((bounds) => {
      // Preload trucks that will likely come into view
      const expandedBounds = this.expandBounds(bounds, 1.5);
      this.preloadTrucksInBounds(expandedBounds);
    });

    userBehavior.onTruckSelect((truckId) => {
      // Preload related data
      this.preloadTruckDetails(truckId);
      this.preloadNearbyTrucks(truckId);
    });

    userBehavior.onRouteView((routeId) => {
      // Preload route details and checkpoints
      this.preloadRouteDetails(routeId);
    });
  }
}

// WebSocket optimization for real-time updates
class OptimizedWebSocketManager {
  private ws: WebSocket | null = null;
  private messageQueue: QueuedMessage[] = [];
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_DELAY = 1000;
  private subscriptions: Map<string, Set<Function>> = new Map();
  private compressionEnabled = false;

  // Connect with optimization features
  connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(url);
        
        // Enable compression if supported
        if ('compression' in this.ws) {
          this.compressionEnabled = true;
        }

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.processQueuedMessages();
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.handleReconnection();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  // Optimized message handling with batching
  private handleMessage(event: MessageEvent): void {
    try {
      let data;
      
      // Handle compressed messages
      if (this.compressionEnabled && event.data instanceof ArrayBuffer) {
        data = this.decompressMessage(event.data);
      } else {
        data = JSON.parse(event.data);
      }

      // Handle batch messages
      if (Array.isArray(data)) {
        data.forEach(message => this.processMessage(message));
      } else {
        this.processMessage(data);
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }

  // Process individual message
  private processMessage(message: any): void {
    const { type, payload } = message;
    const subscribers = this.subscriptions.get(type);
    
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error('Error in WebSocket message callback:', error);
        }
      });
    }
  }

  // Send message with queuing for offline scenarios
  send(type: string, payload: any): void {
    const message = { type, payload, timestamp: Date.now() };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message for when connection is restored
      this.messageQueue.push(message);
    }
  }

  // Subscribe to message type
  subscribe(type: string, callback: Function): () => void {
    if (!this.subscriptions.has(type)) {
      this.subscriptions.set(type, new Set());
    }
    
    this.subscriptions.get(type)!.add(callback);
    
    return () => {
      const subscribers = this.subscriptions.get(type);
      if (subscribers) {
        subscribers.delete(callback);
      }
    };
  }

  // Handle automatic reconnection
  private handleReconnection(): void {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      const delay = this.RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`);
        this.connect(this.ws?.url || '').catch(error => {
          console.error('Reconnection failed:', error);
        });
      }, delay);
    }
  }
}
```

## 4. Memory Management

### Memory Optimization Strategies
```typescript
// Memory-efficient truck tracking
class MemoryOptimizedTruckTracker {
  private activeTrucks: Map<string, Truck> = new Map();
  private truckHistory: Map<string, TruckHistoryEntry[]> = new Map();
  private readonly MAX_HISTORY_ENTRIES = 100;
  private readonly CLEANUP_INTERVAL = 60000; // 1 minute
  private memoryMonitor: MemoryMonitor;

  constructor() {
    this.memoryMonitor = new MemoryMonitor();
    this.startMemoryMonitoring();
    this.startPeriodicCleanup();
  }

  // Add truck with memory management
  addTruck(truck: Truck): void {
    // Store current position in history before updating
    const existingTruck = this.activeTrucks.get(truck.id);
    if (existingTruck) {
      this.addToHistory(truck.id, {
        location: existingTruck.currentLocation,
        timestamp: new Date(),
        speed: existingTruck.currentSpeed,
        heading: existingTruck.heading
      });
    }

    // Update active truck
    this.activeTrucks.set(truck.id, truck);

    // Check memory usage
    if (this.memoryMonitor.isMemoryHigh()) {
      this.performMemoryCleanup();
    }
  }

  // Add to history with size limits
  private addToHistory(truckId: string, entry: TruckHistoryEntry): void {
    if (!this.truckHistory.has(truckId)) {
      this.truckHistory.set(truckId, []);
    }

    const history = this.truckHistory.get(truckId)!;
    history.push(entry);

    // Limit history size
    if (history.length > this.MAX_HISTORY_ENTRIES) {
      history.splice(0, history.length - this.MAX_HISTORY_ENTRIES);
    }
  }

  // Remove inactive trucks
  removeTruck(truckId: string): void {
    this.activeTrucks.delete(truckId);
    
    // Keep limited history for recently removed trucks
    const history = this.truckHistory.get(truckId);
    if (history && history.length > 10) {
      this.truckHistory.set(truckId, history.slice(-10));
    }
  }

  // Perform memory cleanup
  private performMemoryCleanup(): void {
    const now = Date.now();
    const INACTIVE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

    // Remove old history entries
    this.truckHistory.forEach((history, truckId) => {
      const filteredHistory = history.filter(entry => 
        now - entry.timestamp.getTime() < INACTIVE_THRESHOLD
      );
      
      if (filteredHistory.length === 0) {
        this.truckHistory.delete(truckId);
      } else {
        this.truckHistory.set(truckId, filteredHistory);
      }
    });

    // Remove inactive trucks
    this.activeTrucks.forEach((truck, truckId) => {
      if (now - truck.lastUpdateTime.getTime() > INACTIVE_THRESHOLD) {
        this.removeTruck(truckId);
      }
    });

    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }

  // Start memory monitoring
  private startMemoryMonitoring(): void {
    setInterval(() => {
      const memoryInfo = this.memoryMonitor.getMemoryInfo();
      
      if (memoryInfo.usedJSHeapSize > memoryInfo.totalJSHeapSize * 0.8) {
        console.warn('High memory usage detected, performing cleanup');
        this.performMemoryCleanup();
      }
    }, 30000); // Check every 30 seconds
  }

  // Start periodic cleanup
  private startPeriodicCleanup(): void {
    setInterval(() => {
      this.performMemoryCleanup();
    }, this.CLEANUP_INTERVAL);
  }
}

// Memory monitor utility
class MemoryMonitor {
  private memoryThreshold = 0.8; // 80% of available memory

  // Get current memory information
  getMemoryInfo(): MemoryInfo {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    
    // Fallback for browsers without memory API
    return {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
      jsHeapSizeLimit: 0
    };
  }

  // Check if memory usage is high
  isMemoryHigh(): boolean {
    const memoryInfo = this.getMemoryInfo();
    if (memoryInfo.totalJSHeapSize === 0) return false;
    
    return memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize > this.memoryThreshold;
  }

  // Get memory usage percentage
  getMemoryUsagePercentage(): number {
    const memoryInfo = this.getMemoryInfo();
    if (memoryInfo.totalJSHeapSize === 0) return 0;
    
    return (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100;
  }

  // Set memory threshold
  setMemoryThreshold(threshold: number): void {
    this.memoryThreshold = Math.max(0.5, Math.min(0.95, threshold));
  }
}
```

## 5. Performance Monitoring

### Real-time Performance Tracking
```typescript
// Performance metrics collector
class PerformanceMetricsCollector {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private readonly MAX_METRICS = 1000;

  constructor() {
    this.initializeObservers();
    this.startMetricsCollection();
  }

  // Initialize performance observers
  private initializeObservers(): void {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.recordMetric({
            type: 'navigation',
            name: entry.name,
            duration: entry.duration,
            timestamp: Date.now(),
            details: {
              domContentLoaded: (entry as PerformanceNavigationTiming).domContentLoadedEventEnd,
              loadComplete: (entry as PerformanceNavigationTiming).loadEventEnd
            }
          });
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);

      // Observe resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.duration > 100) { // Only track slow resources
            this.recordMetric({
              type: 'resource',
              name: entry.name,
              duration: entry.duration,
              timestamp: Date.now(),
              details: {
                transferSize: (entry as PerformanceResourceTiming).transferSize,
                encodedBodySize: (entry as PerformanceResourceTiming).encodedBodySize
              }
            });
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);

      // Observe long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.recordMetric({
            type: 'long_task',
            name: 'long_task',
            duration: entry.duration,
            timestamp: Date.now(),
            details: {
              attribution: (entry as any).attribution
            }
          });
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);
    }
  }

  // Record custom metric
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Limit metrics array size
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics.splice(0, this.metrics.length - this.MAX_METRICS);
    }

    // Send critical metrics immediately
    if (metric.type === 'long_task' && metric.duration > 500) {
      this.sendCriticalMetric(metric);
    }
  }

  // Measure component render time
  measureComponentRender<T>(componentName: string, renderFunction: () => T): T {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();

    this.recordMetric({
      type: 'component_render',
      name: componentName,
      duration: endTime - startTime,
      timestamp: Date.now()
    });

    return result;
  }

  // Measure API call performance
  async measureAPICall<T>(apiName: string, apiCall: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();

      this.recordMetric({
        type: 'api_call',
        name: apiName,
        duration: endTime - startTime,
        timestamp: Date.now(),
        details: { success: true }
      });

      return result;
    } catch (error) {
      const endTime = performance.now();

      this.recordMetric({
        type: 'api_call',
        name: apiName,
        duration: endTime - startTime,
        timestamp: Date.now(),
        details: { success: false, error: error.message }
      });

      throw error;
    }
  }

  // Get performance summary
  getPerformanceSummary(): PerformanceSummary {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 60000); // Last minute

    const summary: PerformanceSummary = {
      totalMetrics: this.metrics.length,
      recentMetrics: recentMetrics.length,
      averageRenderTime: this.calculateAverageByType(recentMetrics, 'component_render'),
      averageAPITime: this.calculateAverageByType(recentMetrics, 'api_call'),
      longTasksCount: recentMetrics.filter(m => m.type === 'long_task').length,
      memoryUsage: this.getCurrentMemoryUsage(),
      timestamp: now
    };

    return summary;
  }

  // Calculate average duration by metric type
  private calculateAverageByType(metrics: PerformanceMetric[], type: string): number {
    const typeMetrics = metrics.filter(m => m.type === type);
    if (typeMetrics.length === 0) return 0;

    const totalDuration = typeMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalDuration / typeMetrics.length;
  }

  // Get current memory usage
  private getCurrentMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    }
    return 0;
  }

  // Send critical metric for immediate attention
  private sendCriticalMetric(metric: PerformanceMetric): void {
    // Send to monitoring service
    console.warn('Critical performance issue detected:', metric);
    
    // Could send to external monitoring service
    // this.sendToMonitoringService(metric);
  }

  // Start automatic metrics collection
  private startMetricsCollection(): void {
    // Collect metrics every 30 seconds
    setInterval(() => {
      const summary = this.getPerformanceSummary();
      
      // Log performance summary
      console.log('Performance Summary:', summary);
      
      // Send to analytics if needed
      // this.sendToAnalytics(summary);
    }, 30000);
  }

  // Cleanup observers
  cleanup(): void {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers = [];
  }
}

// Performance optimization recommendations
class PerformanceOptimizer {
  private metricsCollector: PerformanceMetricsCollector;
  private recommendations: OptimizationRecommendation[] = [];

  constructor(metricsCollector: PerformanceMetricsCollector) {
    this.metricsCollector = metricsCollector;
  }

  // Analyze performance and generate recommendations
  analyzePerformance(): OptimizationRecommendation[] {
    const summary = this.metricsCollector.getPerformanceSummary();
    const recommendations: OptimizationRecommendation[] = [];

    // Check render performance
    if (summary.averageRenderTime > 16) { // 60 FPS threshold
      recommendations.push({
        type: 'render_optimization',
        priority: 'high',
        description: 'Component render time is too slow',
        suggestion: 'Consider using React.memo, useMemo, or useCallback',
        impact: 'Improve frame rate and user experience'
      });
    }

    // Check API performance
    if (summary.averageAPITime > 1000) {
      recommendations.push({
        type: 'api_optimization',
        priority: 'medium',
        description: 'API calls are taking too long',
        suggestion: 'Implement caching, request batching, or API optimization',
        impact: 'Reduce loading times and improve responsiveness'
      });
    }

    // Check memory usage
    if (summary.memoryUsage > 80) {
      recommendations.push({
        type: 'memory_optimization',
        priority: 'high',
        description: 'High memory usage detected',
        suggestion: 'Implement memory cleanup, reduce data retention, or optimize data structures',
        impact: 'Prevent memory leaks and improve stability'
      });
    }

    // Check long tasks
    if (summary.longTasksCount > 5) {
      recommendations.push({
        type: 'task_optimization',
        priority: 'high',
        description: 'Too many long-running tasks detected',
        suggestion: 'Break down large tasks, use web workers, or implement time slicing',
        impact: 'Improve UI responsiveness and prevent blocking'
      });
    }

    this.recommendations = recommendations;
    return recommendations;
  }

  // Apply automatic optimizations
  applyAutomaticOptimizations(): void {
    this.recommendations.forEach(recommendation => {
      switch (recommendation.type) {
        case 'memory_optimization':
          this.triggerMemoryCleanup();
          break;
        case 'task_optimization':
          this.enableTaskScheduling();
          break;
      }
    });
  }

  // Trigger memory cleanup
  private triggerMemoryCleanup(): void {
    // Clear caches
    if (window.caches) {
      window.caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('temp') || name.includes('old')) {
            window.caches.delete(name);
          }
        });
      });
    }

    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }

  // Enable task scheduling for better performance
  private enableTaskScheduling(): void {
    // Use scheduler API if available
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      console.log('Enabling task scheduling optimization');
      // Implementation would depend on specific use case
    }
  }
}
```

## Benefits and Advantages

### 1. Scalability
- **Handle Thousands of Trucks**: Efficiently manage large fleets without performance degradation
- **Progressive Loading**: Load data incrementally to maintain responsiveness
- **Intelligent Caching**: Reduce server load and improve response times
- **Memory Management**: Prevent memory leaks and optimize resource usage

### 2. User Experience
- **Smooth Animations**: Maintain 60 FPS even with many moving elements
- **Fast Search**: Instant search results with intelligent indexing
- **Responsive Interface**: Quick response to user interactions
- **Offline Capability**: Continue working with cached data when offline

### 3. Resource Efficiency
- **Optimized Network Usage**: Batch requests and compress data
- **Reduced Server Load**: Intelligent caching and request deduplication
- **Battery Optimization**: Efficient algorithms for mobile devices
- **Bandwidth Conservation**: Progressive loading and compression

### 4. Monitoring and Optimization
- **Real-time Metrics**: Continuous performance monitoring
- **Automatic Optimization**: Self-tuning performance parameters
- **Proactive Alerts**: Early warning for performance issues
- **Detailed Analytics**: Comprehensive performance insights

## Conclusion

The comprehensive performance optimization strategies ensure the Saudi trip tracking system can handle large-scale operations while maintaining excellent user experience, with intelligent monitoring and automatic optimization capabilities that adapt to changing conditions and usage patterns.