import React, { useState, useEffect } from 'react';
import GuideLayout from './components/GuideLayout';
import { googleMapGuideData } from './data/googleMapGuideData';

const GoogleMapGuide: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');
  const [mapKey, setMapKey] = useState(0);

  // Reset map state when example changes
  useEffect(() => {
    // This effect will trigger when selectedExample changes
    // The map will be re-rendered with fresh state
  }, [selectedExample]);

  const handleMapReset = () => {
    setMapKey(prev => prev + 1);
  };

  return (
    <GuideLayout
      title={googleMapGuideData.title}
      subtitle={googleMapGuideData.subtitle}
      icon={googleMapGuideData.icon}
      examples={googleMapGuideData.examples}
      selectedExample={selectedExample}
      onExampleChange={setSelectedExample}
      propsData={googleMapGuideData.propsData}
      bestPractices={googleMapGuideData.bestPractices}
      useCases={googleMapGuideData.useCases}
      tasks={googleMapGuideData.tasks}
      navigationLinks={googleMapGuideData.navigationLinks}
      onMapReset={handleMapReset}
    />
  );
};

export default GoogleMapGuide;