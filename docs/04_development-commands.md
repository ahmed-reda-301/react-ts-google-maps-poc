# Development Commands and Steps Documentation

This document contains all the commands and steps executed during the development of the React Google Maps POC project.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Dependencies Installation](#dependencies-installation)
3. [Project Structure Creation](#project-structure-creation)
4. [Component Development](#component-development)
5. [Testing Commands](#testing-commands)
6. [Git Commands](#git-commands)
7. [Troubleshooting](#troubleshooting)

## Project Setup

### Initial Project Creation
```bash
# Create React app with TypeScript template
npx create-react-app react19-ts-google-maps-poc --template typescript

# Navigate to project directory
cd react19-ts-google-maps-poc

# Start development server
npm start
```

### Environment Configuration
```bash
# Create environment file
touch .env

# Add Google Maps API key (replace with your actual key)
echo "REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here" >> .env
```

## Dependencies Installation

### Core Google Maps Dependencies
```bash
# Install Google Maps React wrapper
npm install @react-google-maps/api

# Install Google Maps TypeScript types
npm install @types/googlemaps
```

### Navigation Dependencies
```bash
# Install React Router for navigation
npm install react-router-dom @types/react-router-dom
```

### Complete Dependencies List
```bash
# Install all required dependencies at once
npm install @react-google-maps/api @types/googlemaps react-router-dom @types/react-router-dom
```

## Project Structure Creation

### Directory Structure Commands
```bash
# Create component directories
mkdir -p src/components/maps
mkdir -p src/components/layout
mkdir -p src/components/ui

# Create type definitions directories
mkdir -p src/types/common
mkdir -p src/types/maps

# Create pages directory
mkdir -p src/pages

# Create hooks directory
mkdir -p src/hooks

# Create services directory
mkdir -p src/services

# Create documentation directory
mkdir -p docs
```

### File Creation Commands
```bash
# Create type definition files
touch src/types/common/LatLng.ts
touch src/types/maps/MapTypes.ts
touch src/types/maps/AdvancedTypes.ts
touch src/types/maps/index.ts

# Create component files
touch src/components/maps/GoogleMap.tsx
touch src/components/maps/CustomMarker.tsx
touch src/components/maps/InfoWindow.tsx
touch src/components/maps/Polyline.tsx
touch src/components/maps/Polygon.tsx
touch src/components/maps/SearchBox.tsx

# Create layout components
touch src/components/layout/Header.tsx
touch src/components/layout/Footer.tsx
touch src/components/layout/Layout.tsx

# Create page components
touch src/pages/HomePage.tsx
touch src/pages/BasicMapPage.tsx

# Create service files
touch src/services/DirectionsService.ts

# Create hook files
touch src/hooks/useGeolocation.ts
```

## Component Development

### TypeScript Interface Creation
```typescript
// Example of creating reusable interfaces
interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  center: LatLng;
  zoom: number;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  style?: React.CSSProperties;
}
```

### Component Development Pattern
```typescript
// Standard component structure
import React, { FC, memo } from 'react';

interface ComponentProps {
  // Define props here
}

const Component: FC<ComponentProps> = ({ props }) => {
  // Component logic here
  
  return (
    // JSX here
  );
};

export default memo(Component);
```

## Testing Commands

### Development Server
```bash
# Start development server
npm start

# Start on specific port
PORT=3001 npm start
```

### Build Commands
```bash
# Create production build
npm run build

# Test production build locally
npx serve -s build
```

### Testing Commands
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Git Commands

### Initial Repository Setup
```bash
# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Create React app with TypeScript"

# Add remote repository
git remote add origin https://github.com/username/react19-ts-google-maps-poc.git

# Push to remote
git push -u origin main
```

### Development Workflow
```bash
# Check status
git status

# Add specific files
git add src/components/maps/GoogleMap.tsx

# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add GoogleMap component with TypeScript support"

# Push changes
git push origin main
```

### Feature Development
```bash
# Create feature branch
git checkout -b feature/custom-markers

# Work on feature...
git add .
git commit -m "feat: Implement custom markers with different icons"

# Switch back to main
git checkout main

# Merge feature
git merge feature/custom-markers

# Delete feature branch
git branch -d feature/custom-markers
```

## Troubleshooting

### Common Issues and Solutions

#### Google Maps API Not Loading
```bash
# Check if API key is set
echo $REACT_APP_GOOGLE_MAPS_API_KEY

# Restart development server after adding API key
npm start
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Install missing type definitions
npm install @types/package-name
```

#### Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or start on different port
PORT=3001 npm start
```

## Package Management

### Dependency Management
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest

# Remove unused packages
npm prune
```

### Security
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix with breaking changes (use carefully)
npm audit fix --force
```

## Environment Variables

### .env File Structure
```bash
# Development environment
REACT_APP_GOOGLE_MAPS_API_KEY=your_development_api_key
REACT_APP_ENV=development

# Production environment
REACT_APP_GOOGLE_MAPS_API_KEY=your_production_api_key
REACT_APP_ENV=production
```

### Environment-Specific Commands
```bash
# Run with specific environment
REACT_APP_ENV=development npm start

# Build for production
REACT_APP_ENV=production npm run build
```

## Code Quality

### Linting and Formatting
```bash
# Run ESLint
npx eslint src/

# Fix ESLint issues automatically
npx eslint src/ --fix

# Format code with Prettier (if installed)
npx prettier --write src/
```

### Type Checking
```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Watch mode for type checking
npx tsc --noEmit --watch
```

## Performance Optimization

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Memory and Performance
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

## Deployment

### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

## Useful Development Commands

### File Operations
```bash
# Find files by name
find src/ -name "*.tsx" -type f

# Count lines of code
find src/ -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Search for text in files
grep -r "GoogleMap" src/
```

### Process Management
```bash
# List running Node processes
ps aux | grep node

# Kill all Node processes
pkill -f node
```

This documentation serves as a complete reference for all commands and steps used in the project development.