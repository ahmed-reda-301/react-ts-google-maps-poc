# StreetViewService Component

## Overview
`StreetViewService` is a component that provides access to Google Street View metadata and panorama information. It allows you to check Street View availability, retrieve panorama data, and get information about Street View imagery before displaying it.

## Import
```typescript
import { StreetViewService } from '@react-google-maps/api';
```

## Props

### Basic Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `StreetViewLocationRequest \| StreetViewPanoRequest` | ✅ | - | Service request configuration |
| `callback` | `(data: StreetViewPanoramaData \| null, status: StreetViewStatus) => void` | ✅ | - | Callback function for results |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onLoad` | `(streetViewService: google.maps.StreetViewService) => void` | Called when service loads |
| `onUnmount` | `(streetViewService: google.maps.StreetViewService) => void` | Called when service unmounts |

## Request Types

### StreetViewLocationRequest
| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `location` | `LatLng \| LatLngLiteral` | ✅ | Location to search for Street View |
| `radius` | `number` | ❌ | Search radius in meters (default: 50) |
| `preference` | `StreetViewPreference` | ❌ | Preference for panorama selection |
| `source` | `StreetViewSource` | ❌ | Source of Street View imagery |

### StreetViewPanoRequest
| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `pano` | `string` | ✅ | Specific panorama ID |

## Usage Examples

### Street View Availability Checker
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, StreetViewService, Marker } from '@react-google-maps/api';

interface AvailabilityResult {
  position: google.maps.LatLngLiteral;
  available: boolean;
  panoramaData?: google.maps.StreetViewPanoramaData;
  error?: string;
}

const StreetViewAvailabilityChecker: React.FC = () => {
  const [checkingLocation, setCheckingLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [results, setResults] = useState<AvailabilityResult[]>([]);
  const [checking, setChecking] = useState(false);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      
      setCheckingLocation(location);
      setChecking(true);
    }
  };

  const handleStreetViewResponse = (
    data: google.maps.StreetViewPanoramaData | null,
    status: google.maps.StreetViewStatus
  ) => {
    setChecking(false);
    
    if (checkingLocation) {
      const result: AvailabilityResult = {
        position: checkingLocation,
        available: status === 'OK' && data !== null,
        panoramaData: data || undefined,
        error: status !== 'OK' ? getStatusMessage(status) : undefined
      };
      
      setResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
      setCheckingLocation(null);
    }
  };

  const getStatusMessage = (status: google.maps.StreetViewStatus) => {
    const messages = {
      'ZERO_RESULTS': 'No Street View imagery available at this location',
      'OVER_QUERY_LIMIT': 'Query limit exceeded',
      'REQUEST_DENIED': 'Request denied',
      'INVALID_REQUEST': 'Invalid request',
      'UNKNOWN_ERROR': 'Unknown error occurred'
    };
    return messages[status as keyof typeof messages] || 'Street View check failed';
  };

  const clearResults = () => {
    setResults([]);
  };

  const getMarkerColor = (available: boolean) => {
    return available ? '#28a745' : '#dc3545';
  };

  const getMarkerIcon = (available: boolean) => {
    return available ? '✅' : '❌';
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Street View Availability Checker</h3>
          <p>Click on the map to check if Street View is available at that location</p>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>Instructions:</strong> Click anywhere on the map to check Street View availability. 
            Green markers indicate available locations, red markers indicate unavailable locations.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={clearResults}
              disabled={results.length === 0}
              style={{
                padding: '8px 16px',
                backgroundColor: results.length > 0 ? '#dc3545' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: results.length > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              Clear Results
            </button>
            
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: checking ? '#ffc107' : '#6c757d',
              color: checking ? 'black' : 'white',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              Status: {checking ? 'Checking...' : 'Ready'}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4>Statistics:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                  {results.length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Checked</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                  {results.filter(r => r.available).length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Available</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>
                  {results.filter(r => !r.available).length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Unavailable</div>
              </div>
              
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                  {results.length > 0 ? Math.round((results.filter(r => r.available).length / results.length) * 100) : 0}%
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Success Rate</div>
              </div>
            </div>
          </div>

          {results.length > 0 && (
            <div>
              <h4>Recent Checks:</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {results.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      backgroundColor: result.available ? '#d4edda' : '#f8d7da',
                      borderRadius: '4px',
                      marginBottom: '5px',
                      border: `1px solid ${result.available ? '#c3e6cb' : '#f5c6cb'}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>
                          {getMarkerIcon(result.available)}
                        </span>
                        <strong>
                          {result.position.lat.toFixed(6)}, {result.position.lng.toFixed(6)}
                        </strong>
                      </div>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: getMarkerColor(result.available),
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '10px',
                        textTransform: 'uppercase'
                      }}>
                        {result.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    
                    {result.panoramaData && (
                      <div style={{ fontSize: '12px', color: '#155724', marginTop: '5px' }}>
                        Panorama ID: {result.panoramaData.location?.pano}
                        <br />
                        Image Date: {result.panoramaData.imageDate || 'Unknown'}
                      </div>
                    )}
                    
                    {result.error && (
                      <div style={{ fontSize: '12px', color: '#721c24', marginTop: '5px' }}>
                        {result.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={center}
          onClick={onMapClick}
          options={{
            cursor: 'crosshair'
          }}
        >
          {/* Show all checked locations */}
          {results.map((result, index) => (
            <Marker
              key={index}
              position={result.position}
              title={result.available ? 'Street View Available' : 'Street View Unavailable'}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: getMarkerColor(result.available),
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          ))}

          {/* Show current checking location */}
          {checkingLocation && (
            <Marker
              position={checkingLocation}
              title="Checking Street View..."
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#ffc107',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
            />
          )}

          {checking && checkingLocation && (
            <StreetViewService
              options={{
                location: checkingLocation,
                radius: 50,
                preference: window.google.maps.StreetViewPreference.NEAREST
              }}
              callback={handleStreetViewResponse}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default StreetViewAvailabilityChecker;
```

### Panorama Information Explorer
```typescript
import React, { useState } from 'react';
import { GoogleMap, LoadScript, StreetViewService, Marker, InfoWindow } from '@react-google-maps/api';

interface PanoramaInfo {
  position: google.maps.LatLngLiteral;
  panoramaData: google.maps.StreetViewPanoramaData;
  links: google.maps.StreetViewLink[];
  copyright: string;
  imageDate: string;
}

const PanoramaInfoExplorer: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [panoramaInfo, setPanoramaInfo] = useState<PanoramaInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      
      setSelectedLocation(location);
      setLoading(true);
      setPanoramaInfo(null);
      setShowInfoWindow(false);
    }
  };

  const handlePanoramaResponse = (
    data: google.maps.StreetViewPanoramaData | null,
    status: google.maps.StreetViewStatus
  ) => {
    setLoading(false);
    
    if (status === 'OK' && data && selectedLocation) {
      const info: PanoramaInfo = {
        position: selectedLocation,
        panoramaData: data,
        links: data.links || [],
        copyright: data.copyright || 'No copyright information',
        imageDate: data.imageDate || 'Unknown date'
      };
      
      setPanoramaInfo(info);
      setShowInfoWindow(true);
    } else {
      alert('No Street View data available for this location');
    }
  };

  const navigateToLink = (link: google.maps.StreetViewLink) => {
    if (link.pano) {
      // Get panorama data by ID
      setLoading(true);
      setShowInfoWindow(false);
      
      // This would trigger another StreetViewService call with pano ID
      console.log('Navigate to panorama:', link.pano);
    }
  };

  const formatImageDate = (dateString: string) => {
    if (!dateString || dateString === 'Unknown date') return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getDirectionIcon = (heading: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Panorama Information Explorer</h3>
          <p>Click on the map to explore Street View panorama details and navigation links</p>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            <strong>Features:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>View panorama metadata and image dates</li>
              <li>Explore navigation links to nearby panoramas</li>
              <li>See copyright and attribution information</li>
              <li>Understand panorama connectivity</li>
            </ul>
          </div>

          {panoramaInfo && (
            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
                Panorama Information
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <strong>Location:</strong>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {panoramaInfo.position.lat.toFixed(6)}, {panoramaInfo.position.lng.toFixed(6)}
                  </div>
                </div>
                
                <div>
                  <strong>Panorama ID:</strong>
                  <div style={{ fontSize: '14px', color: '#666', wordBreak: 'break-all' }}>
                    {panoramaInfo.panoramaData.location?.pano || 'Unknown'}
                  </div>
                </div>
                
                <div>
                  <strong>Image Date:</strong>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {formatImageDate(panoramaInfo.imageDate)}
                  </div>
                </div>
                
                <div>
                  <strong>Navigation Links:</strong>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {panoramaInfo.links.length} available
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong>Copyright:</strong>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  {panoramaInfo.copyright}
                </div>
              </div>

              {panoramaInfo.links.length > 0 && (
                <div>
                  <strong>Navigation Links:</strong>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                    gap: '10px', 
                    marginTop: '10px' 
                  }}>
                    {panoramaInfo.links.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => navigateToLink(link)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontWeight: 'bold' }}>
                          {getDirectionIcon(link.heading || 0)} {Math.round(link.heading || 0)}°
                        </div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>
                          {link.description || 'Navigate'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          onClick={onMapClick}
          options={{
            cursor: 'crosshair'
          }}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              title="Selected Location"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: loading ? 10 : 8,
                fillColor: loading ? '#ffc107' : panoramaInfo ? '#28a745' : '#dc3545',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }}
              onClick={() => setShowInfoWindow(true)}
            />
          )}

          {showInfoWindow && selectedLocation && panoramaInfo && (
            <InfoWindow
              position={selectedLocation}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div style={{ maxWidth: '250px', padding: '5px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                  Street View Available
                </h4>
                
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  <strong>Image Date:</strong> {formatImageDate(panoramaInfo.imageDate)}
                </div>
                
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  <strong>Navigation Options:</strong> {panoramaInfo.links.length}
                </div>
                
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Click marker for detailed information
                </div>
              </div>
            </InfoWindow>
          )}

          {loading && selectedLocation && (
            <StreetViewService
              options={{
                location: selectedLocation,
                radius: 50,
                preference: window.google.maps.StreetViewPreference.NEAREST
              }}
              callback={handlePanoramaResponse}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default PanoramaInfoExplorer;
```

### Street View Coverage Analyzer
```typescript
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, StreetViewService, Rectangle } from '@react-google-maps/api';

interface CoverageResult {
  bounds: google.maps.LatLngBoundsLiteral;
  totalPoints: number;
  availablePoints: number;
  coveragePercentage: number;
  samplePoints: Array<{
    position: google.maps.LatLngLiteral;
    available: boolean;
  }>;
}

const StreetViewCoverageAnalyzer: React.FC = () => {
  const [selectedBounds, setSelectedBounds] = useState<google.maps.LatLngBoundsLiteral | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [progress, setProgress] = useState(0);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const predefinedAreas = {
    downtown: {
      name: 'Downtown Riyadh',
      bounds: {
        north: 24.7300,
        south: 24.6900,
        east: 46.6900,
        west: 46.6500
      }
    },
    business: {
      name: 'Business District',
      bounds: {
        north: 24.7200,
        south: 24.7000,
        east: 46.6800,
        west: 46.6600
      }
    },
    historical: {
      name: 'Historical Area',
      bounds: {
        north: 24.6400,
        south: 24.6200,
        east: 46.7200,
        west: 46.7000
      }
    }
  };

  const selectPredefinedArea = (areaKey: string) => {
    const area = predefinedAreas[areaKey as keyof typeof predefinedAreas];
    setSelectedBounds(area.bounds);
    setResult(null);
  };

  const analyzeCoverage = useCallback(async () => {
    if (!selectedBounds) return;

    setAnalyzing(true);
    setProgress(0);
    setResult(null);

    // Generate sample points within bounds
    const samplePoints: Array<{ position: google.maps.LatLngLiteral; available: boolean }> = [];
    const gridSize = 10; // 10x10 grid
    const latStep = (selectedBounds.north - selectedBounds.south) / gridSize;
    const lngStep = (selectedBounds.east - selectedBounds.west) / gridSize;

    const totalPoints = gridSize * gridSize;
    let checkedPoints = 0;
    let availablePoints = 0;

    // Check each grid point
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const lat = selectedBounds.south + (i + 0.5) * latStep;
        const lng = selectedBounds.west + (j + 0.5) * lngStep;
        
        const position = { lat, lng };
        
        // Simulate Street View check (in real implementation, use StreetViewService)
        const available = Math.random() > 0.3; // 70% availability for demo
        
        samplePoints.push({ position, available });
        
        if (available) {
          availablePoints++;
        }
        
        checkedPoints++;
        setProgress((checkedPoints / totalPoints) * 100);
        
        // Add small delay to simulate real checking
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    const coverageResult: CoverageResult = {
      bounds: selectedBounds,
      totalPoints,
      availablePoints,
      coveragePercentage: (availablePoints / totalPoints) * 100,
      samplePoints
    };

    setResult(coverageResult);
    setAnalyzing(false);
    setProgress(0);
  }, [selectedBounds]);

  const clearAnalysis = () => {
    setSelectedBounds(null);
    setResult(null);
    setProgress(0);
  };

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    if (percentage >= 40) return '#fd7e14';
    return '#dc3545';
  };

  const getCoverageLabel = (percentage: number) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <div>
        <div style={{ marginBottom: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Street View Coverage Analyzer</h3>
          <p>Analyze Street View coverage for specific areas</p>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Select Analysis Area:
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.entries(predefinedAreas).map(([key, area]) => (
                <button
                  key={key}
                  onClick={() => selectPredefinedArea(key)}
                  disabled={analyzing}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: analyzing ? '#6c757d' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: analyzing ? 'not-allowed' : 'pointer'
                  }}
                >
                  {area.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={analyzeCoverage}
              disabled={!selectedBounds || analyzing}
              style={{
                padding: '10px 20px',
                backgroundColor: !selectedBounds || analyzing ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !selectedBounds || analyzing ? 'not-allowed' : 'pointer'
              }}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Coverage'}
            </button>
            
            <button
              onClick={clearAnalysis}
              disabled={analyzing}
              style={{
                padding: '10px 20px',
                backgroundColor: analyzing ? '#6c757d' : '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: analyzing ? 'not-allowed' : 'pointer'
              }}
            >
              Clear
            </button>
          </div>

          {analyzing && (
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Analysis Progress:</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e9ecef', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#007bff',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}

          {result && (
            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
                Coverage Analysis Results
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    color: getCoverageColor(result.coveragePercentage)
                  }}>
                    {Math.round(result.coveragePercentage)}%
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Coverage</div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: getCoverageColor(result.coveragePercentage),
                    fontWeight: 'bold'
                  }}>
                    {getCoverageLabel(result.coveragePercentage)}
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    {result.availablePoints}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Available</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                    {result.totalPoints - result.availablePoints}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Unavailable</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                    {result.totalPoints}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Total Sampled</div>
                </div>
              </div>

              <div style={{ 
                padding: '10px', 
                backgroundColor: getCoverageColor(result.coveragePercentage) + '20',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                <strong>Analysis Summary:</strong> Street View coverage in this area is {getCoverageLabel(result.coveragePercentage).toLowerCase()} 
                with {result.availablePoints} out of {result.totalPoints} sample points having available imagery.
              </div>
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
        >
          {selectedBounds && (
            <Rectangle
              bounds={selectedBounds}
              options={{
                fillColor: analyzing ? '#ffc107' : result ? getCoverageColor(result.coveragePercentage) : '#007bff',
                fillOpacity: 0.2,
                strokeColor: analyzing ? '#ffc107' : result ? getCoverageColor(result.coveragePercentage) : '#007bff',
                strokeOpacity: 0.8,
                strokeWeight: 2
              }}
            />
          )}

          {/* Show sample points if analysis is complete */}
          {result && result.samplePoints.map((point, index) => (
            <div key={index}>
              {/* Small markers for sample points */}
              <div
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  backgroundColor: point.available ? '#28a745' : '#dc3545',
                  borderRadius: '50%',
                  transform: 'translate(-2px, -2px)'
                }}
              />
            </div>
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default StreetViewCoverageAnalyzer;
```

## Best Practices

### 1. Efficient Batch Processing
```typescript
// Batch multiple requests with proper delays
const useBatchStreetViewCheck = () => {
  const checkMultipleLocations = async (
    locations: LatLng[],
    batchSize: number = 5,
    delay: number = 200
  ) => {
    const results = [];
    
    for (let i = 0; i < locations.length; i += batchSize) {
      const batch = locations.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(location => checkStreetViewAvailability(location))
      );
      
      results.push(...batchResults);
      
      // Add delay between batches
      if (i + batchSize < locations.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return results;
  };
  
  return { checkMultipleLocations };
};
```

### 2. Caching Strategy
```typescript
// Cache Street View availability results
const useStreetViewCache = () => {
  const cache = useRef(new Map<string, boolean>());
  
  const getCacheKey = (location: LatLng, radius: number) => {
    return `${location.lat.toFixed(6)},${location.lng.toFixed(6)},${radius}`;
  };
  
  const getCachedResult = (location: LatLng, radius: number = 50) => {
    return cache.current.get(getCacheKey(location, radius));
  };
  
  const setCachedResult = (location: LatLng, available: boolean, radius: number = 50) => {
    cache.current.set(getCacheKey(location, radius), available);
  };
  
  return { getCachedResult, setCachedResult };
};
```

### 3. Error Handling
```typescript
// Comprehensive error handling for Street View Service
const handleStreetViewError = (status: google.maps.StreetViewStatus) => {
  const errorHandlers = {
    'ZERO_RESULTS': () => 'No Street View imagery available at this location',
    'OVER_QUERY_LIMIT': () => 'Too many requests. Please wait and try again.',
    'REQUEST_DENIED': () => 'Request denied. Check your API key permissions.',
    'INVALID_REQUEST': () => 'Invalid request parameters.',
    'UNKNOWN_ERROR': () => 'Server error. Please try again later.'
  };
  
  const handler = errorHandlers[status];
  return handler ? handler() : 'Street View request failed';
};
```

## Common Issues and Solutions

### 1. Rate limiting
- Implement proper delays between requests
- Use batch processing with appropriate intervals
- Cache results to avoid redundant requests

### 2. No results in certain areas
- Street View coverage varies by location
- Try increasing search radius
- Provide fallback options for unavailable areas

### 3. Performance issues with large areas
- Use grid sampling instead of checking every point
- Implement progressive loading
- Consider server-side processing for large analyses

### 4. Outdated panorama information
- Street View imagery is updated periodically
- Check image dates when available
- Provide disclaimers about data currency

## Important Notes

- StreetViewService must be a child of GoogleMap component
- API quotas apply - monitor usage carefully
- Results are cached by Google for performance
- Street View availability varies significantly by location
- Use appropriate search radius for your use case
- Consider implementing fallback strategies for unavailable areas
- Batch operations should include proper rate limiting
- Cache results locally to improve performance and reduce API calls