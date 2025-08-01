import React, { useEffect, useMemo, useState, useRef } from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import { polylineGuideData } from '../../data/guide/polylineGuideData';
import { usePolylineGuideState } from '../../hooks/useGuideState';
import { 
  GUIDE_CONFIG, 
  RIYADH_LANDMARKS, 
  GUIDE_ZOOM_LEVELS, 
  GUIDE_ANIMATION_PATHS,
  GUIDE_STYLING_EXAMPLES,
  APP_STYLES
} from '../../constants';
import { createMapClickHandler, createAnimationSequence } from '../../utils/guideHelpers';
import { createTruckIcon, createDetailedRoute, saudiRoutes, calculateBearing } from '../../utils/truckIcon';
import { createEnhancedTruckIcon, createWaypointIcon } from '../../utils/enhancedTruckIcons';
import { createPremiumTruckIcon, createUltraDetailedRoute, enhancedSaudiRoutes, calculateSmoothBearing } from '../../utils/premiumTruckIcon';
import { calculateStabilizedBearing, calculateStableBearing } from '../../utils/ultraSmoothBearing';
import { calculatePersistentBearing, calculatePersistentBidirectionalBearing } from '../../utils/persistentBearing';
import { calculateAdvancedBearing, calculateAdvancedBidirectionalBearing, resetBearingManagers } from '../../utils/advancedBearingControl';
import { createProfessionalTruckIcon } from '../../utils/professionalTruckIcon';
import '../../styles/compact-controls.css';
import '../../styles/truck-tracking.css';

// Define types for truck position
interface TruckPosition {
  lat: number;
  lng: number;
  bearing: number;
}

interface RoutePoint {
  lat: number;
  lng: number;
}

