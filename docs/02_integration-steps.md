# Google Maps Integration Steps with TypeScript

This document outlines the step-by-step process of integrating Google Maps into our React application using TypeScript.

## 1. Project Setup with TypeScript

1. Install TypeScript and type definitions:

   ```bash
   npm install --save typescript @types/node @types/react @types/react-dom @types/jest @types/googlemaps
   ```

2. Install Google Maps React wrapper:
   ```bash
   npm install --save @react-google-maps/api
   ```

## 2. Configuration

### Getting a Google Maps API Key

1. Go to the Google Cloud Console:

   ```plaintext
   https://console.cloud.google.com/
   ```

2. Create a new project or select an existing one:

   - Click on the project dropdown at the top of the page
   - Click "New Project"
   - Enter a project name (e.g., "React Maps POC")
   - Click "Create"

3. Enable necessary APIs:

   - In the Navigation Menu, go to "APIs & Services" > "Library"
   - Search for and enable these APIs:
     - Maps JavaScript API
     - Places API (if you plan to use search functionality)
     - Directions API (if you plan to use directions)
     - Geocoding API (if you need address lookup)

4. Create API Key:

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Your new API key will be displayed

5. Set up API Key restrictions (recommended for development):

   - Click on the newly created API key
   - Under "Application restrictions", select "HTTP referrers (web sites)"
   - Add these referrers:
     ```plaintext
     http://localhost:3000/*
     http://localhost/*
     ```
   - Under "API restrictions", select "Restrict key"
   - Select only the APIs you enabled in step 3
   - Click "Save"

6. Billing Options:

   A. Without Billing Account (Free Tier):

   - You can use Google Maps Platform without a billing account
   - Limitations:
     - 28,500 map loads per month
     - Some features might be restricted
     - "For development purposes only" watermark on maps
     - No access to premium features

   B. With Billing Account (Optional):

   - Go to "Billing" if you need:
     - Higher usage limits
     - Premium features
     - Watermark removal
   - Google provides $200 monthly credit
   - You can set daily quota limits to prevent unexpected charges

### Environment Configuration

1. Create a new `.env` file in the project root:

   ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. Update `.gitignore` to include the `.env` file:
   ```plaintext
   # environment variables
   .env
   .env.local
   ```

### API Usage Monitoring

1. Set up usage quotas:

   - Go to "APIs & Services" > "Quotas"
   - Set daily limits for each API
   - Set up alerts at 50% and 80% usage

2. Monitor API usage:
   - Go to "APIs & Services" > "Dashboard"
   - View API requests, errors, and latency
   - Set up email alerts for quota usage

## 3. Creating TypeScript Components

1. Create a components directory:

   ```bash
   mkdir -p src/components/maps
   ```

2. Create types structure:

   a. Create common types (`src/types/common/LatLng.ts`):

   ```typescript
   /**
    * Common type for geographic coordinates
    */
   export interface LatLng {
     lat: number;
     lng: number;
   }
   ```

   b. Create map types (`src/types/maps/MapTypes.ts`):

   ```typescript
   import { LatLng } from "../common/LatLng";

   /**
    * Properties for the main map component
    */
   export interface MapProps {
     /** Center coordinates of the map */
     center: LatLng;
     /** Zoom level (1-20) */
     zoom: number;
     /** Optional click handler for map clicks */
     onClick?: (e: google.maps.MapMouseEvent) => void;
     /** Optional style overrides */
     style?: React.CSSProperties;
   }

   /**
    * Properties for map markers
    */
   export interface MarkerProps {
     /** Marker position on the map */
     position: LatLng;
     /** Optional marker title */
     title?: string;
     /** Optional click handler */
     onClick?: (e: google.maps.MapMouseEvent) => void;
     /** Optional marker icon */
     icon?: string;
     /** Optional marker label */
     label?: string;
     /** Unique identifier for the marker */
     id: string;
   }
   ```

   c. Create types barrel file (`src/types/maps/index.ts`):

   ```typescript
   /**
    * Types barrel file for maps
    * This file exports all map-related types
    */
   export * from "./MapTypes";
   export * from "../common/LatLng";
   ```

