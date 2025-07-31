import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Polygon, Marker } from '@react-google-maps/api';
import GuideLayout from './components/GuideLayout';
import PolygonControls from './components/controls/PolygonControls';
import { polygonGuideData } from './data/polygonGuideData';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS } from './constants';

const PolygonGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [polygonPath, setPolygonPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  // Zones data for multiple polygons example
  const zones = [
    {
      id: 'business',
      name: 'Business District',
      paths: [
        { lat: 24.7200, lng: 46.6700 },
        { lat: 24.7300, lng: 46.6700 },
        { lat: 24.7300, lng: 46.6900 },
        { lat: 24.7200, lng: 46.6900 }
      ],
      fillColor: '#007bff',
      strokeColor: '#0056b3',
      description: 'Main business area'
    },
    {
      id: 'residential',
      name: 'Residential Area',
      paths: [
        { lat: 24.6800, lng: 46.6500 },
        { lat: 24.7000, lng: 46.6500 },
        { lat: 24.7000, lng: 46.6700 },
        { lat: 24.6800, lng: 46.6700 }
      ],
      fillColor: '#28a745',
      strokeColor: '#1e7e34',
      description: 'Residential neighborhoods'
    },
    {
      id: 'historical',
      name: 'Historical District',
      paths: [
        { lat: 24.6200, lng: 46.7000 },
        { lat: 24.6500, lng: 46.7000 },
        { lat: 24.6500, lng: 46.7300 },
        { lat: 24.6200, lng: 46.7300 }
      ],
      fillColor: '#ffc107',
      strokeColor: '#e0a800',
      description: 'Historic landmarks'
    }
  ];

  // Reset map state when example changes
  useEffect(() => {
    setSelectedZone(null);
    setPolygonPath([]);
    setIsBuilding(false);
  }, [selectedExample]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (isBuilding && e.latLng && selectedExample === 'interactive') {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setPolygonPath(prev => [...prev, newPoint]);
    }
  }, [isBuilding, selectedExample]);

  const startBuilding = () => {
    setPolygonPath([]);
    setIsBuilding(true);
  };

  const finishPolygon = () => {
    if (polygonPath.length >= 3) {
      setIsBuilding(false);
    } else {
      alert('A polygon needs at least 3 points!');
    }
  };

  const clearPolygon = () => {
    setPolygonPath([]);
    setIsBuilding(false);
  };

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  };

  const getPolygonOptions = (zone: any) => ({
    fillColor: zone.fillColor,
    fillOpacity: selectedZone === zone.id ? 0.6 : 0.35,
    strokeColor: zone.strokeColor,
    strokeOpacity: 0.8,
    strokeWeight: selectedZone === zone.id ? 3 : 2,
    clickable: true
  });

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...polygonGuideData.examples,
    multiple: {
      ...polygonGuideData.examples.multiple,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {zones.map(zone => (
            <Polygon
              key={zone.id}
              paths={zone.paths}
              options={getPolygonOptions(zone)}
              onClick={() => handleZoneClick(zone.id)}
            />
          ))}
        </GoogleMap>
      )
    },
    interactive: {
      ...polygonGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
          onClick={onMapClick}
        >
          {polygonPath.length >= 3 && (
            <Polygon
              paths={polygonPath}
              options={{
                fillColor: '#FF6B6B',
                fillOpacity: 0.35,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                clickable: false
              }}
            />
          )}

          {polygonPath.map((point, index) => (
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

  const stylingExamples = [
    {
      title: 'Basic Styling',
      color: '#1976d2',
      description: 'Simple polygon styling with basic fill and stroke properties.',
      code: `<Polygon
  paths={polygonCoordinates}
  options={{
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2
  }}
/>`
    },
    {
      title: 'Advanced Styling',
      color: '#4caf50',
      description: 'Advanced polygon with interactive features and custom styling.',
      code: `<Polygon
  paths={polygonCoordinates}
  options={{
    fillColor: '#4CAF50',
    fillOpacity: 0.6,
    strokeColor: '#2E7D32',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: true,
    zIndex: 1
  }}
  onClick={handlePolygonClick}
/>`
    },
    {
      title: 'Multiple Zones',
      color: '#ff9800',
      description: 'Multiple polygons representing different zones with dynamic styling.',
      code: `// Multiple zone polygons
const zones = [
  { id: 'business', fillColor: '#007bff', paths: [...] },
  { id: 'residential', fillColor: '#28a745', paths: [...] }
];

{zones.map(zone => (
  <Polygon
    key={zone.id}
    paths={zone.paths}
    options={{
      fillColor: zone.fillColor,
      fillOpacity: selectedZone === zone.id ? 0.6 : 0.35,
      strokeWeight: selectedZone === zone.id ? 3 : 2
    }}
    onClick={() => handleZoneClick(zone.id)}
  />
))}`
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
    >
      <PolygonControls
        selectedExample={selectedExample}
        selectedZone={selectedZone}
        zones={zones}
        onZoneClick={handleZoneClick}
        polygonPath={polygonPath}
        isBuilding={isBuilding}
        onStartBuilding={startBuilding}
        onFinishPolygon={finishPolygon}
        onClearPolygon={clearPolygon}
      />
    </GuideLayout>
  );
};

export default PolygonGuide;