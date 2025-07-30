# Location Markers - Saudi Arabia System

## Overview

This file documents how to implement detailed location markers for airports, ports, border crossings, and checkpoints in the Saudi Arabia trip tracking system.

## 1. Saudi Arabia Airports

### Major International Airports
```typescript
interface Airport {
  id: string;
  name: string;
  nameArabic: string;
  code: string; // IATA code
  icaoCode: string; // ICAO code
  location: LatLng;
  type: 'international' | 'domestic' | 'military';
  capacity: number;
  operatingHours: string;
  runways: number;
  terminals: number;
  cargoCapacity: number; // tons per year
  contactInfo: ContactInfo;
  services: AirportService[];
}

const SAUDI_AIRPORTS: Airport[] = [
  {
    id: 'KKIA',
    name: 'King Khalid International Airport',
    nameArabic: 'مطار الملك خالد الدولي',
    code: 'RUH',
    icaoCode: 'OERK',
    location: { lat: 24.9576, lng: 46.6988 },
    type: 'international',
    capacity: 35000000, // passengers per year
    operatingHours: '24/7',
    runways: 4,
    terminals: 5,
    cargoCapacity: 500000,
    contactInfo: {
      phone: '+966-11-221-1000',
      email: 'info@riyadhairport.com',
      website: 'https://www.riyadhairport.com'
    },
    services: ['cargo', 'passenger', 'maintenance', 'fuel']
  },
  {
    id: 'KAIA',
    name: 'King Abdulaziz International Airport',
    nameArabic: 'مطار الملك عبدالعزيز الدولي',
    code: 'JED',
    icaoCode: 'OEJN',
    location: { lat: 21.6796, lng: 39.1564 },
    type: 'international',
    capacity: 30000000,
    operatingHours: '24/7',
    runways: 2,
    terminals: 3,
    cargoCapacity: 400000,
    contactInfo: {
      phone: '+966-12-684-2222',
      email: 'info@jeddahairport.com',
      website: 'https://www.jeddahairport.com'
    },
    services: ['cargo', 'passenger', 'hajj', 'maintenance', 'fuel']
  },
  {
    id: 'KFIA',
    name: 'King Fahd International Airport',
    nameArabic: 'مطار الملك فهد الدولي',
    code: 'DMM',
    icaoCode: 'OEDF',
    location: { lat: 26.4712, lng: 49.7979 },
    type: 'international',
    capacity: 15000000,
    operatingHours: '24/7',
    runways: 2,
    terminals: 1,
    cargoCapacity: 200000,
    contactInfo: {
      phone: '+966-13-894-8888',
      email: 'info@dammamairport.com',
      website: 'https://www.dammamairport.com'
    },
    services: ['cargo', 'passenger', 'maintenance', 'fuel']
  },
  // Additional airports...
  {
    id: 'PRGA',
    name: 'Prince Abdul Mohsin Bin Abdulaziz Airport',
    nameArabic: 'مطار الأمير عبدالمحسن بن عبدالعزيز',
    code: 'YNB',
    icaoCode: 'OEYN',
    location: { lat: 24.1444, lng: 38.0636 },
    type: 'domestic',
    capacity: 1500000,
    operatingHours: '06:00-22:00',
    runways: 1,
    terminals: 1,
    cargoCapacity: 50000,
    contactInfo: {
      phone: '+966-14-822-4444',
      email: 'info@yanbuairport.com'
    },
    services: ['cargo', 'passenger', 'fuel']
  }
];
```

### Airport Marker Component
```typescript
interface AirportMarkerProps {
  airport: Airport;
  isSelected: boolean;
  showDetails: boolean;
  onAirportClick: (airport: Airport) => void;
  onAirportHover: (airport: Airport) => void;
}

const AirportMarker: React.FC<AirportMarkerProps> = ({
  airport,
  isSelected,
  showDetails,
  onAirportClick,
  onAirportHover
}) => {
  const getAirportIcon = () => {
    const baseSize = isSelected ? 40 : 32;
    let iconUrl = '/icons/airports/';
    
    switch (airport.type) {
      case 'international':
        iconUrl += 'international-airport.svg';
        break;
      case 'domestic':
        iconUrl += 'domestic-airport.svg';
        break;
      case 'military':
        iconUrl += 'military-airport.svg';
        break;
      default:
        iconUrl += 'airport.svg';
    }

    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(baseSize, baseSize),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2)
    };
  };

  return (
    <>
      <Marker
        position={airport.location}
        icon={getAirportIcon()}
        title={`${airport.name} (${airport.code})`}
        onClick={() => onAirportClick(airport)}
        onMouseOver={() => onAirportHover(airport)}
        zIndex={isSelected ? 1000 : 500}
      />

      {/* Airport capacity indicator */}
      {isSelected && (
        <Circle
          center={airport.location}
          radius={Math.sqrt(airport.capacity) / 100} // Scale based on capacity
          options={{
            fillColor: getCapacityColor(airport.capacity),
            fillOpacity: 0.1,
            strokeColor: getCapacityColor(airport.capacity),
            strokeWeight: 2,
            strokeOpacity: 0.5,
            zIndex: 100
          }}
        />
      )}

      {/* Airport details window */}
      {showDetails && (
        <AirportInfoWindow
          airport={airport}
          onClose={() => {}}
        />
      )}
    </>
  );
};

// Airport information window
const AirportInfoWindow: React.FC<{ airport: Airport; onClose: () => void }> = ({
  airport,
  onClose
}) => {
  return (
    <InfoWindow
      position={airport.location}
      onCloseClick={onClose}
    >
      <div className="airport-info">
        <div className="airport-header">
          <h3>{airport.name}</h3>
          <div className="airport-codes">
            <span className="iata-code">{airport.code}</span>
            <span className="icao-code">{airport.icaoCode}</span>
          </div>
        </div>
        
        <div className="airport-details">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">{airport.type}</span>
          </div>
          <div className="detail-row">
            <span className="label">Capacity:</span>
            <span className="value">{airport.capacity.toLocaleString()} passengers/year</span>
          </div>
          <div className="detail-row">
            <span className="label">Operating Hours:</span>
            <span className="value">{airport.operatingHours}</span>
          </div>
          <div className="detail-row">
            <span className="label">Runways:</span>
            <span className="value">{airport.runways}</span>
          </div>
          <div className="detail-row">
            <span className="label">Cargo Capacity:</span>
            <span className="value">{airport.cargoCapacity.toLocaleString()} tons/year</span>
          </div>
        </div>

        <div className="airport-services">
          <h4>Services:</h4>
          <div className="services-list">
            {airport.services.map(service => (
              <span key={service} className={`service-badge ${service}`}>
                {getServiceIcon(service)} {service}
              </span>
            ))}
          </div>
        </div>

        <div className="airport-contact">
          <h4>Contact Information:</h4>
          <p>📞 {airport.contactInfo.phone}</p>
          {airport.contactInfo.email && (
            <p>📧 {airport.contactInfo.email}</p>
          )}
          {airport.contactInfo.website && (
            <p>🌐 <a href={airport.contactInfo.website} target="_blank" rel="noopener noreferrer">
              Website
            </a></p>
          )}
        </div>
      </div>
    </InfoWindow>
  );
};
```

## 2. Saudi Arabia Ports

### Major Seaports
```typescript
interface Port {
  id: string;
  name: string;
  nameArabic: string;
  location: LatLng;
  type: 'seaport' | 'dry_port' | 'container_terminal';
  capacity: number; // TEU per year
  operatingHours: string;
  depth: number; // meters
  berthLength: number; // meters
  cranes: number;
  storageArea: number; // square meters
  specializations: PortSpecialization[];
  contactInfo: ContactInfo;
}

const SAUDI_PORTS: Port[] = [
  {
    id: 'JEDDAH_PORT',
    name: 'Jeddah Islamic Port',
    nameArabic: 'ميناء جدة الإسلامي',
    location: { lat: 21.4858, lng: 39.1925 },
    type: 'seaport',
    capacity: 2000000, // TEU per year
    operatingHours: '24/7',
    depth: 16, // meters
    berthLength: 11000, // meters
    cranes: 25,
    storageArea: 1500000, // square meters
    specializations: ['containers', 'general_cargo', 'bulk', 'ro_ro'],
    contactInfo: {
      phone: '+966-12-603-3333',
      email: 'info@jeddahport.com.sa',
      website: 'https://www.jeddahport.com.sa'
    }
  },
  {
    id: 'KING_ABDULAZIZ_PORT',
    name: 'King Abdulaziz Port',
    nameArabic: 'ميناء الملك عبدالعزيز',
    location: { lat: 26.3927, lng: 50.1020 },
    type: 'seaport',
    capacity: 1800000,
    operatingHours: '24/7',
    depth: 15,
    berthLength: 8500,
    cranes: 20,
    storageArea: 1200000,
    specializations: ['containers', 'petrochemicals', 'bulk'],
    contactInfo: {
      phone: '+966-13-358-0000',
      email: 'info@dammamport.com.sa',
      website: 'https://www.dammamport.com.sa'
    }
  },
  {
    id: 'YANBU_COMMERCIAL_PORT',
    name: 'Yanbu Commercial Port',
    nameArabic: 'ميناء ينبع التجاري',
    location: { lat: 24.0889, lng: 38.0617 },
    type: 'seaport',
    capacity: 500000,
    operatingHours: '24/7',
    depth: 14,
    berthLength: 3500,
    cranes: 8,
    storageArea: 400000,
    specializations: ['general_cargo', 'bulk', 'project_cargo'],
    contactInfo: {
      phone: '+966-14-322-4000',
      email: 'info@yanbuport.com.sa'
    }
  },
  {
    id: 'JIZAN_PORT',
    name: 'Jizan Port',
    nameArabic: 'ميناء جازان',
    location: { lat: 16.8892, lng: 42.5511 },
    type: 'seaport',
    capacity: 300000,
    operatingHours: '24/7',
    depth: 12,
    berthLength: 2000,
    cranes: 5,
    storageArea: 200000,
    specializations: ['general_cargo', 'bulk'],
    contactInfo: {
      phone: '+966-17-322-1000',
      email: 'info@jizanport.com.sa'
    }
  }
];
```

### Port Marker Component
```typescript
const PortMarker: React.FC<{
  port: Port;
  isSelected: boolean;
  showDetails: boolean;
  onPortClick: (port: Port) => void;
}> = ({ port, isSelected, showDetails, onPortClick }) => {
  const getPortIcon = () => {
    const baseSize = isSelected ? 36 : 28;
    let iconUrl = '/icons/ports/';
    
    switch (port.type) {
      case 'seaport':
        iconUrl += 'seaport.svg';
        break;
      case 'dry_port':
        iconUrl += 'dry-port.svg';
        break;
      case 'container_terminal':
        iconUrl += 'container-terminal.svg';
        break;
      default:
        iconUrl += 'port.svg';
    }

    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(baseSize, baseSize),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2)
    };
  };

  return (
    <>
      <Marker
        position={port.location}
        icon={getPortIcon()}
        title={`${port.name} - ${port.capacity.toLocaleString()} TEU/year`}
        onClick={() => onPortClick(port)}
        zIndex={isSelected ? 1000 : 400}
      />

      {/* Port operational area */}
      {isSelected && (
        <Circle
          center={port.location}
          radius={Math.sqrt(port.storageArea) / 50}
          options={{
            fillColor: '#2196F3',
            fillOpacity: 0.1,
            strokeColor: '#2196F3',
            strokeWeight: 2,
            strokeOpacity: 0.6,
            zIndex: 100
          }}
        />
      )}

      {showDetails && (
        <PortInfoWindow port={port} onClose={() => {}} />
      )}
    </>
  );
};
```

## 3. Border Crossings

### Saudi Arabia Border Crossings
```typescript
interface BorderCrossing {
  id: string;
  name: string;
  nameArabic: string;
  location: LatLng;
  neighboringCountry: string;
  type: 'land' | 'sea' | 'air';
  operatingHours: string;
  vehicleTypes: VehicleType[];
  services: BorderService[];
  averageWaitTime: number; // minutes
  maxVehicleLength: number; // meters
  maxVehicleWeight: number; // tons
  requiresAdvanceBooking: boolean;
  contactInfo: ContactInfo;
}

const SAUDI_BORDER_CROSSINGS: BorderCrossing[] = [
  {
    id: 'KING_FAHD_CAUSEWAY',
    name: 'King Fahd Causeway',
    nameArabic: 'جسر الملك فهد',
    location: { lat: 26.2361, lng: 50.3000 },
    neighboringCountry: 'Bahrain',
    type: 'land',
    operatingHours: '24/7',
    vehicleTypes: ['passenger', 'truck', 'bus'],
    services: ['customs', 'immigration', 'quarantine', 'fuel'],
    averageWaitTime: 45,
    maxVehicleLength: 18,
    maxVehicleWeight: 40,
    requiresAdvanceBooking: false,
    contactInfo: {
      phone: '+966-13-858-0000',
      email: 'info@kfcauseway.com'
    }
  },
  {
    id: 'SALWA_BORDER',
    name: 'Salwa Border Crossing',
    nameArabic: 'منفذ سلوى الحدودي',
    location: { lat: 24.1167, lng: 51.0167 },
    neighboringCountry: 'Qatar',
    type: 'land',
    operatingHours: '24/7',
    vehicleTypes: ['passenger', 'truck', 'bus'],
    services: ['customs', 'immigration', 'quarantine'],
    averageWaitTime: 30,
    maxVehicleLength: 20,
    maxVehicleWeight: 45,
    requiresAdvanceBooking: true,
    contactInfo: {
      phone: '+966-13-756-0000'
    }
  },
  {
    id: 'HADITHA_ARAR',
    name: 'Haditha-Arar Border Crossing',
    nameArabic: 'منفذ الحديثة عرعر',
    location: { lat: 30.9333, lng: 41.0333 },
    neighboringCountry: 'Iraq',
    type: 'land',
    operatingHours: '06:00-18:00',
    vehicleTypes: ['passenger', 'truck'],
    services: ['customs', 'immigration', 'security_check'],
    averageWaitTime: 90,
    maxVehicleLength: 16,
    maxVehicleWeight: 35,
    requiresAdvanceBooking: true,
    contactInfo: {
      phone: '+966-14-662-0000'
    }
  },
  {
    id: 'JADIDAT_ARAR',
    name: 'Jadidat Arar Border Crossing',
    nameArabic: 'منفذ جديدة عرعر',
    location: { lat: 30.9167, lng: 41.0500 },
    neighboringCountry: 'Iraq',
    type: 'land',
    operatingHours: '08:00-16:00',
    vehicleTypes: ['passenger'],
    services: ['customs', 'immigration'],
    averageWaitTime: 60,
    maxVehicleLength: 12,
    maxVehicleWeight: 25,
    requiresAdvanceBooking: false,
    contactInfo: {
      phone: '+966-14-662-1000'
    }
  },
  {
    id: 'TUWAL',
    name: 'Tuwal Border Crossing',
    nameArabic: 'منفذ طوال',
    location: { lat: 16.4667, lng: 43.4167 },
    neighboringCountry: 'Yemen',
    type: 'land',
    operatingHours: '06:00-18:00',
    vehicleTypes: ['passenger', 'truck'],
    services: ['customs', 'immigration', 'security_check', 'medical_check'],
    averageWaitTime: 120,
    maxVehicleLength: 15,
    maxVehicleWeight: 30,
    requiresAdvanceBooking: true,
    contactInfo: {
      phone: '+966-17-422-0000'
    }
  }
];
```

