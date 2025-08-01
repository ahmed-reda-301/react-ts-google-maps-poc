// Enhanced truck icons with different styles and better quality
export const createEnhancedTruckIcon = (bearing, direction = 'forward', isMoving = false, style = 'modern') => {
  const styles = {
    modern: {
      truckColor: direction === 'forward' ? '#2196F3' : '#FF9800',
      cabColor: direction === 'forward' ? '#1976D2' : '#F57C00',
      accentColor: direction === 'forward' ? '#0D47A1' : '#E65100'
    },
    classic: {
      truckColor: direction === 'forward' ? '#4CAF50' : '#F44336',
      cabColor: direction === 'forward' ? '#388E3C' : '#D32F2F',
      accentColor: direction === 'forward' ? '#1B5E20' : '#B71C1C'
    },
    luxury: {
      truckColor: direction === 'forward' ? '#9C27B0' : '#FF5722',
      cabColor: direction === 'forward' ? '#7B1FA2' : '#E64A19',
      accentColor: direction === 'forward' ? '#4A148C' : '#BF360C'
    }
  };

  const currentStyle = styles[style] || styles.modern;
  const statusColor = isMoving ? '#4CAF50' : '#757575';
  
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.4)"/>
          </filter>
          <linearGradient id="truckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${currentStyle.truckColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${currentStyle.cabColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${currentStyle.accentColor};stop-opacity:1" />
          </linearGradient>
          <linearGradient id="cabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${currentStyle.cabColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${currentStyle.accentColor};stop-opacity:1" />
          </linearGradient>
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#666666;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#424242;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#212121;stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <g transform="rotate(${bearing} 35 35)" filter="url(#shadow)">
          <!-- Truck shadow -->
          <ellipse cx="35" cy="55" rx="25" ry="8" fill="rgba(0,0,0,0.2)"/>
          
          <!-- Main truck body -->
          <rect x="12" y="22" width="40" height="26" fill="url(#truckGradient)" stroke="white" stroke-width="2" rx="5"/>
          
          <!-- Truck cab -->
          <rect x="12" y="26" width="22" height="18" fill="url(#cabGradient)" stroke="white" stroke-width="1.5" rx="3"/>
          
          <!-- Windshield with reflection -->
          <rect x="14" y="28" width="18" height="10" fill="#87CEEB" stroke="white" stroke-width="1" rx="2"/>
          <rect x="15" y="29" width="8" height="4" fill="#B0E0E6" opacity="0.7" rx="1"/>
          
          <!-- Cargo area -->
          <rect x="36" y="24" width="14" height="22" fill="${currentStyle.truckColor}" stroke="white" stroke-width="1.5" rx="3"/>
          
          <!-- Cargo door details -->
          <rect x="38" y="26" width="10" height="18" fill="none" stroke="white" stroke-width="1" rx="1"/>
          <line x1="43" y1="28" x2="43" y2="42" stroke="white" stroke-width="0.5"/>
          
          <!-- Front bumper and grille -->
          <rect x="9" y="30" width="3" height="10" fill="#424242" rx="1.5"/>
          <rect x="10" y="31" width="2" height="8" fill="#666666" rx="1"/>
          
          <!-- Side mirrors -->
          <rect x="11" y="28" width="2" height="3" fill="#424242" rx="1"/>
          <rect x="11" y="39" width="2" height="3" fill="#424242" rx="1"/>
          
          <!-- Wheels with detailed design -->
          <circle cx="20" cy="50" r="6" fill="url(#wheelGradient)" stroke="white" stroke-width="2"/>
          <circle cx="20" cy="50" r="4" fill="#424242"/>
          <circle cx="20" cy="50" r="2" fill="#666666"/>
          
          <circle cx="42" cy="50" r="6" fill="url(#wheelGradient)" stroke="white" stroke-width="2"/>
          <circle cx="42" cy="50" r="4" fill="#424242"/>
          <circle cx="42" cy="50" r="2" fill="#666666"/>
          
          <!-- Headlights -->
          <circle cx="12" cy="28" r="2.5" fill="#FFFF99" stroke="white" stroke-width="1"/>
          <circle cx="12" cy="28" r="1.5" fill="#FFFFCC"/>
          <circle cx="12" cy="40" r="2.5" fill="#FFFF99" stroke="white" stroke-width="1"/>
          <circle cx="12" cy="40" r="1.5" fill="#FFFFCC"/>
          
          <!-- Taillights -->
          <circle cx="50" cy="28" r="2" fill="#FF4444" stroke="white" stroke-width="1"/>
          <circle cx="50" cy="40" r="2" fill="#FF4444" stroke="white" stroke-width="1"/>
          
          <!-- Direction indicator arrow -->
          <polygon points="52,30 58,35 52,40" fill="${statusColor}" stroke="white" stroke-width="1.5"/>
          
          <!-- Status indicator with animation -->
          <circle cx="35" cy="18" r="4" fill="${statusColor}" stroke="white" stroke-width="2">
            ${isMoving ? '<animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>' : ''}
          </circle>
          
          <!-- Company logo placeholder -->
          <rect x="38" y="30" width="8" height="6" fill="white" stroke="${currentStyle.accentColor}" stroke-width="1" rx="1"/>
          <text x="42" y="34" text-anchor="middle" fill="${currentStyle.accentColor}" font-size="4" font-weight="bold">LOGO</text>
          
          <!-- Direction text -->
          <text x="35" y="37" text-anchor="middle" fill="white" font-size="6" font-weight="bold" font-family="Arial">
            ${direction === 'forward' ? '→' : '←'}
          </text>
          
          <!-- Speed indicator lines -->
          ${isMoving ? `
            <line x1="55" y1="32" x2="60" y2="32" stroke="${statusColor}" stroke-width="2" opacity="0.8">
              <animate attributeName="x1" values="55;50;55" dur="0.5s" repeatCount="indefinite"/>
              <animate attributeName="x2" values="60;55;60" dur="0.5s" repeatCount="indefinite"/>
            </line>
            <line x1="55" y1="35" x2="58" y2="35" stroke="${statusColor}" stroke-width="1.5" opacity="0.6">
              <animate attributeName="x1" values="55;52;55" dur="0.7s" repeatCount="indefinite"/>
              <animate attributeName="x2" values="58;55;58" dur="0.7s" repeatCount="indefinite"/>
            </line>
            <line x1="55" y1="38" x2="60" y2="38" stroke="${statusColor}" stroke-width="2" opacity="0.8">
              <animate attributeName="x1" values="55;50;55" dur="0.5s" repeatCount="indefinite"/>
              <animate attributeName="x2" values="60;55;60" dur="0.5s" repeatCount="indefinite"/>
            </line>
          ` : ''}
        </g>
      </svg>
    `),
    scaledSize: new window.google.maps.Size(70, 70),
    anchor: new window.google.maps.Point(35, 35)
  };
};

// Create different truck types
export const createTruckByType = (bearing, direction, isMoving, truckType = 'delivery') => {
  const truckTypes = {
    delivery: { style: 'modern', size: 70 },
    cargo: { style: 'classic', size: 80 },
    luxury: { style: 'luxury', size: 75 }
  };

  const config = truckTypes[truckType] || truckTypes.delivery;
  return createEnhancedTruckIcon(bearing, direction, isMoving, config.style);
};

// Create route-specific waypoint icons
export const createWaypointIcon = (type, index, isActive = false) => {
  const colors = {
    start: { bg: '#4CAF50', text: 'white' },
    waypoint: { bg: '#FF9800', text: 'white' },
    end: { bg: '#F44336', text: 'white' },
    checkpoint: { bg: '#2196F3', text: 'white' },
    fuel: { bg: '#9C27B0', text: 'white' },
    rest: { bg: '#607D8B', text: 'white' }
  };

  const color = colors[type] || colors.waypoint;
  const size = isActive ? 40 : 30;
  
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 3}" fill="${color.bg}" stroke="white" stroke-width="3" ${isActive ? 'filter="url(#glow)"' : ''}/>
        ${isActive ? `<circle cx="${size/2}" cy="${size/2}" r="${size/2 - 6}" fill="none" stroke="white" stroke-width="2" opacity="0.7">
          <animate attributeName="r" values="${size/2 - 6};${size/2 - 3};${size/2 - 6}" dur="2s" repeatCount="indefinite"/>
        </circle>` : ''}
        <text x="${size/2}" y="${size/2 + 4}" text-anchor="middle" fill="${color.text}" font-size="${size/3}" font-weight="bold">
          ${type === 'start' ? 'S' : type === 'end' ? 'E' : index}
        </text>
      </svg>
    `),
    scaledSize: new window.google.maps.Size(size, size),
    anchor: new window.google.maps.Point(size/2, size/2)
  };
};