import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, Marker, InfoWindow, Polyline, Circle, MarkerClusterer } from '@react-google-maps/api';
import CodeBlock from '../components/CodeBlock';

const BasicComponentsDemo: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('GoogleMap');
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [mapCenter] = useState({ lat: 24.7136, lng: 46.6753 }); // Riyadh
  const [mapZoom] = useState(6);

  // Sample data for demonstrations
  const sampleMarkers = [
    { id: '1', position: { lat: 24.7136, lng: 46.6753 }, title: 'Riyadh - Capital', type: 'city' },
    { id: '2', position: { lat: 21.4858, lng: 39.1925 }, title: 'Jeddah - Port City', type: 'port' },
    { id: '3', position: { lat: 26.4207, lng: 50.0888 }, title: 'Dammam - Eastern Province', type: 'city' },
    { id: '4', position: { lat: 21.3891, lng: 39.8579 }, title: 'Mecca - Holy City', type: 'religious' },
    { id: '5', position: { lat: 24.5247, lng: 39.5692 }, title: 'Medina - Holy City', type: 'religious' }
  ];

  const sampleRoute = [
    { lat: 24.7136, lng: 46.6753 }, // Riyadh
    { lat: 24.0000, lng: 45.0000 },
    { lat: 23.0000, lng: 43.0000 },
    { lat: 22.0000, lng: 41.0000 },
    { lat: 21.4858, lng: 39.1925 }  // Jeddah
  ];

  // Generate cluster markers
  const clusterMarkers = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i.toString(),
      position: {
        lat: 24.7136 + (Math.random() - 0.5) * 0.5,
        lng: 46.6753 + (Math.random() - 0.5) * 0.5
      }
    })), []
  );

  const onMarkerClick = useCallback((markerId: string) => {
    setSelectedMarker(markerId);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const getMarkerIcon = (type: string) => {
    const icons: Record<string, string> = {
      city: '🏙️',
      port: '🚢',
      religious: '🕌'
    };
    return icons[type] || '📍';
  };

  const componentExamples = {
    GoogleMap: {
      title: 'GoogleMap - Main Map Component',
      description: 'The core component that renders the Google Map with Saudi Arabia boundaries.',
      code: `import { GoogleMap } from '@react-google-maps/api';

const SaudiMap = () => {
  const mapOptions = {
    center: { lat: 24.7136, lng: 46.6753 }, // Riyadh
    zoom: 6,
    restriction: {
      latLngBounds: {
        north: 32.5, south: 16.0,
        east: 55.0, west: 34.0
      }
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      options={mapOptions}
    />
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={mapZoom}
          options={{
            restriction: {
              latLngBounds: {
                north: 32.5, south: 16.0,
                east: 55.0, west: 34.0
              }
            }
          }}
        />
      )
    },

    Marker: {
      title: 'Marker - Location Markers',
      description: 'Display markers for cities, airports, ports, and other important locations in Saudi Arabia.',
      code: `import { Marker } from '@react-google-maps/api';

const SaudiLocations = () => {
  const locations = [
    { id: '1', position: { lat: 24.7136, lng: 46.6753 }, title: 'Riyadh' },
    { id: '2', position: { lat: 21.4858, lng: 39.1925 }, title: 'Jeddah' },
    { id: '3', position: { lat: 26.4207, lng: 50.0888 }, title: 'Dammam' }
  ];

  return (
    <>
      {locations.map(location => (
        <Marker
          key={location.id}
          position={location.position}
          title={location.title}
          onClick={() => console.log('Clicked:', location.title)}
        />
      ))}
    </>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={mapZoom}
        >
          {sampleMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              onClick={() => onMarkerClick(marker.id)}
            />
          ))}
        </GoogleMap>
      )
    },

    InfoWindow: {
      title: 'InfoWindow - Information Popups',
      description: 'Display detailed information when users click on markers or map elements.',
      code: `import { Marker, InfoWindow } from '@react-google-maps/api';

const MarkerWithInfo = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <>
      <Marker
        position={{ lat: 24.7136, lng: 46.6753 }}
        onClick={() => setSelectedMarker('riyadh')}
      />
      
      {selectedMarker === 'riyadh' && (
        <InfoWindow
          position={{ lat: 24.7136, lng: 46.6753 }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>Riyadh</h3>
            <p>Capital city of Saudi Arabia</p>
            <p>Population: ~7 million</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={mapZoom}
        >
          {sampleMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              onClick={() => onMarkerClick(marker.id)}
            />
          ))}
          
          {selectedMarker && (
            <InfoWindow
              position={sampleMarkers.find(m => m.id === selectedMarker)?.position}
              onCloseClick={onInfoWindowClose}
            >
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>
                  {getMarkerIcon(sampleMarkers.find(m => m.id === selectedMarker)?.type || '')} {' '}
                  {sampleMarkers.find(m => m.id === selectedMarker)?.title}
                </h3>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  Location details and information about this place.
                </p>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Lat: {sampleMarkers.find(m => m.id === selectedMarker)?.position.lat.toFixed(4)}<br/>
                  Lng: {sampleMarkers.find(m => m.id === selectedMarker)?.position.lng.toFixed(4)}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )
    },

    Polyline: {
      title: 'Polyline - Route Lines',
      description: 'Draw routes and paths between locations, useful for showing truck routes and planned paths.',
      code: `import { Polyline } from '@react-google-maps/api';

const TruckRoute = () => {
  const routePath = [
    { lat: 24.7136, lng: 46.6753 }, // Riyadh
    { lat: 24.0000, lng: 45.0000 },
    { lat: 23.0000, lng: 43.0000 },
    { lat: 22.0000, lng: 41.0000 },
    { lat: 21.4858, lng: 39.1925 }  // Jeddah
  ];

  return (
    <Polyline
      path={routePath}
      options={{
        strokeColor: '#2196F3',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }}
    />
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={6}
        >
          <Polyline
            path={sampleRoute}
            options={{
              strokeColor: '#2196F3',
              strokeWeight: 4,
              strokeOpacity: 0.8
            }}
          />
          <Marker position={sampleRoute[0]} title="Start: Riyadh" />
          <Marker position={sampleRoute[sampleRoute.length - 1]} title="End: Jeddah" />
        </GoogleMap>
      )
    },

    Circle: {
      title: 'Circle - Circular Areas',
      description: 'Define circular areas for checkpoints, geofencing, and area monitoring.',
      code: `import { Circle, Marker } from '@react-google-maps/api';

const CheckpointArea = () => {
  const checkpoint = { lat: 24.7136, lng: 46.6753 };
  const radius = 50000; // 50km radius

  return (
    <>
      <Marker position={checkpoint} title="Checkpoint" />
      <Circle
        center={checkpoint}
        radius={radius}
        options={{
          fillColor: '#4CAF50',
          fillOpacity: 0.2,
          strokeColor: '#4CAF50',
          strokeWeight: 2
        }}
      />
    </>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={6}
        >
          <Circle
            center={mapCenter}
            radius={50000}
            options={{
              fillColor: '#4CAF50',
              fillOpacity: 0.2,
              strokeColor: '#4CAF50',
              strokeWeight: 2
            }}
          />
          <Marker position={mapCenter} title="Riyadh Checkpoint" />
        </GoogleMap>
      )
    },

    MarkerClusterer: {
      title: 'MarkerClusterer - Marker Clustering',
      description: 'Group nearby markers together for better performance and cleaner map display.',
      code: `import { MarkerClusterer, Marker } from '@react-google-maps/api';

const ClusteredMarkers = () => {
  const markers = [
    { id: '1', position: { lat: 24.7136, lng: 46.6753 } },
    { id: '2', position: { lat: 24.7200, lng: 46.6800 } },
    { id: '3', position: { lat: 24.7100, lng: 46.6700 } },
    // ... more markers
  ];

  return (
    <MarkerClusterer>
      {(clusterer) => (
        <>
          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              clusterer={clusterer}
            />
          ))}
        </>
      )}
    </MarkerClusterer>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={8}
        >
          <MarkerClusterer>
            {(clusterer) => (
              <>
                {clusterMarkers.map(marker => (
                  <Marker
                    key={marker.id}
                    position={marker.position}
                    clusterer={clusterer}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>
        </GoogleMap>
      )
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        🗺️ Basic Google Maps Components Demo
      </h1>
      
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666', fontSize: '16px' }}>
        Interactive demonstrations of core Google Maps components used in the Saudi Arabia trip tracking system.
      </p>

      {/* Component selector */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '30px',
        justifyContent: 'center'
      }}>
        {Object.keys(componentExamples).map(component => (
          <button
            key={component}
            onClick={() => setSelectedComponent(component)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: selectedComponent === component ? '#2196F3' : '#f5f5f5',
              color: selectedComponent === component ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedComponent === component ? 'bold' : 'normal',
              transition: 'all 0.3s ease'
            }}
          >
            {component}
          </button>
        ))}
      </div>

      {/* Selected component demo */}
      {selectedComponent && componentExamples[selectedComponent as keyof typeof componentExamples] && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e9ecef'
          }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>
              {componentExamples[selectedComponent as keyof typeof componentExamples].title}
            </h2>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
              {componentExamples[selectedComponent as keyof typeof componentExamples].description}
            </p>
          </div>

          {/* Live demo */}
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
              🎮 Live Demo
            </h3>
            <div style={{
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {componentExamples[selectedComponent as keyof typeof componentExamples].component}
            </div>
          </div>

          {/* Code example */}
          <div style={{ padding: '20px', paddingTop: '0' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>
              💻 Code Example
            </h3>
            <CodeBlock
              code={componentExamples[selectedComponent as keyof typeof componentExamples].code}
              language="typescript"
            />
          </div>
        </div>
      )}

      {/* Usage tips */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#1976d2' }}>
          💡 Usage Tips
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
          <li>All components require the Google Maps API to be loaded first</li>
          <li>Use <code>@react-google-maps/api</code> library for React integration</li>
          <li>Set appropriate map restrictions for Saudi Arabia boundaries</li>
          <li>Optimize marker clustering for better performance with many markers</li>
          <li>Use InfoWindows to display detailed information about locations</li>
          <li>Combine Polylines and Markers to show routes and waypoints</li>
        </ul>
      </div>

      {/* Next steps */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f3e5f5',
        borderRadius: '8px',
        border: '1px solid #ce93d8'
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#7b1fa2' }}>
          🚀 Next Steps
        </h3>
        <p style={{ margin: '0', color: '#333' }}>
          Ready to see advanced custom components? Check out the{' '}
          <a href="/custom-components-demo" style={{ color: '#7b1fa2', textDecoration: 'none', fontWeight: 'bold' }}>
            Custom Components Demo
          </a>{' '}
          to see how these basic components are enhanced for the Saudi logistics system.
        </p>
      </div>
    </div>
  );
};

export default BasicComponentsDemo;