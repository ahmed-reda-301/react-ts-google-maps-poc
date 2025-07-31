import React, { useState } from 'react';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import InteractiveFormControls from '../../components/controls/InteractiveFormControls';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS, COMPONENT_COLORS } from './constants';
import { CircleControlsProps } from '../../types/controls';

/**
 * Example page demonstrating the new InteractiveFormControls component
 * This shows how to use the reusable control component across different pages
 */
const InteractiveControlsExample: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [basicRadius, setBasicRadius] = useState(5000);
  const [circles, setCircles] = useState<Array<{
    id: string;
    center: google.maps.LatLngLiteral;
    radius: number;
    color: string;
  }>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(2000);
  const [selectedColor, setSelectedColor] = useState('#007bff');

  const calculateArea = (radius: number) => {
    const area = Math.PI * Math.pow(radius, 2);
    return (area / 1000000).toFixed(2);
  };

  const calculateTotalArea = () => {
    const totalArea = circles.reduce((sum, circle) => {
      return sum + (Math.PI * Math.pow(circle.radius, 2));
    }, 0);
    return (totalArea / 1000000).toFixed(2);
  };

  const clearAllCircles = () => {
    setCircles([]);
  };

  // Props for the InteractiveFormControls component
  const circleControlProps: CircleControlsProps = {
    selectedExample,
    basicRadius,
    onBasicRadiusChange: setBasicRadius,
    circles,
    isCreating,
    selectedRadius,
    selectedColor,
    onStartCreating: () => setIsCreating(!isCreating),
    onClearCircles: clearAllCircles,
    onRadiusChange: setSelectedRadius,
    onColorChange: setSelectedColor,
    calculateArea,
    calculateTotalArea,
    componentColors: COMPONENT_COLORS
  };

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem', fontWeight: '600' }}>
          🎮 Interactive Form Controls Demo
        </h1>
        <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>
          Demonstrating the new reusable InteractiveFormControls component
        </p>
      </div>

      {/* Example Selection */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          📋 Select Example Type
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { key: 'basic', label: 'Basic Circle', icon: '⭕' },
            { key: 'interactive', label: 'Interactive Builder', icon: '🎮' }
          ].map(example => (
            <button
              key={example.key}
              onClick={() => setSelectedExample(example.key)}
              style={{
                padding: '12px 20px',
                backgroundColor: selectedExample === example.key ? '#007bff' : '#f8f9fa',
                color: selectedExample === example.key ? 'white' : '#495057',
                border: `2px solid ${selectedExample === example.key ? '#007bff' : '#dee2e6'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{example.icon}</span>
              {example.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Display */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🗺️ Map View
        </h3>
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          onClick={(e) => {
            if (isCreating && e.latLng && selectedExample === 'interactive') {
              const newCircle = {
                id: Date.now().toString(),
                center: {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng()
                },
                radius: selectedRadius,
                color: selectedColor
              };
              setCircles(prev => [...prev, newCircle]);
              setIsCreating(false);
            }
          }}
        >
          {/* Basic Circle Example */}
          {selectedExample === 'basic' && (
            <>
              <Marker position={DEFAULT_CENTER} title="Kingdom Centre" />
              <Circle
                center={DEFAULT_CENTER}
                radius={basicRadius}
                options={{
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            </>
          )}

          {/* Interactive Circles */}
          {selectedExample === 'interactive' && circles.map(circle => (
            <React.Fragment key={circle.id}>
              <Marker
                position={circle.center}
                title={`Circle - ${circle.radius >= 1000 ? `${circle.radius/1000}km` : `${circle.radius}m`}`}
              />
              <Circle
                center={circle.center}
                radius={circle.radius}
                options={{
                  fillColor: circle.color,
                  fillOpacity: 0.35,
                  strokeColor: circle.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            </React.Fragment>
          ))}
        </GoogleMap>
      </div>

      {/* Interactive Form Controls Component */}
      <InteractiveFormControls
        controlType="circle"
        controlProps={circleControlProps}
        title="Circle Configuration"
        description="Use these controls to configure and interact with circles on the map"
        containerStyle={{
          border: '2px solid #007bff',
          borderRadius: '16px'
        }}
      />

      {/* Usage Example */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          💡 Usage Example
        </h3>
        <pre style={{
          backgroundColor: '#2d3748',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
{`// Using the new InteractiveFormControls component
import InteractiveFormControls from '../../components/controls/InteractiveFormControls';
import { CircleControlsProps } from '../../types/controls';

const MyPage: React.FC = () => {
  // Your state and handlers...
  
  const controlProps: CircleControlsProps = {
    selectedExample: 'basic',
    basicRadius: 5000,
    onBasicRadiusChange: setBasicRadius,
    // ... other props
  };

  return (
    <div>
      {/* Your map component */}
      
      <InteractiveFormControls
        controlType="circle"
        controlProps={controlProps}
        title="Custom Title"
        description="Custom description"
        containerStyle={{ border: '2px solid #007bff' }}
      />
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default InteractiveControlsExample;