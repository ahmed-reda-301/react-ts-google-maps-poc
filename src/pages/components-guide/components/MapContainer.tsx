import React, { useEffect, useRef } from 'react';

interface MapContainerProps {
  children: React.ReactNode;
  selectedExample: string;
  onMapReset?: () => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ 
  children, 
  selectedExample, 
  onMapReset 
}) => {
  const previousExample = useRef<string>(selectedExample);

  useEffect(() => {
    // If example changed, trigger map reset
    if (previousExample.current !== selectedExample) {
      onMapReset?.();
      previousExample.current = selectedExample;
    }
  }, [selectedExample, onMapReset]);

  return (
    <div key={selectedExample} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default MapContainer;