import { ReactNode } from 'react';

// Forward declare types to avoid circular imports
interface Example {
  title: string;
  description: string;
  component: ReactNode;
  code: string;
}

interface PropDefinition {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
}

interface PropsSection {
  title: string;
  props: PropDefinition[];
  color?: string;
}

interface NavigationLink {
  href: string;
  label: string;
}

interface BestPracticeItem {
  text: string;
  description?: string;
}

interface BestPracticesData {
  dos: BestPracticeItem[];
  donts: BestPracticeItem[];
  tips?: BestPracticeItem[];
}

interface UseCase {
  title: string;
  description: string;
  examples: string[];
  icon: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  requirements: string[];
  hints?: string[];
}

// Types for component interfaces

// Guide Header Types
export interface GuideHeaderProps {
  title: string;
  subtitle: string;
  icon: string;
}

// Guide Navigation Types
export interface GuideNavigationProps {
  navigationLinks?: {
    prev?: NavigationLink;
    next?: NavigationLink;
  };
}

// Example Navigation Types
export interface ExampleNavigationProps {
  examples: Record<string, Example>;
  selectedExample: string;
  onExampleChange: (example: string) => void;
}

// Demo Code Split Types
export interface DemoCodeSplitProps {
  example: Example;
  selectedExample: string;
  onMapReset?: () => void;
}

// Props Table Types
export interface PropsTableProps {
  title: string;
  sections: PropsSection[];
}

// Styling Customization Types
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

// Best Practices Types
export interface SimplifiedBestPracticesProps {
  dos: BestPracticeItem[];
  donts: BestPracticeItem[];
  tips?: BestPracticeItem[];
}

// Use Cases Types
export interface SimplifiedUseCasesProps {
  cases: UseCase[];
}

// Tasks Types
export interface TasksProps {
  tasks: Task[];
}

// Guide Layout Types
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
}

// Map Container Types
export interface MapContainerProps {
  children: ReactNode;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  style?: React.CSSProperties;
}