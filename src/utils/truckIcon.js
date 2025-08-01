// Enhanced truck icon generator with better quality and proper orientation
export const createTruckIcon = (bearing, direction = 'forward', isMoving = false) => {
  const truckColor = direction === 'forward' ? '#2196F3' : '#FF9800';
  const cabColor = direction === 'forward' ? '#1976D2' : '#F57C00';
  const statusColor = isMoving ? '#4CAF50' : '#757575';
  
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
          <linearGradient id="truckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${truckColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${cabColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <g transform="rotate(${bearing} 30 30)" filter="url(#shadow)">
          <!-- Truck body -->
          <rect x="8" y="18" width="36" height="24" fill="url(#truckGradient)" stroke="white" stroke-width="2" rx="4"/>
          
          <!-- Truck cab -->
          <rect x="8" y="22" width="20" height="16" fill="${cabColor}" stroke="white" stroke-width="1" rx="2"/>
          
          <!-- Windshield -->
          <rect x="10" y="24" width="16" height="8" fill="#87CEEB" stroke="white" stroke-width="1" rx="1"/>
          
          <!-- Cargo area -->
          <rect x="30" y="20" width="12" height="20" fill="${truckColor}" stroke="white" stroke-width="1" rx="2"/>
          
          <!-- Front bumper -->
          <rect x="6" y="26" width="2" height="8" fill="#424242" rx="1"/>
          
          <!-- Wheels -->
          <circle cx="16" cy="44" r="5" fill="#424242" stroke="white" stroke-width="2"/>
          <circle cx="16" cy="44" r="3" fill="#666666"/>
          <circle cx="36" cy="44" r="5" fill="#424242" stroke="white" stroke-width="2"/>
          <circle cx="36" cy="44" r="3" fill="#666666"/>
          
          <!-- Headlights -->
          <circle cx="8" cy="24" r="2" fill="#FFFF99" stroke="white" stroke-width="1"/>
          <circle cx="8" cy="36" r="2" fill="#FFFF99" stroke="white" stroke-width="1"/>
          
          <!-- Direction indicator -->
          <polygon points="44,26 50,30 44,34" fill="${statusColor}" stroke="white" stroke-width="1"/>
          
          <!-- Status indicator -->
          <circle cx="30" cy="15" r="3" fill="${statusColor}" stroke="white" stroke-width="1">
            ${isMoving ? '<animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>' : ''}
          </circle>
          
          <!-- Direction arrow -->
          <text x="30" y="32" text-anchor="middle" fill="white" font-size="8" font-weight="bold" font-family="Arial">
            ${direction === 'forward' ? '→' : '←'}
          </text>
        </g>
      </svg>
    `),
    scaledSize: new window.google.maps.Size(60, 60),
    anchor: new window.google.maps.Point(30, 30)
  };
};

// Create detailed route points for smooth movement
export const createDetailedRoute = (startPoint, endPoint, intermediatePoints = []) => {
  const allPoints = [startPoint, ...intermediatePoints, endPoint];
  const detailedPoints = [];
  
  for (let i = 0; i < allPoints.length - 1; i++) {
    const current = allPoints[i];
    const next = allPoints[i + 1];
    
    // Add intermediate points between each pair for smooth movement
    const steps = 20; // Number of intermediate points
    for (let step = 0; step <= steps; step++) {
      const ratio = step / steps;
      const lat = current.lat + (next.lat - current.lat) * ratio;
      const lng = current.lng + (next.lng - current.lng) * ratio;
      detailedPoints.push({ lat, lng });
    }
  }
  
  return detailedPoints;
};

// Saudi Arabia highway routes with realistic waypoints
export const saudiRoutes = {
  riyadhToDammam: [
    { lat: 24.7136, lng: 46.6753, name: "Riyadh - Kingdom Centre" },
    { lat: 24.7200, lng: 46.7100, name: "Riyadh Exit" },
    { lat: 24.7350, lng: 46.7500, name: "Highway Entry" },
    { lat: 24.7500, lng: 46.8000, name: "Checkpoint 1" },
    { lat: 24.8000, lng: 46.9000, name: "Rest Area 1" },
    { lat: 24.9000, lng: 47.1000, name: "Qassim Junction" },
    { lat: 25.0000, lng: 47.2000, name: "Checkpoint 2" },
    { lat: 25.1000, lng: 47.4000, name: "Fuel Station" },
    { lat: 25.2000, lng: 47.8000, name: "Checkpoint 3" },
    { lat: 25.3000, lng: 48.0000, name: "Rest Area 2" },
    { lat: 25.4000, lng: 48.3000, name: "Hofuf Junction" },
    { lat: 25.5000, lng: 48.5000, name: "Checkpoint 4" },
    { lat: 25.7000, lng: 48.8000, name: "Al Ahsa" },
    { lat: 25.9000, lng: 49.1000, name: "Final Checkpoint" },
    { lat: 26.0000, lng: 49.2000, name: "Approaching Dammam" },
    { lat: 26.2000, lng: 49.6000, name: "Dammam Suburbs" },
    { lat: 26.4207, lng: 50.0888, name: "Dammam City Center" }
  ],
  
  riyadhCityRoute: [
    { lat: 24.7136, lng: 46.6753, name: "Kingdom Centre" },
    { lat: 24.7150, lng: 46.6780, name: "King Fahd Road" },
    { lat: 24.7180, lng: 46.6820, name: "Business District" },
    { lat: 24.7200, lng: 46.6900, name: "Shopping Area" },
    { lat: 24.7150, lng: 46.6950, name: "Residential 1" },
    { lat: 24.7100, lng: 46.7000, name: "Intersection 1" },
    { lat: 24.7050, lng: 46.7050, name: "Mall Area" },
    { lat: 24.7000, lng: 46.7100, name: "Shopping Mall" },
    { lat: 24.6950, lng: 46.7150, name: "Residential 2" },
    { lat: 24.6900, lng: 46.7200, name: "School Zone" },
    { lat: 24.6850, lng: 46.7180, name: "Park Area" },
    { lat: 24.6800, lng: 46.7150, name: "Hospital District" },
    { lat: 24.6750, lng: 46.7100, name: "Medical Center" },
    { lat: 24.6700, lng: 46.7050, name: "University Area" },
    { lat: 24.6650, lng: 46.7000, name: "Student Housing" },
    { lat: 24.6600, lng: 46.6950, name: "Commercial Zone" },
    { lat: 24.6550, lng: 46.6900, name: "Office Complex" },
    { lat: 24.6500, lng: 46.6850, name: "Government District" },
    { lat: 24.6450, lng: 46.6800, name: "Ministry Area" },
    { lat: 24.6400, lng: 46.6750, name: "Embassy Quarter" },
    { lat: 24.6350, lng: 46.6800, name: "Cultural District" },
    { lat: 24.6308, lng: 46.7073, name: "Masmak Fortress" }
  ]
};

// Calculate bearing with improved accuracy
export const calculateBearing = (start, end) => {
  const dLng = (end.lng - start.lng) * Math.PI / 180;
  const lat1 = start.lat * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};

// Smooth interpolation between points
export const interpolatePoints = (point1, point2, ratio) => {
  return {
    lat: point1.lat + (point2.lat - point1.lat) * ratio,
    lng: point1.lng + (point2.lng - point1.lng) * ratio
  };
};