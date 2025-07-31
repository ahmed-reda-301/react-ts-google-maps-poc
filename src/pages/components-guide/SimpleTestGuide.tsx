import React from 'react';

const SimpleTestGuide: React.FC = () => {
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
            🧪 Simple Test Guide
          </h1>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
            Testing if the guide pages load correctly without Google Maps
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* Test Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Test Results</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div>
              <h3 style={{ color: '#4caf50' }}>✅ Working Components</h3>
              <ul>
                <li>React Router - Page loads correctly</li>
                <li>CSS Styles - Styling is applied</li>
                <li>Layout - Full screen layout works</li>
                <li>Typography - Fonts and text display properly</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#ff9800' }}>⚠️ To Test</h3>
              <ul>
                <li>Google Maps API loading</li>
                <li>Map component rendering</li>
                <li>Interactive examples</li>
                <li>Code block syntax highlighting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Test */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
            🧭 Navigation Test
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/components-guide" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#1976d2', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              Components Index
            </a>
            <a href="/components-guide/google-map" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4caf50', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              GoogleMap Guide
            </a>
            <a href="/components-guide/marker" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#ff9800', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              Marker Guide
            </a>
            <a href="/" style={{ 
              padding: '10px 20px', 
              backgroundColor: '#666', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestGuide;