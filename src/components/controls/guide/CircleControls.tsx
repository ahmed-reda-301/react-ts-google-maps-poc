import React from 'react';

interface CircleControlsProps {
  selectedExample: string;
  basicRadius: number;
  onBasicRadiusChange: (radius: number) => void;
  selectedArea: string | null;
  coverageAreas: Array<{
    id: string;
    name: string;
    center: { lat: number; lng: number };
    radius: number;
    color: string;
  }>;
  onAreaSelect: (areaId: string) => void;
  interactiveCircles: Array<any>;
  isCreating: boolean;
  selectedRadius: number;
  selectedColor: string;
  onStartCreating: () => void;
  onCancelCreating: () => void;
  onRadiusChange: (radius: number) => void;
  onColorChange: (color: string) => void;
  onClearCircles: () => void;
  editableCircle: {
    center: { lat: number; lng: number };
    radius: number;
  };
  isEditable: boolean;
  onToggleEditable: () => void;
}

const CircleControls: React.FC<CircleControlsProps> = ({
  selectedExample,
  basicRadius,
  onBasicRadiusChange,
  selectedArea,
  coverageAreas,
  onAreaSelect,
  interactiveCircles,
  isCreating,
  selectedRadius,
  selectedColor,
  onStartCreating,
  onCancelCreating,
  onRadiusChange,
  onColorChange,
  onClearCircles,
  editableCircle,
  isEditable,
  onToggleEditable
}) => {
  const colors = [
    { name: 'Blue', value: '#007bff' },
    { name: 'Green', value: '#28a745' },
    { name: 'Red', value: '#dc3545' },
    { name: 'Orange', value: '#fd7e14' },
    { name: 'Purple', value: '#6f42c1' },
    { name: 'Teal', value: '#20c997' }
  ];

  const calculateArea = (radius: number): string => {
    const area = Math.PI * Math.pow(radius / 1000, 2);
    return area.toFixed(2);
  };

  return (
    <div className="controls-panel">
      {selectedExample === 'basic' && (
        <div className="control-section">
          <h4>Basic Circle Controls</h4>
          <div className="control-group">
            <label>
              Radius: {basicRadius >= 1000 ? `${basicRadius/1000}km` : `${basicRadius}m`}
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={basicRadius}
              onChange={(e) => onBasicRadiusChange(parseInt(e.target.value))}
              className="range-input"
            />
          </div>
          <div className="info-display">
            <p>Area: {calculateArea(basicRadius)} km²</p>
          </div>
        </div>
      )}

      {selectedExample === 'coverage' && (
        <div className="control-section">
          <h4>Coverage Areas</h4>
          <p className="instruction">Click on any circle to highlight it and see details</p>
          <div className="coverage-list">
            {coverageAreas.map(area => (
              <button
                key={area.id}
                onClick={() => onAreaSelect(area.id)}
                className={`coverage-button ${selectedArea === area.id ? 'selected' : ''}`}
                style={{
                  borderColor: area.color,
                  backgroundColor: selectedArea === area.id ? area.color + '20' : 'transparent'
                }}
              >
                <div className="coverage-info">
                  <strong>{area.name}</strong>
                  <div>Radius: {area.radius >= 1000 ? `${area.radius/1000}km` : `${area.radius}m`}</div>
                  <div>Area: {calculateArea(area.radius)} km²</div>
                </div>
              </button>
            ))}
          </div>
          {selectedArea && (
            <div className="area-info">
              <p>Selected: {coverageAreas.find(a => a.id === selectedArea)?.name}</p>
            </div>
          )}
        </div>
      )}

      {selectedExample === 'interactive' && (
        <div className="control-section">
          <h4>Circle Builder Controls</h4>
          <p className="instruction">
            {isCreating 
              ? 'Click on the map to place a circle'
              : 'Configure your circle settings and click "Start Creating"'
            }
          </p>
          
          <div className="control-group">
            <label>
              Radius: {selectedRadius >= 1000 ? `${selectedRadius/1000}km` : `${selectedRadius}m`}
            </label>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={selectedRadius}
              onChange={(e) => onRadiusChange(parseInt(e.target.value))}
              className="range-input"
            />
          </div>
          
          <div className="control-group">
            <label>Color:</label>
            <div className="color-picker">
              {colors.map(color => (
                <button
                  key={color.value}
                  onClick={() => onColorChange(color.value)}
                  className={`color-button ${selectedColor === color.value ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="button-group">
            {!isCreating ? (
              <button 
                onClick={onStartCreating}
                className="control-button primary"
              >
                Start Creating
              </button>
            ) : (
              <button 
                onClick={onCancelCreating}
                className="control-button secondary"
              >
                Cancel Creating
              </button>
            )}
            
            <button
              onClick={onClearCircles}
              disabled={interactiveCircles.length === 0}
              className="control-button"
            >
              Clear All ({interactiveCircles.length})
            </button>
          </div>

          <div className="info-display">
            <p>Circles created: {interactiveCircles.length}</p>
            {interactiveCircles.length > 0 && (
              <p>Total area: {interactiveCircles.reduce((total, circle) => 
                total + parseFloat(calculateArea(circle.radius)), 0
              ).toFixed(2)} km²</p>
            )}
          </div>
        </div>
      )}

      {selectedExample === 'editable' && (
        <div className="control-section">
          <h4>Editable Circle Controls</h4>
          <p className="instruction">
            {isEditable 
              ? 'Drag the circle to move it or drag the edge to resize it'
              : 'Click "Edit Mode" to make the circle editable'
            }
          </p>
          
          <div className="button-group">
            <button
              onClick={onToggleEditable}
              className={`control-button ${isEditable ? 'secondary' : 'primary'}`}
            >
              {isEditable ? 'Exit Edit Mode' : 'Edit Mode'}
            </button>
          </div>

          <div className="info-display">
            <div className="measurement-grid">
              <div className="measurement-item">
                <strong>Center:</strong>
                <div>Lat: {editableCircle.center.lat.toFixed(6)}</div>
                <div>Lng: {editableCircle.center.lng.toFixed(6)}</div>
              </div>
              
              <div className="measurement-item">
                <strong>Radius:</strong>
                <div>
                  {editableCircle.radius >= 1000 
                    ? `${(editableCircle.radius / 1000).toFixed(2)} km`
                    : `${editableCircle.radius.toFixed(0)} m`
                  }
                </div>
              </div>
              
              <div className="measurement-item">
                <strong>Area:</strong>
                <div>{calculateArea(editableCircle.radius)} km²</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircleControls;