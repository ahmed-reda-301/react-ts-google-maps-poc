import React from 'react';
import CodeBlock from '../CodeBlock';
import MapContainer from './MapContainer';
import { DemoCodeSplitProps } from '../../types/guide';

const DemoCodeSplit: React.FC<DemoCodeSplitProps> = ({ 
  example, 
  selectedExample, 
  onMapReset 
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      height: 'calc(100vh - 300px)',
      minHeight: '600px'
      
    }}>
      
      {/* Live Demo - Left Half */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '20px', flexShrink: 0 }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
            🎮 Live Demo: {example.title}
          </h3>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            {example.description}
          </p>
        </div>
        
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'auto',
          flex: 1,
          minHeight: 0,
          position: 'relative'
        }}>
          <MapContainer 
            selectedExample={selectedExample}
            onMapReset={onMapReset}
          >
            {example.component}
          </MapContainer>
        </div>
      </div>

      {/* Code Example - Right Half */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333', flexShrink: 0 }}>
          💻 Code Implementation
        </h3>
        <div style={{ 
          flex: 1, 
          minHeight: 0,
          overflow: 'auto'
        }}>
          <CodeBlock
            code={example.code}
            language="tsx"
            maxHeight="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default DemoCodeSplit;