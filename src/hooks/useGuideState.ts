/**
 * Guide state management hook
 * Centralized state management for guide components
 */

import { useState, useEffect, useCallback } from 'react';
import { LatLng } from '../types/common/LatLng';
import { GuideState, GuideExampleState } from '../types/guide/common';
import { GUIDE_CONFIG, RIYADH_LANDMARKS } from '../constants';

/**
 * Base guide state hook
 */
export const useGuideState = (initialExample: string = GUIDE_CONFIG.DEFAULT_EXAMPLE) => {
  const [selectedExample, setSelectedExample] = useState<string>(initialExample);
  const [mapKey, setMapKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleExampleChange = useCallback((example: string) => {
    setSelectedExample(example);
    setMapKey(prev => prev + 1);
  }, []);

  const handleMapReset = useCallback(() => {
    setMapKey(prev => prev + 1);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    selectedExample,
    mapKey,
    isLoading,
    error,
    setSelectedExample: handleExampleChange,
    setMapKey: handleMapReset,
    setIsLoading,
    setError: handleError,
    clearError,
  };
};

/**
 * Marker guide state hook
 */
export const useMarkerGuideState = () => {
  const baseState = useGuideState();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLng>({ ...RIYADH_LANDMARKS.KINGDOM_CENTRE });

  const resetMarkerState = useCallback(() => {
    setSelectedMarker(null);
    setMarkerPosition({ ...RIYADH_LANDMARKS.KINGDOM_CENTRE });
  }, []);

  useEffect(() => {
    resetMarkerState();
  }, [baseState.selectedExample, resetMarkerState]);

  const handleMarkerClick = useCallback((markerId: number) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  }, [selectedMarker]);

  const handleMarkerDrag = useCallback((position: LatLng) => {
    setMarkerPosition(position);
  }, []);

  return {
    ...baseState,
    selectedMarker,
    markerPosition,
    setSelectedMarker,
    setMarkerPosition,
    handleMarkerClick,
    handleMarkerDrag,
    resetMarkerState,
  };
};

/**
 * Polyline guide state hook
 */
export const usePolylineGuideState = () => {
  const baseState = useGuideState();
  const [interactivePath, setInteractivePath] = useState<LatLng[]>([
    { ...RIYADH_LANDMARKS.KINGDOM_CENTRE },
    { ...RIYADH_LANDMARKS.AL_FAISALIAH_TOWER }
  ]);
  const [animatedPath, setAnimatedPath] = useState<LatLng[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationIndex, setAnimationIndex] = useState<number>(0);

  const resetPolylineState = useCallback(() => {
    setInteractivePath([
      { ...RIYADH_LANDMARKS.KINGDOM_CENTRE }, 
      { ...RIYADH_LANDMARKS.AL_FAISALIAH_TOWER }
    ]);
    setAnimatedPath([]);
    setIsAnimating(false);
    setAnimationIndex(0);
  }, []);

  useEffect(() => {
    resetPolylineState();
  }, [baseState.selectedExample, resetPolylineState]);

  const addPathPoint = useCallback((point: LatLng) => {
    setInteractivePath(prev => [...prev, point]);
  }, []);

  const clearPath = useCallback(() => {
    setInteractivePath([]);
  }, []);

  const startAnimation = useCallback((fullPath: readonly LatLng[] | LatLng[]) => {
    const pathArray = Array.from(fullPath);
    setAnimatedPath([pathArray[0]]);
    setAnimationIndex(1);
    setIsAnimating(true);
  }, []);

  const resetAnimation = useCallback(() => {
    setAnimatedPath([]);
    setAnimationIndex(0);
    setIsAnimating(false);
  }, []);

  return {
    ...baseState,
    interactivePath,
    animatedPath,
    isAnimating,
    animationIndex,
    setInteractivePath,
    setAnimatedPath,
    setIsAnimating,
    setAnimationIndex,
    addPathPoint,
    clearPath,
    startAnimation,
    resetAnimation,
    resetPolylineState,
  };
};

/**
 * Polygon guide state hook
 */
export const usePolygonGuideState = () => {
  const baseState = useGuideState();
  const [interactivePolygon, setInteractivePolygon] = useState<LatLng[]>([]);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const resetPolygonState = useCallback(() => {
    setInteractivePolygon([]);
    setIsBuilding(false);
    setSelectedZone(null);
  }, []);

  useEffect(() => {
    resetPolygonState();
  }, [baseState.selectedExample, resetPolygonState]);

  const addPolygonPoint = useCallback((point: LatLng) => {
    setInteractivePolygon(prev => [...prev, point]);
  }, []);

  const startBuilding = useCallback(() => {
    setInteractivePolygon([]);
    setIsBuilding(true);
  }, []);

  const finishPolygon = useCallback(() => {
    if (interactivePolygon.length >= 3) {
      setIsBuilding(false);
    }
  }, [interactivePolygon.length]);

  const clearPolygon = useCallback(() => {
    setInteractivePolygon([]);
    setIsBuilding(false);
  }, []);

  const handleZoneClick = useCallback((zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  }, [selectedZone]);

  return {
    ...baseState,
    interactivePolygon,
    isBuilding,
    selectedZone,
    setInteractivePolygon,
    setIsBuilding,
    setSelectedZone,
    addPolygonPoint,
    startBuilding,
    finishPolygon,
    clearPolygon,
    handleZoneClick,
    resetPolygonState,
  };
};

/**
 * Circle guide state hook
 */
export const useCircleGuideState = () => {
  const baseState = useGuideState();
  const [basicRadius, setBasicRadius] = useState<number>(5000);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [interactiveCircles, setInteractiveCircles] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedRadius, setSelectedRadius] = useState<number>(2000);
  const [selectedColor, setSelectedColor] = useState<string>('#007bff');
  const [editableCircle, setEditableCircle] = useState({
    center: { ...RIYADH_LANDMARKS.KINGDOM_CENTRE },
    radius: 3000
  });
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const resetCircleState = useCallback(() => {
    setBasicRadius(5000);
    setSelectedArea(null);
    setInteractiveCircles([]);
    setIsCreating(false);
    setSelectedRadius(2000);
    setSelectedColor('#007bff');
    setEditableCircle({
      center: { ...RIYADH_LANDMARKS.KINGDOM_CENTRE },
      radius: 3000
    });
    setIsEditable(false);
  }, []);

  useEffect(() => {
    resetCircleState();
  }, [baseState.selectedExample, resetCircleState]);

  const addCircle = useCallback((center: LatLng, radius: number, color: string) => {
    const newCircle = {
      id: Date.now(),
      center,
      radius,
      color
    };
    setInteractiveCircles(prev => [...prev, newCircle]);
    setIsCreating(false);
  }, []);

  const clearCircles = useCallback(() => {
    setInteractiveCircles([]);
    setIsCreating(false);
  }, []);

  const handleAreaClick = useCallback((areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
  }, [selectedArea]);

  return {
    ...baseState,
    basicRadius,
    selectedArea,
    interactiveCircles,
    isCreating,
    selectedRadius,
    selectedColor,
    editableCircle,
    isEditable,
    setBasicRadius,
    setSelectedArea,
    setInteractiveCircles,
    setIsCreating,
    setSelectedRadius,
    setSelectedColor,
    setEditableCircle,
    setIsEditable,
    addCircle,
    clearCircles,
    handleAreaClick,
    resetCircleState,
  };
};

