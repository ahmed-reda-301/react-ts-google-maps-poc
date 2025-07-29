import { FC, memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapProps, MarkerProps } from "../../types/maps";

/**
 * Default container style for the map
 * @constant
 */
const containerStyle = {
  width: "100%",
  height: "800px",
};

/**
 * Props interface for the GoogleMapComponent
 * Extends MapProps to include array of markers
 */
interface GoogleMapComponentProps extends MapProps {
  /** Optional array of markers to display on the map */
  markers?: MarkerProps[];
}

/**
 * GoogleMapComponent is a wrapper around the Google Maps JavaScript API
 * It provides a React interface for displaying maps and markers
 *
 * @component
 * @example
 * ```tsx
 * <GoogleMapComponent
 *   center={{ lat: -3.745, lng: -38.523 }}
 *   zoom={13}
 *   markers={[
 *     {
 *       id: '1',
 *       position: { lat: -3.745, lng: -38.523 },
 *       title: 'Marker 1'
 *     }
 *   ]}
 * />
 * ```
 */
const GoogleMapComponent: FC<GoogleMapComponentProps> = ({
  center,
  zoom,
  markers,
  onClick,
  style,
}) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={{ ...containerStyle, ...style }}
        center={center}
        zoom={zoom}
        onClick={onClick}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        }}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            icon={marker.icon}
            label={marker.label}
            onClick={marker.onClick}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

// Export memoized version of the component to prevent unnecessary re-renders
export default memo(GoogleMapComponent);