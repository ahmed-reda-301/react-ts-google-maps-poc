import React from 'react';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import { GuidePageData } from '../../types/guide';
import { MAP_CONTAINERS, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from '../../constants';

export const circleGuideData: GuidePageData = {
  title: 'Circle Component Guide',
  subtitle: 'Complete guide to using Circle components for coverage areas, radius visualization, and geographic boundaries',
  icon: '⭕',
  examples: {
    basic: {
      title: 'Basic Circle',
      description: 'Simple circle with adjustable radius',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker
            position={DEFAULT_CENTER}
            title="Kingdom Centre"
          />
          
          <Circle
            center={DEFAULT_CENTER}
            radius={5000}
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
      code: `import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const BasicCircle = () => {
  const [radius, setRadius] = useState(5000); // 5km radius

  const center = { lat: 24.7136, lng: 46.6753 };

  return (
    <div>
      <div>
        <label>Radius: {radius/1000}km</label>
        <input
          type="range"
          min="1000"
          max="20000"
          step="1000"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />
      </div>

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={11}
      >
        <Marker position={center} title="Kingdom Centre" />
        
        <Circle
          center={center}
          radius={radius}
          options={{
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2
          }}
        />
      </GoogleMap>
    </div>
  );
};`
    },

    coverage: {
      title: 'Coverage Areas',
      description: 'Multiple circles representing different service coverage areas',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={10}
        >
          <Marker
            position={RIYADH_LOCATIONS.KINGDOM_CENTRE}
            title="WiFi Hotspot"
          />
          
          <Circle
            center={RIYADH_LOCATIONS.KINGDOM_CENTRE}
            radius={500}
            options={{
              fillColor: '#007bff',
              fillOpacity: 0.25,
              strokeColor: '#007bff',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />

          <Marker
            position={RIYADH_LOCATIONS.AL_FAISALIAH_TOWER}
            title="Delivery Zone"
          />
          
          <Circle
            center={RIYADH_LOCATIONS.AL_FAISALIAH_TOWER}
            radius={3000}
            options={{
              fillColor: '#28a745',
              fillOpacity: 0.25,
              strokeColor: '#28a745',
              strokeOpacity: 0.8,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const CoverageAreas = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  
  const coverageAreas = [
    {
      id: 'wifi-1',
      name: 'WiFi Hotspot',
      center: { lat: 24.7136, lng: 46.6753 },
      radius: 500,
      color: '#007bff'
    },
    {
      id: 'delivery-1',
      name: 'Delivery Zone',
      center: { lat: 24.6877, lng: 46.6857 },
      radius: 3000,
      color: '#28a745'
    }
  ];

  const handleAreaClick = (areaId) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={10}
    >
      {coverageAreas.map(area => (
        <React.Fragment key={area.id}>
          <Marker position={area.center} title={area.name} />
          
          <Circle
            center={area.center}
            radius={area.radius}
            options={{
              fillColor: area.color,
              fillOpacity: selectedArea === area.id ? 0.5 : 0.25,
              strokeColor: area.color,
              strokeOpacity: 0.8,
              strokeWeight: selectedArea === area.id ? 3 : 2
            }}
            onClick={() => handleAreaClick(area.id)}
          />
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Builder',
      description: 'Click on the map to create circles with custom radius and color',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const InteractiveCircleBuilder = () => {
  const [circles, setCircles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(2000);
  const [selectedColor, setSelectedColor] = useState('#007bff');

  const onMapClick = useCallback((e) => {
    if (isCreating && e.latLng) {
      const newCircle = {
        id: Date.now(),
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
  }, [isCreating, selectedRadius, selectedColor]);

  return (
    <div>
      <div>
        <button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? 'Cancel Creating' : 'Start Creating'}
        </button>
        
        <input
          type="range"
          min="500"
          max="10000"
          value={selectedRadius}
          onChange={(e) => setSelectedRadius(parseInt(e.target.value))}
        />
      </div>

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.7136, lng: 46.6753 }}
        zoom={11}
        onClick={onMapClick}
      >
        {circles.map(circle => (
          <Circle
            key={circle.id}
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
        ))}
      </GoogleMap>
    </div>
  );
};`
    },

    editable: {
      title: 'Editable Circle',
      description: 'Drag to move or resize the circle with real-time measurements',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          <Marker
            position={DEFAULT_CENTER}
            title="Circle Center"
          />
          
          <Circle
            center={DEFAULT_CENTER}
            radius={3000}
            options={{
              fillColor: '#007bff',
              fillOpacity: 0.35,
              strokeColor: '#0056b3',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              editable: false,
              draggable: false
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Circle, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const EditableCircle = () => {
  const [circle, setCircle] = useState({
    center: { lat: 24.7136, lng: 46.6753 },
    radius: 3000
  });
  const [isEditable, setIsEditable] = useState(false);

  const onLoad = useCallback((circleInstance) => {
    const centerChangedListener = () => {
      const newCenter = circleInstance.getCenter();
      if (newCenter) {
        setCircle(prev => ({
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
      setCircle(prev => ({
        ...prev,
        radius: newRadius
      }));
    };

    circleInstance.addListener('center_changed', centerChangedListener);
    circleInstance.addListener('radius_changed', radiusChangedListener);
  }, []);

  return (
    <div>
      <button onClick={() => setIsEditable(!isEditable)}>
        {isEditable ? 'Exit Edit Mode' : 'Edit Mode'}
      </button>
      
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={circle.center}
        zoom={12}
      >
        <Circle
          center={circle.center}
          radius={circle.radius}
          onLoad={onLoad}
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
    </div>
  );
};`
    }
  },
  propsData: {
    title: 'Circle Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'center',
            type: 'LatLngLiteral | LatLng',
            description: 'The center point of the circle',
            required: true
          },
          {
            name: 'radius',
            type: 'number',
            description: 'The radius of the circle in meters',
            required: true
          },
          {
            name: 'options',
            type: 'CircleOptions',
            description: 'Additional circle configuration options',
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
            description: 'The fill color of the circle',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'fillOpacity',
            type: 'number',
            description: 'The fill opacity of the circle (0.0 to 1.0)',
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
            description: 'The stroke color of the circle border',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'strokeOpacity',
            type: 'number',
            description: 'The stroke opacity of the circle border (0.0 to 1.0)',
            required: false,
            defaultValue: '0.8'
          },
          {
            name: 'strokeWeight',
            type: 'number',
            description: 'The stroke width of the circle border in pixels',
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
            description: 'Whether the circle can receive click events',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Whether the circle can be dragged',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'editable',
            type: 'boolean',
            description: 'Whether the circle can be edited by users',
            required: false,
            defaultValue: 'false'
          }
        ],
        color: '#9c27b0'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onClick',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when circle is clicked',
            required: false
          },
          {
            name: 'onLoad',
            type: '(circle: google.maps.Circle) => void',
            description: 'Callback fired when circle loads',
            required: false
          },
          {
            name: 'onUnmount',
            type: '(circle: google.maps.Circle) => void',
            description: 'Callback fired when circle unmounts',
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
        text: "Use appropriate radius values",
        description: "Choose radius values that make sense for your use case and zoom level"
      },
      {
        text: "Maintain visual consistency",
        description: "Use consistent colors and opacity levels across similar circle types"
      },
      {
        text: "Optimize for performance",
        description: "Limit the number of circles displayed simultaneously for better performance"
      },
      {
        text: "Provide meaningful interactions",
        description: "Add click handlers and tooltips to make circles informative"
      },
      {
        text: "Use appropriate fill opacity",
        description: "Keep fill opacity low enough to see map details underneath"
      },
      {
        text: "Consider accessibility",
        description: "Use colors and patterns that are accessible to all users"
      }
    ],
    donts: [
      {
        text: "Don't use too many overlapping circles",
        description: "Multiple overlapping circles can create visual confusion and performance issues"
      },
      {
        text: "Don't use very small radii at low zoom",
        description: "Small circles may not be visible or interactive at low zoom levels"
      },
      {
        text: "Don't ignore mobile usability",
        description: "Ensure circles are large enough to interact with on touch devices"
      },
      {
        text: "Don't use high opacity fills everywhere",
        description: "High opacity fills can obscure important map information"
      }
    ],
    tips: [
      {
        text: "Use radius-based zoom adjustment",
        description: "Adjust circle visibility or styling based on map zoom level"
      },
      {
        text: "Implement hover effects",
        description: "Change circle appearance on hover to improve user experience"
      },
      {
        text: "Add measurement displays",
        description: "Show radius, area, or circumference information for user reference"
      }
    ]
  },
  useCases: [
    {
      title: "Coverage Areas",
      description: "Visualize service coverage, network range, and delivery zones",
      examples: [
        "WiFi hotspot coverage",
        "Delivery service areas",
        "Cell tower coverage",
        "Emergency response zones"
      ],
      icon: "📡",
      color: "#1976d2"
    },
    {
      title: "Proximity Search",
      description: "Show search radius and nearby points of interest",
      examples: [
        "Restaurant search radius",
        "Property search areas",
        "Store locator radius",
        "Event proximity zones"
      ],
      icon: "🔍",
      color: "#4caf50"
    },
    {
      title: "Risk & Safety Zones",
      description: "Define safety perimeters, risk areas, and evacuation zones",
      examples: [
        "Evacuation zones",
        "Safety perimeters",
        "Hazard areas",
        "Security zones"
      ],
      icon: "⚠️",
      color: "#ff9800"
    },
    {
      title: "Data Visualization",
      description: "Represent statistical data, population density, and measurements",
      examples: [
        "Population density",
        "Temperature zones",
        "Pollution levels",
        "Economic indicators"
      ],
      icon: "📊",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'circle-basic',
      title: 'Create a Basic Circle',
      description: 'Create a simple circle on the map with a center point and radius. This task will help you understand the fundamental props of the Circle component.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Create a Circle component with center coordinates',
        'Set a radius of 2000 meters',
        'Apply basic styling with fill and stroke colors',
        'Add the circle to a GoogleMap component'
      ],
      hints: [
        'Use the center prop to set the circle position',
        'Radius is specified in meters',
        'Use fillColor and strokeColor in options for styling'
      ]
    },
    {
      id: 'circle-interactive',
      title: 'Build an Interactive Circle',
      description: 'Create a circle that responds to user interactions like clicks and provides visual feedback.',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      requirements: [
        'Add click event handler to the circle',
        'Change circle appearance on hover',
        'Display circle information when clicked',
        'Implement visual feedback for interactions'
      ],
      hints: [
        'Use onClick prop for click handling',
        'Consider using state to track interaction status',
        'Use different colors or opacity for hover effects'
      ]
    },
    {
      id: 'circle-editable',
      title: 'Create an Editable Circle',
      description: 'Build a circle that users can drag to move and resize by dragging the edges.',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      requirements: [
        'Enable circle editing with editable prop',
        'Allow dragging to move the circle',
        'Listen for center and radius changes',
        'Display real-time measurements'
      ],
      hints: [
        'Set editable and draggable to true in options',
        'Use onLoad to get circle reference',
        'Add listeners for center_changed and radius_changed events'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/polygon", label: "Polygon" },
    next: { href: "/components-guide/rectangle", label: "Rectangle" }
  }
};