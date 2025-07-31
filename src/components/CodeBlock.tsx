import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  showLineNumbers = true,
  maxHeight = '500px'
}) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // Highlight the code using Prism
    const highlighted = Prism.highlight(
      code, 
      Prism.languages[language] || Prism.languages.javascript, 
      language
    );
    setHighlightedCode(highlighted);
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.split('\n');

  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#2d3748',
      border: '1px solid #4a5568',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: '"Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#1a202c',
        borderBottom: '1px solid #4a5568',
        fontSize: '12px',
        color: '#a0aec0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f56565' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ed8936' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#48bb78' }}></div>
          </div>
          <span style={{ marginLeft: '8px', fontWeight: '500' }}>
            {language === 'typescript' ? 'TypeScript' : 
             language === 'tsx' ? 'TSX' :
             language === 'jsx' ? 'JSX' :
             language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: copied ? '#48bb78' : '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#3182ce';
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#4299e1';
            }
          }}
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div style={{
        overflow: 'auto',
        maxHeight: maxHeight,
        backgroundColor: '#2d3748'
      }}>
        <pre style={{
          margin: 0,
          padding: '16px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: '1.5',
          color: '#e2e8f0',
          backgroundColor: 'transparent'
        }}>
          {showLineNumbers ? (
            <div style={{ display: 'flex' }}>
              {/* Line numbers */}
              <div style={{
                minWidth: '40px',
                paddingRight: '16px',
                borderRight: '1px solid #4a5568',
                marginRight: '16px',
                color: '#718096',
                fontSize: '12px',
                textAlign: 'right',
                userSelect: 'none',
                lineHeight: '1.5'
              }}>
                {lines.map((_, index) => (
                  <div key={index} style={{ height: '21px' }}>
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Code content */}
              <div style={{ flex: 1, overflow: 'auto' }}>
                <code 
                  style={{ 
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    backgroundColor: 'transparent'
                  }}
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </div>
            </div>
          ) : (
            <code 
              style={{ 
                fontFamily: 'inherit',
                fontSize: 'inherit',
                backgroundColor: 'transparent'
              }}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;