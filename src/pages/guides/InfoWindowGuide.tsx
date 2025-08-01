import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import GuideLayout from '../../components/guide/GuideLayout';
import { infoWindowGuideData } from '../../data/guide/infoWindowGuideData';
import { useInfoWindowGuideState } from '../../hooks/useGuideState';
import { 
  GUIDE_CONFIG, 
  GUIDE_POSITIONS, 
  GUIDE_ZOOM_LEVELS, 
  GUIDE_MARKERS,
  GUIDE_STYLING_EXAMPLES,
  GUIDE_STYLES
} from '../../constants/guideConstants';
import { infoWindowTemplates } from '../../data/guide/commonGuideData';
import '../../styles/compact-controls.css';

const InfoWindowGuide: React.FC = () => {
  const {
    selectedExample,
    selectedMarker,
    formData,
    setSelectedExample,
    handleMarkerClick,
    updateFormData,
    resetInfoWindowState,
  } = useInfoWindowGuideState();

  // Use common markers data
  const landmarks = GUIDE_MARKERS.RIYADH_LANDMARKS;

  // Create dynamic examples based on current state
  const dynamicExamples = {
    ...infoWindowGuideData.examples,
    basic: {
      ...infoWindowGuideData.examples.basic,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          <Marker 
            position={GUIDE_POSITIONS.DEFAULT_CENTER}
            onClick={() => handleMarkerClick('basic')}
          />
          {selectedMarker === 'basic' && (
            <InfoWindow
              position={GUIDE_POSITIONS.DEFAULT_CENTER}
              onCloseClick={() => handleMarkerClick('')}
            >
              <div dangerouslySetInnerHTML={{
                __html: infoWindowTemplates.basic(
                  'Kingdom Centre',
                  'A prominent skyscraper in Riyadh, Saudi Arabia.'
                )
              }} />
            </InfoWindow>
          )}
        </GoogleMap>
      )
    },
    markerBased: {
      ...infoWindowGuideData.examples.markerBased,
      component: (
        <GoogleMap
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.OVERVIEW}
        >
          {landmarks.map(landmark => (
            <React.Fragment key={landmark.id}>
              <Marker 
                position={landmark.position}
                onClick={() => handleMarkerClick(landmark.id.toString())}
                title={landmark.title}
              />
              {selectedMarker === landmark.id.toString() && (
                <InfoWindow
                  position={landmark.position}
                  onCloseClick={() => handleMarkerClick('')}
                >
                  <div dangerouslySetInnerHTML={{
                    __html: infoWindowTemplates.basic(landmark.title, landmark.description || '')
                  }} />
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
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          <Marker 
            position={GUIDE_POSITIONS.DEFAULT_CENTER}
            onClick={() => handleMarkerClick('rich')}
          />
          {selectedMarker === 'rich' && (
            <InfoWindow
              position={GUIDE_POSITIONS.DEFAULT_CENTER}
              onCloseClick={() => handleMarkerClick('')}
            >
              <div style={{ maxWidth: '300px' }}>
                <img 
                  src="https://via.placeholder.com/280x150/007bff/ffffff?text=Kingdom+Centre" 
                  alt="Kingdom Centre"
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    objectFit: 'cover', 
                    borderRadius: GUIDE_STYLES.BORDER_RADIUS.SMALL 
                  }}
                />
                <h3 style={{ margin: '10px 0 5px 0', color: '#333' }}>Kingdom Centre</h3>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                  A 302.3 m tall skyscraper in Riyadh, Saudi Arabia. It's the third tallest building in the country.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: GUIDE_STYLES.COLORS.INFO,
                    color: 'white',
                    border: 'none',
                    borderRadius: GUIDE_STYLES.BORDER_RADIUS.SMALL,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: GUIDE_STYLES.COLORS.SUCCESS,
                    color: 'white',
                    border: 'none',
                    borderRadius: GUIDE_STYLES.BORDER_RADIUS.SMALL,
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
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          <Marker 
            position={GUIDE_POSITIONS.DEFAULT_CENTER}
            onClick={() => handleMarkerClick('styled')}
          />
          {selectedMarker === 'styled' && (
            <InfoWindow 
              position={GUIDE_POSITIONS.DEFAULT_CENTER}
              onCloseClick={() => handleMarkerClick('')}
            >
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: GUIDE_STYLES.BORDER_RADIUS.LARGE,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                minWidth: '250px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏢</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
                  Kingdom Centre
                </h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px', opacity: 0.9 }}>
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
          mapContainerStyle={GUIDE_CONFIG.MAP_CONTAINERS.DEFAULT}
          center={GUIDE_POSITIONS.DEFAULT_CENTER}
          zoom={GUIDE_ZOOM_LEVELS.CITY}
        >
          <Marker 
            position={GUIDE_POSITIONS.DEFAULT_CENTER}
            onClick={() => handleMarkerClick('interactive')}
          />
          {selectedMarker === 'interactive' && (
            <InfoWindow
              position={GUIDE_POSITIONS.DEFAULT_CENTER}
              onCloseClick={() => handleMarkerClick('')}
            >
              <div style={{ minWidth: '280px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Rate this location</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '4px', 
                    fontSize: '14px', 
                    fontWeight: 'bold' 
                  }}>
                    Your Rating:
                  </label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star}
                        onClick={() => updateFormData({ rating: star })}
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
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '4px', 
                    fontSize: '14px', 
                    fontWeight: 'bold' 
                  }}>
                    Comments:
                  </label>
                  <textarea 
                    value={formData.comment}
                    onChange={(e) => updateFormData({ comment: e.target.value })}
                    placeholder="Share your experience..."
                    style={{
                      width: '100%',
                      height: '60px',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: GUIDE_STYLES.BORDER_RADIUS.SMALL,
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <button 
                  onClick={() => {
                    console.log('Form submitted:', formData);
                    handleMarkerClick('');
                    updateFormData({ rating: 0, comment: '' });
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: GUIDE_STYLES.COLORS.INFO,
                    color: 'white',
                    border: 'none',
                    borderRadius: GUIDE_STYLES.BORDER_RADIUS.SMALL,
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

  // Create styling examples using common templates
  const stylingExamples = [
    {
      ...GUIDE_STYLING_EXAMPLES.BASIC,
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
      ...GUIDE_STYLING_EXAMPLES.ADVANCED,
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
    borderRadius: '${GUIDE_STYLES.BORDER_RADIUS.LARGE}',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
  }}>
    {/* Custom styled content */}
  </div>
</InfoWindow>`
    },
    {
      ...GUIDE_STYLING_EXAMPLES.INTERACTIVE,
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

  // Define control sections for each example - compact design
  const controlSections = {
    basic: [
      {
        title: 'Basic InfoWindow',
        content: (
          <div className="control-group compact">
            <div className="compact-info">
              💬 Simple Content • 📍 Kingdom Centre • 🎯 Click to Open
            </div>
          </div>
        )
      }
    ],
    markerBased: [
      {
        title: 'Marker-Based InfoWindows',
        content: (
          <div className="control-group compact">
            <div className="compact-markers">
              {landmarks.map(landmark => (
                <button
                  key={landmark.id}
                  onClick={() => handleMarkerClick(landmark.id.toString())}
                  className={`compact-marker-btn ${selectedMarker === landmark.id.toString() ? 'selected' : ''}`}
                >
                  📍 {landmark.title}
                </button>
              ))}
            </div>
            {selectedMarker && selectedMarker !== 'basic' && selectedMarker !== 'rich' && selectedMarker !== 'styled' && selectedMarker !== 'interactive' && (
              <div className="compact-selected">
                Open: <strong>{landmarks.find(l => l.id.toString() === selectedMarker)?.title}</strong>
              </div>
            )}
          </div>
        )
      }
    ],
    richContent: [
      {
        title: 'Rich Content',
        content: (
          <div className="control-group compact">
            <div className="compact-features">
              <span>🖼️ Images</span>
              <span>🎨 Styling</span>
              <span>🔘 Buttons</span>
              <span>📝 Rich Text</span>
            </div>
          </div>
        )
      }
    ],
    customStyling: [
      {
        title: 'Custom Styling',
        content: (
          <div className="control-group compact">
            <div className="compact-features">
              <span>🌈 Gradients</span>
              <span>🎨 Colors</span>
              <span>📏 Layout</span>
              <span>✨ Effects</span>
            </div>
          </div>
        )
      }
    ],
    interactive: [
      {
        title: 'Interactive Form',
        content: (
          <div className="control-group compact">
            <div className="compact-status">
              <div className="status-info">
                <span>⭐ Rating: {formData.rating}/5</span>
                <span>💬 Comment: {formData.comment ? 'Yes' : 'No'}</span>
              </div>
              <button 
                onClick={() => updateFormData({ rating: 0, comment: '' })}
                className="control-button secondary compact"
              >
                🔄 Reset Form
              </button>
            </div>
          </div>
        )
      }
    ]
  };

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
      onMapReset={resetInfoWindowState}
      stylingExamples={stylingExamples}
      controlSections={controlSections}
    />
  );
};

export default InfoWindowGuide;