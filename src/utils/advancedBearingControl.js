// Advanced bearing control system with ultra-smooth transitions

// Bearing state manager to prevent sudden rotations
class BearingStateManager {
  constructor() {
    this.currentBearing = null;
    this.targetBearing = null;
    this.isTransitioning = false;
    this.transitionSpeed = 2; // degrees per step
    this.stabilityThreshold = 5; // minimum change to trigger transition
  }

  // Set target bearing with smooth transition
  setTargetBearing(newBearing) {
    if (this.currentBearing === null) {
      this.currentBearing = newBearing;
      this.targetBearing = newBearing;
      return newBearing;
    }

    // Calculate shortest path to target
    let diff = this.calculateShortestDifference(this.currentBearing, newBearing);
    
    // Only update if change is significant
    if (Math.abs(diff) < this.stabilityThreshold) {
      return this.currentBearing; // Keep current bearing
    }

    this.targetBearing = newBearing;
    this.isTransitioning = true;
    return this.currentBearing;
  }

  // Get next bearing in smooth transition
  getNextBearing() {
    if (!this.isTransitioning || this.targetBearing === null) {
      return this.currentBearing;
    }

    let diff = this.calculateShortestDifference(this.currentBearing, this.targetBearing);
    
    // If we're close enough, snap to target
    if (Math.abs(diff) <= this.transitionSpeed) {
      this.currentBearing = this.targetBearing;
      this.isTransitioning = false;
      return this.currentBearing;
    }

    // Move towards target by transition speed
    if (diff > 0) {
      this.currentBearing += this.transitionSpeed;
    } else {
      this.currentBearing -= this.transitionSpeed;
    }

    // Normalize bearing
    this.currentBearing = (this.currentBearing + 360) % 360;
    return this.currentBearing;
  }

  // Calculate shortest angular difference
  calculateShortestDifference(from, to) {
    let diff = to - from;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return diff;
  }

  // Reset bearing state
  reset() {
    this.currentBearing = null;
    this.targetBearing = null;
    this.isTransitioning = false;
  }

  // Check if currently transitioning
  isCurrentlyTransitioning() {
    return this.isTransitioning;
  }
}

// Global bearing managers for different trucks
const truckBearingManager = new BearingStateManager();
const bidirectionalBearingManager = new BearingStateManager();

// Calculate stable bearing with advanced look-ahead
export const calculateAdvancedBearing = (points, currentIndex, managerId = 'truck') => {
  const manager = managerId === 'truck' ? truckBearingManager : bidirectionalBearingManager;
  
  if (currentIndex >= points.length - 1) {
    return manager.currentBearing || 0;
  }

  // Use multiple look-ahead points for stability
  const lookAheadPoints = [5, 10, 15, 20]; // Multiple distances
  let bearings = [];

  for (let lookAhead of lookAheadPoints) {
    const endIndex = Math.min(currentIndex + lookAhead, points.length - 1);
    if (endIndex > currentIndex) {
      const bearing = calculateRawBearing(points[currentIndex], points[endIndex]);
      bearings.push(bearing);
    }
  }

  if (bearings.length === 0) {
    return manager.currentBearing || 0;
  }

  // Calculate weighted average of bearings
  const avgBearing = calculateAverageBearing(bearings);
  
  // Set target and get smooth transition
  manager.setTargetBearing(avgBearing);
  return manager.getNextBearing();
};

// Calculate bidirectional bearing with direction awareness
export const calculateAdvancedBidirectionalBearing = (points, currentIndex, direction = 'forward') => {
  const manager = bidirectionalBearingManager;
  
  if ((direction === 'forward' && currentIndex >= points.length - 1) ||
      (direction === 'backward' && currentIndex <= 0)) {
    return manager.currentBearing || 0;
  }

  // Calculate bearing based on direction
  let targetIndex;
  const lookAhead = 15;
  
  if (direction === 'forward') {
    targetIndex = Math.min(currentIndex + lookAhead, points.length - 1);
  } else {
    targetIndex = Math.max(currentIndex - lookAhead, 0);
  }

  if (targetIndex === currentIndex) {
    return manager.currentBearing || 0;
  }

  let bearing = calculateRawBearing(points[currentIndex], points[targetIndex]);
  
  // Adjust for backward direction
  if (direction === 'backward') {
    bearing = (bearing + 180) % 360;
  }

  // Set target and get smooth transition
  manager.setTargetBearing(bearing);
  return manager.getNextBearing();
};

// Calculate raw bearing between two points
function calculateRawBearing(start, end) {
  const dLng = (end.lng - start.lng) * Math.PI / 180;
  const lat1 = start.lat * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

// Calculate average of multiple bearings (handling circular nature)
function calculateAverageBearing(bearings) {
  if (bearings.length === 0) return 0;
  if (bearings.length === 1) return bearings[0];

  // Convert to unit vectors and average
  let x = 0, y = 0;
  for (let bearing of bearings) {
    const rad = bearing * Math.PI / 180;
    x += Math.cos(rad);
    y += Math.sin(rad);
  }
  
  x /= bearings.length;
  y /= bearings.length;
  
  let avgBearing = Math.atan2(y, x) * 180 / Math.PI;
  return (avgBearing + 360) % 360;
}

// Reset bearing managers
export const resetBearingManagers = () => {
  truckBearingManager.reset();
  bidirectionalBearingManager.reset();
};

// Get bearing manager status
export const getBearingManagerStatus = (managerId = 'truck') => {
  const manager = managerId === 'truck' ? truckBearingManager : bidirectionalBearingManager;
  return {
    currentBearing: manager.currentBearing,
    targetBearing: manager.targetBearing,
    isTransitioning: manager.isTransitioning
  };
};