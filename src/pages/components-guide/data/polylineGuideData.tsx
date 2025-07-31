import React from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { GuidePageData } from '../types';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from '../constants';

export const polylineGuideData: GuidePageData = {
  title: 'Polyline Component Guide',
  subtitle: 'Complete guide to using Polyline components for drawing paths, routes, and boundaries on maps',
  icon: '📏',
  examples: {
    basic: {
      title: 'Basic Polyline',
      description: 'Simple polyline connecting multiple points',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          <Polyline
            path={[
              RIYADH_LOCATIONS.KINGDOM_CENTRE,
              RIYADH_LOCATIONS.AL_FAISALIAH_TOWER,
              RIYADH_LOCATIONS.MASMAK_FORTRESS,
              RIYADH_LOCATIONS.NATIONAL_MUSEUM
            ]}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 3
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline } from '@react-google-maps/api';

const BasicPolyline = () => {
  const path = [
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
      <Polyline
        path={path}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
      />
    </GoogleMap>
  );
};`
    },

    styled: {
      title: 'Styled Polylines',
      description: 'Multiple polylines with different styles and colors',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* Route 1 - Business District */}
          <Polyline
            path={[
              RIYADH_LOCATIONS.KINGDOM_CENTRE,
              RIYADH_LOCATIONS.AL_FAISALIAH_TOWER,
              { lat: 24.6950, lng: 46.6920 },
              { lat: 24.7100, lng: 46.6800 }
            ]}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true
            }}
          />
          
          {/* Route 2 - Historical Sites */}
          <Polyline
            path={[
              RIYADH_LOCATIONS.MASMAK_FORTRESS,
              RIYADH_LOCATIONS.NATIONAL_MUSEUM,
              { lat: 24.6380, lng: 46.7250 },
              { lat: 24.6200, lng: 46.7100 }
            ]}
            options={{
              strokeColor: '#00FF00',
              strokeOpacity: 0.7,
              strokeWeight: 3,
              geodesic: false
            }}
          />
          
          {/* Route 3 - Shopping Route */}
          <Polyline
            path={[
              { lat: 24.7200, lng: 46.6600 },
              { lat: 24.7300, lng: 46.6700 },
              { lat: 24.7400, lng: 46.6650 },
              { lat: 24.7350, lng: 46.6550 }
            ]}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.9,
              strokeWeight: 5,
              geodesic: true
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline } from '@react-google-maps/api';

const StyledPolylines = () => {
  const routes = [
    {
      path: [
        { lat: 24.7136, lng: 46.6753 },
        { lat: 24.6877, lng: 46.6857 },
        { lat: 24.6950, lng: 46.6920 },
        { lat: 24.7100, lng: 46.6800 }
      ],
      options: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        geodesic: true
      }
    },
    {
      path: [
        { lat: 24.6308, lng: 46.7073 },
        { lat: 24.6465, lng: 46.7169 },
        { lat: 24.6380, lng: 46.7250 },
        { lat: 24.6200, lng: 46.7100 }
      ],
      options: {
        strokeColor: '#00FF00',
        strokeOpacity: 0.7,
        strokeWeight: 3,
        geodesic: false
      }
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      {routes.map((route, index) => (
        <Polyline
          key={index}
          path={route.path}
          options={route.options}
        />
      ))}
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Polyline',
      description: 'Click on the map to add points and build a custom path',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const InteractivePolyline = () => {
  const [path, setPath] = useState([]);

  const onMapClick = useCallback((e) => {
    if (e.latLng) {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setPath(prevPath => [...prevPath, newPoint]);
    }
  }, []);

  const clearPath = () => {
    setPath([]);
  };

  return (
    <div>
      <button onClick={clearPath}>Clear Path</button>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.7136, lng: 46.6753 }}
        zoom={12}
        onClick={onMapClick}
      >
        {path.length >= 2 && (
          <Polyline
            path={path}
            options={{
              strokeColor: '#FF6B6B',
              strokeOpacity: 0.8,
              strokeWeight: 3
            }}
          />
        )}

        {path.map((point, index) => (
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

    animated: {
      title: 'Animated Polyline',
      description: 'Watch as the polyline is drawn progressively',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.BUILDING}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const AnimatedPolyline = () => {
  const [currentPath, setCurrentPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullPath = [
    { lat: 24.7136, lng: 46.6753 },
    { lat: 24.7100, lng: 46.6800 },
    { lat: 24.7050, lng: 46.6850 },
    { lat: 24.7000, lng: 46.6900 },
    { lat: 24.6877, lng: 46.6857 }
  ];

  useEffect(() => {
    let interval;
    if (isAnimating && currentIndex < fullPath.length) {
      interval = setInterval(() => {
        setCurrentPath(prev => [...prev, fullPath[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, currentIndex]);

  const startAnimation = () => {
    setCurrentPath([fullPath[0]]);
    setCurrentIndex(1);
    setIsAnimating(true);
  };

  return (
    <div>
      <button onClick={startAnimation}>Start Animation</button>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.7136, lng: 46.6753 }}
        zoom={13}
      >
        {currentPath.length >= 2 && (
          <Polyline
            path={currentPath}
            options={{
              strokeColor: '#FF6B6B',
              strokeOpacity: 0.8,
              strokeWeight: 4
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};`
    },

    geodesic: {
      title: 'Geodesic vs Non-Geodesic',
      description: 'Compare geodesic and non-geodesic polylines over long distances',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={{ lat: 24.0, lng: 45.0 }}
          zoom={6}
        >
          {/* Geodesic polyline */}
          <Polyline
            path={[
              { lat: 24.7136, lng: 46.6753 }, // Riyadh
              { lat: 21.4858, lng: 39.1925 }, // Jeddah
              { lat: 26.4207, lng: 50.0888 }  // Dammam
            ]}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true
            }}
          />
          
          {/* Non-geodesic polyline */}
          <Polyline
            path={[
              { lat: 24.7136, lng: 46.6753 }, // Riyadh
              { lat: 21.4858, lng: 39.1925 }, // Jeddah
              { lat: 26.4207, lng: 50.0888 }  // Dammam
            ]}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.6,
              strokeWeight: 2,
              geodesic: false
            }}
          />

          {/* City markers */}
          <Marker position={{ lat: 24.7136, lng: 46.6753 }} title="Riyadh" />
          <Marker position={{ lat: 21.4858, lng: 39.1925 }} title="Jeddah" />
          <Marker position={{ lat: 26.4207, lng: 50.0888 }} title="Dammam" />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';

const GeodesicComparison = () => {
  const cities = [
    { lat: 24.7136, lng: 46.6753 }, // Riyadh
    { lat: 21.4858, lng: 39.1925 }, // Jeddah
    { lat: 26.4207, lng: 50.0888 }  // Dammam
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.0, lng: 45.0 }}
      zoom={6}
    >
      {/* Geodesic polyline - follows Earth's curvature */}
      <Polyline
        path={cities}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          geodesic: true
        }}
      />
      
      {/* Non-geodesic polyline - straight lines */}
      <Polyline
        path={cities}
        options={{
          strokeColor: '#0000FF',
          strokeOpacity: 0.6,
          strokeWeight: 2,
          geodesic: false
        }}
      />

      {cities.map((city, index) => (
        <Marker key={index} position={city} />
      ))}
    </GoogleMap>
  );
};`
    }
  },
  propsData: {
    title: 'Polyline Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'path',
            type: 'LatLngLiteral[] | LatLng[]',
            description: 'Array of coordinates defining the polyline path',
            required: true
          },
          {
            name: 'options',
            type: 'PolylineOptions',
            description: 'Additional polyline configuration options',
            required: false
          }
        ],
        color: '#1976d2'
      },
      {
        title: 'Style Options',
        props: [
          {
            name: 'strokeColor',
            type: 'string',
            description: 'The color of the polyline stroke',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'strokeOpacity',
            type: 'number',
            description: 'The opacity of the polyline stroke (0.0 to 1.0)',
            required: false,
            defaultValue: '1.0'
          },
          {
            name: 'strokeWeight',
            type: 'number',
            description: 'The width of the polyline stroke in pixels',
            required: false,
            defaultValue: '2'
          },
          {
            name: 'geodesic',
            type: 'boolean',
            description: 'Whether the polyline should follow the Earth\'s curvature',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'visible',
            type: 'boolean',
            description: 'Whether the polyline is visible on the map',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'zIndex',
            type: 'number',
            description: 'The z-index of the polyline (display order)',
            required: false
          }
        ],
        color: '#4caf50'
      },
      {
        title: 'Interaction Options',
        props: [
          {
            name: 'clickable',
            type: 'boolean',
            description: 'Whether the polyline can receive click events',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Whether the polyline can be dragged',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'editable',
            type: 'boolean',
            description: 'Whether the polyline can be edited by users',
            required: false,
            defaultValue: 'false'
          }
        ],
        color: '#ff9800'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onLoad',
            type: '(polyline: google.maps.Polyline) => void',
            description: 'Callback fired when polyline loads',
            required: false
          },
          {
            name: 'onUnmount',
            type: '(polyline: google.maps.Polyline) => void',
            description: 'Callback fired when polyline unmounts',
            required: false
          },
          {
            name: 'onClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polyline is clicked',
            required: false
          },
          {
            name: 'onDblClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polyline is double-clicked',
            required: false
          },
          {
            name: 'onRightClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polyline is right-clicked',
            required: false
          },
          {
            name: 'onMouseOver',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when mouse enters polyline',
            required: false
          },
          {
            name: 'onMouseOut',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when mouse leaves polyline',
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
        color: '#9c27b0'
      }
    ]
  },
  bestPractices: {
    dos: [
      {
        text: "Use geodesic for long-distance paths",
        description: "Enable geodesic option for paths spanning large distances to follow Earth's curvature"
      },
      {
        text: "Optimize path complexity",
        description: "Limit the number of points for better performance, especially on mobile devices"
      },
      {
        text: "Use appropriate stroke weight",
        description: "Choose stroke weight that's visible but not overwhelming for the map scale"
      },
      {
        text: "Implement proper event handling",
        description: "Use useCallback for event handlers to prevent unnecessary re-renders"
      },
      {
        text: "Consider color accessibility",
        description: "Choose colors that are visible against different map backgrounds and accessible to colorblind users"
      },
      {
        text: "Use consistent styling",
        description: "Maintain visual consistency across multiple polylines in your application"
      }
    ],
    donts: [
      {
        text: "Don't use too many points",
        description: "Excessive points can impact performance and make the polyline difficult to interact with"
      },
      {
        text: "Don't ignore geodesic for global paths",
        description: "Non-geodesic lines can appear incorrect over long distances"
      },
      {
        text: "Don't use very thick strokes unnecessarily",
        description: "Overly thick polylines can obscure map details and impact performance"
      },
      {
        text: "Don't forget to handle path updates",
        description: "When using editable polylines, properly handle path change events"
      },
      {
        text: "Don't use low opacity for important paths",
        description: "Important routes should be clearly visible to users"
      },
      {
        text: "Don't mix geodesic and non-geodesic inconsistently",
        description: "Be consistent in your choice of geodesic setting for similar types of paths"
      }
    ],
    tips: [
      {
        text: "Use path simplification algorithms",
        description: "Implement Douglas-Peucker or similar algorithms to reduce point count while maintaining shape"
      },
      {
        text: "Animate polyline drawing",
        description: "Create engaging user experiences by progressively drawing polylines"
      },
      {
        text: "Combine with markers for waypoints",
        description: "Use markers to highlight important points along the polyline path"
      },
      {
        text: "Implement hover effects",
        description: "Change polyline appearance on hover to improve user interaction feedback"
      }
    ]
  },
  useCases: [
    {
      title: "Route Planning",
      description: "Display navigation routes, delivery paths, and travel itineraries",
      examples: [
        "GPS navigation routes",
        "Delivery truck routes",
        "Tourist walking tours",
        "Public transportation lines"
      ],
      icon: "🗺️",
      color: "#1976d2"
    },
    {
      title: "Boundary Visualization",
      description: "Show geographical boundaries, property lines, and administrative areas",
      examples: [
        "Country and state borders",
        "Property boundaries",
        "Zoning areas",
        "Protected regions"
      ],
      icon: "🏞️",
      color: "#4caf50"
    },
    {
      title: "Network Infrastructure",
      description: "Visualize utility networks, transportation systems, and communication lines",
      examples: [
        "Power line networks",
        "Pipeline systems",
        "Fiber optic cables",
        "Railway networks"
      ],
      icon: "🔌",
      color: "#ff9800"
    },
    {
      title: "Data Visualization",
      description: "Represent movement patterns, flow data, and temporal changes",
      examples: [
        "Migration patterns",
        "Traffic flow analysis",
        "Weather front movements",
        "Historical timeline paths"
      ],
      icon: "📊",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'polyline-basic',
      title: 'Create a Basic Polyline',
      description: 'Draw a simple polyline connecting multiple points on the map.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Create a Polyline component with at least 3 points',
        'Set appropriate stroke color and weight',
        'Position the polyline to connect meaningful locations',
        'Ensure the polyline is visible on the map'
      ],
      hints: [
        'Use the path prop with an array of coordinates',
        'Set strokeColor, strokeOpacity, and strokeWeight in options',
        'Choose coordinates that create a visible path'
      ]
    },
    {
      id: 'polyline-interactive',
      title: 'Build Interactive Polyline Creator',
      description: 'Allow users to click on the map to create custom polylines.',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      requirements: [
        'Handle map click events to add points',
        'Display markers at each point',
        'Show the polyline as points are added',
        'Provide a way to clear the path'
      ],
      hints: [
        'Use useState to manage the path array',
        'Handle onClick event on the GoogleMap',
        'Use map() to render markers for each point',
        'Update path state when new points are added'
      ]
    },
    {
      id: 'polyline-styled',
      title: 'Create Multiple Styled Polylines',
      description: 'Display multiple polylines with different styles and colors.',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      requirements: [
        'Create at least 3 different polylines',
        'Use different colors and stroke weights',
        'Implement geodesic and non-geodesic examples',
        'Add a legend explaining each polyline'
      ],
      hints: [
        'Create an array of polyline configurations',
        'Use different strokeColor values',
        'Set geodesic to true for some polylines',
        'Consider using map() to render multiple polylines'
      ]
    },
    {
      id: 'polyline-animated',
      title: 'Animate Polyline Drawing',
      description: 'Create an animated effect where the polyline is drawn progressively.',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      requirements: [
        'Implement progressive polyline drawing',
        'Add start/stop animation controls',
        'Show current position during animation',
        'Provide animation speed control'
      ],
      hints: [
        'Use useEffect with setInterval for animation',
        'Gradually add points to the path array',
        'Use a marker to show current position',
        'Clear intervals on component unmount'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/info-window", label: "InfoWindow" },
    next: { href: "/components-guide/polygon", label: "Polygon" }
  }
};