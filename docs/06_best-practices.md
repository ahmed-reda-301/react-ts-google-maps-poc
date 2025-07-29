# Best Practices Documentation

This document outlines the coding standards, architectural decisions, and best practices used in the React Google Maps POC project.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [React Best Practices](#react-best-practices)
3. [TypeScript Guidelines](#typescript-guidelines)
4. [Component Design Patterns](#component-design-patterns)
5. [State Management](#state-management)
6. [Performance Optimization](#performance-optimization)
7. [Code Organization](#code-organization)
8. [Styling Guidelines](#styling-guidelines)
9. [Testing Strategy](#testing-strategy)
10. [Security Considerations](#security-considerations)
11. [Accessibility Standards](#accessibility-standards)
12. [Documentation Standards](#documentation-standards)

## Project Architecture

### Folder Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Generic UI components
│   ├── maps/           # Map-specific components
│   └── layout/         # Layout components
├── pages/              # Page components (route handlers)
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── styles/             # Theme, constants, and global styles
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # Application constants
```

### Architectural Principles

1. **Separation of Concerns**: Each module has a single responsibility
2. **Component Composition**: Build complex UIs from simple, reusable components
3. **Dependency Injection**: Pass dependencies through props or context
4. **Single Source of Truth**: Centralize state management
5. **Immutability**: Avoid mutating state directly

## React Best Practices

### Component Design

#### 1. Functional Components with Hooks

```tsx
// ✅ Good: Use functional components with hooks
const MapComponent: FC<MapProps> = ({ center, zoom, onMapClick }) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    onMapClick?.(event);
  }, [onMapClick]);

  return (
    <GoogleMap
      center={center}
      zoom={zoom}
      onClick={handleMapClick}
    />
  );
};

// ❌ Avoid: Class components (unless necessary)
class MapComponent extends Component<MapProps> {
  // Avoid for new components
}
```

#### 2. Props Interface Design

```tsx
// ✅ Good: Clear, well-documented interfaces
interface ButtonProps {
  /** Button text or content */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

// ❌ Avoid: Unclear or overly complex interfaces
interface ButtonProps {
  children: any;
  type: string;
  config: object;
}
```

#### 3. Event Handling

```tsx
// ✅ Good: Use useCallback for event handlers
const MapPage: FC = () => {
  const [center, setCenter] = useState({ lat: 24.7136, lng: 46.6753 });

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    }
  }, []);

  return <GoogleMap center={center} onClick={handleMapClick} />;
};

// ❌ Avoid: Inline functions (causes unnecessary re-renders)
const MapPage: FC = () => {
  const [center, setCenter] = useState({ lat: 24.7136, lng: 46.6753 });

  return (
    <GoogleMap 
      center={center} 
      onClick={(event) => {
        // This creates a new function on every render
        setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      }} 
    />
  );
};
```

#### 4. Conditional Rendering

```tsx
// ✅ Good: Clear conditional rendering
const MapControls: FC<{ isLoading: boolean; error?: string }> = ({ isLoading, error }) => {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <ControlPanel />;
};

// ✅ Good: Short-circuit evaluation for simple conditions
const MapComponent: FC = () => (
  <div>
    {isLoaded && <GoogleMap />}
    {markers.length > 0 && <MarkersList markers={markers} />}
  </div>
);
```

### Custom Hooks

#### 1. Hook Design Principles

```tsx
// ✅ Good: Custom hook with clear return interface
interface UseGeolocationReturn {
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  loading: boolean;
  getCurrentPosition: () => void;
}

const useGeolocation = (): UseGeolocationReturn => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [loading, setLoading] = useState(false);
ل
  const getCurrentPosition = useCallback(() => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

  return { position, error, loading, getCurrentPosition };
};
```

#### 2. Hook Dependencies

```tsx
// ✅ Good: Proper dependency management
const useMapData = (apiKey: string, location: LatLng) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!apiKey || !location) return;

    fetchMapData(apiKey, location).then(setData);
  }, [apiKey, location]); // Include all dependencies

  return data;
};

// ❌ Avoid: Missing dependencies
const useMapData = (apiKey: string, location: LatLng) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMapData(apiKey, location).then(setData);
  }, []); // Missing dependencies - will cause stale closures
};
```

## TypeScript Guidelines

### 1. Type Definitions

```tsx
// ✅ Good: Explicit, descriptive types
interface MapMarker {
  id: string;
  position: LatLng;
  title: string;
  description?: string;
  category: 'restaurant' | 'hotel' | 'attraction' | 'hospital' | 'school';
  customIcon?: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

// ✅ Good: Generic types for reusability
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// ❌ Avoid: Using 'any' type
interface MapMarker {
  id: any;
  position: any;
  data: any;
}
```

### 2. Union Types and Enums

```tsx
// ✅ Good: Union types for specific values
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type MapType = 'roadmap' | 'satellite' | 'hybrid' | 'terrain';

// ✅ Good: Enums for related constants
enum MarkerCategory {
  RESTAURANT = 'restaurant',
  HOTEL = 'hotel',
  ATTRACTION = 'attraction',
  HOSPITAL = 'hospital',
  SCHOOL = 'school'
}

// ✅ Good: Const assertions for immutable data
const MAP_STYLES = {
  DARK: 'dark',
  LIGHT: 'light',
  SATELLITE: 'satellite'
} as const;

type MapStyle = typeof MAP_STYLES[keyof typeof MAP_STYLES];
```

### 3. Utility Types

```tsx
// ✅ Good: Use utility types for type transformations
interface MapConfig {
  center: LatLng;
  zoom: number;
  mapType: MapType;
  controls: boolean;
}

// Create partial type for updates
type MapConfigUpdate = Partial<MapConfig>;

// Pick specific properties
type MapPosition = Pick<MapConfig, 'center' | 'zoom'>;

// Omit properties
type MapDisplay = Omit<MapConfig, 'controls'>;
```

## Component Design Patterns

### 1. Compound Components

```tsx
// ✅ Good: Compound component pattern
const Card = ({ children, ...props }: CardProps) => (
  <div className="card" {...props}>
    {children}
  </div>
);

Card.Header = ({ children }: { children: ReactNode }) => (
  <div className="card-header">{children}</div>
);

Card.Body = ({ children }: { children: ReactNode }) => (
  <div className="card-body">{children}</div>
);

Card.Footer = ({ children }: { children: ReactNode }) => (
  <div className="card-footer">{children}</div>
);

// Usage
<Card>
  <Card.Header>
    <h3>Map Configuration</h3>
  </Card.Header>
  <Card.Body>
    <MapSettings />
  </Card.Body>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

### 2. Render Props Pattern

```tsx
// ✅ Good: Render props for flexible rendering
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: string | null) => ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
};

// Usage
<DataFetcher<MapData> url="/api/map-data">
  {(data, loading, error) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    return <MapComponent data={data} />;
  }}
</DataFetcher>
```

### 3. Higher-Order Components (HOCs)

```tsx
// ✅ Good: HOC for cross-cutting concerns
const withErrorBoundary = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Usage
const SafeMapComponent = withErrorBoundary(MapComponent);
```

## State Management

### 1. Local State vs Global State

```tsx
// ✅ Good: Use local state for component-specific data
const MapControls: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool>('pan');

  return (
    <div>
      <Button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </Button>
      {isExpanded && <ToolPanel selectedTool={selectedTool} />}
    </div>
  );
};

// ✅ Good: Use context for shared state
const MapContext = createContext<MapContextValue | null>(null);

const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  const value = {
    mapInstance,
    setMapInstance,
    markers,
    setMarkers
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};
```

### 2. State Updates

```tsx
// ✅ Good: Immutable state updates
const useMarkers = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const addMarker = useCallback((marker: Marker) => {
    setMarkers(prev => [...prev, marker]);
  }, []);

  const updateMarker = useCallback((id: string, updates: Partial<Marker>) => {
    setMarkers(prev => 
      prev.map(marker => 
        marker.id === id ? { ...marker, ...updates } : marker
      )
    );
  }, []);

  const removeMarker = useCallback((id: string) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
  }, []);

  return { markers, addMarker, updateMarker, removeMarker };
};
```

## Performance Optimization

### 1. Memoization

```tsx
// ✅ Good: Memoize expensive calculations
const MapComponent: FC<MapProps> = ({ markers, filters }) => {
  const filteredMarkers = useMemo(() => {
    return markers.filter(marker => {
      return filters.categories.includes(marker.category) &&
             marker.position.lat >= filters.bounds.south &&
             marker.position.lat <= filters.bounds.north;
    });
  }, [markers, filters]);

  return <GoogleMap markers={filteredMarkers} />;
};

// ✅ Good: Memoize components
const MarkerComponent = memo<MarkerProps>(({ marker, onClick }) => {
  return (
    <Marker
      position={marker.position}
      title={marker.title}
      onClick={() => onClick(marker)}
    />
  );
});
```

### 2. Code Splitting

```tsx
// ✅ Good: Lazy load heavy components
const AdvancedMapDemo = lazy(() => import('./components/AdvancedMapDemo'));
const DirectionsPanel = lazy(() => import('./components/DirectionsPanel'));

const MapPage: FC = () => {
  return (
    <div>
      <BasicMapComponent />
      <Suspense fallback={<LoadingSpinner />}>
        <AdvancedMapDemo />
      </Suspense>
    </div>
  );
};
```

### 3. Bundle Optimization

```tsx
// ✅ Good: Tree-shakable imports
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';

// ❌ Avoid: Importing entire libraries
import * as UI from './components/ui';
```

## Code Organization

### 1. File Naming Conventions

```
// ✅ Good: Consistent naming
components/
├── ui/
│   ├── Button.tsx          # PascalCase for components
│   ├── Card.tsx
│   └── index.ts            # Barrel exports
├── maps/
│   ├── GoogleMap.tsx
│   └── CustomMarker.tsx
pages/
├── HomePage.tsx            # PascalCase for pages
├── BasicMapPage.tsx
└── AdvancedMapPage.tsx
hooks/
├── useGeolocation.ts       # camelCase with 'use' prefix
└── useMapData.ts
utils/
├── formatCoordinates.ts    # camelCase for utilities
└── mapHelpers.ts
```

### 2. Import Organization

```tsx
// ✅ Good: Organized imports
// React imports first
import React, { FC, useState, useCallback, useMemo } from 'react';

// Third-party library imports
import { GoogleMap, Marker } from '@react-google-maps/api';

// Internal imports (absolute paths)
import { Button, Card, InfoBox } from '../components/ui';
import { useGeolocation } from '../hooks/useGeolocation';
import { theme } from '../styles/theme';
import { MapProps, MarkerData } from '../types/maps';

// Relative imports last
import './MapPage.css';
```

### 3. Barrel Exports

```tsx
// src/components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { CodeBlock } from './CodeBlock';
export { InfoBox } from './InfoBox';

// Usage
import { Button, Card, Input } from '../components/ui';
```

## Styling Guidelines

### 1. Theme System

```tsx
// ✅ Good: Centralized theme
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  typography: {
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  }
} as const;
```

### 2. Component Styling

```tsx
// ✅ Good: Style objects with theme
const getButtonStyles = (variant: ButtonVariant, size: ButtonSize) => ({
  base: {
    padding: theme.spacing[size],
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize[size],
    fontWeight: theme.typography.fontWeight.medium,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  variants: {
    primary: {
      backgroundColor: theme.colors.primary[500],
      color: theme.colors.white,
      '&:hover': {
        backgroundColor: theme.colors.primary[600],
      },
    },
    secondary: {
      backgroundColor: theme.colors.gray[100],
      color: theme.colors.gray[900],
      '&:hover': {
        backgroundColor: theme.colors.gray[200],
      },
    },
  },
});
```

## Testing Strategy

### 1. Unit Testing

```tsx
// ✅ Good: Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

```tsx
// ✅ Good: Integration testing
import { render, screen, waitFor } from '@testing-library/react';
import { MapPage } from './MapPage';

// Mock Google Maps API
jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children, onLoad }: any) => {
    useEffect(() => {
      onLoad?.({});
    }, [onLoad]);
    return <div data-testid="google-map">{children}</div>;
  },
  Marker: ({ position }: any) => (
    <div data-testid="marker">{position.lat},{position.lng}</div>
  ),
}));

