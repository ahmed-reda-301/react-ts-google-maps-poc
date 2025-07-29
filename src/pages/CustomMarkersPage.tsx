import React, { useState } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import CustomMarker from '../components/maps/CustomMarker';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { LatLng } from '../types/common/LatLng';

const containerStyle = {
  width: '100%',
  height: '500px',
};

/**
 * Custom Markers Page - Demonstrates various custom marker implementations
 */
const CustomMarkersPage: React.FC = () => {
  const [markers, setMarkers] = useState<Array<{ id: string; position: LatLng; type: string; title: string }>>([
    {
      id: '1',
      position: { lat: 30.0444, lng: 31.2357 }, // Cairo
      type: 'restaurant',
      title: 'Restaurant in Cairo'
    },
    {
      id: '2',
      position: { lat: 30.0626, lng: 31.2497 }, // Cairo - different location
      type: 'hotel',
      title: 'Hotel in Cairo'
    },
    {
      id: '3',
      position: { lat: 30.0131, lng: 31.2089 }, // Cairo - another location
      type: 'attraction',
      title: 'Tourist Attraction'
    }
  ]);

  const [selectedMarkerType, setSelectedMarkerType] = useState<string>('restaurant');

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = {
        id: Date.now().toString(),
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        type: selectedMarkerType,
        title: `New ${selectedMarkerType} marker`
      };
      setMarkers([...markers, newMarker]);
    }
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  const resetToDefault = () => {
    setMarkers([
      {
        id: '1',
        position: { lat: 30.0444, lng: 31.2357 },
        type: 'restaurant',
        title: 'Restaurant in Cairo'
      },
      {
        id: '2',
        position: { lat: 30.0626, lng: 31.2497 },
        type: 'hotel',
        title: 'Hotel in Cairo'
      },
      {
        id: '3',
        position: { lat: 30.0131, lng: 31.2089 },
        type: 'attraction',
        title: 'Tourist Attraction'
      }
    ]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Markers Demo</h1>
      <p>This page demonstrates how to implement custom markers with different styles and types.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Interactive Controls</h3>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="marker-type" style={{ display: 'block', marginBottom: '5px' }}>
              Select Marker Type:
            </label>
            <select
              id="marker-type"
              value={selectedMarkerType}
              onChange={(e) => setSelectedMarkerType(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="attraction">Attraction</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button onClick={clearMarkers} variant="secondary">
              Clear All Markers
            </Button>
            <Button onClick={resetToDefault}>
              Reset to Default
            </Button>
          </div>
        </Card>

        <Card>
          <h3>Instructions</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Click on the map to add a new marker</li>
            <li>Select marker type before clicking</li>
            <li>Each marker type has a different icon</li>
            <li>Hover over markers to see titles</li>
          </ul>
        </Card>
      </div>

      <InfoBox variant="info">
        <strong>Interactive Map:</strong> Click anywhere on the map to add a new marker of the selected type.
        Current markers: {markers.length}
      </InfoBox>

      <div style={{ height: '500px', marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 30.0444, lng: 31.2357 }}
            zoom={12}
            onClick={handleMapClick}
          >
            {markers.map((marker) => (
              <CustomMarker
                key={marker.id}
                id={marker.id}
                position={marker.position}
                title={marker.title}
                category={marker.type}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Custom Marker Component Usage
import CustomMarker from '../components/maps/CustomMarker';

// In your component
<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <CustomMarker
    position={{lat: 30.0444, lng: 31.2357}}
    title="Restaurant in Cairo"
    icon={{
      url: '/icons/restaurant.png',
      scaledSize: new google.maps.Size(40, 40)
    }}
  />
</GoogleMap>`}
        </CodeBlock>
      </Card>

      <Card>
        <h3>Features Demonstrated</h3>
        <ul>
          <li><strong>Custom Icons:</strong> Different marker types with custom icons</li>
          <li><strong>Interactive Placement:</strong> Click to add markers dynamically</li>
          <li><strong>Marker Management:</strong> Add, clear, and reset markers</li>
          <li><strong>Type Selection:</strong> Choose marker type before placement</li>
          <li><strong>Hover Effects:</strong> Titles appear on hover</li>
        </ul>
      </Card>
    </div>
  );
};

// Helper function to get marker icon based on type
const getMarkerIcon = (type: string): string => {
  const icons = {
    restaurant: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
    hotel: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
    attraction: 'https://maps.google.com/mapfiles/ms/icons/camera.png'
  };
  return icons[type as keyof typeof icons] || icons.restaurant;
};

export default CustomMarkersPage;