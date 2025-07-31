import React, { useState } from "react";
import { PropsTableProps } from '../../types/guide';

const PropsTable: React.FC<PropsTableProps> = ({ title, sections }) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set() // Start with all sections collapsed
  );

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(sections.map((_, index) => index))); // Expand all sections
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#333', 
          fontSize: '20px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📋 {title}
        </h3>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={expandAll}
            style={{
              padding: '6px 12px',
              backgroundColor: '#e3f2fd',
              color: '#1565c0',
              border: '1px solid #bbdefb',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#bbdefb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e3f2fd';
            }}
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            style={{
              padding: '6px 12px',
              backgroundColor: '#fce4ec',
              color: '#c2185b',
              border: '1px solid #f8bbd9',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8bbd9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fce4ec';
            }}
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Unified Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white'
        }}>
          {/* Table Header */}
          <thead>
            <tr style={{
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #dee2e6'
            }}>
              <th style={{
                padding: '16px 20px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '15%'
              }}>
                Property
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '20%'
              }}>
                Type
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '40%'
              }}>
                Description
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'center',
                fontWeight: '600',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '10%'
              }}>
                Required
              </th>
              <th style={{
                padding: '16px 20px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '20%'
              }}>
                Default
              </th>
            </tr>
          </thead>
          
          <tbody>
            {sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {/* Section Header Row */}
                <tr>
                  <td 
                    colSpan={5} 
                    style={{
                      padding: '0',
                      border: 'none'
                    }}
                  >
                    <div
                      onClick={() => toggleSection(sectionIndex)}
                      style={{
                        padding: '16px 20px',
                        backgroundColor: section.color ? `${section.color}15` : '#f8f9fa',
                        borderLeft: `4px solid ${section.color || '#6c757d'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                        borderTop: sectionIndex > 0 ? '1px solid #e9ecef' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = section.color ? `${section.color}25` : '#e9ecef';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = section.color ? `${section.color}15` : '#f8f9fa';
                      }}
                    >
                      <h4 style={{
                        margin: 0,
                        color: section.color || '#495057',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          backgroundColor: section.color || '#6c757d',
                          borderRadius: '50%'
                        }} />
                        {section.title}
                        <span style={{
                          fontSize: '12px',
                          color: '#6c757d',
                          fontWeight: '400',
                          marginLeft: '8px',
                          padding: '2px 8px',
                          backgroundColor: 'rgba(108, 117, 125, 0.1)',
                          borderRadius: '12px'
                        }}>
                          {section.props.length} prop{section.props.length !== 1 ? 's' : ''}
                        </span>
                      </h4>
                      
                      <span style={{
                        fontSize: '18px',
                        color: section.color || '#6c757d',
                        transform: expandedSections.has(sectionIndex) ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}>
                        ▶
                      </span>
                    </div>
                  </td>
                </tr>

                {/* Section Props Rows */}
                {expandedSections.has(sectionIndex) && section.props.map((prop: any, propIndex: number) => (
                  <tr
                    key={`${sectionIndex}-${propIndex}`}
                    style={{
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* Property Name */}
                    <td style={{
                      padding: '16px 20px',
                      verticalAlign: 'top',
                      borderLeft: `3px solid ${section.color || '#e9ecef'}`
                    }}>
                      <code style={{
                        backgroundColor: '#e3f2fd',
                        color: '#1565c0',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                        wordBreak: 'break-word',
                        display: 'inline-block'
                      }}>
                        {prop.name}
                      </code>
                    </td>

                    {/* Type */}
                    <td style={{
                      padding: '16px 20px',
                      verticalAlign: 'top'
                    }}>
                      <code style={{
                        backgroundColor: '#f3e5f5',
                        color: '#7b1fa2',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                        wordBreak: 'break-all',
                        display: 'inline-block',
                        lineHeight: '1.4',
                        maxWidth: '100%'
                      }}>
                        {prop.type}
                      </code>
                    </td>

                    {/* Description */}
                    <td style={{
                      padding: '16px 20px',
                      verticalAlign: 'top',
                      lineHeight: '1.6'
                    }}>
                      <div style={{
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        {prop.description}
                      </div>
                    </td>

                    {/* Required */}
                    <td style={{
                      padding: '16px 20px',
                      textAlign: 'center',
                      verticalAlign: 'top'
                    }}>
                      {prop.required ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#ffebee',
                          color: '#d32f2f',
                          borderRadius: '50%',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          border: '2px solid #ffcdd2'
                        }}>
                          ✓
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#f5f5f5',
                          color: '#9e9e9e',
                          borderRadius: '50%',
                          fontSize: '14px',
                          border: '2px solid #e0e0e0'
                        }}>
                          -
                        </span>
                      )}
                    </td>

                    {/* Default Value */}
                    <td style={{
                      padding: '16px 20px',
                      verticalAlign: 'top'
                    }}>
                      {prop.defaultValue ? (
                        <code style={{
                          backgroundColor: '#fff3e0',
                          color: '#e65100',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                          wordBreak: 'break-word',
                          display: 'inline-block'
                        }}>
                          {prop.defaultValue}
                        </code>
                      ) : (
                        <span style={{
                          color: '#9e9e9e',
                          fontSize: '12px',
                          fontStyle: 'italic'
                        }}>
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div style={{
        marginTop: '16px',
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#6c757d'
        }}>
          <strong>Total:</strong> {sections.reduce((total, section) => total + section.props.length, 0)} properties across {sections.length} section{sections.length !== 1 ? 's' : ''}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          fontSize: '12px',
          color: '#6c757d'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#ffebee',
              borderRadius: '50%',
              border: '2px solid #ffcdd2'
            }} />
            Required
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '50%',
              border: '2px solid #e0e0e0'
            }} />
            Optional
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropsTable;