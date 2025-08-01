// Persistent bearing system that maintains icon orientation

// Ultra-conservative bearing calculation that preserves orientation
export const calculatePersistentBearing = (points, currentIndex, previousBearing, lookAheadDistance = 15) => {
  // Always return previous bearing if available and no significant change needed
  if (previousBearing !== null && previousBearing !== undefined) {
    
    // If we're at the end of the route, keep the last bearing
    if (currentIndex >= points.length - 1) {
      return previousBearing;
    }
    
    // Look ahead to determine if bearing change is necessary
    const endIndex = Math.min(currentIndex + lookAheadDistance, points.length - 1);
    const startPoint = points[currentIndex];
    const endPoint = points[endIndex];
    
    // Calculate what the bearing should be
    const dLng = (endPoint.lng - startPoint.lng) * Math.PI / 180;
    const lat1 = startPoint.lat * Math.PI / 180;
    const lat2 = endPoint.lat * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let targetBearing = Math.atan2(y, x) * 180 / Math.PI;
    targetBearing = (targetBearing + 360) % 360;
    
    // Calculate the difference
    let diff = targetBearing - previousBearing;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Only change bearing if the difference is significant
    const significantChangeThreshold = 8; // 8 degrees minimum for change
    if (Math.abs(diff) < significantChangeThreshold) {
      return previousBearing; // Keep the same bearing
    }
    
    // Apply very minimal change - only 5% of the difference
    const conservativeChange = diff * 0.05;
    const newBearing = previousBearing + conservativeChange;
    return (newBearing + 360) % 360;
  }
  
  // Initial bearing calculation (first time only)
  if (currentIndex >= points.length - 1) return 0;
  
  const endIndex = Math.min(currentIndex + lookAheadDistance, points.length - 1);
  const startPoint = points[currentIndex];
  const endPoint = points[endIndex];
  
  const dLng = (endPoint.lng - startPoint.lng) * Math.PI / 180;
  const lat1 = startPoint.lat * Math.PI / 180;
  const lat2 = endPoint.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};

// Persistent bearing for bidirectional movement
export const calculatePersistentBidirectionalBearing = (points, currentIndex, previousBearing, direction = 'forward') => {
  // Always preserve previous bearing if available
  if (previousBearing !== null && previousBearing !== undefined) {
    
    // If we're at the boundaries, keep the last bearing
    if ((direction === 'forward' && currentIndex >= points.length - 1) ||
        (direction === 'backward' && currentIndex <= 0)) {
      return previousBearing;
    }
    
    // Determine look-ahead based on direction
    const lookAheadDistance = 12;
    let endIndex;
    
    if (direction === 'forward') {
      endIndex = Math.min(currentIndex + lookAheadDistance, points.length - 1);
    } else {
      endIndex = Math.max(currentIndex - lookAheadDistance, 0);
    }
    
    const startPoint = points[currentIndex];
    const endPoint = points[endIndex];
    
    // Calculate target bearing
    const dLng = (endPoint.lng - startPoint.lng) * Math.PI / 180;
    const lat1 = startPoint.lat * Math.PI / 180;
    const lat2 = endPoint.lat * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let targetBearing = Math.atan2(y, x) * 180 / Math.PI;
    targetBearing = (targetBearing + 360) % 360;
    
    // Adjust for backward direction
    if (direction === 'backward') {
      targetBearing = (targetBearing + 180) % 360;
    }
    
    // Calculate difference
    let diff = targetBearing - previousBearing;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Only change for significant differences
    const significantChangeThreshold = 10; // 10 degrees for bidirectional
    if (Math.abs(diff) < significantChangeThreshold) {
      return previousBearing;
    }
    
    // Very conservative change - only 3% of the difference
    const conservativeChange = diff * 0.03;
    const newBearing = previousBearing + conservativeChange;
    return (newBearing + 360) % 360;
  }
  
  // Initial bearing calculation
  const lookAheadDistance = 12;
  let endIndex;
  
  if (direction === 'forward') {
    endIndex = Math.min(currentIndex + lookAheadDistance, points.length - 1);
  } else {
    endIndex = Math.max(currentIndex - lookAheadDistance, 0);
  }
  
  if (currentIndex === endIndex) return 0;
  
  const startPoint = points[currentIndex];
  const endPoint = points[endIndex];
  
  const dLng = (endPoint.lng - startPoint.lng) * Math.PI / 180;
  const lat1 = startPoint.lat * Math.PI / 180;
  const lat2 = endPoint.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360;
  
  // Adjust for backward direction
  if (direction === 'backward') {
    bearing = (bearing + 180) % 360;
  }
  
  return bearing;
};

// Bearing change validator - only allows changes when absolutely necessary
export const shouldUpdateBearing = (currentBearing, targetBearing, threshold = 15) => {
  let diff = Math.abs(targetBearing - currentBearing);
  if (diff > 180) diff = 360 - diff;
  
  return diff > threshold;
};

// Minimal bearing adjustment - applies the smallest possible change
export const applyMinimalBearingChange = (currentBearing, targetBearing, maxChangePerStep = 1) => {
  let diff = targetBearing - currentBearing;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  // Limit the change to maximum allowed per step
  if (Math.abs(diff) > maxChangePerStep) {
    diff = diff > 0 ? maxChangePerStep : -maxChangePerStep;
  }
  
  const newBearing = currentBearing + diff;
  return (newBearing + 360) % 360;
};

// Bearing freeze system - completely stops bearing changes for small movements
export const calculateFrozenBearing = (points, currentIndex, previousBearing, freezeThreshold = 5) => {
  if (previousBearing === null || previousBearing === undefined) {
    return calculatePersistentBearing(points, currentIndex, previousBearing);
  }
  
  // Calculate what the bearing should be
  const targetBearing = calculatePersistentBearing(points, currentIndex, null);
  
  // Calculate difference
  let diff = Math.abs(targetBearing - previousBearing);
  if (diff > 180) diff = 360 - diff;
  
  // If change is below threshold, completely freeze the bearing
  if (diff < freezeThreshold) {
    return previousBearing; // No change at all
  }
  
  // Otherwise apply minimal change
  return applyMinimalBearingChange(previousBearing, targetBearing, 0.5);
};