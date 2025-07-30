/**
 * Location and coordinate constants
 * Centralized location for all geographic coordinates and location data
 */

import { LatLng } from '../types/common/LatLng';

/**
 * Saudi Arabia locations
 */
export const SAUDI_ARABIA_LOCATIONS = {
  // Main center
  center: { lat: 24.7136, lng: 46.6753 } as LatLng, // Riyadh

  // Major cities
  riyadh: { lat: 24.7136, lng: 46.6753 } as LatLng,
  jeddah: { lat: 21.3891, lng: 39.8579 } as LatLng,
  mecca: { lat: 21.3891, lng: 39.8579 } as LatLng,
  medina: { lat: 24.4539, lng: 39.6775 } as LatLng,
  dammam: { lat: 26.4207, lng: 50.0888 } as LatLng,
  khobar: { lat: 26.2172, lng: 50.1971 } as LatLng,
  dhahran: { lat: 26.2361, lng: 50.1564 } as LatLng,
  taif: { lat: 21.2703, lng: 40.4158 } as LatLng,
  abha: { lat: 18.2164, lng: 42.5053 } as LatLng,
  tabuk: { lat: 28.3998, lng: 36.5700 } as LatLng,
  hail: { lat: 27.5114, lng: 41.7208 } as LatLng,
  buraidah: { lat: 26.3260, lng: 43.9750 } as LatLng,
  najran: { lat: 17.4924, lng: 44.1277 } as LatLng,
  jizan: { lat: 16.8892, lng: 42.5511 } as LatLng,
  yanbu: { lat: 24.0889, lng: 38.0617 } as LatLng,
} as const;

/**
 * Egypt locations (for demo purposes)
 */
export const EGYPT_LOCATIONS = {
  cairo: { lat: 30.0444, lng: 31.2357 } as LatLng,
  alexandria: { lat: 31.2001, lng: 29.9187 } as LatLng,
  luxor: { lat: 25.6872, lng: 32.6396 } as LatLng,
  aswan: { lat: 24.0889, lng: 32.8998 } as LatLng,
  giza: { lat: 30.0131, lng: 31.2089 } as LatLng,
  sharmElSheikh: { lat: 27.9158, lng: 34.3300 } as LatLng,
  hurghada: { lat: 27.2574, lng: 33.8129 } as LatLng,
} as const;

/**
 * Default map centers for different regions
 */
export const DEFAULT_MAP_CENTERS = {
  saudiArabia: SAUDI_ARABIA_LOCATIONS.center,
  egypt: EGYPT_LOCATIONS.cairo,
  middleEast: { lat: 25.0000, lng: 45.0000 } as LatLng,
  world: { lat: 0, lng: 0 } as LatLng,
} as const;

/**
 * Predefined routes for demonstrations
 */
export const DEMO_ROUTES = {
  egypt: [
    {
      name: 'Cairo to Alexandria',
      origin: 'Cairo, Egypt',
      destination: 'Alexandria, Egypt',
      coordinates: {
        start: EGYPT_LOCATIONS.cairo,
        end: EGYPT_LOCATIONS.alexandria,
      },
    },
    {
      name: 'Cairo to Luxor',
      origin: 'Cairo, Egypt',
      destination: 'Luxor, Egypt',
      coordinates: {
        start: EGYPT_LOCATIONS.cairo,
        end: EGYPT_LOCATIONS.luxor,
      },
    },
    {
      name: 'Cairo Airport to Downtown',
      origin: 'Cairo International Airport',
      destination: 'Tahrir Square, Cairo',
      coordinates: {
        start: { lat: 30.1219, lng: 31.4056 } as LatLng, // Cairo Airport
        end: { lat: 30.0444, lng: 31.2357 } as LatLng, // Tahrir Square
      },
    },
    {
      name: 'Pyramids to Khan El Khalili',
      origin: 'Great Pyramid of Giza',
      destination: 'Khan El Khalili, Cairo',
      coordinates: {
        start: EGYPT_LOCATIONS.giza,
        end: { lat: 30.0472, lng: 31.2620 } as LatLng, // Khan El Khalili
      },
    },
  ],
  saudiArabia: [
    {
      name: 'Riyadh to Jeddah',
      origin: 'Riyadh, Saudi Arabia',
      destination: 'Jeddah, Saudi Arabia',
      coordinates: {
        start: SAUDI_ARABIA_LOCATIONS.riyadh,
        end: SAUDI_ARABIA_LOCATIONS.jeddah,
      },
    },
    {
      name: 'Riyadh to Dammam',
      origin: 'Riyadh, Saudi Arabia',
      destination: 'Dammam, Saudi Arabia',
      coordinates: {
        start: SAUDI_ARABIA_LOCATIONS.riyadh,
        end: SAUDI_ARABIA_LOCATIONS.dammam,
      },
    },
    {
      name: 'Jeddah to Mecca',
      origin: 'Jeddah, Saudi Arabia',
      destination: 'Mecca, Saudi Arabia',
      coordinates: {
        start: SAUDI_ARABIA_LOCATIONS.jeddah,
        end: SAUDI_ARABIA_LOCATIONS.mecca,
      },
    },
  ],
} as const;