// Ultra-smooth bearing calculation system for stable truck orientation

// Ultra-smooth bearing calculation with advanced stabilization
export const calculateUltraSmoothBearing = (start, end, previousBearing, smoothingFactor = 0.12) => {
  const dLng = (end.lng - start.lng) * Math.PI / 180;
  const lat1 = start.lat * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let rawBearing = Math.atan2(y, x) * 180 / Math.PI;
  rawBearing = (rawBearing + 360) % 360;
  
  // If no previous bearing, return the raw bearing
  if (previousBearing === null || previousBearing === undefined) {
    return rawBearing;
  }
  
  // Calculate the shortest angular distance
  let diff = rawBearing - previousBearing;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  // Apply exponential smoothing for ultra-smooth transitions
  const smoothedBearing = previousBearing + (diff * smoothingFactor);
  return (smoothedBearing + 360) % 360;
};

// Calculate bearing with minimal changes for stable orientation
export const calculateStableBearing = (points, currentIndex, previousBearing, lookAheadDistance = 8) => {
  if (currentIndex >= points.length - 1) return previousBearing || 0;
  
  // Look ahead multiple points for more stable bearing calculation
  const endIndex = Math.min(currentIndex + lookAheadDistance, points.length - 1);
  const startPoint = points[currentIndex];
  const endPoint = points[endIndex];
  
  // Calculate bearing over longer distance for stability
  const dLng = (endPoint.lng - startPoint.lng) * Math.PI / 180;
  const lat1 = startPoint.lat * Math.PI / 180;
  const lat2 = endPoint.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;
  
  // Apply ultra-smooth transition
  if (previousBearing !== null && previousBearing !== undefined) {
    let diff = bearing - previousBearing;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Very conservative smoothing for maximum stability
    const smoothingFactor = 0.06; // Very low for ultra-stable movement
    bearing = previousBearing + (diff * smoothingFactor);
    bearing = (bearing + 360) % 360;
  }
  
  return bearing;
};

// Advanced bearing stabilizer with direction change detection
export const calculateStabilizedBearing = (points, currentIndex, previousBearing, direction = 'forward') => {
  if (currentIndex >= points.length - 1) return previousBearing || 0;
  
  // Adaptive look-ahead based on direction
  const lookAheadDistance = direction === 'forward' ? 10 : 8;
  const endIndex = Math.min(currentIndex + lookAheadDistance, points.length - 1);
  const startPoint = points[currentIndex];
  const endPoint = points[endIndex];
  
  // Calculate raw bearing
  const dLng = (endPoint.lng - startPoint.lng) * Math.PI / 180;
  const lat1 = startPoint.lat * Math.PI / 180;
  const lat2 = endPoint.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;
  
  // Adjust for direction
  if (direction === 'backward') {
    bearing = (bearing + 180) % 360;
  }
  
  // Ultra-smooth transition
  if (previousBearing !== null && previousBearing !== undefined) {
    let diff = bearing - previousBearing;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Detect major direction changes
    const isDirectionChange = Math.abs(diff) > 90;
    const smoothingFactor = isDirectionChange ? 0.15 : 0.04; // Faster for direction changes
    
    bearing = previousBearing + (diff * smoothingFactor);
    bearing = (bearing + 360) % 360;
  }
  
  return bearing;
};

// Bearing change detector for smooth transitions
export const detectBearingChange = (currentBearing, previousBearing, threshold = 5) => {
  if (previousBearing === null || previousBearing === undefined) return false;
  
  let diff = Math.abs(currentBearing - previousBearing);
  if (diff > 180) diff = 360 - diff;
  
  return diff > threshold;
};

// Smooth bearing interpolator
export const interpolateBearing = (startBearing, endBearing, progress) => {
  let diff = endBearing - startBearing;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  const interpolated = startBearing + (diff * progress);
  return (interpolated + 360) % 360;
};