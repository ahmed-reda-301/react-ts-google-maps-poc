import React, { useState, useEffect } from 'react';
import { Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { useGeolocation } from '../hooks/useGeolocation';
import { LatLng } from '../types/common/LatLng';
import { 
  EGYPT_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  CODE_EXAMPLES,
  MARKER_ICONS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  INFO_MESSAGES 
} from '../constants';

/**
 * Geolocation Page - Demonstrates geolocation features and user positioning
 */
const GeolocationPage: React.FC = () => {
  const { position, error, loading, getCurrentLocation, watchPosition, clearWatch } = useGeolocation();
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [locationHistory, setLocationHistory] = useState<Array<{ position: LatLng; timestamp: Date }>>([]);
  const [mapCenter, setMapCenter] = useState<LatLng>(EGYPT_LOCATIONS.cairo);

  useEffect(() => {
    if (position) {
      const newLocation = {
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        timestamp: new Date()
      };
      
      setLocationHistory(prev => {
        const updated = [...prev, newLocation];
        // Keep only last 10 locations
        return updated.slice(-10);
      });
      
      setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    }
  }, [position]);

  const handleGetCurrentLocation = () => {
    getCurrentLocation();
  };

  const handleStartWatching = () => {
    watchPosition();
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
    if (loading) return INFO_MESSAGES.gettingLocation;
    if (error) return `Error: ${error.message}`;
    if (position) return SUCCESS_MESSAGES.locationFound;
    return 'No location data';
  };

  const getLocationStatusType = (): 'info' | 'warning' | 'error' => {
    if (loading) return 'info';
    if (error) return 'error';
    if (position) return 'info';
    return 'warning';
  };

  return (
    <PageLayout
      title={PAGE_CONTENT.geolocation.title}
      subtitle={PAGE_CONTENT.geolocation.subtitle}
    >
      {/* Controls Section */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card title="Location Controls" padding="lg">
            <ControlsPanel layout="flex" gap="sm" marginBottom>
              <Button 
                onClick={handleGetCurrentLocation} 
                disabled={loading}
              >
                {loading ? 'Getting...' : UI_LABELS.getCurrentLocation}
              </Button>
              <Button 
                onClick={isWatching ? handleStopWatching : handleStartWatching}
                variant={isWatching ? 'secondary' : 'primary'}
              >
                {isWatching ? UI_LABELS.stopTracking : UI_LABELS.startTracking}
              </Button>
              <Button onClick={clearHistory} variant="secondary">
                Clear History
              </Button>
            </ControlsPanel>

            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>Status:</strong> {getLocationStatus()}</p>
              <p><strong>Watching:</strong> {isWatching ? UI_LABELS.active : UI_LABELS.inactive}</p>
              <p><strong>History Points:</strong> {locationHistory.length}</p>
            </div>
          </Card>

          <Card title="Current Location Data" padding="lg">
            {position ? (
              <div style={{ fontSize: '14px' }}>
                <p><strong>{UI_LABELS.latitude}:</strong> {formatCoordinate(position.coords.latitude)}</p>
                <p><strong>{UI_LABELS.longitude}:</strong> {formatCoordinate(position.coords.longitude)}</p>
                <p><strong>Accuracy:</strong> ±{position.coords.accuracy?.toFixed(0)} {UI_LABELS.meters}</p>
                {position.coords.altitude && (
                  <p><strong>Altitude:</strong> {position.coords.altitude.toFixed(0)} {UI_LABELS.meters}</p>
                )}
                {position.coords.heading && (
                  <p><strong>Heading:</strong> {position.coords.heading.toFixed(0)}°</p>
                )}
                {position.coords.speed && (
                  <p><strong>Speed:</strong> {(position.coords.speed * 3.6).toFixed(1)} {UI_LABELS.kmh}</p>
                )}
                <p><strong>Timestamp:</strong> {new Date(position.timestamp).toLocaleString()}</p>
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
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Location Tracking Map">
        <MapContainer
          center={mapCenter}
          zoom={15}
          height="medium"
        >
          {/* Current Location Marker */}
          {position && (
            <Marker
              position={{ lat: position.coords.latitude, lng: position.coords.longitude }}
              title={`Current Location (±${position.coords.accuracy?.toFixed(0)}m)`}
              icon={{
                url: MARKER_ICONS.current,
                scaledSize: typeof google !== 'undefined' ? new google.maps.Size(40, 40) : undefined
              }}
            />
          )}

          {/* Location History Markers */}
          {locationHistory.slice(0, -1).map((historyPoint, index) => (
            <Marker
              key={`history-${index}`}
              position={historyPoint.position}
              title={`Previous Location - ${formatTimestamp(historyPoint.timestamp)}`}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/grey-dot.png',
                scaledSize: typeof google !== 'undefined' ? new google.maps.Size(20, 20) : undefined
              }}
            />
          ))}
        </MapContainer>
      </PageSection>

      {/* Location History Table */}
      {locationHistory.length > 0 && (
        <PageSection title="📍 Location History">
          <Card padding="lg">
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
        </PageSection>
      )}

      {/* Implementation Section */}
      <PageSection title="💻 Implementation Code">
        <Card title="Using the Geolocation Hook" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="tsx" showCopy>
            {CODE_EXAMPLES.geolocationUsage}
          </CodeBlock>
        </Card>
      </PageSection>

      {/* Features Section */}
      <PageSection title="✨ Features Demonstrated" marginBottom={false}>
        <Card title="Key Features" padding="lg">
          <ul style={styles.lists.styled}>
            <li><strong>Current Location:</strong> Get user's current position once</li>
            <li><strong>Location Watching:</strong> Continuously track position changes</li>
            <li><strong>Location History:</strong> Track and display movement over time</li>
            <li><strong>Accuracy Information:</strong> Show GPS accuracy and confidence</li>
            <li><strong>Additional Data:</strong> Altitude, heading, and speed when available</li>
            <li><strong>Error Handling:</strong> Handle permission denials and errors</li>
            <li><strong>Distance Calculation:</strong> Calculate movement between points</li>
          </ul>
        </Card>
      </PageSection>
    </PageLayout>
  );
};

export default GeolocationPage;