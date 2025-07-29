import { DirectionsProps, DirectionsResult, RouteStep } from '../types/maps';

/**
 * Directions service class for handling route calculations and navigation
 */
export class DirectionsService {
  private directionsService: google.maps.DirectionsService | null = null;
  private directionsRenderer: google.maps.DirectionsRenderer | null = null;

  constructor() {
    // Don't initialize here - wait for Google Maps to load
  }

  private ensureDirectionsService(): google.maps.DirectionsService {
    if (!this.directionsService) {
      if (!window.google?.maps?.DirectionsService) {
        throw new Error('Google Maps API not loaded');
      }
      this.directionsService = new google.maps.DirectionsService();
    }
    return this.directionsService;
  }

  /**
   * Calculate route between origin and destination
   */
  async calculateRoute(props: DirectionsProps): Promise<DirectionsResult> {
    const {
      origin,
      destination,
      waypoints = [],
      travelMode = google.maps.TravelMode.DRIVING,
      options = {},
    } = props;

    return new Promise((resolve, reject) => {
      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        waypoints,
        travelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
        ...options,
      };

      const directionsService = this.ensureDirectionsService();
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const directionsResult = this.parseDirectionsResult(result);
          resolve(directionsResult);
          props.onRouteCalculated?.(result);
        } else {
          const error = status || google.maps.DirectionsStatus.UNKNOWN_ERROR;
          reject(error);
          props.onError?.(error);
        }
      });
    });
  }

  /**
   * Parse Google Maps DirectionsResult into our custom format
   */
  private parseDirectionsResult(result: google.maps.DirectionsResult): DirectionsResult {
    const route = result.routes[0];
    const leg = route.legs[0];

    const steps: RouteStep[] = leg.steps.map(step => ({
      instruction: step.instructions.replace(/<[^>]*>/g, ''), // Remove HTML tags
      distance: step.distance?.text || '',
      duration: step.duration?.text || '',
      maneuver: step.maneuver || '',
    }));

    return {
      routes: result.routes,
      selectedRouteIndex: 0,
      totalDistance: leg.distance?.text || '',
      totalDuration: leg.duration?.text || '',
      steps,
    };
  }

  /**
   * Get alternative routes
   */
  async getAlternativeRoutes(props: DirectionsProps): Promise<DirectionsResult[]> {
    const alternativeProps = {
      ...props,
      options: {
        ...props.options,
        provideRouteAlternatives: true,
      },
    };

    try {
      const result = await this.calculateRoute(alternativeProps);
      return result.routes.map((route, index) => ({
        ...result,
        selectedRouteIndex: index,
        totalDistance: route.legs[0].distance?.text || '',
        totalDuration: route.legs[0].duration?.text || '',
        steps: route.legs[0].steps.map(step => ({
          instruction: step.instructions.replace(/<[^>]*>/g, ''),
          distance: step.distance?.text || '',
          duration: step.duration?.text || '',
          maneuver: step.maneuver || '',
        })),
      }));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create directions renderer for displaying route on map
   */
  createRenderer(map: google.maps.Map, options?: google.maps.DirectionsRendererOptions): google.maps.DirectionsRenderer {
    const defaultOptions: google.maps.DirectionsRendererOptions = {
      suppressMarkers: false,
      suppressInfoWindows: false,
      draggable: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeWeight: 6,
        strokeOpacity: 0.8,
      },
      ...options,
    };

    this.directionsRenderer = new google.maps.DirectionsRenderer(defaultOptions);
    this.directionsRenderer.setMap(map);
    return this.directionsRenderer;
  }

  /**
   * Display route on map using renderer
   */
  displayRoute(result: google.maps.DirectionsResult, renderer?: google.maps.DirectionsRenderer): void {
    const rendererToUse = renderer || this.directionsRenderer;
    if (rendererToUse) {
      rendererToUse.setDirections(result);
    }
  }

  /**
   * Clear displayed route
   */
  clearRoute(renderer?: google.maps.DirectionsRenderer): void {
    const rendererToUse = renderer || this.directionsRenderer;
    if (rendererToUse) {
      rendererToUse.setDirections({ routes: [] } as any);
    }
  }

  /**
   * Calculate distance matrix between multiple origins and destinations
   */
  async calculateDistanceMatrix(
    origins: (google.maps.LatLng | google.maps.LatLngLiteral | string)[],
    destinations: (google.maps.LatLng | google.maps.LatLngLiteral | string)[],
    travelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
  ): Promise<google.maps.DistanceMatrixResponse> {
    return new Promise((resolve, reject) => {
      const service = new google.maps.DistanceMatrixService();
      
      service.getDistanceMatrix({
        origins,
        destinations,
        travelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      }, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          resolve(response);
        } else {
          reject(status);
        }
      });
    });
  }

  /**
   * Get travel time with traffic (requires premium plan)
   */
  async getTravelTimeWithTraffic(
    origin: google.maps.LatLng | google.maps.LatLngLiteral | string,
    destination: google.maps.LatLng | google.maps.LatLngLiteral | string,
    departureTime?: Date
  ): Promise<{ duration: string; durationInTraffic: string }> {
    try {
      const result = await this.calculateRoute({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        options: {
          drivingOptions: {
            departureTime: departureTime || new Date(),
            trafficModel: google.maps.TrafficModel.BEST_GUESS,
          },
        },
      });

      const leg = result.routes[0].legs[0];
      return {
        duration: leg.duration?.text || '',
        durationInTraffic: leg.duration_in_traffic?.text || leg.duration?.text || '',
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Optimize waypoints for shortest route
   */
  async optimizeWaypoints(props: DirectionsProps): Promise<DirectionsResult> {
    const optimizedProps = {
      ...props,
      options: {
        ...props.options,
        optimizeWaypoints: true,
      },
    };

    return this.calculateRoute(optimizedProps);
  }

  /**
   * Get step-by-step navigation instructions
   */
  getNavigationInstructions(result: DirectionsResult): RouteStep[] {
    return result.steps.map((step, index) => ({
      ...step,
      instruction: this.translateInstruction(step.instruction),
    }));
  }

  /**
   * Translate navigation instructions to Arabic (basic translation)
   */
  private translateInstruction(instruction: string): string {
    const translations: Record<string, string> = {
      'Head': 'اتجه',
      'Turn left': 'انعطف يساراً',
      'Turn right': 'انعطف يميناً',
      'Continue': 'استمر',
      'Merge': 'اندمج',
      'Take the exit': 'خذ المخرج',
      'Roundabout': 'الدوار',
      'Destination': 'الوجهة',
      'north': 'شمالاً',
      'south': 'جنوباً',
      'east': 'شرقاً',
      'west': 'غرباً',
    };

    let translatedInstruction = instruction;
    Object.entries(translations).forEach(([english, arabic]) => {
      translatedInstruction = translatedInstruction.replace(
        new RegExp(english, 'gi'),
        arabic
      );
    });

    return translatedInstruction;
  }
}

/**
 * Hook for using directions service
 */
export const useDirections = () => {
  const directionsService = new DirectionsService();

  return {
    calculateRoute: directionsService.calculateRoute.bind(directionsService),
    getAlternativeRoutes: directionsService.getAlternativeRoutes.bind(directionsService),
    createRenderer: directionsService.createRenderer.bind(directionsService),
    displayRoute: directionsService.displayRoute.bind(directionsService),
    clearRoute: directionsService.clearRoute.bind(directionsService),
    calculateDistanceMatrix: directionsService.calculateDistanceMatrix.bind(directionsService),
    getTravelTimeWithTraffic: directionsService.getTravelTimeWithTraffic.bind(directionsService),
    optimizeWaypoints: directionsService.optimizeWaypoints.bind(directionsService),
    getNavigationInstructions: directionsService.getNavigationInstructions.bind(directionsService),
  };
};

export default DirectionsService;