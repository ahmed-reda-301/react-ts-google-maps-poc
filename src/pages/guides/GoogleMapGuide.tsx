import React from 'react';
import GuideLayout from '../../components/guide/GuideLayout';
import { googleMapGuideData } from '../../data/guide/googleMapGuideData';
import { useGuideState } from '../../hooks/useGuideState';
import { GUIDE_CONFIG } from '../../constants/guideConstants';

const GoogleMapGuide: React.FC = () => {
  const {
    selectedExample,
    mapKey,
    setSelectedExample,
    setMapKey,
  } = useGuideState();

  const handleMapReset = () => {
    setMapKey();
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