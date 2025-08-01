// Professional truck icon with enhanced design and smooth orientation

export const createProfessionalTruckIcon = (bearing, direction = 'forward', isMoving = false, truckType = 'modern') => {
  const truckStyles = {
    modern: {
      primaryColor: direction === 'forward' ? '#1976D2' : '#F57C00',
      secondaryColor: direction === 'forward' ? '#0D47A1' : '#E65100',
      accentColor: direction === 'forward' ? '#BBDEFB' : '#FFE0B2',
      detailColor: '#FFFFFF'
    },
    cargo: {
      primaryColor: direction === 'forward' ? '#388E3C' : '#D32F2F',
      secondaryColor: direction === 'forward' ? '#2E7D32' : '#C62828',
      accentColor: direction === 'forward' ? '#C8E6C9' : '#FFCDD2',
      detailColor: '#FFFFFF'
    },
    delivery: {
      primaryColor: direction === 'forward' ? '#7B1FA2' : '#FF5722',
      secondaryColor: direction === 'forward' ? '#6A1B9A' : '#E64A19',
      accentColor: direction === 'forward' ? '#E1BEE7' : '#FFCCBC',
      detailColor: '#FFFFFF'
    }
  };

  const style = truckStyles[truckType] || truckStyles.modern;
  const statusColor = isMoving ? '#4CAF50' : '#757575';
  const size = 90;
  
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Enhanced shadow and glow effects -->
          <filter id="professionalShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
            <feOffset dx="4" dy="4" result="offset"/>
            <feFlood flood-color="rgba(0,0,0,0.3)"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <!-- Advanced gradients -->
          <linearGradient id="truckBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${style.primaryColor};stop-opacity:1" />
            <stop offset="25%" style="stop-color:${style.accentColor};stop-opacity:0.8" />
            <stop offset="75%" style="stop-color:${style.primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${style.secondaryColor};stop-opacity:1" />
          </linearGradient>
          
          <linearGradient id="cabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${style.secondaryColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${style.primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${style.secondaryColor};stop-opacity:1" />
          </linearGradient>
          
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#999999;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#666666;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#333333;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#111111;stop-opacity:1" />
          </radialGradient>
          
          <linearGradient id="windshieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E3F2FD;stop-opacity:0.9" />
            <stop offset="50%" style="stop-color:#BBDEFB;stop-opacity:0.7" />
            <stop offset="100%" style="stop-color:#90CAF9;stop-opacity:0.5" />
          </linearGradient>
          
          <radialGradient id="headlightGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#FFFFCC;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFFF99;stop-opacity:1" />
          </radialGradient>
        </defs>
        
        <!-- Ground shadow -->
        <ellipse cx="${size/2}" cy="${size-5}" rx="35" ry="8" fill="rgba(0,0,0,0.2)" opacity="0.6"/>
        
        <g transform="rotate(${bearing} ${size/2} ${size/2})" filter="url(#professionalShadow)">
          
          <!-- Main truck body with enhanced design -->
          <rect x="18" y="28" width="54" height="34" fill="url(#truckBodyGradient)" stroke="${style.detailColor}" stroke-width="2.5" rx="8"/>
          
          <!-- Truck cab with professional styling -->
          <rect x="18" y="32" width="32" height="26" fill="url(#cabGradient)" stroke="${style.detailColor}" stroke-width="2" rx="6"/>
          
          <!-- Enhanced windshield -->
          <rect x="20" y="34" width="28" height="14" fill="url(#windshieldGradient)" stroke="${style.detailColor}" stroke-width="1.5" rx="4"/>
          
          <!-- Windshield details and reflections -->
          <rect x="22" y="36" width="12" height="6" fill="#F5F5F5" opacity="0.8" rx="2"/>
          <rect x="34" y="36" width="12" height="6" fill="#F5F5F5" opacity="0.6" rx="2"/>
          
          <!-- Dashboard -->
          <rect x="22" y="44" width="24" height="3" fill="${style.secondaryColor}" opacity="0.7" rx="1"/>
          
          <!-- Windshield wipers -->
          <path d="M 26 40 Q 30 42 34 40" stroke="${style.secondaryColor}" stroke-width="1.5" fill="none" opacity="0.8"/>
          <path d="M 40 40 Q 36 42 32 40" stroke="${style.secondaryColor}" stroke-width="1.5" fill="none" opacity="0.8"/>
          
          <!-- Cargo/trailer section with details -->
          <rect x="52" y="30" width="18" height="30" fill="${style.primaryColor}" stroke="${style.detailColor}" stroke-width="2" rx="6"/>
          
          <!-- Cargo door with realistic details -->
          <rect x="54" y="32" width="14" height="26" fill="none" stroke="${style.detailColor}" stroke-width="1.5" rx="3"/>
          <line x1="61" y1="34" x2="61" y2="56" stroke="${style.detailColor}" stroke-width="1"/>
          
          <!-- Door handles -->
          <circle cx="58" cy="44" r="2" fill="${style.detailColor}" opacity="0.9"/>
          <circle cx="64" cy="44" r="2" fill="${style.detailColor}" opacity="0.9"/>
          
          <!-- Cargo door locks -->
          <rect x="56" y="56" width="3" height="2" fill="${style.secondaryColor}" rx="1"/>
          <rect x="63" y="56" width="3" height="2" fill="${style.secondaryColor}" rx="1"/>
          
          <!-- Front grille with detailed design -->
          <rect x="14" y="36" width="4" height="20" fill="#2C2C2C" rx="2"/>
          <rect x="15" y="37" width="2" height="18" fill="#404040" rx="1"/>
          
          <!-- Grille pattern -->
          <line x1="15.5" y1="38" x2="15.5" y2="54" stroke="#666666" stroke-width="0.8"/>
          <line x1="16.5" y1="38" x2="16.5" y2="54" stroke="#666666" stroke-width="0.8"/>
          
          <!-- Side mirrors with realistic design -->
          <ellipse cx="16" cy="34" rx="3" ry="2" fill="#2C2C2C"/>
          <ellipse cx="16" cy="34" rx="2" ry="1.5" fill="#87CEEB" opacity="0.8"/>
          <ellipse cx="16" cy="58" rx="3" ry="2" fill="#2C2C2C"/>
          <ellipse cx="16" cy="58" rx="2" ry="1.5" fill="#87CEEB" opacity="0.8"/>
          
          <!-- Enhanced wheels with professional rims -->
          <circle cx="28" cy="64" r="8" fill="url(#wheelGradient)" stroke="${style.detailColor}" stroke-width="2.5"/>
          <circle cx="28" cy="64" r="6" fill="#444444"/>
          <circle cx="28" cy="64" r="4" fill="#666666"/>
          <circle cx="28" cy="64" r="2" fill="#888888"/>
          
          <!-- Wheel rim design -->
          <g stroke="#AAAAAA" stroke-width="1" fill="none">
            <line x1="28" y1="56" x2="28" y2="72"/>
            <line x1="20" y1="64" x2="36" y2="64"/>
            <line x1="22.3" y1="58.3" x2="33.7" y2="69.7"/>
            <line x1="33.7" y1="58.3" x2="22.3" y2="69.7"/>
          </g>
          
          <circle cx="56" cy="64" r="8" fill="url(#wheelGradient)" stroke="${style.detailColor}" stroke-width="2.5"/>
          <circle cx="56" cy="64" r="6" fill="#444444"/>
          <circle cx="56" cy="64" r="4" fill="#666666"/>
          <circle cx="56" cy="64" r="2" fill="#888888"/>
          
          <!-- Wheel rim design -->
          <g stroke="#AAAAAA" stroke-width="1" fill="none">
            <line x1="56" y1="56" x2="56" y2="72"/>
            <line x1="48" y1="64" x2="64" y2="64"/>
            <line x1="50.3" y1="58.3" x2="61.7" y2="69.7"/>
            <line x1="61.7" y1="58.3" x2="50.3" y2="69.7"/>
          </g>
          
          <!-- Professional headlights -->
          <ellipse cx="18" cy="38" rx="3.5" ry="3" fill="url(#headlightGradient)" stroke="${style.detailColor}" stroke-width="2"/>
          <ellipse cx="18" cy="38" rx="2.5" ry="2" fill="#FFFFCC"/>
          <ellipse cx="18" cy="38" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.9"/>
          
          <ellipse cx="18" cy="54" rx="3.5" ry="3" fill="url(#headlightGradient)" stroke="${style.detailColor}" stroke-width="2"/>
          <ellipse cx="18" cy="54" rx="2.5" ry="2" fill="#FFFFCC"/>
          <ellipse cx="18" cy="54" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.9"/>
          
          <!-- Taillights with enhanced design -->
          <ellipse cx="70" cy="38" rx="3" ry="2.5" fill="#FF3333" stroke="${style.detailColor}" stroke-width="1.5"/>
          <ellipse cx="70" cy="38" rx="2" ry="1.5" fill="#FF6666"/>
          <ellipse cx="70" cy="54" rx="3" ry="2.5" fill="#FF3333" stroke="${style.detailColor}" stroke-width="1.5"/>
          <ellipse cx="70" cy="54" rx="2" ry="1.5" fill="#FF6666"/>
          
          <!-- Turn signals -->
          <ellipse cx="70" cy="44" rx="2.5" ry="2" fill="#FFA500" stroke="${style.detailColor}" stroke-width="1"/>
          <ellipse cx="70" cy="48" rx="2.5" ry="2" fill="#FFA500" stroke="${style.detailColor}" stroke-width="1"/>
          
          <!-- Company branding area -->
          <rect x="54" y="36" width="12" height="10" fill="${style.detailColor}" stroke="${style.secondaryColor}" stroke-width="2" rx="3"/>
          <text x="60" y="42" text-anchor="middle" fill="${style.secondaryColor}" font-size="6" font-weight="bold" font-family="Arial">SAUDI</text>
          <text x="60" y="47" text-anchor="middle" fill="${style.secondaryColor}" font-size="4" font-weight="normal" font-family="Arial">LOGISTICS</text>
          
          <!-- Direction indicator with enhanced design -->
          <polygon points="74,40 82,45 74,50" fill="${statusColor}" stroke="${style.detailColor}" stroke-width="2" filter="url(#glow)"/>
          
          <!-- Status indicator with professional animation -->
          <circle cx="45" cy="22" r="5" fill="${statusColor}" stroke="${style.detailColor}" stroke-width="2.5" filter="url(#glow)">
            ${isMoving ? `
              <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite"/>
            ` : ''}
          </circle>
          
          <!-- GPS antenna with signal indicator -->
          <rect x="43" y="20" width="4" height="2" fill="#2C2C2C" rx="1"/>
          <line x1="45" y1="20" x2="45" y2="16" stroke="#2C2C2C" stroke-width="1.5"/>
          <circle cx="45" cy="16" r="1.5" fill="${statusColor}">
            ${isMoving ? `
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
            ` : ''}
          </circle>
          
          <!-- Signal waves when moving -->
          ${isMoving ? `
            <g opacity="0.6">
              <circle cx="45" cy="16" r="3" fill="none" stroke="${statusColor}" stroke-width="1">
                <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="45" cy="16" r="5" fill="none" stroke="${statusColor}" stroke-width="1">
                <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
              </circle>
            </g>
          ` : ''}
          
          <!-- Direction text with professional styling -->
          <text x="45" y="48" text-anchor="middle" fill="${style.detailColor}" font-size="10" font-weight="bold" font-family="Arial" stroke="${style.secondaryColor}" stroke-width="0.8">
            ${direction === 'forward' ? '▶' : '◀'}
          </text>
          
          <!-- Speed indicator lines (enhanced animation when moving) -->
          ${isMoving ? `
            <g opacity="0.9">
              <line x1="78" y1="40" x2="85" y2="40" stroke="${statusColor}" stroke-width="2.5">
                <animate attributeName="x1" values="78;72;78" dur="0.3s" repeatCount="indefinite"/>
                <animate attributeName="x2" values="85;79;85" dur="0.3s" repeatCount="indefinite"/>
              </line>
              <line x1="78" y1="45" x2="83" y2="45" stroke="${statusColor}" stroke-width="2" opacity="0.8">
                <animate attributeName="x1" values="78;74;78" dur="0.5s" repeatCount="indefinite"/>
                <animate attributeName="x2" values="83;79;83" dur="0.5s" repeatCount="indefinite"/>
              </line>
              <line x1="78" y1="50" x2="85" y2="50" stroke="${statusColor}" stroke-width="2.5">
                <animate attributeName="x1" values="78;72;78" dur="0.3s" repeatCount="indefinite"/>
                <animate attributeName="x2" values="85;79;85" dur="0.3s" repeatCount="indefinite"/>
              </line>
            </g>
          ` : ''}
          
          <!-- Exhaust pipe with smoke animation -->
          <rect x="68" y="60" width="3" height="8" fill="#2C2C2C" rx="1.5"/>
          ${isMoving ? `
            <g opacity="0.6">
              <circle cx="69.5" cy="60" r="2" fill="#DDDDDD">
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="60;55;60" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="69.5" cy="60" r="1.5" fill="#CCCCCC">
                <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.2s" repeatCount="indefinite"/>
                <animate attributeName="r" values="1.5;4;1.5" dur="2.2s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="60;52;60" dur="2.2s" repeatCount="indefinite"/>
              </circle>
            </g>
          ` : ''}
          
          <!-- License plate with Saudi design -->
          <rect x="54" y="62" width="14" height="5" fill="${style.detailColor}" stroke="${style.secondaryColor}" stroke-width="1.5" rx="2"/>
          <text x="61" y="65.5" text-anchor="middle" fill="${style.secondaryColor}" font-size="4" font-weight="bold">KSA 2024</text>
          
          <!-- Side reflectors -->
          <rect x="50" y="40" width="2" height="4" fill="#FFFF00" opacity="0.8" rx="1"/>
          <rect x="50" y="48" width="2" height="4" fill="#FFFF00" opacity="0.8" rx="1"/>
          
        </g>
      </svg>
    `),
    scaledSize: new window.google.maps.Size(size, size),
    anchor: new window.google.maps.Point(size/2, size/2)
  };
};