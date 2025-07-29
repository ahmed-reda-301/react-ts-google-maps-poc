import { LatLng } from '../common/LatLng';

/**
 * أنواع المركبات المختلفة
 */
export enum VehicleType {
  TRUCK = 'TRUCK',
  CONTAINER_TRUCK = 'CONTAINER_TRUCK',
  TANKER = 'TANKER',
  REFRIGERATED = 'REFRIGERATED',
  FLATBED = 'FLATBED',
  HEAVY_EQUIPMENT = 'HEAVY_EQUIPMENT'
}

/**
 * حالة الرحلة
 */
export enum TripStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED',
  EMERGENCY = 'EMERGENCY'
}

/**
 * نوع نقطة الدخول/الخروج
 */
export enum EntryPointType {
  AIRPORT = 'AIRPORT',
  SEAPORT = 'SEAPORT',
  LAND_BORDER = 'LAND_BORDER',
  CHECKPOINT = 'CHECKPOINT'
}

/**
 * معلومات السائق
 */
export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  nationalId: string;
  experience: number; // بالسنوات
  rating: number; // من 1 إلى 5
}

/**
 * معلومات المركبة
 */
export interface Vehicle {
  id: string;
  plateNumber: string;
  type: VehicleType;
  model: string;
  year: number;
  capacity: number; // بالطن
  fuelType: string;
  currentLocation: LatLng;
  speed: number; // كم/ساعة
  heading: number; // الاتجاه بالدرجات
  isLocked: boolean;
  sensorData: {
    temperature?: number;
    humidity?: number;
    doorStatus: 'OPEN' | 'CLOSED';
    engineStatus: 'ON' | 'OFF';
    fuelLevel: number; // نسبة مئوية
  };
}

/**
 * نقطة دخول أو خروج
 */
export interface EntryPoint {
  id: string;
  name: string;
  nameAr: string;
  type: EntryPointType;
  location: LatLng;
  isActive: boolean;
  operatingHours: {
    open: string;
    close: string;
  };
  capacity: number;
  currentLoad: number;
}

/**
 * نقطة تفتيش
 */
export interface Checkpoint {
  id: string;
  name: string;
  nameAr: string;
  location: LatLng;
  isActive: boolean;
  averageWaitTime: number; // بالدقائق
  maxSpeed: number; // كم/ساعة
  requiredDocuments: string[];
}

/**
 * معلومات الشحنة
 */
export interface Cargo {
  id: string;
  type: string;
  weight: number; // بالطن
  value: number; // بالريال السعودي
  description: string;
  isHazardous: boolean;
  temperatureControlled: boolean;
  requiredTemperature?: {
    min: number;
    max: number;
  };
}

/**
 * الرحلة
 */
export interface Trip {
  id: string;
  name: string;
  status: TripStatus;
  driver: Driver;
  vehicle: Vehicle;
  cargo: Cargo;
  
  // المسار
  origin: EntryPoint;
  destination: EntryPoint;
  plannedRoute: LatLng[];
  actualRoute: LatLng[];
  checkpoints: Checkpoint[];
  
  // التوقيتات
  plannedStartTime: Date;
  actualStartTime?: Date;
  plannedEndTime: Date;
  estimatedArrival: Date;
  
  // القيود والمتطلبات
  maxSpeed: number; // كم/ساعة
  requiredDocuments: string[];
  specialInstructions: string[];
  
  // المراقبة
  currentLocation: LatLng;
  isOnRoute: boolean;
  speedCompliance: boolean;
  lockCompliance: boolean;
  lastUpdate: Date;
  
  // الإحصائيات
  distanceTraveled: number; // كم
  remainingDistance: number; // كم
  averageSpeed: number; // كم/ساعة
  fuelConsumption: number; // لتر
  
  // التنبيهات
  alerts: TripAlert[];
}

/**
 * تنبيهات الرحلة
 */
export interface TripAlert {
  id: string;
  tripId: string;
  type: 'SPEED_VIOLATION' | 'ROUTE_DEVIATION' | 'LOCK_VIOLATION' | 'DELAY' | 'EMERGENCY' | 'MAINTENANCE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  messageAr: string;
  timestamp: Date;
  location: LatLng;
  isResolved: boolean;
}

/**
 * فلاتر البحث
 */
export interface TripFilters {
  status?: TripStatus[];
  vehicleType?: VehicleType[];
  entryPointType?: EntryPointType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  driverName?: string;
  plateNumber?: string;
  cargoType?: string;
  hasAlerts?: boolean;
}

/**
 * إحصائيات النظام
 */
export interface SystemStats {
  totalTrips: number;
  activeTrips: number;
  completedTrips: number;
  delayedTrips: number;
  totalVehicles: number;
  activeVehicles: number;
  totalAlerts: number;
  criticalAlerts: number;
  averageDeliveryTime: number; // بالساعات
  onTimeDeliveryRate: number; // نسبة مئوية
}