# React memo() - Performance Optimization Guide

## What is React.memo?

`React.memo` is a higher-order component (HOC) that wraps around functional components to prevent unnecessary re-renders. It performs a shallow comparison of props and only re-renders the component when the props have actually changed.

## Import Statement

```typescript
import { memo } from 'react';
```

## Basic Syntax

```typescript
const MemoizedComponent = memo(Component);
```

## How memo Works

### Without memo
```typescript
// Component re-renders every time parent re-renders
const ExpensiveComponent: FC<{ name: string; age: number }> = ({ name, age }) => {
  console.log('ExpensiveComponent rendered'); // This will log on every parent render
  
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
};
```

### With memo
```typescript
// Component only re-renders when props change
const ExpensiveComponent: FC<{ name: string; age: number }> = memo(({ name, age }) => {
  console.log('ExpensiveComponent rendered'); // This will only log when name or age changes
  
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
});
```

## Basic Examples

### Example 1: Simple Component Memoization

```typescript
import { FC, memo } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar: string;
}

// Without memo - re-renders on every parent update
const UserCard: FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// With memo - only re-renders when props change
const MemoizedUserCard: FC<UserCardProps> = memo(({ name, email, avatar }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
});

export default MemoizedUserCard;
```

### Example 2: Map Component with memo

```typescript
import { FC, memo } from 'react';

interface MapMarkerProps {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  onClick: (id: string) => void;
}

// Memoized marker component
const MapMarker: FC<MapMarkerProps> = memo(({ id, position, title, onClick }) => {
  console.log(`Rendering marker: ${title}`); // Only logs when this marker's props change
  
  return (
    <div 
      className="map-marker"
      onClick={() => onClick(id)}
      style={{
        position: 'absolute',
        left: position.lng,
        top: position.lat,
      }}
    >
      📍 {title}
    </div>
  );
});

// Usage in parent component
const MapComponent: FC = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  
  const markers = [
    { id: '1', position: { lat: 100, lng: 200 }, title: 'Marker 1' },
    { id: '2', position: { lat: 150, lng: 250 }, title: 'Marker 2' },
    { id: '3', position: { lat: 200, lng: 300 }, title: 'Marker 3' },
  ];

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedMarkerId(id);
  }, []);

  return (
    <div className="map">
      {markers.map(marker => (
        <MapMarker
          key={marker.id}
          id={marker.id}
          position={marker.position}
          title={marker.title}
          onClick={handleMarkerClick}
        />
      ))}
    </div>
  );
};
```

## Custom Comparison Function

By default, `memo` performs a shallow comparison of props. You can provide a custom comparison function for more control.

### Syntax with Custom Comparison

```typescript
const MemoizedComponent = memo(Component, customCompareFunction);
```

### Custom Comparison Example

```typescript
import { FC, memo } from 'react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  metadata: {
    category: string;
    tags: string[];
    lastUpdated: Date;
  };
}

// Custom comparison function
const arePropsEqual = (prevProps: ProductProps, nextProps: ProductProps): boolean => {
  // Only re-render if id, name, or price changes
  // Ignore metadata changes
  return (
    prevProps.id === nextProps.id &&
    prevProps.name === nextProps.name &&
    prevProps.price === nextProps.price
  );
};

const ProductCard: FC<ProductProps> = memo(({ id, name, price, metadata }) => {
  console.log(`Rendering product: ${name}`);
  
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Category: {metadata.category}</p>
    </div>
  );
}, arePropsEqual);

export default ProductCard;
```

## Advanced Examples

### Example 1: Memoizing Complex Components

```typescript
import { FC, memo, useMemo } from 'react';

interface ChartProps {
  data: number[];
  title: string;
  color: string;
  options: {
    showGrid: boolean;
    showLegend: boolean;
    animation: boolean;
  };
}

const Chart: FC<ChartProps> = memo(({ data, title, color, options }) => {
  // Expensive calculation that we don't want to repeat unnecessarily
  const processedData = useMemo(() => {
    console.log('Processing chart data...');
    return data.map((value, index) => ({
      x: index,
      y: value,
      color: `${color}${Math.floor(value / 10)}`,
    }));
  }, [data, color]);

  const chartConfig = useMemo(() => {
    console.log('Generating chart config...');
    return {
      ...options,
      data: processedData,
      title,
    };
  }, [processedData, options, title]);

  return (
    <div className="chart">
      <h3>{title}</h3>
      <div className="chart-content">
        {/* Render chart based on chartConfig */}
        {processedData.map((point, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{
              height: `${point.y}px`,
              backgroundColor: point.color,
            }}
          />
        ))}
      </div>
    </div>
  );
});

Chart.displayName = 'Chart';
export default Chart;
```

### Example 2: Memoizing List Items

```typescript
import { FC, memo, useCallback } from 'react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Memoized todo item
const TodoItem: FC<TodoItemProps> = memo(({ id, text, completed, onToggle, onDelete }) => {
  console.log(`Rendering todo: ${text}`);

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
});

// Parent component
const TodoList: FC = () => {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Build an app', completed: false },
    { id: '3', text: 'Deploy to production', completed: false },
  ]);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleToggle = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

## Common Pitfalls and Solutions

### Pitfall 1: Object Props

```typescript
// ❌ Bad: Object created on every render
const ParentComponent: FC = () => {
  return (
    <MemoizedChild 
      config={{ theme: 'dark', size: 'large' }} // New object every render!
    />
  );
};

// ✅ Good: Memoize the object
const ParentComponent: FC = () => {
  const config = useMemo(() => ({ 
    theme: 'dark', 
    size: 'large' 
  }), []);

  return <MemoizedChild config={config} />;
};
```

### Pitfall 2: Function Props

```typescript
// ❌ Bad: Function created on every render
const ParentComponent: FC = () => {
  return (
    <MemoizedChild 
      onClick={() => console.log('clicked')} // New function every render!
    />
  );
};

// ✅ Good: Use useCallback
const ParentComponent: FC = () => {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <MemoizedChild onClick={handleClick} />;
};
```

### Pitfall 3: Array Props

```typescript
// ❌ Bad: Array created on every render
const ParentComponent: FC = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <MemoizedList 
      items={data.filter(item => filter === 'all' || item.category === filter)}
    />
  );
};

// ✅ Good: Memoize the filtered array
const ParentComponent: FC = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredItems = useMemo(() => 
    data.filter(item => filter === 'all' || item.category === filter),
    [data, filter]
  );

  return <MemoizedList items={filteredItems} />;
};
```

## When to Use memo

### ✅ Use memo when:

1. **Component renders frequently** with the same props
2. **Expensive rendering logic** that you want to avoid repeating
3. **Large lists** where individual items don't change often
4. **Pure components** that only depend on their props
5. **Child components** in frequently updating parents

### ❌ Don't use memo when:

1. **Props change frequently** - memo overhead isn't worth it
2. **Simple components** with minimal rendering cost
3. **Components that always receive new props** (like timestamps)
4. **Over-optimization** - measure first, optimize second

## Performance Measurement

### Before and After Comparison

```typescript
import { FC, memo, useState, useCallback } from 'react';

// Component without memo
const RegularComponent: FC<{ name: string; count: number }> = ({ name, count }) => {
  console.log(`Regular component rendered: ${name}`);
  return <div>{name}: {count}</div>;
};

// Component with memo
const MemoizedComponent: FC<{ name: string; count: number }> = memo(({ name, count }) => {
  console.log(`Memoized component rendered: ${name}`);
  return <div>{name}: {count}</div>;
});

// Test component
const PerformanceTest: FC = () => {
  const [counter, setCounter] = useState(0);
  const [name] = useState('Test Component');

  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>
        Increment: {counter}
      </button>
      
      {/* This will re-render on every counter change */}
      <RegularComponent name={name} count={5} />
      
      {/* This will NOT re-render because props haven't changed */}
      <MemoizedComponent name={name} count={5} />
    </div>
  );
};
```

## Best Practices

### 1. Combine with useCallback and useMemo

```typescript
const OptimizedParent: FC = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['a', 'b', 'c']);

  // Memoize callback
  const handleItemClick = useCallback((item: string) => {
    console.log(`Clicked: ${item}`);
  }, []);

  // Memoize expensive computation
  const processedItems = useMemo(() => {
    return items.map(item => ({ id: item, label: item.toUpperCase() }));
  }, [items]);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <MemoizedItemList items={processedItems} onItemClick={handleItemClick} />
    </div>
  );
};
```

### 2. Use displayName for Debugging

```typescript
const MemoizedComponent = memo<ComponentProps>(({ prop1, prop2 }) => {
  return <div>{prop1} - {prop2}</div>;
});

// Set display name for better debugging
MemoizedComponent.displayName = 'MemoizedComponent';
```

### 3. TypeScript Integration

```typescript
import { FC, memo } from 'react';

interface Props {
  title: string;
  description: string;
  isActive: boolean;
}

// Type-safe memoized component
const TypedMemoComponent: FC<Props> = memo<Props>(({ title, description, isActive }) => {
  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
});

export default TypedMemoComponent;
```

## Real-World Example: Google Maps Integration

```typescript
import { FC, memo, useCallback } from 'react';
import { Marker } from '@react-google-maps/api';

interface MapMarkerProps {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  icon?: string;
  onClick?: (markerId: string) => void;
}

// Memoized marker component for better map performance
const GoogleMapMarker: FC<MapMarkerProps> = memo(({ 
  id, 
  position, 
  title, 
  icon, 
  onClick 
}) => {
  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [id, onClick]);

  return (
    <Marker
      position={position}
      title={title}
      icon={icon}
      onClick={handleClick}
    />
  );
});

GoogleMapMarker.displayName = 'GoogleMapMarker';

// Usage in map component
const MapWithMarkers: FC = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  
  const markers = [
    { id: '1', position: { lat: 24.7136, lng: 46.6753 }, title: 'Riyadh' },
    { id: '2', position: { lat: 21.3891, lng: 39.8579 }, title: 'Mecca' },
    { id: '3', position: { lat: 24.4539, lng: 39.6775 }, title: 'Medina' },
  ];

  const handleMarkerClick = useCallback((markerId: string) => {
    setSelectedMarkerId(markerId);
  }, []);

  return (
    <GoogleMap>
      {markers.map(marker => (
        <GoogleMapMarker
          key={marker.id}
          id={marker.id}
          position={marker.position}
          title={marker.title}
          onClick={handleMarkerClick}
        />
      ))}
    </GoogleMap>
  );
};
```

## Summary

`React.memo` is a powerful optimization tool that:

- **Prevents unnecessary re-renders** by comparing props
- **Improves performance** for components that render frequently
- **Works best** when combined with `useCallback` and `useMemo`
- **Should be used judiciously** - measure performance before optimizing
- **Requires careful handling** of object and function props

### Key Takeaways:

1. **Use memo for expensive components** that don't change often
2. **Combine with useCallback/useMemo** for maximum effectiveness
3. **Be careful with object/function props** - they break memoization
4. **Measure performance** before and after optimization
5. **Don't over-optimize** - simple components may not benefit

Remember: Premature optimization is the root of all evil. Use `memo` when you have identified actual performance issues, not as a default for every component.