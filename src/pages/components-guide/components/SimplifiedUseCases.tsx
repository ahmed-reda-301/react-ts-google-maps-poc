import React, { useState } from 'react';
import { UseCase } from '../types';

interface SimplifiedUseCasesProps {
  cases: UseCase[];
}

const SimplifiedUseCases: React.FC<SimplifiedUseCasesProps> = ({ cases }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '8px 0',
          marginBottom: isExpanded ? '20px' : '0'
        }}
      >
        <h3 style={{ 
          margin: 0, 
          color: '#333', 
          fontSize: '20px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🎯 Common Use Cases
          <span style={{
            fontSize: '12px',
            color: '#6c757d',
            fontWeight: '400',
            padding: '2px 8px',
            backgroundColor: 'rgba(108, 117, 125, 0.1)',
            borderRadius: '12px'
          }}>
            {cases.length} categories
          </span>
        </h3>
        
        <span style={{
          fontSize: '18px',
          color: '#6c757d',
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▶
        </span>
      </div>

      {/* Quick Summary */}
      {!isExpanded && (
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '12px',
          flexWrap: 'wrap'
        }}>
          {cases.map((useCase, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              backgroundColor: `${useCase.color}15`,
              borderRadius: '20px',
              fontSize: '14px',
              color: useCase.color,
              border: `2px solid ${useCase.color}30`,
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '16px' }}>{useCase.icon}</span>
              <span>{useCase.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ marginTop: '20px' }}>
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
                  backgroundColor: `${useCase.color}08`,
                  borderRadius: '12px',
                  border: `2px solid ${useCase.color}30`
                }}
              >
                {/* Card Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: useCase.color,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    {useCase.icon}
                  </div>
                  <div>
                    <h4 style={{
                      margin: 0,
                      color: useCase.color,
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {useCase.title}
                    </h4>
                  </div>
                </div>
                
                {/* Description */}
                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  color: '#495057',
                  lineHeight: '1.5'
                }}>
                  {useCase.description}
                </p>
                
                {/* Examples as bullet points */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  border: `1px solid ${useCase.color}20`
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: useCase.color,
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Examples:
                  </div>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '16px',
                    fontSize: '13px',
                    color: '#495057',
                    lineHeight: '1.6'
                  }}>
                    {useCase.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} style={{ marginBottom: '4px' }}>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplifiedUseCases;