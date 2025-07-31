import React, { useState } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Truck, Alert } from './AnimatedTruckMarker';

interface TruckDetailInfoWindowProps {
  truck: Truck;
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (action: string, truck: Truck) => void;
}

export const TruckDetailInfoWindow: React.FC<TruckDetailInfoWindowProps> = ({
  truck,
  isOpen,
  onClose,
  onActionClick
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'route' | 'alerts'>('details');

  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      moving: '🚛',
      stopped: '🛑',
      loading: '📦',
      maintenance: '🔧',
      emergency: '🆘'
    };
    return icons[status] || '🚛';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      moving: 'Moving',
      stopped: 'Stopped',
      loading: 'Loading',
      maintenance: 'Maintenance',
      emergency: 'Emergency'
    };
    return texts[status] || status;
  };

  return (
    <InfoWindow
      position={truck.currentLocation}
      onCloseClick={onClose}
      options={{
        maxWidth: 400,
        pixelOffset: new google.maps.Size(0, -40)
      }}
    >
      <div style={{ 
        fontFamily: 'Arial, sans-serif',
        minWidth: '350px',
        maxHeight: '500px',
        overflow: 'hidden'
      }}>
        {/* Window header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              {truck.plateNumber}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '12px',
              backgroundColor: getStatusColor(truck.status),
              color: 'white',
              fontSize: '12px',
              marginTop: '4px'
            }}>
              <span>{getStatusIcon(truck.status)}</span>
              <span>{getStatusText(truck.status)}</span>
            </div>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            👤
          </div>
        </div>

        {/* Content tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0'
        }}>
          {['details', 'route', 'alerts'].map(tab => (
            <button
              key={tab}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#2196F3' : 'transparent',
                color: activeTab === tab ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'capitalize'
              }}
              onClick={() => setActiveTab(tab as any)}
            >
              {getTabIcon(tab)} {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '12px', maxHeight: '300px', overflowY: 'auto' }}>
          {activeTab === 'details' && (
            <TruckDetailsTab truck={truck} />
          )}
          
          {activeTab === 'route' && (
            <TruckRouteTab truck={truck} />
          )}
          
          {activeTab === 'alerts' && (
            <TruckAlertsTab truck={truck} />
          )}
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f9f9f9'
        }}>
          <button
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            onClick={() => onActionClick('view-trip', truck)}
          >
            📊 Trip Details
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            onClick={() => onActionClick('contact-driver', truck)}
          >
            📞 Contact Driver
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            onClick={() => onActionClick('track-route', truck)}
          >
            🎯 Track Route
          </button>
        </div>
      </div>
    </InfoWindow>
  );
};

// Helper function to get status color
const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    moving: '#4CAF50',
    stopped: '#FF9800',
    loading: '#2196F3',
    maintenance: '#9C27B0',
    emergency: '#F44336'
  };
  return colors[status] || '#666';
};

// Helper function to get tab icons
const getTabIcon = (tab: string): string => {
  const icons: Record<string, string> = {
    details: '📋',
    route: '🗺️',
    alerts: '🚨'
  };
  return icons[tab] || '';
};

// Truck details tab component
const TruckDetailsTab: React.FC<{ truck: Truck }> = ({ truck }) => {
  const DetailRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '6px 0',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <span style={{ color: '#666', fontSize: '12px' }}>{label}:</span>
      <span style={{ fontWeight: 'bold', fontSize: '12px' }}>{value}</span>
    </div>
  );

  return (
    <div>
      <DetailRow label="Driver" value={truck.driver.name} />
      <DetailRow label="Speed" value={`${truck.currentSpeed} km/h`} />
      <DetailRow label="Speed Limit" value={`${truck.speedLimit} km/h`} />
      <DetailRow label="Fuel Level" value={`${truck.fuelLevel}%`} />
      <DetailRow label="Type" value={truck.type} />
      <DetailRow label="Region" value={truck.currentRegion} />
      <DetailRow label="Last Update" value={truck.lastUpdateTime.toLocaleTimeString()} />
      
      {truck.company && (
        <DetailRow label="Company" value={truck.company.name} />
      )}
      
      <div style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>
          Driving Time: {Math.round(truck.continuousDrivingTime / (60 * 60 * 1000))} hours
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${Math.min((truck.continuousDrivingTime / (4 * 60 * 60 * 1000)) * 100, 100)}%`,
            height: '100%',
            backgroundColor: truck.continuousDrivingTime > 4 * 60 * 60 * 1000 ? '#F44336' : '#4CAF50',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

// Truck route tab component
const TruckRouteTab: React.FC<{ truck: Truck }> = ({ truck }) => {
  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>
          Current Location
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Lat: {(truck.currentLocation as any).lat?.toFixed(6)}<br />
          Lng: {(truck.currentLocation as any).lng?.toFixed(6)}
        </div>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>
          Heading
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {truck.heading}° {getCompassDirection(truck.heading)}
        </div>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>
          Route Status
        </div>
        <div style={{
          padding: '8px',
          borderRadius: '4px',
          backgroundColor: truck.alerts.some(a => a.type === 'route_deviation') ? '#ffebee' : '#e8f5e8',
          fontSize: '12px'
        }}>
          {truck.alerts.some(a => a.type === 'route_deviation') ? 
            '⚠️ Off Route' : 
            '✅ On Route'
          }
        </div>
      </div>
    </div>
  );
};

// Truck alerts tab component
const TruckAlertsTab: React.FC<{ truck: Truck }> = ({ truck }) => {
  if (truck.alerts.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        ✅ No active alerts
      </div>
    );
  }

  return (
    <div>
      {truck.alerts.map(alert => (
        <div
          key={alert.id}
          style={{
            padding: '8px',
            marginBottom: '8px',
            borderRadius: '4px',
            backgroundColor: getAlertBackgroundColor(alert.severity),
            border: `1px solid ${getAlertBorderColor(alert.severity)}`
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px'
          }}>
            <span style={{ fontSize: '14px' }}>{getAlertIcon(alert)}</span>
            <span style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: getAlertTextColor(alert.severity)
            }}>
              {alert.severity.toUpperCase()}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#333', marginBottom: '4px' }}>
            {alert.message}
          </div>
          <div style={{ fontSize: '10px', color: '#666' }}>
            {alert.timestamp.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper functions
const getCompassDirection = (heading: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(heading / 45) % 8;
  return directions[index];
};

const getAlertIcon = (alert: Alert): string => {
  const icons: Record<string, string> = {
    speed_violation: '🚨',
    route_deviation: '⚠️',
    delay: '⏰',
    maintenance: '🔧',
    emergency: '🆘',
    fuel_low: '⛽',
    temperature: '🌡️'
  };
  return icons[alert.type] || '❗';
};

const getAlertBackgroundColor = (severity: string): string => {
  const colors: Record<string, string> = {
    low: '#e8f5e8',
    medium: '#fff3e0',
    high: '#ffebee',
    critical: '#f3e5f5'
  };
  return colors[severity] || '#f5f5f5';
};

const getAlertBorderColor = (severity: string): string => {
  const colors: Record<string, string> = {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336',
    critical: '#9C27B0'
  };
  return colors[severity] || '#ccc';
};

const getAlertTextColor = (severity: string): string => {
  const colors: Record<string, string> = {
    low: '#2E7D32',
    medium: '#E65100',
    high: '#C62828',
    critical: '#6A1B9A'
  };
  return colors[severity] || '#333';
};

export default TruckDetailInfoWindow;