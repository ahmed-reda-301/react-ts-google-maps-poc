# Map Screens Documentation

This document provides comprehensive documentation for all the map-related screens implemented in the React 19 + TypeScript Google Maps POC project.

---

## Overview

The project includes 7 main map screens, each demonstrating different Google Maps features and capabilities:

1. **Home Page** (`/`) - Project overview and navigation
2. **Basic Map** (`/basic-map`) - Simple map implementation
3. **Custom Markers** (`/custom-markers`) - Custom marker implementations
4. **Info Windows** (`/info-windows`) - Rich info window content
5. **Polylines & Routes** (`/polylines`) - Route visualization
6. **Polygons & Areas** (`/polygons`) - Area and zone mapping
7. **Geolocation** (`/geolocation`) - User location tracking
8. **Directions Service** (`/directions`) - Route planning and navigation

---

## 1. Home Page (`/`)

**File:** `src/pages/HomePage.tsx`

### Purpose
Landing page that provides project overview and quick navigation to all map features.

### Features
- Project introduction and description
- Quick navigation cards to all map screens
- Feature highlights and technology stack information
- Getting started instructions

### Key Components Used
- `Card` - For feature showcase
- `Button` - For navigation
- `InfoBox` - For important information

---

## 2. Basic Map Page (`/basic-map`)

**File:** `src/pages/BasicMapPage.tsx`

### Purpose
Demonstrates basic Google Maps integration with simple markers and controls.

### Features
- Basic map display with default controls
- Simple marker placement
- Map type switching (roadmap, satellite, hybrid, terrain)
- Zoom controls and center adjustment
- Click-to-add markers functionality

### Key Components Used
- `GoogleMap` - Main map component
- `CustomMarker` - For placing markers
- Interactive controls for map customization

### Code Example
```tsx
<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={10}>
  <CustomMarker
    position={{lat: 30.0444, lng: 31.2357}}
    title="Cairo, Egypt"
  />
</GoogleMap>
```

---

## 3. Custom Markers Page (`/custom-markers`)

**File:** `src/pages/CustomMarkersPage.tsx`

### Purpose
Showcases different types of custom markers with various icons and styles.

### Features
- Multiple marker types (restaurant, hotel, attraction)
- Custom marker icons from Google Maps icon library
- Interactive marker placement by clicking on map
- Marker type selection before placement
- Clear and reset functionality
- Hover effects with titles

### Key Components Used
- `GoogleMap` - Map container
- `CustomMarker` - With custom icons
- `Button` - For controls
- `Card` - For UI organization

### Marker Types
- **Restaurant**: Red restaurant icon
- **Hotel**: Blue lodging icon  
- **Attraction**: Camera icon for tourist spots

### Code Example
```tsx
<CustomMarker
  position={{lat: 30.0444, lng: 31.2357}}
  title="Restaurant in Cairo"
  icon={{
    url: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
    scaledSize: new google.maps.Size(40, 40)
  }}
/>
```

---

## 4. Info Windows Page (`/info-windows`)

**File:** `src/pages/InfoWindowsPage.tsx`

### Purpose
Demonstrates rich info windows with images, ratings, and detailed content.

### Features
- Rich content info windows with images
- Star rating system
- Category badges
- Detailed descriptions
- Single info window policy (only one open at a time)
- Interactive action buttons within info windows
- Click markers to open/close info windows

### Key Components Used
- `GoogleMap` - Map container
- `CustomMarker` - Clickable markers
- `InfoWindow` - Rich content display
- Custom styling for content layout

### Info Window Content
- High-quality images
- Location titles and descriptions
- Star ratings (visual display)
- Category tags
- Action buttons

### Code Example
```tsx
<InfoWindow position={marker.position} onCloseClick={closeInfoWindow}>
  <div style={{ maxWidth: '300px', padding: '10px' }}>
    <img src={marker.image} alt={marker.title} />
    <h3>{marker.title}</h3>
    <div>Rating: {renderStars(marker.rating)}</div>
    <p>{marker.description}</p>
  </div>
</InfoWindow>
```

---

## 5. Polylines & Routes Page (`/polylines`)

**File:** `src/pages/PolylinesPage.tsx`

### Purpose
Shows how to draw routes and paths using polylines with interactive features.

### Features
- Multiple predefined routes (Historic Cairo Tour, Nile Corniche, Airport route)
- Custom route drawing by clicking on map
- Route selection and switching
- Distance calculation for routes
- Start/end/waypoint markers
- Different colors and stroke weights for routes
- Interactive drawing mode

### Key Components Used
- `GoogleMap` - Map container
- `Polyline` - For route visualization
- `CustomMarker` - For route points
- Drawing controls and route management

### Route Types
- **Historic Cairo Tour**: Red route through historical sites
- **Nile Corniche Route**: Blue scenic route along the Nile
- **Airport to Downtown**: Green direct route

### Code Example
```tsx
<Polyline
  path={routePath}
  strokeColor="#FF0000"
  strokeWeight={4}
  strokeOpacity={0.8}
/>
```

---

## 6. Polygons & Areas Page (`/polygons`)

**File:** `src/pages/PolygonsPage.tsx`

### Purpose
Demonstrates area mapping using polygons for zones and regions.

### Features
- Multiple predefined areas (Historic District, Nile Zone, Business District)
- Custom polygon drawing functionality
- Area calculation (approximate)
- Different fill colors and opacity levels
- Boundary markers showing vertices
- Center point markers
- Zone type categorization

### Key Components Used
- `GoogleMap` - Map container
- `Polygon` - For area visualization
- `CustomMarker` - For vertices and centers
- Area management controls

### Area Types
- **Historic Cairo District**: Red zone for historical areas
- **Nile River Zone**: Blue recreational zone
- **Business District**: Green commercial zone

### Code Example
```tsx
<Polygon
  paths={areaPaths}
  fillColor="#FF0000"
  fillOpacity={0.3}
  strokeColor="#AA0000"
  strokeWeight={2}
/>
```

---

## 7. Geolocation Page (`/geolocation`)

**File:** `src/pages/GeolocationPage.tsx`

### Purpose
Shows user location tracking and geolocation features.

### Features
- Get current location (one-time)
- Watch location continuously
- Location history tracking
- Accuracy circle display
- Movement distance calculation
- Location data display (coordinates, accuracy, altitude, speed, heading)
- Error handling for permission issues

### Key Components Used
- `GoogleMap` - Map container
- `CustomMarker` - For current and historical locations
- `useGeolocation` - Custom hook for location services
- Location history table

### Location Data
- Latitude/Longitude coordinates
- GPS accuracy in meters
- Altitude (when available)
- Speed and heading (when moving)
- Timestamp for each location

### Code Example
```tsx
const { location, error, loading, getCurrentLocation, watchLocation } = useGeolocation();

// Display current location
{location && (
  <CustomMarker
    position={{ lat: location.latitude, lng: location.longitude }}
    title={`Current Location (±${location.accuracy}m)`}
  />
)}
```

---

## 8. Directions Service Page (`/directions`)

**File:** `src/pages/DirectionsPage.tsx`

### Purpose
Implements route planning and turn-by-turn navigation using Google Directions API.

### Features
- Route calculation between two points
- Multiple travel modes (driving, walking, bicycling, transit)
- Turn-by-turn directions with detailed instructions
- Route visualization with polylines
- Distance and duration calculation
- Interactive step highlighting
- Predefined popular routes
- Origin/destination swapping

### Key Components Used
- `GoogleMap` - Map container
- `Polyline` - For route display
- `CustomMarker` - For origin/destination
- `DirectionsService` - For route calculation
- Turn-by-turn instructions interface

### Travel Modes
- **Driving**: Car routes with traffic considerations
- **Walking**: Pedestrian paths
- **Bicycling**: Bike-friendly routes
- **Transit**: Public transportation routes

### Predefined Routes
- Cairo to Alexandria
- Cairo to Luxor  
- Cairo Airport to Downtown
- Pyramids to Khan El Khalili

### Code Example
```tsx
const directionsService = new DirectionsService();

const result = await directionsService.getDirections(
  'Cairo, Egypt',
  'Alexandria, Egypt',
  google.maps.TravelMode.DRIVING
);

<Polyline
  path={result.routes[0].overview_path}
  strokeColor="#4285F4"
  strokeWeight={5}
/>
```

---

## Common Features Across All Screens

### Consistent UI Components
- **Card**: For organizing content sections
- **Button**: For interactive controls
- **InfoBox**: For status messages and information
- **CodeBlock**: For displaying implementation examples

### Navigation
- All screens are accessible through the main navigation
- Consistent layout with header and footer
- Responsive design for different screen sizes

### Error Handling
- Graceful error handling for API failures
- User-friendly error messages
- Loading states for async operations

### Documentation
- Each screen includes implementation code examples
- Feature lists explaining capabilities
- Best practices and usage notes

---

## Technical Implementation Notes

### State Management
- Each screen manages its own local state using React hooks
- No global state management needed for this POC
- Clean separation of concerns between components

### Performance Considerations
- Lazy loading of map components
- Efficient re-rendering with proper dependency arrays
- Cleanup of event listeners and watchers

### Accessibility
- Proper ARIA labels where applicable
- Keyboard navigation support
- Screen reader friendly content structure

### Browser Compatibility
- Modern browser support (ES6+)
- Graceful degradation for older browsers
- Mobile-responsive design

---

## Getting Started

1. **Prerequisites**: Ensure you have a valid Google Maps API key
2. **Environment Setup**: Configure the API key in your `.env` file
3. **Navigation**: Use the main navigation or home page cards to access different screens
4. **Interaction**: Each screen provides interactive controls and examples
5. **Learning**: Review the code examples and documentation for implementation details

---

## Future Enhancements

Potential additions to the map screens:

- **Clustering**: Marker clustering for large datasets
- **Heatmaps**: Data visualization with heat map overlays
- **Street View**: Integration with Google Street View
- **Places API**: Location search and place details
- **Real-time Updates**: Live tracking and updates
- **Offline Support**: Caching and offline map functionality

---

This documentation serves as a comprehensive guide for understanding and extending the map functionality in the project.