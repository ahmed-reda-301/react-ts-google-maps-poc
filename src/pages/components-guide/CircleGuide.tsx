import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import GuideLayout from './components/GuideLayout';
import CircleControls from './components/controls/CircleControls';
import InteractiveFormControls from '../../components/controls/InteractiveFormControls';
import { circleGuideData } from './data/circleGuideData';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS, COMPONENT_COLORS, RIYADH_LOCATIONS } from './constants';

const CircleGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [basicRadius, setBasicRadius] = useState(5000);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [circles, setCircles] = useState<Array<{
    id: string;
    center: google.maps.LatLngLiteral;
    radius: number;
    color: string;
  }>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(2000);
  const [selectedColor, setSelectedColor] = useState('#007bff');
  const [editableCircle, setEditableCircle] = useState({
    center: DEFAULT_CENTER,
    radius: 3000
  });
  const [isEditable, setIsEditable] = useState(false);

  // Reset map state when example changes
  useEffect(() => {
    setBasicRadius(5000);
    setSelectedArea(null);
    setCircles([]);
    setIsCreating(false);
    setSelectedRadius(2000);
    setSelectedColor('#007bff');
    setEditableCircle({
      center: DEFAULT_CENTER,
      radius: 3000
    });
    setIsEditable(false);
  }, [selectedExample]);

  // Coverage areas data
  const coverageAreas = [
    {
      id: 'wifi-1',
      name: 'WiFi Hotspot',
      center: RIYADH_LOCATIONS.KINGDOM_CENTRE,
      radius: 500,
      color: '#007bff',
      description: 'High-speed internet access point',
      type: 'wifi',
      icon: '📶'
    },
    {
      id: 'delivery-1',
      name: 'Delivery Zone',
      center: RIYADH_LOCATIONS.AL_FAISALIAH_TOWER,
      radius: 3000,
      color: '#28a745',
      description: 'Fast delivery service coverage area',
      type: 'delivery',
      icon: '🚚'
    },
    {
      id: 'service-1',
      name: 'Service Area',
      center: RIYADH_LOCATIONS.MASMAK_FORTRESS,
      radius: 2000,
      color: '#ffc107',
      description: 'Technical support and maintenance zone',
      type: 'service',
      icon: '🔧'
    },
    {
      id: 'emergency-1',
      name: 'Emergency Zone',
      center: RIYADH_LOCATIONS.NATIONAL_MUSEUM,
      radius: 4000,
      color: '#dc3545',
      description: 'Emergency response coverage area',
      type: 'emergency',
      icon: '🚨'
    }
  ];

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (isCreating && e.latLng && selectedExample === 'interactive') {
      const newCircle = {
        id: Date.now().toString(),
        center: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        },
        radius: selectedRadius,
        color: selectedColor
      };
      
      setCircles(prev => [...prev, newCircle]);
      setIsCreating(false);
    }
  }, [isCreating, selectedRadius, selectedColor, selectedExample]);

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  };

  const getCircleOptions = (area: any) => ({
    fillColor: area.color,
    fillOpacity: selectedArea === area.id ? 0.5 : 0.25,
    strokeColor: area.color,
    strokeOpacity: 0.8,
    strokeWeight: selectedArea === area.id ? 3 : 2,
    clickable: true
  });

  const clearAllCircles = () => {
    setCircles([]);
  };

  const calculateTotalArea = () => {
    const totalArea = circles.reduce((sum, circle) => {
      return sum + (Math.PI * Math.pow(circle.radius, 2));
    }, 0);
    
    return (totalArea / 1000000).toFixed(2);
  };

  const calculateArea = (radius: number) => {
    const area = Math.PI * Math.pow(radius, 2);
    return (area / 1000000).toFixed(2);
  };

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
      setEditableCircle(prev => ({
        ...prev,
        radius: newRadius
      }));
    };

    circleInstance.addListener('center_changed', centerChangedListener);
    circleInstance.addListener('radius_changed', radiusChangedListener);
  }, []);

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...circleGuideData.examples,
    basic: {
      ...circleGuideData.examples.basic,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker
            position={DEFAULT_CENTER}
            title="Kingdom Centre"
          />
          
          <Circle
            center={DEFAULT_CENTER}
            radius={basicRadius}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      )
    },
    coverage: {
      ...circleGuideData.examples.coverage,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={10}
        >
          {coverageAreas.map(area => (
            <React.Fragment key={area.id}>
              <Marker
                position={area.center}
                title={area.name}
              />
              
              <Circle
                center={area.center}
                radius={area.radius}
                options={getCircleOptions(area)}
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
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          onClick={onMapClick}
        >
          {circles.map(circle => (
            <React.Fragment key={circle.id}>
              <Marker
                position={circle.center}
                title={`Circle - ${circle.radius >= 1000 ? `${circle.radius/1000}km` : `${circle.radius}m`}`}
              />
              
              <Circle
                center={circle.center}
                radius={circle.radius}
                options={{
                  fillColor: circle.color,
                  fillOpacity: 0.35,
                  strokeColor: circle.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2
                }}
              />
            </React.Fragment>
          ))}
        </GoogleMap>
      )
    },
    editable: {
      ...circleGuideData.examples.editable,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={editableCircle.center}
          zoom={ZOOM_LEVELS.STREET}
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
              fillColor: isEditable ? '#FFD700' : '#007bff',
              fillOpacity: 0.35,
              strokeColor: isEditable ? '#FFA500' : '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: isEditable ? 3 : 2,
              editable: isEditable,
              draggable: isEditable
            }}
          />
        </GoogleMap>
      )
    }
  };

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
      onMapReset={() => {
        setBasicRadius(5000);
        setSelectedArea(null);
        setCircles([]);
        setIsCreating(false);
        setSelectedRadius(2000);
        setSelectedColor("#007bff");
        setEditableCircle({
          center: DEFAULT_CENTER,
          radius: 3000
        });
        setIsEditable(false);
      }}
    >
      <CircleControls
        selectedExample={selectedExample}
        basicRadius={basicRadius}
        onBasicRadiusChange={setBasicRadius}
        selectedArea={selectedArea}
        coverageAreas={coverageAreas}
        onAreaClick={handleAreaClick}
        circles={circles}
        isCreating={isCreating}
        selectedRadius={selectedRadius}
        selectedColor={selectedColor}
        onStartCreating={() => setIsCreating(!isCreating)}
        onClearCircles={clearAllCircles}
        onRadiusChange={setSelectedRadius}
        onColorChange={setSelectedColor}
        editableCircle={editableCircle}
        isEditable={isEditable}
        onToggleEditable={() => setIsEditable(!isEditable)}
        calculateArea={calculateArea}
        calculateTotalArea={calculateTotalArea}
        componentColors={COMPONENT_COLORS}
      />
    </GuideLayout>
  );
};

export default CircleGuide;