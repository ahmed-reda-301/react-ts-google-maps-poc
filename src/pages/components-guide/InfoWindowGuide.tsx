import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import GuideLayout from './components/GuideLayout';
import InfoWindowControls from './components/controls/InfoWindowControls';
import { infoWindowGuideData } from './data/infoWindowGuideData';
import { MAP_CONTAINER_STYLE, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from './constants';

const InfoWindowGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [formData, setFormData] = useState({ rating: 0, comment: '' });

  // Reset map state when example changes
  useEffect(() => {
    setSelectedMarker(null);
    setFormData({ rating: 0, comment: '' });
  }, [selectedExample]);

  const handleMapReset = () => {
    setSelectedMarker(null);
    setFormData({ rating: 0, comment: '' });
  };

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...infoWindowGuideData.examples,
    basic: {
      ...infoWindowGuideData.examples.basic,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker 
            position={DEFAULT_CENTER}
            onClick={() => setSelectedMarker('basic')}
          />
          {selectedMarker === 'basic' && (
            <InfoWindow
              position={DEFAULT_CENTER}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>Kingdom Centre</h3>
                <p>A prominent skyscraper in Riyadh, Saudi Arabia.</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )
    },
    markerBased: {
      ...infoWindowGuideData.examples.markerBased,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          {[
            { id: 'kingdom', position: RIYADH_LOCATIONS.KINGDOM_CENTRE, name: 'Kingdom Centre', info: 'Iconic skyscraper' },
            { id: 'faisaliah', position: RIYADH_LOCATIONS.AL_FAISALIAH_TOWER, name: 'Al Faisaliah Tower', info: 'Business district landmark' },
            { id: 'masmak', position: RIYADH_LOCATIONS.MASMAK_FORTRESS, name: 'Masmak Fortress', info: 'Historical fortress' }
          ].map(location => (
            <React.Fragment key={location.id}>
              <Marker 
                position={location.position}
                onClick={() => setSelectedMarker(location.id)}
                title={location.name}
              />
              {selectedMarker === location.id && (
                <InfoWindow
                  position={location.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{location.name}</h4>
                    <p style={{ margin: '0', fontSize: '14px' }}>{location.info}</p>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </GoogleMap>
      )
    },
    richContent: {
      ...infoWindowGuideData.examples.richContent,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker 
            position={DEFAULT_CENTER}
            onClick={() => setSelectedMarker('rich')}
          />
          {selectedMarker === 'rich' && (
            <InfoWindow
              position={DEFAULT_CENTER}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ maxWidth: '300px' }}>
                <img 
                  src="https://via.placeholder.com/280x150/007bff/ffffff?text=Kingdom+Centre" 
                  alt="Kingdom Centre"
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ margin: '10px 0 5px 0', color: '#333' }}>Kingdom Centre</h3>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                  A 302.3 m tall skyscraper in Riyadh, Saudi Arabia. It's the third tallest building in the country.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Get Directions
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )
    },
    customStyling: {
      ...infoWindowGuideData.examples.customStyling,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker 
            position={DEFAULT_CENTER}
            onClick={() => setSelectedMarker('styled')}
          />
          {selectedMarker === 'styled' && (
            <InfoWindow 
              position={DEFAULT_CENTER}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                minWidth: '250px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  marginBottom: '8px'
                }}>
                  🏢
                </div>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Kingdom Centre
                </h3>
                <p style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '14px',
                  opacity: 0.9
                }}>
                  Iconic skyscraper in Riyadh
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  fontSize: '12px'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Height</div>
                    <div>302.3m</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Floors</div>
                    <div>99</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Year</div>
                    <div>2002</div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )
    },
    interactive: {
      ...infoWindowGuideData.examples.interactive,
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker 
            position={DEFAULT_CENTER}
            onClick={() => setSelectedMarker('interactive')}
          />
          {selectedMarker === 'interactive' && (
            <InfoWindow
              position={DEFAULT_CENTER}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ minWidth: '280px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Rate this location</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                    Your Rating:
                  </label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        style={{ 
                          fontSize: '20px', 
                          cursor: 'pointer',
                          color: star <= formData.rating ? '#ffc107' : '#ddd'
                        }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                    Comments:
                  </label>
                  <textarea 
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your experience..."
                    style={{
                      width: '100%',
                      height: '60px',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button 
                  onClick={() => {
                    console.log('Form submitted:', formData);
                    setSelectedMarker(null);
                    setFormData({ rating: 0, comment: '' });
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Review
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )
    }
  };

  const stylingExamples = [
    {
      title: 'Basic Styling',
      color: '#1976d2',
      description: 'Simple styling with basic options and clean content layout.',
      code: `<InfoWindow
  position={position}
  options={{
    maxWidth: 300,
    pixelOffset: new google.maps.Size(0, -40)
  }}
>
  <div style={{
    padding: '15px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '280px'
  }}>
    <h3>Location Title</h3>
    <p>Description content...</p>
  </div>
</InfoWindow>`
    },
    {
      title: 'Advanced Styling',
      color: '#4caf50',
      description: 'Advanced styling with gradients, shadows, and custom positioning.',
      code: `<InfoWindow
  position={position}
  options={{
    maxWidth: 350,
    disableAutoPan: false
  }}
>
  <div style={{
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
  }}>
    {/* Custom styled content */}
  </div>
</InfoWindow>`
    },
    {
      title: 'Interactive Content',
      color: '#ff9800',
      description: 'InfoWindow with interactive elements like forms and buttons.',
      code: `<InfoWindow position={position}>
  <div style={{ minWidth: '280px' }}>
    <h3>Rate this location</h3>
    <div style={{ marginBottom: '12px' }}>
      <label>Your Rating:</label>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star}
            onClick={() => setRating(star)}
            style={{ 
              fontSize: '20px', 
              cursor: 'pointer',
              color: star <= rating ? '#ffc107' : '#ddd'
            }}
          >
            ⭐
          </span>
        ))}
      </div>
    </div>
    <button onClick={handleSubmit}>
      Submit Review
    </button>
  </div>
</InfoWindow>`
    }
  ];

  return (
    <GuideLayout
      title={infoWindowGuideData.title}
      subtitle={infoWindowGuideData.subtitle}
      icon={infoWindowGuideData.icon}
      examples={dynamicExamples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={infoWindowGuideData.propsData}
      bestPractices={infoWindowGuideData.bestPractices}
      useCases={infoWindowGuideData.useCases}
      tasks={infoWindowGuideData.tasks}
      navigationLinks={infoWindowGuideData.navigationLinks}
      onMapReset={handleMapReset}
      stylingExamples={stylingExamples}
    >
      <InfoWindowControls
        selectedExample={selectedExample}
        formData={formData}
      />
    </GuideLayout>
  );
};

export default InfoWindowGuide;