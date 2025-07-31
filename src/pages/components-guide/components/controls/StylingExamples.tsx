import React from 'react';

interface StylingExample {
  title: string;
  color: string;
  code: string;
}

interface StylingExamplesProps {
  title: string;
  examples: StylingExample[];
}

const StylingExamples: React.FC<StylingExamplesProps> = ({ title, examples }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
        🎨 {title}
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: examples.length === 1 ? '1fr' : '1fr 1fr', 
        gap: '20px' 
      }}>
        {examples.map((example, index) => (
          <div key={index}>
            <h4 style={{ color: example.color, marginBottom: '10px' }}>
              {example.title}
            </h4>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '8px', 
              fontSize: '12px',
              overflow: 'auto',
              border: '1px solid #e0e0e0',
              margin: 0
            }}>
              {example.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylingExamples;