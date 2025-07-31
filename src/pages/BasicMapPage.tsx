import React, { FC, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import { Button, Card, Input, CodeBlock, InfoBox } from '../components/ui';
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { 
  SAUDI_ARABIA_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  PLACEHOLDERS,
  CODE_EXAMPLES,
  FEATURE_LISTS,
  ZOOM_LEVELS 
} from '../constants';

/**
 * Basic Map page component
 */
const BasicMapPage: FC = () => {
  const [mapCenter, setMapCenter] = useState(SAUDI_ARABIA_LOCATIONS.riyadh);
  const [zoom, setZoom] = useState<number>(ZOOM_LEVELS.CITY);

  const handleCenterChange = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  };

  const resetToDefault = () => {
    setMapCenter(SAUDI_ARABIA_LOCATIONS.riyadh);
    setZoom(ZOOM_LEVELS.CITY);
  };

  return (
    <PageLayout
      title={PAGE_CONTENT.basicMap.title}
      subtitle={PAGE_CONTENT.basicMap.subtitle}
    >
      {/* Interactive Map Section */}
      <PageSection title="🗺️ Interactive Map Demo">
        <InfoBox variant="info" title="💡 What you'll learn">
          <ul style={styles.lists.basic}>
            {FEATURE_LISTS.basicMap.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </InfoBox>

        {/* Map Controls */}
        <ControlsPanel layout="grid" columns={4}>
          <Input
            label={UI_LABELS.latitude}
            type="number"
            value={mapCenter.lat}
            onChange={(e) => handleCenterChange(parseFloat(e.target.value) || 0, mapCenter.lng)}
            step="0.0001"
            placeholder={PLACEHOLDERS.latitude}
          />
          
          <Input
            label={UI_LABELS.longitude}
            type="number"
            value={mapCenter.lng}
            onChange={(e) => handleCenterChange(mapCenter.lat, parseFloat(e.target.value) || 0)}
            step="0.0001"
            placeholder={PLACEHOLDERS.longitude}
          />
          
          <div>
            <Input
              label={UI_LABELS.zoomLevel}
              type="range"
              min={ZOOM_LEVELS.WORLD}
              max={ZOOM_LEVELS.DETAIL}
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              helperText={`Current: ${zoom}`}
            />
          </div>
          
          <div style={styles.utils.flexCenter}>
            <Button onClick={resetToDefault} variant="outline" fullWidth>
              {UI_LABELS.reset}
            </Button>
          </div>
        </ControlsPanel>

        {/* Map Container */}
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          height="medium"
        >
          <Marker
            position={mapCenter}
            title="Current Center"
          />
        </MapContainer>
      </PageSection>

      {/* Code Example Section */}
      <PageSection title="💻 Code Implementation">
        <div style={styles.cards.twoColumn}>
          <Card title="Basic Setup" padding="lg">
            <CodeBlock language="typescript" title="1. Basic Setup" showCopy>
              {CODE_EXAMPLES.basicSetup}
            </CodeBlock>
          </Card>

          <Card title="Component Implementation" padding="lg">
            <CodeBlock language="typescript" title="2. Component Implementation" showCopy>
              {CODE_EXAMPLES.componentImplementation}
            </CodeBlock>
          </Card>
        </div>

        <Card title="TypeScript Types" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="typescript" title="3. TypeScript Types" showCopy>
            {CODE_EXAMPLES.typeScriptTypes}
          </CodeBlock>
        </Card>
      </PageSection>

      {/* Configuration Section */}
      <PageSection title="⚙️ Configuration & Setup">
        <InfoBox variant="warning" title="🔑 API Key Required">
          <p style={styles.utils.marginBottom.sm}>
            To use this demo, you need a Google Maps API key. Add it to your <code>.env</code> file:
          </p>
        </InfoBox>

        <div style={styles.cards.twoColumn}>
          <Card padding="lg">
            <CodeBlock language="bash" filename=".env" showCopy>
              {CODE_EXAMPLES.envFile}
            </CodeBlock>
          </Card>

          <Card title="Installation Steps" padding="lg">
            <CodeBlock language="bash" title="Package Installation" showCopy>
              {CODE_EXAMPLES.packageInstallation}
            </CodeBlock>
          </Card>
        </div>

        <Card title="Map Options Explained" padding="lg" style={styles.utils.marginBottom.lg}>
          <ul style={styles.lists.styled}>
            <li><strong>zoomControl:</strong> Shows zoom in/out buttons</li>
            <li><strong>mapTypeControl:</strong> Allows switching between map types (roadmap, satellite, etc.)</li>
            <li><strong>scaleControl:</strong> Shows the map scale</li>
            <li><strong>streetViewControl:</strong> Enables Street View mode</li>
            <li><strong>rotateControl:</strong> Allows map rotation (for 45° imagery)</li>
            <li><strong>fullscreenControl:</strong> Enables fullscreen mode</li>
          </ul>
        </Card>
      </PageSection>

      {/* Best Practices Section */}
      <PageSection title="✅ Best Practices" marginBottom={false}>
        <div style={styles.cards.twoColumn}>
          <InfoBox variant="tip" title="Performance Tips">
            <ul style={styles.lists.noBullets}>
              <li>• Use <code>React.memo()</code> to prevent unnecessary re-renders</li>
              <li>• Keep the libraries array as a static constant</li>
              <li>• Implement proper error boundaries</li>
              <li>• Use environment variables for API keys</li>
              <li>• Consider lazy loading for complex applications</li>
            </ul>
          </InfoBox>

          <InfoBox variant="warning" title="Security Considerations">
            <ul style={styles.lists.noBullets}>
              <li>• Never expose API keys in client-side code in production</li>
              <li>• Set up API key restrictions in Google Cloud Console</li>
              <li>• Use HTTP referrer restrictions for web applications</li>
              <li>• Monitor API usage and set up billing alerts</li>
            </ul>
          </InfoBox>
        </div>
      </PageSection>
    </PageLayout>
  );
};

export default BasicMapPage;