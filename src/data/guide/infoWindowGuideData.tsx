import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { GuidePageData } from '../../types/guide';
import { MAP_CONTAINERS, DEFAULT_CENTER, ZOOM_LEVELS, RIYADH_LOCATIONS } from '../../constants';

export const infoWindowGuideData: GuidePageData = {
  title: 'InfoWindow Component Guide',
  subtitle: 'Complete guide to using InfoWindow components for displaying rich information and interactive content',
  icon: '💬',
  examples: {
    basic: {
      title: 'Basic InfoWindow',
      description: 'Simple InfoWindow with text content',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker position={DEFAULT_CENTER} />
          <InfoWindow position={DEFAULT_CENTER}>
            <div>
              <h3>Kingdom Centre</h3>
              <p>A prominent skyscraper in Riyadh, Saudi Arabia.</p>
            </div>
          </InfoWindow>
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const BasicInfoWindow = () => {
  const center = { lat: 24.7136, lng: 46.6753 };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={center}
      zoom={11}
    >
      <Marker position={center} />
      <InfoWindow position={center}>
        <div>
          <h3>Kingdom Centre</h3>
          <p>A prominent skyscraper in Riyadh, Saudi Arabia.</p>
        </div>
      </InfoWindow>
    </GoogleMap>
  );
};`
    },

    markerBased: {
      title: 'Marker-based InfoWindow',
      description: 'InfoWindow that appears when clicking on markers',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.CITY}
        >
          <Marker
            position={RIYADH_LOCATIONS.KINGDOM_CENTRE}
            title="Kingdom Centre"
          />
          <Marker
            position={RIYADH_LOCATIONS.AL_FAISALIAH_TOWER}
            title="Al Faisaliah Tower"
          />
          <Marker
            position={RIYADH_LOCATIONS.MASMAK_FORTRESS}
            title="Masmak Fortress"
          />
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const MarkerBasedInfoWindow = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    {
      id: 1,
      position: { lat: 24.7136, lng: 46.6753 },
      title: "Kingdom Centre",
      description: "A prominent skyscraper in Riyadh"
    },
    {
      id: 2,
      position: { lat: 24.6877, lng: 46.6857 },
      title: "Al Faisaliah Tower",
      description: "An iconic tower in Riyadh's skyline"
    }
  ];

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={8}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.title}</h3>
            <p>{selectedMarker.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};`
    },

    richContent: {
      title: 'Rich Content InfoWindow',
      description: 'InfoWindow with images, buttons, and formatted content',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker position={DEFAULT_CENTER} />
          <InfoWindow position={DEFAULT_CENTER}>
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
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const RichContentInfoWindow = () => {
  const center = { lat: 24.7136, lng: 46.6753 };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={center}
      zoom={11}
    >
      <Marker position={center} />
      <InfoWindow position={center}>
        <div style={{ maxWidth: '300px' }}>
          <img 
            src="/path/to/image.jpg" 
            alt="Kingdom Centre"
            style={{ 
              width: '100%', 
              height: '150px', 
              objectFit: 'cover', 
              borderRadius: '4px' 
            }}
          />
          <h3>Kingdom Centre</h3>
          <p>A 302.3 m tall skyscraper in Riyadh, Saudi Arabia.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => console.log('View details')}>
              View Details
            </button>
            <button onClick={() => console.log('Get directions')}>
              Get Directions
            </button>
          </div>
        </div>
      </InfoWindow>
    </GoogleMap>
  );
};`
    },

    customStyling: {
      title: 'Custom Styled InfoWindow',
      description: 'InfoWindow with custom CSS styling and layout',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker position={DEFAULT_CENTER} />
          <InfoWindow position={DEFAULT_CENTER}>
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
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const CustomStyledInfoWindow = () => {
  const center = { lat: 24.7136, lng: 46.6753 };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={center}
      zoom={11}
    >
      <Marker position={center} />
      <InfoWindow 
        position={center}
        options={{
          pixelOffset: new google.maps.Size(0, -30)
        }}
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
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏢</div>
          <h3>Kingdom Centre</h3>
          <p>Iconic skyscraper in Riyadh</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <div>Height</div>
              <div>302.3m</div>
            </div>
            <div>
              <div>Floors</div>
              <div>99</div>
            </div>
          </div>
        </div>
      </InfoWindow>
    </GoogleMap>
  );
};`
    },

    interactive: {
      title: 'Interactive InfoWindow',
      description: 'InfoWindow with forms, inputs, and interactive elements',
      component: (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINERS.DEFAULT}
          center={DEFAULT_CENTER}
          zoom={ZOOM_LEVELS.DISTRICT}
        >
          <Marker position={DEFAULT_CENTER} />
          <InfoWindow position={DEFAULT_CENTER}>
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
                      style={{ 
                        fontSize: '20px', 
                        cursor: 'pointer',
                        color: '#ffc107'
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
              <button style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Submit Review
              </button>
            </div>
          </InfoWindow>
        </GoogleMap>
      ),
      code: `import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const InteractiveInfoWindow = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('Rating:', rating, 'Comment:', comment);
    // Handle form submission
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={{ lat: 24.7136, lng: 46.6753 }}
      zoom={11}
    >
      <Marker position={{ lat: 24.7136, lng: 46.6753 }} />
      <InfoWindow position={{ lat: 24.7136, lng: 46.6753 }}>
        <div style={{ minWidth: '280px' }}>
          <h3>Rate this location</h3>
          <div>
            <label>Your Rating:</label>
            <div>
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
          <div>
            <label>Comments:</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
            />
          </div>
          <button onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </InfoWindow>
    </GoogleMap>
  );
};`
    }
  },
  propsData: {
    title: 'InfoWindow Props & Options',
    sections: [
      {
        title: 'Essential Props',
        props: [
          {
            name: 'position',
            type: 'LatLngLiteral | LatLng',
            description: 'The position where the InfoWindow should be displayed',
            required: false
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'The content to display inside the InfoWindow',
            required: true
          },
          {
            name: 'options',
            type: 'InfoWindowOptions',
            description: 'Additional configuration options for the InfoWindow',
            required: false
          }
        ],
        color: '#1976d2'
      },
      {
        title: 'Display Options',
        props: [
          {
            name: 'pixelOffset',
            type: 'Size',
            description: 'Offset from the position in pixels',
            required: false
          },
          {
            name: 'maxWidth',
            type: 'number',
            description: 'Maximum width of the InfoWindow in pixels',
            required: false,
            defaultValue: '300'
          },
          {
            name: 'disableAutoPan',
            type: 'boolean',
            description: 'Disable automatic panning when InfoWindow opens',
            required: false,
            defaultValue: 'false'
          }
        ],
        color: '#4caf50'
      },
      {
        title: 'Behavior Options',
        props: [
          {
            name: 'zIndex',
            type: 'number',
            description: 'Z-index of the InfoWindow',
            required: false
          },
          {
            name: 'closeBoxURL',
            type: 'string',
            description: 'URL of the close box image',
            required: false
          },
          {
            name: 'enableEventPropagation',
            type: 'boolean',
            description: 'Enable event propagation',
            required: false,
            defaultValue: 'false'
          }
        ],
        color: '#ff9800'
      },
      {
        title: 'Event Handlers',
        props: [
          {
            name: 'onLoad',
            type: '(infoWindow: google.maps.InfoWindow) => void',
            description: 'Callback fired when InfoWindow loads',
            required: false
          },
          {
            name: 'onUnmount',
            type: '(infoWindow: google.maps.InfoWindow) => void',
            description: 'Callback fired when InfoWindow unmounts',
            required: false
          },
          {
            name: 'onCloseClick',
            type: '() => void',
            description: 'Callback fired when close button is clicked',
            required: false
          },
          {
            name: 'onContentChanged',
            type: '() => void',
            description: 'Callback fired when content changes',
            required: false
          },
          {
            name: 'onDomReady',
            type: '() => void',
            description: 'Callback fired when DOM is ready',
            required: false
          },
          {
            name: 'onPositionChanged',
            type: '() => void',
            description: 'Callback fired when position changes',
            required: false
          },
          {
            name: 'onZindexChanged',
            type: '() => void',
            description: 'Callback fired when z-index changes',
            required: false
          }
        ],
        color: '#9c27b0'
      }
    ]
  },
  bestPractices: {
    dos: [
      {
        text: "Keep content concise",
        description: "InfoWindows should contain focused, relevant information that's easy to scan"
      },
      {
        text: "Use appropriate sizing",
        description: "Set maxWidth to ensure InfoWindows don't become too wide on large screens"
      },
      {
        text: "Provide close functionality",
        description: "Always handle onCloseClick to allow users to dismiss InfoWindows"
      },
      {
        text: "Optimize for mobile",
        description: "Ensure InfoWindow content is touch-friendly and readable on small screens"
      },
      {
        text: "Use semantic HTML",
        description: "Structure content with proper headings, paragraphs, and semantic elements"
      },
      {
        text: "Handle loading states",
        description: "Show loading indicators when fetching dynamic content for InfoWindows"
      }
    ],
    donts: [
      {
        text: "Don't overcrowd with content",
        description: "Avoid putting too much information in a single InfoWindow"
      },
      {
        text: "Don't ignore accessibility",
        description: "Ensure InfoWindow content is accessible to screen readers and keyboard navigation"
      },
      {
        text: "Don't use very large images",
        description: "Large images can make InfoWindows unwieldy and slow to load"
      },
      {
        text: "Don't forget error handling",
        description: "Handle cases where content fails to load or user interactions fail"
      },
      {
        text: "Don't block map interaction",
        description: "Avoid InfoWindows that prevent users from interacting with the map"
      }
    ],
    tips: [
      {
        text: "Use lazy loading for images",
        description: "Load images only when InfoWindow is opened to improve performance"
      },
      {
        text: "Implement content caching",
        description: "Cache frequently accessed InfoWindow content to improve user experience"
      },
      {
        text: "Add smooth animations",
        description: "Use CSS transitions to create smooth opening and closing animations"
      },
      {
        text: "Consider using custom overlays",
        description: "For complex layouts, consider creating custom overlay components"
      }
    ]
  },
  useCases: [
    {
      title: "Location Information",
      description: "Display detailed information about specific locations and points of interest",
      examples: [
        "Business details and hours",
        "Tourist attraction information",
        "Real estate property details",
        "Event venue information"
      ],
      icon: "ℹ️",
      color: "#1976d2"
    },
    {
      title: "Interactive Forms",
      description: "Collect user input and feedback directly on the map",
      examples: [
        "Location reviews and ratings",
        "Report issues or problems",
        "Contact forms",
        "Survey responses"
      ],
      icon: "📝",
      color: "#4caf50"
    },
    {
      title: "Media Display",
      description: "Show images, videos, and rich media content",
      examples: [
        "Photo galleries",
        "Street view integration",
        "Video tours",
        "360° panoramas"
      ],
      icon: "🖼️",
      color: "#ff9800"
    },
    {
      title: "Action Centers",
      description: "Provide quick actions and navigation options",
      examples: [
        "Get directions buttons",
        "Call or contact options",
        "Booking and reservations",
        "Share location features"
      ],
      icon: "⚡",
      color: "#9c27b0"
    }
  ],
  tasks: [
    {
      id: 'infowindow-basic',
      title: 'Create Basic InfoWindow',
      description: 'Display information when users click on markers using InfoWindow components.',
      difficulty: 'beginner',
      estimatedTime: '10 minutes',
      requirements: [
        'Add InfoWindow component to the map',
        'Position it at a specific location',
        'Display simple text content',
        'Add a close button functionality'
      ],
      hints: [
        'Use position prop to set InfoWindow location',
        'onCloseClick handles the close button',
        'Keep content simple for first attempt'
      ]
    },
    {
      id: 'infowindow-marker-integration',
      title: 'Connect InfoWindows with Markers',
      description: 'Create interactive markers that show InfoWindows when clicked.',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      requirements: [
        'Show InfoWindow when marker is clicked',
        'Close InfoWindow when clicking elsewhere',
        'Display different content for each marker',
        'Ensure only one InfoWindow is open at a time'
      ],
      hints: [
        'Use state to track which InfoWindow is open',
        'Pass marker data to InfoWindow content',
        'Handle marker onClick events'
      ]
    },
    {
      id: 'infowindow-rich-content',
      title: 'Design Rich Content InfoWindows',
      description: 'Create InfoWindows with images, formatted text, and interactive elements.',
      difficulty: 'intermediate',
      estimatedTime: '25 minutes',
      requirements: [
        'Add images to InfoWindow content',
        'Include formatted text with HTML',
        'Add buttons and interactive elements',
        'Style the content with CSS'
      ],
      hints: [
        'Use JSX for rich content',
        'Images should be optimized for InfoWindows',
        'Consider InfoWindow size limitations'
      ]
    },
    {
      id: 'infowindow-forms',
      title: 'Build Interactive Forms',
      description: 'Create InfoWindows with forms for collecting user input and feedback.',
      difficulty: 'intermediate',
      estimatedTime: '30 minutes',
      requirements: [
        'Add form elements (inputs, textareas, selects)',
        'Implement form validation',
        'Handle form submission',
        'Provide user feedback on actions'
      ],
      hints: [
        'Use controlled components for form inputs',
        'Validate data before submission',
        'Consider using form libraries like Formik'
      ]
    },
    {
      id: 'infowindow-custom-styling',
      title: 'Create Custom Styled InfoWindows',
      description: 'Design InfoWindows with custom CSS styling and unique layouts.',
      difficulty: 'intermediate',
      estimatedTime: '35 minutes',
      requirements: [
        'Apply custom CSS styles to InfoWindow content',
        'Create unique layouts and designs',
        'Add animations and transitions',
        'Ensure responsive design'
      ],
      hints: [
        'Use inline styles or CSS classes',
        'Consider using CSS-in-JS libraries',
        'Test on different screen sizes'
      ]
    },
    {
      id: 'infowindow-data-driven',
      title: 'Build Data-Driven InfoWindows',
      description: 'Create InfoWindows that display dynamic content from external data sources.',
      difficulty: 'advanced',
      estimatedTime: '40 minutes',
      requirements: [
        'Load data from external APIs',
        'Display dynamic content based on data',
        'Handle loading and error states',
        'Implement data caching'
      ],
      hints: [
        'Use useEffect for data fetching',
        'Show loading spinners while fetching',
        'Implement error boundaries for error handling'
      ]
    },
    {
      id: 'infowindow-media-gallery',
      title: 'Create Media Gallery InfoWindows',
      description: 'Build InfoWindows that display image galleries, videos, and rich media content.',
      difficulty: 'advanced',
      estimatedTime: '45 minutes',
      requirements: [
        'Display image galleries with navigation',
        'Add video playback capabilities',
        'Implement zoom and fullscreen features',
        'Optimize media loading and performance'
      ],
      hints: [
        'Use image carousel libraries',
        'Implement lazy loading for images',
        'Consider using lightbox components'
      ]
    },
    {
      id: 'infowindow-performance',
      title: 'Optimize InfoWindow Performance',
      description: 'Implement performance optimizations for InfoWindows with complex content.',
      difficulty: 'advanced',
      estimatedTime: '35 minutes',
      requirements: [
        'Implement content lazy loading',
        'Optimize rendering performance',
        'Add content caching strategies',
        'Minimize re-renders'
      ],
      hints: [
        'Use React.memo for InfoWindow components',
        'Implement virtual scrolling for long content',
        'Cache frequently accessed data'
      ]
    }
  ],
  navigationLinks: {
    prev: { href: "/components-guide/marker", label: "Marker" },
    next: { href: "/components-guide/polyline", label: "Polyline" }
  }
};