### Border Crossing Marker Component
```typescript
const BorderCrossingMarker: React.FC<{
  crossing: BorderCrossing;
  isSelected: boolean;
  showWaitTime: boolean;
  onCrossingClick: (crossing: BorderCrossing) => void;
}> = ({ crossing, isSelected, showWaitTime, onCrossingClick }) => {
  const getBorderIcon = () => {
    const baseSize = isSelected ? 34 : 26;
    return {
      url: '/icons/border-crossings/border-crossing.svg',
      scaledSize: new google.maps.Size(baseSize, baseSize),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2)
    };
  };

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime < 30) return '#4CAF50'; // Green
    if (waitTime < 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <>
      <Marker
        position={crossing.location}
        icon={getBorderIcon()}
        title={`${crossing.name} - ${crossing.neighboringCountry}`}
        onClick={() => onCrossingClick(crossing)}
        zIndex={isSelected ? 1000 : 300}
      />

      {/* Wait time indicator */}
      {showWaitTime && (
        <OverlayView
          position={crossing.location}
          mapPaneName="overlayMouseTarget"
        >
          <div
            style={{
              backgroundColor: getWaitTimeColor(crossing.averageWaitTime),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 'bold',
              transform: 'translate(-50%, -100%)',
              marginTop: '-30px',
              whiteSpace: 'nowrap'
            }}
          >
            ⏱️ {crossing.averageWaitTime} min
          </div>
        </OverlayView>
      )}

      {/* Country flag indicator */}
      {isSelected && (
        <OverlayView
          position={crossing.location}
          mapPaneName="overlayMouseTarget"
        >
          <div
            style={{
              transform: 'translate(-50%, 100%)',
              marginTop: '20px',
              textAlign: 'center'
            }}
          >
            <img
              src={`/flags/${crossing.neighboringCountry.toLowerCase()}.svg`}
              alt={crossing.neighboringCountry}
              style={{ width: '24px', height: '16px' }}
            />
            <div style={{ fontSize: '10px', marginTop: '2px' }}>
              {crossing.neighboringCountry}
            </div>
          </div>
        </OverlayView>
      )}
    </>
  );
};
```

## 4. Checkpoints

### Government Checkpoints
```typescript
interface Checkpoint {
  id: string;
  name: string;
  nameArabic: string;
  location: LatLng;
  type: 'security' | 'customs' | 'weight_station' | 'toll' | 'inspection';
  authority: string; // Which government body operates it
  operatingHours: string;
  detectionRadius: number; // meters
  isRequired: boolean;
  expectedArrival?: Date;
  services: CheckpointService[];
  averageProcessingTime: number; // minutes
  maxVehicleCapacity: number;
  requiresDocuments: string[];
  contactInfo?: ContactInfo;
}

const SAUDI_CHECKPOINTS: Checkpoint[] = [
  {
    id: 'RIYADH_SECURITY_1',
    name: 'Riyadh Security Checkpoint 1',
    nameArabic: 'نقطة تفتيش أمنية الرياض 1',
    location: { lat: 24.8607, lng: 46.7219 },
    type: 'security',
    authority: 'Ministry of Interior',
    operatingHours: '24/7',
    detectionRadius: 100,
    isRequired: true,
    services: ['document_check', 'vehicle_inspection', 'cargo_scan'],
    averageProcessingTime: 15,
    maxVehicleCapacity: 50,
    requiresDocuments: ['driver_license', 'vehicle_registration', 'cargo_manifest']
  },
  {
    id: 'JEDDAH_CUSTOMS_1',
    name: 'Jeddah Customs Checkpoint',
    nameArabic: 'نقطة تفتيش جمركية جدة',
    location: { lat: 21.5169, lng: 39.2192 },
    type: 'customs',
    authority: 'Saudi Customs',
    operatingHours: '06:00-22:00',
    detectionRadius: 150,
    isRequired: true,
    services: ['customs_declaration', 'cargo_inspection', 'duty_payment'],
    averageProcessingTime: 30,
    maxVehicleCapacity: 30,
    requiresDocuments: ['customs_declaration', 'commercial_invoice', 'bill_of_lading'],
    contactInfo: {
      phone: '+966-12-603-4000',
      email: 'jeddah.customs@customs.gov.sa'
    }
  },
  {
    id: 'DAMMAM_WEIGHT_STATION',
    name: 'Dammam Weight Station',
    nameArabic: 'محطة وزن الدمام',
    location: { lat: 26.4207, lng: 50.0888 },
    type: 'weight_station',
    authority: 'Ministry of Transport',
    operatingHours: '24/7',
    detectionRadius: 200,
    isRequired: true,
    services: ['weight_check', 'dimension_check', 'safety_inspection'],
    averageProcessingTime: 10,
    maxVehicleCapacity: 20,
    requiresDocuments: ['vehicle_registration', 'load_certificate']
  },
  {
    id: 'MECCA_INSPECTION',
    name: 'Mecca Vehicle Inspection',
    nameArabic: 'نقطة فحص مركبات مكة',
    location: { lat: 21.3891, lng: 39.8579 },
    type: 'inspection',
    authority: 'Mecca Municipality',
    operatingHours: '05:00-23:00',
    detectionRadius: 80,
    isRequired: false,
    services: ['emission_test', 'safety_check', 'permit_verification'],
    averageProcessingTime: 20,
    maxVehicleCapacity: 15,
    requiresDocuments: ['vehicle_registration', 'emission_certificate']
  }
];
```

