import { FC, memo } from "react";
import { InfoWindow as GoogleInfoWindow } from "@react-google-maps/api";
import { InfoWindowProps, InfoWindowAction } from "../../types/maps";

/**
 * InfoWindow action button component
 */
const ActionButton: FC<{ action: InfoWindowAction }> = ({ action }) => {
  const getButtonStyle = (type: string = 'secondary') => {
    const baseStyle = {
      padding: '8px 16px',
      margin: '4px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    };

    const typeStyles = {
      primary: {
        backgroundColor: '#1976d2',
        color: 'white',
      },
      secondary: {
        backgroundColor: '#f5f5f5',
        color: '#333',
        border: '1px solid #ddd',
      },
      danger: {
        backgroundColor: '#d32f2f',
        color: 'white',
      },
    };

    return { ...baseStyle, ...typeStyles[type as keyof typeof typeStyles] };
  };

  return (
    <button
      style={getButtonStyle(action.type)}
      onClick={action.onClick}
      onMouseOver={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.opacity = '0.8';
      }}
      onMouseOut={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.opacity = '1';
      }}
    >
      {action.label}
    </button>
  );
};

/**
 * InfoWindow template components
 */
const DefaultTemplate: FC<{ title: string; description: string; image?: string; actions?: InfoWindowAction[] }> = ({
  title,
  description,
  image,
  actions,
}) => (
  <div style={{ maxWidth: '300px', padding: '8px' }}>
    {image && (
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
    )}
    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
      {title}
    </h3>
    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.4' }}>
      {description}
    </p>
    {actions && actions.length > 0 && (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {actions.map((action, index) => (
          <ActionButton key={index} action={action} />
        ))}
      </div>
    )}
  </div>
);

const DetailedTemplate: FC<{ title: string; description: string; image?: string; actions?: InfoWindowAction[] }> = ({
  title,
  description,
  image,
  actions,
}) => (
  <div style={{ maxWidth: '350px', padding: '12px' }}>
    {image && (
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            right: '8px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          <h3 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
            {title}
          </h3>
        </div>
      </div>
    )}
    {!image && (
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 'bold' }}>
        {title}
      </h3>
    )}
    <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.5' }}>
      {description}
    </p>
    {actions && actions.length > 0 && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {actions.map((action, index) => (
          <ActionButton key={index} action={action} />
        ))}
      </div>
    )}
  </div>
);

const MinimalTemplate: FC<{ title: string; description: string }> = ({ title, description }) => (
  <div style={{ maxWidth: '200px', padding: '4px' }}>
    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>
      {title}
    </h4>
    <p style={{ margin: '0', fontSize: '12px', lineHeight: '1.3' }}>
      {description}
    </p>
  </div>
);

/**
 * InfoWindow component with multiple templates and interactive content
 * 
 * @component
 * @example
 * ```tsx
 * <InfoWindow
 *   position={{ lat: 24.7136, lng: 46.6753 }}
 *   visible={showInfo}
 *   onClose={() => setShowInfo(false)}
 *   template="detailed"
 *   content={
 *     <DetailedTemplate
 *       title="مطعم النخيل"
 *       description="مطعم تقليدي يقدم أشهى الأطباق السعودية"
 *       image="/images/restaurant.jpg"
 *       actions={[
 *         { label: 'عرض القائمة', onClick: showMenu, type: 'primary' },
 *         { label: 'الاتجاهات', onClick: getDirections, type: 'secondary' }
 *       ]}
 *     />
 *   }
 * />
 * ```
 */
const InfoWindow: FC<InfoWindowProps> = ({
  position,
  content,
  visible,
  onClose,
  options,
  template = 'default',
}) => {
  if (!visible) return null;

  return (
    <GoogleInfoWindow
      position={position}
      onCloseClick={onClose}
      options={{
        pixelOffset: new google.maps.Size(0, -30),
        ...options,
      }}
    >
      <div>{content}</div>
    </GoogleInfoWindow>
  );
};

// Export templates for external use
export { DefaultTemplate, DetailedTemplate, MinimalTemplate };
export default memo(InfoWindow);