import { FC, memo, useMemo } from "react";
import { Marker } from "@react-google-maps/api";
import { CustomMarkerProps } from "../../types/maps";

/**
 * Predefined marker icons for different categories
 */
const CATEGORY_ICONS: Record<string, string> = {
  restaurant: "https://maps.google.com/mapfiles/ms/icons/restaurant.png",
  hotel: "https://maps.google.com/mapfiles/ms/icons/lodging.png",
  attraction: "https://maps.google.com/mapfiles/ms/icons/star.png",
  hospital: "https://maps.google.com/mapfiles/ms/icons/hospitals.png",
  school: "https://maps.google.com/mapfiles/ms/icons/schools.png",
  custom: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

/**
 * Predefined marker colors
 */
const MARKER_COLORS: Record<string, string> = {
  red: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  blue: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  green: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  yellow: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  purple: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  orange: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
};

/**
 * CustomMarker component with advanced styling and animation features
 * 
 * @component
 * @example
 * ```tsx
 * <CustomMarker
 *   id="marker-1"
 *   position={{ lat: 24.7136, lng: 46.6753 }}
 *   category="restaurant"
 *   color="red"
 *   animation={google.maps.Animation.BOUNCE}
 *   title="مطعم النخيل"
 *   onClick={handleMarkerClick}
 * />
 * ```
 */
const CustomMarker: FC<CustomMarkerProps> = ({
  id,
  position,
  title,
  onClick,
  customIcon,
  animation,
  scale = 1,
  color,
  category = 'custom',
  label,
}) => {
  /**
   * Determine the marker icon based on priority:
   * 1. Custom icon (if provided)
   * 2. Color-based icon (if color is provided)
   * 3. Category-based icon
   * 4. Default icon
   */
  const markerIcon = useMemo(() => {
    if (customIcon) {
      if (typeof customIcon === 'string') {
        return {
          url: customIcon,
          scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32 * scale, 32 * scale) : undefined,
        };
      }
      return customIcon;
    }

    if (color && MARKER_COLORS[color]) {
      return {
        url: MARKER_COLORS[color],
        scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32 * scale, 32 * scale) : undefined,
      };
    }

    if (category && CATEGORY_ICONS[category]) {
      return {
        url: CATEGORY_ICONS[category],
        scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32 * scale, 32 * scale) : undefined,
      };
    }

    return {
      url: CATEGORY_ICONS.custom,
      scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32 * scale, 32 * scale) : undefined,
    };
  }, [customIcon, color, category, scale]);

  return (
    <Marker
      key={id}
      position={position}
      title={title}
      icon={markerIcon}
      label={label}
      animation={animation}
      onClick={onClick}
      options={{
        optimized: true,
        zIndex: category === 'custom' ? 1 : 10,
      }}
    />
  );
};

export default memo(CustomMarker);