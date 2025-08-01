import React from 'react';
import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import { rectangleGuideData } from '../../data/guide/rectangleGuideData';
import { useRectangleGuideState } from '../../hooks/useGuideState';
import { 
  GUIDE_CONFIG, 
  GUIDE_POSITIONS, 
  GUIDE_ZOOM_LEVELS, 
  GUIDE_ZONES,
  GUIDE_STYLING_EXAMPLES,
  GUIDE_STYLES
} from '../../constants/guideConstants';
import { commonZones } from '../../data/guide/commonGuideData';
import { createMapClickHandler, createZoneClickHandler } from '../../utils/guideHelpers';
import '../../styles/compact-controls.css';

const RectangleGuide: React.FC = () => {
  const {
    selectedExample,
    rectangles,
    isDrawing,
    startPoint,
    selectedZone,
    setSelectedExample,
    startDrawing,
    finishDrawing,
    clearRectangles,
    handleZoneClick,
    resetRectangleState,
  } = useRectangleGuideState();

  // Use common zones data (convert to rectangle bounds format)
  const zones = commonZones.map(zone => ({
    ...zone,
    bounds: zone.bounds || {
      north: Math.max(...zone.paths.map(p => p.lat)),
      south: Math.min(...zone.paths.map(p => p.lat)),
      east: Math.max(...zone.paths.map(p => p.lng)),
      west: Math.min(...zone.paths.map(p => p.lng))
    }
  }));

  // Create map click handler for interactive drawing
  const onMapClick = createMapClickHandler(
    selectedExample,
    'interactive',
    (position) => {
      if (!isDrawing) {
        startDrawing(position);
      } else {
        finishDrawing(position);
      }
    }
  );

  const onZoneClick = createZoneClickHandler(selectedZone, handleZoneClick);

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...rectangleGuideData.examples,
    multiple: {
      ...rectangleGuideData.examples.multiple,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          {zones.map(zone => (
            <Rectangle
              key={zone.id}
              bounds={zone.bounds}
              options={{
                fillColor: zone.fillColor,
                fillOpacity: selectedZone === zone.id ? GUIDE_STYLES.OPACITY.HIGH : GUIDE_STYLES.OPACITY.MEDIUM,
                strokeColor: zone.strokeColor,
                strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
                strokeWeight: selectedZone === zone.id ? GUIDE_STYLES.STROKE_WEIGHT.THICK : GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
                clickable: true
              }}
              onClick={() => onZoneClick(zone.id)}
            />
          ))}
        </GoogleMap>
      )
    },
    interactive: {
      ...rectangleGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
          onClick={onMapClick}
        >
          {rectangles.map(rectangle => (
            <Rectangle
              key={rectangle.id}
              bounds={rectangle.bounds}
              options={{
                fillColor: GUIDE_STYLES.COLORS.ACCENT,
                fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
                strokeColor: GUIDE_STYLES.COLORS.ERROR,
                strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
                strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
                clickable: true
              }}
              onClick={(e) => {
                console.log('Rectangle clicked at:', e.latLng?.lat(), e.latLng?.lng());
              }}
            />
          ))}

          {/* Show start point marker when drawing */}
          {isDrawing && startPoint && (
            <Marker
              position={startPoint}
              title="Start Point"
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="${GUIDE_STYLES.COLORS.ERROR}" stroke="#FFFFFF" stroke-width="2"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(20, 20)
              }}
            />
          )}
        </GoogleMap>
      )
    }
  };

  // Create styling examples using common templates
  const stylingExamples = [
    {
      ...GUIDE_STYLING_EXAMPLES.BASIC,
      code: `<Rectangle
  bounds={{
    north: 24.7400,
    south: 24.6800,
    east: 46.7200,
    west: 46.6400
  }}
  options={{
    fillColor: '${GUIDE_STYLES.COLORS.ERROR}',
    fillOpacity: ${GUIDE_STYLES.OPACITY.MEDIUM},
    strokeColor: '${GUIDE_STYLES.COLORS.ERROR}',
    strokeOpacity: ${GUIDE_STYLES.OPACITY.HIGH},
    strokeWeight: ${GUIDE_STYLES.STROKE_WEIGHT.NORMAL}
  }}
/>`
    },
    {
      title: 'Zone Styling',
      color: GUIDE_STYLES.COLORS.SUCCESS,
      description: 'Different styling for various zone types with interactive selection.',
      code: `<Rectangle
  bounds={zone.bounds}
  options={{
    fillColor: zone.fillColor,
    fillOpacity: isSelected ? ${GUIDE_STYLES.OPACITY.HIGH} : ${GUIDE_STYLES.OPACITY.MEDIUM},
    strokeColor: zone.strokeColor,
    strokeOpacity: ${GUIDE_STYLES.OPACITY.HIGH},
    strokeWeight: isSelected ? ${GUIDE_STYLES.STROKE_WEIGHT.THICK} : ${GUIDE_STYLES.STROKE_WEIGHT.NORMAL},
    clickable: true
  }}
  onClick={() => handleZoneSelection(zone.id)}
/>`
    },
    {
      title: 'Interactive Drawing',
      color: GUIDE_STYLES.COLORS.ACCENT,
      description: 'Rectangle creation through user interaction with visual feedback.',
      code: `// Interactive rectangle drawing
const [isDrawing, setIsDrawing] = useState(false);
const [startPoint, setStartPoint] = useState(null);

const onMapClick = useCallback((e) => {
  if (!isDrawing) {
    setStartPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setIsDrawing(true);
  } else {
    const endPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    const bounds = {
      north: Math.max(startPoint.lat, endPoint.lat),
      south: Math.min(startPoint.lat, endPoint.lat),
      east: Math.max(startPoint.lng, endPoint.lng),
      west: Math.min(startPoint.lng, endPoint.lng)
    };
    
    setRectangles(prev => [...prev, { id: Date.now(), bounds }]);
    setIsDrawing(false);
  }
}, [isDrawing, startPoint]);

<Rectangle
  bounds={rectangle.bounds}
  options={{
    fillColor: '${GUIDE_STYLES.COLORS.ACCENT}',
    fillOpacity: ${GUIDE_STYLES.OPACITY.MEDIUM},
    strokeColor: '${GUIDE_STYLES.COLORS.ERROR}',
    strokeOpacity: ${GUIDE_STYLES.OPACITY.HIGH},
    strokeWeight: ${GUIDE_STYLES.STROKE_WEIGHT.NORMAL}
  }}
/>`
    }
  ];

  // Define control sections for each example - compact design
  const controlSections = {
    basic: [
      {
        title: 'Basic Rectangle',
        content: (
          <div className="control-group compact">
            <div className="compact-info">
              ⬜ Rectangle Shape • 📍 Business Area • 🎨 Standard Fill & Stroke
            </div>
          </div>
        )
      }
    ],
    multiple: [
      {
        title: 'Zone Selection',
        content: (
          <div className="control-group compact">
            <div className="compact-zones">
              {zones.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => handleZoneClick(zone.id)}
                  className={`compact-zone-btn ${selectedZone === zone.id ? 'selected' : ''}`}
                  style={{
                    borderColor: zone.strokeColor,
                    backgroundColor: selectedZone === zone.id ? zone.fillColor + '30' : 'transparent'
                  }}
                >
                  <span className="zone-color-dot" style={{ backgroundColor: zone.fillColor }}></span>
                  {zone.name}
                </button>
              ))}
            </div>
            {selectedZone && (
              <div className="compact-selected">
                Selected: <strong>{zones.find(z => z.id === selectedZone)?.name}</strong>
              </div>
            )}
          </div>
        )
      }
    ],
    interactive: [
      {
        title: 'Rectangle Drawing',
        content: (
          <div className="control-group compact">
            <div className="compact-status">
              <div className="status-info">
                <span className={`status-dot ${isDrawing ? 'active' : 'inactive'}`}></span>
                <span>{isDrawing ? 'Drawing' : 'Ready'}</span>
                <span className="points-badge">{rectangles.length}</span>
              </div>
              <div className="compact-controls">
                <button 
                  onClick={clearRectangles}
                  className="control-button danger compact"
                  disabled={rectangles.length === 0 && !isDrawing}
                >
                  🗑️ Clear All
                </button>
                {isDrawing && (
                  <button 
                    onClick={resetRectangleState}
                    className="control-button secondary compact"
                  >
                    ❌ Cancel
                  </button>
                )}
              </div>
            </div>
            <div className="compact-info">
              {isDrawing 
                ? 'Click on the map to set the end point'
                : 'Click on the map to start drawing a rectangle'
              }
            </div>
          </div>
        )
      }
    ],
    styled: [
      {
        title: 'Styling Options',
        content: (
          <div className="control-group compact">
            <div className="compact-styles">
              <div className="style-item">
                <div className="style-preview fill" style={{ backgroundColor: '#ff6b6b' }}></div>
                <span>Fill Color</span>
              </div>
              <div className="style-item">
                <div className="style-preview stroke" style={{ borderColor: '#4ecdc4' }}></div>
                <span>Stroke Color</span>
              </div>
              <div className="style-item">
                <div className="style-preview opacity" style={{ backgroundColor: '#45b7d1', opacity: 0.5 }}></div>
                <span>Opacity</span>
              </div>
              <div className="style-item">
                <div className="style-preview bounds" style={{ borderColor: '#96ceb4', borderWidth: '3px', borderStyle: 'dashed' }}></div>
                <span>Bounds</span>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  return (
    <GuideLayout
      title={rectangleGuideData.title}
      subtitle={rectangleGuideData.subtitle}
      icon={rectangleGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={rectangleGuideData.propsData}
      bestPractices={rectangleGuideData.bestPractices}
      useCases={rectangleGuideData.useCases}
      tasks={rectangleGuideData.tasks}
      navigationLinks={rectangleGuideData.navigationLinks}
      stylingExamples={stylingExamples}
      onMapReset={resetRectangleState}
      controlSections={controlSections}
    />
  );
};

export default RectangleGuide;