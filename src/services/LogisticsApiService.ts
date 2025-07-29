import { 
  Trip, 
  Vehicle, 
  Driver, 
  EntryPoint, 
  Checkpoint, 
  Cargo,
  TripStatus,
  VehicleType,
  EntryPointType,
  TripFilters,
  SystemStats
} from '../types/logistics/TripTypes';
import { LatLng } from '../types/common/LatLng';

// Import JSON data
import entryPointsData from '../data/entryPoints.json';
import checkpointsData from '../data/checkpoints.json';
import driversData from '../data/drivers.json';
import vehiclesData from '../data/vehicles.json';
import tripsData from '../data/trips.json';

/**
 * Logistics API Service
 * Simulates real API calls with mock data from JSON files
 */
export class LogisticsApiService {
  private static instance: LogisticsApiService;
  
  // Mock data loaded from JSON files
  private mockTrips: Trip[] = [];
  private mockEntryPoints: EntryPoint[] = [];
  private mockCheckpoints: Checkpoint[] = [];
  private mockVehicles: Vehicle[] = [];
  private mockDrivers: Driver[] = [];

  private constructor() {
    this.initializeMockData();
  }

  public static getInstance(): LogisticsApiService {
    if (!LogisticsApiService.instance) {
      LogisticsApiService.instance = new LogisticsApiService();
    }
    return LogisticsApiService.instance;
  }

  /**
   * Initialize mock data from JSON files
   */
  private initializeMockData(): void {
    // Load entry points
    this.mockEntryPoints = entryPointsData.map(point => ({
      ...point,
      type: point.type as EntryPointType
    }));

    // Load checkpoints
    this.mockCheckpoints = checkpointsData;

    // Load drivers
    this.mockDrivers = driversData;

    // Load vehicles with proper type casting
    this.mockVehicles = vehiclesData.map(vehicle => ({
      ...vehicle,
      type: vehicle.type as VehicleType,
      sensorData: {
        ...vehicle.sensorData,
        doorStatus: vehicle.sensorData.doorStatus as 'OPEN' | 'CLOSED',
        engineStatus: vehicle.sensorData.engineStatus as 'ON' | 'OFF'
      }
    }));

    // Load and process trips
    this.mockTrips = tripsData.map(trip => {
      const driver = this.mockDrivers.find(d => d.id === trip.driverId);
      const vehicle = this.mockVehicles.find(v => v.id === trip.vehicleId);
      const origin = this.mockEntryPoints.find(p => p.id === trip.originId);
      const destination = this.mockEntryPoints.find(p => p.id === trip.destinationId);
      const checkpoints = this.mockCheckpoints.filter(c => trip.checkpointIds.includes(c.id));

      if (!driver || !vehicle || !origin || !destination) {
        throw new Error(`Missing required data for trip ${trip.id}`);
      }

      return {
        ...trip,
        status: trip.status as TripStatus,
        driver,
        vehicle,
        cargo: trip.cargo as Cargo,
        origin,
        destination,
        checkpoints,
        plannedStartTime: new Date(trip.plannedStartTime),
        actualStartTime: trip.actualStartTime ? new Date(trip.actualStartTime) : undefined,
        plannedEndTime: new Date(trip.plannedEndTime),
        estimatedArrival: new Date(trip.estimatedArrival),
        lastUpdate: new Date(trip.lastUpdate),
        alerts: []
      } as Trip;
    });
  }

  /**
   * Get all trips with optional filtering
   */
  async getTrips(filters?: TripFilters): Promise<Trip[]> {
    // Simulate network delay
    await this.delay(500);
    
    let filteredTrips = [...this.mockTrips];
    
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filteredTrips = filteredTrips.filter(trip => filters.status!.includes(trip.status));
      }
      
      if (filters.vehicleType && filters.vehicleType.length > 0) {
        filteredTrips = filteredTrips.filter(trip => filters.vehicleType!.includes(trip.vehicle.type));
      }
      
      if (filters.plateNumber) {
        filteredTrips = filteredTrips.filter(trip => 
          trip.vehicle.plateNumber.includes(filters.plateNumber!)
        );
      }
      
