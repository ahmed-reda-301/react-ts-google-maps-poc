import React, { useState, useEffect } from 'react';
import GoogleMap from '../components/maps/GoogleMap';
import CustomMarker from '../components/maps/CustomMarker';
import Polyline from '../components/maps/Polyline';
import { Button, Card, InfoBox, CodeBlock, Input } from '../components/ui';
import { DirectionsService } from '../services/DirectionsService';
import { LatLng } from '../types/common/LatLng';

interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
  startLocation: LatLng;
  endLocation: LatLng;
}

interface DirectionsResult {
  routes: Array<{
    legs: Array<{
      steps: RouteStep[];
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      startAddress: string;
      endAddress: string;
    }>;
    overview_path: LatLng[];
  }>;
}

/**
 * Directions Page - Demonstrates directions service and route planning
 */
const DirectionsPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('Cairo, Egypt');
  const [destination, setDestination] = useState<string>('Alexandria, Egypt');
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>(google.maps.TravelMode.DRIVING);
  const [directionsResult, setDirectionsResult] = useState<DirectionsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

  const directionsService = new DirectionsService();

  const predefinedRoutes = [
    { name: 'Cairo to Alexandria', origin: 'Cairo, Egypt', destination: 'Alexandria, Egypt' },
    { name: 'Cairo to Luxor', origin: 'Cairo, Egypt', destination: 'Luxor, Egypt' },
    { name: 'Cairo Airport to Downtown', origin: 'Cairo International Airport', destination: 'Tahrir Square, Cairo' },
    { name: 'Pyramids to Khan El Khalili', origin: 'Great Pyramid of Giza', destination: 'Khan El Khalili, Cairo' }
  ];

  const handleGetDirections = async () => {
    if (!origin.trim() || !destination.trim()) {
      setError('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setError(null);
    setDirectionsResult(null);

    try {
      const result = await directionsService.getDirections(origin, destination, travelMode);
      setDirectionsResult(result as DirectionsResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get directions');
    } finally {
      setLoading(false);
    }
  };

  const handlePredefinedRoute = (route: typeof predefinedRoutes[0]) => {
    setOrigin(route.origin);
    setDestination(route.destination);
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const getMapCenter = (): LatLng => {
    if (directionsResult && directionsResult.routes[0]?.overview_path.length > 0) {
      const path = directionsResult.routes[0].overview_path;
      const midIndex = Math.floor(path.length / 2);
      return path[midIndex];
    }
    return { lat: 30.0444, lng: 31.2357 }; // Default to Cairo
  };

  const getMapBounds = () => {
    if (directionsResult && directionsResult.routes[0]?.overview_path.length > 0) {
      const path = directionsResult.routes[0].overview_path;
      const bounds = new google.maps.LatLngBounds();
      path.forEach(point => bounds.extend(point));
      return bounds;
    }
    return null;
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDistance = (meters: number): string => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
  };

  const currentRoute = directionsResult?.routes[0];
  const currentLeg = currentRoute?.legs[0];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Directions Service Demo</h1>
      <p>This page demonstrates how to implement Google Maps Directions Service for route planning and navigation.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Route Planning</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Origin:</label>
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter starting location"
              style={{ marginBottom: '10px' }}
            />
            
            <label style={{ display: 'block', marginBottom: '5px' }}>Destination:</label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              style={{ marginBottom: '10px' }}
            />

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Button onClick={swapLocations} variant="secondary" style={{ flex: 1 }}>
                Swap
              </Button>
              <Button onClick={handleGetDirections} disabled={loading} style={{ flex: 2 }}>
                {loading ? 'Getting Directions...' : 'Get Directions'}
              </Button>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Travel Mode:</label>
            <select
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value as google.maps.TravelMode)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value={google.maps.TravelMode.DRIVING}>Driving</option>
              <option value={google.maps.TravelMode.WALKING}>Walking</option>
              <option value={google.maps.TravelMode.BICYCLING}>Bicycling</option>
              <option value={google.maps.TravelMode.TRANSIT}>Transit</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Quick Routes:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {predefinedRoutes.map((route, index) => (
                <Button
                  key={index}
                  onClick={() => handlePredefinedRoute(route)}
                  variant="secondary"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  {route.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h3>Route Summary</h3>
          {currentLeg ? (
            <div style={{ fontSize: '14px' }}>
              <p><strong>From:</strong> {currentLeg.startAddress}</p>
              <p><strong>To:</strong> {currentLeg.endAddress}</p>
              <p><strong>Distance:</strong> {currentLeg.distance.text}</p>
              <p><strong>Duration:</strong> {currentLeg.duration.text}</p>
              <p><strong>Travel Mode:</strong> {travelMode}</p>
              <p><strong>Steps:</strong> {currentLeg.steps.length}</p>
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              No route calculated. Enter origin and destination to get directions.
            </p>
          )}
        </Card>
      </div>

      {error && (
        <InfoBox variant="error">
          <strong>Error:</strong> {error}
        </InfoBox>
      )}

      {loading && (
        <InfoBox variant="info">
          <strong>Loading:</strong> Getting directions from Google Maps...
        </InfoBox>
      )}

      <div style={{ height: '500px', marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <GoogleMap
          center={getMapCenter()}
          zoom={directionsResult ? 8 : 6}
        >
          {/* Route Polyline */}
          {currentRoute && (
            <Polyline
              path={currentRoute.overview_path}
              strokeColor="#4285F4"
              strokeWeight={5}
              strokeOpacity={0.8}
            />
          )}

          {/* Origin Marker */}
          {currentLeg && (
            <CustomMarker
              position={currentLeg.steps[0]?.startLocation || { lat: 0, lng: 0 }}
              title={`Origin: ${currentLeg.startAddress}`}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          )}

          {/* Destination Marker */}
          {currentLeg && (
            <CustomMarker
              position={currentLeg.steps[currentLeg.steps.length - 1]?.endLocation || { lat: 0, lng: 0 }}
              title={`Destination: ${currentLeg.endAddress}`}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          )}

          {/* Step Markers */}
          {currentLeg && selectedStepIndex !== null && (
            <CustomMarker
              position={currentLeg.steps[selectedStepIndex].startLocation}
              title={`Step ${selectedStepIndex + 1}`}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(32, 32)
              }}
            />
          )}
        </GoogleMap>
      </div>

      {/* Turn-by-Turn Directions */}
      {currentLeg && (
        <Card>
          <h3>Turn-by-Turn Directions</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {currentLeg.steps.map((step, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  backgroundColor: selectedStepIndex === index ? '#f0f8ff' : 'transparent'
                }}
                onClick={() => setSelectedStepIndex(selectedStepIndex === index ? null : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      Step {index + 1}
                    </div>
                    <div 
                      style={{ fontSize: '14px', lineHeight: '1.4' }}
                      dangerouslySetInnerHTML={{ __html: step.instruction }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '12px', color: '#666', marginLeft: '10px' }}>
                    <div>{step.distance}</div>
                    <div>{step.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Using Directions Service
import { DirectionsService } from '../services/DirectionsService';

// In your component
const directionsService = new DirectionsService();

const getDirections = async () => {
  try {
    const result = await directionsService.getDirections(
      'Cairo, Egypt',
      'Alexandria, Egypt',
      google.maps.TravelMode.DRIVING
    );
    
    // Display route on map
    const route = result.routes[0];
    const path = route.overview_path;
    
    // Show polyline
    <Polyline
      path={path}
      strokeColor="#4285F4"
      strokeWeight={5}
    />
  } catch (error) {
    console.error('Directions error:', error);
  }
};`}
        </CodeBlock>
      </Card>

      <Card>
        <h3>Features Demonstrated</h3>
        <ul>
          <li><strong>Route Calculation:</strong> Get directions between two points</li>
          <li><strong>Multiple Travel Modes:</strong> Driving, walking, bicycling, transit</li>
          <li><strong>Turn-by-Turn Directions:</strong> Detailed step-by-step instructions</li>
          <li><strong>Route Visualization:</strong> Display route on map with polylines</li>
          <li><strong>Distance & Duration:</strong> Calculate travel time and distance</li>
          <li><strong>Interactive Steps:</strong> Click steps to highlight on map</li>
          <li><strong>Quick Routes:</strong> Predefined popular routes</li>
          <li><strong>Location Swapping:</strong> Easy origin/destination switching</li>
        </ul>
      </Card>
    </div>
  );
};

export default DirectionsPage;