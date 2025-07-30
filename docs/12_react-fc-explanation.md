# React FC (FunctionComponent) Explanation

## What is FC?

`FC` stands for `FunctionComponent` and is a TypeScript type used with React to define functional components.

## Import Statement

```typescript
import { FC, memo } from "react";
```

## FC Definition

`FC` is a generic type used to define the type of functional components in React with TypeScript. This type provides:

1. **Type Safety**: Ensures the component follows the correct structure for a React component
2. **Props Typing**: Allows defining the type of props the component receives
3. **Return Type**: Ensures the component returns valid JSX

## Basic Syntax

```typescript
import { FC } from 'react';

// Component without props
const MyComponent: FC = () => {
  return <div>Hello World</div>;
};

// Component with props
interface Props {
  name: string;
  age: number;
}

const UserComponent: FC<Props> = ({ name, age}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
    </div>
  );
};
```

## Key Benefits

### 1. Type Safety
```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

// Correct usage
<Button text="Click me" onClick={() => console.log('clicked')} />

// TypeScript error - missing required prop
<Button onClick={() => console.log('clicked')} /> // Error: Property 'text' is missing
```

### 2. IntelliSense and Auto-completion
When using FC, you get:
- Auto-completion for props
- Type checking during development
- Clear error messages

### 3. Children Props
```typescript
interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
```

## Using FC with memo

`memo` is a Higher-Order Component used to optimize performance by preventing unnecessary re-renders:

```typescript
import { FC, memo } from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar: string;
}

const UserCard: FC<UserCardProps> = memo(({ name, email, avatar }) => {
  console.log('UserCard rendered'); // Will only print when props change
  
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
});

// Export the component
export default UserCard;
```

## Advanced Example: Component with Generic Types

```typescript
import { FC } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

const List: FC<ListProps<any>> = ({ items, renderItem, keyExtractor }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};

// Usage
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Ahmed' },
  { id: 2, name: 'Fatima' }
];

<List
  items={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

## Best Practices

### 1. Define Separate Props Interface
```typescript
// Good
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  // ...
};

// Avoid this
const Header: FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  // ...
};
```

### 2. Using Optional Props
```typescript
interface CardProps {
  title: string;
  description?: string; // Optional
  isActive?: boolean;   // Optional with default value
}

const Card: FC<CardProps> = ({ 
  title, 
  description, 
  isActive = false 
}) => {
  return (
    <div className={`card ${isActive ? 'active' : ''}`}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};
```

### 3. Using Union Types
```typescript
interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const Alert: FC<AlertProps> = ({ message, type }) => {
  const getAlertClass = () => {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-error';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-info';
    }
  };

  return (
    <div className={`alert ${getAlertClass()}`}>
      {message}
    </div>
  );
};
```

## Comparison with Other Approaches

### Without FC (Plain JavaScript)
```javascript
// Without TypeScript
const MyComponent = ({ name, age }) => {
  return <div>{name} is {age} years old</div>;
};
```

### With FC
```typescript
// With TypeScript and FC
interface Props {
  name: string;
  age: number;
}

const MyComponent: FC<Props> = ({ name, age }) => {
  return <div>{name} is {age} years old</div>;
};
```

### Using Function Declaration
```typescript
interface Props {
  name: string;
  age: number;
}

function MyComponent({ name, age }: Props): JSX.Element {
  return <div>{name} is {age} years old</div>;
}
```

## When to Use FC?

### Use FC when:
- You want strong type safety
- Working on a TypeScript project
- You need good IntelliSense
- You want clear documentation for props

### Don't use FC when:
- Working on a plain JavaScript project
- The component is very simple and doesn't need complex props
- You prefer function declarations

## Summary

`FC` is a powerful tool in React TypeScript that provides:
- **Type Safety**: Protection from errors
- **Better DX**: Better development experience
- **Documentation**: Clear component documentation
- **Maintainability**: Easier maintenance

Using `FC` with `memo` also provides performance optimizations by preventing unnecessary re-renders.