3. Create the Map component (`src/components/maps/GoogleMap.tsx`):

   ````typescript
   import { FC, memo } from "react";
   import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
   import { MapProps, MarkerProps } from "../../types/maps";

   /**
    * Default container style for the map
    * @constant
    */
   const containerStyle = {
     width: "100%",
     height: "400px",
   };

   /**
    * Props interface for the GoogleMapComponent
    * Extends MapProps to include array of markers
    */
   interface GoogleMapComponentProps extends MapProps {
     /** Optional array of markers to display on the map */
     markers?: MarkerProps[];
   }

   /**
    * GoogleMapComponent is a wrapper around the Google Maps JavaScript API
    * It provides a React interface for displaying maps and markers
    *
    * @component
    * @example
    * ```tsx
    * <GoogleMapComponent
    *   center={{ lat: -3.745, lng: -38.523 }}
    *   zoom={13}
    *   markers={[
    *     {
    *       id: '1',
    *       position: { lat: -3.745, lng: -38.523 },
    *       title: 'Marker 1'
    *     }
    *   ]}
    * />
    * ```
    */
   const GoogleMapComponent: FC<GoogleMapComponentProps> = ({
     center,
     zoom,
     markers,
     onClick,
     style,
   }) => {
     return (
       <LoadScript
         googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
       >
         <GoogleMap
           mapContainerStyle={{ ...containerStyle, ...style }}
           center={center}
           zoom={zoom}
           onClick={onClick}
           options={{
             zoomControl: true,
             mapTypeControl: true,
             scaleControl: true,
             streetViewControl: true,
             rotateControl: true,
             fullscreenControl: true,
           }}
         >
           {markers?.map((marker) => (
             <Marker
               key={marker.id}
               position={marker.position}
               title={marker.title}
               icon={marker.icon}
               label={marker.label}
               onClick={marker.onClick}
             />
           ))}
         </GoogleMap>
       </LoadScript>
     );
   };

   // Export memoized version of the component to prevent unnecessary re-renders
   export default memo(GoogleMapComponent);
   ````

4. Update App component to use TypeScript (`src/App.tsx`):

   ```typescript
   import { FC } from "react";
   import "./App.css";
   import GoogleMapComponent from "./components/maps/GoogleMap";

   const App: FC = () => {
     const defaultCenter = {
       lat: -3.745,
       lng: -38.523,
     };

     const markers = [
       {
         position: defaultCenter,
         title: "Default Location",
       },
     ];

     return (
       <div className="App">
         <h1>React Google Maps POC</h1>
         <GoogleMapComponent
           center={defaultCenter}
           zoom={13}
           markers={markers}
         />
       </div>
     );
   };

   export default App;
   ```

## 4. Environment Setup

1. Create a new environment declaration file (`src/react-app-env.d.ts`):

   ```typescript
   /// <reference types="react-scripts" />

   declare namespace NodeJS {
     interface ProcessEnv {
       REACT_APP_GOOGLE_MAPS_API_KEY: string;
     }
   }
   ```

## 5. Additional Components (Optional)

1. Create a SearchBox component (`src/components/maps/SearchBox.tsx`):

   ```typescript
   import { FC } from "react";
   import { StandaloneSearchBox } from "@react-google-maps/api";

   interface SearchBoxProps {
     onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
   }

   const SearchBox: FC<SearchBoxProps> = ({ onPlacesChanged }) => {
     const onLoad = (ref: google.maps.places.SearchBox) => {
       ref.addListener("places_changed", () => {
         const places = ref.getPlaces();
         if (places && places.length > 0) {
           onPlacesChanged(places);
         }
       });
     };

     return (
       <StandaloneSearchBox onLoad={onLoad}>
         <input
           type="text"
           placeholder="Search locations"
           style={{
             boxSizing: "border-box",
             border: "1px solid transparent",
             width: "240px",
             height: "32px",
             padding: "0 12px",
             borderRadius: "3px",
             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
             fontSize: "14px",
             outline: "none",
             textOverflow: "ellipses",
             marginBottom: "10px",
           }}
         />
       </StandaloneSearchBox>
     );
   };

   export default SearchBox;
   ```

## Next Steps

1. **API Key Setup**:

   - Obtain a Google Maps API key from the Google Cloud Console
   - Enable necessary APIs (Maps JavaScript API, Places API if needed)
   - Add restrictions to the API key

2. **Features to Implement**:

   - Custom markers
   - Info windows
   - Polylines and polygons
   - Geolocation
   - Directions service

3. **Testing**:
   - Unit tests for components
   - Integration tests for map functionality
   - E2E tests for user interactions

## Important Notes

1. **TypeScript Benefits**:

   - Type safety for props and state
   - Better IDE support
   - Easier refactoring
   - Self-documenting code

2. **Performance Considerations**:

   - Use `useMemo` for static values
   - Implement proper error boundaries
   - Consider lazy loading for complex features

3. **Security**:
   - Always use environment variables for API keys
   - Set proper API key restrictions
   - Monitor API usage
