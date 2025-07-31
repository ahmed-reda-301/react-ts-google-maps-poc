import React, { ReactNode } from 'react';
import CodeBlock from './CodeBlock';

interface Example {
  title: string;
  description: string;
  component: ReactNode;
  code: string;
}

interface GuidePageLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  examples: Record<string, Example>;
  selectedExample: string;
  onExampleChange: (example: string) => void;
  children?: ReactNode;
  navigationLinks?: {
    prev?: { href: string; label: string };
    next?: { href: string; label: string };
  };
}

const GuidePageLayout: React.FC<GuidePageLayoutProps> = ({
  title,
  subtitle,
  icon,
  examples,
  selectedExample,
  onExampleChange,
  children,
  navigationLinks
}) => {
  const currentExample = examples[selectedExample];

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
        padding: '20px 0',
        marginBottom: '0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
            {icon} {title}
          </h1>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: 0.9 }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        
        {/* Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Examples</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {Object.entries(examples).map(([key, example]) => (
              <button
                key={key}
                onClick={() => onExampleChange(key)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: selectedExample === key ? '#1976d2' : '#e3f2fd',
                  color: selectedExample === key ? 'white' : '#1976d2',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedExample === key ? 'bold' : 'normal',
                  transition: 'all 0.3s ease'
                }}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - 50/50 Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          height: 'calc(100vh - 300px)',
          minHeight: '600px'
        }}>
          
          {/* Live Demo - Left Half */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                🎮 Live Demo: {currentExample.title}
              </h3>
              <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                {currentExample.description}
              </p>
            </div>
            
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              flex: 1,
              minHeight: 0
            }}>
              {currentExample.component}
            </div>
          </div>

          {/* Code Example - Right Half */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
              💻 Code Implementation
            </h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <CodeBlock
                code={currentExample.code}
                language="tsx"
                maxHeight="100%"
              />
            </div>
          </div>
        </div>

        {/* Additional Content */}
        {children}

        {/* Navigation Links */}
        {navigationLinks && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            marginTop: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
              🧭 Explore More Components
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {navigationLinks.prev && (
                <a href={navigationLinks.prev.href} style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#666', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  ← {navigationLinks.prev.label}
                </a>
              )}
              {navigationLinks.next && (
                <a href={navigationLinks.next.href} style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#1976d2', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  Next: {navigationLinks.next.label} →
                </a>
              )}
              <a href="/components-guide" style={{ 
                padding: '10px 20px', 
                backgroundColor: '#666', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '6px',
                fontSize: '14px'
              }}>
                All Components
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePageLayout;