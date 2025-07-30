# Centralized Styling System Documentation

## Overview

This document explains the centralized styling system implemented to eliminate code duplication and provide consistent styling across all pages in the React Google Maps POC project.

## Problem Solved

### Before (Issues):
- **Code Duplication**: Each page had its own inline styles
- **Inconsistency**: Different pages used different spacing, colors, and layouts
- **Maintenance Difficulty**: Changing a style required updating multiple files
- **No Reusability**: Common patterns were recreated in each component

### After (Solutions):
- **Centralized Styles**: All styles defined in one place
- **Consistent Design**: Unified spacing, colors, and typography
- **Easy Maintenance**: Change once, apply everywhere
- **Reusable Components**: Common layouts and patterns as components

## Architecture

### 1. Style Utilities (`src/styles/pageStyles.ts`)

Centralized style objects organized by category:

```typescript
export const styles = {
  page: pageStyles,        // Page layout styles
  map: mapStyles,          // Map container styles
  controls: controlStyles, // Form controls layout
  cards: cardStyles,       // Card grid layouts
  stats: statsStyles,      // Statistics display
  lists: listStyles,       // List styling
  forms: formStyles,       // Form layouts
  utils: utilityStyles,    // Utility classes
  animations: animationStyles, // Animation effects
  responsive: responsiveStyles, // Responsive utilities
};
```

### 2. Layout Components

Reusable components that encapsulate common patterns:

- **PageLayout**: Main page structure
- **PageSection**: Section with title and content
- **ControlsPanel**: Form controls layout
- **MapContainer**: Consistent map wrapper

### 3. Theme System (`src/styles/theme.ts`)

Design tokens for consistent styling:

```typescript
export const theme = {
  colors: { /* color palette */ },
  spacing: { /* spacing scale */ },
  typography: { /* font styles */ },
  borderRadius: { /* border radius values */ },
  shadows: { /* shadow definitions */ },
  // ... more design tokens
};
```

## Usage Examples

### 1. Using PageLayout Component

**Before:**
```typescript
const MyPage: FC = () => {
  const pageStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  };

  const headerStyle = {
    marginBottom: '32px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: '16px',
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>My Page</h1>
        <p>Page description</p>
      </div>
      {/* content */}
    </div>
  );
};
```

**After:**
```typescript
import { PageLayout } from '../components/layout';

const MyPage: FC = () => {
  return (
    <PageLayout
      title="My Page"
      subtitle="Page description"
    >
      {/* content */}
    </PageLayout>
  );
};
```

### 2. Using PageSection Component

**Before:**
```typescript
const sectionStyle = {
  marginBottom: '32px',
};

const sectionTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#212121',
  marginBottom: '24px',
  borderBottom: '2px solid #1976d2',
  paddingBottom: '8px',
};

return (
  <div style={sectionStyle}>
    <h2 style={sectionTitleStyle}>🗺️ Interactive Map</h2>
    {/* content */}
  </div>
);
```

**After:**
```typescript
import { PageSection } from '../components/layout';

return (
  <PageSection title="🗺️ Interactive Map">
    {/* content */}
  </PageSection>
);
```

### 3. Using MapContainer Component

**Before:**
```typescript
const containerStyle = {
  width: '100%',
  height: '500px',
};

const mapContainerStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  overflow: 'hidden',
  marginBottom: '24px',
};

return (
  <div style={mapContainerStyle}>
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  </div>
);
```

**After:**
```typescript
import { MapContainer } from '../components/maps';

return (
  <MapContainer
    center={center}
    zoom={zoom}
    height="medium"
  >
    {children}
  </MapContainer>
);
```

### 4. Using Style Utilities

**Before:**
```typescript
const controlsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px',
  marginBottom: '24px',
};

const twoColumnStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  marginBottom: '24px',
};
```

**After:**
```typescript
import { styles } from '../styles/pageStyles';

// Use predefined styles
<div style={styles.controls.grid}>
<div style={styles.cards.twoColumn}>
<div style={styles.utils.marginBottom.lg}>
```

### 5. Using ControlsPanel Component

**Before:**
```typescript
const controlsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  marginBottom: '24px',
};

return (
  <div style={controlsStyle}>
    <Input label="Latitude" />
    <Input label="Longitude" />
    <Input label="Zoom" />
    <Button>Reset</Button>
  </div>
);
```

**After:**
```typescript
import { ControlsPanel } from '../components/layout';

return (
  <ControlsPanel layout="grid" columns={4}>
    <Input label="Latitude" />
    <Input label="Longitude" />
    <Input label="Zoom" />
    <Button>Reset</Button>
  </ControlsPanel>
);
```

## Style Categories

### 1. Page Styles (`styles.page`)

- `container`: Main page wrapper
- `header`: Page header section
- `title`: Main page title
- `subtitle`: Page subtitle
- `section`: Content section
- `sectionTitle`: Section heading

### 2. Map Styles (`styles.map`)

- `container`: Standard map container (500px height)
- `containerSmall`: Small map (400px height)
- `containerLarge`: Large map (600px height)
- `wrapper`: Map with border and shadow

### 3. Control Styles (`styles.controls`)

- `grid`: Grid layout for controls
- `flex`: Flex layout for controls
- `group`: Control group container
- `row`: Horizontal control row
- `buttonGroup`: Button group layout

### 4. Card Styles (`styles.cards`)

- `twoColumn`: Two column grid
- `threeColumn`: Three column grid
- `fourColumn`: Four column grid
- `autoFit`: Auto-fitting grid

### 5. Utility Styles (`styles.utils`)

- `textCenter`, `textLeft`, `textRight`: Text alignment
- `marginBottom`: Bottom margin utilities
- `padding`: Padding utilities
- `flexCenter`, `flexBetween`: Flex utilities
- `fullWidth`, `halfWidth`: Width utilities

## Component Props

### PageLayout Props

```typescript
interface PageLayoutProps {
  title: string;              // Page title
  subtitle?: string;          // Page subtitle
  children: ReactNode;        // Page content
  containerStyle?: React.CSSProperties; // Custom container style
  centerHeader?: boolean;     // Center header (default: true)
  maxWidth?: string;          // Container max width
  padding?: string;           // Custom padding
}
```

### PageSection Props

```typescript
interface PageSectionProps {
  title?: string;             // Section title
  subtitle?: string;          // Section subtitle
  children: ReactNode;        // Section content
  style?: React.CSSProperties; // Custom section style
  icon?: string | ReactNode;  // Section icon
  marginBottom?: boolean;     // Show bottom margin
  titleStyle?: React.CSSProperties; // Custom title style
  contentStyle?: React.CSSProperties; // Custom content style
}
```

### MapContainer Props

```typescript
interface MapContainerProps {
  center: LatLng;             // Map center
  zoom: number;               // Map zoom level
  height?: 'small' | 'medium' | 'large' | 'full'; // Height variant
  mapStyle?: React.CSSProperties; // Custom map style
  wrapperStyle?: React.CSSProperties; // Custom wrapper style
  onClick?: (event: google.maps.MapMouseEvent) => void; // Click handler
  options?: google.maps.MapOptions; // Map options
  children?: ReactNode;       // Map children
  styled?: boolean;           // Apply border/shadow
}
```

### ControlsPanel Props

```typescript
interface ControlsPanelProps {
  children: ReactNode;        // Panel content
  layout?: 'grid' | 'flex' | 'column'; // Layout type
  style?: React.CSSProperties; // Custom style
  columns?: number;           // Grid columns
  gap?: 'sm' | 'md' | 'lg';  // Gap size
  marginBottom?: boolean;     // Show bottom margin
}
```

## Migration Guide

### Step 1: Import New Components

```typescript
// Add these imports to your page
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
```

### Step 2: Replace Page Structure

```typescript
// Replace manual page structure
<div style={pageStyle}>
  <div style={headerStyle}>
    <h1 style={titleStyle}>Title</h1>
    <p style={subtitleStyle}>Subtitle</p>
  </div>
  {/* content */}
</div>

// With PageLayout component
<PageLayout title="Title" subtitle="Subtitle">
  {/* content */}
</PageLayout>
```

### Step 3: Replace Sections

```typescript
// Replace manual sections
<div style={sectionStyle}>
  <h2 style={sectionTitleStyle}>Section Title</h2>
  {/* content */}
</div>

// With PageSection component
<PageSection title="Section Title">
  {/* content */}
</PageSection>
```

### Step 4: Replace Map Containers

```typescript
// Replace manual map setup
<div style={mapWrapperStyle}>
  <LoadScript googleMapsApiKey={apiKey}>
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {children}
    </GoogleMap>
  </LoadScript>
</div>

// With MapContainer component
<MapContainer center={center} zoom={zoom} height="medium">
  {children}
</MapContainer>
```

### Step 5: Replace Control Layouts

```typescript
// Replace manual control layouts
<div style={controlsGridStyle}>
  {/* controls */}
</div>

// With ControlsPanel component
<ControlsPanel layout="grid" columns={4}>
  {/* controls */}
</ControlsPanel>
```

### Step 6: Use Style Utilities

```typescript
// Replace inline styles
<div style={{ marginBottom: '24px' }}>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

// With style utilities
<div style={styles.utils.marginBottom.lg}>
<div style={styles.cards.twoColumn}>
```

## Benefits

### 1. **Consistency**
- Unified spacing, colors, and typography
- Consistent component behavior
- Standardized layouts

### 2. **Maintainability**
- Single source of truth for styles
- Easy to update design system
- Centralized component logic

### 3. **Developer Experience**
- Less code to write
- Faster development
- Better IntelliSense support

### 4. **Performance**
- Reduced bundle size (no duplicate styles)
- Better tree shaking
- Optimized re-renders

### 5. **Scalability**
- Easy to add new style variants
- Consistent patterns for new pages
- Reusable across projects

## Best Practices

### 1. **Use Components First**
Always prefer layout components over manual styling:
```typescript
// ✅ Good
<PageLayout title="My Page">
  <PageSection title="Section">
    <ControlsPanel layout="grid">
      {/* content */}
    </ControlsPanel>
  </PageSection>
</PageLayout>

// ❌ Avoid
<div style={styles.page.container}>
  <div style={styles.page.header}>
    {/* manual structure */}
  </div>
</div>
```

### 2. **Combine Utilities**
Use style utilities for fine-tuning:
```typescript
// ✅ Good
<Card style={styles.utils.marginBottom.lg}>
<div style={{ ...styles.cards.twoColumn, ...customStyle }}>

// ❌ Avoid
<Card style={{ marginBottom: '32px' }}>
```

### 3. **Extend, Don't Override**
Extend existing styles rather than creating new ones:
```typescript
// ✅ Good
const customCardStyle = {
  ...styles.cards.twoColumn,
  backgroundColor: '#f5f5f5',
};

// ❌ Avoid
const customCardStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  backgroundColor: '#f5f5f5',
};
```

### 4. **Use Theme Values**
Always use theme values for consistency:
```typescript
// ✅ Good
import { theme } from '../styles/theme';
const customStyle = {
  padding: theme.spacing.lg,
  color: theme.colors.primary,
};

// ❌ Avoid
const customStyle = {
  padding: '24px',
  color: '#1976d2',
};
```

## Future Enhancements

### 1. **CSS-in-JS Integration**
- Styled-components or Emotion integration
- Theme provider for runtime theming
- Better TypeScript support

### 2. **Design System**
- Storybook integration
- Component documentation
- Design tokens export

### 3. **Responsive Utilities**
- Breakpoint-specific styles
- Mobile-first approach
- Container queries

### 4. **Animation System**
- Predefined animations
- Transition utilities
- Motion components

This centralized styling system provides a solid foundation for consistent, maintainable, and scalable styling across the entire application.