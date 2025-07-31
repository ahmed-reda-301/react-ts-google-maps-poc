import React from 'react';

interface PolygonControlsProps {
  selectedExample: string;
  interactivePolygon: google.maps.LatLngLiteral[];
  isBuilding: boolean;
  selectedZone: string | null;
  zones: Array<{
    id: string;
    name: string;
    paths: google.maps.LatLngLiteral[];
    fillColor: string;
    strokeColor: string;
  }>;
  onStartBuilding: () => void;
  onFinishPolygon: () => void;
  onClearPolygon: () => void;
  onZoneSelect: (zoneId: string) => void;
}

const PolygonControls: React.FC<PolygonControlsProps> = ({
  selectedExample,
  interactivePolygon,
  isBuilding,
  selectedZone,
  zones,
  onStartBuilding,
  onFinishPolygon,
  onClearPolygon,
  onZoneSelect
}) => {
  return (
    <div className="controls-panel">
      {selectedExample === 'interactive' && (
        <div className="control-section">
          <h4>Interactive Polygon Builder</h4>
          <div className="control-group">
            <p className="instruction">
              {!isBuilding 
                ? 'Click "Start Building" then click on the map to add polygon points'
                : `Click on the map to add points (${interactivePolygon.length} points added)`
              }
            </p>
            
            {!isBuilding ? (
              <button 
                onClick={onStartBuilding}
                className="control-button primary"
              >
                Start Building Polygon
              </button>
            ) : (
              <div className="button-group">
                <button 
                  onClick={onFinishPolygon}
                  className="control-button primary"
                  disabled={interactivePolygon.length < 3}
                >
                  Finish Polygon ({interactivePolygon.length >= 3 ? 'Ready' : 'Need 3+ points'})
                </button>
                <button 
                  onClick={onClearPolygon}
                  className="control-button secondary"
                >
                  Clear & Cancel
                </button>
              </div>
            )}
          </div>
          
          <div className="info-display">
            <p>Points added: {interactivePolygon.length}</p>
            <p>Status: {isBuilding ? 'Building...' : 'Ready to build'}</p>
            {interactivePolygon.length > 0 && interactivePolygon.length < 3 && (
              <p className="warning">Need at least 3 points to create a polygon</p>
            )}
          </div>
        </div>
      )}

      {selectedExample === 'multiple' && (
        <div className="control-section">
          <h4>Zone Selection</h4>
          <div className="zone-list">
            {zones.map(zone => (
              <button
                key={zone.id}
                onClick={() => onZoneSelect(zone.id)}
                className={`zone-button ${selectedZone === zone.id ? 'selected' : ''}`}
                style={{
                  borderColor: zone.strokeColor,
                  backgroundColor: selectedZone === zone.id ? zone.fillColor + '20' : 'transparent'
                }}
              >
                {zone.name}
              </button>
            ))}
          </div>
          {selectedZone && (
            <div className="zone-info">
              <p>Selected: {zones.find(z => z.id === selectedZone)?.name}</p>
              <p>Click on a zone to select/deselect it</p>
            </div>
          )}
        </div>
      )}

      {selectedExample === 'basic' && (
        <div className="control-section">
          <h4>Basic Polygon</h4>
          <div className="info-display">
            <p>This example shows a simple polygon with basic styling.</p>
            <p>The polygon covers key landmarks in Riyadh.</p>
          </div>
        </div>
      )}

      {selectedExample === 'holes' && (
        <div className="control-section">
          <h4>Polygon with Holes</h4>
          <div className="info-display">
            <p>This example demonstrates a polygon with exclusion areas (holes).</p>
            <p>The outer boundary defines the main area, while inner boundaries create holes.</p>
            <p>Note: Holes must have opposite winding order from the outer boundary.</p>
          </div>
        </div>
      )}

      {selectedExample === 'styled' && (
        <div className="control-section">
          <h4>Styled Polygons</h4>
          <div className="info-display">
            <p>This example shows different styling options for polygons.</p>
            <p>Each polygon uses different colors, opacity, and stroke settings.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolygonControls;