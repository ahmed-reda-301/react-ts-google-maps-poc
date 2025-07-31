import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import GuideLayout from './components/GuideLayout';
import PolylineControls from './components/controls/PolylineControls';
import { polylineGuideData } from './data/polylineGuideData';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS } from './constants';

const PolylineGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [interactivePath, setInteractivePath] = useState<google.maps.LatLngLiteral[]>([
    DEFAULT_CENTER,
    { lat: 24.6877, lng: 46.6857 }
  ]);
  const [animatedPath, setAnimatedPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);

  // Animation path data
  const fullAnimationPath = [
    DEFAULT_CENTER,
    { lat: 24.7100, lng: 46.6800 },
    { lat: 24.7050, lng: 46.6850 },
    { lat: 24.7000, lng: 46.6900 },
    { lat: 24.6950, lng: 46.6920 },
    { lat: 24.6900, lng: 46.6940 },
    { lat: 24.6877, lng: 46.6857 }
  ];

  // Reset map state when example changes
  useEffect(() => {
    setInteractivePath([DEFAULT_CENTER, { lat: 24.6877, lng: 46.6857 }]);
    setAnimatedPath([]);
    setIsAnimating(false);
    setAnimationIndex(0);
  }, [selectedExample]);

  // Animation effect for the animated polyline example
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating && animationIndex < fullAnimationPath.length) {
      interval = setInterval(() => {
        setAnimatedPath(prev => [...prev, fullAnimationPath[animationIndex]]);
        setAnimationIndex(prev => prev + 1);
      }, 800);
    } else if (animationIndex >= fullAnimationPath.length) {
      setIsAnimating(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, animationIndex, fullAnimationPath]);

  const startAnimation = () => {
    setAnimatedPath([fullAnimationPath[0]]);
    setAnimationIndex(1);
    setIsAnimating(true);
  };

  const resetAnimation = () => {
    setAnimatedPath([]);
    setAnimationIndex(0);
    setIsAnimating(false);
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng && selectedExample === 'interactive') {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setInteractivePath(prev => [...prev, newPoint]);
    }
  }, [selectedExample]);

  const clearInteractivePath = () => {
    setInteractivePath([]);
  };

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...polylineGuideData.examples,
    interactive: {
      ...polylineGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
          onClick={onMapClick}
        >
          {interactivePath.length >= 2 && (
            <Polyline
              path={interactivePath}
              options={{
                strokeColor: '#FF6B6B',
                strokeOpacity: 0.8,
                strokeWeight: 3,
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
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.BUILDING}
        >
          {animatedPath.length >= 2 && (
            <Polyline
              path={animatedPath}
              options={{
                strokeColor: '#FF6B6B',
                strokeOpacity: 0.8,
                strokeWeight: 4,
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

  const stylingExamples = [
    {
      title: 'Basic Styling',
      color: '#1976d2',
      description: 'Simple polyline styling with basic stroke properties.',
      code: `<Polyline
  path={pathCoordinates}
  options={{
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    geodesic: true
  }}
/>`
    },
    {
      title: 'Advanced Styling',
      color: '#4caf50',
      description: 'Advanced polyline with interactive features and custom styling.',
      code: `<Polyline
  path={pathCoordinates}
  options={{
    strokeColor: '#4CAF50',
    strokeOpacity: 0.9,
    strokeWeight: 5,
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
      color: '#ff9800',
      description: 'Polyline with animated drawing effect and custom markers.',
      code: `// Animated polyline drawing
const [animatedPath, setAnimatedPath] = useState([]);

useEffect(() => {
  const interval = setInterval(() => {
    setAnimatedPath(prev => [...prev, fullPath[index]]);
    setIndex(prev => prev + 1);
  }, 800);
  return () => clearInterval(interval);
}, []);

<Polyline
  path={animatedPath}
  options={{
    strokeColor: '#FF6B6B',
    strokeOpacity: 0.8,
    strokeWeight: 4,
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
      onMapReset={() => {
        setInteractivePath([DEFAULT_CENTER, { lat: 24.6877, lng: 46.6857 }]);
        setAnimatedPath([]);
        setIsAnimating(false);
        setAnimationIndex(0);
      }}
    >
      <PolylineControls
        selectedExample={selectedExample}
        interactivePath={interactivePath}
        onClearPath={clearInteractivePath}
        animatedPath={animatedPath}
        fullAnimationPath={fullAnimationPath}
        isAnimating={isAnimating}
        onStartAnimation={startAnimation}
        onResetAnimation={resetAnimation}
      />
    </GuideLayout>
  );
};

export default PolylineGuide;