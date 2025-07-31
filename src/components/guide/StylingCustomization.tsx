import React, { useState } from 'react';
import { StylingCustomizationProps } from '../../types/guide';

const StylingCustomization: React.FC<StylingCustomizationProps> = ({ title, examples }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedExample, setSelectedExample] = useState<number>(0);

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
          🎨 {title}
          <span style={{
            fontSize: '12px',
            color: '#6c757d',
            fontWeight: '400',
            padding: '2px 8px',
            backgroundColor: 'rgba(108, 117, 125, 0.1)',
            borderRadius: '12px'
          }}>
            {examples.length} example{examples.length !== 1 ? 's' : ''}
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

      {/* Expanded Content */}
      {isExpanded && (
        <div>
          {/* Example Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '12px'
          }}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedExample === index ? example.color : 'transparent',
                  color: selectedExample === index ? 'white' : example.color,
                  border: `2px solid ${example.color}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedExample !== index) {
                    e.currentTarget.style.backgroundColor = `${example.color}15`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedExample !== index) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Selected Example Content */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            border: `3px solid ${examples[selectedExample].color}15`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: examples[selectedExample].color,
                borderRadius: '50%'
              }} />
              <h4 style={{
                margin: 0,
                color: examples[selectedExample].color,
                fontSize: '16px',
                fontWeight: '600'
              }}>
                {examples[selectedExample].title}
              </h4>
            </div>

            {examples[selectedExample].description && (
              <p style={{
                margin: '0 0 16px 0',
                color: '#6c757d',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {examples[selectedExample].description}
              </p>
            )}

            {/* Code Block */}
            <div style={{
              backgroundColor: '#2d3748',
              borderRadius: '8px',
              padding: '16px',
              overflow: 'auto'
            }}>
              <pre style={{
                margin: 0,
                color: '#e2e8f0',
                fontSize: '13px',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}>
                <code>{examples[selectedExample].code}</code>
              </pre>
            </div>

            {/* Copy Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px'
            }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(examples[selectedExample].code);
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: examples[selectedExample].color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                📋 Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylingCustomization;