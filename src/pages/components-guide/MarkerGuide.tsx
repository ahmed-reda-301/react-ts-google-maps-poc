import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GuideLayout from './components/GuideLayout';
import MarkerControls from './components/controls/MarkerControls';
import { markerGuideData } from './data/markerGuideData';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from './constants';

const MarkerGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);

  // Reset map state when example changes
  useEffect(() => {
    setSelectedMarker(null);
    setMarkerPosition(DEFAULT_CENTER);
  }, [selectedExample]);

  const handleMapReset = () => {
    setSelectedMarker(null);
    setMarkerPosition(DEFAULT_CENTER);
  };

  const handleMarkerClick = (markerId: number) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  };

  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setMarkerPosition(newPosition);
    }
  };

  const interactiveMarkers = [
    { id: 1, position: RIYADH_LOCATIONS.KINGDOM_CENTRE, title: "Kingdom Centre" },
    { id: 2, position: RIYADH_LOCATIONS.AL_FAISALIAH_TOWER, title: "Al Faisaliah Tower" },
    { id: 3, position: RIYADH_LOCATIONS.MASMAK_FORTRESS, title: "Masmak Fortress" }
  ];

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...markerGuideData.examples,
    interactive: {
      ...markerGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          {interactiveMarkers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              onClick={() => handleMarkerClick(marker.id)}
            />
          ))}
        </GoogleMap>
      )
    },
    draggable: {
      ...markerGuideData.examples.draggable,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={markerPosition}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={markerPosition}
            title="Drag me around!"
            draggable={true}
            onDragEnd={handleDragEnd}
          />
        </GoogleMap>
      )
    }
  };

  const stylingExamples = [
    {
      title: 'Basic Marker',
      color: '#1976d2',
      description: 'Simple marker with default styling and basic properties.',
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
      onMapReset={handleMapReset}
    >
      <MarkerControls
        selectedExample={selectedExample}
        selectedMarker={selectedMarker}
        markerPosition={markerPosition}
        interactiveMarkers={interactiveMarkers}
        onMarkerClick={handleMarkerClick}
        onResetPosition={() => setMarkerPosition(DEFAULT_CENTER)}
      />
    </GuideLayout>
  );
};

export default MarkerGuide;