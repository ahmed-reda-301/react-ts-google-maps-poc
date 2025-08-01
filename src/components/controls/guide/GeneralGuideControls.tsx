import React from 'react';

interface ControlSection {
  title: string;
  content: React.ReactNode;
  condition?: boolean;
}

interface GeneralGuideControlsProps {
  selectedExample: string;
  controlSections: Record<string, ControlSection[]>;
}

const GeneralGuideControls: React.FC<GeneralGuideControlsProps> = ({
  selectedExample,
  controlSections
}) => {
  const currentSections = controlSections[selectedExample] || [];

  return (
    <div className="controls-panel">
      {currentSections.map((section, index) => {
        // Check if section should be rendered based on condition
        if (section.condition !== undefined && !section.condition) {
          return null;
        }

        return (
          <div key={index} className="control-section">
            {section.content}
          </div>
        );
      })}
    </div>
  );
};

export default GeneralGuideControls;