/**
 * Rectangle guide state hook
 */
export const useRectangleGuideState = () => {
  const baseState = useGuideState();
  const [rectangles, setRectangles] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const resetRectangleState = useCallback(() => {
    setRectangles([]);
    setIsDrawing(false);
    setStartPoint(null);
    setSelectedZone(null);
  }, []);

  useEffect(() => {
    resetRectangleState();
  }, [baseState.selectedExample, resetRectangleState]);

  const startDrawing = useCallback((point: LatLng) => {
    setStartPoint(point);
    setIsDrawing(true);
  }, []);

  const finishDrawing = useCallback((endPoint: LatLng) => {
    if (startPoint) {
      const newRectangle = {
        id: Date.now(),
        bounds: {
          north: Math.max(startPoint.lat, endPoint.lat),
          south: Math.min(startPoint.lat, endPoint.lat),
          east: Math.max(startPoint.lng, endPoint.lng),
          west: Math.min(startPoint.lng, endPoint.lng)
        }
      };
      setRectangles(prev => [...prev, newRectangle]);
      setIsDrawing(false);
      setStartPoint(null);
    }
  }, [startPoint]);

  const clearRectangles = useCallback(() => {
    setRectangles([]);
    setIsDrawing(false);
    setStartPoint(null);
  }, []);

  const handleZoneClick = useCallback((zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  }, [selectedZone]);

  return {
    ...baseState,
    rectangles,
    isDrawing,
    startPoint,
    selectedZone,
    setRectangles,
    setIsDrawing,
    setStartPoint,
    setSelectedZone,
    startDrawing,
    finishDrawing,
    clearRectangles,
    handleZoneClick,
    resetRectangleState,
  };
};

/**
 * InfoWindow guide state hook
 */
export const useInfoWindowGuideState = () => {
  const baseState = useGuideState();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [formData, setFormData] = useState({ rating: 0, comment: '' });

  const resetInfoWindowState = useCallback(() => {
    setSelectedMarker(null);
    setFormData({ rating: 0, comment: '' });
  }, []);

  useEffect(() => {
    resetInfoWindowState();
  }, [baseState.selectedExample, resetInfoWindowState]);

  const handleMarkerClick = useCallback((markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  }, [selectedMarker]);

  const updateFormData = useCallback((updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    ...baseState,
    selectedMarker,
    formData,
    setSelectedMarker,
    setFormData,
    handleMarkerClick,
    updateFormData,
    resetInfoWindowState,
  };
};