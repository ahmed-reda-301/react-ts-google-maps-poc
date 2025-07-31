import React from 'react';

interface BestPracticeItem {
  text: string;
  description?: string;
}

interface BestPracticesProps {
  dos: BestPracticeItem[];
  donts: BestPracticeItem[];
  tips?: BestPracticeItem[];
}

const BestPractices: React.FC<BestPracticesProps> = ({ dos, donts, tips }) => {
  const PracticeCard: React.FC<{
    title: string;
    items: BestPracticeItem[];
    color: string;
    icon: string;
    bgColor: string;
    iconBg: string;
  }> = ({ title, items, color, icon, bgColor, iconBg }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: `2px solid ${bgColor}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      height: 'fit-content'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: `2px solid ${bgColor}`
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}>
          {icon}
        </div>
        <h4 style={{ 
          color, 
          margin: '0',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          {title}
        </h4>
      </div>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {items.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              padding: '12px',
              backgroundColor: bgColor,
              borderRadius: '8px',
              border: `1px solid ${color}20`,
              transition: 'all 0.2s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = color + '10';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = bgColor;
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ 
              fontWeight: '600',
              color: '#333',
              marginBottom: item.description ? '6px' : '0',
              fontSize: '14px'
            }}>
              {item.text}
            </div>
            {item.description && (
              <div style={{ 
                fontSize: '13px', 
                color: '#666', 
                lineHeight: '1.4'
              }}>
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      marginTop: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          💡
        </div>
        <h3 style={{ 
          margin: '0', 
          color: '#333',
          fontSize: '24px',
          fontWeight: '700'
        }}>
          Best Practices & Guidelines
        </h3>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: tips ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '24px',
        alignItems: 'start'
      }}>
        <PracticeCard
          title="Do's"
          items={dos}
          color="#2e7d32"
          icon="✅"
          bgColor="#e8f5e8"
          iconBg="#c8e6c9"
        />
        
        <PracticeCard
          title="Don'ts"
          items={donts}
          color="#d32f2f"
          icon="❌"
          bgColor="#ffebee"
          iconBg="#ffcdd2"
        />
        
        {tips && (
          <PracticeCard
            title="Pro Tips"
            items={tips}
            color="#f57c00"
            icon="🚀"
            bgColor="#fff3e0"
            iconBg="#ffe0b2"
          />
        )}
      </div>
    </div>
  );
};

export default BestPractices;