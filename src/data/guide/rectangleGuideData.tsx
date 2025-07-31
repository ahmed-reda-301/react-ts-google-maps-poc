import React from 'react';
import { GoogleMap, Rectangle, Marker } from '@react-google-maps/api';
import { GuidePageData } from '../../types/guide';
import { MAP_CONTAINERS, DEFAULT_CENTER, ZOOM_LEVELS } from '../../constants';

export const rectangleGuideData: GuidePageData = {
  title: 'Rectangle Component Guide',
  subtitle: 'Complete guide to using Rectangle components for defining rectangular areas, zones, and boundaries',
  icon: '▭',
  examples: {
    basic: {
      title: 'Basic Rectangle',
      description: 'Simple rectangle with adjustable bounds',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Rectangle
            bounds={{
              north: 24.7400,
              south: 24.6800,
              east: 46.7200,
              west: 46.6400
            }}
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
      code: `import { GoogleMap, Rectangle } from '@react-google-maps/api';

const BasicRectangle = () => {
  const bounds = {
    north: 24.7400,
    south: 24.6800,
    east: 46.7200,
    west: 46.6400
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      <Rectangle
        bounds={bounds}
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
      description: 'Multiple rectangles representing different zones',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* Business Zone */}
          <Rectangle
            bounds={{
              north: 24.7400,
              south: 24.7100,
              east: 46.6900,
              west: 46.6600
            }}
            options={{
              fillColor: '#007bff',
              fillOpacity: 0.35,
              strokeColor: '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
          
          {/* Residential Zone */}
          <Rectangle
            bounds={{
              north: 24.7000,
              south: 24.6700,
              east: 46.6800,
              west: 46.6500
            }}
            options={{
              fillColor: '#28a745',
              fillOpacity: 0.35,
              strokeColor: '#1e7e34',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Rectangle } from '@react-google-maps/api';

const MultipleZones = () => {
  const zones = [
    {
      id: 'business',
      name: 'Business Zone',
      bounds: {
        north: 24.7400,
        south: 24.7100,
        east: 46.6900,
        west: 46.6600
      },
      fillColor: '#007bff',
      strokeColor: '#0056b3'
    },
    {
      id: 'residential',
      name: 'Residential Zone',
      bounds: {
        north: 24.7000,
        south: 24.6700,
        east: 46.6800,
        west: 46.6500
      },
      fillColor: '#28a745',
      strokeColor: '#1e7e34'
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      {zones.map(zone => (
        <Rectangle
          key={zone.id}
          bounds={zone.bounds}
          options={{
            fillColor: zone.fillColor,
            fillOpacity: 0.35,
            strokeColor: zone.strokeColor,
            strokeOpacity: 0.8,
            strokeWeight: 2
          }}
        />
      ))}
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Builder',
      description: 'Click and drag to create custom rectangles',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Rectangle } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const InteractiveRectangleBuilder = () => {
  const [rectangles, setRectangles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);

  const onMapClick = useCallback((e) => {
    if (e.latLng) {
      if (!isDrawing) {
        setStartPoint({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
        setIsDrawing(true);
      } else {
        const endPoint = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        
        const newRectangle = {
          id: Date.now(),
          bounds: {
            north: Math.max(startPoint.lat, endPoint.lat),
            south: Math.min(startPoint.lat, endPoint.lat),
            east: Math.max(startPoint.lng, endPoint.lng),
            west: Math.min(startPoint.lng, endPoint.lng)
          }
        };
        
        setRectangles(prev => [...prev, newRectangle]);
        setIsDrawing(false);
        setStartPoint(null);
      }
    }
  }, [isDrawing, startPoint]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
      onClick={onMapClick}
    >
      {rectangles.map(rectangle => (
        <Rectangle
          key={rectangle.id}
          bounds={rectangle.bounds}
          options={{
            fillColor: '#FF6B6B',
            fillOpacity: 0.35,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2
          }}
        />
      ))}
    </GoogleMap>
  );
};`
    }
  },
  propsData: {
    title: 'Rectangle Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'bounds',
            type: 'LatLngBounds | LatLngBoundsLiteral',
            description: 'The bounds of the rectangle (north, south, east, west)',
            required: true
          },
          {
            name: 'options',
            type: 'RectangleOptions',
            description: 'Additional rectangle configuration options',
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
            description: 'The fill color of the rectangle',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'fillOpacity',
            type: 'number',
            description: 'The fill opacity of the rectangle (0.0 to 1.0)',
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
            description: 'The stroke color of the rectangle border',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'strokeOpacity',
            type: 'number',
            description: 'The stroke opacity of the rectangle border (0.0 to 1.0)',
            required: false,
            defaultValue: '0.8'
          },
          {
            name: 'strokeWeight',
            type: 'number',
            description: 'The stroke width of the rectangle border in pixels',
            required: false,
            defaultValue: '2'
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
            description: 'Whether the rectangle can receive click events',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Whether the rectangle can be dragged',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'editable',
            type: 'boolean',
            description: 'Whether the rectangle can be edited by users',
            required: false,
            defaultValue: 'false'
          }
        ],
        color: '#9c27b0'
      }
    ]
  },
  bestPractices: {
    dos: [
      {
        text: "Use appropriate bounds",
        description: "Ensure rectangle bounds are properly defined with north > south and east > west"
      },
      {
        text: "Maintain visual consistency",
        description: "Use consistent colors and opacity levels across similar rectangle types"
      },
      {
        text: "Optimize for performance",
        description: "Limit the number of rectangles displayed simultaneously"
      }
    ],
    donts: [
      {
        text: "Don't use invalid bounds",
        description: "Avoid rectangles where north < south or east < west"
      },
      {
        text: "Don't overlap too many rectangles",
        description: "Multiple overlapping rectangles can create visual confusion"
      }
    ],
    tips: [
      {
        text: "Use bounds validation",
        description: "Always validate rectangle bounds before creating them"
      }
    ]
  },
  useCases: [
    {
      title: "Geographic Zones",
      description: "Define rectangular areas, districts, and boundaries",
      examples: [
        "City blocks",
        "Administrative zones",
        "Grid systems",
        "Coordinate areas"
      ],
      icon: "🗺���",
      color: "#1976d2"
    }
  ],
  tasks: [
    {
      id: 'rectangle-basic',
      title: 'Create a Basic Rectangle',
      description: 'Draw a simple rectangle area on the map.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Create a Rectangle component with proper bounds',
        'Set appropriate fill and stroke colors',
        'Position the rectangle to cover a meaningful area'
      ],
      hints: [
        'Use the bounds prop with north, south, east, west values',
        'Set fillColor, fillOpacity, strokeColor in options'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/circle", label: "Circle" },
    next: { href: "/components-guide", label: "Components Guide" }
  }
};