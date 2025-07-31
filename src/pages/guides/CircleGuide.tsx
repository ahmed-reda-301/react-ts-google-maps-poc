import React, { useCallback } from 'react';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import CircleControls from '../../components/controls/guide/CircleControls';
import { circleGuideData } from '../../data/guide/circleGuideData';
import { useCircleGuideState } from '../../hooks/useGuideState';
import { 
  GUIDE_CONFIG, 
  GUIDE_POSITIONS, 
  GUIDE_ZOOM_LEVELS, 
  GUIDE_COVERAGE_AREAS,
  GUIDE_STYLING_EXAMPLES,
  GUIDE_STYLES
} from '../../constants/guideConstants';
import { commonCoverageAreas, commonColorSchemes } from '../../data/guide/commonGuideData';
import { createMapClickHandler } from '../../utils/guideHelpers';

const CircleGuide: React.FC = () => {
  const {
    selectedExample,
    basicRadius,
    selectedArea,
    interactiveCircles,
    isCreating,
    selectedRadius,
    selectedColor,
    editableCircle,
    isEditable,
    setSelectedExample,
    setBasicRadius,
    setSelectedRadius,
    setSelectedColor,
    setIsCreating,
    setEditableCircle,
    setIsEditable,
    addCircle,
    clearCircles,
    handleAreaClick,
    resetCircleState,
  } = useCircleGuideState();

  // Use common coverage areas data
  const coverageAreas = commonCoverageAreas;

  // Create map click handler for interactive example
  const onMapClick = createMapClickHandler(
    selectedExample,
    'interactive',
    (position) => {
      if (isCreating) {
        addCircle(position, selectedRadius, selectedColor);
      }
    }
  );

  // Create editable circle load handler
  const onEditableCircleLoad = useCallback((circleInstance: google.maps.Circle) => {
    const centerChangedListener = () => {
      const newCenter = circleInstance.getCenter();
      if (newCenter) {
        setEditableCircle(prev => ({
          ...prev,
          center: {
            lat: newCenter.lat(),
            lng: newCenter.lng()
          }
        }));
      }
    };

    const radiusChangedListener = () => {
      const newRadius = circleInstance.getRadius();
      if (newRadius) {
        setEditableCircle(prev => ({
          ...prev,
          radius: newRadius
        }));
      }
    };

    circleInstance.addListener('center_changed', centerChangedListener);
    circleInstance.addListener('radius_changed', radiusChangedListener);
  }, [setEditableCircle]);

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...circleGuideData.examples,
    basic: {
      ...circleGuideData.examples.basic,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          <Marker
            position={GUIDE_POSITIONS.DEFAULT_CENTER}
            title="Kingdom Centre"
          />
          
          <Circle
            center={GUIDE_POSITIONS.DEFAULT_CENTER}
            radius={basicRadius}
            options={{
              fillColor: GUIDE_STYLES.COLORS.ERROR,
              fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
              strokeColor: GUIDE_STYLES.COLORS.ERROR,
              strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
              strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
              clickable: true
            }}
            onClick={(e) => {
              console.log('Circle clicked at:', e.latLng?.lat(), e.latLng?.lng());
            }}
          />
        </GoogleMap>
      )
    },
    coverage: {
      ...circleGuideData.examples.coverage,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.OVERVIEW}
        >
          {coverageAreas.map(area => (
            <React.Fragment key={area.id}>
              <Marker position={area.center} title={area.name} />
              
              <Circle
                center={area.center}
                radius={area.radius}
                options={{
                  fillColor: area.color,
                  fillOpacity: selectedArea === area.id ? GUIDE_STYLES.OPACITY.HIGH : GUIDE_STYLES.OPACITY.LOW,
                  strokeColor: area.color,
                  strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
                  strokeWeight: selectedArea === area.id ? GUIDE_STYLES.STROKE_WEIGHT.THICK : GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
                  clickable: true
                }}
                onClick={() => handleAreaClick(area.id)}
              />
            </React.Fragment>
          ))}
        </GoogleMap>
      )
    },
    interactive: {
      ...circleGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
          onClick={onMapClick}
        >
          {interactiveCircles.map(circle => (
            <Circle
              key={circle.id}
              center={circle.center}
              radius={circle.radius}
              options={{
                fillColor: circle.color,
                fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
                strokeColor: circle.color,
                strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
                strokeWeight: GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
                clickable: true
              }}
            />
          ))}
        </GoogleMap>
      )
    },
    editable: {
      ...circleGuideData.examples.editable,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={editableCircle.center}
          zoom={GUIDE_ZOOM_LEVELS.DISTRICT}
        >
          <Marker
            position={editableCircle.center}
            title="Circle Center"
          />
          
          <Circle
            center={editableCircle.center}
            radius={editableCircle.radius}
            onLoad={onEditableCircleLoad}
            options={{
              fillColor: isEditable ? '#FFD700' : GUIDE_STYLES.COLORS.INFO,
              fillOpacity: GUIDE_STYLES.OPACITY.MEDIUM,
              strokeColor: isEditable ? '#FFA500' : GUIDE_STYLES.COLORS.PRIMARY,
              strokeOpacity: GUIDE_STYLES.OPACITY.HIGH,
              strokeWeight: isEditable ? GUIDE_STYLES.STROKE_WEIGHT.THICK : GUIDE_STYLES.STROKE_WEIGHT.NORMAL,
              editable: isEditable,
              draggable: isEditable,
              clickable: true
            }}
          />
        </GoogleMap>
      )
    }
  };

  // Create styling examples using common templates
  const stylingExamples = [
    {
      ...GUIDE_STYLING_EXAMPLES.BASIC,
      code: `<Circle
  center={centerCoordinates}
  radius={5000}
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
      title: 'Coverage Area Styling',
      color: GUIDE_STYLES.COLORS.SUCCESS,
      description: 'Different styling for various coverage area types with interactive selection.',
      code: `<Circle
  center={area.center}
  radius={area.radius}
  options={{
    fillColor: area.color,
    fillOpacity: isSelected ? ${GUIDE_STYLES.OPACITY.HIGH} : ${GUIDE_STYLES.OPACITY.LOW},
    strokeColor: area.color,
    strokeOpacity: ${GUIDE_STYLES.OPACITY.HIGH},
    strokeWeight: isSelected ? ${GUIDE_STYLES.STROKE_WEIGHT.THICK} : ${GUIDE_STYLES.STROKE_WEIGHT.NORMAL},
    clickable: true
  }}
  onClick={() => handleAreaSelection(area.id)}
/>`
    },
    {
      title: 'Editable Circle',
      color: GUIDE_STYLES.COLORS.ACCENT,
      description: 'Interactive circle that can be moved and resized by users.',
      code: `// Editable circle with event listeners
const [circle, setCircle] = useState({
  center: { lat: 24.7136, lng: 46.6753 },
  radius: 3000
});

const onLoad = useCallback((circleInstance) => {
  circleInstance.addListener('center_changed', () => {
    const newCenter = circleInstance.getCenter();
    setCircle(prev => ({
      ...prev,
      center: { lat: newCenter.lat(), lng: newCenter.lng() }
    }));
  });
  
  circleInstance.addListener('radius_changed', () => {
    setCircle(prev => ({
      ...prev,
      radius: circleInstance.getRadius()
    }));
  });
}, []);

<Circle
  center={circle.center}
  radius={circle.radius}
  onLoad={onLoad}
  options={{
    fillColor: '#FFD700',
    fillOpacity: ${GUIDE_STYLES.OPACITY.MEDIUM},
    strokeColor: '#FFA500',
    strokeOpacity: ${GUIDE_STYLES.OPACITY.HIGH},
    strokeWeight: ${GUIDE_STYLES.STROKE_WEIGHT.THICK},
    editable: true,
    draggable: true
  }}
/>`
    }
  ];

  return (
    <GuideLayout
      title={circleGuideData.title}
      subtitle={circleGuideData.subtitle}
      icon={circleGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={circleGuideData.propsData}
      bestPractices={circleGuideData.bestPractices}
      useCases={circleGuideData.useCases}
      tasks={circleGuideData.tasks}
      navigationLinks={circleGuideData.navigationLinks}
      stylingExamples={stylingExamples}
      onMapReset={resetCircleState}
    >
      <CircleControls
        selectedExample={selectedExample}
        basicRadius={basicRadius}
        onBasicRadiusChange={setBasicRadius}
        selectedArea={selectedArea}
        coverageAreas={coverageAreas}
        onAreaSelect={handleAreaClick}
        interactiveCircles={interactiveCircles}
        isCreating={isCreating}
        selectedRadius={selectedRadius}
        selectedColor={selectedColor}
        onStartCreating={() => setIsCreating(true)}
        onCancelCreating={() => setIsCreating(false)}
        onRadiusChange={setSelectedRadius}
        onColorChange={setSelectedColor}
        onClearCircles={clearCircles}
        editableCircle={editableCircle}
        isEditable={isEditable}
        onToggleEditable={() => setIsEditable(!isEditable)}
      />
    </GuideLayout>
  );
};

export default CircleGuide;