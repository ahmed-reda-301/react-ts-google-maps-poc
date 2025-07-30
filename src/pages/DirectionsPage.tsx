import React, { useState } from 'react';
import { Button, Card, InfoBox, CodeBlock, Input } from '../components/ui';
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { Marker } from '@react-google-maps/api';
import { 
  EGYPT_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  PLACEHOLDERS,
  CODE_EXAMPLES,
  FEATURE_LISTS,
  DEMO_ROUTES,
  TRAVEL_MODES,
  ERROR_MESSAGES,
  INFO_MESSAGES 
} from '../constants';

/**
 * Directions Page - Demonstrates directions service and route planning
 */
const DirectionsPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('Cairo, Egypt');
  const [destination, setDestination] = useState<string>('Alexandria, Egypt');
  const [travelMode, setTravelMode] = useState<string>(TRAVEL_MODES.driving.value);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    startAddress: string;
    endAddress: string;
  } | null>(null);

  const handleGetDirections = async () => {
    if (!origin.trim() || !destination.trim()) {
      setError(ERROR_MESSAGES.requiredField);
      return;
    }

    setLoading(true);
    setError(null);
    setRouteInfo(null);

    try {
      // Simulate directions calculation
      setTimeout(() => {
        setRouteInfo({
          distance: '220 km',
          duration: '2 hours 30 mins',
          startAddress: origin,
          endAddress: destination,
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(ERROR_MESSAGES.directionsError);
      setLoading(false);
    }
  };

  const handlePredefinedRoute = (route: { name: string; origin: string; destination: string; coordinates: any }) => {
    setOrigin(route.origin);
    setDestination(route.destination);
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <PageLayout
      title={PAGE_CONTENT.directions.title}
      subtitle={PAGE_CONTENT.directions.subtitle}
    >
      {/* Controls Section */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card title="Route Planning" padding="lg">
            <div style={styles.forms.container}>
              <div style={styles.forms.group}>
                <label style={styles.forms.label}>{UI_LABELS.origin}:</label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder={PLACEHOLDERS.origin}
                />
              </div>
              
              <div style={styles.forms.group}>
                <label style={styles.forms.label}>{UI_LABELS.destination}:</label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={PLACEHOLDERS.destination}
                />
              </div>

              <ControlsPanel layout="flex" gap="sm" marginBottom={false}>
                <Button onClick={swapLocations} variant="secondary" style={{ flex: 1 }}>
                  {UI_LABELS.swap}
                </Button>
                <Button onClick={handleGetDirections} disabled={loading} style={{ flex: 2 }}>
                  {loading ? 'Getting Directions...' : UI_LABELS.getDirections}
                </Button>
              </ControlsPanel>
            </div>

            <div style={styles.forms.group}>
              <label style={styles.forms.label}>{UI_LABELS.travelMode}:</label>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                {Object.values(TRAVEL_MODES).map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.icon} {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.forms.group}>
              <label style={styles.forms.label}>Quick Routes:</label>
              <div style={styles.controls.group}>
                {DEMO_ROUTES.egypt.map((route, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePredefinedRoute(route)}
                    variant="secondary"
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    {route.name}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Route Summary" padding="lg">
            {routeInfo ? (
              <div style={{ fontSize: '14px' }}>
                <p><strong>From:</strong> {routeInfo.startAddress}</p>
                <p><strong>To:</strong> {routeInfo.endAddress}</p>
                <p><strong>Distance:</strong> {routeInfo.distance}</p>
                <p><strong>Duration:</strong> {routeInfo.duration}</p>
                <p><strong>Travel Mode:</strong> {TRAVEL_MODES[travelMode as keyof typeof TRAVEL_MODES]?.label}</p>
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No route calculated. Enter origin and destination to get directions.
              </p>
            )}
          </Card>
        </div>

        {error && (
          <InfoBox variant="error">
            <strong>Error:</strong> {error}
          </InfoBox>
        )}

        {loading && (
          <InfoBox variant="info">
            <strong>Loading:</strong> {INFO_MESSAGES.calculatingRoute}
          </InfoBox>
        )}
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Route Visualization">
        <MapContainer
          center={EGYPT_LOCATIONS.cairo}
          zoom={6}
          height="large"
        >
          {/* Origin Marker */}
          <Marker
            position={EGYPT_LOCATIONS.cairo}
            title="Cairo - Origin"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
              scaledSize: typeof google !== 'undefined' ? new google.maps.Size(40, 40) : undefined
            }}
          />

          {/* Destination Marker */}
          <Marker
            position={EGYPT_LOCATIONS.alexandria}
            title="Alexandria - Destination"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: typeof google !== 'undefined' ? new google.maps.Size(40, 40) : undefined
            }}
          />
        </MapContainer>
      </PageSection>

      {/* Implementation Section */}
      <PageSection title="💻 Implementation Code">
        <Card title="Directions Service Usage" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="tsx" showCopy>
            {CODE_EXAMPLES.directionsService}
          </CodeBlock>
        </Card>
      </PageSection>

      {/* Features Section */}
      <PageSection title="✨ Features Demonstrated">
        <Card title="Key Features" padding="lg" style={styles.utils.marginBottom.lg}>
          <ul style={styles.lists.styled}>
            {FEATURE_LISTS.directions.map((feature, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
            ))}
          </ul>
        </Card>

        <InfoBox variant="info">
          This is a simplified demonstration of the Directions Service interface. 
          In a production environment, you would integrate with the actual Google Maps Directions API 
          to calculate real routes and display them on the map with polylines.
        </InfoBox>
      </PageSection>
    </PageLayout>
  );
};

export default DirectionsPage;