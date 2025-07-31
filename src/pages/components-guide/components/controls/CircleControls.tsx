import React from 'react';
import { CircleControlsProps } from '../../../../types/controls';

const CircleControls: React.FC<CircleControlsProps> = ({
  selectedExample,
  basicRadius,
  onBasicRadiusChange,
  selectedArea,
  coverageAreas,
  onAreaClick,
  circles,
  isCreating,
  selectedRadius,
  selectedColor,
  onStartCreating,
  onClearCircles,
  onRadiusChange,
  onColorChange,
  animatedPath,
  fullAnimationPath,
  isAnimating,
  onStartAnimation,
  onResetAnimation,
  editableCircle,
  isEditable,
  onToggleEditable,
  calculateArea,
  calculateTotalArea,
  componentColors
}) => {
  // Basic Circle Controls
  if (selectedExample === 'basic' && basicRadius !== undefined) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🎛️ Radius Control
        </h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Radius: {basicRadius >= 1000 ? `${basicRadius/1000}km` : `${basicRadius}m`}
          </label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="1000"
            value={basicRadius}
            onChange={(e) => onBasicRadiusChange?.(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px'
          }}>
            Area: {calculateArea?.(basicRadius)} km²
          </div>
        </div>
      </div>
    );
  }

  // Coverage Areas Controls
  if (selectedExample === 'coverage' && coverageAreas) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          📡 Coverage Areas
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          Click on any circle to highlight it and see details
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '10px' 
        }}>
          {coverageAreas.map(area => (
            <div
              key={area.id}
              style={{
                padding: '15px',
                backgroundColor: selectedArea === area.id ? area.color + '20' : 'white',
                border: `2px solid ${area.color}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => onAreaClick?.(area.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '8px' }}>
                  {area.icon}
                </span>
                <strong style={{ fontSize: '14px' }}>{area.name}</strong>
              </div>
              
              <div style={{ fontSize: '13px', color: '#666' }}>
                <div>Radius: {area.radius >= 1000 ? `${area.radius/1000}km` : `${area.radius}m`}</div>
                <div style={{ textTransform: 'capitalize' }}>Type: {area.type}</div>
                <div style={{ marginTop: '4px', fontStyle: 'italic' }}>{area.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Interactive Builder Controls
  if (selectedExample === 'interactive' && circles) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🎮 Circle Builder Controls
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          {isCreating 
            ? 'Click on the map to place a circle'
            : 'Configure your circle settings and click "Start Creating" to add circles to the map'
          }
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Radius: {selectedRadius && selectedRadius >= 1000 ? `${selectedRadius/1000}km` : `${selectedRadius}m`}
            </label>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={selectedRadius}
              onChange={(e) => onRadiusChange?.(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Color:
            </label>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {componentColors?.map(color => (
                <button
                  key={color.value}
                  onClick={() => onColorChange?.(color.value)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: color.value,
                    border: selectedColor === color.value ? '3px solid #000' : '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <button
            onClick={onStartCreating}
            style={{
              padding: '10px 20px',
              backgroundColor: isCreating ? '#dc3545' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isCreating ? 'Cancel Creating' : 'Start Creating'}
          </button>
          
          <button
            onClick={onClearCircles}
            disabled={circles.length === 0}
            style={{
              padding: '10px 20px',
              backgroundColor: circles.length > 0 ? '#6c757d' : '#e9ecef',
              color: circles.length > 0 ? 'white' : '#6c757d',
              border: 'none',
              borderRadius: '4px',
              cursor: circles.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            Clear All
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: 'white', 
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <strong>Circles:</strong> {circles.length}
          </div>
          
          {circles.length > 0 && (
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <strong>Total Area:</strong> {calculateTotalArea?.()} km²
            </div>
          )}
        </div>
      </div>
    );
  }

  // Animation Controls
  if (selectedExample === 'animated' && animatedPath && fullAnimationPath) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🎬 Animation Controls
        </h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onStartAnimation}
            disabled={isAnimating}
            style={{
              padding: '8px 16px',
              backgroundColor: isAnimating ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isAnimating ? 'not-allowed' : 'pointer'
            }}
          >
            {isAnimating ? 'Animating...' : 'Start Animation'}
          </button>
          
          <button
            onClick={onResetAnimation}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Progress: {animatedPath.length}/{fullAnimationPath.length}
          </div>
        </div>
      </div>
    );
  }

  // Editable Circle Controls
  if (selectedExample === 'editable' && editableCircle) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          ✏️ Editable Circle Controls
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          {isEditable 
            ? 'Drag the circle to move it or drag the edge to resize it'
            : 'Click "Edit Mode" to make the circle editable'
          }
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={onToggleEditable}
            style={{
              padding: '10px 20px',
              backgroundColor: isEditable ? '#dc3545' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isEditable ? 'Exit Edit Mode' : 'Edit Mode'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <strong>Center:</strong>
            <br />
            <small>
              Lat: {editableCircle.center.lat.toFixed(6)}
              <br />
              Lng: {editableCircle.center.lng.toFixed(6)}
            </small>
          </div>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <strong>Radius:</strong>
            <br />
            <small>
              {editableCircle.radius >= 1000 
                ? `${(editableCircle.radius / 1000).toFixed(2)} km`
                : `${editableCircle.radius.toFixed(0)} m`
              }
            </small>
          </div>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <strong>Area:</strong>
            <br />
            <small>{calculateArea?.(editableCircle.radius)} km²</small>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CircleControls;