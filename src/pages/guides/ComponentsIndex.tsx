import React from 'react';

const ComponentsIndex: React.FC = () => {
  const components = [
    {
      id: 'google-map',
      name: 'GoogleMap',
      category: 'Core',
      description: 'Main map component with all configuration options',
      difficulty: 'Beginner',
      examples: 6,
      status: 'completed'
    },
    {
      id: 'marker',
      name: 'Marker',
      category: 'Core',
      description: 'Place markers with custom icons and animations',
      difficulty: 'Beginner',
      examples: 6,
      status: 'completed'
    },
    {
      id: 'info-window',
      name: 'InfoWindow',
      category: 'Core',
      description: 'Display information popups with rich content',
      difficulty: 'Beginner',
      examples: 5,
      status: 'completed'
    },
    {
      id: 'polyline',
      name: 'Polyline',
      category: 'Drawing',
      description: 'Draw lines and routes on the map',
      difficulty: 'Intermediate',
      examples: 5,
      status: 'completed'
    },
    {
      id: 'polygon',
      name: 'Polygon',
      category: 'Drawing',
      description: 'Create polygonal areas and shapes',
      difficulty: 'Intermediate',
      examples: 4,
      status: 'completed'
    },
    {
      id: 'circle',
      name: 'Circle',
      category: 'Drawing',
      description: 'Draw circular areas and geofences',
      difficulty: 'Beginner',
      examples: 4,
      status: 'completed'
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      category: 'Drawing',
      description: 'Create rectangular areas and bounds',
      difficulty: 'Beginner',
      examples: 4,
      status: 'completed'
    },
    {
      id: 'marker-clusterer',
      name: 'MarkerClusterer',
      category: 'Performance',
      description: 'Group nearby markers for better performance',
      difficulty: 'Intermediate',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'overlay-view',
      name: 'OverlayView',
      category: 'Advanced',
      description: 'Create custom overlays with React components',
      difficulty: 'Advanced',
      examples: 5,
      status: 'planned'
    },
    {
      id: 'ground-overlay',
      name: 'GroundOverlay',
      category: 'Advanced',
      description: 'Display images overlaid on the map',
      difficulty: 'Intermediate',
      examples: 3,
      status: 'planned'
    },
    {
      id: 'kml-layer',
      name: 'KmlLayer',
      category: 'Data',
      description: 'Display KML data on the map',
      difficulty: 'Intermediate',
      examples: 3,
      status: 'planned'
    },
    {
      id: 'data-layer',
      name: 'Data Layer',
      category: 'Data',
      description: 'Display GeoJSON data with styling',
      difficulty: 'Advanced',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'directions-service',
      name: 'DirectionsService',
      category: 'Services',
      description: 'Calculate routes between locations',
      difficulty: 'Intermediate',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'directions-renderer',
      name: 'DirectionsRenderer',
      category: 'Services',
      description: 'Display calculated routes on the map',
      difficulty: 'Intermediate',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'distance-matrix-service',
      name: 'DistanceMatrixService',
      category: 'Services',
      description: 'Calculate distances and travel times',
      difficulty: 'Advanced',
      examples: 3,
      status: 'planned'
    },
    {
      id: 'geocoder',
      name: 'Geocoder',
      category: 'Services',
      description: 'Convert addresses to coordinates',
      difficulty: 'Intermediate',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'places-service',
      name: 'PlacesService',
      category: 'Services',
      description: 'Search for places and get details',
      difficulty: 'Advanced',
      examples: 5,
      status: 'planned'
    },
    {
      id: 'autocomplete',
      name: 'Autocomplete',
      category: 'Services',
      description: 'Address and place autocomplete input',
      difficulty: 'Intermediate',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'street-view-panorama',
      name: 'StreetViewPanorama',
      category: 'Street View',
      description: 'Display Street View imagery',
      difficulty: 'Advanced',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'street-view-service',
      name: 'StreetViewService',
      category: 'Street View',
      description: 'Get Street View data and metadata',
      difficulty: 'Advanced',
      examples: 3,
      status: 'planned'
    },
    {
      id: 'traffic-layer',
      name: 'TrafficLayer',
      category: 'Layers',
      description: 'Display real-time traffic information',
      difficulty: 'Beginner',
      examples: 2,
      status: 'planned'
    },
    {
      id: 'transit-layer',
      name: 'TransitLayer',
      category: 'Layers',
      description: 'Show public transit information',
      difficulty: 'Beginner',
      examples: 2,
      status: 'planned'
    },
    {
      id: 'bicycling-layer',
      name: 'BicyclingLayer',
      category: 'Layers',
      description: 'Display bicycle-friendly routes',
      difficulty: 'Beginner',
      examples: 2,
      status: 'planned'
    },
    {
      id: 'heatmap-layer',
      name: 'HeatmapLayer',
      category: 'Visualization',
      description: 'Create data density visualizations',
      difficulty: 'Advanced',
      examples: 4,
      status: 'planned'
    },
    {
      id: 'drawing-manager',
      name: 'DrawingManager',
      category: 'Drawing',
      description: 'Interactive drawing tools for shapes',
      difficulty: 'Advanced',
      examples: 5,
      status: 'planned'
    },
    {
      id: 'load-script',
      name: 'LoadScript',
      category: 'Core',
      description: 'Load Google Maps API with configuration',
      difficulty: 'Beginner',
      examples: 3,
      status: 'planned'
    },
    {
      id: 'standalone-search-box',
      name: 'StandaloneSearchBox',
      category: 'Services',
      description: 'Standalone search input component',
      difficulty: 'Intermediate',
      examples: 3,
      status: 'planned'
    }
  ];

  const categories = ['All', 'Core', 'Drawing', 'Services', 'Layers', 'Advanced', 'Performance', 'Data', 'Street View', 'Visualization'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'planned': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const stats = {
    total: components.length,
    completed: components.filter(c => c.status === 'completed').length,
    inProgress: components.filter(c => c.status === 'in-progress').length,
    planned: components.filter(c => c.status === 'planned').length
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '0'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '40px 0',
        marginBottom: '0'
      }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ margin: '0 0 15px 0', fontSize: '3rem', textAlign: 'center' }}>
            🗺️ Google Maps Components Guide
          </h1>
          <p style={{ margin: '0 0 30px 0', fontSize: '1.2rem', opacity: 0.9, textAlign: 'center' }}>
            Complete interactive guide to all 27 Google Maps React components
          </p>
          
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '100%',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Components</div>
            </div>
            <div style={{
              backgroundColor: 'rgba(76,175,80,0.3)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.completed}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Completed</div>
            </div>
            <div style={{
              backgroundColor: 'rgba(255,152,0,0.3)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.inProgress}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>In Progress</div>
            </div>
            <div style={{
              backgroundColor: 'rgba(158,158,158,0.3)',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.planned}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Planned</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '90%', margin: '0 auto', padding: '20px' }}>
        
        {/* Search and Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '20px',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div>
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              {filteredComponents.length} of {components.length} components
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  backgroundColor: selectedCategory === category ? '#1976d2' : '#e3f2fd',
                  color: selectedCategory === category ? 'white' : '#1976d2',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Components Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {filteredComponents.map(component => (
            <div
              key={component.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              onClick={() => {
                if (component.status === 'completed') {
                  window.location.href = `/components-guide/${component.id}`;
                }
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div>
                  <h3 style={{ 
                    margin: '0 0 5px 0', 
                    color: '#333',
                    fontSize: '1.2rem'
                  }}>
                    {component.name}
                  </h3>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {component.category}
                  </div>
                </div>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(component.status)
                }} />
              </div>

              {/* Description */}
              <p style={{
                margin: '0 0 15px 0',
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {component.description}
              </p>

              {/* Metadata */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: getDifficultyColor(component.difficulty),
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {component.difficulty}
                  </span>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {component.examples} examples
                  </span>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: getStatusColor(component.status),
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {component.status.replace('-', ' ')}
                </div>
              </div>

              {/* Action */}
              <div style={{
                borderTop: '1px solid #f0f0f0',
                paddingTop: '15px'
              }}>
                {component.status === 'completed' ? (
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    View Guide & Examples →
                  </button>
                ) : component.status === 'in-progress' ? (
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#ff9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'not-allowed',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    🚧 In Progress
                  </button>
                ) : (
                  <button style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#e0e0e0',
                    color: '#666',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'not-allowed',
                    fontSize: '14px'
                  }}>
                    📋 Planned
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginTop: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
            🚀 More Resources
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#666' }}>
            Explore additional resources and advanced examples for Google Maps development
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a href="/basic-components-demo" style={{ 
              padding: '12px 24px', 
              backgroundColor: '#4caf50', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Basic Components Demo
            </a>
            <a href="/custom-components-demo" style={{ 
              padding: '12px 24px', 
              backgroundColor: '#ff9800', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Custom Components Demo
            </a>
            <a href="/docs/saudi-logistics-system" style={{ 
              padding: '12px 24px', 
              backgroundColor: '#9c27b0', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Saudi Logistics Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsIndex;