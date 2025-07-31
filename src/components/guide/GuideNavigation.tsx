import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuideNavigationProps } from '../../types/guide';

const GuideNavigation: React.FC<GuideNavigationProps> = ({ navigationLinks }) => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '20px',
      marginBottom: '40px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#333',
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        🧭 Explore More Components
      </h3>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: navigationLinks?.prev && navigationLinks?.next ? '1fr auto 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        alignItems: 'center'
      }}>
        {/* Previous Component */}
        {navigationLinks?.prev && (
          <button
            onClick={() => handleNavigation(navigationLinks.prev!.href)}
            style={{
              padding: '12px 20px',
              backgroundColor: '#f8f9fa',
              color: '#495057',
              border: '2px solid #e9ecef',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e9ecef';
              e.currentTarget.style.borderColor = '#6c757d';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.borderColor = '#e9ecef';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '16px' }}>←</span>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Previous</div>
              <div>{navigationLinks.prev.label}</div>
            </div>
          </button>
        )}

        {/* All Components Button */}
        <button
          onClick={() => handleNavigation('/components-guide')}
          style={{
            padding: '12px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: '2px solid #1976d2',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            gridColumn: navigationLinks?.prev && navigationLinks?.next ? '2' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1565c0';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1976d2';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: '16px' }}>🏠</span>
          All Components
        </button>

        {/* Next Component */}
        {navigationLinks?.next && (
          <button
            onClick={() => handleNavigation(navigationLinks.next!.href)}
            style={{
              padding: '12px 20px',
              backgroundColor: '#e8f5e8',
              color: '#155724',
              border: '2px solid #c3e6cb',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'right'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4edda';
              e.currentTarget.style.borderColor = '#28a745';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e8f5e8';
              e.currentTarget.style.borderColor = '#c3e6cb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Next</div>
              <div>{navigationLinks.next.label}</div>
            </div>
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GuideNavigation;