import { ReactNode } from 'react';

// Core data types - defined first so they can be imported by other modules
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

// Common utility types
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ExampleType = 'basic' | 'interactive' | 'advanced' | 'customStyling' | 'multiple' | 'animated' | 'draggable' | 'richContent' | 'markerBased';
export type ComponentColor = { name: string; value: string };

// Re-export all types from different modules - after core types are defined
export * from './components';
export * from '../../../types/controls';