      if (filters.driverName) {
        filteredTrips = filteredTrips.filter(trip => 
          trip.driver.name.includes(filters.driverName!)
        );
      }
    }
    
    return filteredTrips;
  }

  /**
   * Get trip by ID
   */
  async getTripById(id: string): Promise<Trip | null> {
    await this.delay(300);
    return this.mockTrips.find(trip => trip.id === id) || null;
  }

  /**
   * Get entry points with optional type filtering
   */
  async getEntryPoints(type?: EntryPointType): Promise<EntryPoint[]> {
    await this.delay(400);
    
    if (type) {
      return this.mockEntryPoints.filter(point => point.type === type);
    }
    
    return [...this.mockEntryPoints];
  }

  /**
   * Get all checkpoints
   */
  async getCheckpoints(): Promise<Checkpoint[]> {
    await this.delay(300);
    return [...this.mockCheckpoints];
  }

  /**
   * Get all vehicles
   */
  async getVehicles(): Promise<Vehicle[]> {
    await this.delay(400);
    return [...this.mockVehicles];
  }

  /**
   * Get all drivers
   */
  async getDrivers(): Promise<Driver[]> {
    await this.delay(300);
    return [...this.mockDrivers];
  }

  /**
   * Get system statistics
   */
  async getSystemStats(): Promise<SystemStats> {
    await this.delay(600);
    
    const totalTrips = this.mockTrips.length;
    const activeTrips = this.mockTrips.filter(t => t.status === TripStatus.IN_PROGRESS).length;
    const completedTrips = this.mockTrips.filter(t => t.status === TripStatus.COMPLETED).length;
    const delayedTrips = this.mockTrips.filter(t => t.status === TripStatus.DELAYED).length;
    
    return {
      totalTrips,
      activeTrips,
      completedTrips,
      delayedTrips,
      totalVehicles: this.mockVehicles.length,
      activeVehicles: this.mockVehicles.filter(v => v.sensorData.engineStatus === 'ON').length,
      totalAlerts: 0,
      criticalAlerts: 0,
      averageDeliveryTime: 6.5,
      onTimeDeliveryRate: 92.5
    };
  }

  /**
   * Update vehicle location (simulation)
   */
  async updateVehicleLocation(vehicleId: string, location: LatLng): Promise<void> {
    await this.delay(200);
    
    const vehicle = this.mockVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      vehicle.currentLocation = location;
      vehicle.sensorData.fuelLevel = Math.max(0, vehicle.sensorData.fuelLevel - 0.1);
    }
    
    // Update related trips
    const trip = this.mockTrips.find(t => t.vehicle.id === vehicleId);
    if (trip) {
      trip.currentLocation = location;
      trip.actualRoute.push(location);
      trip.lastUpdate = new Date();
    }
  }

  /**
   * Create a new trip
   */
  async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    await this.delay(500);
    
    const newTrip: Trip = {
      id: `trip_${Date.now()}`,
      name: tripData.name || 'New Trip',
      status: tripData.status || TripStatus.PLANNED,
      driver: tripData.driver!,
      vehicle: tripData.vehicle!,
      cargo: tripData.cargo!,
      origin: tripData.origin!,
      destination: tripData.destination!,
      plannedRoute: tripData.plannedRoute || [],
      actualRoute: [],
      checkpoints: tripData.checkpoints || [],
      plannedStartTime: tripData.plannedStartTime || new Date(),
      plannedEndTime: tripData.plannedEndTime || new Date(),
      estimatedArrival: tripData.estimatedArrival || new Date(),
      maxSpeed: tripData.maxSpeed || 80,
      requiredDocuments: tripData.requiredDocuments || [],
      specialInstructions: tripData.specialInstructions || [],
      currentLocation: tripData.currentLocation || tripData.origin!.location,
      isOnRoute: true,
      speedCompliance: true,
      lockCompliance: true,
      lastUpdate: new Date(),
      distanceTraveled: 0,
      remainingDistance: tripData.remainingDistance || 0,
      averageSpeed: 0,
      fuelConsumption: 0,
      alerts: []
    };
    
    this.mockTrips.push(newTrip);
    return newTrip;
  }

  /**
   * Update trip status
   */
  async updateTripStatus(tripId: string, status: TripStatus): Promise<Trip | null> {
    await this.delay(300);
    
    const trip = this.mockTrips.find(t => t.id === tripId);
    if (trip) {
      trip.status = status;
      trip.lastUpdate = new Date();
      return trip;
    }
    
    return null;
  }

  /**
   * Search trips by various criteria
   */
  async searchTrips(query: string): Promise<Trip[]> {
    await this.delay(400);
    
    const lowercaseQuery = query.toLowerCase();
    return this.mockTrips.filter(trip => 
      trip.name.toLowerCase().includes(lowercaseQuery) ||
      trip.driver.name.toLowerCase().includes(lowercaseQuery) ||
      trip.vehicle.plateNumber.toLowerCase().includes(lowercaseQuery) ||
      trip.cargo.type.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Get trips by status
   */
  async getTripsByStatus(status: TripStatus): Promise<Trip[]> {
    await this.delay(300);
    return this.mockTrips.filter(trip => trip.status === status);
  }

  /**
   * Get trips by vehicle type
   */
  async getTripsByVehicleType(vehicleType: VehicleType): Promise<Trip[]> {
    await this.delay(300);
    return this.mockTrips.filter(trip => trip.vehicle.type === vehicleType);
  }

  /**
   * Get trips by entry point
   */
  async getTripsByEntryPoint(entryPointId: string): Promise<Trip[]> {
    await this.delay(300);
    return this.mockTrips.filter(trip => 
      trip.origin.id === entryPointId || trip.destination.id === entryPointId
    );
  }

  /**
   * Simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const logisticsApi = LogisticsApiService.getInstance();