### Checkpoint Marker Component
```typescript
const CheckpointMarker: React.FC<{
  checkpoint: Checkpoint;
  isActive: boolean;
  trucksInQueue: number;
  onCheckpointClick: (checkpoint: Checkpoint) => void;
}> = ({ checkpoint, isActive, trucksInQueue, onCheckpointClick }) => {
  const getCheckpointIcon = () => {
    const baseSize = isActive ? 30 : 24;
    let iconUrl = '/icons/checkpoints/';
    
    switch (checkpoint.type) {
      case 'security':
        iconUrl += 'security-checkpoint.svg';
        break;
      case 'customs':
        iconUrl += 'customs-checkpoint.svg';
        break;
      case 'weight_station':
        iconUrl += 'weight-station.svg';
        break;
      case 'toll':
        iconUrl += 'toll-checkpoint.svg';
        break;
      case 'inspection':
        iconUrl += 'inspection-checkpoint.svg';
        break;
      default:
        iconUrl += 'checkpoint.svg';
    }

    return {
      url: iconUrl,
      scaledSize: new google.maps.Size(baseSize, baseSize),
      anchor: new google.maps.Point(baseSize / 2, baseSize / 2)
    };
  };

  const getCheckpointColor = () => {
    if (!isActive) return '#9E9E9E';
    if (checkpoint.type === 'security') return '#F44336';
    if (checkpoint.type === 'customs') return '#FF9800';
    if (checkpoint.type === 'weight_station') return '#2196F3';
    return '#4CAF50';
  };

  return (
    <>
      <Marker
        position={checkpoint.location}
        icon={getCheckpointIcon()}
        title={`${checkpoint.name} - ${checkpoint.authority}`}
        onClick={() => onCheckpointClick(checkpoint)}
        zIndex={isActive ? 1000 : 200}
      />

      {/* Checkpoint detection zone */}
      <Circle
        center={checkpoint.location}
        radius={checkpoint.detectionRadius}
        options={{
          fillColor: getCheckpointColor(),
          fillOpacity: isActive ? 0.15 : 0.05,
          strokeColor: getCheckpointColor(),
          strokeWeight: isActive ? 2 : 1,
          strokeOpacity: isActive ? 0.8 : 0.3,
          zIndex: 50
        }}
      />

      {/* Queue indicator */}
      {trucksInQueue > 0 && (
        <OverlayView
          position={checkpoint.location}
          mapPaneName="overlayMouseTarget"
        >
          <div
            style={{
              backgroundColor: trucksInQueue > 10 ? '#F44336' : trucksInQueue > 5 ? '#FF9800' : '#4CAF50',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '10px',
              fontSize: '10px',
              fontWeight: 'bold',
              transform: 'translate(-50%, -100%)',
              marginTop: '-25px'
            }}
          >
            🚛 {trucksInQueue}
          </div>
        </OverlayView>
      )}

      {/* Operating hours indicator */}
      {checkpoint.operatingHours !== '24/7' && (
        <OverlayView
          position={checkpoint.location}
          mapPaneName="overlayMouseTarget"
        >
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '2px 4px',
              borderRadius: '8px',
              fontSize: '9px',
              transform: 'translate(-50%, 100%)',
              marginTop: '25px',
              whiteSpace: 'nowrap'
            }}
          >
            🕒 {checkpoint.operatingHours}
          </div>
        </OverlayView>
      )}
    </>
  );
};
```

## 5. Location Management System

