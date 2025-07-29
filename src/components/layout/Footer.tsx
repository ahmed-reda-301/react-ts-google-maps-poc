import React, { FC } from 'react';

/**
 * Footer component with project information and links
 */
const Footer: FC = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #e0e0e0',
    marginTop: 'auto',
    padding: '40px 0 20px 0',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const contentStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  };

  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  };

  const linkStyle: React.CSSProperties = {
    color: '#1976d2',
    textDecoration: 'none',
    fontSize: '14px',
  };

  const techListStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  };

  const techItemStyle: React.CSSProperties = {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  };

  const bottomStyle: React.CSSProperties = {
    borderTop: '1px solid #e0e0e0',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          {/* Project Info */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>About This Project</h3>
            <p style={textStyle}>
              A comprehensive demonstration of Google Maps integration with React and TypeScript.
              This project showcases various Google Maps features including custom markers,
              info windows, polylines, polygons, geolocation, and directions service.
            </p>
          </div>

          {/* Features */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>Features Demonstrated</h3>
            <div style={textStyle}>
              <div>✅ Basic Google Maps integration</div>
              <div>✅ Custom markers with different icons</div>
              <div>✅ Interactive info windows</div>
              <div>✅ Polylines for routes and paths</div>
              <div>✅ Polygons for areas and zones</div>
              <div>✅ Geolocation and user positioning</div>
              <div>✅ Directions and navigation service</div>
              <div>✅ Full TypeScript support</div>
            </div>
          </div>

          {/* Technologies */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>Technologies Used</h3>
            <div style={techListStyle}>
              <span style={techItemStyle}>React 19</span>
              <span style={techItemStyle}>TypeScript</span>
              <span style={techItemStyle}>Google Maps API</span>
              <span style={techItemStyle}>@react-google-maps/api</span>
              <span style={techItemStyle}>React Router</span>
              <span style={techItemStyle}>CSS-in-JS</span>
            </div>
          </div>

          {/* Resources */}
          <div style={sectionStyle}>
            <h3 style={titleStyle}>Useful Resources</h3>
            <div style={sectionStyle}>
              <a 
                href="https://developers.google.com/maps/documentation/javascript" 
                target="_blank" 
                rel="noopener noreferrer"
                style={linkStyle}
              >
                Google Maps JavaScript API Documentation
              </a>
              <a 
                href="https://react-google-maps-api-docs.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={linkStyle}
              >
                @react-google-maps/api Documentation
              </a>
              <a 
                href="https://www.typescriptlang.org/docs/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={linkStyle}
              >
                TypeScript Documentation
              </a>
              <a 
                href="https://react.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={linkStyle}
              >
                React Documentation
              </a>
            </div>
          </div>
        </div>

        <div style={bottomStyle}>
          <p>
            © 2025 React Google Maps POC. Built with ❤️ for learning and demonstration purposes.
          </p>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>
            This project is for educational purposes. Make sure to secure your Google Maps API key in production.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;