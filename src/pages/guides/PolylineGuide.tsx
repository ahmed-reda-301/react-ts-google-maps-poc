import React, { useEffect, useMemo } from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import PolylineControls from '../../components/controls/guide/PolylineControls';
import { polylineGuideData } from '../../data/guide/polylineGuideData';
import { usePolylineGuideState } from '../../hooks/useGuideState';
import { 
  GUIDE_CONFIG, 
  RIYADH_LANDMARKS, 
  GUIDE_ZOOM_LEVELS, 
  GUIDE_ANIMATION_PATHS,
  GUIDE_STYLING_EXAMPLES,
  APP_STYLES
} from '../../constants';
import { createMapClickHandler, createAnimationSequence } from '../../utils/guideHelpers';

const PolylineGuide: React.FC = () => {
  const {
    selectedExample,
    interactivePath,
    animatedPath,
    isAnimating,
    animationIndex,
    setSelectedExample,
    setAnimatedPath,
    setIsAnimating,
    setAnimationIndex,
    addPathPoint,
    clearPath,
    startAnimation,
    resetAnimation,
    resetPolylineState,
  } = usePolylineGuideState();

  // Use common animation path - memoize to prevent re-creation
  const fullAnimationPath = useMemo(() => [...GUIDE_ANIMATION_PATHS.RIYADH_TOUR], []);

  // Create map click handler
  const onMapClick = createMapClickHandler(selectedExample, 'interactive', addPathPoint);

  // Animation effect for the animated polyline example
  useEffect(() => {
    if (!isAnimating || animationIndex >= fullAnimationPath.length) {
      if (animationIndex >= fullAnimationPath.length) {
        setIsAnimating(false);
      }
      return;
    }

    const cleanup = createAnimationSequence(
      fullAnimationPath.slice(animationIndex - 1),
      (currentPath, index) => {
        setAnimatedPath(fullAnimationPath.slice(0, animationIndex + index));
        setAnimationIndex(animationIndex + index);
      },
      () => setIsAnimating(false),
      GUIDE_CONFIG.ANIMATION_DURATION
    );

    return cleanup;
  }, [isAnimating, animationIndex, fullAnimationPath, setAnimatedPath, setIsAnimating, setAnimationIndex]);

  const handleStartAnimation = () => {
    startAnimation(fullAnimationPath);
  };

  const handleResetAnimation = () => {
    resetAnimation();
  };

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...polylineGuideData.examples,
    interactive: {
      ...polylineGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={RIYADH_LANDMARKS.KINGDOM_CENTRE}
          zoom={GUIDE_ZOOM_LEVELS.DISTRICT}
          onClick={onMapClick}
        >
          {interactivePath.length >= 2 && (
            <Polyline
              path={interactivePath}
              options={{
                strokeColor: APP_STYLES.COLORS.ACCENT,
                strokeOpacity: APP_STYLES.OPACITY.HIGH,
                strokeWeight: APP_STYLES.STROKE_WEIGHT.THICK,
                clickable: true
              }}
              onClick={(e) => {
                console.log('Polyline clicked at:', e.latLng?.lat(), e.latLng?.lng());
              }}
            />
          )}

          {interactivePath.map((point, index) => (
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
    },
    animated: {
      ...polylineGuideData.examples.animated,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={RIYADH_LANDMARKS.KINGDOM_CENTRE}
          zoom={GUIDE_ZOOM_LEVELS.STREET}
        >
          {animatedPath.length >= 2 && (
            <Polyline
              path={animatedPath}
              options={{
                strokeColor: APP_STYLES.COLORS.ACCENT,
                strokeOpacity: APP_STYLES.OPACITY.HIGH,
                strokeWeight: APP_STYLES.STROKE_WEIGHT.VERY_THICK,
                geodesic: true
              }}
            />
          )}

          {/* Start marker */}
          <Marker
            position={fullAnimationPath[0]}
            title="Start"
          />

          {/* End marker */}
          <Marker
            position={fullAnimationPath[fullAnimationPath.length - 1]}
            title="End"
          />

          {/* Current position marker */}
          {isAnimating && animatedPath.length > 0 && (
            <Marker
              position={animatedPath[animatedPath.length - 1]}
              title="Current Position"
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
      code: `<Polyline
  path={pathCoordinates}
  options={{
    strokeColor: '${APP_STYLES.COLORS.ERROR}',
    strokeOpacity: ${APP_STYLES.OPACITY.HIGH},
    strokeWeight: ${APP_STYLES.STROKE_WEIGHT.THICK},
    geodesic: true
  }}
/>`
    },
    {
      ...GUIDE_STYLING_EXAMPLES.ADVANCED,
      code: `<Polyline
  path={pathCoordinates}
  options={{
    strokeColor: '${APP_STYLES.COLORS.SUCCESS}',
    strokeOpacity: ${APP_STYLES.OPACITY.VERY_HIGH},
    strokeWeight: ${APP_STYLES.STROKE_WEIGHT.VERY_THICK},
    geodesic: true,
    clickable: true,
    draggable: false,
    editable: false,
    zIndex: 1
  }}
  onClick={handlePolylineClick}
/>`
    },
    {
      title: 'Animated Path',
      color: APP_STYLES.COLORS.ACCENT,
      description: 'Polyline with animated drawing effect and custom markers.',
      code: `// Animated polyline drawing
const [animatedPath, setAnimatedPath] = useState([]);

useEffect(() => {
  const interval = setInterval(() => {
    setAnimatedPath(prev => [...prev, fullPath[index]]);
    setIndex(prev => prev + 1);
  }, ${GUIDE_CONFIG.ANIMATION_DURATION});
  return () => clearInterval(interval);
}, []);

<Polyline
  path={animatedPath}
  options={{
    strokeColor: '${APP_STYLES.COLORS.ACCENT}',
    strokeOpacity: ${APP_STYLES.OPACITY.HIGH},
    strokeWeight: ${APP_STYLES.STROKE_WEIGHT.VERY_THICK},
    geodesic: true
  }}
/>`
    }
  ];

  return (
    <GuideLayout
      title={polylineGuideData.title}
      subtitle={polylineGuideData.subtitle}
      icon={polylineGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={polylineGuideData.propsData}
      bestPractices={polylineGuideData.bestPractices}
      useCases={polylineGuideData.useCases}
      tasks={polylineGuideData.tasks}
      navigationLinks={polylineGuideData.navigationLinks}
      stylingExamples={stylingExamples}
      onMapReset={resetPolylineState}
    >
      <PolylineControls
        selectedExample={selectedExample}
        interactivePath={interactivePath}
        onClearPath={clearPath}
        animatedPath={animatedPath}
        fullAnimationPath={fullAnimationPath}
        isAnimating={isAnimating}
        onStartAnimation={handleStartAnimation}
        onResetAnimation={handleResetAnimation}
      />
    </GuideLayout>
  );
};

export default PolylineGuide;