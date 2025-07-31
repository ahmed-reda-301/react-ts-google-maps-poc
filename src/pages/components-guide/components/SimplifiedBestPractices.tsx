import React, { useState } from 'react';
import { BestPracticeItem } from '../types';

interface SimplifiedBestPracticesProps {
  dos: BestPracticeItem[];
  donts: BestPracticeItem[];
  tips?: BestPracticeItem[];
}

const SimplifiedBestPractices: React.FC<SimplifiedBestPracticesProps> = ({ dos, donts, tips }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
          padding: '8px 0'
        }}
      >
        <h3 style={{ 
          margin: 0, 
          color: '#333', 
          fontSize: '18px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          💡 Best Practices & Guidelines
          <span style={{
            fontSize: '12px',
            color: '#6c757d',
            fontWeight: '400',
            padding: '2px 8px',
            backgroundColor: 'rgba(108, 117, 125, 0.1)',
            borderRadius: '12px'
          }}>
            {dos.length + donts.length + (tips?.length || 0)} tips
          </span>
        </h3>
        
        <span style={{
          fontSize: '16px',
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
          marginTop: '8px',
          fontSize: '14px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#28a745'
          }}>
            <span>✅</span>
            <span>{dos.length} Do's</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#dc3545'
          }}>
            <span>❌</span>
            <span>{donts.length} Don'ts</span>
          </div>
          {tips && tips.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#ffc107'
            }}>
              <span>💡</span>
              <span>{tips.length} Tips</span>
            </div>
          )}
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: tips && tips.length > 0 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr 1fr', 
            gap: '20px' 
          }}>
            
            {/* Do's */}
            <div style={{
              backgroundColor: '#e8f5e8',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #c3e6cb'
            }}>
              <h4 style={{ 
                color: '#155724', 
                marginBottom: '16px', 
                fontSize: '18px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ✅ Do's
                <span style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  fontWeight: '400',
                  padding: '2px 8px',
                  backgroundColor: 'rgba(108, 117, 125, 0.1)',
                  borderRadius: '12px'
                }}>
                  {dos.length}
                </span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dos.map((item, index) => (
                  <div key={index} style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #c3e6cb',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ fontWeight: '600', color: '#155724', marginBottom: '4px' }}>
                      {item.text}
                    </div>
                    {item.description && (
                      <div style={{ color: '#495057', fontSize: '13px' }}>
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts */}
            <div style={{
              backgroundColor: '#f8d7da',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #f5c6cb'
            }}>
              <h4 style={{ 
                color: '#721c24', 
                marginBottom: '16px', 
                fontSize: '18px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ❌ Don'ts
                <span style={{
                  fontSize: '12px',
                  color: '#6c757d',
                  fontWeight: '400',
                  padding: '2px 8px',
                  backgroundColor: 'rgba(108, 117, 125, 0.1)',
                  borderRadius: '12px'
                }}>
                  {donts.length}
                </span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {donts.map((item, index) => (
                  <div key={index} style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #f5c6cb',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ fontWeight: '600', color: '#721c24', marginBottom: '4px' }}>
                      {item.text}
                    </div>
                    {item.description && (
                      <div style={{ color: '#495057', fontSize: '13px' }}>
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {tips && tips.length > 0 && (
              <div style={{
                backgroundColor: '#fff3cd',
                borderRadius: '12px',
                padding: '20px',
                border: '2px solid #ffeaa7',
                gridColumn: tips.length > 4 ? '1 / -1' : 'auto'
              }}>
                <h4 style={{ 
                  color: '#856404', 
                  marginBottom: '16px', 
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  💡 Pro Tips
                  <span style={{
                    fontSize: '12px',
                    color: '#6c757d',
                    fontWeight: '400',
                    padding: '2px 8px',
                    backgroundColor: 'rgba(108, 117, 125, 0.1)',
                    borderRadius: '12px'
                  }}>
                    {tips.length}
                  </span>
                </h4>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: tips.length > 2 ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
                  gap: '12px'
                }}>
                  {tips.map((item, index) => (
                    <div key={index} style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #ffeaa7',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ fontWeight: '600', color: '#856404', marginBottom: '4px' }}>
                        {item.text}
                      </div>
                      {item.description && (
                        <div style={{ color: '#495057', fontSize: '13px' }}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>


        </div>
      )}
    </div>
  );
};

export default SimplifiedBestPractices;