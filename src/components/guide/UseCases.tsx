import React from 'react';

interface UseCase {
  title: string;
  description: string;
  examples: string[];
  icon: string;
  color: string;
}

interface UseCasesProps {
  cases: UseCase[];
}

const UseCases: React.FC<UseCasesProps> = ({ cases }) => {
  return (
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
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {cases.map((useCase, index) => (
          <div 
            key={index}
            style={{ 
              padding: '20px', 
              backgroundColor: `${useCase.color}15`, 
              border: `2px solid ${useCase.color}30`,
              borderRadius: '12px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${useCase.color}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '12px' 
            }}>
              <span style={{ 
                fontSize: '24px', 
                marginRight: '12px' 
              }}>
                {useCase.icon}
              </span>
              <h4 style={{ 
                color: useCase.color, 
                margin: '0',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                {useCase.title}
              </h4>
            </div>
            
            <p style={{ 
              margin: '0 0 15px 0', 
              color: '#555', 
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {useCase.description}
            </p>
            
            <ul style={{ 
              margin: '0', 
              paddingLeft: '20px', 
              fontSize: '14px',
              color: '#666'
            }}>
              {useCase.examples.map((example, exampleIndex) => (
                <li key={exampleIndex} style={{ 
                  marginBottom: '6px',
                  lineHeight: '1.4'
                }}>
                  {example}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCases;