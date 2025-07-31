import React from 'react';

const IconTypesReference: React.FC = () => {
  const symbolPaths = [
    'CIRCLE',
    'BACKWARD_CLOSED_ARROW',
    'BACKWARD_OPEN_ARROW',
    'FORWARD_CLOSED_ARROW',
    'FORWARD_OPEN_ARROW'
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
        🎨 Icon Types & Examples
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* URL-based Icons */}
        <div>
          <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>URL-based Icons</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '8px', 
            fontSize: '12px',
            overflow: 'auto',
            border: '1px solid #e0e0e0'
          }}>
{`icon={{
  url: 'path/to/icon.png',
  scaledSize: new google.maps.Size(40, 40),
  anchor: new google.maps.Point(20, 40)
}}`}
          </pre>
        </div>

        {/* SVG Symbol Icons */}
        <div>
          <h4 style={{ color: '#4caf50', marginBottom: '10px' }}>SVG Symbol Icons</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '8px', 
            fontSize: '12px',
            overflow: 'auto',
            border: '1px solid #e0e0e0'
          }}>
{`icon={{
  path: google.maps.SymbolPath.CIRCLE,
  scale: 10,
  fillColor: '#FF0000',
  fillOpacity: 1,
  strokeColor: '#FFFFFF',
  strokeWeight: 2
}}`}
          </pre>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ color: '#ff9800', marginBottom: '10px' }}>Available Symbol Paths</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {symbolPaths.map(symbol => (
            <div key={symbol} style={{
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              google.maps.SymbolPath.{symbol}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconTypesReference;