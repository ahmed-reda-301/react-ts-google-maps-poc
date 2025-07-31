import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { GuidePageData } from '../../types/guide';
import { MAP_CONTAINERS, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from '../../constants';

export const markerGuideData: GuidePageData = {
  title: 'Marker Component Guide',
  subtitle: 'Complete guide to using Marker components with custom icons, animations, and interactions',
  icon: '📍',
  examples: {
    basic: {
      title: 'Basic Marker',
      description: 'Simple marker with position and title',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={DEFAULT_CENTER}
            title="Kingdom Centre - Riyadh"
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker } from '@react-google-maps/api';

const BasicMarker = () => {
  const center = { lat: 24.7136, lng: 46.6753 };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={center}
      zoom={8}
    >
      <Marker
        position={center}
        title="Kingdom Centre - Riyadh"
      />
    </GoogleMap>
  );
};`
    },

    customIcons: {
      title: 'Custom Icon Markers',
      description: 'Markers with custom icons, sizes, and anchors',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={RIYADH_LOCATIONS.KINGDOM_CENTRE}
            title="Custom Icon Marker"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />
          
          <Marker
            position={RIYADH_LOCATIONS.AL_FAISALIAH_TOWER}
            title="SVG Symbol Marker"
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker } from '@react-google-maps/api';

const CustomIconMarkers = () => {
  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      {/* URL-based custom icon */}
      <Marker
        position={{ lat: 24.7136, lng: 46.6753 }}
        title="Custom Icon Marker"
        icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40)
        }}
      />
      
      {/* SVG symbol marker */}
      <Marker
        position={{ lat: 24.6877, lng: 46.6857 }}
        title="SVG Symbol Marker"
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#FF0000',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        }}
      />
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Markers',
      description: 'Markers with click events and dynamic behavior',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={RIYADH_LOCATIONS.KINGDOM_CENTRE}
            title="Click me!"
            onClick={() => alert('Marker clicked!')}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const InteractiveMarkers = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    { id: 1, position: { lat: 24.7136, lng: 46.6753 }, title: "Kingdom Centre" },
    { id: 2, position: { lat: 24.6877, lng: 46.6857 }, title: "Al Faisaliah Tower" }
  ];

  const handleMarkerClick = (markerId) => {
    setSelectedMarker(markerId);
    console.log('Marker clicked:', markerId);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
          onClick={() => handleMarkerClick(marker.id)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: selectedMarker === marker.id ? 12 : 8,
            fillColor: selectedMarker === marker.id ? '#FFD700' : '#007bff',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          }}
        />
      ))}
    </GoogleMap>
  );
};`
    },

    draggable: {
      title: 'Draggable Markers',
      description: 'Markers that can be moved by dragging',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={DEFAULT_CENTER}
            title="Drag me around!"
            draggable={true}
            onDragEnd={(e) => {
              console.log('New position:', e.latLng?.lat(), e.latLng?.lng());
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const DraggableMarkers = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 24.7136,
    lng: 46.6753
  });

  const handleDragEnd = (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarkerPosition(newPosition);
    console.log('New position:', newPosition);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={markerPosition}
      zoom={8}
    >
      <Marker
        position={markerPosition}
        title="Drag me around!"
        draggable={true}
        onDragEnd={handleDragEnd}
      />
    </GoogleMap>
  );
};`
    },

    svgMarkers: {
      title: 'SVG Symbol Markers',
      description: 'Markers using SVG symbols with custom styling',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={RIYADH_LOCATIONS.KINGDOM_CENTRE}
            title="Circle Symbol"
          />
          
          <Marker
            position={RIYADH_LOCATIONS.AL_FAISALIAH_TOWER}
            title="Backward Arrow"
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker } from '@react-google-maps/api';

const SVGSymbolMarkers = () => {
  const symbols = [
    {
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Circle Symbol",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#FF0000',
        fillOpacity: 0.8,
        strokeColor: '#FFFFFF',
        strokeWeight: 3
      }
    },
    {
      position: { lat: 24.6877, lng: 46.6857 },
      title: "Arrow Symbol",
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 8,
        fillColor: '#00FF00',
        fillOpacity: 1,
        strokeColor: '#000000',
        strokeWeight: 1
      }
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      {symbols.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          title={marker.title}
          icon={marker.icon}
        />
      ))}
    </GoogleMap>
  );
};`
    }
  },
  propsData: {
    title: 'Marker Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'position',
            type: 'LatLngLiteral | LatLng',
            description: 'The position of the marker on the map',
            required: true
          },
          {
            name: 'title',
            type: 'string',
            description: 'Tooltip text that appears on hover',
            required: false
          },
          {
            name: 'icon',
            type: 'string | Icon | Symbol',
            description: 'Custom icon for the marker',
            required: false
          }
        ],
        color: '#1976d2'
      },
      {
        title: 'Behavior Props',
        props: [
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Whether the marker can be dragged',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'clickable',
            type: 'boolean',
            description: 'Whether the marker can receive click events',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'visible',
            type: 'boolean',
            description: 'Whether the marker is visible',
            required: false,
            defaultValue: 'true'
          }
        ],
        color: '#4caf50'
      },
      {
        title: 'Animation Props',
        props: [
          {
            name: 'animation',
            type: 'Animation',
            description: 'Animation for the marker (DROP, BOUNCE)',
            required: false
          },
          {
            name: 'zIndex',
            type: 'number',
            description: 'Z-index of the marker',
            required: false
          }
        ],
        color: '#ff9800'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onClick',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when marker is clicked',
            required: false
          },
          {
            name: 'onDrag',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired repeatedly while dragging',
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
        text: "Use meaningful titles",
        description: "Provide descriptive titles that help users understand what each marker represents"
      },
      {
        text: "Optimize custom icons",
        description: "Use appropriately sized icons and consider loading performance"
      },
      {
        text: "Group related markers",
        description: "Use consistent styling for markers that represent similar data"
      },
      {
        text: "Handle click events",
        description: "Provide meaningful interactions when users click on markers"
      },
      {
        text: "Use appropriate zoom levels",
        description: "Ensure markers are visible and not overcrowded at different zoom levels"
      },
      {
        text: "Implement proper error handling",
        description: "Handle cases where marker positions are invalid or icons fail to load"
      }
    ],
    donts: [
      {
        text: "Don't overcrowd the map",
        description: "Too many markers can make the map difficult to read and slow to render"
      },
      {
        text: "Don't use very large icons",
        description: "Large icons can obscure map details and other markers"
      },
      {
        text: "Don't ignore accessibility",
        description: "Ensure markers are accessible and provide alternative text"
      },
      {
        text: "Don't forget mobile optimization",
        description: "Ensure markers are touch-friendly and appropriately sized for mobile devices"
      }
    ],
    tips: [
      {
        text: "Use marker clustering",
        description: "For large datasets, implement clustering to improve performance and usability"
      },
      {
        text: "Implement hover effects",
        description: "Change marker appearance on hover to improve user experience"
      },
      {
        text: "Cache custom icons",
        description: "Cache frequently used custom icons to improve loading performance"
      },
      {
        text: "Use animation sparingly",
        description: "Animations can enhance UX but should be used judiciously to avoid distraction"
      }
    ]
  },
  useCases: [
    {
      title: "Location Marking",
      description: "Mark specific locations, points of interest, and addresses",
      examples: [
        "Store locations",
        "Tourist attractions",
        "Event venues",
        "Service points"
      ],
      icon: "📍",
      color: "#1976d2"
    },
    {
      title: "Data Visualization",
      description: "Represent data points and statistical information on maps",
      examples: [
        "Sales data by region",
        "Population density",
        "Weather stations",
        "Survey responses"
      ],
      icon: "📊",
      color: "#4caf50"
    },
    {
      title: "Navigation & Routing",
      description: "Show waypoints, destinations, and route information",
      examples: [
        "GPS navigation points",
        "Delivery stops",
        "Travel itineraries",
        "Public transport stops"
      ],
      icon: "🗺️",
      color: "#ff9800"
    },
    {
      title: "Interactive Applications",
      description: "Create interactive experiences with user-generated content",
      examples: [
        "User check-ins",
        "Photo locations",
        "Review locations",
        "Social media posts"
      ],
      icon: "🎮",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'marker-basic',
      title: 'Create Your First Marker',
      description: 'Place a simple marker on the map at a specific location. This fundamental task will teach you the basic props needed for any marker.',
      difficulty: 'beginner',
      estimatedTime: '5 minutes',
      requirements: [
        'Add a Marker component to the map',
        'Set the position to Kingdom Centre coordinates (24.7136, 46.6753)',
        'Add a descriptive title that appears on hover',
        'Ensure the marker is visible on the map'
      ],
      hints: [
        'Use the position prop with lat and lng coordinates',
        'The title prop shows tooltip text on hover',
        'Make sure the marker is inside the GoogleMap component'
      ]
    },
    {
      id: 'marker-multiple',
      title: 'Display Multiple Markers',
      description: 'Create multiple markers on the map representing different locations in Riyadh.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Create an array of marker data with positions and titles',
        'Render multiple markers using map() function',
        'Use different titles for each marker',
        'Ensure all markers are visible on the map'
      ],
      hints: [
        'Create an array with marker objects containing position and title',
        'Use the map() function to render markers',
        'Each marker needs a unique key prop'
      ]
    },
    {
      id: 'marker-custom-icon',
      title: 'Design Custom Marker Icons',
      description: 'Replace the default red marker with custom icons to match your application design and improve user experience.',
      difficulty: 'intermediate',
      estimatedTime: '15 minutes',
      requirements: [
        'Create markers with custom icon URLs',
        'Implement different icon sizes using scaledSize',
        'Add custom SVG icons using symbol paths',
        'Create a category-based icon system with different colors'
      ],
      hints: [
        'Use the icon prop with url, scaledSize, and anchor properties',
        'SVG paths can be used with google.maps.SymbolPath',
        'Consider using different colors for different marker categories',
        'Anchor property helps position the icon correctly'
      ]
    },
    {
      id: 'marker-interactive',
      title: 'Build Interactive Markers',
      description: 'Create markers that respond to user interactions with click events, hover effects, and dynamic content updates.',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      requirements: [
        'Add click event handlers to markers',
        'Implement hover effects with icon changes',
        'Show/hide markers based on user actions',
        'Create a marker selection system with visual feedback'
      ],
      hints: [
        'Use onClick prop for click handling',
        'State management is key for interactive features',
        'Consider using different icons for selected/unselected states',
        'onMouseOver and onMouseOut can create hover effects'
      ]
    },
    {
      id: 'marker-draggable',
      title: 'Create Draggable Markers',
      description: 'Allow users to move markers by dragging them to new positions and capture the new coordinates.',
      difficulty: 'intermediate',
      estimatedTime: '18 minutes',
      requirements: [
        'Enable marker dragging with draggable prop',
        'Handle drag events to update marker position',
        'Display current coordinates in real-time',
        'Provide visual feedback during dragging'
      ],
      hints: [
        'Set draggable to true in marker props',
        'Use onDragEnd to capture final position',
        'onDrag can provide real-time position updates',
        'Consider updating state with new coordinates'
      ]
    },
    {
      id: 'marker-categories',
      title: 'Implement Marker Categories',
      description: 'Create a system to categorize markers with different icons, colors, and filtering capabilities.',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      requirements: [
        'Define different marker categories (restaurants, hotels, attractions)',
        'Use different icons/colors for each category',
        'Add category filtering controls',
        'Implement show/hide functionality for categories'
      ],
      hints: [
        'Create a categories object with icon and color definitions',
        'Use conditional rendering based on active filters',
        'Consider using checkboxes for category selection',
        'Store filter state in component state'
      ]
    },
    {
      id: 'marker-clustering',
      title: 'Implement Marker Clustering',
      description: 'Handle large numbers of markers efficiently by implementing clustering to improve map performance and user experience.',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      requirements: [
        'Install and configure marker clustering library',
        'Group nearby markers into clusters at different zoom levels',
        'Customize cluster appearance and styling',
        'Handle cluster click events to zoom in or expand'
      ],
      hints: [
        'Use @googlemaps/markerclusterer library',
        'Consider zoom level for clustering behavior',
        'Custom cluster icons can improve visual appeal',
        'Test with different numbers of markers'
      ]
    },
    {
      id: 'marker-animation',
      title: 'Animate Marker Interactions',
      description: 'Add smooth animations to markers including drop animations, bounce effects, and smooth transitions between states.',
      difficulty: 'advanced',
      estimatedTime: '30 minutes',
      requirements: [
        'Implement drop animation for new markers',
        'Add bounce animation on marker click',
        'Create smooth marker movement animations',
        'Animate marker appearance and disappearance'
      ],
      hints: [
        'Use google.maps.Animation.DROP and BOUNCE',
        'CSS transitions can enhance custom animations',
        'Consider performance with many animated markers',
        'Animation timing should feel natural'
      ]
    },
    {
      id: 'marker-filtering',
      title: 'Build Advanced Marker Filtering',
      description: 'Create a comprehensive filtering system that allows users to show/hide markers based on multiple criteria.',
      difficulty: 'advanced',
      estimatedTime: '40 minutes',
      requirements: [
        'Create filter controls for different marker categories',
        'Implement search functionality by marker title',
        'Add distance-based filtering from a point',
        'Create preset filter combinations'
      ],
      hints: [
        'Use state to manage filter criteria',
        'Filter markers before rendering them',
        'Consider using checkboxes for category filters',
        'Debounce search input for better performance'
      ]
    },
    {
      id: 'marker-info-integration',
      title: 'Integrate Markers with InfoWindows',
      description: 'Create a seamless experience by connecting markers with detailed information windows that appear on interaction.',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      requirements: [
        'Show InfoWindow when marker is clicked',
        'Display rich content including images and formatted text',
        'Ensure only one InfoWindow is open at a time',
        'Add close functionality and proper positioning'
      ],
      hints: [
        'Use state to track which InfoWindow is open',
        'Position InfoWindow at marker location',
        'Include close button for better UX',
        'Consider InfoWindow content size and responsiveness'
      ]
    },
    {
      id: 'marker-data-driven',
      title: 'Create Data-Driven Markers',
      description: 'Build markers that are generated from external data sources with dynamic properties and real-time updates.',
      difficulty: 'advanced',
      estimatedTime: '45 minutes',
      requirements: [
        'Load marker data from external API or JSON file',
        'Map data properties to marker appearance',
        'Implement real-time data updates',
        'Add data validation and error handling'
      ],
      hints: [
        'Use fetch or axios to load external data',
        'Create mapping functions for data to marker properties',
        'Consider using useEffect for data loading',
        'Implement loading states and error boundaries'
      ]
    },
    {
      id: 'marker-performance',
      title: 'Optimize Marker Performance',
      description: 'Implement performance optimizations for handling thousands of markers efficiently.',
      difficulty: 'advanced',
      estimatedTime: '50 minutes',
      requirements: [
        'Implement viewport-based marker rendering',
        'Add marker virtualization for large datasets',
        'Optimize marker icon loading and caching',
        'Implement progressive loading strategies'
      ],
      hints: [
        'Only render markers within current viewport',
        'Use React.memo for marker components',
        'Implement icon preloading and caching',
        'Consider using web workers for heavy computations'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/google-map", label: "GoogleMap" },
    next: { href: "/components-guide/info-window", label: "InfoWindow" }
  }
};