import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox } from '../components/ui';
import { EntryPoint, Checkpoint, Vehicle, EntryPointType } from '../types/logistics/TripTypes';
import { logisticsApi } from '../services/LogisticsApiService';
import { LatLng } from '../types/common/LatLng';

const containerStyle = {
  width: '100%',
  height: '600px',
};

// Saudi Arabia map center
const saudiArabiaCenter: LatLng = { lat: 24.7136, lng: 46.6753 };

/**
 * Entry Points Page
 * Displays airports, seaports, land borders and checkpoints
 */
const EntryPointsPage: React.FC = () => {
  const [entryPoints, setEntryPoints] = useState<EntryPoint[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Display filters
  const [showAirports, setShowAirports] = useState<boolean>(true);
  const [showSeaports, setShowSeaports] = useState<boolean>(true);
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [showCheckpoints, setShowCheckpoints] = useState<boolean>(true);
  const [showVehicles, setShowVehicles] = useState<boolean>(true);

  const [selectedPoint, setSelectedPoint] = useState<EntryPoint | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [entryPointsData, checkpointsData, vehiclesData] = await Promise.all([
        logisticsApi.getEntryPoints(),
        logisticsApi.getCheckpoints(),
        logisticsApi.getVehicles()
      ]);

      setEntryPoints(entryPointsData);
      setCheckpoints(checkpointsData);
      setVehicles(vehiclesData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEntryPointIcon = (type: EntryPointType): string => {
    switch (type) {
      case EntryPointType.AIRPORT:
        return 'https://maps.google.com/mapfiles/ms/icons/airports.png';
      case EntryPointType.SEAPORT:
        return 'https://maps.google.com/mapfiles/ms/icons/marina.png';
      case EntryPointType.LAND_BORDER:
        return 'https://maps.google.com/mapfiles/ms/icons/flag.png';
      default:
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
  };

  const getVehicleIcon = (vehicleType: string): string => {
    return 'https://maps.google.com/mapfiles/ms/icons/truck.png';
  };

  const filteredEntryPoints = entryPoints.filter(point => {
    switch (point.type) {
      case EntryPointType.AIRPORT:
        return showAirports;
      case EntryPointType.SEAPORT:
        return showSeaports;
      case EntryPointType.LAND_BORDER:
        return showBorders;
      default:
        return true;
    }
  });

  const getTypeLabel = (type: EntryPointType): string => {
    switch (type) {
      case EntryPointType.AIRPORT:
        return 'Airport';
      case EntryPointType.SEAPORT:
        return 'Seaport';
      case EntryPointType.LAND_BORDER:
        return 'Land Border';
      default:
        return 'Unknown';
    }
  };

  const getCapacityStatus = (current: number, max: number): { percentage: number; status: string; color: string } => {
    const percentage = (current / max) * 100;
    if (percentage < 50) {
      return { percentage, status: 'Low', color: '#4CAF50' };
    } else if (percentage < 80) {
      return { percentage, status: 'Medium', color: '#FF9800' };
    } else {
      return { percentage, status: 'High', color: '#F44336' };
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <InfoBox variant="info">
          <strong>Loading...</strong> Loading entry points and checkpoints data
        </InfoBox>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <InfoBox variant="error">
          <strong>Error:</strong> {error}
          <Button onClick={loadData} style={{ marginLeft: '10px' }}>
            Retry
          </Button>
        </InfoBox>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Entry Points & Checkpoints</h1>
      <p>View airports, seaports, land borders and checkpoints in Saudi Arabia</p>

      {/* Control Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Display Filters</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showAirports}
                onChange={(e) => setShowAirports(e.target.checked)}
              />
              Airports ({entryPoints.filter(p => p.type === EntryPointType.AIRPORT).length})
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showSeaports}
                onChange={(e) => setShowSeaports(e.target.checked)}
              />
              Seaports ({entryPoints.filter(p => p.type === EntryPointType.SEAPORT).length})
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showBorders}
                onChange={(e) => setShowBorders(e.target.checked)}
              />
              Land Borders ({entryPoints.filter(p => p.type === EntryPointType.LAND_BORDER).length})
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showCheckpoints}
                onChange={(e) => setShowCheckpoints(e.target.checked)}
              />
              Checkpoints ({checkpoints.length})
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={showVehicles}
                onChange={(e) => setShowVehicles(e.target.checked)}
              />
              Vehicles ({vehicles.length})
            </label>
          </div>
        </Card>

        <Card>
          <h3>Selected Point Information</h3>
          {selectedPoint ? (
            <div style={{ fontSize: '14px' }}>
              <p><strong>Name:</strong> {selectedPoint.name}</p>
              <p><strong>Type:</strong> {getTypeLabel(selectedPoint.type)}</p>
              <p><strong>Status:</strong> {selectedPoint.isActive ? 'Active' : 'Inactive'}</p>
              <p><strong>Operating Hours:</strong> {selectedPoint.operatingHours.open} - {selectedPoint.operatingHours.close}</p>
              <div style={{ marginTop: '10px' }}>
                <p><strong>Current Load:</strong></p>
                <div style={{ 
                  width: '100%', 
                  height: '20px', 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginTop: '5px'
                }}>
                  <div style={{
                    width: `${getCapacityStatus(selectedPoint.currentLoad, selectedPoint.capacity).percentage}%`,
                    height: '100%',
                    backgroundColor: getCapacityStatus(selectedPoint.currentLoad, selectedPoint.capacity).color,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>
                  {selectedPoint.currentLoad} / {selectedPoint.capacity} 
                  ({getCapacityStatus(selectedPoint.currentLoad, selectedPoint.capacity).percentage.toFixed(1)}%)
                </p>
              </div>
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              Click on a point on the map to view details
            </p>
          )}
        </Card>
      </div>

      {/* Map */}
      <div style={{ height: '600px', marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={saudiArabiaCenter}
            zoom={6}
          >
            {/* Entry Points */}
            {filteredEntryPoints.map((point) => (
              <Marker
                key={point.id}
                position={point.location}
                title={`${point.name} (${point.nameAr})`}
                icon={{
                  url: getEntryPointIcon(point.type),
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
                }}
                onClick={() => setSelectedPoint(point)}
              />
            ))}

            {/* Checkpoints */}
            {showCheckpoints && checkpoints.map((checkpoint) => (
              <Marker
                key={checkpoint.id}
                position={checkpoint.location}
                title={`${checkpoint.name} - Avg Wait: ${checkpoint.averageWaitTime} min`}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/caution.png',
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(24, 24) : undefined
                }}
              />
            ))}

            {/* Vehicles */}
            {showVehicles && vehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={vehicle.currentLocation}
                title={`${vehicle.plateNumber} - ${vehicle.type} - Speed: ${vehicle.speed} km/h`}
                icon={{
                  url: getVehicleIcon(vehicle.type),
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(28, 28) : undefined
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Quick Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <Card>
          <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Airports</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#1976d2' }}>
            {entryPoints.filter(p => p.type === EntryPointType.AIRPORT).length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            Active: {entryPoints.filter(p => p.type === EntryPointType.AIRPORT && p.isActive).length}
          </p>
        </Card>

        <Card>
          <h4 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>Seaports</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#4CAF50' }}>
            {entryPoints.filter(p => p.type === EntryPointType.SEAPORT).length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            Active: {entryPoints.filter(p => p.type === EntryPointType.SEAPORT && p.isActive).length}
          </p>
        </Card>

        <Card>
          <h4 style={{ margin: '0 0 10px 0', color: '#FF9800' }}>Land Borders</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#FF9800' }}>
            {entryPoints.filter(p => p.type === EntryPointType.LAND_BORDER).length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            Active: {entryPoints.filter(p => p.type === EntryPointType.LAND_BORDER && p.isActive).length}
          </p>
        </Card>

        <Card>
          <h4 style={{ margin: '0 0 10px 0', color: '#9C27B0' }}>Checkpoints</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#9C27B0' }}>
            {checkpoints.length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            Active: {checkpoints.filter(c => c.isActive).length}
          </p>
        </Card>

        <Card>
          <h4 style={{ margin: '0 0 10px 0', color: '#F44336' }}>Active Vehicles</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', color: '#F44336' }}>
            {vehicles.filter(v => v.sensorData.engineStatus === 'ON').length}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            Total: {vehicles.length}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default EntryPointsPage;