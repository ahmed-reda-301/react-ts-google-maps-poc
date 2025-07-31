import React from 'react';
import { PolygonControlsProps } from '../../../../types/controls';

const PolygonControls: React.FC<PolygonControlsProps> = ({
  selectedExample,
  selectedZone,
  zones,
  onZoneClick,
  polygonPath,
  isBuilding,
  onStartBuilding,
  onFinishPolygon,
  onClearPolygon
}) => {
  // Zone Controls for Multiple Zones Example
  if (selectedExample === 'multiple' && zones) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🏙️ City Zones
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          Click on any zone to highlight it and see details
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '10px' 
        }}>
          {zones.map(zone => (
            <div
              key={zone.id}
              style={{
                padding: '10px',
                backgroundColor: selectedZone === zone.id ? zone.fillColor + '20' : 'white',
                border: `2px solid ${zone.strokeColor}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => onZoneClick?.(zone.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: zone.fillColor,
                    borderRadius: '3px',
                    marginRight: '8px'
                  }}
                />
                <strong>{zone.name}</strong>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {zone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Interactive Builder Controls
  if (selectedExample === 'interactive' && polygonPath) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🎮 Polygon Builder Controls
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          {isBuilding 
            ? 'Click on the map to add points to your polygon. You need at least 3 points.'
            : 'Click "Start Building" to create a new polygon by clicking on the map.'
          }
        </p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {!isBuilding ? (
            <button
              onClick={onStartBuilding}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Start Building
            </button>
          ) : (
            <>
              <button
                onClick={onFinishPolygon}
                disabled={polygonPath.length < 3}
                style={{
                  padding: '8px 16px',
                  backgroundColor: polygonPath.length >= 3 ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: polygonPath.length >= 3 ? 'pointer' : 'not-allowed'
                }}
              >
                Finish Polygon
              </button>
            </>
          )}
          
          <button
            onClick={onClearPolygon}
            disabled={polygonPath.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: polygonPath.length > 0 ? '#dc3545' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: polygonPath.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            Clear
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px'
          }}>
            Points: {polygonPath.length}
          </div>
          
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: isBuilding ? '#fff3cd' : '#e9ecef', 
            borderRadius: '4px'
          }}>
            Status: {isBuilding ? 'Building...' : 'Ready'}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PolygonControls;