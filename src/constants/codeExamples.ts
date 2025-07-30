/**
 * Code examples constants
 * Centralized location for all code snippets used in documentation
 */

/**
 * Basic setup code examples
 */
export const CODE_EXAMPLES = {
  basicSetup: `import React, { FC, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 24.7136,
  lng: 46.6753,
};`,

  componentImplementation: `const BasicMapComponent: FC = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(10);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        }}
      >
        <Marker
          position={mapCenter}
          title="Current Center"
        />
      </GoogleMap>
    </LoadScript>
  );
};`,

  typeScriptTypes: `interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  center: LatLng;
  zoom: number;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  style?: React.CSSProperties;
}`,

  envFile: `# .env file
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here`,

  packageInstallation: `# Install required packages
npm install @react-google-maps/api
npm install @types/googlemaps

# For TypeScript projects
npm install typescript @types/react @types/react-dom`,

  customMarkerUsage: `// Custom Marker Component Usage
import CustomMarker from '../components/maps/CustomMarker';

// In your component
<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <CustomMarker
    position={{lat: 30.0444, lng: 31.2357}}
    title="Restaurant in Cairo"
    icon={{
      url: '/icons/restaurant.png',
      scaledSize: typeof google !== 'undefined' ? new google.maps.Size(40, 40) : undefined
    }}
  />
</GoogleMap>`,

  markerIconHelper: `// Helper function to get marker icon based on type
const getMarkerIcon = (type: string): string => {
  const icons = {
    restaurant: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
    hotel: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
    attraction: 'https://maps.google.com/mapfiles/ms/icons/camera.png'
  };
  return icons[type as keyof typeof icons] || icons.restaurant;
};

// Usage in component
const markerIcon = getMarkerIcon(marker.type);`,

  dynamicMarkerAddition: `// Handle map click to add new markers
const handleMapClick = (event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    const newMarker = {
      id: Date.now().toString(),
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      type: selectedMarkerType,
      title: \`New \${selectedMarkerType} marker\`
    };
    setMarkers([...markers, newMarker]);
  }
};`,

  directionsService: `// Using Directions Service
import { DirectionsService } from '../services/DirectionsService';

// In your component
const directionsService = new DirectionsService();

const getDirections = async () => {
  try {
    const result = await directionsService.calculateRoute({
      origin: 'Cairo, Egypt',
      destination: 'Alexandria, Egypt',
      travelMode: google.maps.TravelMode.DRIVING
    });
    
    // Display route on map
    const route = result.routes[0];
    const path = route.overview_path;
    
    // Show polyline
    <Polyline
      path={path}
      options={{
        strokeColor: "#4285F4",
        strokeWeight: 5,
        strokeOpacity: 0.8
      }}
    />
  } catch (error) {
    console.error('Directions error:', error);
  }
};`,

  polylineUsage: `// In your component
const routePath = [
  { lat: 30.0444, lng: 31.2357 },
  { lat: 30.0626, lng: 31.2497 },
  { lat: 30.0800, lng: 31.2600 }
];

<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <Polyline
    path={routePath}
    options={{
      strokeColor: "#FF0000",
      strokeWeight: 4,
      strokeOpacity: 0.8
    }}
  />
</GoogleMap>`,

  polygonUsage: `// In your component
const areaPaths = [
  { lat: 30.0400, lng: 31.2300 },
  { lat: 30.0500, lng: 31.2300 },
  { lat: 30.0500, lng: 31.2400 },
  { lat: 30.0400, lng: 31.2400 }
];

<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <Polygon
    paths={areaPaths}
    options={{
      fillColor: "#FF0000",
      fillOpacity: 0.3,
      strokeColor: "#AA0000",
      strokeWeight: 2
    }}
  />
</GoogleMap>`,

  geolocationUsage: `// Using Geolocation
const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition(pos),
      (err) => setError(err.message)
    );
  };

  return { position, error, getCurrentPosition };
};

// In component
const { position, error, getCurrentPosition } = useGeolocation();`,

  infoWindowUsage: `// Rich Info Window
const infoWindowContent = {
  title: "Restaurant Name",
  description: "Delicious local cuisine",
  image: "/images/restaurant.jpg",
  rating: 4.5,
  actions: [
    { label: "View Menu", onClick: () => showMenu() },
    { label: "Get Directions", onClick: () => getDirections() }
  ]
};

<InfoWindow position={marker.position}>
  <div style={{ maxWidth: '300px' }}>
    <img src={infoWindowContent.image} alt={infoWindowContent.title} />
    <h3>{infoWindowContent.title}</h3>
    <p>{infoWindowContent.description}</p>
    <div>Rating: {renderStars(infoWindowContent.rating)}</div>
  </div>
</InfoWindow>`,
} as const;

/**
 * Installation and setup instructions
 */
export const SETUP_INSTRUCTIONS = {
  apiKeySetup: [
    'Go to Google Cloud Console (https://console.cloud.google.com/)',
    'Create a new project or select an existing one',
    'Enable the Maps JavaScript API',
    'Create an API key in Credentials section',
    'Set up API key restrictions for security',
    'Add the API key to your .env file',
  ],
  
  packageInstallation: [
    'Install @react-google-maps/api package',
    'Install TypeScript type definitions',
    'Set up environment variables',
    'Configure your development environment',
  ],

  projectSetup: [
    'Create a new React TypeScript project',
    'Install required dependencies',
    'Set up folder structure',
    'Configure environment variables',
    'Create basic components',
  ],
} as const;

/**
 * Best practices code examples
 */
export const BEST_PRACTICES = {
  performance: [
    'Use React.memo() to prevent unnecessary re-renders',
    'Keep the libraries array as a static constant',
    'Implement proper error boundaries',
    'Use environment variables for API keys',
    'Consider lazy loading for complex applications',
  ],

  security: [
    'Never expose API keys in client-side code in production',
    'Set up API key restrictions in Google Cloud Console',
    'Use HTTP referrer restrictions for web applications',
    'Monitor API usage and set up billing alerts',
  ],

  codeQuality: [
    'Use TypeScript for better type safety',
    'Implement proper error handling',
    'Create reusable components',
    'Follow consistent naming conventions',
    'Add comprehensive documentation',
  ],
} as const;