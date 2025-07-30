import React, { useState, useEffect } from 'react';
import { Polyline, Marker } from '@react-google-maps/api';
import { Button, Card, InfoBox } from '../components/ui';
import { PageLayout, PageSection } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { Trip, TripStatus, VehicleType } from '../types/logistics/TripTypes';
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
 * Trip Tracking Page
 * Displays trip list with ability to track planned vs actual routes
 */
const TripTrackingPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  useEffect(() => {
    loadTrips();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        loadTrips();
        if (selectedTrip) {
          // Update selected trip
          logisticsApi.getTripById(selectedTrip.id).then(trip => {
            if (trip) {
              setSelectedTrip(trip);
            }
          });
        }
      }, 5000); // Update every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh, selectedTrip]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const tripsData = await logisticsApi.getTrips();
      setTrips(tripsData);
    } catch (err) {
      setError(ERROR_MESSAGES.loadingFailed);
      console.error('Error loading trips:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: TripStatus): string => {
    switch (status) {
      case TripStatus.PLANNED:
        return 'Planned';
      case TripStatus.IN_PROGRESS:
        return 'In Progress';
      case TripStatus.COMPLETED:
        return 'Completed';
      case TripStatus.DELAYED:
        return 'Delayed';
      case TripStatus.CANCELLED:
        return 'Cancelled';
      case TripStatus.EMERGENCY:
        return 'Emergency';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: TripStatus): string => {
    switch (status) {
      case TripStatus.PLANNED:
        return '#2196F3';
      case TripStatus.IN_PROGRESS:
        return '#4CAF50';
      case TripStatus.COMPLETED:
        return '#8BC34A';
      case TripStatus.DELAYED:
        return '#FF9800';
      case TripStatus.CANCELLED:
        return '#9E9E9E';
      case TripStatus.EMERGENCY:
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getVehicleTypeLabel = (type: VehicleType): string => {
    switch (type) {
      case VehicleType.TRUCK:
        return 'Regular Truck';
      case VehicleType.CONTAINER_TRUCK:
        return 'Container Truck';
      case VehicleType.TANKER:
        return 'Tanker';
      case VehicleType.REFRIGERATED:
        return 'Refrigerated Truck';
      case VehicleType.FLATBED:
        return 'Flatbed Truck';
      case VehicleType.HEAVY_EQUIPMENT:
        return 'Heavy Equipment';
      default:
        return 'Unknown';
    }
  };

  const getComplianceIcon = (isCompliant: boolean): string => {
    return isCompliant ? '✅' : '❌';
  };

  const getVehicleIcon = (trip: Trip): string => {
    // Determine icon based on compliance status
    if (!trip.speedCompliance || !trip.lockCompliance || !trip.isOnRoute) {
      return MARKER_ICONS.default; // Red dot
    }
    return MARKER_ICONS.green; // Green dot
  };

  const calculateProgress = (trip: Trip): number => {
    const total = trip.distanceTraveled + trip.remainingDistance;
    return total > 0 ? (trip.distanceTraveled / total) * 100 : 0;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US');
  };

  if (loading) {
    return (
      <PageLayout title={PAGE_CONTENT.tripTracking.title}>
        <InfoBox variant="info">
          <strong>{UI_LABELS.loading}</strong> Loading trips data
        </InfoBox>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title={PAGE_CONTENT.tripTracking.title}>
        <InfoBox variant="error">
          <strong>{UI_LABELS.error}:</strong> {error}
          <Button onClick={loadTrips} style={{ marginLeft: '10px' }}>
            {UI_LABELS.retry}
          </Button>
        </InfoBox>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={PAGE_CONTENT.tripTracking.title}
      subtitle={PAGE_CONTENT.tripTracking.subtitle}
    >
      {/* Control Panel */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>Trip List</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto Refresh
              </label>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  style={{
                    padding: '10px',
                    border: selectedTrip?.id === trip.id ? '2px solid #1976d2' : '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedTrip?.id === trip.id ? '#f3f8ff' : 'white'
                  }}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{trip.name}</h4>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: getStatusColor(trip.status)
                      }}
                    >
                      {getStatusLabel(trip.status)}
                    </span>
                  </div>
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                    Driver: {trip.driver.name}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>
                    Vehicle: {trip.vehicle.plateNumber}
                  </p>
                  <div style={{ fontSize: '11px', color: '#888' }}>
                    Progress: {calculateProgress(trip).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Trip Details" padding="lg">
            {selectedTrip ? (
              <div style={{ fontSize: '14px' }}>
                <div style={styles.cards.twoColumn}>
                  <div>
                    <p><strong>Trip Name:</strong> {selectedTrip.name}</p>
                    <p><strong>Status:</strong> 
                      <span style={{ color: getStatusColor(selectedTrip.status), fontWeight: 'bold', marginLeft: '5px' }}>
                        {getStatusLabel(selectedTrip.status)}
                      </span>
                    </p>
                    <p><strong>Driver:</strong> {selectedTrip.driver.name}</p>
                    <p><strong>Vehicle:</strong> {selectedTrip.vehicle.plateNumber}</p>
                    <p><strong>Vehicle Type:</strong> {getVehicleTypeLabel(selectedTrip.vehicle.type)}</p>
                    <p><strong>Cargo Type:</strong> {selectedTrip.cargo.type}</p>
                  </div>
                  <div>
                    <p><strong>From:</strong> {selectedTrip.origin.name}</p>
                    <p><strong>To:</strong> {selectedTrip.destination.name}</p>
                    <p><strong>Distance Traveled:</strong> {selectedTrip.distanceTraveled} {UI_LABELS.kilometers}</p>
                    <p><strong>Remaining Distance:</strong> {selectedTrip.remainingDistance} {UI_LABELS.kilometers}</p>
                    <p><strong>Current Speed:</strong> {selectedTrip.vehicle.speed} {UI_LABELS.kmh}</p>
                    <p><strong>Average Speed:</strong> {selectedTrip.averageSpeed} {UI_LABELS.kmh}</p>
                  </div>
                </div>

                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Compliance Status</h4>
                  <div style={styles.cards.threeColumn}>
                    <div>
                      {getComplianceIcon(selectedTrip.isOnRoute)} On Route
                    </div>
                    <div>
                      {getComplianceIcon(selectedTrip.speedCompliance)} Speed Limit
                    </div>
                    <div>
                      {getComplianceIcon(selectedTrip.lockCompliance)} Lock Status
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '15px' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Progress</h4>
                  <div style={{ 
                    width: '100%', 
                    height: '20px', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${calculateProgress(selectedTrip)}%`,
                      height: '100%',
                      backgroundColor: getStatusColor(selectedTrip.status),
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{ fontSize: '12px', marginTop: '5px' }}>
                    {calculateProgress(selectedTrip).toFixed(1)}% Complete
                  </p>
                </div>

                <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
                  <p><strong>Last Update:</strong> {formatTime(selectedTrip.lastUpdate)} - {formatDate(selectedTrip.lastUpdate)}</p>
                  <p><strong>Estimated Arrival:</strong> {formatTime(selectedTrip.estimatedArrival)} - {formatDate(selectedTrip.estimatedArrival)}</p>
                </div>
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                Select a trip from the list to view details
              </p>
            )}
          </Card>
        </div>
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Trip Tracking Map">
        <MapContainer
          center={selectedTrip ? selectedTrip.currentLocation : SAUDI_ARABIA_LOCATIONS.center}
          zoom={selectedTrip ? 8 : 6}
          height="large"
        >
          {selectedTrip && (
            <>
              {/* Planned Route */}
              <Polyline
                path={selectedTrip.plannedRoute}
                options={{
                  strokeColor: "#2196F3",
                  strokeWeight: 4,
                  strokeOpacity: 0.7
                }}
              />

              {/* Actual Route */}
              {selectedTrip.actualRoute.length > 1 && (
                <Polyline
                  path={selectedTrip.actualRoute}
                  options={{
                    strokeColor: selectedTrip.isOnRoute ? "#4CAF50" : "#F44336",
                    strokeWeight: 6,
                    strokeOpacity: 0.8
                  }}
                />
              )}

              {/* Origin Point */}
              <Marker
                position={selectedTrip.origin.location}
                title={`Origin: ${selectedTrip.origin.name}`}
                icon={{
                  url: MARKER_ICONS.start,
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
                }}
              />

              {/* Destination Point */}
              <Marker
                position={selectedTrip.destination.location}
                title={`Destination: ${selectedTrip.destination.name}`}
                icon={{
                  url: MARKER_ICONS.end,
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
                }}
              />

              {/* Current Vehicle Location */}
              <Marker
                position={selectedTrip.currentLocation}
                title={`${selectedTrip.vehicle.plateNumber} - Speed: ${selectedTrip.vehicle.speed} km/h`}
                icon={{
                  url: getVehicleIcon(selectedTrip),
                  scaledSize: typeof google !== 'undefined' ? new google.maps.Size(40, 40) : undefined
                }}
              />

              {/* Checkpoints */}
              {selectedTrip.checkpoints.map((checkpoint) => (
                <Marker
                  key={checkpoint.id}
                  position={checkpoint.location}
                  title={`Checkpoint: ${checkpoint.name}`}
                  icon={{
                    url: MARKER_ICONS.checkpoint,
                    scaledSize: typeof google !== 'undefined' ? new google.maps.Size(24, 24) : undefined
                  }}
                />
              ))}
            </>
          )}

          {/* Show all active trips if no trip is selected */}
          {!selectedTrip && trips.filter(t => t.status === TripStatus.IN_PROGRESS).map((trip) => (
            <Marker
              key={trip.id}
              position={trip.currentLocation}
              title={`${trip.name} - ${trip.vehicle.plateNumber}`}
              icon={{
                url: getVehicleIcon(trip),
                scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
              }}
              onClick={() => setSelectedTrip(trip)}
            />
          ))}
        </MapContainer>
      </PageSection>

      {/* Legend */}
      <PageSection title="🎨 Colors and Symbols Guide" marginBottom={false}>
        <Card padding="lg">
          <div style={styles.cards.fourColumn}>
            <div>
              <h4>Routes:</h4>
              <p>🔵 Blue line: Planned route</p>
              <p>🟢 Green thick line: Actual route (compliant)</p>
              <p>🔴 Red thick line: Actual route (deviated)</p>
            </div>
            <div>
              <h4>Vehicles:</h4>
              <p>🟢 Green dot: Compliant vehicle</p>
              <p>🔴 Red dot: Non-compliant vehicle</p>
              <p>⚠️ Warning icon: Checkpoint</p>
            </div>
            <div>
              <h4>Points:</h4>
              <p>🟢 Large green dot: Origin point</p>
              <p>🔴 Large red dot: Destination point</p>
            </div>
            <div>
              <h4>Compliance:</h4>
              <p>✅ Compliant</p>
              <p>❌ Non-compliant</p>
            </div>
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
};

export default TripTrackingPage;