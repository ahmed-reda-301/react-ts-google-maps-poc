import React from 'react';
import { GoogleMap, Polygon, Marker } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import PolygonControls from '../../components/controls/guide/PolygonControls';
import { polygonGuideData } from '../../data/guide/polygonGuideData';
import { usePolygonGuideState } from '../../hooks/useGuideState';
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

const PolygonGuide: React.FC = () => {
  const {
    selectedExample,
    interactivePolygon,
    isBuilding,
    selectedZone,
    setSelectedExample,
    addPolygonPoint,
    startBuilding,
    finishPolygon,
    clearPolygon,
    handleZoneClick,
    resetPolygonState,
  } = usePolygonGuideState();

  // Use common zones data
  const zones = commonZones;

  // Create event handlers
  const onMapClick = createMapClickHandler(
    selectedExample, 
    'interactive', 
    (point) => {
      if (isBuilding) {
        addPolygonPoint(point);
      }
    }
  );

  const onZoneClick = createZoneClickHandler(selectedZone, handleZoneClick);

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...polygonGuideData.examples,
    multiple: {
      ...polygonGuideData.examples.multiple,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          {zones.map(zone => (
            <Polygon
              key={zone.id}
              paths={zone.paths}
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
      ...polygonGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.DISTRICT}
          onClick={onMapClick}
        >
          {interactivePolygon.length >= 3 && (
            <Polygon
              paths={interactivePolygon}
              options={{
                fillColor: GUIDE_STYLES.COLORS.ACCENT,
                fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
                strokeColor: GUIDE_STYLES.COLORS.ERROR,
                strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
                strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
                clickable: true
              }}
              onClick={(e) => {
                console.log('Polygon clicked at:', e.latLng?.lat(), e.latLng?.lng());
              }}
            />
          )}

          {interactivePolygon.map((point, index) => (
            <Marker
              key={index}
              position={point}
              title={`Point ${index + 1}`}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          ))}
        </GoogleMap>
      )
    }
  };

  // Create styling examples using common templates
  const stylingExamples = [
    {
      ...GUIDE_STYLING_EXAMPLES.BASIC,
      code: `<Polygon
  paths={polygonCoordinates}
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
      code: `<Polygon
  paths={zoneCoordinates}
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
      title: 'Polygon with Holes',
      color: GUIDE_STYLES.COLORS.ACCENT,
      description: 'Complex polygon with exclusion areas (holes) inside.',
      code: `// Polygon with holes
const polygonPaths = [
  // Outer boundary
  [
    { lat: 24.7000, lng: 46.6500 },
    { lat: 24.7400, lng: 46.6500 },
    { lat: 24.7400, lng: 46.7000 },
    { lat: 24.7000, lng: 46.7000 }
  ],
  // Hole (exclusion area)
  [
    { lat: 24.7100, lng: 46.6600 },
    { lat: 24.7200, lng: 46.6600 },
    { lat: 24.7200, lng: 46.6700 },
    { lat: 24.7100, lng: 46.6700 }
  ]
];

<Polygon
  paths={polygonPaths}
  options={{
    fillColor: '${GUIDE_STYLES.COLORS.INFO}',
    fillOpacity: ${GUIDE_STYLES.OPACITY.MEDIUM},
    strokeColor: '${GUIDE_STYLES.COLORS.PRIMARY}',
    strokeOpacity: ${GUIDE_STYLES.OPACITY.HIGH},
    strokeWeight: ${GUIDE_STYLES.STROKE_WEIGHT.NORMAL}
  }}
/>`
    }
  ];

  return (
    <GuideLayout
      title={polygonGuideData.title}
      subtitle={polygonGuideData.subtitle}
      icon={polygonGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={polygonGuideData.propsData}
      bestPractices={polygonGuideData.bestPractices}
      useCases={polygonGuideData.useCases}
      tasks={polygonGuideData.tasks}
      navigationLinks={polygonGuideData.navigationLinks}
      stylingExamples={stylingExamples}
      onMapReset={resetPolygonState}
    >
      <PolygonControls
        selectedExample={selectedExample}
        interactivePolygon={interactivePolygon}
        isBuilding={isBuilding}
        selectedZone={selectedZone}
        zones={zones}
        onStartBuilding={startBuilding}
        onFinishPolygon={finishPolygon}
        onClearPolygon={clearPolygon}
        onZoneSelect={handleZoneClick}
      />
    </GuideLayout>
  );
};

export default PolygonGuide;