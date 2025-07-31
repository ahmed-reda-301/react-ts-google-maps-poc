import React from 'react';
import { PolylineControlsProps } from '../../../../types/controls';

const PolylineControls: React.FC<PolylineControlsProps> = ({
  selectedExample,
  interactivePath,
  onClearPath,
  animatedPath,
  fullAnimationPath,
  isAnimating,
  onStartAnimation,
  onResetAnimation
}) => {
  // Interactive Controls
  if (selectedExample === 'interactive' && interactivePath) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🎮 Interactive Controls
        </h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onClearPath}
            disabled={interactivePath.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: interactivePath.length > 0 ? '#dc3545' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: interactivePath.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            Clear Path
          </button>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            Points: {interactivePath.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            💡 Click on the map to add points
          </div>
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

  return null;
};

export default PolylineControls;