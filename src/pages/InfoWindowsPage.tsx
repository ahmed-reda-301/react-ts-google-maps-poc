import React, { useState } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { PageLayout, PageSection, ControlsPanel } from '../components/layout';
import { MapContainer } from '../components/maps';
import { styles } from '../styles/pageStyles';
import { LatLng } from '../types/common/LatLng';
import { 
  EGYPT_LOCATIONS, 
  PAGE_CONTENT, 
  UI_LABELS, 
  CODE_EXAMPLES,
  MARKER_ICONS 
} from '../constants';
import CustomMarker from '../components/maps/CustomMarker';

interface MarkerData {
  id: string;
  position: LatLng;
  title: string;
  description: string;
  image?: string;
  rating?: number;
  category: string;
}

/**
 * Info Windows Page - Demonstrates info window implementations with rich content
 */
const InfoWindowsPage: React.FC = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [markers] = useState<MarkerData[]>([
    {
      id: '1',
      position: EGYPT_LOCATIONS.cairo,
      title: 'Khan El Khalili Bazaar',
      description: 'Historic bazaar and souq in the Islamic district of Cairo. A major tourist attraction known for its shops, cafes, and traditional crafts.',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop',
      rating: 4.2,
      category: 'Shopping'
    },
    {
      id: '2',
      position: { lat: 30.0626, lng: 31.2497 },
      title: 'Cairo Citadel',
      description: 'Medieval Islamic fortification located on Mokattam hill near the center of Cairo. Built by Saladin in the 12th century.',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop',
      rating: 4.5,
      category: 'Historical Site'
    },
    {
      id: '3',
      position: EGYPT_LOCATIONS.giza,
      title: 'Egyptian Museum',
      description: 'Home to an extensive collection of ancient Egyptian antiquities. Houses the world\'s largest collection of pharaonic artifacts.',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop',
      rating: 4.3,
      category: 'Museum'
    }
  ]);

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarkerId(selectedMarkerId === markerId ? null : markerId);
  };

  const closeInfoWindow = () => {
    setSelectedMarkerId(null);
  };

  const selectedMarker = markers.find(marker => marker.id === selectedMarkerId);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#ffd700' }}>★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#ffd700' }}>☆</span>);
    }
    return stars;
  };

  return (
    <PageLayout
      title={PAGE_CONTENT.infoWindows.title}
      subtitle={PAGE_CONTENT.infoWindows.subtitle}
    >
      {/* Controls Section */}
      <PageSection>
        <div style={styles.cards.twoColumn}>
          <Card title="Interactive Features" padding="lg">
            <ul style={styles.lists.basic}>
              <li>Click markers to open info windows</li>
              <li>Rich content with images and ratings</li>
              <li>Click again to close info windows</li>
              <li>Only one info window open at a time</li>
            </ul>
          </Card>

          <Card title="Current Status" padding="lg">
            <div style={styles.forms.container}>
              <p><strong>Total Markers:</strong> {markers.length}</p>
              <p><strong>Selected Marker:</strong> {selectedMarker ? selectedMarker.title : 'None'}</p>
              {selectedMarkerId && (
                <Button onClick={closeInfoWindow} variant="secondary">
                  Close Info Window
                </Button>
              )}
            </div>
          </Card>
        </div>

        <InfoBox variant="info">
          <strong>Interactive Map:</strong> Click on any marker to view detailed information in an info window.
        </InfoBox>
      </PageSection>

      {/* Map Section */}
      <PageSection title="🗺️ Interactive Map with Info Windows">
        <MapContainer
          center={EGYPT_LOCATIONS.cairo}
          zoom={13}
          height="medium"
        >
          {markers.map((marker) => (
            <React.Fragment key={marker.id}>
              <CustomMarker
                id={marker.id}
                position={marker.position}
                title={marker.title}
                onClick={() => handleMarkerClick(marker.id)}
                icon={MARKER_ICONS.default}
              />
              {selectedMarkerId === marker.id && (
                <InfoWindow
                  position={marker.position}
                  onCloseClick={closeInfoWindow}
                >
                  <div style={{ maxWidth: '300px', padding: '10px' }}>
                    {marker.image && (
                      <img
                        src={marker.image}
                        alt={marker.title}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '10px'
                        }}
                      />
                    )}
                    <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{marker.title}</h3>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ 
                        backgroundColor: '#e3f2fd', 
                        color: '#1976d2', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {marker.category}
                      </span>
                    </div>
                    {marker.rating && (
                      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{renderStars(marker.rating)}</span>
                        <span style={{ fontSize: '14px', color: '#666' }}>({marker.rating})</span>
                      </div>
                    )}
                    <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.4', color: '#555' }}>
                      {marker.description}
                    </p>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                      <button
                        style={{
                          backgroundColor: '#1976d2',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        onClick={() => alert(`More info about ${marker.title}`)}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </PageSection>

      {/* Implementation Section */}
      <PageSection title="💻 Implementation Code">
        <Card title="Info Window with Rich Content" padding="lg" style={styles.utils.marginBottom.lg}>
          <CodeBlock language="tsx" showCopy>
            {CODE_EXAMPLES.infoWindowUsage}
          </CodeBlock>
        </Card>
      </PageSection>

      {/* Features Section */}
      <PageSection title="✨ Features Demonstrated" marginBottom={false}>
        <Card title="Key Features" padding="lg">
          <ul style={styles.lists.styled}>
            <li><strong>Rich Content:</strong> Images, ratings, categories, and descriptions</li>
            <li><strong>Interactive Markers:</strong> Click to open/close info windows</li>
            <li><strong>Single Window Policy:</strong> Only one info window open at a time</li>
            <li><strong>Custom Styling:</strong> Styled content with proper layout</li>
            <li><strong>Action Buttons:</strong> Interactive elements within info windows</li>
            <li><strong>Star Ratings:</strong> Visual rating display</li>
          </ul>
        </Card>
      </PageSection>
    </PageLayout>
  );
};

export default InfoWindowsPage;