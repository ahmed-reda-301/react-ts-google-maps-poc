// Premium high-quality truck icon with ultra-realistic design
export const createPremiumTruckIcon = (bearing, direction = 'forward', isMoving = false, truckType = 'cargo') => {
  const truckStyles = {
    cargo: {
      bodyColor: direction === 'forward' ? '#1565C0' : '#F57C00',
      cabColor: direction === 'forward' ? '#0D47A1' : '#E65100',
      accentColor: direction === 'forward' ? '#003C8F' : '#BF360C',
      detailColor: '#FFFFFF'
    },
    delivery: {
      bodyColor: direction === 'forward' ? '#2E7D32' : '#D32F2F',
      cabColor: direction === 'forward' ? '#1B5E20' : '#B71C1C',
      accentColor: direction === 'forward' ? '#0D5016' : '#8B0000',
      detailColor: '#FFFFFF'
    },
    luxury: {
      bodyColor: direction === 'forward' ? '#6A1B9A' : '#FF5722',
      cabColor: direction === 'forward' ? '#4A148C' : '#D84315',
      accentColor: direction === 'forward' ? '#2E003E' : '#BF360C',
      detailColor: '#FFD700'
    }
  };

  const style = truckStyles[truckType] || truckStyles.cargo;
  const statusColor = isMoving ? '#4CAF50' : '#757575';
  const size = 80;
  
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Enhanced shadow filter -->
          <filter id="premiumShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="3" dy="3" result="offset"/>
            <feFlood flood-color="rgba(0,0,0,0.4)"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <!-- Gradient definitions -->
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${style.bodyColor};stop-opacity:1" />
            <stop offset="30%" style="stop-color:${style.cabColor};stop-opacity:1" />
            <stop offset="70%" style="stop-color:${style.bodyColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${style.accentColor};stop-opacity:1" />
          </linearGradient>
          
          <linearGradient id="cabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${style.cabColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${style.bodyColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${style.accentColor};stop-opacity:1" />
          </linearGradient>
          
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#888888;stop-opacity:1" />
            <stop offset="40%" style="stop-color:#555555;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#333333;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#111111;stop-opacity:1" />
          </radialGradient>
          
          <linearGradient id="windshieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:0.9" />
            <stop offset="50%" style="stop-color:#B0E0E6;stop-opacity:0.7" />
            <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:0.5" />
          </linearGradient>
          
          <radialGradient id="lightGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#FFFFCC;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#FFFF99;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFFF66;stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <!-- Truck shadow on ground -->
        <ellipse cx="${size/2}" cy="${size-8}" rx="30" ry="6" fill="rgba(0,0,0,0.3)" opacity="0.6"/>
        
        <g transform="rotate(${bearing} ${size/2} ${size/2})" filter="url(#premiumShadow)">
          
          <!-- Main truck chassis -->
          <rect x="15" y="25" width="50" height="30" fill="url(#bodyGradient)" stroke="${style.detailColor}" stroke-width="2" rx="6"/>
          
          <!-- Truck cab with detailed design -->
          <rect x="15" y="28" width="28" height="24" fill="url(#cabGradient)" stroke="${style.detailColor}" stroke-width="1.5" rx="4"/>
          
          <!-- Windshield with realistic reflection -->
          <rect x="17" y="30" width="24" height="12" fill="url(#windshieldGradient)" stroke="${style.detailColor}" stroke-width="1" rx="3"/>
          
          <!-- Windshield reflection details -->
          <rect x="18" y="31" width="10" height="5" fill="#E0F6FF" opacity="0.8" rx="2"/>
          <rect x="30" y="31" width="10" height="5" fill="#E0F6FF" opacity="0.6" rx="2"/>
          
          <!-- Windshield wipers -->
          <line x1="22" y1="35" x2="26" y2="38" stroke="${style.accentColor}" stroke-width="1" opacity="0.7"/>
          <line x1="35" y1="35" x2="31" y2="38" stroke="${style.accentColor}" stroke-width="1" opacity="0.7"/>
          
          <!-- Cargo/trailer section -->
          <rect x="45" y="27" width="18" height="26" fill="${style.bodyColor}" stroke="${style.detailColor}" stroke-width="1.5" rx="4"/>
          
          <!-- Cargo door details -->
          <rect x="47" y="29" width="14" height="22" fill="none" stroke="${style.detailColor}" stroke-width="1" rx="2"/>
          <line x1="54" y1="31" x2="54" y2="49" stroke="${style.detailColor}" stroke-width="0.8"/>
          <circle cx="52" cy="40" r="1.5" fill="${style.detailColor}"/>
          <circle cx="56" cy="40" r="1.5" fill="${style.detailColor}"/>
          
          <!-- Front grille and bumper -->
          <rect x="12" y="32" width="3" height="16" fill="#333333" rx="1.5"/>
          <rect x="12.5" y="33" width="2" height="14" fill="#555555" rx="1"/>
          
          <!-- Grille details -->
          <line x1="13" y1="34" x2="13" y2="46" stroke="#777777" stroke-width="0.5"/>
          <line x1="13.5" y1="34" x2="13.5" y2="46" stroke="#777777" stroke-width="0.5"/>
          <line x1="14" y1="34" x2="14" y2="46" stroke="#777777" stroke-width="0.5"/>
          
          <!-- Side mirrors with realistic design -->
          <rect x="13" y="30" width="3" height="4" fill="#333333" rx="1.5"/>
          <rect x="13" y="46" width="3" height="4" fill="#333333" rx="1.5"/>
          <rect x="13.5" y="30.5" width="2" height="3" fill="#87CEEB" opacity="0.8" rx="1"/>
          <rect x="13.5" y="46.5" width="2" height="3" fill="#87CEEB" opacity="0.8" rx="1"/>
          
          <!-- Enhanced wheels with detailed rims -->
          <circle cx="25" cy="57" r="7" fill="url(#wheelGradient)" stroke="${style.detailColor}" stroke-width="2"/>
          <circle cx="25" cy="57" r="5" fill="#444444"/>
          <circle cx="25" cy="57" r="3" fill="#666666"/>
          <circle cx="25" cy="57" r="1.5" fill="#888888"/>
          
          <!-- Wheel rim spokes -->
          <line x1="25" y1="50" x2="25" y2="64" stroke="#999999" stroke-width="1"/>
          <line x1="18" y1="57" x2="32" y2="57" stroke="#999999" stroke-width="1"/>
          <line x1="20" y1="52" x2="30" y2="62" stroke="#999999" stroke-width="0.8"/>
          <line x1="30" y1="52" x2="20" y2="62" stroke="#999999" stroke-width="0.8"/>
          
          <circle cx="50" cy="57" r="7" fill="url(#wheelGradient)" stroke="${style.detailColor}" stroke-width="2"/>
          <circle cx="50" cy="57" r="5" fill="#444444"/>
          <circle cx="50" cy="57" r="3" fill="#666666"/>
          <circle cx="50" cy="57" r="1.5" fill="#888888"/>
          
          <!-- Wheel rim spokes -->
          <line x1="50" y1="50" x2="50" y2="64" stroke="#999999" stroke-width="1"/>
          <line x1="43" y1="57" x2="57" y2="57" stroke="#999999" stroke-width="1"/>
          <line x1="45" y1="52" x2="55" y2="62" stroke="#999999" stroke-width="0.8"/>
          <line x1="55" y1="52" x2="45" y2="62" stroke="#999999" stroke-width="0.8"/>
          
          <!-- Enhanced headlights -->
          <circle cx="15" cy="32" r="3" fill="url(#lightGradient)" stroke="${style.detailColor}" stroke-width="1.5"/>
          <circle cx="15" cy="32" r="2" fill="#FFFFCC"/>
          <circle cx="15" cy="32" r="1" fill="#FFFFFF" opacity="0.9"/>
          
          <circle cx="15" cy="48" r="3" fill="url(#lightGradient)" stroke="${style.detailColor}" stroke-width="1.5"/>
          <circle cx="15" cy="48" r="2" fill="#FFFFCC"/>
          <circle cx="15" cy="48" r="1" fill="#FFFFFF" opacity="0.9"/>
          
          <!-- Taillights -->
          <circle cx="63" cy="32" r="2.5" fill="#FF4444" stroke="${style.detailColor}" stroke-width="1"/>
          <circle cx="63" cy="32" r="1.5" fill="#FF6666"/>
          <circle cx="63" cy="48" r="2.5" fill="#FF4444" stroke="${style.detailColor}" stroke-width="1"/>
          <circle cx="63" cy="48" r="1.5" fill="#FF6666"/>
          
          <!-- Turn signals -->
          <circle cx="63" cy="38" r="2" fill="#FFA500" stroke="${style.detailColor}" stroke-width="1"/>
          <circle cx="63" cy="42" r="2" fill="#FFA500" stroke="${style.detailColor}" stroke-width="1"/>
          
          <!-- Company logo area -->
          <rect x="47" y="33" width="12" height="8" fill="${style.detailColor}" stroke="${style.accentColor}" stroke-width="1.5" rx="2"/>
          <text x="53" y="38" text-anchor="middle" fill="${style.accentColor}" font-size="5" font-weight="bold" font-family="Arial">SAUDI</text>
          
          <!-- Direction indicator arrow -->
          <polygon points="66,35 72,40 66,45" fill="${statusColor}" stroke="${style.detailColor}" stroke-width="1.5"/>
          
          <!-- Status indicator with enhanced animation -->
          <circle cx="40" cy="20" r="4" fill="${statusColor}" stroke="${style.detailColor}" stroke-width="2">
            ${isMoving ? `
              <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
              <animate attributeName="r" values="4;5;4" dur="1.2s" repeatCount="indefinite"/>
            ` : ''}
          </circle>
          
          <!-- GPS antenna -->
          <rect x="38" y="18" width="4" height="2" fill="#333333" rx="1"/>
          <line x1="40" y1="18" x2="40" y2="15" stroke="#333333" stroke-width="1"/>
          <circle cx="40" cy="15" r="1" fill="${statusColor}"/>
          
          <!-- Direction text with enhanced styling -->
          <text x="40" y="42" text-anchor="middle" fill="${style.detailColor}" font-size="8" font-weight="bold" font-family="Arial" stroke="${style.accentColor}" stroke-width="0.5">
            ${direction === 'forward' ? '→' : '←'}
          </text>
          
          <!-- Speed indicator lines (only when moving) -->
          ${isMoving ? `
            <g opacity="0.8">
              <line x1="70" y1="36" x2="76" y2="36" stroke="${statusColor}" stroke-width="2">
                <animate attributeName="x1" values="70;65;70" dur="0.4s" repeatCount="indefinite"/>
                <animate attributeName="x2" values="76;71;76" dur="0.4s" repeatCount="indefinite"/>
              </line>
              <line x1="70" y1="40" x2="74" y2="40" stroke="${statusColor}" stroke-width="1.5" opacity="0.7">
                <animate attributeName="x1" values="70;67;70" dur="0.6s" repeatCount="indefinite"/>
                <animate attributeName="x2" values="74;71;74" dur="0.6s" repeatCount="indefinite"/>
              </line>
              <line x1="70" y1="44" x2="76" y2="44" stroke="${statusColor}" stroke-width="2">
                <animate attributeName="x1" values="70;65;70" dur="0.4s" repeatCount="indefinite"/>
                <animate attributeName="x2" values="76;71;76" dur="0.4s" repeatCount="indefinite"/>
              </line>
            </g>
          ` : ''}
          
          <!-- Exhaust pipe -->
          <rect x="62" y="52" width="2" height="6" fill="#333333" rx="1"/>
          ${isMoving ? `
            <circle cx="63" cy="52" r="2" fill="#CCCCCC" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </circle>
          ` : ''}
          
          <!-- License plate -->
          <rect x="47" y="50" width="12" height="4" fill="${style.detailColor}" stroke="${style.accentColor}" stroke-width="1" rx="1"/>
          <text x="53" y="53" text-anchor="middle" fill="${style.accentColor}" font-size="3" font-weight="bold">KSA-123</text>
          
        </g>
      </svg>
    `),
    scaledSize: new window.google.maps.Size(size, size),
    anchor: new window.google.maps.Point(size/2, size/2)
  };
};

// Create ultra-detailed route with massive number of points for ultra-smooth movement
export const createUltraDetailedRoute = (waypoints, pointsPerSegment = 50) => {
  const ultraDetailedPoints = [];
  
  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];
    
    // Create many intermediate points for ultra-smooth movement
    for (let step = 0; step <= pointsPerSegment; step++) {
      const ratio = step / pointsPerSegment;
      
      // Use smooth interpolation with slight curve for more realistic movement
      const curveFactor = Math.sin(ratio * Math.PI) * 0.0001; // Very slight curve
      
      const lat = start.lat + (end.lat - start.lat) * ratio + curveFactor;
      const lng = start.lng + (end.lng - start.lng) * ratio + curveFactor;
      
      ultraDetailedPoints.push({ lat, lng });
    }
  }
  
  return ultraDetailedPoints;
};

// Enhanced Saudi routes with many more waypoints
export const enhancedSaudiRoutes = {
  riyadhToDammamHighway: [
    { lat: 24.7136, lng: 46.6753, name: "Riyadh - Kingdom Centre" },
    { lat: 24.7180, lng: 46.6800, name: "Exit Riyadh North" },
    { lat: 24.7220, lng: 46.6850, name: "Highway Entrance" },
    { lat: 24.7280, lng: 46.6920, name: "First Overpass" },
    { lat: 24.7350, lng: 46.7000, name: "Industrial Area" },
    { lat: 24.7420, lng: 46.7100, name: "Checkpoint Alpha" },
    { lat: 24.7500, lng: 46.7200, name: "Rest Area 1" },
    { lat: 24.7600, lng: 46.7350, name: "Fuel Station 1" },
    { lat: 24.7720, lng: 46.7500, name: "Highway Junction 1" },
    { lat: 24.7850, lng: 46.7700, name: "Bridge Crossing" },
    { lat: 24.8000, lng: 46.7900, name: "Checkpoint Beta" },
    { lat: 24.8200, lng: 46.8200, name: "Desert Section Start" },
    { lat: 24.8450, lng: 46.8600, name: "Midway Point" },
    { lat: 24.8700, lng: 46.9000, name: "Rest Area 2" },
    { lat: 24.9000, lng: 46.9500, name: "Fuel Station 2" },
    { lat: 24.9300, lng: 47.0000, name: "Checkpoint Gamma" },
    { lat: 24.9600, lng: 47.0600, name: "Highway Junction 2" },
    { lat: 25.0000, lng: 47.1200, name: "Major Intersection" },
    { lat: 25.0400, lng: 47.2000, name: "Rest Area 3" },
    { lat: 25.0800, lng: 47.2800, name: "Checkpoint Delta" },
    { lat: 25.1200, lng: 47.3600, name: "Fuel Station 3" },
    { lat: 25.1600, lng: 47.4500, name: "Highway Junction 3" },
    { lat: 25.2000, lng: 47.5400, name: "Desert Oasis" },
    { lat: 25.2500, lng: 47.6500, name: "Checkpoint Epsilon" },
    { lat: 25.3000, lng: 47.7600, name: "Rest Area 4" },
    { lat: 25.3600, lng: 47.8800, name: "Fuel Station 4" },
    { lat: 25.4200, lng: 48.0000, name: "Highway Junction 4" },
    { lat: 25.4800, lng: 48.1300, name: "Checkpoint Zeta" },
    { lat: 25.5400, lng: 48.2600, name: "Rest Area 5" },
    { lat: 25.6000, lng: 48.4000, name: "Fuel Station 5" },
    { lat: 25.6700, lng: 48.5500, name: "Highway Junction 5" },
    { lat: 25.7400, lng: 48.7000, name: "Checkpoint Eta" },
    { lat: 25.8100, lng: 48.8600, name: "Rest Area 6" },
    { lat: 25.8800, lng: 49.0200, name: "Approaching Dammam" },
    { lat: 25.9500, lng: 49.1900, name: "Dammam Suburbs" },
    { lat: 26.0200, lng: 49.3600, name: "Dammam Industrial" },
    { lat: 26.1000, lng: 49.5400, name: "Dammam North" },
    { lat: 26.2000, lng: 49.7200, name: "Dammam Central" },
    { lat: 26.3000, lng: 49.8800, name: "Dammam Port Area" },
    { lat: 26.4207, lng: 50.0888, name: "Dammam City Center" }
  ],
  
  riyadhCityDetailed: [
    { lat: 24.7136, lng: 46.6753, name: "Kingdom Centre" },
    { lat: 24.7140, lng: 46.6760, name: "King Fahd Road North" },
    { lat: 24.7145, lng: 46.6770, name: "Business District Entry" },
    { lat: 24.7150, lng: 46.6780, name: "Corporate Tower" },
    { lat: 24.7160, lng: 46.6795, name: "Banking District" },
    { lat: 24.7170, lng: 46.6810, name: "Financial Center" },
    { lat: 24.7180, lng: 46.6825, name: "Commercial Hub" },
    { lat: 24.7185, lng: 46.6840, name: "Shopping Complex" },
    { lat: 24.7190, lng: 46.6855, name: "Retail Center" },
    { lat: 24.7195, lng: 46.6870, name: "Mall Entrance" },
    { lat: 24.7200, lng: 46.6885, name: "Shopping District" },
    { lat: 24.7195, lng: 46.6900, name: "Residential Entry" },
    { lat: 24.7190, lng: 46.6915, name: "Housing Complex 1" },
    { lat: 24.7180, lng: 46.6930, name: "Community Center" },
    { lat: 24.7170, lng: 46.6945, name: "School Zone" },
    { lat: 24.7160, lng: 46.6960, name: "Educational District" },
    { lat: 24.7150, lng: 46.6975, name: "University Area" },
    { lat: 24.7140, lng: 46.6990, name: "Student Housing" },
    { lat: 24.7130, lng: 46.7005, name: "Academic Zone" },
    { lat: 24.7120, lng: 46.7020, name: "Research Center" },
    { lat: 24.7110, lng: 46.7035, name: "Innovation Hub" },
    { lat: 24.7100, lng: 46.7050, name: "Tech District" },
    { lat: 24.7090, lng: 46.7065, name: "IT Complex" },
    { lat: 24.7080, lng: 46.7080, name: "Business Park" },
    { lat: 24.7070, lng: 46.7095, name: "Office Complex" },
    { lat: 24.7060, lng: 46.7110, name: "Corporate Center" },
    { lat: 24.7050, lng: 46.7125, name: "Administrative Zone" },
    { lat: 24.7040, lng: 46.7140, name: "Government District" },
    { lat: 24.7030, lng: 46.7155, name: "Ministry Area" },
    { lat: 24.7020, lng: 46.7170, name: "Embassy Quarter" },
    { lat: 24.7010, lng: 46.7185, name: "Diplomatic Zone" },
    { lat: 24.7000, lng: 46.7200, name: "Cultural District" },
    { lat: 24.6990, lng: 46.7185, name: "Arts Center" },
    { lat: 24.6980, lng: 46.7170, name: "Museum Quarter" },
    { lat: 24.6970, lng: 46.7155, name: "Heritage Area" },
    { lat: 24.6960, lng: 46.7140, name: "Traditional Market" },
    { lat: 24.6950, lng: 46.7125, name: "Souq District" },
    { lat: 24.6940, lng: 46.7110, name: "Old Town" },
    { lat: 24.6930, lng: 46.7095, name: "Historic Quarter" },
    { lat: 24.6920, lng: 46.7080, name: "Ancient Streets" },
    { lat: 24.6910, lng: 46.7065, name: "Traditional Area" },
    { lat: 24.6900, lng: 46.7050, name: "Heritage Site" },
    { lat: 24.6890, lng: 46.7035, name: "Cultural Center" },
    { lat: 24.6880, lng: 46.7020, name: "Arts District" },
    { lat: 24.6870, lng: 46.7005, name: "Creative Zone" },
    { lat: 24.6860, lng: 46.6990, name: "Design Quarter" },
    { lat: 24.6850, lng: 46.6975, name: "Innovation Area" },
    { lat: 24.6840, lng: 46.6960, name: "Tech Hub" },
    { lat: 24.6830, lng: 46.6945, name: "Startup District" },
    { lat: 24.6820, lng: 46.6930, name: "Business Incubator" },
    { lat: 24.6810, lng: 46.6915, name: "Entrepreneurship Zone" },
    { lat: 24.6800, lng: 46.6900, name: "Commercial Area" },
    { lat: 24.6790, lng: 46.6885, name: "Trade Center" },
    { lat: 24.6780, lng: 46.6870, name: "Market District" },
    { lat: 24.6770, lng: 46.6855, name: "Shopping Area" },
    { lat: 24.6760, lng: 46.6840, name: "Retail Zone" },
    { lat: 24.6750, lng: 46.6825, name: "Consumer District" },
    { lat: 24.6740, lng: 46.6810, name: "Service Area" },
    { lat: 24.6730, lng: 46.6795, name: "Support Zone" },
    { lat: 24.6720, lng: 46.6780, name: "Logistics Hub" },
    { lat: 24.6710, lng: 46.6765, name: "Distribution Center" },
    { lat: 24.6700, lng: 46.6750, name: "Warehouse District" },
    { lat: 24.6690, lng: 46.6765, name: "Industrial Zone" },
    { lat: 24.6680, lng: 46.6780, name: "Manufacturing Area" },
    { lat: 24.6670, lng: 46.6795, name: "Production District" },
    { lat: 24.6660, lng: 46.6810, name: "Factory Zone" },
    { lat: 24.6650, lng: 46.6825, name: "Industrial Complex" },
    { lat: 24.6640, lng: 46.6840, name: "Processing Area" },
    { lat: 24.6630, lng: 46.6855, name: "Assembly District" },
    { lat: 24.6620, lng: 46.6870, name: "Quality Control Zone" },
    { lat: 24.6610, lng: 46.6885, name: "Testing Facility" },
    { lat: 24.6600, lng: 46.6900, name: "Research Lab" },
    { lat: 24.6590, lng: 46.6915, name: "Development Center" },
    { lat: 24.6580, lng: 46.6930, name: "Innovation Lab" },
    { lat: 24.6570, lng: 46.6945, name: "Technology Center" },
    { lat: 24.6560, lng: 46.6960, name: "Science Park" },
    { lat: 24.6550, lng: 46.6975, name: "Medical District" },
    { lat: 24.6540, lng: 46.6990, name: "Hospital Complex" },
    { lat: 24.6530, lng: 46.7005, name: "Healthcare Center" },
    { lat: 24.6520, lng: 46.7020, name: "Medical Facility" },
    { lat: 24.6510, lng: 46.7035, name: "Clinic Area" },
    { lat: 24.6500, lng: 46.7050, name: "Wellness Center" },
    { lat: 24.6490, lng: 46.7035, name: "Rehabilitation Zone" },
    { lat: 24.6480, lng: 46.7020, name: "Therapy Center" },
    { lat: 24.6470, lng: 46.7005, name: "Recovery Area" },
    { lat: 24.6460, lng: 46.6990, name: "Support Services" },
    { lat: 24.6450, lng: 46.6975, name: "Community Health" },
    { lat: 24.6440, lng: 46.6960, name: "Public Services" },
    { lat: 24.6430, lng: 46.6945, name: "Social Center" },
    { lat: 24.6420, lng: 46.6930, name: "Civic District" },
    { lat: 24.6410, lng: 46.6915, name: "Municipal Area" },
    { lat: 24.6400, lng: 46.6900, name: "City Hall District" },
    { lat: 24.6390, lng: 46.6915, name: "Administrative Center" },
    { lat: 24.6380, lng: 46.6930, name: "Government Services" },
    { lat: 24.6370, lng: 46.6945, name: "Public Office" },
    { lat: 24.6360, lng: 46.6960, name: "Service Center" },
    { lat: 24.6350, lng: 46.6975, name: "Information Hub" },
    { lat: 24.6340, lng: 46.6990, name: "Help Center" },
    { lat: 24.6330, lng: 46.7005, name: "Support Office" },
    { lat: 24.6320, lng: 46.7020, name: "Assistance Center" },
    { lat: 24.6315, lng: 46.7035, name: "Aid Station" },
    { lat: 24.6310, lng: 46.7050, name: "Relief Center" },
    { lat: 24.6308, lng: 46.7073, name: "Masmak Fortress" }
  ]
};

// Enhanced bearing calculation with smoothing
export const calculateSmoothBearing = (start, end, previousBearing) => {
  const dLng = (end.lng - start.lng) * Math.PI / 180;
  const lat1 = start.lat * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;
  
  // Smooth bearing transition if we have a previous bearing
  if (previousBearing !== null && previousBearing !== undefined) {
    let diff = bearing - previousBearing;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Limit bearing change to prevent sudden jumps
    const maxChange = 15; // Maximum degrees change per step
    if (Math.abs(diff) > maxChange) {
      bearing = previousBearing + (diff > 0 ? maxChange : -maxChange);
      bearing = (bearing + 360) % 360;
    }
  }
  
  return bearing;
};