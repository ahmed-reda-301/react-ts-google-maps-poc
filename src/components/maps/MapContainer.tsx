/**
 * Reusable map container component
 * Provides consistent map styling and LoadScript wrapper
 */

import React, { FC, ReactNode } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { styles } from '../../styles/pageStyles';
import { LatLng } from '../../types/common/LatLng';

interface MapContainerProps {
  /** Map center coordinates */
  center: LatLng;
  /** Map zoom level */
  zoom: number;
  /** Map height variant */
  height?: 'small' | 'medium' | 'large' | 'full';
  /** Custom map container style */
  mapStyle?: React.CSSProperties;
  /** Custom wrapper style */
  wrapperStyle?: React.CSSProperties;
  /** Map click handler */
  onClick?: (event: google.maps.MapMouseEvent) => void;
  /** Map options */
  options?: google.maps.MapOptions;
  /** Map children (markers, polylines, etc.) */
  children?: ReactNode;
  /** Whether to show border and shadow */
  styled?: boolean;
  /** Loading component */
  loadingComponent?: ReactNode;
  /** Error component */
  errorComponent?: ReactNode;
}

/**
 * Default map options
 */
const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  disableDefaultUI: false,
};

/**
 * Get map container style based on height variant
 */
const getMapContainerStyle = (height: string): React.CSSProperties => {
  switch (height) {
    case 'small':
      return styles.map.containerSmall;
    case 'large':
      return styles.map.containerLarge;
    case 'full':
      return styles.map.containerFullHeight;
    default:
      return styles.map.container;
  }
};

/**
 * MapContainer component provides a consistent map wrapper with LoadScript
 */
const MapContainer: FC<MapContainerProps> = ({
  center,
  zoom,
  height = 'medium',
  mapStyle,
  wrapperStyle,
  onClick,
  options,
  children,
  styled = true,
  loadingComponent,
  errorComponent,
}) => {
  const containerStyle = {
    ...getMapContainerStyle(height),
    ...mapStyle,
  };

  const wrapperStyles = {
    ...(styled ? styles.map.wrapper : {}),
    ...wrapperStyle,
  };

  const mapOptions = {
    ...defaultMapOptions,
    ...options,
  };

  // Default loading component
  const defaultLoading = (
    <div style={{
      ...containerStyle,
      ...styles.utils.flexCenter,
      backgroundColor: '#f5f5f5',
      color: '#666',
      fontSize: '16px',
    }}>
      Loading map...
    </div>
  );

  // Default error component
  const defaultError = (
    <div style={{
      ...containerStyle,
      ...styles.utils.flexCenter,
      backgroundColor: '#fee',
      color: '#c33',
      fontSize: '16px',
      border: '1px solid #fcc',
    }}>
      Failed to load map. Please check your API key.
    </div>
  );

  return (
    <div style={wrapperStyles}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
        loadingElement={loadingComponent || defaultLoading}
        onError={() => console.error('Failed to load Google Maps')}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onClick={onClick}
          options={mapOptions}
        >
          {children}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;