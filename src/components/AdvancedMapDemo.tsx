import React, { FC, useState, useCallback, useRef, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import CustomMarker from './maps/CustomMarker';
import InfoWindow, { DefaultTemplate, DetailedTemplate } from './maps/InfoWindow';
import Polyline, { RoutePolyline } from './maps/Polyline';
import Polygon, { AreaPolygon } from './maps/Polygon';
import SearchBox from './maps/SearchBox';
import { useGeolocation, useGeofence } from '../hooks/useGeolocation';
import { useDirections } from '../services/DirectionsService';
import {
  CustomMarkerProps,
  MarkerWithInfoProps,
  RoutePolylineProps,
  AreaPolygonProps,
  LatLng,
} from '../types/maps';

/**
 * Container style for the map
 */
const containerStyle = {
  width: '100%',
  height: '600px',
};

/**
 * Demo data for Saudi Arabia locations
 */
const RIYADH_CENTER: LatLng = { lat: 24.7136, lng: 46.6753 };
const JEDDAH_CENTER: LatLng = { lat: 21.4858, lng: 39.1925 };
const DAMMAM_CENTER: LatLng = { lat: 26.4207, lng: 50.0888 };

/**
 * Sample markers with different categories and info windows
 */
const sampleMarkers: MarkerWithInfoProps[] = [
  {
    id: 'riyadh-restaurant',
    position: RIYADH_CENTER,
    category: 'restaurant',
    color: 'red',
    title: 'مطعم النخيل - الرياض',
    animation: window.google?.maps?.Animation?.BOUNCE,
    infoWindow: {
      title: 'مطعم النخيل',
      description: 'مطعم تقليدي يقدم أشهى الأطباق السعودية في قلب الرياض',
      image: 'https://via.placeholder.com/300x150/4285F4/FFFFFF?text=مطعم+النخيل',
      actions: [
        { label: 'عرض القائمة', onClick: () => alert('عرض القائمة'), type: 'primary' },
        { label: 'الاتجاهات', onClick: () => alert('الحصول على الاتجاهات'), type: 'secondary' },
      ],
    },
  },
  {
    id: 'jeddah-hotel',
    position: JEDDAH_CENTER,
    category: 'hotel',
    color: 'blue',
    title: 'فندق البحر الأحمر - جدة',
    infoWindow: {
      title: 'فندق البحر الأحمر',
      description: 'فندق فاخر على ساحل البحر الأحمر مع إطلالة خلابة',
      image: 'https://via.placeholder.com/300x150/34A853/FFFFFF?text=فندق+البحر+الأحمر',
      actions: [
        { label: 'حجز الآن', onClick: () => alert('حجز الفندق'), type: 'primary' },
        { label: 'عرض الصور', onClick: () => alert('عرض الصور'), type: 'secondary' },
      ],
    },
  },
  {
    id: 'dammam-hospital',
    position: DAMMAM_CENTER,
    category: 'hospital',
    color: 'green',
    title: 'مستشفى الخليج - الدمام',
    infoWindow: {
      title: 'مستشفى الخليج',
      description: 'مستشفى متخصص يقدم أفضل الخدمات الطبية في المنطقة الشرقية',
      actions: [
        { label: 'حجز موعد', onClick: () => alert('حجز موعد'), type: 'primary' },
        { label: 'الأقسام', onClick: () => alert('عرض الأقسام'), type: 'secondary' },
      ],
    },
  },
];

/**
 * Sample route data
 */
const sampleRoute: RoutePolylineProps = {
  path: [
    RIYADH_CENTER,
    { lat: 24.8000, lng: 46.7500 },
    { lat: 24.9000, lng: 46.8000 },
    JEDDAH_CENTER,
  ],
  routeType: 'driving',
  showDistance: true,
  metadata: {
    distance: '950 كم',
    duration: '9 ساعات 30 دقيقة',
    traffic: 'moderate',
  },
  animation: {
    enabled: false,
    speed: 2,
    direction: 'forward',
  },
};

/**
 * Sample polygon areas
 */
const sampleAreas: AreaPolygonProps[] = [
  {
    paths: [
      { lat: 24.6500, lng: 46.6000 },
      { lat: 24.7500, lng: 46.6000 },
      { lat: 24.7500, lng: 46.7500 },
      { lat: 24.6500, lng: 46.7500 },
    ],
    category: 'zone',
    areaInfo: {
      name: 'منطقة الملز',
      type: 'سكنية',
      area: 2500000,
      perimeter: 6000,
    },
    showAreaInfo: true,
    editable: false,
  },
  {
    paths: [
      { lat: 21.4000, lng: 39.1000 },
      { lat: 21.5500, lng: 39.1000 },
      { lat: 21.5500, lng: 39.2500 },
      { lat: 21.4000, lng: 39.2500 },
    ],
    category: 'boundary',
    areaInfo: {
      name: 'منطقة جدة التاريخية',
      type: 'تراثية',
      area: 1800000,
      perimeter: 5200,
    },
    showAreaInfo: true,
    editable: false,
  },
];

/**
 * Advanced Google Maps Demo Component
 */
const AdvancedMapDemo: FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showAreas, setShowAreas] = useState(false);
  const [showGeofence, setShowGeofence] = useState(false);
  const [animateRoute, setAnimateRoute] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLng>(RIYADH_CENTER);
  const [zoom, setZoom] = useState(6);

  const mapRef = useRef<google.maps.Map | null>(null);

  // Geolocation hook
  const {
    position,
    loading: locationLoading,
    error: locationError,
    getCurrentLocation,
    watchPosition,
    clearWatch,
  } = useGeolocation({
    enableTracking: false,
    onLocationFound: (pos) => {
      console.log('موقعك الحالي:', pos);
      setMapCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setZoom(15);
    },
    onLocationError: (err) => {
      console.error('خطأ في تحديد الموقع:', err);
    },
  });

  // Geofence for Riyadh area
  const { isInside: isInRiyadh } = useGeofence(
    RIYADH_CENTER,
    50000, // 50km radius
    () => console.log('دخلت منطقة الرياض'),
    () => console.log('خرجت من منطقة الرياض')
  );

  // Directions service
  const { calculateRoute, createRenderer, displayRoute, clearRoute } = useDirections();

  /**
   * Handle marker click
   */
  const handleMarkerClick = useCallback((markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  }, [selectedMarker]);

  /**
   * Handle search places
   */
  const handlePlacesChanged = useCallback((places: google.maps.places.PlaceResult[]) => {
    if (places.length > 0 && places[0].geometry?.location) {
      const location = places[0].geometry.location;
      setMapCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
      setZoom(15);
    }
  }, []);

  /**
   * Calculate and display route
   */
  const handleCalculateRoute = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      const result = await calculateRoute({
        origin: RIYADH_CENTER,
        destination: JEDDAH_CENTER,
        travelMode: window.google?.maps?.TravelMode?.DRIVING || 'DRIVING' as any,
        onRouteCalculated: (result) => {
          console.log('تم حساب المسار:', result);
          const renderer = createRenderer(mapRef.current!);
          displayRoute(result, renderer);
        },
        onError: (error) => {
          console.error('خطأ في حساب المسار:', error);
        },
      });
    } catch (error) {
      console.error('فشل في حساب المسار:', error);
    }
  }, [calculateRoute, createRenderer, displayRoute]);

  /**
   * Toggle route animation
   */
  const toggleRouteAnimation = useCallback(() => {
    setAnimateRoute(!animateRoute);
  }, [animateRoute]);

  /**
   * Control panel styles
   */
  const controlPanelStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    minWidth: '250px',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '5px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#1976d2',
    color: 'white',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
        libraries={['places']}
      >
        {/* Search Box */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
          <SearchBox onPlacesChanged={handlePlacesChanged} />
        </div>

        {/* Control Panel */}
        <div style={controlPanelStyle}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>لوحة التحكم</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <button
              style={primaryButtonStyle}
              onClick={getCurrentLocation}
              disabled={locationLoading}
            >
              {locationLoading ? 'جاري التحديد...' : 'موقعي الحالي'}
            </button>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <button
              style={showRoute ? primaryButtonStyle : secondaryButtonStyle}
              onClick={() => setShowRoute(!showRoute)}
            >
              {showRoute ? 'إخفاء المسار' : 'عرض المسار'}
            </button>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <button
              style={showAreas ? primaryButtonStyle : secondaryButtonStyle}
              onClick={() => setShowAreas(!showAreas)}
            >
              {showAreas ? 'إخفاء المناطق' : 'عرض المناطق'}
            </button>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <button
              style={secondaryButtonStyle}
              onClick={handleCalculateRoute}
            >
              حساب مسار ديناميكي
            </button>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <button
              style={animateRoute ? primaryButtonStyle : secondaryButtonStyle}
              onClick={toggleRouteAnimation}
            >
              {animateRoute ? 'إيقاف الحركة' : 'تحريك المسار'}
            </button>
          </div>

          {position && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              <div>خط العرض: {position.coords.latitude.toFixed(6)}</div>
              <div>خط الطول: {position.coords.longitude.toFixed(6)}</div>
              <div>الدقة: {position.coords.accuracy.toFixed(0)} متر</div>
              {isInRiyadh && (
                <div style={{ color: '#4285F4', fontWeight: 'bold' }}>
                  📍 داخل منطقة الرياض
                </div>
              )}
            </div>
          )}

          {locationError && (
            <div style={{ fontSize: '12px', color: '#d32f2f', marginTop: '10px' }}>
              خطأ: {locationError.message}
            </div>
          )}
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={zoom}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          options={{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
          }}
        >
          {/* Custom Markers */}
          {sampleMarkers.map((marker) => (
            <CustomMarker
              key={marker.id}
              {...marker}
              onClick={() => handleMarkerClick(marker.id)}
            />
          ))}

          {/* Info Windows */}
          {sampleMarkers.map((marker) => (
            selectedMarker === marker.id && marker.infoWindow && (
              <InfoWindow
                key={`info-${marker.id}`}
                position={marker.position}
                visible={true}
                onClose={() => setSelectedMarker(null)}
                content={
                  <DetailedTemplate
                    title={marker.infoWindow.title}
                    description={marker.infoWindow.description}
                    image={marker.infoWindow.image}
                    actions={marker.infoWindow.actions}
                  />
                }
              />
            )
          ))}

          {/* Current Location Marker */}
          {position && (
            <CustomMarker
              id="current-location"
              position={{
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }}
              color="blue"
              title="موقعك الحالي"
              animation={window.google?.maps?.Animation?.BOUNCE}
            />
          )}

          {/* Route Polyline */}
          {showRoute && (
            <RoutePolyline
              {...sampleRoute}
              animation={{
                ...sampleRoute.animation!,
                enabled: animateRoute,
              }}
            />
          )}

          {/* Area Polygons */}
          {showAreas && sampleAreas.map((area, index) => (
            <AreaPolygon
              key={`area-${index}`}
              {...area}
              onClick={(e) => {
                console.log('تم النقر على المنطقة:', area.areaInfo?.name);
              }}
            />
          ))}

          {/* Geofence Circle (visual representation) */}
          {showGeofence && (
            <div>
              {/* This would be implemented as a Circle component */}
            </div>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default AdvancedMapDemo;