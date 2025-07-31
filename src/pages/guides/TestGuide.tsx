import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const TestGuide: React.FC = () => {
  const DEFAULT_CENTER = { lat: 24.7136, lng: 46.6753 };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Guide</h1>
      <p>This is a test guide page for development purposes.</p>
      
      <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={DEFAULT_CENTER}
          zoom={12}
        >
          {/* Test content can be added here */}
        </GoogleMap>
      </div>
    </div>
  );
};

export default TestGuide;