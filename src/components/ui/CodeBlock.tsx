import React, { FC, ReactNode, useState } from 'react';
import { theme } from '../../styles/theme';

export interface CodeBlockProps {
  /** Code content to display */
  children: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Code block title */
  title?: string;
  /** Whether to show copy button */
  showCopy?: boolean;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Maximum height before scrolling */
  maxHeight?: string;
  /** Custom filename to display */
  filename?: string;
}

/**
 * Reusable CodeBlock component for displaying code examples
 * 
 * @example
 * ```tsx
 * <CodeBlock language="typescript" title="Basic Setup" showCopy>
 *   {`const map = new GoogleMap({
 *     center: { lat: 24.7136, lng: 46.6753 },
 *     zoom: 10
 *   });`}
 * </CodeBlock>
 * ```
 */
const CodeBlock: FC<CodeBlockProps> = ({
  children,
  language = 'typescript',
  title,
  showCopy = true,
  showLineNumbers = false,
  maxHeight = '400px',
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: theme.colors.grey[900],
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    border: `1px solid ${theme.colors.border.light}`,
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.fontSize.sm,
    position: 'relative',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.grey[800],
    borderBottom: `1px solid ${theme.colors.grey[700]}`,
  };

  const titleStyles: React.CSSProperties = {
    color: theme.colors.grey[100],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    margin: 0,
  };

  const languageBadgeStyles: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: 'uppercase',
  };

  const copyButtonStyles: React.CSSProperties = {
    backgroundColor: copied ? theme.colors.success : 'transparent',
    color: copied ? theme.colors.white : theme.colors.grey[300],
    border: `1px solid ${copied ? theme.colors.success : theme.colors.grey[600]}`,
    borderRadius: theme.borderRadius.sm,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: theme.typography.fontSize.xs,
    cursor: 'pointer',
    transition: `all ${theme.animations.duration.normal}`,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  };

  const codeContainerStyles: React.CSSProperties = {
    maxHeight,
    overflow: 'auto',
    backgroundColor: theme.colors.grey[900],
  };

  const preStyles: React.CSSProperties = {
    margin: 0,
    padding: theme.spacing.lg,
    color: theme.colors.grey[100],
    lineHeight: theme.typography.lineHeight.relaxed,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  const lineNumberStyles: React.CSSProperties = {
    display: 'table-cell',
    paddingRight: theme.spacing.md,
    color: theme.colors.grey[500],
    textAlign: 'right',
    userSelect: 'none',
    borderRight: `1px solid ${theme.colors.grey[700]}`,
    paddingLeft: theme.spacing.md,
    minWidth: '40px',
  };

  const codeLineStyles: React.CSSProperties = {
    display: 'table-cell',
    paddingLeft: theme.spacing.md,
    width: '100%',
  };

  const renderCodeWithLineNumbers = () => {
    const lines = children.split('\n');
    return (
      <div style={{ display: 'table', width: '100%' }}>
        {lines.map((line, index) => (
          <div key={index} style={{ display: 'table-row' }}>
            <div style={lineNumberStyles}>{index + 1}</div>
            <div style={codeLineStyles}>{line || ' '}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={containerStyles}>
      {(title || filename || language || showCopy) && (
        <div style={headerStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            {(title || filename) && (
              <h4 style={titleStyles}>
                {filename && <span>📄 {filename}</span>}
                {title && !filename && title}
                {title && filename && ` - ${title}`}
              </h4>
            )}
            {language && (
              <span style={languageBadgeStyles}>
                {language}
              </span>
            )}
          </div>
          
          {showCopy && (
            <button
              onClick={handleCopy}
              style={copyButtonStyles}
              onMouseOver={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = theme.colors.grey[700];
                  e.currentTarget.style.borderColor = theme.colors.grey[500];
                }
              }}
              onMouseOut={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = theme.colors.grey[600];
                }
              }}
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}
      
      <div style={codeContainerStyles}>
        <pre style={preStyles}>
          {showLineNumbers ? renderCodeWithLineNumbers() : children}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;