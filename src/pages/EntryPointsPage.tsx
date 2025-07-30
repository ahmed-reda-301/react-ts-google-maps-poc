import React, { useState, useEffect } from 'react';
import { Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox } from '../components/ui';
import { PageLayout, PageSection } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { EntryPoint, Checkpoint, Vehicle, EntryPointType } from '../types/logistics/TripTypes';
import { logisticsApi } from '../services/LogisticsApiService';
import { LatLng } from '../types/common/LatLng';
import { 
  SAUDI_ARABIA_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  ERROR_MESSAGES,
  MARKER_ICONS 
} from '../constants';

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
      setError(ERROR_MESSAGES.loadingFailed);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getEntryPointIcon = (type: EntryPointType): string => {
    switch (type) {
      case EntryPointType.AIRPORT:
        return MARKER_ICONS.airport;
      case EntryPointType.SEAPORT:
        return MARKER_ICONS.seaport;
      case EntryPointType.LAND_BORDER:
        return MARKER_ICONS.border;
      default:
        return MARKER_ICONS.blue;
    }
  };

  const getVehicleIcon = (vehicleType: string): string => {
    return MARKER_ICONS.truck;
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
      <PageLayout title={PAGE_CONTENT.entryPoints.title}>
        <InfoBox variant="info">
          <strong>{UI_LABELS.loading}</strong> Loading entry points and checkpoints data
        </InfoBox>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title={PAGE_CONTENT.entryPoints.title}>
        <InfoBox variant="error">
          <strong>{UI_LABELS.error}:</strong> {error}
          <Button onClick={loadData} style={{ marginLeft: '10px' }}>
            {UI_LABELS.retry}
          </Button>
        </InfoBox>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={PAGE_CONTENT.entryPoints.title}
      subtitle={PAGE_CONTENT.entryPoints.subtitle}
    >
      {/* Control Panel */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card title="Display Filters" padding="lg">
            <div style={styles.forms.container}>
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

          <Card title="Selected Point Information" padding="lg">
            {selectedPoint ? (
              <div style={{ fontSize: '14px' }}>
                <p><strong>Name:</strong> {selectedPoint.name}</p>
                <p><strong>Type:</strong> {getTypeLabel(selectedPoint.type)}</p>
                <p><strong>Status:</strong> {selectedPoint.isActive ? UI_LABELS.active : UI_LABELS.inactive}</p>
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
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Entry Points and Checkpoints Map">
        <MapContainer
          center={SAUDI_ARABIA_LOCATIONS.center}
          zoom={6}
          height="large"
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
                url: MARKER_ICONS.checkpoint,
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
        </MapContainer>
      </PageSection>

      {/* Quick Statistics */}
      <PageSection title="📊 Quick Statistics" marginBottom={false}>
        <div style={styles.stats.container}>
          <Card style={styles.stats.card}>
            <div style={{ ...styles.stats.value, color: '#1976d2' }}>
              {entryPoints.filter(p => p.type === EntryPointType.AIRPORT).length}
            </div>
            <div style={styles.stats.label}>Airports</div>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              Active: {entryPoints.filter(p => p.type === EntryPointType.AIRPORT && p.isActive).length}
            </p>
          </Card>

          <Card style={styles.stats.card}>
            <div style={{ ...styles.stats.value, color: '#4CAF50' }}>
              {entryPoints.filter(p => p.type === EntryPointType.SEAPORT).length}
            </div>
            <div style={styles.stats.label}>Seaports</div>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              Active: {entryPoints.filter(p => p.type === EntryPointType.SEAPORT && p.isActive).length}
            </p>
          </Card>

          <Card style={styles.stats.card}>
            <div style={{ ...styles.stats.value, color: '#FF9800' }}>
              {entryPoints.filter(p => p.type === EntryPointType.LAND_BORDER).length}
            </div>
            <div style={styles.stats.label}>Land Borders</div>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              Active: {entryPoints.filter(p => p.type === EntryPointType.LAND_BORDER && p.isActive).length}
            </p>
          </Card>

          <Card style={styles.stats.card}>
            <div style={{ ...styles.stats.value, color: '#9C27B0' }}>
              {checkpoints.length}
            </div>
            <div style={styles.stats.label}>Checkpoints</div>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              Active: {checkpoints.filter(c => c.isActive).length}
            </p>
          </Card>

          <Card style={styles.stats.card}>
            <div style={{ ...styles.stats.value, color: '#F44336' }}>
              {vehicles.filter(v => v.sensorData.engineStatus === 'ON').length}
            </div>
            <div style={styles.stats.label}>Active Vehicles</div>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              Total: {vehicles.length}
            </p>
          </Card>
        </div>
      </PageSection>
    </PageLayout>
  );
};

export default EntryPointsPage;