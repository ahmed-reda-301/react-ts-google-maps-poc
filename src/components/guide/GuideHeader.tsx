import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuideHeaderProps } from '../../types/guide';

const GuideHeader: React.FC<GuideHeaderProps> = ({ title, subtitle, icon }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/components-guide');
  };

  return (
    <div style={{
      backgroundColor: '#1976d2',
      color: 'white',
      padding: '12px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '12px 18px',
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              transition: 'transform 0.3s ease'
            }}
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to Components</span>
        </button>

        {/* Title Section */}
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '1.8rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {icon} {title}
          </h1>
          <p style={{ 
            margin: '0', 
            fontSize: '0.95rem', 
            opacity: 0.85,
            lineHeight: '1.3'
          }}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideHeader;