# Component Documentation

This document provides comprehensive documentation for all reusable components in the React Google Maps POC project.

## Table of Contents

1. [UI Components](#ui-components)
2. [Map Components](#map-components)
3. [Layout Components](#layout-components)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

## UI Components

### Button Component

**Location:** `src/components/ui/Button.tsx`

A reusable button component with multiple variants and sizes.

#### Props

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
}
```

#### Usage Examples

```tsx
// Basic primary button
<Button variant="primary" onClick={handleClick}>
  Save Changes
</Button>

// Button with icon and loading state
<Button 
  variant="outline" 
  startIcon="🔍" 
  loading={isSearching}
  onClick={handleSearch}
>
  Search
</Button>

// Full width danger button
<Button variant="danger" fullWidth>
  Delete Account
</Button>
```

#### Variants

- **primary**: Blue background, white text
- **secondary**: Light gray background, dark text
- **outline**: Transparent background, colored border
- **ghost**: Transparent background, no border
- **danger**: Red background, white text

### Card Component

**Location:** `src/components/ui/Card.tsx`

A flexible container component for grouping related content.

#### Props

```typescript
interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}
```

#### Usage Examples

```tsx
// Basic card with title
<Card title="Map Configuration" subtitle="Adjust map settings">
  <p>Card content goes here</p>
</Card>

// Clickable card with hover effect
<Card 
  variant="outlined" 
  hoverable 
  clickable 
  onClick={handleCardClick}
>
  <h3>Interactive Card</h3>
  <p>Click me!</p>
</Card>

// Card with custom header and footer
<Card
  header={<CustomHeader />}
  footer={<CustomFooter />}
  padding="lg"
>
  <div>Main content</div>
</Card>
```

### Input Component

**Location:** `src/components/ui/Input.tsx`

A comprehensive input component with labels, validation, and icons.

#### Props

```typescript
interface InputProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  required?: boolean;
}
```

#### Usage Examples

```tsx
// Basic input with label
<Input
  label="Latitude"
  type="number"
  value={latitude}
  onChange={handleLatitudeChange}
  placeholder="Enter latitude"
/>

// Input with validation
<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={handleEmailChange}
  error={emailError}
  helperText="We'll never share your email"
  required
/>

// Input with icons
<Input
  label="Search Location"
  startIcon="🔍"
  endIcon="📍"
  value={searchQuery}
  onChange={handleSearch}
/>
```

### CodeBlock Component

**Location:** `src/components/ui/CodeBlock.tsx`

A syntax-highlighted code display component with copy functionality.

#### Props

```typescript
interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
  showLineNumbers?: boolean;
  maxHeight?: string;
  filename?: string;
}
```

#### Usage Examples

```tsx
// Basic code block
<CodeBlock language="typescript" title="Basic Setup">
  {`const map = new GoogleMap({
    center: { lat: 24.7136, lng: 46.6753 },
    zoom: 10
  });`}
</CodeBlock>

// Code block with filename and line numbers
<CodeBlock
  language="javascript"
  filename="map-config.js"
  showLineNumbers
  showCopy
>
  {codeString}
</CodeBlock>
```

### InfoBox Component

**Location:** `src/components/ui/InfoBox.tsx`

A contextual information component for tips, warnings, and alerts.

#### Props

```typescript
interface InfoBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'tip';
  title?: string;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}
```

#### Usage Examples

```tsx
// Information box
<InfoBox variant="info" title="💡 What you'll learn">
  <ul>
    <li>How to set up Google Maps</li>
    <li>Basic configuration options</li>
  </ul>
</InfoBox>

// Warning with dismiss functionality
<InfoBox 
  variant="warning" 
  title="⚠️ API Key Required"
  dismissible
  onDismiss={handleDismiss}
>
  <p>You need a valid API key to use this feature.</p>
</InfoBox>

// Custom icon
<InfoBox variant="tip" icon="🚀" title="Pro Tip">
  <p>Use environment variables for API keys in production.</p>
</InfoBox>
```

## Map Components

### GoogleMap Component

**Location:** `src/components/maps/GoogleMap.tsx`

Main Google Maps wrapper component with TypeScript support.

#### Props

```typescript
interface MapProps {
  center: LatLng;
  zoom: number;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  style?: React.CSSProperties;
  markers?: MarkerProps[];
}
```

#### Usage Examples

```tsx
<GoogleMapComponent
  center={{ lat: 24.7136, lng: 46.6753 }}
  zoom={13}
  markers={[
    {
      id: '1',
      position: { lat: 24.7136, lng: 46.6753 },
      title: 'Riyadh'
    }
  ]}
  onClick={handleMapClick}
/>
```

### CustomMarker Component

**Location:** `src/components/maps/CustomMarker.tsx`

Enhanced marker component with custom icons and animations.

#### Props

```typescript
interface CustomMarkerProps extends MarkerProps {
  customIcon?: string | google.maps.Icon | google.maps.Symbol;
  animation?: google.maps.Animation;
  scale?: number;
  color?: string;
  category?: 'restaurant' | 'hotel' | 'attraction' | 'hospital' | 'school' | 'custom';
}
```

#### Usage Examples

```tsx
<CustomMarker
  id="marker-1"
  position={{ lat: 24.7136, lng: 46.6753 }}
  category="restaurant"
  color="red"
  animation={google.maps.Animation.BOUNCE}
  title="Al Najeel Restaurant"
/>
```

### InfoWindow Component

**Location:** `src/components/maps/InfoWindow.tsx`

Rich info window component with templates and interactive content.

#### Props

```typescript
interface InfoWindowProps {
  position: LatLng;
  content: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  options?: google.maps.InfoWindowOptions;
  template?: 'default' | 'detailed' | 'minimal' | 'custom';
}
```

#### Usage Examples

```tsx
<InfoWindow
  position={{ lat: 24.7136, lng: 46.6753 }}
  visible={showInfo}
  onClose={() => setShowInfo(false)}
  content={
    <DetailedTemplate
      title="Al Najeel Restaurant"
      description="Traditional Saudi cuisine"
      image="/images/restaurant.jpg"
      actions={[
        { label: 'View Menu', onClick: showMenu, type: 'primary' },
        { label: 'Get Directions', onClick: getDirections, type: 'secondary' }
      ]}
    />
  }
/>
```

## Layout Components

### Header Component

**Location:** `src/components/layout/Header.tsx`

Main navigation header with responsive menu.

#### Features

- Sticky navigation
- Active route highlighting
- Responsive design
- Project branding

#### Usage

```tsx
import Header from './components/layout/Header';

// Used automatically in Layout component
<Header />
```

### Footer Component

**Location:** `src/components/layout/Footer.tsx`

Footer with project information and useful links.

#### Features

- Project information
- Technology stack display
- Useful resource links
- Responsive grid layout

### Layout Component

**Location:** `src/components/layout/Layout.tsx`

Main layout wrapper that combines header, main content, and footer.

#### Usage

```tsx
import Layout from './components/layout/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

## Usage Examples

### Complete Page Example

```tsx
import React, { FC, useState } from 'react';
import { Button, Card, Input, CodeBlock, InfoBox } from '../components/ui';
import { theme } from '../styles/theme';

const ExamplePage: FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: theme.spacing.xl }}>
      <h1>Example Page</h1>
      
      <InfoBox variant="info" title="Getting Started">
        <p>This page demonstrates the usage of reusable components.</p>
      </InfoBox>

      <Card title="User Input" padding="lg">
        <Input
          label="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your name here"
          fullWidth
        />
        
        <Button 
          variant="primary" 
          onClick={() => alert(`Hello, ${inputValue}!`)}
          style={{ marginTop: theme.spacing.md }}
        >
          Greet Me
        </Button>
      </Card>

      <Card title="Code Example" padding="lg">
        <CodeBlock language="typescript" showCopy>
          {`const greeting = (name: string) => {
  return \`Hello, \${name}!\`;
};`}
        </CodeBlock>
      </Card>
    </div>
  );
};
```

### Theme Usage

```tsx
import { theme } from '../styles/theme';

// Using theme colors
const styles = {
  container: {
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
};
```

## Best Practices

### Component Composition

1. **Keep components focused**: Each component should have a single responsibility
2. **Use composition over inheritance**: Combine simple components to create complex ones
3. **Provide sensible defaults**: Make components easy to use out of the box
4. **Support customization**: Allow styling and behavior customization through props

### TypeScript Best Practices

1. **Define clear interfaces**: Every component should have a well-defined props interface
2. **Use generic types**: Make components reusable with generic type parameters
3. **Provide JSDoc comments**: Document component purpose and usage
4. **Export types**: Make interfaces available for consumers

### Performance Optimization

1. **Use React.memo()**: Prevent unnecessary re-renders for pure components
2. **Optimize event handlers**: Use useCallback for event handlers passed as props
3. **Lazy load heavy components**: Use React.lazy() for components that aren't immediately needed
4. **Minimize bundle size**: Tree-shake unused code and optimize imports

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA attributes**: Provide accessibility attributes where needed
3. **Keyboard navigation**: Ensure components are keyboard accessible
4. **Screen reader support**: Test with screen readers

### Testing

1. **Unit tests**: Test component logic and rendering
2. **Integration tests**: Test component interactions
3. **Visual regression tests**: Ensure UI consistency
4. **Accessibility tests**: Verify accessibility compliance

### Code Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── maps/            # Map-specific components
│   └── layout/          # Layout components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services
├── styles/              # Theme and styling
└── types/               # TypeScript type definitions
```

This structure promotes:
- **Separation of concerns**: Different types of components in different folders
- **Reusability**: UI components can be used across the application
- **Maintainability**: Clear organization makes code easier to maintain
- **Scalability**: Structure supports growth and new features