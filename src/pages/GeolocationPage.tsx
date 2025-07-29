import React, { useState, useEffect } from 'react';
import GoogleMap from '../components/maps/GoogleMap';
import CustomMarker from '../components/maps/CustomMarker';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { useGeolocation } from '../hooks/useGeolocation';
import { LatLng } from '../types/common/LatLng';

/**
 * Geolocation Page - Demonstrates geolocation features and user positioning
 */
const GeolocationPage: React.FC = () => {
  const { location, error, loading, getCurrentLocation, watchLocation, clearWatch } = useGeolocation();
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [locationHistory, setLocationHistory] = useState<Array<{ position: LatLng; timestamp: Date }>>([]);
  const [mapCenter, setMapCenter] = useState<LatLng>({ lat: 30.0444, lng: 31.2357 });
  const [showAccuracyCircle, setShowAccuracyCircle] = useState<boolean>(true);

  useEffect(() => {
    if (location) {
      const newLocation = {
        position: { lat: location.latitude, lng: location.longitude },
        timestamp: new Date()
      };
      
      setLocationHistory(prev => {
        const updated = [...prev, newLocation];
        // Keep only last 10 locations
        return updated.slice(-10);
      });
      
      setMapCenter({ lat: location.latitude, lng: location.longitude });
    }
  }, [location]);

  const handleGetCurrentLocation = () => {
    getCurrentLocation();
  };

  const handleStartWatching = () => {
    watchLocation();
    setIsWatching(true);
  };

  const handleStopWatching = () => {
    clearWatch();
    setIsWatching(false);
  };

  const clearHistory = () => {
    setLocationHistory([]);
  };

  const formatCoordinate = (coord: number): string => {
    return coord.toFixed(6);
  };

  const formatTimestamp = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString();
  };

  const calculateDistance = (pos1: LatLng, pos2: LatLng): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = pos1.lat * Math.PI/180;
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat-pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng-pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const getLocationStatus = (): string => {
    if (loading) return 'Getting location...';
    if (error) return `Error: ${error}`;
    if (location) return 'Location found';
    return 'No location data';
  };

  const getLocationStatusType = (): 'info' | 'warning' | 'error' => {
    if (loading) return 'info';
    if (error) return 'error';
    if (location) return 'info';
    return 'warning';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Geolocation Demo</h1>
      <p>This page demonstrates how to implement geolocation features to track user position and movement.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Location Controls</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <Button 
              onClick={handleGetCurrentLocation} 
              disabled={loading}
            >
              {loading ? 'Getting...' : 'Get Current Location'}
            </Button>
            <Button 
              onClick={isWatching ? handleStopWatching : handleStartWatching}
              variant={isWatching ? 'secondary' : 'primary'}
            >
              {isWatching ? 'Stop Watching' : 'Watch Location'}
            </Button>
            <Button onClick={clearHistory} variant="secondary">
              Clear History
            </Button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showAccuracyCircle}
                onChange={(e) => setShowAccuracyCircle(e.target.checked)}
              />
              Show Accuracy Circle
            </label>
          </div>

          <div style={{ fontSize: '14px', color: '#666' }}>
            <p><strong>Status:</strong> {getLocationStatus()}</p>
            <p><strong>Watching:</strong> {isWatching ? 'Active' : 'Inactive'}</p>
            <p><strong>History Points:</strong> {locationHistory.length}</p>
          </div>
        </Card>

        <Card>
          <h3>Current Location Data</h3>
          {location ? (
            <div style={{ fontSize: '14px' }}>
              <p><strong>Latitude:</strong> {formatCoordinate(location.latitude)}</p>
              <p><strong>Longitude:</strong> {formatCoordinate(location.longitude)}</p>
              <p><strong>Accuracy:</strong> ±{location.accuracy?.toFixed(0)} meters</p>
              {location.altitude && (
                <p><strong>Altitude:</strong> {location.altitude.toFixed(0)} meters</p>
              )}
              {location.heading && (
                <p><strong>Heading:</strong> {location.heading.toFixed(0)}°</p>
              )}
              {location.speed && (
                <p><strong>Speed:</strong> {(location.speed * 3.6).toFixed(1)} km/h</p>
              )}
              <p><strong>Timestamp:</strong> {new Date(location.timestamp).toLocaleString()}</p>
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              No location data available. Click "Get Current Location" to start.
            </p>
          )}
        </Card>
      </div>

      <InfoBox variant={getLocationStatusType()}>
        <strong>Geolocation Status:</strong> {getLocationStatus()}
        {isWatching && ' - Continuously tracking your position.'}
      </InfoBox>

      <div style={{ height: '500px', marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <GoogleMap
          center={mapCenter}
          zoom={15}
        >
          {/* Current Location Marker */}
          {location && (
            <CustomMarker
              position={{ lat: location.latitude, lng: location.longitude }}
              title={`Current Location (±${location.accuracy?.toFixed(0)}m)`}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          )}

          {/* Location History Markers */}
          {locationHistory.slice(0, -1).map((historyPoint, index) => (
            <CustomMarker
              key={`history-${index}`}
              position={historyPoint.position}
              title={`Previous Location - ${formatTimestamp(historyPoint.timestamp)}`}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/grey-dot.png',
                scaledSize: new google.maps.Size(20, 20)
              }}
            />
          ))}

          {/* Accuracy Circle */}
          {location && showAccuracyCircle && location.accuracy && (
            <div>
              {/* Note: In a real implementation, you would use a Circle component */}
              {/* This is a placeholder for the accuracy circle visualization */}
            </div>
          )}
        </GoogleMap>
      </div>

      {/* Location History Table */}
      {locationHistory.length > 0 && (
        <Card>
          <h3>Location History</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Time</th>
                  <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Latitude</th>
                  <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Longitude</th>
                  <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Distance from Previous</th>
                </tr>
              </thead>
              <tbody>
                {locationHistory.map((point, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {formatTimestamp(point.timestamp)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {formatCoordinate(point.position.lat)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {formatCoordinate(point.position.lng)}
                    </td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                      {index > 0 
                        ? `${calculateDistance(locationHistory[index-1].position, point.position).toFixed(0)}m`
                        : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Using the Geolocation Hook
import { useGeolocation } from '../hooks/useGeolocation';

// In your component
const { location, error, loading, getCurrentLocation, watchLocation, clearWatch } = useGeolocation();

// Get current location once
const handleGetLocation = () => {
  getCurrentLocation();
};

// Watch location continuously
const handleWatchLocation = () => {
  watchLocation();
};

// Display current location
{location && (
  <CustomMarker
    position={{ lat: location.latitude, lng: location.longitude }}
    title={\`Current Location (±\${location.accuracy}m)\`}
  />
)}`}
        </CodeBlock>
      </Card>

      <Card>
        <h3>Features Demonstrated</h3>
        <ul>
          <li><strong>Current Location:</strong> Get user's current position once</li>
          <li><strong>Location Watching:</strong> Continuously track position changes</li>
          <li><strong>Location History:</strong> Track and display movement over time</li>
          <li><strong>Accuracy Information:</strong> Show GPS accuracy and confidence</li>
          <li><strong>Additional Data:</strong> Altitude, heading, and speed when available</li>
          <li><strong>Error Handling:</strong> Handle permission denials and errors</li>
          <li><strong>Distance Calculation:</strong> Calculate movement between points</li>
        </ul>
      </Card>
    </div>
  );
};

export default GeolocationPage;