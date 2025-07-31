import React from 'react';
import { CARD_STYLES, UI_COLORS, COMPONENT_STYLES } from '../constants';

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
      ...CARD_STYLES.DEFAULT,
      marginBottom: COMPONENT_STYLES.MARGIN.LARGE
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: COMPONENT_STYLES.PADDING.MEDIUM,
        marginBottom: COMPONENT_STYLES.MARGIN.LARGE,
        paddingBottom: COMPONENT_STYLES.PADDING.MEDIUM,
        borderBottom: `2px solid ${UI_COLORS.LIGHT}`
      }}>
        <h3 style={{
          margin: 0,
          color: UI_COLORS.DARK,
          fontSize: '18px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: COMPONENT_STYLES.PADDING.SMALL
        }}>
          📝 {title}
        </h3>
        
        {selectedExample && (
          <span style={{
            fontSize: '12px',
            color: UI_COLORS.SECONDARY,
            fontWeight: '400',
            padding: '4px 8px',
            backgroundColor: `${UI_COLORS.PRIMARY}15`,
            borderRadius: COMPONENT_STYLES.BORDER_RADIUS.LARGE,
            border: `1px solid ${UI_COLORS.PRIMARY}30`
          }}>
            {selectedExample}
          </span>
        )}
      </div>

      {/* Control Sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: visibleSections.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: COMPONENT_STYLES.PADDING.LARGE
      }}>
        {visibleSections.map((section, index) => (
          <div
            key={index}
            style={{
              padding: COMPONENT_STYLES.PADDING.LARGE,
              backgroundColor: section.color ? `${section.color}08` : UI_COLORS.LIGHT,
              borderRadius: COMPONENT_STYLES.BORDER_RADIUS.MEDIUM,
              border: `2px solid ${section.color ? `${section.color}30` : '#e9ecef'}`
            }}
          >
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: COMPONENT_STYLES.PADDING.SMALL,
              marginBottom: COMPONENT_STYLES.MARGIN.MEDIUM
            }}>
              {section.icon && (
                <span style={{ fontSize: '16px' }}>{section.icon}</span>
              )}
              <h4 style={{
                margin: 0,
                color: section.color || UI_COLORS.DARK,
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