### Comprehensive Location Manager
```typescript
interface LocationManagerProps {
  showAirports: boolean;
  showPorts: boolean;
  showBorderCrossings: boolean;
  showCheckpoints: boolean;
  selectedLocationTypes: LocationType[];
  onLocationSelect: (location: Location) => void;
  onLocationFilter: (filters: LocationFilters) => void;
}

const LocationManager: React.FC<LocationManagerProps> = ({
  showAirports,
  showPorts,
  showBorderCrossings,
  showCheckpoints,
  selectedLocationTypes,
  onLocationSelect,
  onLocationFilter
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    capacity: 'all',
    operatingHours: 'all',
    services: []
  });

  // Filter locations based on criteria
  const filteredAirports = useMemo(() => {
    return SAUDI_AIRPORTS.filter(airport => {
      if (locationFilters.capacity !== 'all') {
        const capacityThreshold = getCapacityThreshold(locationFilters.capacity);
        if (airport.capacity < capacityThreshold) return false;
      }
      
      if (locationFilters.operatingHours !== 'all') {
        if (locationFilters.operatingHours === '24_7' && airport.operatingHours !== '24/7') {
          return false;
        }
      }
      
      return true;
    });
  }, [locationFilters]);

  return (
    <>
      {/* Airports */}
      {showAirports && filteredAirports.map(airport => (
        <AirportMarker
          key={airport.id}
          airport={airport}
          isSelected={selectedLocation?.id === airport.id}
          showDetails={selectedLocation?.id === airport.id}
          onAirportClick={(airport) => {
            setSelectedLocation(airport);
            onLocationSelect(airport);
          }}
          onAirportHover={(airport) => {
            // Show quick info on hover
          }}
        />
      ))}

      {/* Ports */}
      {showPorts && SAUDI_PORTS.map(port => (
        <PortMarker
          key={port.id}
          port={port}
          isSelected={selectedLocation?.id === port.id}
          showDetails={selectedLocation?.id === port.id}
          onPortClick={(port) => {
            setSelectedLocation(port);
            onLocationSelect(port);
          }}
        />
      ))}

      {/* Border Crossings */}
      {showBorderCrossings && SAUDI_BORDER_CROSSINGS.map(crossing => (
        <BorderCrossingMarker
          key={crossing.id}
          crossing={crossing}
          isSelected={selectedLocation?.id === crossing.id}
          showWaitTime={true}
          onCrossingClick={(crossing) => {
            setSelectedLocation(crossing);
            onLocationSelect(crossing);
          }}
        />
      ))}

      {/* Checkpoints */}
      {showCheckpoints && SAUDI_CHECKPOINTS.map(checkpoint => (
        <CheckpointMarker
          key={checkpoint.id}
          checkpoint={checkpoint}
          isActive={true}
          trucksInQueue={Math.floor(Math.random() * 15)} // Mock data
          onCheckpointClick={(checkpoint) => {
            setSelectedLocation(checkpoint);
            onLocationSelect(checkpoint);
          }}
        />
      ))}
    </>
  );
};
```

## Benefits and Advantages

### 1. Comprehensive Coverage
- **Complete Infrastructure**: All major airports, ports, and border crossings
- **Accurate Information**: Up-to-date contact information and specifications
- **Real-time Data**: Current operating status and wait times
- **Detailed Services**: Complete list of available services at each location

### 2. Enhanced Navigation
- **Strategic Planning**: Better route planning considering all facilities
- **Alternative Options**: Multiple options for each type of facility
- **Capacity Planning**: Information about capacity and availability
- **Time Optimization**: Operating hours and processing times

### 3. Operational Efficiency
- **Reduced Delays**: Advance knowledge of wait times and requirements
- **Better Preparation**: Required documents and procedures
- **Cost Optimization**: Choose most efficient routes and facilities
- **Compliance Assurance**: Meet all regulatory requirements

### 4. User Experience
- **Visual Clarity**: Clear icons and color coding for different facility types
- **Comprehensive Information**: All necessary details in one place
- **Interactive Interface**: Easy access to detailed information
- **Real-time Updates**: Current status and availability

## Conclusion

The comprehensive location markers system provides complete coverage of Saudi Arabia's transportation infrastructure, enabling efficient trip planning and execution with accurate, up-to-date information about all major facilities and checkpoints.