import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { AnimatedTruckMarker, Truck, Alert } from '../components/saudi-logistics/AnimatedTruckMarker';
import { TruckDetailInfoWindow } from '../components/saudi-logistics/TruckDetailInfoWindow';
import { SmartRouteComparison, Trip, Route, Checkpoint, RouteDeviation, RouteAnalysis } from '../components/saudi-logistics/SmartRouteComparison';
import CodeBlock from '../components/CodeBlock';

const CustomComponentsDemo: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('AnimatedTruckMarker');
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [mapCenter] = useState({ lat: 24.7136, lng: 46.6753 }); // Riyadh
  const [routeAnalysis, setRouteAnalysis] = useState<RouteAnalysis | null>(null);

  // Sample truck data
  const [sampleTrucks, setSampleTrucks] = useState<Truck[]>([
    {
      id: 'truck-1',
      plateNumber: 'RUH-1234',
      currentLocation: { lat: 24.7136, lng: 46.6753 },
      heading: 45,
      currentSpeed: 65,
      speedLimit: 80,
      status: 'moving',
      type: 'container',
      driver: { id: 'driver-1', name: 'Ahmed Al-Rashid' },
      company: { id: 'company-1', name: 'Saudi Logistics', colorCode: 'blue' },
      alerts: [
        { id: 'alert-1', type: 'speed_violation', severity: 'medium', message: 'Approaching speed limit', timestamp: new Date() }
      ],
      isSelected: false,
      lastUpdateTime: new Date(),
      fuelLevel: 75,
      continuousDrivingTime: 2 * 60 * 60 * 1000, // 2 hours
      emergencyButtonPressed: false,
      currentRegion: 'Riyadh',
      priority: 1
    },
    {
      id: 'truck-2',
      plateNumber: 'JED-5678',
      currentLocation: { lat: 24.8, lng: 46.7 },
      heading: 180,
      currentSpeed: 45,
      speedLimit: 60,
      status: 'stopped',
      type: 'tanker',
      driver: { id: 'driver-2', name: 'Mohammed Al-Fahad' },
      company: { id: 'company-2', name: 'Gulf Transport', colorCode: 'green' },
      alerts: [],
      isSelected: false,
      lastUpdateTime: new Date(),
      fuelLevel: 90,
      continuousDrivingTime: 1 * 60 * 60 * 1000, // 1 hour
      emergencyButtonPressed: false,
      currentRegion: 'Riyadh',
      priority: 2
    }
  ]);

  // Sample trip data
  const sampleTrip: Trip = {
    id: 'trip-1',
    plannedRoute: {
      id: 'planned-1',
      name: 'Planned Route',
      path: [
        { lat: 24.7136, lng: 46.6753 },
        { lat: 24.5, lng: 46.0 },
        { lat: 24.0, lng: 45.0 },
        { lat: 23.5, lng: 44.0 },
        { lat: 21.4858, lng: 39.1925 }
      ],
      distance: 950000,
      estimatedDuration: 8 * 60 * 60 * 1000,
      color: '#2196F3',
      type: 'planned'
    },
    actualRoute: {
      id: 'actual-1',
      name: 'Actual Route',
      path: [
        { lat: 24.7136, lng: 46.6753 },
        { lat: 24.6, lng: 46.1 },
        { lat: 24.1, lng: 45.2 },
        { lat: 23.6, lng: 44.1 },
        { lat: 21.4858, lng: 39.1925 }
      ],
      distance: 970000,
      estimatedDuration: 8.5 * 60 * 60 * 1000,
      actualDuration: 9 * 60 * 60 * 1000,
      color: '#4CAF50',
      type: 'actual'
    },
    checkpoints: [
      {
        id: 'checkpoint-1',
        name: 'Security Checkpoint 1',
        location: { lat: 24.5, lng: 46.0 },
        type: 'security',
        isRequired: true,
        status: 'completed',
        detectionRadius: 100,
        actualArrival: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'checkpoint-2',
        name: 'Weight Station',
        location: { lat: 23.5, lng: 44.0 },
        type: 'weight_station',
        isRequired: true,
        status: 'pending',
        detectionRadius: 150,
        expectedArrival: new Date(Date.now() + 2 * 60 * 60 * 1000)
      }
    ],
    deviations: [
      {
        id: 'deviation-1',
        location: { lat: 24.1, lng: 45.2 },
        distance: 500,
        severity: 'medium',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        reason: 'Traffic congestion'
      }
    ],
    complianceStatus: 'minor_deviation',
    compliancePercentage: 85,
    isSelected: true
  };

  // Simulate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setSampleTrucks(prevTrucks => 
        prevTrucks.map(truck => ({
          ...truck,
          currentLocation: {
            lat: truck.currentLocation.lat + (Math.random() - 0.5) * 0.001,
            lng: truck.currentLocation.lng + (Math.random() - 0.5) * 0.001
          },
          heading: truck.heading + (Math.random() - 0.5) * 10,
          currentSpeed: Math.max(0, truck.currentSpeed + (Math.random() - 0.5) * 10),
          lastUpdateTime: new Date()
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onTruckClick = useCallback((truck: Truck) => {
    setSelectedTruck(truck.id);
    setShowInfoWindow(true);
    setSampleTrucks(prevTrucks =>
      prevTrucks.map(t => ({ ...t, isSelected: t.id === truck.id }))
    );
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
    setSelectedTruck(null);
    setSampleTrucks(prevTrucks =>
      prevTrucks.map(t => ({ ...t, isSelected: false }))
    );
  }, []);

  const onActionClick = useCallback((action: string, truck: Truck) => {
    console.log(`Action ${action} clicked for truck ${truck.plateNumber}`);
    alert(`Action: ${action} for truck ${truck.plateNumber}`);
  }, []);

  const onRouteAnalysis = useCallback((analysis: RouteAnalysis) => {
    setRouteAnalysis(analysis);
  }, []);

  const componentExamples = {
    AnimatedTruckMarker: {
      title: 'AnimatedTruckMarker - Animated Truck Tracking',
      description: 'Advanced truck markers with smooth animation, real-time updates, speed indicators, and alert badges.',
      features: [
        'Smooth position animation with easing',
        'Dynamic rotation based on heading',
        'Speed indicator with color coding',
        'Alert badges for violations',
        'Custom icons based on truck type and status'
      ],
      code: `import { AnimatedTruckMarker } from './saudi-logistics/AnimatedTruckMarker';

const TruckTrackingMap = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  const handleTruckClick = (truck: Truck) => {
    console.log('Truck clicked:', truck.plateNumber);
  };

  return (
    <GoogleMap center={{ lat: 24.7136, lng: 46.6753 }} zoom={8}>
      {trucks.map(truck => (
        <AnimatedTruckMarker
          key={truck.id}
          truck={truck}
          animationDuration={1000}
          showSpeedIndicator={true}
          showDirectionArrow={true}
          onTruckClick={handleTruckClick}
        />
      ))}
    </GoogleMap>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={10}
        >
          {sampleTrucks.map(truck => (
            <AnimatedTruckMarker
              key={truck.id}
              truck={truck}
              animationDuration={1000}
              showSpeedIndicator={true}
              showDirectionArrow={true}
              onTruckClick={onTruckClick}
            />
          ))}
        </GoogleMap>
      )
    },

    TruckDetailInfoWindow: {
      title: 'TruckDetailInfoWindow - Advanced Information Display',
      description: 'Comprehensive information window with tabbed interface, real-time data, and action buttons.',
      features: [
        'Tabbed interface (Details, Route, Alerts)',
        'Real-time truck information',
        'Driver details and status',
        'Interactive action buttons',
        'Alert management and display'
      ],
      code: `import { TruckDetailInfoWindow } from './saudi-logistics/TruckDetailInfoWindow';

const TruckInfoDemo = () => {
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleActionClick = (action: string, truck: Truck) => {
    switch(action) {
      case 'view-trip':
        // Navigate to trip details
        break;
      case 'contact-driver':
        // Open communication interface
        break;
      case 'track-route':
        // Focus on truck route
        break;
    }
  };

  return (
    <>
      {selectedTruck && (
        <TruckDetailInfoWindow
          truck={selectedTruck}
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
          onActionClick={handleActionClick}
        />
      )}
    </>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={mapCenter}
          zoom={10}
        >
          {sampleTrucks.map(truck => (
            <AnimatedTruckMarker
              key={truck.id}
              truck={truck}
              onTruckClick={onTruckClick}
            />
          ))}
          
          {selectedTruck && showInfoWindow && (
            <TruckDetailInfoWindow
              truck={sampleTrucks.find(t => t.id === selectedTruck)!}
              isOpen={showInfoWindow}
              onClose={onInfoWindowClose}
              onActionClick={onActionClick}
            />
          )}
        </GoogleMap>
      )
    },

    SmartRouteComparison: {
      title: 'SmartRouteComparison - Advanced Route Analysis',
      description: 'Intelligent route comparison with planned vs actual routes, deviation detection, and checkpoint monitoring.',
      features: [
        'Planned vs actual route visualization',
        'Deviation detection and highlighting',
        'Checkpoint status monitoring',
        'Real-time route analysis',
        'Compliance percentage calculation'
      ],
      code: `import { SmartRouteComparison } from './saudi-logistics/SmartRouteComparison';

const RouteAnalysisDemo = () => {
  const [trip, setTrip] = useState<Trip>(sampleTrip);
  const [analysis, setAnalysis] = useState<RouteAnalysis | null>(null);

  const handleRouteAnalysis = (analysis: RouteAnalysis) => {
    setAnalysis(analysis);
    console.log('Route Analysis:', analysis);
  };

  return (
    <GoogleMap center={{ lat: 24.0, lng: 44.0 }} zoom={6}>
      <SmartRouteComparison
        trip={trip}
        showPlannedRoute={true}
        showActualRoute={true}
        showOptimizedRoute={false}
        showDeviations={true}
        showCheckpoints={true}
        onRouteAnalysis={handleRouteAnalysis}
      />
    </GoogleMap>
  );
};`,
      component: (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: 23.0, lng: 43.0 }}
          zoom={6}
        >
          <SmartRouteComparison
            trip={sampleTrip}
            showPlannedRoute={true}
            showActualRoute={true}
            showOptimizedRoute={false}
            showDeviations={true}
            showCheckpoints={true}
            onRouteAnalysis={onRouteAnalysis}
          />
        </GoogleMap>
      )
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        🚛 Custom Components Demo - Saudi Logistics System
      </h1>
      
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666', fontSize: '16px' }}>
        Advanced custom components specifically designed for the Saudi Arabia trip tracking system.
      </p>

      {/* Component selector */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '30px',
        justifyContent: 'center'
      }}>
        {Object.keys(componentExamples).map(component => (
          <button
            key={component}
            onClick={() => setSelectedComponent(component)}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: selectedComponent === component ? '#1976d2' : '#f5f5f5',
              color: selectedComponent === component ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedComponent === component ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              boxShadow: selectedComponent === component ? '0 4px 12px rgba(25,118,210,0.3)' : 'none'
            }}
          >
            {component.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      {/* Selected component demo */}
      {selectedComponent && componentExamples[selectedComponent as keyof typeof componentExamples] && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          marginBottom: '30px'
        }}>
          {/* Header */}
          <div style={{
            padding: '24px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e9ecef'
          }}>
            <h2 style={{ margin: '0 0 12px 0', color: '#333' }}>
              {componentExamples[selectedComponent as keyof typeof componentExamples].title}
            </h2>
            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
              {componentExamples[selectedComponent as keyof typeof componentExamples].description}
            </p>
            
            {/* Features list */}
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '14px' }}>Key Features:</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', fontSize: '13px' }}>
                {componentExamples[selectedComponent as keyof typeof componentExamples].features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Live demo */}
          <div style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
              🎮 Interactive Demo
            </h3>
            <div style={{
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {componentExamples[selectedComponent as keyof typeof componentExamples].component}
              
              {/* Demo instructions overlay */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                zIndex: 1000
              }}>
                {selectedComponent === 'AnimatedTruckMarker' && 'Click on trucks to see details • Watch real-time movement'}
                {selectedComponent === 'TruckDetailInfoWindow' && 'Click on trucks to open info window • Try different tabs'}
                {selectedComponent === 'SmartRouteComparison' && 'Blue: Planned route • Green: Actual route • Orange: Deviations'}
              </div>
            </div>
          </div>

          {/* Route analysis display */}
          {selectedComponent === 'SmartRouteComparison' && routeAnalysis && (
            <div style={{ padding: '24px', paddingTop: '0' }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
                📊 Live Route Analysis
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Compliance</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>
                    {routeAnalysis.compliancePercentage.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total Distance</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                    {(routeAnalysis.totalDistance / 1000).toFixed(1)} km
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Deviation</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f44336' }}>
                    {(routeAnalysis.deviationDistance / 1000).toFixed(1)} km
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Avg Speed</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4caf50' }}>
                    {routeAnalysis.averageSpeed.toFixed(1)} km/h
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code example */}
          <div style={{ padding: '24px', paddingTop: '0' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '16px' }}>
              💻 Implementation Code
            </h3>
            <CodeBlock
              code={componentExamples[selectedComponent as keyof typeof componentExamples].code}
              language="typescript"
            />
          </div>
        </div>
      )}

      {/* Integration guide */}
      <div style={{
        padding: '24px',
        backgroundColor: '#e8f5e9',
        borderRadius: '12px',
        border: '1px solid #c8e6c9',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#2e7d32' }}>
          🔧 Integration Guide
        </h3>
        <div style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Step 1:</strong> Install required dependencies and ensure Google Maps API is loaded
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Step 2:</strong> Import the custom components from the saudi-logistics folder
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Step 3:</strong> Set up your data structures (Truck, Trip, Alert interfaces)
          </p>
          <p style={{ margin: '0' }}>
            <strong>Step 4:</strong> Implement real-time data updates and event handlers
          </p>
        </div>
      </div>

      {/* Performance notes */}
      <div style={{
        padding: '24px',
        backgroundColor: '#fff3e0',
        borderRadius: '12px',
        border: '1px solid #ffcc02',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#f57c00' }}>
          ⚡ Performance Considerations
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#333', fontSize: '14px' }}>
          <li>Use React.memo for truck markers to prevent unnecessary re-renders</li>
          <li>Implement virtualization for large numbers of trucks (1000+)</li>
          <li>Batch position updates to reduce animation overhead</li>
          <li>Use clustering for dense marker areas</li>
          <li>Optimize WebSocket connections for real-time updates</li>
        </ul>
      </div>

      {/* Saudi-specific features */}
      <div style={{
        padding: '24px',
        backgroundColor: '#f3e5f5',
        borderRadius: '12px',
        border: '1px solid #ce93d8'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#7b1fa2' }}>
          🇸🇦 Saudi Arabia Specific Features
        </h3>
        <div style={{ color: '#333', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Geographic Boundaries:</strong> All components respect Saudi Arabia's borders and regions
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Regulatory Compliance:</strong> Speed limits, checkpoint requirements, and route restrictions
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Cultural Considerations:</strong> Arabic text support, local time zones, and cultural icons
          </p>
          <p style={{ margin: '0' }}>
            <strong>Infrastructure Integration:</strong> Support for Saudi ports, airports, and border crossings
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomComponentsDemo;