/**
 * Guide System Types
 * Unified types for the components guide system
 */

import { ReactNode } from 'react';

// Export common types
export * from './common';

// Core data types
export interface Example {
  title: string;
  description: string;
  component: ReactNode;
  code: string;
}

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
}

export interface PropsSection {
  title: string;
  props: PropDefinition[];
  color?: string;
}

export interface NavigationLink {
  href: string;
  label: string;
}

export interface BestPracticeItem {
  text: string;
  description?: string;
}

export interface BestPracticesData {
  dos: BestPracticeItem[];
  donts: BestPracticeItem[];
  tips?: BestPracticeItem[];
}

export interface UseCase {
  title: string;
  description: string;
  examples: string[];
  icon: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  requirements: string[];
  hints?: string[];
}

export interface GuidePageData {
  title: string;
  subtitle: string;
  icon: string;
  examples: Record<string, Example>;
  propsData: {
    title: string;
    sections: PropsSection[];
  };
  bestPractices: BestPracticesData;
  useCases: UseCase[];
  tasks?: Task[];
  navigationLinks?: {
    prev?: NavigationLink;
    next?: NavigationLink;
  };
}

// Component Props Types
export interface GuideHeaderProps {
  title: string;
  subtitle: string;
  icon: string;
}

export interface GuideNavigationProps {
  navigationLinks?: {
    prev?: NavigationLink;
    next?: NavigationLink;
  };
}

export interface ExampleNavigationProps {
  examples: Record<string, Example>;
  selectedExample: string;
  onExampleChange: (example: string) => void;
}

export interface DemoCodeSplitProps {
  example: Example;
  selectedExample: string;
  onMapReset?: () => void;
}

export interface PropsTableProps {
  title: string;
  sections: PropsSection[];
}

export interface StylingExample {
  title: string;
  color: string;
  code: string;
  description?: string;
}

export interface StylingCustomizationProps {
  title: string;
  examples: StylingExample[];
}

export interface SimplifiedBestPracticesProps {
  dos: BestPracticeItem[];
  donts: BestPracticeItem[];
  tips?: BestPracticeItem[];
}

export interface SimplifiedUseCasesProps {
  cases: UseCase[];
}

export interface TasksProps {
  tasks: Task[];
}

// Control section interface for GeneralGuideControls
export interface ControlSection {
  title: string;
  content: ReactNode;
  condition?: boolean;
}

export interface GuideLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  examples: Record<string, Example>;
  selectedExample: string;
  onExampleChange: (example: string) => void;
  propsData: {
    title: string;
    sections: PropsSection[];
  };
  bestPractices: BestPracticesData;
  useCases: UseCase[];
  tasks?: Task[];
  navigationLinks?: {
    prev?: NavigationLink;
    next?: NavigationLink;
  };
  children?: ReactNode;
  onMapReset?: () => void;
  stylingExamples?: StylingExample[];
  controlSections?: Record<string, ControlSection[]>;
}

export interface MapContainerProps {
  children: ReactNode;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  style?: React.CSSProperties;
}

// Common utility types
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ExampleType = 'basic' | 'interactive' | 'advanced' | 'customStyling' | 'multiple' | 'animated' | 'draggable' | 'richContent' | 'markerBased';