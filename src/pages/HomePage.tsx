import React, { FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * Feature cards data
 */
const features = [
  {
    id: 'basic-map',
    title: 'Basic Map',
    description: 'Learn how to integrate Google Maps with React and TypeScript. Covers basic setup, API key configuration, and displaying a simple map.',
    icon: '🗺️',
    path: '/basic-map',
    difficulty: 'Beginner',
    topics: ['Google Maps API', 'React Integration', 'TypeScript Setup'],
  },
  {
    id: 'custom-markers',
    title: 'Custom Markers',
    description: 'Create custom markers with different icons, colors, and categories. Learn about marker clustering and animations.',
    icon: '📍',
    path: '/custom-markers',
    difficulty: 'Beginner',
    topics: ['Custom Icons', 'Marker Categories', 'Animations'],
  },
  {
    id: 'info-windows',
    title: 'Info Windows',
    description: 'Build interactive info windows with rich content, templates, and action buttons. Perfect for displaying detailed information.',
    icon: '💬',
    path: '/info-windows',
    difficulty: 'Intermediate',
    topics: ['Rich Content', 'Templates', 'Interactive Elements'],
  },
  {
    id: 'polylines',
    title: 'Polylines & Routes',
    description: 'Draw lines and routes on the map. Learn about different line styles, animations, and route visualization techniques.',
    icon: '🛣️',
    path: '/polylines',
    difficulty: 'Intermediate',
    topics: ['Route Drawing', 'Line Styles', 'Animations'],
  },
  {
    id: 'polygons',
    title: 'Polygons & Areas',
    description: 'Create polygons to represent areas, zones, and boundaries. Includes area calculations and interactive editing.',
    icon: '🔷',
    path: '/polygons',
    difficulty: 'Intermediate',
    topics: ['Area Calculation', 'Zone Mapping', 'Interactive Editing'],
  },
  {
    id: 'geolocation',
    title: 'Geolocation',
    description: 'Implement user location detection, tracking, and geofencing. Learn about location accuracy and privacy considerations.',
    icon: '📍',
    path: '/geolocation',
    difficulty: 'Advanced',
    topics: ['Location Detection', 'Geofencing', 'Privacy'],
  },
  {
    id: 'directions',
    title: 'Directions Service',
    description: 'Build navigation features with turn-by-turn directions, route optimization, and alternative routes.',
    icon: '🧭',
    path: '/directions',
    difficulty: 'Advanced',
    topics: ['Navigation', 'Route Optimization', 'Turn-by-turn'],
  },
];

/**
 * Home page component
 */
const HomePage: FC = () => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '60px',
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '20px',
    marginBottom: '30px',
    opacity: 0.9,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '16px',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
    opacity: 0.8,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  };

  const cardIconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '20px',
    display: 'block',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  };

  const cardDescriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const difficultyStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '15px',
  };

  const getDifficultyStyle = (difficulty: string): React.CSSProperties => {
    const baseStyle = difficultyStyle;
    switch (difficulty) {
      case 'Beginner':
        return { ...baseStyle, backgroundColor: '#e8f5e8', color: '#2e7d32' };
      case 'Intermediate':
        return { ...baseStyle, backgroundColor: '#fff3e0', color: '#f57c00' };
      case 'Advanced':
        return { ...baseStyle, backgroundColor: '#ffebee', color: '#d32f2f' };
      default:
        return baseStyle;
    }
  };

  const topicsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  const topicStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    color: '#666',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '500',
  };

  const statsStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    backgroundColor: '#f8f9fa',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
  };

  const statStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const statNumberStyle: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: '10px',
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={titleStyle}>React Google Maps POC</h1>
        <p style={subtitleStyle}>
          Complete TypeScript Integration Guide
        </p>
        <p style={descriptionStyle}>
          Learn how to integrate Google Maps with React and TypeScript through practical examples.
          Each section focuses on a specific feature with detailed explanations, code examples,
          and best practices for real-world applications.
        </p>
      </div>

      {/* Features Grid */}
      <div style={gridStyle}>
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.path}
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <span style={cardIconStyle}>{feature.icon}</span>
            <h3 style={cardTitleStyle}>{feature.title}</h3>
            <span style={getDifficultyStyle(feature.difficulty)}>
              {feature.difficulty}
            </span>
            <p style={cardDescriptionStyle}>{feature.description}</p>
            <div style={topicsStyle}>
              {feature.topics.map((topic, index) => (
                <span key={index} style={topicStyle}>
                  {topic}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div style={statsStyle}>
        <div style={statStyle}>
          <div style={statNumberStyle}>7</div>
          <div style={statLabelStyle}>Interactive Examples</div>
        </div>
        <div style={statStyle}>
          <div style={statNumberStyle}>100%</div>
          <div style={statLabelStyle}>TypeScript Coverage</div>
        </div>
        <div style={statStyle}>
          <div style={statNumberStyle}>15+</div>
          <div style={statLabelStyle}>Google Maps Features</div>
        </div>
        <div style={statStyle}>
          <div style={statNumberStyle}>∞</div>
          <div style={statLabelStyle}>Learning Opportunities</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;