import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { GuidePageData } from '../../types/guide';
import { MAP_CONTAINERS, DEFAULT_CENTER, ZOOM_LEVELS } from '../../constants';

export const googleMapGuideData: GuidePageData = {
  title: 'GoogleMap Component Guide',
  subtitle: 'Complete guide to the main GoogleMap component with configuration options, styling, and events',
  icon: '🗺️',
  examples: {
    basic: {
      title: 'Basic Map',
      description: 'Simple Google Map with default settings',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        />
      ),
      code: `import { GoogleMap } from '@react-google-maps/api';

const BasicMap = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
    />
  );
};`
    },

    styled: {
      title: 'Styled Map',
      description: 'Map with custom styling and dark theme',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          options={{
            styles: [
              {
                "elementType": "geometry",
                "stylers": [{ "color": "#242f3e" }]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#242f3e" }]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#746855" }]
              }
            ],
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true
          }}
        />
      ),
      code: `import { GoogleMap } from '@react-google-maps/api';

const StyledMap = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#242f3e" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#242f3e" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#746855" }]
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      options={{
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      }}
    />
  );
};`
    },

    interactive: {
      title: 'Interactive Map',
      description: 'Map with click events and dynamic center',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          onClick={(e) => {
            console.log('Map clicked at:', e.latLng?.lat(), e.latLng?.lng());
          }}
          onLoad={(map) => {
            console.log('Map loaded');
          }}
        />
      ),
      code: `import { GoogleMap } from '@react-google-maps/api';
import { useState } from 'react';

const InteractiveMap = () => {
  const [mapInstance, setMapInstance] = useState(null);
  
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  const handleMapClick = (e) => {
    console.log('Map clicked at:', e.latLng.lat(), e.latLng.lng());
  };

  const handleMapLoad = (map) => {
    setMapInstance(map);
    console.log('Map loaded');
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onClick={handleMapClick}
      onLoad={handleMapLoad}
    />
  );
};`
    },

    satellite: {
      title: 'Satellite View',
      description: 'Map with satellite imagery',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          mapTypeId="satellite"
        />
      ),
      code: `import { GoogleMap } from '@react-google-maps/api';

const SatelliteMap = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      mapTypeId="satellite"
    />
  );
};`
    },

    terrain: {
      title: 'Terrain View',
      description: 'Map showing terrain and elevation',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          mapTypeId="terrain"
        />
      ),
      code: `import { GoogleMap } from '@react-google-maps/api';

const TerrainMap = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      mapTypeId="terrain"
    />
  );
};`
    },

    customControls: {
      title: 'Custom Controls',
      description: 'Map with customized UI controls',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true
          }}
        />
      ),
      code: `import { GoogleMap } from '@react-google-maps/api';

const CustomControlsMap = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 24.7136,
    lng: 46.6753
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        }
      }}
    />
  );
};`
    }
  },
  propsData: {
    title: 'GoogleMap Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'mapContainerStyle',
            type: 'React.CSSProperties',
            description: 'CSS styles for the map container element',
            required: true
          },
          {
            name: 'center',
            type: 'LatLng | LatLngLiteral',
            description: 'The initial center position of the map',
            required: false,
            defaultValue: '{ lat: 0, lng: 0 }'
          },
          {
            name: 'zoom',
            type: 'number',
            description: 'The initial zoom level of the map (0-20)',
            required: false,
            defaultValue: '10'
          },
          {
            name: 'mapTypeId',
            type: 'string',
            description: 'The initial map type (roadmap, satellite, hybrid, terrain)',
            required: false,
            defaultValue: 'roadmap'
          },
          {
            name: 'options',
            type: 'google.maps.MapOptions',
            description: 'Additional map configuration options',
            required: false
          }
        ],
        color: '#1976d2'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onLoad',
            type: '(map: google.maps.Map) => void',
            description: 'Callback fired when the map instance is loaded',
            required: false
          },
          {
            name: 'onUnmount',
            type: '(map: google.maps.Map) => void',
            description: 'Callback fired when the map instance is unmounted',
            required: false
          },
          {
            name: 'onClick',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when the map is clicked',
            required: false
          },
          {
            name: 'onDblClick',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when the map is double-clicked',
            required: false
          },
          {
            name: 'onRightClick',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when the map is right-clicked',
            required: false
          },
          {
            name: 'onMouseMove',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when the mouse moves over the map',
            required: false
          },
          {
            name: 'onMouseOut',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when the mouse leaves the map',
            required: false
          },
          {
            name: 'onMouseOver',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when the mouse enters the map',
            required: false
          }
        ],
        color: '#4caf50'
      },
      {
        title: 'Map State Events',
        props: [
          {
            name: 'onBoundsChanged',
            type: '() => void',
            description: 'Callback fired when the map bounds change',
            required: false
          },
          {
            name: 'onCenterChanged',
            type: '() => void',
            description: 'Callback fired when the map center changes',
            required: false
          },
          {
            name: 'onZoomChanged',
            type: '() => void',
            description: 'Callback fired when the map zoom level changes',
            required: false
          },
          {
            name: 'onMapTypeIdChanged',
            type: '() => void',
            description: 'Callback fired when the map type changes',
            required: false
          },
          {
            name: 'onProjectionChanged',
            type: '() => void',
            description: 'Callback fired when the map projection changes',
            required: false
          },
          {
            name: 'onResize',
            type: '() => void',
            description: 'Callback fired when the map is resized',
            required: false
          },
          {
            name: 'onTilesLoaded',
            type: '() => void',
            description: 'Callback fired when the map tiles finish loading',
            required: false
          }
        ],
        color: '#ff9800'
      }
    ]
  },
  bestPractices: {
    dos: [
      {
        text: "Always provide mapContainerStyle",
        description: "The map container needs explicit dimensions to render properly"
      },
      {
        text: "Use meaningful center coordinates",
        description: "Set initial center based on your application's geographic focus"
      },
      {
        text: "Handle map loading states",
        description: "Use onLoad callback to know when the map is ready for interaction"
      },
      {
        text: "Optimize for mobile devices",
        description: "Consider touch interactions and smaller screen sizes"
      },
      {
        text: "Use appropriate zoom levels",
        description: "Choose zoom levels that make sense for your use case (1-20)"
      },
      {
        text: "Implement error handling",
        description: "Handle cases where the map fails to load or API key is invalid"
      }
    ],
    donts: [
      {
        text: "Don't forget to set container dimensions",
        description: "Maps without proper sizing will not display correctly"
      },
      {
        text: "Don't use inline styles for complex styling",
        description: "Use the options prop for map-specific styling instead"
      },
      {
        text: "Don't ignore API key restrictions",
        description: "Ensure your API key has proper permissions and restrictions"
      },
      {
        text: "Don't overload with too many options",
        description: "Start simple and add complexity as needed"
      },
      {
        text: "Don't forget about accessibility",
        description: "Consider users who may need keyboard navigation or screen readers"
      }
    ],
    tips: [
      {
        text: "Use map styles for branding",
        description: "Custom map styles can match your application's design theme"
      },
      {
        text: "Debounce map events",
        description: "Events like onBoundsChanged can fire frequently, consider debouncing"
      },
      {
        text: "Cache map instances",
        description: "Store map reference for programmatic control and performance"
      }
    ]
  },
  useCases: [
    {
      title: "Location-Based Services",
      description: "Display user location and nearby points of interest",
      examples: [
        "Store locators",
        "Restaurant finders",
        "Service area maps",
        "Delivery tracking"
      ],
      icon: "📍",
      color: "#1976d2"
    },
    {
      title: "Data Visualization",
      description: "Visualize geographic data and analytics",
      examples: [
        "Sales territory maps",
        "Population density",
        "Weather patterns",
        "Traffic analysis"
      ],
      icon: "📊",
      color: "#4caf50"
    },
    {
      title: "Navigation & Routing",
      description: "Provide directions and route planning",
      examples: [
        "GPS navigation",
        "Route optimization",
        "Fleet management",
        "Trip planning"
      ],
      icon: "🧭",
      color: "#ff9800"
    },
    {
      title: "Real Estate & Property",
      description: "Display properties and geographic boundaries",
      examples: [
        "Property listings",
        "Neighborhood maps",
        "Zoning information",
        "Market analysis"
      ],
      icon: "🏠",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'map-basic',
      title: 'Create Your First Map',
      description: 'Set up a basic Google Map with proper dimensions and center coordinates.',
      difficulty: 'beginner',
      estimatedTime: '5 minutes',
      requirements: [
        'Import GoogleMap component from @react-google-maps/api',
        'Set mapContainerStyle with width and height',
        'Define center coordinates for Riyadh',
        'Set an appropriate zoom level'
      ],
      hints: [
        'mapContainerStyle must include width and height',
        'Use lat/lng coordinates for center prop',
        'Zoom levels range from 1 (world) to 20 (building)'
      ]
    },
    {
      id: 'map-styling',
      title: 'Style Your Map',
      description: 'Apply custom styling to change the map appearance and theme.',
      difficulty: 'intermediate',
      estimatedTime: '15 minutes',
      requirements: [
        'Apply a dark theme using map styles',
        'Customize UI controls visibility',
        'Position controls in different locations',
        'Test different map types (satellite, terrain)'
      ],
      hints: [
        'Use the styles property in options',
        'disableDefaultUI removes all controls',
        'Individual controls can be enabled/disabled',
        'mapTypeId changes the base map layer'
      ]
    },
    {
      id: 'map-events',
      title: 'Handle Map Events',
      description: 'Implement event handlers for user interactions with the map.',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      requirements: [
        'Handle map click events',
        'Track map center changes',
        'Monitor zoom level changes',
        'Log map loading completion'
      ],
      hints: [
        'onClick provides mouse event with coordinates',
        'onLoad gives access to map instance',
        'Use state to track map changes',
        'Event handlers receive different parameters'
      ]
    }
  ],
  navigationLinks: {
    next: { href: "/components-guide/marker", label: "Marker" }
  }
};