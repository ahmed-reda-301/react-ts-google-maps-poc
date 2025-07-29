import React, { useState } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Button, Card, InfoBox, CodeBlock } from '../components/ui';
import { LatLng } from '../types/common/LatLng';

const containerStyle = {
  width: '100%',
  height: '500px',
};

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
      position: { lat: 30.0444, lng: 31.2357 },
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
      position: { lat: 30.0131, lng: 31.2089 },
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
    <div style={{ padding: '20px' }}>
      <h1>Info Windows Demo</h1>
      <p>This page demonstrates how to implement info windows with rich content including images, ratings, and detailed information.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <Card>
          <h3>Interactive Features</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Click markers to open info windows</li>
            <li>Rich content with images and ratings</li>
            <li>Click again to close info windows</li>
            <li>Only one info window open at a time</li>
          </ul>
        </Card>

        <Card>
          <h3>Current Status</h3>
          <p><strong>Total Markers:</strong> {markers.length}</p>
          <p><strong>Selected Marker:</strong> {selectedMarker ? selectedMarker.title : 'None'}</p>
          {selectedMarkerId && (
            <Button onClick={closeInfoWindow} variant="secondary">
              Close Info Window
            </Button>
          )}
        </Card>
      </div>

      <InfoBox variant="info">
        <strong>Interactive Map:</strong> Click on any marker to view detailed information in an info window.
      </InfoBox>

      <div style={{ height: '500px', marginBottom: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 30.0444, lng: 31.2357 }}
            zoom={13}
          >
            {markers.map((marker) => (
              <React.Fragment key={marker.id}>
                <Marker
                  position={marker.position}
                  title={marker.title}
                  onClick={() => handleMarkerClick(marker.id)}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: typeof google !== 'undefined' ? new google.maps.Size(32, 32) : undefined
                  }}
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
          </GoogleMap>
        </LoadScript>
      </div>

      <Card>
        <h3>Implementation Code</h3>
        <CodeBlock language="tsx">
{`// Info Window with Rich Content
import InfoWindow from '../components/maps/InfoWindow';

// In your component
{selectedMarkerId === marker.id && (
  <InfoWindow
    position={marker.position}
    onCloseClick={closeInfoWindow}
  >
    <div style={{ maxWidth: '300px', padding: '10px' }}>
      <img src={marker.image} alt={marker.title} />
      <h3>{marker.title}</h3>
      <p>{marker.description}</p>
      <div>Rating: {marker.rating} stars</div>
    </div>
  </InfoWindow>
)}`}
        </CodeBlock>
      </Card>

      <Card>
        <h3>Features Demonstrated</h3>
        <ul>
          <li><strong>Rich Content:</strong> Images, ratings, categories, and descriptions</li>
          <li><strong>Interactive Markers:</strong> Click to open/close info windows</li>
          <li><strong>Single Window Policy:</strong> Only one info window open at a time</li>
          <li><strong>Custom Styling:</strong> Styled content with proper layout</li>
          <li><strong>Action Buttons:</strong> Interactive elements within info windows</li>
          <li><strong>Star Ratings:</strong> Visual rating display</li>
        </ul>
      </Card>
    </div>
  );
};

export default InfoWindowsPage;