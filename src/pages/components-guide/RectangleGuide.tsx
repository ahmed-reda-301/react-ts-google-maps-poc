import React, { useState } from 'react';
import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';
import CodeBlock from '../../components/CodeBlock';

const RectangleGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = { lat: 24.7136, lng: 46.6753 };

  const examples = {
    basic: {
      title: 'Basic Rectangle',
      description: 'Simple rectangle defined by bounds',
      component: (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          <Rectangle
            bounds={{
              north: 25.0,
              south: 24.5,
              east: 47.0,
              west: 46.5
            }}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          <Marker position={{ lat: 24.75, lng: 46.75 }} title="Rectangle Center" />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';

const BasicRectangle = () => {
  const bounds = {
    north: 25.0,
    south: 24.5,
    east: 47.0,
    west: 46.5
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      <Rectangle
        bounds={bounds}
        options={{
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2
        }}
      />
      <Marker position={{ lat: 24.75, lng: 46.75 }} title="Center" />
    </GoogleMap>
  );
};`
    },

    multiple: {
      title: 'Multiple Rectangles',
      description: 'Multiple rectangles with different sizes and colors',
      component: (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={7}
        >
          {/* Large red rectangle */}
          <Rectangle
            bounds={{
              north: 25.5,
              south: 24.0,
              east: 47.5,
              west: 46.0
            }}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.2,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 3
            }}
          />
          
          {/* Medium green rectangle */}
          <Rectangle
            bounds={{
              north: 22.0,
              south: 21.0,
              east: 40.0,
              west: 38.5
            }}
            options={{
              fillColor: '#00FF00',
              fillOpacity: 0.25,
              strokeColor: '#00FF00',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          
          {/* Small blue rectangle */}
          <Rectangle
            bounds={{
              north: 26.8,
              south: 26.0,
              east: 51.0,
              west: 50.0
            }}
            options={{
              fillColor: '#0000FF',
              fillOpacity: 0.3,
              strokeColor: '#0000FF',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          
          <Marker position={{ lat: 24.75, lng: 46.75 }} title="Riyadh Area" />
          <Marker position={{ lat: 21.5, lng: 39.25 }} title="Jeddah Area" />
          <Marker position={{ lat: 26.4, lng: 50.5 }} title="Dammam Area" />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';

const MultipleRectangles = () => {
  const areas = [
    {
      name: 'Riyadh Area',
      bounds: { north: 25.5, south: 24.0, east: 47.5, west: 46.0 },
      color: '#FF0000',
      center: { lat: 24.75, lng: 46.75 }
    },
    {
      name: 'Jeddah Area',
      bounds: { north: 22.0, south: 21.0, east: 40.0, west: 38.5 },
      color: '#00FF00',
      center: { lat: 21.5, lng: 39.25 }
    },
    {
      name: 'Dammam Area',
      bounds: { north: 26.8, south: 26.0, east: 51.0, west: 50.0 },
      color: '#0000FF',
      center: { lat: 26.4, lng: 50.5 }
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={7}
    >
      {areas.map((area, index) => (
        <React.Fragment key={index}>
          <Rectangle
            bounds={area.bounds}
            options={{
              fillColor: area.color,
              fillOpacity: 0.25,
              strokeColor: area.color,
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          <Marker position={area.center} title={area.name} />
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Rectangles',
      description: 'Clickable rectangles with events and dynamic properties',
      component: (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          <Rectangle
            bounds={{
              north: 25.0,
              south: 24.5,
              east: 47.0,
              west: 46.5
            }}
            options={{
              fillColor: '#FF6B35',
              fillOpacity: 0.35,
              strokeColor: '#FF6B35',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              clickable: true
            }}
            onClick={(e) => {
              alert(`Clicked on rectangle at: ${e.latLng?.lat()}, ${e.latLng?.lng()}`);
            }}
            onMouseOver={() => {
              console.log('Mouse over rectangle');
            }}
          />
          
          <Rectangle
            bounds={{
              north: 24.4,
              south: 24.0,
              east: 47.5,
              west: 47.0
            }}
            options={{
              fillColor: '#4ECDC4',
              fillOpacity: 0.35,
              strokeColor: '#4ECDC4',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              clickable: true
            }}
            onClick={() => {
              alert('Clicked on the smaller rectangle!');
            }}
          />
          
          <Marker position={{ lat: 24.75, lng: 46.75 }} title="Main Rectangle" />
          <Marker position={{ lat: 24.2, lng: 47.25 }} title="Secondary Rectangle" />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';

const InteractiveRectangles = () => {
  const handleRectangleClick = (e, rectangleName) => {
    alert(\`Clicked on \${rectangleName} at: \${e.latLng.lat()}, \${e.latLng.lng()}\`);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      <Rectangle
        bounds={{
          north: 25.0,
          south: 24.5,
          east: 47.0,
          west: 46.5
        }}
        options={{
          fillColor: '#FF6B35',
          fillOpacity: 0.35,
          strokeColor: '#FF6B35',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: true
        }}
        onClick={(e) => handleRectangleClick(e, 'Main Rectangle')}
        onMouseOver={() => console.log('Mouse over rectangle')}
      />
      
      <Marker position={{ lat: 24.75, lng: 46.75 }} title="Center" />
    </GoogleMap>
  );
};`
    },

    gridSystem: {
      title: 'Grid System',
      description: 'Grid of rectangles for area division and analysis',
      component: (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          {/* Create a 3x3 grid */}
          {Array.from({ length: 3 }, (_, row) =>
            Array.from({ length: 3 }, (_, col) => {
              const latStep = 0.3;
              const lngStep = 0.3;
              const baseLatNorth = 25.2;
              const baseLngWest = 46.2;
              
              const north = baseLatNorth - (row * latStep);
              const south = north - latStep;
              const west = baseLngWest + (col * lngStep);
              const east = west + lngStep;
              
              const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
              const colorIndex = (row * 3 + col) % colors.length;
              
              return (
                <Rectangle
                  key={`${row}-${col}`}
                  bounds={{ north, south, east, west }}
                  options={{
                    fillColor: colors[colorIndex],
                    fillOpacity: 0.3,
                    strokeColor: colors[colorIndex],
                    strokeOpacity: 0.8,
                    strokeWeight: 1
                  }}
                />
              );
            })
          )}
          
          <Marker position={center} title="Grid Center" />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';

const GridSystem = () => {
  const createGrid = () => {
    const grid = [];
    const latStep = 0.3;
    const lngStep = 0.3;
    const baseLatNorth = 25.2;
    const baseLngWest = 46.2;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const north = baseLatNorth - (row * latStep);
        const south = north - latStep;
        const west = baseLngWest + (col * lngStep);
        const east = west + lngStep;
        const colorIndex = (row * 3 + col) % colors.length;
        
        grid.push(
          <Rectangle
            key={\`\${row}-\${col}\`}
            bounds={{ north, south, east, west }}
            options={{
              fillColor: colors[colorIndex],
              fillOpacity: 0.3,
              strokeColor: colors[colorIndex],
              strokeOpacity: 0.8,
              strokeWeight: 1
            }}
          />
        );
      }
    }
    return grid;
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      {createGrid()}
      <Marker position={{ lat: 24.7136, lng: 46.6753 }} title="Grid Center" />
    </GoogleMap>
  );
};`
    }
  };

  const currentExample = examples[selectedExample as keyof typeof examples];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '0'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '20px 0',
        marginBottom: '0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
            ▭ Rectangle Component Guide
          </h1>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
            Complete guide to creating rectangular areas, bounds, and grid systems on Google Maps
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Examples</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {Object.entries(examples).map(([key, example]) => (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: selectedExample === key ? '#1976d2' : '#e3f2fd',
                  color: selectedExample === key ? 'white' : '#1976d2',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedExample === key ? 'bold' : 'normal',
                  transition: 'all 0.3s ease'
                }}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          minHeight: '600px'
        }}>
          
          {/* Live Demo */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              🎮 Live Demo: {currentExample.title}
            </h3>
            <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
              {currentExample.description}
            </p>
            
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '500px'
            }}>
              {currentExample.component}
            </div>
          </div>

          {/* Code Example */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              💻 Code Implementation
            </h3>
            <CodeBlock
              code={currentExample.code}
              language="typescript"
            />
          </div>
        </div>

        {/* Properties Documentation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
            📋 Rectangle Props & Options
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Essential Props */}
            <div>
              <h4 style={{ color: '#1976d2', marginBottom: '15px' }}>Essential Props</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Prop</th>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Type</th>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>bounds</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>LatLngBounds</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Rectangle boundaries (required)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>options</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>RectangleOptions</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Styling and behavior options</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>onClick</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Function</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Click event handler</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>onMouseOver</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Function</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Mouse over event handler</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bounds Structure */}
            <div>
              <h4 style={{ color: '#1976d2', marginBottom: '15px' }}>Bounds Structure</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Property</th>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Type</th>
                    <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>north</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>number</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Northern latitude</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>south</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>number</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Southern latitude</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>east</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>number</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Eastern longitude</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><code>west</code></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>number</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>Western longitude</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
            🎯 Common Use Cases
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            
            <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
              <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>🗺️ Area Definition</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
                <li>Map bounds</li>
                <li>Search areas</li>
                <li>Viewport limits</li>
                <li>Region boundaries</li>
              </ul>
            </div>

            <div style={{ padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
              <h4 style={{ color: '#9c27b0', marginBottom: '10px' }}>📊 Data Analysis</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
                <li>Grid systems</li>
                <li>Statistical areas</li>
                <li>Heat map regions</li>
                <li>Analysis zones</li>
              </ul>
            </div>

            <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
              <h4 style={{ color: '#4caf50', marginBottom: '10px' }}>🏢 Business Areas</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
                <li>Service territories</li>
                <li>Coverage zones</li>
                <li>Market areas</li>
                <li>Operational bounds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
            🧭 Explore More Components
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/components-guide/circle" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#666', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              ← Circle
            </a>
            <a href="/components-guide/marker-clusterer" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#1976d2', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              Next: MarkerClusterer →
            </a>
            <a href="/components-guide" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#666', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              All Components
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectangleGuide;