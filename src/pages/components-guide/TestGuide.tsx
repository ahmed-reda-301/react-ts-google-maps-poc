import React from 'react';

const TestGuide: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <h1>Test Guide Page</h1>
      <p>This is a test page to check if the routing works correctly.</p>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2>Test Content</h2>
        <p>If you can see this, the routing is working!</p>
      </div>
    </div>
  );
};

export default TestGuide;