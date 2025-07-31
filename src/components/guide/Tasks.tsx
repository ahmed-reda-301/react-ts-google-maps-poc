import React, { useState } from 'react';
import { TasksProps, Task } from '../../types/guide';

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return '#28a745';
      case 'intermediate':
        return '#ffc107';
      case 'advanced':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getDifficultyIcon = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return '🟢';
      case 'intermediate':
        return '🟡';
      case 'advanced':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  if (tasks.length === 0) {
    return null;
  }

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
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '8px 0',
          marginBottom: isExpanded ? '20px' : '0'
        }}
      >
        <h3 style={{ 
          margin: 0, 
          color: '#333', 
          fontSize: '20px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🎯 Practical Tasks
          <span style={{
            fontSize: '12px',
            color: '#6c757d',
            fontWeight: '400',
            padding: '2px 8px',
            backgroundColor: 'rgba(108, 117, 125, 0.1)',
            borderRadius: '12px'
          }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </span>
        </h3>
        
        <span style={{
          fontSize: '18px',
          color: '#6c757d',
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▶
        </span>
      </div>

      {/* Quick Summary */}
      {!isExpanded && (
        <div>
          <p style={{ 
            margin: '12px 0 16px 0', 
            color: '#6c757d', 
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Complete these hands-on tasks to master the component. Each task builds your practical skills step by step.
          </p>
          
          {/* Difficulty Distribution */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {['beginner', 'intermediate', 'advanced'].map(difficulty => {
              const count = tasks.filter(task => task.difficulty === difficulty).length;
              if (count === 0) return null;
              
              return (
                <div key={difficulty} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: `${getDifficultyColor(difficulty as Task['difficulty'])}15`,
                  borderRadius: '16px',
                  fontSize: '14px',
                  color: getDifficultyColor(difficulty as Task['difficulty']),
                  border: `2px solid ${getDifficultyColor(difficulty as Task['difficulty'])}30`,
                  fontWeight: '500'
                }}>
                  {getDifficultyIcon(difficulty as Task['difficulty'])}
                  <span>{count} {difficulty}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div>
          <p style={{ 
            margin: '0 0 20px 0', 
            color: '#6c757d', 
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Complete these hands-on tasks to master the component. Each task builds your practical skills step by step.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tasks.map((task, index) => {
              const isTaskExpanded = expandedTask === task.id;
              const difficultyColor = getDifficultyColor(task.difficulty);
              
              return (
                <div
                  key={task.id}
                  style={{
                    border: `2px solid ${isTaskExpanded ? difficultyColor : '#e0e0e0'}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    backgroundColor: isTaskExpanded ? `${difficultyColor}05` : 'white',
                    boxShadow: isTaskExpanded ? `0 4px 20px ${difficultyColor}20` : '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Task Header */}
                  <div
                    style={{
                      padding: '20px',
                      cursor: 'pointer',
                      backgroundColor: isTaskExpanded ? `${difficultyColor}10` : 'transparent',
                      borderBottom: isTaskExpanded ? `1px solid ${difficultyColor}30` : 'none',
                      transition: 'background-color 0.3s ease'
                    }}
                    onClick={() => handleTaskToggle(task.id)}
                    onMouseEnter={(e) => {
                      if (!isTaskExpanded) {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isTaskExpanded) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                        {/* Task Number */}
                        <div style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: difficultyColor,
                          color: 'white',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {index + 1}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h4 style={{ 
                            margin: '0 0 8px 0', 
                            color: '#333',
                            fontSize: '16px',
                            fontWeight: '600'
                          }}>
                            {task.title}
                          </h4>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px' }}>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              color: difficultyColor,
                              fontWeight: '600',
                              padding: '4px 8px',
                              backgroundColor: `${difficultyColor}20`,
                              borderRadius: '12px'
                            }}>
                              {getDifficultyIcon(task.difficulty)}
                              {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                            </div>
                            
                            <div style={{ 
                              color: '#6c757d',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              ⏱️ {task.estimatedTime}
                            </div>

                            <div style={{ 
                              color: '#6c757d',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              📋 {task.requirements.length} requirement{task.requirements.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ 
                          fontSize: '16px', 
                          color: difficultyColor,
                          transform: isTaskExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}>
                          ▶
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Task Details */}
                  {isTaskExpanded && (
                    <div style={{ padding: '24px' }}>
                      {/* Description */}
                      <div style={{ marginBottom: '20px' }}>
                        <h5 style={{ 
                          margin: '0 0 12px 0', 
                          color: difficultyColor,
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          📋 Task Description
                        </h5>
                        <p style={{ 
                          margin: '0', 
                          color: '#495057', 
                          lineHeight: '1.6',
                          fontSize: '14px',
                          padding: '12px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px',
                          border: '1px solid #e9ecef'
                        }}>
                          {task.description}
                        </p>
                      </div>

                      {/* Requirements */}
                      <div style={{ marginBottom: task.hints && task.hints.length > 0 ? '20px' : '0' }}>
                        <h5 style={{ 
                          margin: '0 0 12px 0', 
                          color: difficultyColor,
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          ✅ Requirements
                        </h5>
                        <div style={{
                          backgroundColor: '#e8f5e8',
                          border: '1px solid #c3e6cb',
                          borderRadius: '8px',
                          padding: '12px'
                        }}>
                          <ul style={{ margin: '0', paddingLeft: '20px', color: '#155724' }}>
                            {task.requirements.map((req, idx) => (
                              <li key={idx} style={{ marginBottom: '6px', fontSize: '14px' }}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Hints */}
                      {task.hints && task.hints.length > 0 && (
                        <div>
                          <h5 style={{ 
                            margin: '0 0 12px 0', 
                            color: difficultyColor,
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            💡 Helpful Hints
                          </h5>
                          <div style={{
                            backgroundColor: '#fff3cd',
                            border: '1px solid #ffeaa7',
                            borderRadius: '8px',
                            padding: '12px'
                          }}>
                            <ul style={{ margin: '0', paddingLeft: '20px', color: '#856404' }}>
                              {task.hints.map((hint, idx) => (
                                <li key={idx} style={{ marginBottom: '6px', fontSize: '14px' }}>{hint}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default Tasks;