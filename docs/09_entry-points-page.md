# Entry Points Page Documentation

## Overview

The Entry Points Page displays all airports, seaports, land borders, and checkpoints in Saudi Arabia, along with active vehicles. This page aims to provide a comprehensive view of all entry and exit points from the Kingdom and internal monitoring points.

## Page Objectives

- **Learning**: Understanding how to display different types of data on maps
- **Practical Application**: Managing entry and exit points in logistics systems
- **Monitoring**: Tracking the status of airports, seaports, and border crossings
- **Control**: Ability to show/hide different types of points

## Main Components

### 1. Entry and Exit Point Types

#### Airports
- **King Khalid International Airport** - Riyadh
- **King Abdulaziz International Airport** - Jeddah  
- **King Fahd International Airport** - Dammam
- **Icon**: Airport symbol
- **Information**: Capacity, current load, operating hours

#### Seaports
- **Jeddah Islamic Port**
- **King Abdul Aziz Port** - Dammam
- **Yanbu Commercial Port**
- **Icon**: Marina symbol
- **Information**: Capacity, current load, operating hours

#### Land Borders
- **Al Haditha Border Crossing** (Iraq)
- **Jadidat Arar Border Crossing** (Iraq)
- **Salwa Border Crossing** (Qatar)
- **Icon**: Flag symbol
- **Information**: Capacity, current load, operating hours

### 2. Checkpoints

- **Riyadh North Checkpoint**
- **Jeddah East Checkpoint**
- **Dammam West Checkpoint**
- **Qassim Regional Checkpoint**

**Checkpoint Information:**
- Average waiting time
- Maximum allowed speed
- Required documents
- Active status

### 3. Active Vehicles

Display vehicles currently on roads with information:
- License plate number
- Vehicle type
- Current speed
- Current location

## Interactive Features

### 1. Display Filters
- ☑️ **Airports**: Show/hide all airports
- ☑️ **Seaports**: Show/hide all seaports  
- ☑️ **Land Borders**: Show/hide land borders
- ☑️ **Checkpoints**: Show/hide checkpoints
- ☑️ **Vehicles**: Show/hide active vehicles

### 2. Selected Point Information
When clicking on any point on the map, displays:
- **Name**: In Arabic and English
- **Type**: Airport/seaport/land border
- **Status**: Active/inactive
- **Operating Hours**: From - to
- **Current Load**: With colored progress bar

### 3. Load Indicator
Colored progress bar showing:
- 🟢 **Green**: Less than 50% (low)
- 🟠 **Orange**: 50-80% (medium)
- 🔴 **Red**: More than 80% (high)

## Quick Statistics

### Statistics Cards
1. **Airports**
   - Total count
   - Number of active airports
   - Color: Blue

2. **Seaports**
   - Total count
   - Number of active seaports
   - Color: Green

3. **Land Borders**
   - Total count
   - Number of active borders
   - Color: Orange

4. **Checkpoints**
   - Total count
   - Number of active checkpoints
   - Color: Purple

5. **Active Vehicles**
   - Number of active vehicles
   - Total number of vehicles
   - Color: Red

## Technologies Used

### 1. Data Management
```typescript
// Data types
interface EntryPoint {
  id: string;
  name: string;
  nameAr: string;
  type: EntryPointType;
  location: LatLng;
  isActive: boolean;
  operatingHours: { open: string; close: string };
  capacity: number;
  currentLoad: number;
}

interface Checkpoint {
  id: string;
  name: string;
  nameAr: string;
  location: LatLng;
  isActive: boolean;
  averageWaitTime: number;
  maxSpeed: number;
  requiredDocuments: string[];
}
```

### 2. API Simulation
```typescript
// Mock API service
const logisticsApi = LogisticsApiService.getInstance();

// Load data
const [entryPointsData, checkpointsData, vehiclesData] = await Promise.all([
  logisticsApi.getEntryPoints(),
  logisticsApi.getCheckpoints(),
  logisticsApi.getVehicles()
]);
```

### 3. Custom Icons
```typescript
const getEntryPointIcon = (type: EntryPointType): string => {
  switch (type) {
    case EntryPointType.AIRPORT:
      return 'https://maps.google.com/mapfiles/ms/icons/airports.png';
    case EntryPointType.SEAPORT:
      return 'https://maps.google.com/mapfiles/ms/icons/marina.png';
    case EntryPointType.LAND_BORDER:
      return 'https://maps.google.com/mapfiles/ms/icons/flag.png';
  }
};
```

### 4. Interactive Filtering
```typescript
const filteredEntryPoints = entryPoints.filter(point => {
  switch (point.type) {
    case EntryPointType.AIRPORT:
      return showAirports;
    case EntryPointType.SEAPORT:
      return showSeaports;
    case EntryPointType.LAND_BORDER:
      return showBorders;
  }
});
```

## Use Cases

### 1. Operations Monitor
- Monitor status of all entry and exit points
- Track load and capacity
- Identify congested points

### 2. Trip Planner
- Select best entry and exit points
- Avoid congested points
- Plan checkpoint passages

### 3. Fleet Manager
- Track vehicle locations
- Monitor vehicle distribution on roads
- Optimize road usage

## Educational Benefits

### 1. Complex Data Management
- Handling different types of data
- Organizing data in logical structures
- Using TypeScript for type checking

### 2. Map Interaction
- Displaying different types of markers
- Using custom icons
- Interacting with marker clicks

### 3. User Interface
- Creating interactive filters
- Displaying statistics visually
- Designing user-friendly interfaces

### 4. API Simulation
- Creating mock API service
- Handling asynchronous data
- Managing loading and error states

## Future Development

### 1. Additional Features
- **Search**: Search for specific points
- **Advanced Filtering**: Filter by load or operating hours
- **Alerts**: Notifications when points are full
- **Reports**: Usage reports for points

### 2. Performance Improvements
- **Progressive Loading**: Load data by displayed region
- **Caching**: Store data locally
- **Real-time Updates**: Update data in real-time

### 3. Integration
- **Real API**: Connect to real database
- **Authentication**: User login system
- **Permissions**: Different access levels

## Conclusion

The Entry Points Page provides a strong foundation for understanding how to:
- Display different types of data on maps
- Create interactive interfaces for display control
- Organize complex data logically
- Simulate API services for development and testing

These concepts are essential for building advanced logistics systems and fleet management applications.