const PolylineGuide: React.FC = () => {
  const {
    selectedExample,
    interactivePath,
    animatedPath,
    isAnimating,
    animationIndex,
    setSelectedExample,
    setAnimatedPath,
    setIsAnimating,
    setAnimationIndex,
    addPathPoint,
    clearPath,
    startAnimation,
    resetAnimation,
    resetPolylineState,
  } = usePolylineGuideState();

  // Advanced truck tracking states with professional bearing control
  const [truckPosition, setTruckPosition] = useState<TruckPosition | null>(null);
  const [truckPathIndex, setTruckPathIndex] = useState<number>(0);
  const [isTruckTracking, setIsTruckTracking] = useState<boolean>(false);
  const [truckCompletedPath, setTruckCompletedPath] = useState<RoutePoint[]>([]);
  const [mapCenter, setMapCenter] = useState<RoutePoint>({ lat: 25.0, lng: 48.0 });
  const mapRef = useRef<google.maps.Map | null>(null);

  // Bidirectional truck states with professional bearing control
  const [bidirectionalTruckPosition, setBidirectionalTruckPosition] = useState<TruckPosition | null>(null);
  const [bidirectionalIndex, setBidirectionalIndex] = useState<number>(0);
  const [isBidirectionalMoving, setIsBidirectionalMoving] = useState<boolean>(false);
  const [bidirectionalDirection, setBidirectionalDirection] = useState<'forward' | 'backward'>('forward');
  const [bidirectionalCompletedPath, setBidirectionalCompletedPath] = useState<RoutePoint[]>([]);
  const [cityMapCenter, setCityMapCenter] = useState<RoutePoint>({ lat: 24.6950, lng: 46.6950 });
  const cityMapRef = useRef<google.maps.Map | null>(null);

  // Use common animation path - memoize to prevent re-creation
  const fullAnimationPath = useMemo(() => [...GUIDE_ANIMATION_PATHS.RIYADH_TOUR], []);

  // Create ultra-detailed routes with massive number of points for ultra-smooth movement
  const ultraDetailedTruckRoute = useMemo(() => {
    return createUltraDetailedRoute(enhancedSaudiRoutes.riyadhToDammamHighway, 100); // 100 points per segment!
  }, []);

  const ultraDetailedCityRoute = useMemo(() => {
    return createUltraDetailedRoute(enhancedSaudiRoutes.riyadhCityDetailed, 80); // 80 points per segment!
  }, []);

  const deliveryRoute = useMemo(() => [
    { lat: 24.7136, lng: 46.6753, name: "Depot - Kingdom Centre", type: "start" },
    { lat: 24.7200, lng: 46.6900, name: "Stop 1 - Business District", type: "waypoint" },
    { lat: 24.7000, lng: 46.7100, name: "Stop 2 - Shopping Mall", type: "waypoint" },
    { lat: 24.6800, lng: 46.7200, name: "Stop 3 - Residential Area", type: "waypoint" },
    { lat: 24.6600, lng: 46.7000, name: "Stop 4 - Office Complex", type: "waypoint" },
    { lat: 24.6400, lng: 46.6800, name: "Stop 5 - Hospital", type: "waypoint" },
    { lat: 24.6308, lng: 46.7073, name: "Final Stop - Masmak Fortress", type: "end" }
  ], []);

  // Create map click handler
  const onMapClick = createMapClickHandler(selectedExample, 'interactive', addPathPoint);

  // Function to center map on truck position
  const centerMapOnTruck = (position: TruckPosition, mapInstance: google.maps.Map | null) => {
    if (mapInstance && position) {
      mapInstance.panTo({ lat: position.lat, lng: position.lng });
    }
  };

  // Animation effect for the animated polyline example
  useEffect(() => {
    if (!isAnimating || animationIndex >= fullAnimationPath.length) {
      if (animationIndex >= fullAnimationPath.length) {
        setIsAnimating(false);
      }
      return;
    }

    const cleanup = createAnimationSequence(
      fullAnimationPath.slice(animationIndex - 1),
      (currentPath, index) => {
        setAnimatedPath(fullAnimationPath.slice(0, animationIndex + index));
        setAnimationIndex(animationIndex + index);
      },
      () => setIsAnimating(false),
      GUIDE_CONFIG.ANIMATION_DURATION
    );

    return cleanup;
  }, [isAnimating, animationIndex, fullAnimationPath, setAnimatedPath, setIsAnimating, setAnimationIndex]);

  // Professional truck tracking with advanced bearing control
  useEffect(() => {
    if (!isTruckTracking || truckPathIndex >= ultraDetailedTruckRoute.length - 1) {
      if (truckPathIndex >= ultraDetailedTruckRoute.length - 1) {
        setIsTruckTracking(false);
      }
      return;
    }

    const interval = setInterval(() => {
      const currentPoint = ultraDetailedTruckRoute[truckPathIndex];
      
      if (currentPoint) {
        // Use advanced bearing control system
        let bearing = calculateAdvancedBearing(
          ultraDetailedTruckRoute, 
          truckPathIndex, 
          'truck'
        );
        
        // Adjust for horizontal orientation (subtract 90 degrees)
        bearing = (bearing - 90 + 360) % 360;
        
        const newPosition = {
          lat: currentPoint.lat,
          lng: currentPoint.lng,
          bearing: bearing
        };
        
        setTruckPosition(newPosition);
        
        // Update map center every 25 steps to follow the truck smoothly
        if (truckPathIndex % 25 === 0) {
          setMapCenter({ lat: currentPoint.lat, lng: currentPoint.lng });
          centerMapOnTruck(newPosition, mapRef.current);
        }
        
        setTruckCompletedPath(prev => {
          const newPath = [...prev];
          if (newPath.length === 0 || 
              newPath[newPath.length - 1].lat !== currentPoint.lat || 
              newPath[newPath.length - 1].lng !== currentPoint.lng) {
            newPath.push({ lat: currentPoint.lat, lng: currentPoint.lng });
          }
          return newPath;
        });
        
        setTruckPathIndex(prev => prev + 1);
      }
    }, 150); // Slower for professional smooth movement

    return () => clearInterval(interval);
  }, [isTruckTracking, truckPathIndex, ultraDetailedTruckRoute]);

  // Professional bidirectional truck movement with advanced bearing control
  useEffect(() => {
    if (!isBidirectionalMoving) return;

    const interval = setInterval(() => {
      let nextIndex: number;

      if (bidirectionalDirection === 'forward') {
        if (bidirectionalIndex >= ultraDetailedCityRoute.length - 1) {
          setBidirectionalDirection('backward');
          return;
        }
        nextIndex = bidirectionalIndex + 1;
      } else {
        if (bidirectionalIndex <= 0) {
          setBidirectionalDirection('forward');
          return;
        }
        nextIndex = bidirectionalIndex - 1;
      }

      const nextPoint = ultraDetailedCityRoute[nextIndex];
      
      if (nextPoint) {
        // Use advanced bidirectional bearing calculation
        let bearing = calculateAdvancedBidirectionalBearing(
          ultraDetailedCityRoute, 
          bidirectionalIndex, 
          bidirectionalDirection
        );
        
        // Adjust for horizontal orientation
        bearing = (bearing - 90 + 360) % 360;
        
        const newPosition = {
          lat: nextPoint.lat,
          lng: nextPoint.lng,
          bearing: bearing
        };
        
        setBidirectionalTruckPosition(newPosition);
        setBidirectionalIndex(nextIndex);
        
        // Update map center every 30 steps to follow the truck smoothly
        if (bidirectionalIndex % 30 === 0) {
          setCityMapCenter({ lat: nextPoint.lat, lng: nextPoint.lng });
          centerMapOnTruck(newPosition, cityMapRef.current);
        }
        
        // Update path based on direction
        if (bidirectionalDirection === 'forward') {
          setBidirectionalCompletedPath(ultraDetailedCityRoute.slice(0, nextIndex + 1));
        } else {
          setBidirectionalCompletedPath(ultraDetailedCityRoute.slice(nextIndex, bidirectionalIndex + 1));
        }
      }
    }, 120); // Professional smooth movement

    return () => clearInterval(interval);
  }, [isBidirectionalMoving, bidirectionalIndex, bidirectionalDirection, ultraDetailedCityRoute]);

  // Professional truck tracking handlers
  const startTruckTracking = () => {
    resetBearingManagers(); // Reset bearing control system
    setTruckPathIndex(0);
    setTruckCompletedPath([]);
    const initialPosition = { 
      lat: ultraDetailedTruckRoute[0].lat, 
      lng: ultraDetailedTruckRoute[0].lng, 
      bearing: 0 
    };
    setTruckPosition(initialPosition);
    setMapCenter({ lat: ultraDetailedTruckRoute[0].lat, lng: ultraDetailedTruckRoute[0].lng });
    setIsTruckTracking(true);
    
    // Center map on initial position
    setTimeout(() => {
      centerMapOnTruck(initialPosition, mapRef.current);
    }, 100);
  };

  const resetTruckTracking = () => {
    setIsTruckTracking(false);
    setTruckPathIndex(0);
    setTruckCompletedPath([]);
    setTruckPosition(null);
    resetBearingManagers();
    setMapCenter({ lat: 25.0, lng: 48.0 });
  };

  // Bidirectional truck handlers
  const startBidirectionalMovement = () => {
    resetBearingManagers(); // Reset bearing control system
    setBidirectionalIndex(0);
    setBidirectionalDirection('forward');
    setBidirectionalCompletedPath([ultraDetailedCityRoute[0]]);
    const initialPosition = { 
      lat: ultraDetailedCityRoute[0].lat, 
      lng: ultraDetailedCityRoute[0].lng, 
      bearing: 0 
    };
    setBidirectionalTruckPosition(initialPosition);
    setCityMapCenter({ lat: ultraDetailedCityRoute[0].lat, lng: ultraDetailedCityRoute[0].lng });
    setIsBidirectionalMoving(true);
    
    // Center map on initial position
    setTimeout(() => {
      centerMapOnTruck(initialPosition, cityMapRef.current);
    }, 100);
  };

  const stopBidirectionalMovement = () => {
    setIsBidirectionalMoving(false);
  };

  const resetBidirectionalMovement = () => {
    setIsBidirectionalMoving(false);
    setBidirectionalIndex(0);
    setBidirectionalDirection('forward');
    setBidirectionalCompletedPath([]);
    setBidirectionalTruckPosition(null);
    resetBearingManagers();
    setCityMapCenter({ lat: 24.6950, lng: 46.6950 });
  };

  // Enhanced marker icon generators
  const getMarkerIcon = (type: string, index: number) => {
    return createWaypointIcon(type, index, false);
  };

  const handleStartAnimation = () => {
    startAnimation(fullAnimationPath);
  };

  const handleResetAnimation = () => {
    resetAnimation();
  };

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...polylineGuideData.examples,
    interactive: {
      ...polylineGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={RIYADH_LANDMARKS.KINGDOM_CENTRE}
          zoom={GUIDE_ZOOM_LEVELS.DISTRICT}
          onClick={onMapClick}
        >
          {interactivePath.length >= 2 && (
            <Polyline
              path={interactivePath}
              options={{
                strokeColor: APP_STYLES.COLORS.ACCENT,
                strokeOpacity: APP_STYLES.OPACITY.HIGH,
                strokeWeight: APP_STYLES.STROKE_WEIGHT.THICK,
                clickable: true
              }}
              onClick={(e) => {
                console.log('Polyline clicked at:', e.latLng?.lat(), e.latLng?.lng());
              }}
            />
          )}

          {interactivePath.map((point, index) => (
            <Marker
              key={index}
              position={point}
              title={`Point ${index + 1}`}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          ))}
        </GoogleMap>
      )
    },
    animated: {
      ...polylineGuideData.examples.animated,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={RIYADH_LANDMARKS.KINGDOM_CENTRE}
          zoom={GUIDE_ZOOM_LEVELS.STREET}
        >
          {animatedPath.length >= 2 && (
            <Polyline
              path={animatedPath}
              options={{
                strokeColor: APP_STYLES.COLORS.ACCENT,
                strokeOpacity: APP_STYLES.OPACITY.HIGH,
                strokeWeight: APP_STYLES.STROKE_WEIGHT.VERY_THICK,
                geodesic: true
              }}
            />
          )}

          {/* Start marker */}
          <Marker
            position={fullAnimationPath[0]}
            title="Start"
          />

          {/* End marker */}
          <Marker
            position={fullAnimationPath[fullAnimationPath.length - 1]}
            title="End"
          />

          {/* Current position marker */}
          {isAnimating && animatedPath.length > 0 && (
            <Marker
              position={animatedPath[animatedPath.length - 1]}
              title="Current Position"
            />
          )}
        </GoogleMap>
      )
    },
    truckTracking: {
      ...polylineGuideData.examples.truckTracking,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={mapCenter}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true
          }}
        >
          {/* Full route path - lighter and thinner */}
          <Polyline
            path={enhancedSaudiRoutes.riyadhToDammamHighway}
            options={{
              strokeColor: '#E0E0E0',
              strokeOpacity: 0.4,
              strokeWeight: 2,
              geodesic: true
            }}
          />
          
          {/* Completed path with enhanced styling */}
          {truckCompletedPath.length > 0 && (
            <Polyline
              path={truckCompletedPath}
              options={{
                strokeColor: '#4CAF50',
                strokeOpacity: 0.8,
                strokeWeight: 6,
                geodesic: true
              }}
            />
          )}

          {/* Only show start and end markers - no intermediate waypoints */}
          <Marker
            position={enhancedSaudiRoutes.riyadhToDammamHighway[0]}
            title="Start - Riyadh"
            icon={createWaypointIcon('start', 0, false)}
          />

          <Marker
            position={enhancedSaudiRoutes.riyadhToDammamHighway[enhancedSaudiRoutes.riyadhToDammamHighway.length - 1]}
            title="End - Dammam"
            icon={createWaypointIcon('end', 0, false)}
          />

          {/* Professional truck marker with advanced bearing control */}
          {truckPosition && (
            <Marker
              position={truckPosition}
              title={`Professional Truck - ${Math.round((truckPathIndex / ultraDetailedTruckRoute.length) * 100)}% Complete`}
              icon={createProfessionalTruckIcon(truckPosition.bearing, 'forward', isTruckTracking, 'modern')}
              zIndex={1000}
            />
          )}
        </GoogleMap>
      )
    },
    truckRoute: {
      ...polylineGuideData.examples.truckRoute,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={{ lat: 24.6700, lng: 46.6900 }}
          zoom={12}
        >
          {/* Route polyline */}
          <Polyline
            path={deliveryRoute.map(point => ({ lat: point.lat, lng: point.lng }))}
            options={{
              strokeColor: '#2196F3',
              strokeOpacity: 0.8,
              strokeWeight: 5,
              geodesic: true
            }}
          />

          {/* Enhanced route markers */}
          {deliveryRoute.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.lat, lng: point.lng }}
              title={point.name}
              icon={createWaypointIcon(point.type, index, false)}
            />
          ))}
        </GoogleMap>
      )
    },
    truckBidirectional: {
      ...polylineGuideData.examples.truckBidirectional,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={cityMapCenter}
          zoom={14}
          onLoad={(map) => {
            cityMapRef.current = map;
          }}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true
          }}
        >
          {/* Full route path - lighter and thinner */}
          <Polyline
            path={enhancedSaudiRoutes.riyadhCityDetailed}
            options={{
              strokeColor: '#E0E0E0',
              strokeOpacity: 0.4,
              strokeWeight: 2,
              geodesic: true
            }}
          />
          
          {/* Active path with direction-based coloring */}
          {bidirectionalCompletedPath.length > 1 && (
            <Polyline
              path={bidirectionalCompletedPath}
              options={{
                strokeColor: bidirectionalDirection === 'forward' ? '#4CAF50' : '#FF9800',
                strokeOpacity: 0.8,
                strokeWeight: 6,
                geodesic: true
              }}
            />
          )}

          {/* Only show start and end markers */}
          <Marker
            position={enhancedSaudiRoutes.riyadhCityDetailed[0]}
            title="Start - Kingdom Centre"
            icon={createWaypointIcon('start', 0, false)}
          />

          <Marker
            position={enhancedSaudiRoutes.riyadhCityDetailed[enhancedSaudiRoutes.riyadhCityDetailed.length - 1]}
            title="End - Masmak Fortress"
            icon={createWaypointIcon('end', 0, false)}
          />

          {/* Professional bidirectional truck marker with advanced bearing control */}
          {bidirectionalTruckPosition && (
            <Marker
              position={bidirectionalTruckPosition}
              title={`Professional Smart Truck - ${bidirectionalDirection} - ${Math.round((bidirectionalIndex / ultraDetailedCityRoute.length) * 100)}%`}
              icon={createProfessionalTruckIcon(
                bidirectionalTruckPosition.bearing, 
                bidirectionalDirection, 
                isBidirectionalMoving,
                'cargo'
              )}
              zIndex={1000}
            />
          )}
        </GoogleMap>
      )
    }
  };

  // Create styling examples using common templates
  const stylingExamples = [
    {
      ...GUIDE_STYLING_EXAMPLES.BASIC,
      code: `<Polyline
  path={pathCoordinates}
  options={{
    strokeColor: '${APP_STYLES.COLORS.ERROR}',
    strokeOpacity: ${APP_STYLES.OPACITY.HIGH},
    strokeWeight: ${APP_STYLES.STROKE_WEIGHT.THICK},
    geodesic: true
  }}
/>`
    },
    {
      ...GUIDE_STYLING_EXAMPLES.ADVANCED,
      code: `<Polyline
  path={pathCoordinates}
  options={{
    strokeColor: '${APP_STYLES.COLORS.SUCCESS}',
    strokeOpacity: ${APP_STYLES.OPACITY.VERY_HIGH},
    strokeWeight: ${APP_STYLES.STROKE_WEIGHT.VERY_THICK},
    geodesic: true,
    clickable: true,
    draggable: false,
    editable: false,
    zIndex: 1
  }}
  onClick={handlePolylineClick}
/>`
    },
    {
      title: 'Professional Bearing Control System',
      color: APP_STYLES.COLORS.INFO,
      description: 'Advanced bearing control system with state management that prevents sudden rotations and provides cinema-quality smooth transitions.',
      code: `// Professional bearing control with state management
import { calculateAdvancedBearing, resetBearingManagers } from './advancedBearingControl';

// Advanced bearing with multiple look-ahead points and weighted averaging
let bearing = calculateAdvancedBearing(
  ultraDetailedRoute, 
  currentIndex, 
  'truck' // Manager ID for state isolation
);

// State-managed bearing transitions
// - Only changes when difference > 5 degrees
// - Transitions at 2 degrees per step
// - Uses weighted average of multiple look-ahead distances
// - Prevents sudden 180+ degree rotations

// Professional truck icon with enhanced design
const icon = createProfessionalTruckIcon(
  bearing, 
  direction, 
  isMoving, 
  'modern' // modern, cargo, delivery
);

<Marker
  position={truckPosition}
  icon={icon}
  zIndex={1000}
/>`
    }
  ];

  // Define control sections for each example - compact design
  const controlSections = {
    basic: [
      {
        title: 'Basic Polyline',
        content: (
          <div className="control-group compact">
            <div className="compact-info">
              📍 Route Path • 🗺️ Riyadh Tour • 🎨 Standard Styling
            </div>
          </div>
        )
      }
    ],
    interactive: [
      {
        title: 'Interactive Path Builder',
        content: (
          <div className="control-group compact">
            <div className="compact-status">
              <div className="status-info">
                <span>📍 Points: {interactivePath.length}</span>
                <span>📏 Path: {interactivePath.length >= 2 ? 'Valid' : 'Need 2+ points'}</span>
              </div>
              <button 
                onClick={clearPath}
                className="control-button danger compact"
                disabled={interactivePath.length === 0}
              >
                🗑️ Clear Path
              </button>
            </div>
            {interactivePath.length === 0 && (
              <div className="compact-info">
                Click on the map to add points and create a path
              </div>
            )}
          </div>
        )
      }
    ],
    animated: [
      {
        title: 'Animation Controls',
        content: (
          <div className="control-group compact">
            <div className="compact-status">
              <div className="status-info">
                <span className={`status-dot ${isAnimating ? 'active' : 'inactive'}`}></span>
                <span>{isAnimating ? 'Animating' : 'Stopped'}</span>
                <span className="points-badge">{animatedPath.length}/{fullAnimationPath.length}</span>
              </div>
              <div className="compact-controls">
                <button 
                  onClick={handleStartAnimation}
                  className="control-button primary compact"
                  disabled={isAnimating}
                >
                  ▶️ Start Animation
                </button>
                <button 
                  onClick={handleResetAnimation}
                  className="control-button secondary compact"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        )
      }
    ],
    truckTracking: [
      {
        title: 'Professional Bearing Control System',
        content: (
          <div className="control-group compact">
            <div className="compact-status">
              <div className="status-info">
                <span className={`status-dot ${isTruckTracking ? 'tracking' : 'inactive'}`}></span>
                <span>{isTruckTracking ? '🟢 Professional' : '🔴 Stopped'}</span>
                <span className="points-badge">{Math.round((truckPathIndex / ultraDetailedTruckRoute.length) * 100)}%</span>
              </div>
              <div className="compact-controls">
                <button 
                  onClick={startTruckTracking}
                  className="control-button primary compact"
                  disabled={isTruckTracking}
                >
                  🚚 Start Professional
                </button>
                <button 
                  onClick={resetTruckTracking}
                  className="control-button secondary compact"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
            <div className="compact-info">
              State-managed bearing • No sudden rotations • Cinema-quality • {ultraDetailedTruckRoute.length} points
            </div>
          </div>
        )
      }
    ],
    truckRoute: [
      {
        title: 'Professional Delivery Route',
        content: (
          <div className="control-group compact">
            <div className="compact-info">
              🚚 Delivery Route • 📍 {deliveryRoute.length} Stops • 🗺️ Riyadh City
            </div>
            <div className="route-legend">
              <span className="legend-item"><span className="legend-color start"></span>Depot</span>
              <span className="legend-item"><span className="legend-color waypoint"></span>Delivery Stops</span>
              <span className="legend-item"><span className="legend-color end"></span>Final Stop</span>
            </div>
          </div>
        )
      }
    ],
    truckBidirectional: [
      {
        title: 'Professional Smart Bidirectional System',
        content: (
          <div className="control-group compact">
            <div className="compact-status">
              <div className="status-info">
                <span className={`status-dot ${isBidirectionalMoving ? (bidirectionalDirection === 'forward' ? 'moving-forward' : 'moving-backward') : 'inactive'}`}></span>
                <span>{bidirectionalDirection === 'forward' ? '➡️ Forward' : '⬅️ Backward'}</span>
                <span className="points-badge">{Math.round((bidirectionalIndex / ultraDetailedCityRoute.length) * 100)}%</span>
              </div>
              <div className="compact-controls">
                <button 
                  onClick={startBidirectionalMovement}
                  className="control-button primary compact"
                  disabled={isBidirectionalMoving}
                >
                  ▶️ Start Professional
                </button>
                <button 
                  onClick={stopBidirectionalMovement}
                  className="control-button warning compact"
                  disabled={!isBidirectionalMoving}
                >
                  ⏸️ Stop
                </button>
                <button 
                  onClick={resetBidirectionalMovement}
                  className="control-button secondary compact"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
            <div className="compact-info">
              Advanced bearing control • Direction-aware • Professional design • {ultraDetailedCityRoute.length} points
            </div>
          </div>
        )
      }
    ],
    styled: [
      {
        title: 'Styling Options',
        content: (
          <div className="control-group compact">
            <div className="compact-styles">
              <div className="style-item">
                <div className="style-preview stroke" style={{ borderColor: '#ff6b6b', borderWidth: '3px' }}></div>
                <span>Stroke Color</span>
              </div>
              <div className="style-item">
                <div className="style-preview weight" style={{ borderColor: '#4ecdc4', borderWidth: '5px' }}></div>
                <span>Stroke Weight</span>
              </div>
              <div className="style-item">
                <div className="style-preview opacity" style={{ borderColor: '#45b7d1', opacity: 0.5, borderWidth: '3px' }}></div>
                <span>Opacity</span>
              </div>
              <div className="style-item">
                <div className="style-preview geodesic" style={{ borderColor: '#96ceb4', borderWidth: '3px', borderStyle: 'dashed' }}></div>
                <span>Geodesic</span>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  return (
    <GuideLayout
      title={polylineGuideData.title}
      subtitle={polylineGuideData.subtitle}
      icon={polylineGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={polylineGuideData.propsData}
      bestPractices={polylineGuideData.bestPractices}
      useCases={polylineGuideData.useCases}
      tasks={polylineGuideData.tasks}
      navigationLinks={polylineGuideData.navigationLinks}
      stylingExamples={stylingExamples}
      onMapReset={resetPolylineState}
      controlSections={controlSections}
    />
  );
};

export default PolylineGuide;