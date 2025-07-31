import React from 'react';
import { MarkerControlsProps } from '../../../../types/controls';

const MarkerControls: React.FC<MarkerControlsProps> = ({
  selectedExample,
  selectedMarker,
  markerPosition,
  interactiveMarkers,
  onMarkerClick,
  onResetPosition
}) => {
  if (selectedExample === 'interactive' && interactiveMarkers) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🎮 Interactive Markers
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          Click on any marker to select it and see the visual feedback
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {interactiveMarkers.map(marker => (
            <div
              key={marker.id}
              style={{
                padding: '10px',
                backgroundColor: selectedMarker === marker.id ? '#fff3cd' : 'white',
                border: `2px solid ${selectedMarker === marker.id ? '#ffc107' : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => onMarkerClick?.(marker.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: selectedMarker === marker.id ? '#FFD700' : '#007bff',
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}
                />
                <strong>{marker.title}</strong>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                Lat: {marker.position.lat.toFixed(4)}, Lng: {marker.position.lng.toFixed(4)}
              </p>
            </div>
          ))}
        </div>
        
        {selectedMarker && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            borderRadius: '6px',
            border: '1px solid #c3e6cb'
          }}>
            <strong>Selected:</strong> {interactiveMarkers.find(m => m.id === selectedMarker)?.title}
          </div>
        )}
      </div>
    );
  }

  if (selectedExample === 'draggable' && markerPosition) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
          🖱️ Draggable Marker Controls
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          Drag the marker to move it to a new position. The coordinates will update in real-time.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <strong>Latitude:</strong>
            <br />
            <span style={{ fontSize: '14px', color: '#666' }}>
              {markerPosition.lat.toFixed(6)}
            </span>
          </div>
          
          <div style={{ 
            padding: '10px', 
            backgroundColor: 'white', 
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <strong>Longitude:</strong>
            <br />
            <span style={{ fontSize: '14px', color: '#666' }}>
              {markerPosition.lng.toFixed(6)}
            </span>
          </div>
        </div>
        
        <button
          onClick={onResetPosition}
          style={{
            marginTop: '15px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset to Kingdom Centre
        </button>
      </div>
    );
  }

  return null;
};

export default MarkerControls;