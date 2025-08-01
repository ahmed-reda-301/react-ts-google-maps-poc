import React from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { GuidePageData } from '../../types/guide';
import { MAP_CONTAINERS, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from '../../constants';

export const polylineGuideData: GuidePageData = {
  title: 'Polyline Component Guide',
  subtitle: 'Complete guide to using Polyline components for drawing paths, routes, and boundaries on maps',
  icon: '📏',
  examples: {
    basic: {
      title: 'Basic Polyline',
      description: 'Simple polyline connecting multiple points',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          <Polyline
            path={[
              RIYADH_LOCATIONS.KINGDOM_CENTRE,
              RIYADH_LOCATIONS.AL_FAISALIAH_TOWER,
              RIYADH_LOCATIONS.MASMAK_FORTRESS,
              RIYADH_LOCATIONS.NATIONAL_MUSEUM
            ]}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 3
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline } from '@react-google-maps/api';

const BasicPolyline = () => {
  const path = [
    { lat: 24.7136, lng: 46.6753 }, // Kingdom Centre
    { lat: 24.6877, lng: 46.6857 }, // Al Faisaliah Tower
    { lat: 24.6308, lng: 46.7073 }, // Masmak Fortress
    { lat: 24.6465, lng: 46.7169 }  // National Museum
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={12}
    >
      <Polyline
        path={path}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
      />
    </GoogleMap>
  );
};`
    },

    styled: {
      title: 'Styled Polylines',
      description: 'Multiple polylines with different styles and colors',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* Route 1 - Business District */}
          <Polyline
            path={[
              RIYADH_LOCATIONS.KINGDOM_CENTRE,
              RIYADH_LOCATIONS.AL_FAISALIAH_TOWER,
              { lat: 24.6950, lng: 46.6920 },
              { lat: 24.7100, lng: 46.6800 }
            ]}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true
            }}
          />
          
          {/* Route 2 - Historical Sites */}
          <Polyline
            path={[
              RIYADH_LOCATIONS.MASMAK_FORTRESS,
              RIYADH_LOCATIONS.NATIONAL_MUSEUM,
              { lat: 24.6380, lng: 46.7250 },
              { lat: 24.6200, lng: 46.7100 }
            ]}
            options={{
              strokeColor: '#00FF00',
              strokeOpacity: 0.7,
              strokeWeight: 3,
              geodesic: false
            }}
          />
          
          {/* Route 3 - Shopping Route */}
          <Polyline
            path={[
              { lat: 24.7200, lng: 46.6600 },
              { lat: 24.7300, lng: 46.6700 },
              { lat: 24.7400, lng: 46.6650 },
              { lat: 24.7350, lng: 46.6550 }
            ]}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.9,
              strokeWeight: 5,
              geodesic: true
            }}
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline } from '@react-google-maps/api';

const StyledPolylines = () => {
  const routes = [
    {
      path: [
        { lat: 24.7136, lng: 46.6753 },
        { lat: 24.6877, lng: 46.6857 },
        { lat: 24.6950, lng: 46.6920 },
        { lat: 24.7100, lng: 46.6800 }
      ],
      options: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        geodesic: true
      }
    },
    {
      path: [
        { lat: 24.6308, lng: 46.7073 },
        { lat: 24.6465, lng: 46.7169 },
        { lat: 24.6380, lng: 46.7250 },
        { lat: 24.6200, lng: 46.7100 }
      ],
      options: {
        strokeColor: '#00FF00',
        strokeOpacity: 0.7,
        strokeWeight: 3,
        geodesic: false
      }
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      {routes.map((route, index) => (
        <Polyline
          key={index}
          path={route.path}
          options={route.options}
        />
      ))}
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive Polyline',
      description: 'Click on the map to add points and build a custom path',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.STREET}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const InteractivePolyline = () => {
  const [path, setPath] = useState([]);

  const onMapClick = useCallback((e) => {
    if (e.latLng) {
      const newPoint = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setPath(prevPath => [...prevPath, newPoint]);
    }
  }, []);

  const clearPath = () => {
    setPath([]);
  };

  return (
    <div>
      <button onClick={clearPath}>Clear Path</button>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.7136, lng: 46.6753 }}
        zoom={12}
        onClick={onMapClick}
      >
        {path.length >= 2 && (
          <Polyline
            path={path}
            options={{
              strokeColor: '#FF6B6B',
              strokeOpacity: 0.8,
              strokeWeight: 3
            }}
          />
        )}

        {path.map((point, index) => (
          <Marker
            key={index}
            position={point}
            label={(index + 1).toString()}
          />
        ))}
      </GoogleMap>
    </div>
  );
};`
    },

    animated: {
      title: 'Animated Polyline',
      description: 'Watch as the polyline is drawn progressively',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.BUILDING}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const AnimatedPolyline = () => {
  const [currentPath, setCurrentPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullPath = [
    { lat: 24.7136, lng: 46.6753 },
    { lat: 24.7100, lng: 46.6800 },
    { lat: 24.7050, lng: 46.6850 },
    { lat: 24.7000, lng: 46.6900 },
    { lat: 24.6877, lng: 46.6857 }
  ];

  useEffect(() => {
    let interval;
    if (isAnimating && currentIndex < fullPath.length) {
      interval = setInterval(() => {
        setCurrentPath(prev => [...prev, fullPath[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, currentIndex]);

  const startAnimation = () => {
    setCurrentPath([fullPath[0]]);
    setCurrentIndex(1);
    setIsAnimating(true);
  };

  return (
    <div>
      <button onClick={startAnimation}>Start Animation</button>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.7136, lng: 46.6753 }}
        zoom={13}
      >
        {currentPath.length >= 2 && (
          <Polyline
            path={currentPath}
            options={{
              strokeColor: '#FF6B6B',
              strokeOpacity: 0.8,
              strokeWeight: 4
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};`
    },

    geodesic: {
      title: 'Geodesic vs Non-Geodesic',
      description: 'Compare geodesic and non-geodesic polylines over long distances',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={{ lat: 24.0, lng: 45.0 }}
          zoom={6}
        >
          {/* Geodesic polyline */}
          <Polyline
            path={[
              { lat: 24.7136, lng: 46.6753 }, // Riyadh
              { lat: 21.4858, lng: 39.1925 }, // Jeddah
              { lat: 26.4207, lng: 50.0888 }  // Dammam
            ]}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true
            }}
          />
          
          {/* Non-geodesic polyline */}
          <Polyline
            path={[
              { lat: 24.7136, lng: 46.6753 }, // Riyadh
              { lat: 21.4858, lng: 39.1925 }, // Jeddah
              { lat: 26.4207, lng: 50.0888 }  // Dammam
            ]}
            options={{
              strokeColor: '#0000FF',
              strokeOpacity: 0.6,
              strokeWeight: 2,
              geodesic: false
            }}
          />

          {/* City markers */}
          <Marker position={{ lat: 24.7136, lng: 46.6753 }} title="Riyadh" />
          <Marker position={{ lat: 21.4858, lng: 39.1925 }} title="Jeddah" />
          <Marker position={{ lat: 26.4207, lng: 50.0888 }} title="Dammam" />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';

const GeodesicComparison = () => {
  const cities = [
    { lat: 24.7136, lng: 46.6753 }, // Riyadh
    { lat: 21.4858, lng: 39.1925 }, // Jeddah
    { lat: 26.4207, lng: 50.0888 }  // Dammam
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.0, lng: 45.0 }}
      zoom={6}
    >
      {/* Geodesic polyline - follows Earth's curvature */}
      <Polyline
        path={cities}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          geodesic: true
        }}
      />
      
      {/* Non-geodesic polyline - straight lines */}
      <Polyline
        path={cities}
        options={{
          strokeColor: '#0000FF',
          strokeOpacity: 0.6,
          strokeWeight: 2,
          geodesic: false
        }}
      />

      {cities.map((city, index) => (
        <Marker key={index} position={city} />
      ))}
    </GoogleMap>
  );
};`
    },

    truckTracking: {
      title: 'Truck Tracking Animation',
      description: 'Real-time truck movement simulation with route visualization',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={{ lat: 24.6500, lng: 46.7000 }}
          zoom={ZOOM_LEVELS.STREET}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';

const TruckTrackingAnimation = () => {
  const [truckPosition, setTruckPosition] = useState(null);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [completedPath, setCompletedPath] = useState([]);

  // Saudi Arabia internal route - Riyadh to Dammam highway
  const truckRoute = [
    { lat: 24.7136, lng: 46.6753 }, // Riyadh - Kingdom Centre
    { lat: 24.7200, lng: 46.7100 }, // Exit Riyadh
    { lat: 24.7500, lng: 46.8000 }, // Highway checkpoint 1
    { lat: 25.0000, lng: 47.2000 }, // Highway checkpoint 2
    { lat: 25.2000, lng: 47.8000 }, // Highway checkpoint 3
    { lat: 25.5000, lng: 48.5000 }, // Highway checkpoint 4
    { lat: 26.0000, lng: 49.2000 }, // Approaching Dammam
    { lat: 26.4207, lng: 50.0888 }  // Dammam
  ];

  const calculateBearing = useCallback((start, end) => {
    const dLng = (end.lng - start.lng) * Math.PI / 180;
    const lat1 = start.lat * Math.PI / 180;
    const lat2 = end.lat * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }, []);

  useEffect(() => {
    if (!isTracking || currentPathIndex >= truckRoute.length - 1) {
      if (currentPathIndex >= truckRoute.length - 1) {
        setIsTracking(false);
      }
      return;
    }

    const interval = setInterval(() => {
      const currentPoint = truckRoute[currentPathIndex];
      const nextPoint = truckRoute[currentPathIndex + 1];
      
      setTruckPosition({
        ...currentPoint,
        bearing: calculateBearing(currentPoint, nextPoint)
      });
      
      setCompletedPath(prev => [...prev, currentPoint]);
      setCurrentPathIndex(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isTracking, currentPathIndex, calculateBearing]);

  const startTracking = () => {
    setCurrentPathIndex(0);
    setCompletedPath([]);
    setTruckPosition({ ...truckRoute[0], bearing: 0 });
    setIsTracking(true);
  };

  const resetTracking = () => {
    setIsTracking(false);
    setCurrentPathIndex(0);
    setCompletedPath([]);
    setTruckPosition(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={startTracking} disabled={isTracking}>
          🚚 Start Tracking
        </button>
        <button onClick={resetTracking} style={{ marginLeft: '10px' }}>
          🔄 Reset
        </button>
        <span style={{ marginLeft: '15px' }}>
          Status: {isTracking ? '🟢 Tracking' : '🔴 Stopped'} | 
          Progress: {currentPathIndex}/{truckRoute.length - 1}
        </span>
      </div>
      
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 25.0, lng: 48.0 }}
        zoom={7}
      >
        {/* Full route path */}
        <Polyline
          path={truckRoute}
          options={{
            strokeColor: '#E0E0E0',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            geodesic: true
          }}
        />
        
        {/* Completed path */}
        {completedPath.length > 0 && (
          <Polyline
            path={completedPath}
            options={{
              strokeColor: '#4CAF50',
              strokeOpacity: 0.8,
              strokeWeight: 5,
              geodesic: true
            }}
          />
        )}

        {/* Start marker */}
        <Marker
          position={truckRoute[0]}
          title="Start - Riyadh"
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="#4CAF50" stroke="white" stroke-width="2"/>
                <text x="15" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="bold">S</text>
              </svg>
            \`),
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />

        {/* End marker */}
        <Marker
          position={truckRoute[truckRoute.length - 1]}
          title="End - Dammam"
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="#F44336" stroke="white" stroke-width="2"/>
                <text x="15" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="bold">E</text>
              </svg>
            \`),
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />

        {/* Truck marker */}
        {truckPosition && (
          <Marker
            position={truckPosition}
            title="Truck Position"
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <g transform="rotate(\${truckPosition.bearing} 20 20)">
                    <rect x="8" y="12" width="24" height="16" fill="#2196F3" stroke="white" stroke-width="2" rx="2"/>
                    <rect x="8" y="16" width="16" height="8" fill="#1976D2"/>
                    <circle cx="14" cy="30" r="3" fill="#424242"/>
                    <circle cx="26" cy="30" r="3" fill="#424242"/>
                    <polygon points="32,12 36,16 36,20 32,20" fill="#1976D2"/>
                  </g>
                </svg>
              \`),
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20)
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};`
    },

    truckRoute: {
      title: 'Truck Route with Waypoints',
      description: 'Delivery route with start, end, and waypoint markers',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={{ lat: 24.6500, lng: 46.7000 }}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';

const TruckRouteWithWaypoints = () => {
  // Riyadh delivery route with multiple stops
  const deliveryRoute = [
    { lat: 24.7136, lng: 46.6753, name: "Depot - Kingdom Centre", type: "start" },
    { lat: 24.7200, lng: 46.6900, name: "Stop 1 - Business District", type: "waypoint" },
    { lat: 24.7000, lng: 46.7100, name: "Stop 2 - Shopping Mall", type: "waypoint" },
    { lat: 24.6800, lng: 46.7200, name: "Stop 3 - Residential Area", type: "waypoint" },
    { lat: 24.6600, lng: 46.7000, name: "Stop 4 - Office Complex", type: "waypoint" },
    { lat: 24.6400, lng: 46.6800, name: "Stop 5 - Hospital", type: "waypoint" },
    { lat: 24.6308, lng: 46.7073, name: "Final Stop - Masmak Fortress", type: "end" }
  ];

  const getMarkerIcon = (type, index) => {
    const colors = {
      start: '#4CAF50',
      waypoint: '#FF9800', 
      end: '#F44336'
    };
    
    const labels = {
      start: 'S',
      waypoint: index.toString(),
      end: 'E'
    };

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
        <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17.5" cy="17.5" r="15" fill="\${colors[type]}" stroke="white" stroke-width="3"/>
          <text x="17.5" y="23" text-anchor="middle" fill="white" font-size="14" font-weight="bold">
            \${labels[type]}
          </text>
        </svg>
      \`),
      scaledSize: new window.google.maps.Size(35, 35)
    };
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.6700, lng: 46.6900 }}
      zoom={12}
    >
      {/* Route polyline */}
      <Polyline
        path={deliveryRoute.map(point => ({ lat: point.lat, lng: point.lng }))}
        options={{
          strokeColor: '#2196F3',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          geodesic: true
        }}
      />

      {/* Route markers */}
      {deliveryRoute.map((point, index) => (
        <Marker
          key={index}
          position={{ lat: point.lat, lng: point.lng }}
          title={point.name}
          icon={getMarkerIcon(point.type, index)}
        />
      ))}
    </GoogleMap>
  );
};`
    },

    truckBidirectional: {
      title: 'Bidirectional Truck Movement',
      description: 'Truck that changes direction and returns with proper orientation',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={{ lat: 24.6500, lng: 46.7000 }}
          zoom={ZOOM_LEVELS.STREET}
        >
          {/* This will be populated by the component's state */}
        </GoogleMap>
      ),
      code: `import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';

const BidirectionalTruckMovement = () => {
  const [truckPosition, setTruckPosition] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState('forward'); // 'forward' or 'backward'
  const [completedPath, setCompletedPath] = useState([]);

  // Complex route with branches in Riyadh
  const complexRoute = [
    { lat: 24.7136, lng: 46.6753 }, // Start - Kingdom Centre
    { lat: 24.7100, lng: 46.6800 }, // Point 1
    { lat: 24.7050, lng: 46.6900 }, // Point 2
    { lat: 24.7000, lng: 46.7000 }, // Junction point
    { lat: 24.6950, lng: 46.7100 }, // Branch 1 - Point 4
    { lat: 24.6900, lng: 46.7200 }, // Branch 1 - Point 5
    { lat: 24.6850, lng: 46.7150 }, // Branch 1 - Point 6
    { lat: 24.6800, lng: 46.7100 }, // Branch 1 - End point
  ];

  const calculateBearing = useCallback((start, end) => {
    const dLng = (end.lng - start.lng) * Math.PI / 180;
    const lat1 = start.lat * Math.PI / 180;
    const lat2 = end.lat * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    
    // Adjust bearing for backward movement
    if (direction === 'backward') {
      bearing = (bearing + 180) % 360;
    }
    
    return bearing;
  }, [direction]);

  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      let nextIndex;
      let currentPoint, nextPoint;

      if (direction === 'forward') {
        if (currentIndex >= complexRoute.length - 1) {
          // Reached end, start going backward
          setDirection('backward');
          return;
        }
        nextIndex = currentIndex + 1;
        currentPoint = complexRoute[currentIndex];
        nextPoint = complexRoute[nextIndex];
      } else {
        if (currentIndex <= 0) {
          // Reached start, start going forward
          setDirection('forward');
          return;
        }
        nextIndex = currentIndex - 1;
        currentPoint = complexRoute[currentIndex];
        nextPoint = complexRoute[nextIndex];
      }

      const bearing = calculateBearing(currentPoint, nextPoint);
      
      setTruckPosition({
        ...nextPoint,
        bearing: bearing
      });
      
      setCurrentIndex(nextIndex);
      
      // Update completed path based on direction
      if (direction === 'forward') {
        setCompletedPath(complexRoute.slice(0, nextIndex + 1));
      } else {
        setCompletedPath(complexRoute.slice(nextIndex, currentIndex + 1));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isMoving, currentIndex, direction, calculateBearing]);

  const startMovement = () => {
    setCurrentIndex(0);
    setDirection('forward');
    setCompletedPath([complexRoute[0]]);
    setTruckPosition({ ...complexRoute[0], bearing: 0 });
    setIsMoving(true);
  };

  const stopMovement = () => {
    setIsMoving(false);
  };

  const resetMovement = () => {
    setIsMoving(false);
    setCurrentIndex(0);
    setDirection('forward');
    setCompletedPath([]);
    setTruckPosition(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={startMovement} disabled={isMoving}>
          ▶️ Start Movement
        </button>
        <button onClick={stopMovement} disabled={!isMoving} style={{ marginLeft: '10px' }}>
          ⏸️ Stop
        </button>
        <button onClick={resetMovement} style={{ marginLeft: '10px' }}>
          🔄 Reset
        </button>
        <span style={{ marginLeft: '15px' }}>
          Direction: {direction === 'forward' ? '➡️ Forward' : '⬅️ Backward'} | 
          Position: {currentIndex + 1}/{complexRoute.length}
        </span>
      </div>
      
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 24.6950, lng: 46.6950 }}
        zoom={13}
      >
        {/* Full route path */}
        <Polyline
          path={complexRoute}
          options={{
            strokeColor: '#E0E0E0',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            geodesic: true
          }}
        />
        
        {/* Active path */}
        {completedPath.length > 1 && (
          <Polyline
            path={completedPath}
            options={{
              strokeColor: direction === 'forward' ? '#4CAF50' : '#FF9800',
              strokeOpacity: 0.8,
              strokeWeight: 5,
              geodesic: true
            }}
          />
        )}

        {/* Route waypoints */}
        {complexRoute.map((point, index) => (
          <Marker
            key={index}
            position={point}
            title={\`Waypoint \${index + 1}\`}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" fill="#9E9E9E" stroke="white" stroke-width="2"/>
                  <text x="10" y="14" text-anchor="middle" fill="white" font-size="10" font-weight="bold">
                    \${index + 1}
                  </text>
                </svg>
              \`),
              scaledSize: new window.google.maps.Size(20, 20)
            }}
          />
        ))}

        {/* Truck marker with proper orientation */}
        {truckPosition && (
          <Marker
            position={truckPosition}
            title={\`Truck - Moving \${direction}\`}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(\`
                <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                  <g transform="rotate(\${truckPosition.bearing} 25 25)">
                    <rect x="10" y="15" width="30" height="20" fill="\${direction === 'forward' ? '#2196F3' : '#FF9800'}" stroke="white" stroke-width="2" rx="3"/>
                    <rect x="10" y="20" width="20" height="10" fill="\${direction === 'forward' ? '#1976D2' : '#F57C00'}"/>
                    <circle cx="17" cy="37" r="4" fill="#424242"/>
                    <circle cx="33" cy="37" r="4" fill="#424242"/>
                    <polygon points="40,15 45,20 45,25 40,25" fill="\${direction === 'forward' ? '#1976D2' : '#F57C00'}"/>
                    <text x="25" y="28" text-anchor="middle" fill="white" font-size="8" font-weight="bold">
                      \${direction === 'forward' ? '→' : '←'}
                    </text>
                  </g>
                </svg>
              \`),
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 25)
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};`
    }
  },
  propsData: {
    title: 'Polyline Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'path',
            type: 'LatLngLiteral[] | LatLng[]',
            description: 'Array of coordinates defining the polyline path',
            required: true
          },
          {
            name: 'options',
            type: 'PolylineOptions',
            description: 'Additional polyline configuration options',
            required: false
          }
        ],
        color: '#1976d2'
      },
      {
        title: 'Style Options',
        props: [
          {
            name: 'strokeColor',
            type: 'string',
            description: 'The color of the polyline stroke',
            required: false,
            defaultValue: '#FF0000'
          },
          {
            name: 'strokeOpacity',
            type: 'number',
            description: 'The opacity of the polyline stroke (0.0 to 1.0)',
            required: false,
            defaultValue: '1.0'
          },
          {
            name: 'strokeWeight',
            type: 'number',
            description: 'The width of the polyline stroke in pixels',
            required: false,
            defaultValue: '2'
          },
          {
            name: 'geodesic',
            type: 'boolean',
            description: 'Whether the polyline should follow the Earth\'s curvature',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'visible',
            type: 'boolean',
            description: 'Whether the polyline is visible on the map',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'zIndex',
            type: 'number',
            description: 'The z-index of the polyline (display order)',
            required: false
          }
        ],
        color: '#4caf50'
      },
      {
        title: 'Interaction Options',
        props: [
          {
            name: 'clickable',
            type: 'boolean',
            description: 'Whether the polyline can receive click events',
            required: false,
            defaultValue: 'true'
          },
          {
            name: 'draggable',
            type: 'boolean',
            description: 'Whether the polyline can be dragged',
            required: false,
            defaultValue: 'false'
          },
          {
            name: 'editable',
            type: 'boolean',
            description: 'Whether the polyline can be edited by users',
            required: false,
            defaultValue: 'false'
          }
        ],
        color: '#ff9800'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onLoad',
            type: '(polyline: google.maps.Polyline) => void',
            description: 'Callback fired when polyline loads',
            required: false
          },
          {
            name: 'onUnmount',
            type: '(polyline: google.maps.Polyline) => void',
            description: 'Callback fired when polyline unmounts',
            required: false
          },
          {
            name: 'onClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polyline is clicked',
            required: false
          },
          {
            name: 'onDblClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polyline is double-clicked',
            required: false
          },
          {
            name: 'onRightClick',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when polyline is right-clicked',
            required: false
          },
          {
            name: 'onMouseOver',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when mouse enters polyline',
            required: false
          },
          {
            name: 'onMouseOut',
            type: '(e: google.maps.PolyMouseEvent) => void',
            description: 'Callback fired when mouse leaves polyline',
            required: false
          },
          {
            name: 'onDrag',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired repeatedly while dragging',
            required: false
          },
          {
            name: 'onDragStart',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when dragging starts',
            required: false
          },
          {
            name: 'onDragEnd',
            type: '(e: google.maps.MapMouseEvent) => void',
            description: 'Callback fired when dragging ends',
            required: false
          }
        ],
        color: '#9c27b0'
      }
    ]
  },
  bestPractices: {
    dos: [
      {
        text: "Use geodesic for long-distance paths",
        description: "Enable geodesic option for paths spanning large distances to follow Earth's curvature"
      },
      {
        text: "Optimize path complexity",
        description: "Limit the number of points for better performance, especially on mobile devices"
      },
      {
        text: "Use appropriate stroke weight",
        description: "Choose stroke weight that's visible but not overwhelming for the map scale"
      },
      {
        text: "Implement proper event handling",
        description: "Use useCallback for event handlers to prevent unnecessary re-renders"
      },
      {
        text: "Consider color accessibility",
        description: "Choose colors that are visible against different map backgrounds and accessible to colorblind users"
      },
      {
        text: "Use consistent styling",
        description: "Maintain visual consistency across multiple polylines in your application"
      }
    ],
    donts: [
      {
        text: "Don't use too many points",
        description: "Excessive points can impact performance and make the polyline difficult to interact with"
      },
      {
        text: "Don't ignore geodesic for global paths",
        description: "Non-geodesic lines can appear incorrect over long distances"
      },
      {
        text: "Don't use very thick strokes unnecessarily",
        description: "Overly thick polylines can obscure map details and impact performance"
      },
      {
        text: "Don't forget to handle path updates",
        description: "When using editable polylines, properly handle path change events"
      },
      {
        text: "Don't use low opacity for important paths",
        description: "Important routes should be clearly visible to users"
      },
      {
        text: "Don't mix geodesic and non-geodesic inconsistently",
        description: "Be consistent in your choice of geodesic setting for similar types of paths"
      }
    ],
    tips: [
      {
        text: "Use path simplification algorithms",
        description: "Implement Douglas-Peucker or similar algorithms to reduce point count while maintaining shape"
      },
      {
        text: "Animate polyline drawing",
        description: "Create engaging user experiences by progressively drawing polylines"
      },
      {
        text: "Combine with markers for waypoints",
        description: "Use markers to highlight important points along the polyline path"
      },
      {
        text: "Implement hover effects",
        description: "Change polyline appearance on hover to improve user interaction feedback"
      }
    ]
  },
  useCases: [
    {
      title: "Route Planning",
      description: "Display navigation routes, delivery paths, and travel itineraries",
      examples: [
        "GPS navigation routes",
        "Delivery truck routes",
        "Tourist walking tours",
        "Public transportation lines"
      ],
      icon: "🗺️",
      color: "#1976d2"
    },
    {
      title: "Boundary Visualization",
      description: "Show geographical boundaries, property lines, and administrative areas",
      examples: [
        "Country and state borders",
        "Property boundaries",
        "Zoning areas",
        "Protected regions"
      ],
      icon: "🏞️",
      color: "#4caf50"
    },
    {
      title: "Network Infrastructure",
      description: "Visualize utility networks, transportation systems, and communication lines",
      examples: [
        "Power line networks",
        "Pipeline systems",
        "Fiber optic cables",
        "Railway networks"
      ],
      icon: "🔌",
      color: "#ff9800"
    },
    {
      title: "Data Visualization",
      description: "Represent movement patterns, flow data, and temporal changes",
      examples: [
        "Migration patterns",
        "Traffic flow analysis",
        "Weather front movements",
        "Historical timeline paths"
      ],
      icon: "📊",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'polyline-basic',
      title: 'Create a Basic Polyline',
      description: 'Draw a simple polyline connecting multiple points on the map.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Create a Polyline component with at least 3 points',
        'Set appropriate stroke color and weight',
        'Position the polyline to connect meaningful locations',
        'Ensure the polyline is visible on the map'
      ],
      hints: [
        'Use the path prop with an array of coordinates',
        'Set strokeColor, strokeOpacity, and strokeWeight in options',
        'Choose coordinates that create a visible path'
      ]
    },
    {
      id: 'polyline-interactive',
      title: 'Build Interactive Polyline Creator',
      description: 'Allow users to click on the map to create custom polylines.',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      requirements: [
        'Handle map click events to add points',
        'Display markers at each point',
        'Show the polyline as points are added',
        'Provide a way to clear the path'
      ],
      hints: [
        'Use useState to manage the path array',
        'Handle onClick event on the GoogleMap',
        'Use map() to render markers for each point',
        'Update path state when new points are added'
      ]
    },
    {
      id: 'polyline-styled',
      title: 'Create Multiple Styled Polylines',
      description: 'Display multiple polylines with different styles and colors.',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      requirements: [
        'Create at least 3 different polylines',
        'Use different colors and stroke weights',
        'Implement geodesic and non-geodesic examples',
        'Add a legend explaining each polyline'
      ],
      hints: [
        'Create an array of polyline configurations',
        'Use different strokeColor values',
        'Set geodesic to true for some polylines',
        'Consider using map() to render multiple polylines'
      ]
    },
    {
      id: 'polyline-animated',
      title: 'Animate Polyline Drawing',
      description: 'Create an animated effect where the polyline is drawn progressively.',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      requirements: [
        'Implement progressive polyline drawing',
        'Add start/stop animation controls',
        'Show current position during animation',
        'Provide animation speed control'
      ],
      hints: [
        'Use useEffect with setInterval for animation',
        'Gradually add points to the path array',
        'Use a marker to show current position',
        'Clear intervals on component unmount'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/info-window", label: "InfoWindow" },
    next: { href: "/components-guide/polygon", label: "Polygon" }
  }
};