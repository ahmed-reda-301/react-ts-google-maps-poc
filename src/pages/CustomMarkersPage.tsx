import React, { useState } from 'react';
import CustomMarker from '../components/maps/CustomMarker';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { LatLng } from '../types/common/LatLng';
import { 
  EGYPT_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  CODE_EXAMPLES,
  FEATURE_LISTS,
  DEFAULT_MARKERS,
  INFO_MESSAGES 
} from '../constants';

/**
 * Custom Markers Page - Demonstrates various custom marker implementations
 */
const CustomMarkersPage: React.FC = () => {
  const [markers, setMarkers] = useState<Array<{ id: string; position: LatLng; type: string; title: string }>>(
    [...DEFAULT_MARKERS.cairo]
  );

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
    setMarkers([...DEFAULT_MARKERS.cairo]);
  };

  return (
    <PageLayout
      title={PAGE_CONTENT.customMarkers.title}
      subtitle={PAGE_CONTENT.customMarkers.subtitle}
    >
      {/* Controls Section */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card title="Interactive Controls" padding="lg">
            <div style={styles.forms.container}>
              <div style={styles.forms.group}>
                <label style={styles.forms.label} htmlFor="marker-type">
                  Select Marker Type:
                </label>
                <select
                  id="marker-type"
                  value={selectedMarkerType}
                  onChange={(e) => setSelectedMarkerType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="hotel">Hotel</option>
                  <option value="attraction">Attraction</option>
                </select>
              </div>
              
              <ControlsPanel layout="flex" gap="sm" marginBottom={false}>
                <Button onClick={clearMarkers} variant="secondary">
                  {UI_LABELS.clear} Markers
                </Button>
                <Button onClick={resetToDefault}>
                  {UI_LABELS.reset}
                </Button>
              </ControlsPanel>
            </div>
          </Card>

          <Card title="Instructions" padding="lg">
            <ul style={styles.lists.basic}>
              <li>Click on the map to add a new marker</li>
              <li>Select marker type before clicking</li>
              <li>Each marker type has a different icon</li>
              <li>Hover over markers to see titles</li>
            </ul>
          </Card>
        </div>

        <InfoBox variant="info">
          <strong>Interactive Map:</strong> {INFO_MESSAGES.clickToAdd}
          Current markers: {markers.length}
        </InfoBox>
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Interactive Map">
        <MapContainer
          center={EGYPT_LOCATIONS.cairo}
          zoom={12}
          height="medium"
          onClick={handleMapClick}
        >
          {markers.map((marker) => (
            <CustomMarker
              key={marker.id}
              id={marker.id}
              position={marker.position}
              title={marker.title}
              category={marker.type as "restaurant" | "hotel" | "attraction"}
            />
          ))}
        </MapContainer>
      </PageSection>

      {/* Implementation Section */}
      <PageSection title="💻 Implementation Code">
        <Card title="Custom Marker Component Usage" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="tsx" showCopy>
            {CODE_EXAMPLES.customMarkerUsage}
          </CodeBlock>
        </Card>

        <Card title="Marker Types Configuration" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="typescript" showCopy>
            {CODE_EXAMPLES.markerIconHelper}
          </CodeBlock>
        </Card>

        <Card title="Dynamic Marker Addition" padding="lg">
          <CodeBlock language="typescript" showCopy>
            {CODE_EXAMPLES.dynamicMarkerAddition}
          </CodeBlock>
        </Card>
      </PageSection>

      {/* Features Section */}
      <PageSection title="✨ Features Demonstrated" marginBottom={false}>
        <Card title="Key Features" padding="lg">
          <ul style={styles.lists.styled}>
            {FEATURE_LISTS.customMarkers.map((feature, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
            ))}
          </ul>
        </Card>
      </PageSection>
    </PageLayout>
  );
};

export default CustomMarkersPage;