describe('MapPage Integration', () => {
  it('renders map with markers', async () => {
    render(<MapPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });
    
    expect(screen.getAllByTestId('marker')).toHaveLength(3);
  });
});
```

## Security Considerations

### 1. API Key Management

```tsx
// ✅ Good: Environment variables
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('Google Maps API key is required');
}

// ✅ Good: API key restrictions
// Set up API key restrictions in Google Cloud Console:
// - HTTP referrers (web sites)
// - API restrictions (Maps JavaScript API only)
```

### 2. Input Validation

```tsx
// ✅ Good: Validate user inputs
const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

const MapComponent: FC = () => {
  const handleCoordinateInput = (lat: string, lng: string) => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    
    if (!validateCoordinates(latNum, lngNum)) {
      setError('Invalid coordinates');
      return;
    }
    
    setCenter({ lat: latNum, lng: lngNum });
  };
};
```

## Accessibility Standards

### 1. Semantic HTML

```tsx
// ✅ Good: Semantic HTML structure
const MapControls: FC = () => (
  <nav aria-label="Map controls">
    <ul role="list">
      <li>
        <button 
          type="button"
          aria-label="Zoom in"
          onClick={handleZoomIn}
        >
          +
        </button>
      </li>
      <li>
        <button 
          type="button"
          aria-label="Zoom out"
          onClick={handleZoomOut}
        >
          -
        </button>
      </li>
    </ul>
  </nav>
);
```

### 2. ARIA Attributes

```tsx
// ✅ Good: Proper ARIA attributes
const InfoBox: FC<InfoBoxProps> = ({ variant, title, children, dismissible }) => (
  <div
    role="alert"
    aria-live="polite"
    aria-labelledby={title ? 'info-title' : undefined}
    className={`info-box info-box--${variant}`}
  >
    {title && <h3 id="info-title">{title}</h3>}
    <div>{children}</div>
    {dismissible && (
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        ×
      </button>
    )}
  </div>
);
```

### 3. Keyboard Navigation

```tsx
// ✅ Good: Keyboard support
const MapMarker: FC<MarkerProps> = ({ marker, onClick }) => (
  <button
    type="button"
    className="map-marker"
    onClick={() => onClick(marker)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(marker);
      }
    }}
    aria-label={`Marker: ${marker.title}`}
  >
    📍
  </button>
);
```

## Documentation Standards

### 1. Component Documentation

```tsx
/**
 * A reusable button component with multiple variants and sizes.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Save Changes
 * </Button>
 * ```
 */
interface ButtonProps {
  /** Button content */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  onClick,
  ...props
}) => {
  // Component implementation
};
```

### 2. README Documentation

```markdown
# Component Name

Brief description of what the component does.

## Usage

```tsx
import { ComponentName } from './ComponentName';

<ComponentName prop1="value1" prop2="value2">
  Content
</ComponentName>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | 'default' | Description of prop1 |
| prop2 | boolean | false | Description of prop2 |

## Examples

### Basic Usage
[Example code]

### Advanced Usage
[Example code]
```

This comprehensive best practices guide ensures consistent, maintainable, and scalable code across the entire project.