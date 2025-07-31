import React from 'react';
import { GoogleMap, Polygon, Marker } from '@react-google-maps/api';
import { GuidePageData } from '../types';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from '../constants';

export const polygonGuideData: GuidePageData = {
  title: 'Polygon Component Guide',
  subtitle: 'Complete guide to using Polygon components for drawing areas, zones, and boundaries on maps',
  icon: '🔷',
  examples: {
    basic: {
      title: 'Basic Polygon',
      description: 'Simple polygon with fill and stroke styling',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          <Polygon
            paths={[
              RIYADH_LOCATIONS.KINGDOM_CENTRE,
              RIYADH_LOCATIONS.AL_FAISALIAH_TOWER,
              RIYADH_LOCATIONS.MASMAK_FORTRESS,
              RIYADH_LOCATIONS.NATIONAL_MUSEUM
            ]}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polygon } from '@react-google-maps/api';

const BasicPolygon = () => {
  const trianglePath = [
    { lat: 24.7136, lng: 46.6753 }, // Kingdom Centre
    { lat: 24.6877, lng: 46.6857 }, // Al Faisaliah Tower
    { lat: 24.6308, lng: 46.7073 }, // Masmak Fortress
    { lat: 24.6465, lng: 46.7169 }  // National Museum
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={12}
    >
      <Polygon
        paths={trianglePath}
        options={{
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2
        }}
      />
    </GoogleMap>
  );
};`
    },

    multiple: {
      title: 'Multiple Zones',
      description: 'Multiple polygons representing different city zones',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* Business District */}
          <Polygon
            paths={[
              { lat: 24.7200, lng: 46.6700 },
              { lat: 24.7300, lng: 46.6700 },
              { lat: 24.7300, lng: 46.6900 },
              { lat: 24.7200, lng: 46.6900 }
            ]}
            options={{
              fillColor: '#007bff',
              fillOpacity: 0.35,
              strokeColor: '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          
          {/* Residential Area */}
          <Polygon
            paths={[
              { lat: 24.6800, lng: 46.6500 },
              { lat: 24.7000, lng: 46.6500 },
              { lat: 24.7000, lng: 46.6700 },
              { lat: 24.6800, lng: 46.6700 }
            ]}
            options={{
              fillColor: '#28a745',
              fillOpacity: 0.35,
              strokeColor: '#1e7e34',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          
          {/* Historical District */}
          <Polygon
            paths={[
              { lat: 24.6200, lng: 46.7000 },
              { lat: 24.6500, lng: 46.7000 },
              { lat: 24.6500, lng: 46.7300 },
              { lat: 24.6200, lng: 46.7300 }
            ]}
            options={{
              fillColor: '#ffc107',
              fillOpacity: 0.35,
              strokeColor: '#e0a800',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polygon } from '@react-google-maps/api';
import { useState } from 'react';

const MultipleZones = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  
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
      strokeColor: '#0056b3'
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
      strokeColor: '#1e7e34'
    }
  ];

  const handleZoneClick = (zoneId) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      {zones.map(zone => (
        <Polygon
          key={zone.id}
          paths={zone.paths}
          options={{
            fillColor: zone.fillColor,
            fillOpacity: selectedZone === zone.id ? 0.6 : 0.35,
            strokeColor: zone.strokeColor,
            strokeOpacity: 0.8,
            strokeWeight: selectedZone === zone.id ? 3 : 2
          }}
          onClick={() => handleZoneClick(zone.id)}
        />
      ))}
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Builder',
      description: 'Click on the map to build a custom polygon',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polygon, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const InteractivePolygonBuilder = () => {
  const [polygonPath, setPolygonPath] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const onMapClick = useCallback((e) => {
    if (isBuilding && e.latLng) {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setPolygonPath(prevPath => [...prevPath, newPoint]);
    }
  }, [isBuilding]);

  const startBuilding = () => {
    setPolygonPath([]);
    setIsBuilding(true);
  };

  const finishPolygon = () => {
    if (polygonPath.length >= 3) {
      setIsBuilding(false);
    }
  };

  return (
    <div>
      <button onClick={startBuilding}>Start Building</button>
      <button onClick={finishPolygon}>Finish Polygon</button>
      
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.7136, lng: 46.6753 }}
        zoom={12}
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
              strokeWeight: 2
            }}
          />
        )}

        {polygonPath.map((point, index) => (
          <Marker
            key={index}
            position={point}
            label={(index + 1).toString()}
          />
        ))}
      </GoogleMap>
    </div>
  );
};`
    },

    holes: {
      title: 'Polygon with Holes',
      description: 'Polygon with exclusion areas (holes) inside',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.BUILDING}
        >
          <Polygon
            paths={[
              // Outer boundary
              [
                { lat: 24.7000, lng: 46.6500 },
                { lat: 24.7400, lng: 46.6500 },
                { lat: 24.7400, lng: 46.7000 },
                { lat: 24.7000, lng: 46.7000 }
              ],
              // Hole 1
              [
                { lat: 24.7100, lng: 46.6600 },
                { lat: 24.7200, lng: 46.6600 },
                { lat: 24.7200, lng: 46.6700 },
                { lat: 24.7100, lng: 46.6700 }
              ],
              // Hole 2
              [
                { lat: 24.7250, lng: 46.6750 },
                { lat: 24.7350, lng: 46.6750 },
                { lat: 24.7350, lng: 46.6850 },
                { lat: 24.7250, lng: 46.6850 }
              ]
            ]}
            options={{
              fillColor: '#007bff',
              fillOpacity: 0.35,
              strokeColor: '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polygon } from '@react-google-maps/api';

const PolygonWithHoles = () => {
  // Outer boundary (main polygon)
  const outerPath = [
    { lat: 24.7000, lng: 46.6500 },
    { lat: 24.7400, lng: 46.6500 },
    { lat: 24.7400, lng: 46.7000 },
    { lat: 24.7000, lng: 46.7000 }
  ];

  // Inner holes (exclusion areas)
  const hole1 = [
    { lat: 24.7100, lng: 46.6600 },
    { lat: 24.7200, lng: 46.6600 },
    { lat: 24.7200, lng: 46.6700 },
    { lat: 24.7100, lng: 46.6700 }
  ];

  const hole2 = [
    { lat: 24.7250, lng: 46.6750 },
    { lat: 24.7350, lng: 46.6750 },
    { lat: 24.7350, lng: 46.6850 },
    { lat: 24.7250, lng: 46.6850 }
  ];

  // Combine outer path with holes
  const polygonPaths = [outerPath, hole1, hole2];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={13}
    >
      <Polygon
        paths={polygonPaths}
        options={{
          fillColor: '#007bff',
          fillOpacity: 0.35,
          strokeColor: '#0056b3',
          strokeOpacity: 0.8,
          strokeWeight: 2
        }}
      />
    </GoogleMap>
  );
};`
    },

    styled: {
      title: 'Styled Polygons',
      description: 'Polygons with different styling options',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* Solid fill polygon */}
          <Polygon
            paths={[
              { lat: 24.7200, lng: 46.6400 },
              { lat: 24.7400, lng: 46.6400 },
              { lat: 24.7400, lng: 46.6600 },
              { lat: 24.7200, lng: 46.6600 }
            ]}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.8,
              strokeColor: '#8B0000',
              strokeOpacity: 1.0,
              strokeWeight: 3
            }}
          />

          {/* Transparent polygon */}
          <Polygon
            paths={[
              { lat: 24.6800, lng: 46.6400 },
              { lat: 24.7000, lng: 46.6400 },
              { lat: 24.7000, lng: 46.6600 },
              { lat: 24.6800, lng: 46.6600 }
            ]}
            options={{
              fillColor: '#00FF00',
              fillOpacity: 0.2,
              strokeColor: '#006400',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />

          {/* Dashed stroke polygon */}
          <Polygon
            paths={[
              { lat: 24.6400, lng: 46.6800 },
              { lat: 24.6600, lng: 46.6800 },
              { lat: 24.6600, lng: 46.7000 },
              { lat: 24.6400, lng: 46.7000 }
            ]}
            options={{
              fillColor: '#0000FF',
              fillOpacity: 0.3,
              strokeColor: '#000080',
              strokeOpacity: 0.9,
              strokeWeight: 4
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polygon } from '@react-google-maps/api';

const StyledPolygons = () => {
  const polygons = [
    {
      paths: [
        { lat: 24.7200, lng: 46.6400 },
        { lat: 24.7400, lng: 46.6400 },
        { lat: 24.7400, lng: 46.6600 },
        { lat: 24.7200, lng: 46.6600 }
      ],
      options: {
        fillColor: '#FF0000',
        fillOpacity: 0.8,
        strokeColor: '#8B0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      }
    },
    {
      paths: [
        { lat: 24.6800, lng: 46.6400 },
        { lat: 24.7000, lng: 46.6400 },
        { lat: 24.7000, lng: 46.6600 },
        { lat: 24.6800, lng: 46.6600 }
      ],
      options: {
        fillColor: '#00FF00',
        fillOpacity: 0.2,
        strokeColor: '#006400',
        strokeOpacity: 0.8,
        strokeWeight: 2
      }
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      {polygons.map((polygon, index) => (
        <Polygon
          key={index}
          paths={polygon.paths}
          options={polygon.options}
        />
      ))}
    </GoogleMap>
  );
};`
    }
  },
  propsData: {
    title: 'Polygon Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'paths',
            type: 'LatLngLiteral[] | LatLngLiteral[][]',
            description: 'Array of coordinates defining the polygon. Use nested arrays for polygons with holes',
            required: true
          },
          {
            name: 'options',
            type: 'PolygonOptions',
            description: 'Additional polygon configuration options',
            required: false
          }
        ],
        color: '#1976d2'
      },
      {
        title: 'Fill Options',
        props: [
          {
            name: 'fillColor',
            type: 'string',
            description: 'The fill color of the polygon',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'fillOpacity',
            type: 'number',
            description: 'The fill opacity of the polygon (0.0 to 1.0)',
            required: false,
            defaultValue: '0.35'
          }
        ],
        color: '#4caf50'
      },
      {
        title: 'Stroke Options',
        props: [
          {
            name: 'strokeColor',
            type: 'string',
            description: 'The stroke color of the polygon border',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'strokeOpacity',
            type: 'number',
            description: 'The stroke opacity of the polygon border (0.0 to 1.0)',
            required: false,
            defaultValue: '1.0'
          },
          {
            name: 'strokeWeight',
            type: 'number',
            description: 'The stroke width of the polygon border in pixels',
            required: false,
            defaultValue: '2'
          },
          {
            name: 'strokePosition',
            type: 'StrokePosition',
            description: 'The stroke position relative to the polygon edge',
            required: false,
            defaultValue: 'CENTER'
          }
        ],
        color: '#ff9800'
      },
      {
        title: 'Behavior Options',
        props: [
          {
            name: 'clickable',
            type: 'boolean',
            description: 'Whether the polygon can receive click events',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Whether the polygon can be dragged',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'editable',
            type: 'boolean',
            description: 'Whether the polygon can be edited by users',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'geodesic',
            type: 'boolean',
            description: 'Whether the polygon edges should follow the Earth\'s curvature',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'visible',
            type: 'boolean',
            description: 'Whether the polygon is visible on the map',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'zIndex',
            type: 'number',
            description: 'The z-index of the polygon (display order)',
            required: false
          }
        ],
        color: '#9c27b0'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onLoad',
            type: '(polygon: google.maps.Polygon) => void',
            description: 'Callback fired when polygon loads',
            required: false
          },
          {
            name: 'onUnmount',
            type: '(polygon: google.maps.Polygon) => void',
            description: 'Callback fired when polygon unmounts',
            required: false
          },
          {
            name: 'onClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polygon is clicked',
            required: false
          },
          {
            name: 'onDblClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polygon is double-clicked',
            required: false
          },
          {
            name: 'onRightClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polygon is right-clicked',
            required: false
          },
          {
            name: 'onMouseOver',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when mouse enters polygon',
            required: false
          },
          {
            name: 'onMouseOut',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when mouse leaves polygon',
            required: false
          },
          {
            name: 'onDrag',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired repeatedly while dragging',
            required: false
          },
          {
            name: 'onDragStart',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when dragging starts',
            required: false
          },
          {
            name: 'onDragEnd',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when dragging ends',
            required: false
          }
        ],
        color: '#795548'
      }
    ]
  },
  bestPractices: {
    dos: [
      {
        text: "Use appropriate fill opacity",
        description: "Keep fill opacity between 0.2-0.5 to maintain map readability underneath"
      },
      {
        text: "Limit polygon complexity",
        description: "Avoid polygons with too many vertices for better performance"
      },
      {
        text: "Use consistent color schemes",
        description: "Maintain visual consistency across different polygon types in your application"
      },
      {
        text: "Handle polygon interactions properly",
        description: "Provide meaningful feedback when users interact with polygons"
      },
      {
        text: "Consider accessibility",
        description: "Use colors and patterns that are accessible to colorblind users"
      },
      {
        text: "Optimize for mobile",
        description: "Ensure polygons are easily interactive on touch devices"
      }
    ],
    donts: [
      {
        text: "Don't use too many complex polygons",
        description: "Multiple complex polygons can significantly impact map performance"
      },
      {
        text: "Don't use very high opacity fills",
        description: "High opacity fills can obscure important map details underneath"
      },
      {
        text: "Don't ignore hole winding order",
        description: "Holes must have opposite winding order from the outer boundary"
      },
      {
        text: "Don't forget to validate polygon data",
        description: "Always validate that polygons have at least 3 points and are properly formed"
      },
      {
        text: "Don't use similar colors for different zones",
        description: "Ensure sufficient color contrast between different polygon types"
      },
      {
        text: "Don't make polygons too small",
        description: "Very small polygons can be difficult to interact with, especially on mobile"
      }
    ],
    tips: [
      {
        text: "Use polygon simplification",
        description: "Implement algorithms to reduce polygon complexity while maintaining shape"
      },
      {
        text: "Implement hover effects",
        description: "Change polygon appearance on hover to improve user experience"
      },
      {
        text: "Consider using clustering",
        description: "Group nearby small polygons at lower zoom levels for better performance"
      },
      {
        text: "Add informative tooltips",
        description: "Provide contextual information when users interact with polygons"
      }
    ]
  },
  useCases: [
    {
      title: "Geographic Boundaries",
      description: "Define administrative boundaries, districts, and territorial divisions",
      examples: [
        "City districts and neighborhoods",
        "Administrative boundaries",
        "Electoral districts",
        "Postal code areas"
      ],
      icon: "🗺️",
      color: "#1976d2"
    },
    {
      title: "Zoning & Planning",
      description: "Visualize land use zones, development areas, and urban planning",
      examples: [
        "Residential zones",
        "Commercial districts",
        "Industrial areas",
        "Protected zones"
      ],
      icon: "🏗️",
      color: "#4caf50"
    },
    {
      title: "Service Areas",
      description: "Show coverage areas, delivery zones, and service boundaries",
      examples: [
        "Delivery coverage areas",
        "Service territories",
        "Emergency response zones",
        "Network coverage areas"
      ],
      icon: "📡",
      color: "#ff9800"
    },
    {
      title: "Environmental Data",
      description: "Represent environmental zones, weather patterns, and natural features",
      examples: [
        "Climate zones",
        "Flood risk areas",
        "Wildlife habitats",
        "Pollution monitoring zones"
      ],
      icon: "🌍",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'polygon-basic',
      title: 'Create a Basic Polygon',
      description: 'Draw a simple polygon area on the map with proper styling.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Create a Polygon component with at least 4 points',
        'Set appropriate fill and stroke colors',
        'Position the polygon to cover a meaningful area',
        'Ensure the polygon is clearly visible'
      ],
      hints: [
        'Use the paths prop with an array of coordinates',
        'Set fillColor, fillOpacity, strokeColor in options',
        'Choose coordinates that form a closed shape'
      ]
    },
    {
      id: 'polygon-zones',
      title: 'Build Multiple Zone System',
      description: 'Create multiple polygons representing different zones with interactive selection.',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      requirements: [
        'Create at least 3 different zone polygons',
        'Use different colors for each zone type',
        'Implement click selection for zones',
        'Add zone information display'
      ],
      hints: [
        'Create an array of zone configurations',
        'Use different fillColor values for each zone',
        'Handle onClick events for polygon selection',
        'Use state to track selected zones'
      ]
    },
    {
      id: 'polygon-interactive',
      title: 'Build Interactive Polygon Creator',
      description: 'Allow users to click on the map to create custom polygon areas.',
      difficulty: 'intermediate',
      estimatedTime: '30 minutes',
      requirements: [
        'Handle map click events to add polygon points',
        'Display markers at each polygon vertex',
        'Show the polygon as points are added',
        'Provide controls to finish or clear the polygon'
      ],
      hints: [
        'Use useState to manage the polygon path',
        'Handle onClick event on the GoogleMap',
        'Require at least 3 points for a valid polygon',
        'Use map() to render vertex markers'
      ]
    },
    {
      id: 'polygon-holes',
      title: 'Create Polygons with Holes',
      description: 'Build polygons that contain exclusion areas (holes) within them.',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      requirements: [
        'Create a polygon with an outer boundary',
        'Add one or more holes inside the polygon',
        'Ensure proper winding order for holes',
        'Visualize the hole areas clearly'
      ],
      hints: [
        'Use nested arrays in the paths prop',
        'First array is the outer boundary',
        'Subsequent arrays are holes',
        'Holes should have opposite winding order'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/polyline", label: "Polyline" },
    next: { href: "/components-guide/circle", label: "Circle" }
  }
};