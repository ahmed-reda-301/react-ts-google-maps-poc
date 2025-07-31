import React from 'react';

interface InfoWindowControlsProps {
  selectedExample?: string;
  formData?: {
    rating: number;
    comment: string;
  };
}

const InfoWindowControls: React.FC<InfoWindowControlsProps> = ({
  selectedExample,
  formData
}) => {
  if (selectedExample !== 'interactive' || !formData) return null;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
        📝 Interactive Form Data
      </h3>
      <p style={{ margin: '0 0 15px 0', color: '#666' }}>
        Click on the marker to open the interactive InfoWindow and submit a review.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
        <div style={{ 
          padding: '10px', 
          backgroundColor: 'white', 
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <strong>Current Rating:</strong>
          <br />
          <span style={{ fontSize: '14px', color: '#666' }}>
            {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Not rated'}
          </span>
        </div>
        
        <div style={{ 
          padding: '10px', 
          backgroundColor: 'white', 
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <strong>Comment Length:</strong>
          <br />
          <span style={{ fontSize: '14px', color: '#666' }}>
            {formData.comment.length} characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowControls;