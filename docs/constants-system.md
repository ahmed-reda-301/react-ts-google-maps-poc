# Constants System Documentation

## Overview

This document explains the centralized constants system implemented to eliminate code duplication and provide consistent data across all pages in the React Google Maps POC project.

## Problem Solved

### Before (Issues):
- **Code Duplication**: Same constants defined in multiple files
- **Inconsistency**: Different values for the same concept across pages
- **Maintenance Difficulty**: Updating a constant required changing multiple files
- **No Single Source of Truth**: Constants scattered throughout the codebase
- **Hard to Find**: Difficult to locate where constants are defined

### After (Solutions):
- **Centralized Constants**: All constants defined in one place
- **Consistent Values**: Same constants used across all pages
- **Easy Maintenance**: Change once, apply everywhere
- **Single Source of Truth**: One location for all constant definitions
- **Easy Discovery**: Clear organization and barrel exports

## Architecture

### Constants Folder Structure

```
src/constants/
├── index.ts                 # Barrel export file
├── mapConstants.ts          # Map-related constants
├── locationConstants.ts     # Geographic coordinates and locations
├── markerConstants.ts       # Marker icons and configurations
├── uiConstants.ts          # UI text, labels, and messages
└── codeExamples.ts         # Code snippets for documentation
```

### 1. Map Constants (`mapConstants.ts`)

Map configuration and styling constants:

```typescript
export const MAP_CONTAINER_STYLES = {
  default: { width: '100%', height: '500px' },
  small: { width: '100%', height: '400px' },
  large: { width: '100%', height: '600px' },
  fullHeight: { width: '100%', height: '100vh' },
};

export const MAP_ZOOM_LEVELS = {
  world: 2,
  continent: 4,
  country: 6,
  region: 8,
  city: 10,
  district: 12,
  street: 14,
  building: 16,
  detail: 18,
  maximum: 20,
};

export const DEFAULT_MAP_OPTIONS = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
};
```

### 2. Location Constants (`locationConstants.ts`)

Geographic coordinates and location data:

```typescript
export const SAUDI_ARABIA_LOCATIONS = {
  center: { lat: 24.7136, lng: 46.6753 }, // Riyadh
  riyadh: { lat: 24.7136, lng: 46.6753 },
  jeddah: { lat: 21.3891, lng: 39.8579 },
  mecca: { lat: 21.3891, lng: 39.8579 },
  medina: { lat: 24.4539, lng: 39.6775 },
  dammam: { lat: 26.4207, lng: 50.0888 },
  // ... more cities
};

export const EGYPT_LOCATIONS = {
  cairo: { lat: 30.0444, lng: 31.2357 },
  alexandria: { lat: 31.2001, lng: 29.9187 },
  luxor: { lat: 25.6872, lng: 32.6396 },
  // ... more cities
};

export const DEMO_ROUTES = {
  egypt: [
    {
      name: 'Cairo to Alexandria',
      origin: 'Cairo, Egypt',
      destination: 'Alexandria, Egypt',
      coordinates: {
        start: EGYPT_LOCATIONS.cairo,
        end: EGYPT_LOCATIONS.alexandria,
      },
    },
    // ... more routes
  ],
};
```

### 3. Marker Constants (`markerConstants.ts`)

Marker icons, categories, and configurations:

```typescript
export const MARKER_ICONS = {
  // Basic markers
  default: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  blue: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  green: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  
  // Category-specific markers
  restaurant: 'https://maps.google.com/mapfiles/ms/icons/restaurant.png',
  hotel: 'https://maps.google.com/mapfiles/ms/icons/lodging.png',
  attraction: 'https://maps.google.com/mapfiles/ms/icons/camera.png',
  // ... more icons
};

export const MARKER_CATEGORIES = {
  restaurant: {
    icon: MARKER_ICONS.restaurant,
    label: 'Restaurant',
    color: '#FF5722',
  },
  hotel: {
    icon: MARKER_ICONS.hotel,
    label: 'Hotel',
    color: '#2196F3',
  },
  // ... more categories
};

// Helper functions
export const getMarkerIcon = (category: string): string => {
  return MARKER_CATEGORIES[category]?.icon || MARKER_ICONS.default;
};
```

### 4. UI Constants (`uiConstants.ts`)

UI text, labels, messages, and content:

```typescript
export const PAGE_CONTENT = {
  basicMap: {
    title: 'Basic Google Maps Integration',
    subtitle: 'Learn the fundamentals of integrating Google Maps with React and TypeScript',
  },
  customMarkers: {
    title: 'Custom Markers Demo',
    subtitle: 'This page demonstrates how to implement custom markers with different styles and types.',
  },
  // ... more page content
};

export const UI_LABELS = {
  latitude: 'Latitude',
  longitude: 'Longitude',
  zoomLevel: 'Zoom Level',
  reset: 'Reset to Default',
  clear: 'Clear All',
  // ... more labels
};

export const ERROR_MESSAGES = {
  apiKeyMissing: 'Google Maps API key is required',
  locationNotFound: 'Location not found',
  invalidCoordinates: 'Invalid coordinates',
  // ... more error messages
};

export const TRAVEL_MODES = {
  driving: { value: 'DRIVING', label: 'Driving', icon: '🚗' },
  walking: { value: 'WALKING', label: 'Walking', icon: '🚶' },
  bicycling: { value: 'BICYCLING', label: 'Bicycling', icon: '🚴' },
  transit: { value: 'TRANSIT', label: 'Transit', icon: '🚌' },
};
```

### 5. Code Examples (`codeExamples.ts`)

Code snippets for documentation:

```typescript
export const CODE_EXAMPLES = {
  basicSetup: `import React, { FC, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};`,

  customMarkerUsage: `<GoogleMap center={{lat: 30.0444, lng: 31.2357}} zoom={12}>
  <CustomMarker
    position={{lat: 30.0444, lng: 31.2357}}
    title="Restaurant in Cairo"
    icon={{
      url: '/icons/restaurant.png',
      scaledSize: new google.maps.Size(40, 40)
    }}
  />
</GoogleMap>`,
  // ... more code examples
};
```

## Usage Examples

### Before (Duplicated Constants)

```typescript
// In BasicMapPage.tsx
const defaultCenter = { lat: 24.7136, lng: 46.6753 };
const containerStyle = { width: '100%', height: '500px' };

// In CustomMarkersPage.tsx  
const defaultCenter = { lat: 24.7136, lng: 46.6753 }; // Duplicate!
const containerStyle = { width: '100%', height: '500px' }; // Duplicate!

// In DirectionsPage.tsx
const mapCenter = { lat: 30.0444, lng: 31.2357 }; // Different location
const containerStyle = { width: '100%', height: '500px' }; // Duplicate!
```

### After (Centralized Constants)

```typescript
// Import from constants
import { 
  SAUDI_ARABIA_LOCATIONS, 
  EGYPT_LOCATIONS,
  MAP_CONTAINER_STYLES,
  PAGE_CONTENT,
  UI_LABELS 
} from '../constants';

// Use in BasicMapPage.tsx
const [mapCenter, setMapCenter] = useState(SAUDI_ARABIA_LOCATIONS.riyadh);

// Use in CustomMarkersPage.tsx
<MapContainer center={EGYPT_LOCATIONS.cairo} />

// Use in DirectionsPage.tsx
<PageLayout title={PAGE_CONTENT.directions.title} />
```

## Benefits

### 1. **Consistency**
- Same coordinates used across all pages
- Consistent UI text and labels
- Unified styling values

### 2. **Maintainability**
- Change a location once, updates everywhere
- Easy to update UI text
- Single place to modify configurations

### 3. **Developer Experience**
- IntelliSense support for constants
- Easy to discover available options
- Clear organization and naming

### 4. **Reduced Errors**
- No typos in repeated values
- Type safety with TypeScript
- Compile-time error checking

### 5. **Better Organization**
- Logical grouping of related constants
- Clear separation of concerns
- Easy to find and understand

## Migration Guide

### Step 1: Import Constants

```typescript
// Replace individual constants
const defaultCenter = { lat: 24.7136, lng: 46.6753 };
const containerStyle = { width: '100%', height: '500px' };

// With imported constants
import { SAUDI_ARABIA_LOCATIONS, MAP_CONTAINER_STYLES } from '../constants';
```

### Step 2: Replace Hardcoded Values

```typescript
// Replace hardcoded coordinates
center={{ lat: 24.7136, lng: 46.6753 }}

// With named constants
center={SAUDI_ARABIA_LOCATIONS.riyadh}
```

### Step 3: Replace UI Text

```typescript
// Replace hardcoded text
<Button>Reset to Default</Button>
title="Basic Google Maps Integration"

// With constants
<Button>{UI_LABELS.reset}</Button>
title={PAGE_CONTENT.basicMap.title}
```

### Step 4: Replace Code Examples

```typescript
// Replace inline code strings
<CodeBlock>
{`const center = { lat: 24.7136, lng: 46.6753 };`}
</CodeBlock>

// With constants
<CodeBlock>
{CODE_EXAMPLES.basicSetup}
</CodeBlock>
```

## Best Practices

### 1. **Use Descriptive Names**
```typescript
// ✅ Good
export const SAUDI_ARABIA_LOCATIONS = {
  riyadh: { lat: 24.7136, lng: 46.6753 },
};

// ❌ Avoid
export const LOCATIONS = {
  loc1: { lat: 24.7136, lng: 46.6753 },
};
```

### 2. **Group Related Constants**
```typescript
// ✅ Good - grouped by category
export const MARKER_ICONS = { /* all icons */ };
export const MARKER_CATEGORIES = { /* all categories */ };

// ❌ Avoid - mixed constants
export const CONSTANTS = {
  icon1: '...',
  pageTitle: '...',
  coordinate: { lat: 1, lng: 2 },
};
```

### 3. **Use TypeScript for Type Safety**
```typescript
// ✅ Good - typed constants
export const MAP_ZOOM_LEVELS = {
  city: 10,
  street: 14,
} as const;

// ❌ Avoid - untyped
export const zoomLevels = {
  city: 10,
  street: 14,
};
```

### 4. **Provide Helper Functions**
```typescript
// ✅ Good - helper functions
export const getMarkerIcon = (category: string): string => {
  return MARKER_CATEGORIES[category]?.icon || MARKER_ICONS.default;
};

// Usage
const icon = getMarkerIcon('restaurant');
```

### 5. **Use Barrel Exports**
```typescript
// constants/index.ts
export * from './mapConstants';
export * from './locationConstants';
export * from './markerConstants';
export * from './uiConstants';

// Usage - single import
import { LOCATIONS, UI_LABELS, MARKER_ICONS } from '../constants';
```

## Adding New Constants

### 1. **Choose the Right File**
- **Map-related**: `mapConstants.ts`
- **Locations/coordinates**: `locationConstants.ts`
- **Markers/icons**: `markerConstants.ts`
- **UI text/labels**: `uiConstants.ts`
- **Code snippets**: `codeExamples.ts`

### 2. **Follow Naming Conventions**
- Use UPPER_SNAKE_CASE for constant objects
- Use descriptive names
- Group related constants together

### 3. **Add TypeScript Types**
```typescript
export const NEW_CONSTANTS = {
  value1: 'string',
  value2: 123,
} as const;

// Optional: create type
export type NewConstantKeys = keyof typeof NEW_CONSTANTS;
```

### 4. **Update Barrel Export**
```typescript
// constants/index.ts
export * from './newConstants';
```

### 5. **Document Usage**
Add examples and documentation for new constants.

## Performance Considerations

### 1. **Tree Shaking**
- Use named exports for better tree shaking
- Avoid importing entire constant objects when only one value is needed

### 2. **Bundle Size**
- Keep constants lean and focused
- Avoid large data structures in constants
- Consider lazy loading for large datasets

### 3. **Memory Usage**
- Use `as const` for immutable constants
- Avoid creating new objects in constants

## Future Enhancements

### 1. **Environment-Specific Constants**
```typescript
export const API_ENDPOINTS = {
  development: 'http://localhost:3000',
  production: 'https://api.example.com',
};
```

### 2. **Internationalization**
```typescript
export const UI_LABELS = {
  en: { reset: 'Reset to Default' },
  ar: { reset: 'إعادة تعيين إلى الافتراضي' },
};
```

### 3. **Theme-Based Constants**
```typescript
export const THEME_COLORS = {
  light: { primary: '#1976d2' },
  dark: { primary: '#42a5f5' },
};
```

This centralized constants system provides a solid foundation for consistent, maintainable, and scalable constant management across the entire application.