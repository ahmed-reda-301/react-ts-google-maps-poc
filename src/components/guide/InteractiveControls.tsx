import React from 'react';

interface ControlSection {
  title: string;
  icon?: string;
  color?: string;
  children: React.ReactNode;
  isVisible?: boolean;
}

interface InteractiveControlsProps {
  title: string;
  sections: ControlSection[];
  selectedExample?: string;
}

const InteractiveControls: React.FC<InteractiveControlsProps> = ({ 
  title, 
  sections, 
  selectedExample 
}) => {
  // Filter visible sections
  const visibleSections = sections.filter(section => 
    section.isVisible !== false
  );

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      marginBottom: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '12px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <h3 style={{
          margin: 0,
          color: '#333',
          fontSize: '18px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📝 {title}
        </h3>
        
        {selectedExample && (
          <span style={{
            fontSize: '12px',
            color: '#666',
            fontWeight: '400',
            padding: '4px 8px',
            backgroundColor: '#1976d215',
            borderRadius: '16px',
            border: '1px solid #1976d230'
          }}>
            {selectedExample}
          </span>
        )}
      </div>

      {/* Control Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: visibleSections.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {visibleSections.map((section, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: section.color ? `${section.color}08` : '#f8f9fa',
              borderRadius: '8px',
              border: `2px solid ${section.color ? `${section.color}30` : '#e9ecef'}`
            }}
          >
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              {section.icon && (
                <span style={{ fontSize: '16px' }}>{section.icon}</span>
              )}
              <h4 style={{
                margin: 0,
                color: section.color || '#333',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {section.title}
              </h4>
            </div>

            {/* Section Content */}
            <div>
              {section.children}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveControls;