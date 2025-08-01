import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import { markerGuideData } from '../../data/guide/markerGuideData';
import { useMarkerGuideState } from '../../hooks/useGuideState';
import { 
  GUIDE_CONFIG, 
  RIYADH_LANDMARKS, 
  GUIDE_ZOOM_LEVELS, 
  GUIDE_MARKERS,
  GUIDE_STYLING_EXAMPLES 
} from '../../constants';
import { createDragEndHandler } from '../../utils/guideHelpers';
import '../../styles/compact-controls.css';

const MarkerGuide: React.FC = () => {
  const {
    selectedExample,
    selectedMarker,
    markerPosition,
    setSelectedExample,
    handleMarkerClick,
    handleMarkerDrag,
    resetMarkerState,
  } = useMarkerGuideState();

  // Use common markers data - convert to mutable array
  const interactiveMarkers = [...GUIDE_MARKERS.RIYADH_LANDMARKS];

  // Create event handlers using helper functions
  const onDragEnd = createDragEndHandler(handleMarkerDrag);

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...markerGuideData.examples,
    interactive: {
      ...markerGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={RIYADH_LANDMARKS.KINGDOM_CENTRE}
          zoom={GUIDE_ZOOM_LEVELS.OVERVIEW}
        >
          {interactiveMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              onClick={() => handleMarkerClick(Number(marker.id))}
            />
          ))}
        </GoogleMap>
      )
    },
    draggable: {
      ...markerGuideData.examples.draggable,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={markerPosition}
          zoom={GUIDE_ZOOM_LEVELS.OVERVIEW}
        >
          <Marker
            position={markerPosition}
            title="Drag me around!"
            draggable={true}
            onDragEnd={onDragEnd}
          />
        </GoogleMap>
      )
    }
  };

  // Create styling examples using common templates
  const stylingExamples = [
    {
      ...GUIDE_STYLING_EXAMPLES.BASIC,
      code: `<Marker
  position={{ lat: 24.7136, lng: 46.6753 }}
  title="Kingdom Centre"
  onClick={handleMarkerClick}
/>`
    },
    {
      title: 'Custom Icon',
      color: '#4caf50',
      description: 'Marker with custom icon and advanced styling options.',
      code: `<Marker
  position={{ lat: 24.7136, lng: 46.6753 }}
  title="Custom Marker"
  icon={{
    url: '/custom-icon.png',
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 40)
  }}
  onClick={handleMarkerClick}
/>`
    },
    {
      title: 'Draggable Marker',
      color: '#ff9800',
      description: 'Interactive marker that can be dragged around the map.',
      code: `<Marker
  position={markerPosition}
  title="Drag me around!"
  draggable={true}
  onDragEnd={(e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarkerPosition(newPosition);
  }}
/>`
    }
  ];

  // Define control sections for each example - compact design
  const controlSections = {
    basic: [
      {
        title: 'Basic Marker',
        content: (
          <div className="control-group compact">
            <div className="compact-info">
              📍 Simple Marker • 🏢 Kingdom Centre • �� Click Events
            </div>
          </div>
        )
      }
    ],
    interactive: [
      {
        title: 'Interactive Markers',
        content: (
          <div className="control-group compact">
            <div className="compact-markers">
              {interactiveMarkers.map(marker => (
                <button
                  key={marker.id}
                  onClick={() => handleMarkerClick(Number(marker.id))}
                  className={`compact-marker-btn ${selectedMarker === Number(marker.id) ? 'selected' : ''}`}
                >
                  📍 {marker.title}
                </button>
              ))}
            </div>
            {selectedMarker && (
              <div className="compact-selected">
                Selected: <strong>{interactiveMarkers.find(m => Number(m.id) === selectedMarker)?.title}</strong>
              </div>
            )}
          </div>
        )
      }
    ],
    draggable: [
      {
        title: 'Draggable Marker',
        content: (
          <div className="control-group compact">
            <div className="compact-position">
              <div className="position-info">
                📍 Position: {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
              </div>
              <button 
                onClick={() => handleMarkerDrag({ ...RIYADH_LANDMARKS.KINGDOM_CENTRE })}
                className="control-button primary compact"
              >
                🔄 Reset Position
              </button>
            </div>
          </div>
        )
      }
    ],
    customStyling: [
      {
        title: 'Custom Styling',
        content: (
          <div className="control-group compact">
            <div className="compact-features">
              <span>🎨 Custom Icons</span>
              <span>📏 Size Control</span>
              <span>⚓ Anchor Points</span>
              <span>🎯 Click Handlers</span>
            </div>
          </div>
        )
      }
    ],
    multiple: [
      {
        title: 'Multiple Markers',
        content: (
          <div className="control-group compact">
            <div className="compact-info">
              🏢 {interactiveMarkers.length} Landmarks • 📍 Riyadh City • 🗺️ Interactive Map
            </div>
          </div>
        )
      }
    ]
  };

  return (
    <GuideLayout
      title={markerGuideData.title}
      subtitle={markerGuideData.subtitle}
      icon={markerGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={markerGuideData.propsData}
      bestPractices={markerGuideData.bestPractices}
      useCases={markerGuideData.useCases}
      tasks={markerGuideData.tasks}
      navigationLinks={markerGuideData.navigationLinks}
      stylingExamples={stylingExamples}
      onMapReset={resetMarkerState}
      controlSections={controlSections}
    />
  );
};

export default MarkerGuide;