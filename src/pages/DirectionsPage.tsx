import React, { useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock, Input } from '../components/ui';
import { LatLng } from '../types/common/LatLng';

const containerStyle = {
  width: '100%',
  height: '500px',
};

/**
 * Directions Page - Demonstrates directions service and route planning
 */
const DirectionsPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>('Cairo, Egypt');
  const [destination, setDestination] = useState<string>('Alexandria, Egypt');
  const [travelMode, setTravelMode] = useState<string>('DRIVING');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    startAddress: string;
    endAddress: string;
  } | null>(null);

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
    setRouteInfo(null);

    try {
      // Simulate directions calculation
      setTimeout(() => {
        setRouteInfo({
          distance: '220 km',
          duration: '2 hours 30 mins',
          startAddress: origin,
          endAddress: destination,
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError('Failed to get directions');
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

  const mapCenter: LatLng = { lat: 30.0444, lng: 31.2357 }; // Cairo

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
              onChange={(e) => setTravelMode(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
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
          {routeInfo ? (
            <div style={{ fontSize: '14px' }}>
              <p><strong>From:</strong> {routeInfo.startAddress}</p>
              <p><strong>To:</strong> {routeInfo.endAddress}</p>
              <p><strong>Distance:</strong> {routeInfo.distance}</p>
              <p><strong>Duration:</strong> {routeInfo.duration}</p>
              <p><strong>Travel Mode:</strong> {travelMode}</p>
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
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={6}
          >
            {/* Origin Marker */}
            <Marker
              position={{ lat: 30.0444, lng: 31.2357 }}
              title="Cairo - Origin"
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />

            {/* Destination Marker */}
            <Marker
              position={{ lat: 31.2001, lng: 29.9187 }}
              title="Alexandria - Destination"
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Using Directions Service
import { DirectionsService } from '../services/DirectionsService';

// In your component
const directionsService = new DirectionsService();

const getDirections = async () => {
  try {
    const result = await directionsService.calculateRoute({
      origin: 'Cairo, Egypt',
      destination: 'Alexandria, Egypt',
      travelMode: google.maps.TravelMode.DRIVING
    });
    
    // Display route on map
    const route = result.routes[0];
    const path = route.overview_path;
    
    // Show polyline
    <Polyline
      path={path}
      options={{
        strokeColor: "#4285F4",
        strokeWeight: 5,
        strokeOpacity: 0.8
      }}
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
          <li><strong>Route Planning Interface:</strong> Input fields for origin and destination</li>
          <li><strong>Quick Route Selection:</strong> Predefined popular routes</li>
          <li><strong>Location Swapping:</strong> Easy origin/destination switching</li>
          <li><strong>Loading States:</strong> User feedback during route calculation</li>
          <li><strong>Error Handling:</strong> Graceful error management</li>
          <li><strong>Map Visualization:</strong> Display origin and destination markers</li>
        </ul>
      </Card>

      <Card>
        <h3>Note</h3>
        <InfoBox variant="info">
          This is a simplified demonstration of the Directions Service interface. 
          In a production environment, you would integrate with the actual Google Maps Directions API 
          to calculate real routes and display them on the map with polylines.
        </InfoBox>
      </Card>
    </div>
  );
};

export default DirectionsPage;