import React from 'react';
import { ExampleNavigationProps } from '../../types/guide';

const ExampleNavigation: React.FC<ExampleNavigationProps> = ({
  examples,
  selectedExample,
  onExampleChange
}) => {
  // Function to get appropriate icon for each example type
  const getExampleIcon = (key: string, title: string) => {
    // Check by key first
    if (key.includes('basic')) return '🔰';
    if (key.includes('interactive')) return '🎮';
    if (key.includes('animated')) return '🎬';
    if (key.includes('editable')) return '✏️';
    if (key.includes('styled') || key.includes('custom')) return '🎨';
    if (key.includes('multiple') || key.includes('coverage')) return '📊';
    if (key.includes('advanced')) return '🚀';
    if (key.includes('builder')) return '🔧';
    if (key.includes('holes')) return '🕳️';
    if (key.includes('geodesic')) return '🌍';
    
    // Check by title if key doesn't match
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('basic')) return '🔰';
    if (lowerTitle.includes('interactive')) return '🎮';
    if (lowerTitle.includes('animated') || lowerTitle.includes('animation')) return '🎬';
    if (lowerTitle.includes('editable') || lowerTitle.includes('edit')) return '✏️';
    if (lowerTitle.includes('styled') || lowerTitle.includes('styling') || lowerTitle.includes('custom')) return '🎨';
    if (lowerTitle.includes('multiple') || lowerTitle.includes('coverage') || lowerTitle.includes('zones')) return '📊';
    if (lowerTitle.includes('advanced')) return '🚀';
    if (lowerTitle.includes('builder') || lowerTitle.includes('tool')) return '🔧';
    if (lowerTitle.includes('holes') || lowerTitle.includes('hole')) return '🕳️';
    if (lowerTitle.includes('geodesic') || lowerTitle.includes('earth')) return '🌍';
    if (lowerTitle.includes('marker')) return '📍';
    if (lowerTitle.includes('info') || lowerTitle.includes('window')) return '💬';
    if (lowerTitle.includes('polyline') || lowerTitle.includes('line')) return '📏';
    if (lowerTitle.includes('polygon')) return '🔷';
    if (lowerTitle.includes('circle')) return '⭕';
    if (lowerTitle.includes('rectangle')) return '⬜';
    if (lowerTitle.includes('map')) return '🗺️';
    
    // Default icon
    return '📋';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        margin: '0 0 15px 0', 
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        📚 Examples
        <span style={{
          fontSize: '14px',
          backgroundColor: '#e9ecef',
          padding: '4px 8px',
          borderRadius: '12px',
          fontWeight: 'normal'
        }}>
          {Object.keys(examples).length} examples
        </span>
      </h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {Object.entries(examples).map(([key, example]) => {
          const icon = getExampleIcon(key, example.title);
          const isSelected = selectedExample === key;
          
          return (
            <button
              key={key}
              onClick={() => onExampleChange(key)}
              style={{
                padding: '12px 18px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: isSelected ? '#1976d2' : '#e3f2fd',
                color: isSelected ? 'white' : '#1976d2',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: isSelected ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSelected ? '0 2px 8px rgba(25, 118, 210, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                transform: isSelected ? 'translateY(-1px)' : 'translateY(0)',
                minHeight: '44px'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#bbdefb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(25, 118, 210, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span>{example.title}</span>
            </button>
          );
        })}
      </div>
      
      {/* Selected Example Description */}
      {examples[selectedExample] && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            fontSize: '13px',
            color: '#666',
            lineHeight: '1.4'
          }}>
            <strong style={{ color: '#333' }}>
              {getExampleIcon(selectedExample, examples[selectedExample].title)} {examples[selectedExample].title}:
            </strong>{' '}
            {examples[selectedExample].description}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleNavigation;