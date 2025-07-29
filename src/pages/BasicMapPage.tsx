import React, { FC, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Card, Input, CodeBlock, InfoBox } from '../components/ui';
import { theme } from '../styles/theme';

/**
 * Container style for the map
 */
const containerStyle = {
  width: '100%',
  height: '500px',
};

/**
 * Default center coordinates (Riyadh, Saudi Arabia)
 */
const defaultCenter = {
  lat: 24.7136,
  lng: 46.6753,
};

/**
 * Basic Map page component
 */
const BasicMapPage: FC = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(10);

  const pageStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.display,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: theme.spacing.xl,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    borderBottom: `2px solid ${theme.colors.primary}`,
    paddingBottom: theme.spacing.sm,
  };

  const controlsStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  };

  const mapContainerStyle: React.CSSProperties = {
    border: `1px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  };

  const handleCenterChange = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  };

  const resetToDefault = () => {
    setMapCenter(defaultCenter);
    setZoom(10);
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Basic Google Maps Integration</h1>
        <p style={subtitleStyle}>
          Learn the fundamentals of integrating Google Maps with React and TypeScript
        </p>
      </div>

      {/* Interactive Map Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>🗺️ Interactive Map Demo</h2>
        
        <InfoBox variant="info" title="💡 What you'll learn">
          <ul style={{ marginTop: theme.spacing.sm, paddingLeft: theme.spacing.lg }}>
            <li>How to set up Google Maps with React</li>
            <li>Basic map configuration and options</li>
            <li>Adding markers to the map</li>
            <li>Controlling map center and zoom level</li>
            <li>TypeScript integration best practices</li>
          </ul>
        </InfoBox>

        {/* Map Controls */}
        <div style={controlsStyle}>
          <Input
            label="Latitude"
            type="number"
            value={mapCenter.lat}
            onChange={(e) => handleCenterChange(parseFloat(e.target.value) || 0, mapCenter.lng)}
            step="0.0001"
            placeholder="Enter latitude"
          />
          
          <Input
            label="Longitude"
            type="number"
            value={mapCenter.lng}
            onChange={(e) => handleCenterChange(mapCenter.lat, parseFloat(e.target.value) || 0)}
            step="0.0001"
            placeholder="Enter longitude"
          />
          
          <div>
            <Input
              label="Zoom Level"
              type="range"
              min="1"
              max="20"
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              helperText={`Current: ${zoom}`}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <Button onClick={resetToDefault} variant="outline" fullWidth>
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div style={mapContainerStyle}>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={zoom}
              options={{
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
              }}
            >
              <Marker
                position={mapCenter}
                title="Current Center"
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Code Example Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>💻 Code Implementation</h2>
        
        <Card title="Basic Setup" padding="lg" style={{ marginBottom: theme.spacing.lg }}>
          <CodeBlock language="typescript" title="1. Basic Setup" showCopy>
            {`import React, { FC, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 24.7136,
  lng: 46.6753,
};`}
          </CodeBlock>
        </Card>

        <Card title="Component Implementation" padding="lg" style={{ marginBottom: theme.spacing.lg }}>
          <CodeBlock language="typescript" title="2. Component Implementation" showCopy>
            {`const BasicMapComponent: FC = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(10);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        }}
      >
        <Marker
          position={mapCenter}
          title="Current Center"
        />
      </GoogleMap>
    </LoadScript>
  );
};`}
          </CodeBlock>
        </Card>

        <Card title="TypeScript Types" padding="lg">
          <CodeBlock language="typescript" title="3. TypeScript Types" showCopy>
            {`interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  center: LatLng;
  zoom: number;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  style?: React.CSSProperties;
}`}
          </CodeBlock>
        </Card>
      </div>

      {/* Configuration Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>⚙️ Configuration & Setup</h2>
        
        <InfoBox variant="warning" title="🔑 API Key Required">
          <p style={{ marginBottom: theme.spacing.sm }}>
            To use this demo, you need a Google Maps API key. Add it to your <code>.env</code> file:
          </p>
        </InfoBox>

        <Card padding="lg" style={{ marginBottom: theme.spacing.lg }}>
          <CodeBlock language="bash" filename=".env" showCopy>
            {`# .env file
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here`}
          </CodeBlock>
        </Card>

        <Card title="Installation Steps" padding="lg" style={{ marginBottom: theme.spacing.lg }}>
          <CodeBlock language="bash" title="Package Installation" showCopy>
            {`# Install required packages
npm install @react-google-maps/api
npm install @types/googlemaps

# For TypeScript projects
npm install typescript @types/react @types/react-dom`}
          </CodeBlock>
        </Card>

        <Card title="Map Options Explained" padding="lg">
          <ul style={{ lineHeight: theme.typography.lineHeight.relaxed, color: theme.colors.text.secondary }}>
            <li><strong>zoomControl:</strong> Shows zoom in/out buttons</li>
            <li><strong>mapTypeControl:</strong> Allows switching between map types (roadmap, satellite, etc.)</li>
            <li><strong>scaleControl:</strong> Shows the map scale</li>
            <li><strong>streetViewControl:</strong> Enables Street View mode</li>
            <li><strong>rotateControl:</strong> Allows map rotation (for 45° imagery)</li>
            <li><strong>fullscreenControl:</strong> Enables fullscreen mode</li>
          </ul>
        </Card>
      </div>

      {/* Best Practices Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>✅ Best Practices</h2>
        
        <InfoBox variant="tip" title="Performance Tips">
          <ul style={{ marginBottom: 0, paddingLeft: theme.spacing.lg }}>
            <li>Use <code>React.memo()</code> to prevent unnecessary re-renders</li>
            <li>Keep the libraries array as a static constant</li>
            <li>Implement proper error boundaries</li>
            <li>Use environment variables for API keys</li>
            <li>Consider lazy loading for complex applications</li>
          </ul>
        </InfoBox>

        <InfoBox variant="warning" title="Security Considerations">
          <ul style={{ marginBottom: 0, paddingLeft: theme.spacing.lg }}>
            <li>Never expose API keys in client-side code in production</li>
            <li>Set up API key restrictions in Google Cloud Console</li>
            <li>Use HTTP referrer restrictions for web applications</li>
            <li>Monitor API usage and set up billing alerts</li>
          </ul>
        </InfoBox>
      </div>
    </div>
  );
};

export default BasicMapPage;