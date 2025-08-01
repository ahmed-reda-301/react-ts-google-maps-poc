import React from 'react';
import GuideHeader from './GuideHeader';
import ExampleNavigation from './ExampleNavigation';
import DemoCodeSplit from './DemoCodeSplit';
import PropsTable from './PropsTable';
import SimplifiedBestPractices from './SimplifiedBestPractices';
import SimplifiedUseCases from './SimplifiedUseCases';
import Tasks from './Tasks';
import GuideNavigation from './GuideNavigation';
import StylingCustomization from './StylingCustomization';
import GeneralGuideControls from '../controls/guide/GeneralGuideControls';
import { GuideLayoutProps } from '../../types/guide';

const GuideLayout: React.FC<GuideLayoutProps> = ({
  title,
  subtitle,
  icon,
  examples,
  selectedExample,
  onExampleChange,
  propsData,
  bestPractices,
  useCases,
  tasks,
  navigationLinks,
  children,
  onMapReset,
  stylingExamples,
  controlSections
}) => {
  const currentExample = examples[selectedExample];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '0'
    }}>
      <GuideHeader title={title} subtitle={subtitle} icon={icon} />

      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '20px' }}>
        <ExampleNavigation
          examples={examples}
          selectedExample={selectedExample}
          onExampleChange={onExampleChange}
        />

        {/* Controls above the map - integrated GeneralGuideControls */}
        <div style={{ 
          paddingBottom: '5px',
          maxHeight: '150px',
          overflow: 'auto'
        }}>
          {controlSections ? (
            <GeneralGuideControls
              selectedExample={selectedExample}
              controlSections={controlSections}
            />
          ) : (
            children
          )}
        </div>

        <DemoCodeSplit 
          example={currentExample} 
          selectedExample={selectedExample}
          onMapReset={onMapReset}
        />

        <PropsTable
          title={propsData.title}
          sections={propsData.sections}
        />

        {stylingExamples && stylingExamples.length > 0 && (
          <StylingCustomization
            title="Styling & Customization"
            examples={stylingExamples}
          />
        )}

        <SimplifiedBestPractices
          dos={bestPractices.dos}
          donts={bestPractices.donts}
          tips={bestPractices.tips}
        />

        <SimplifiedUseCases cases={useCases} />

        {tasks && tasks.length > 0 && (
          <Tasks tasks={tasks} />
        )}

        <GuideNavigation navigationLinks={navigationLinks} />
      </div>
    </div>
  );
};

export default GuideLayout;