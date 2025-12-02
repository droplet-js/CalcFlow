// Supported languages
export type LangCode = 'en' | 'zh-CN';

// Input Field Definition
export interface CalculatorInput {
  id: string;
  type: 'number' | 'select' | 'date' | 'time';
  label: Record<LangCode, string>;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  defaultValue?: number | string;
  options?: { value: string; label: Record<LangCode, string> }[]; // For select types
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

// Output Field Definition
export interface CalculatorOutput {
  id: string;
  label: Record<LangCode, string>;
  type: 'score' | 'category' | 'currency' | 'text';
  unit?: string;
}

// SEO and Content Metadata
export interface CalculatorContent {
  title: Record<LangCode, string>;
  description: Record<LangCode, string>;
  article: Record<LangCode, string>; // HTML/Markdown string
  formula?: Record<LangCode, string>; // Display formula
}

// The Core Calculator Config
export interface CalculatorConfig {
  slug: string;
  category: string;
  icon: string; // SVG path data or name
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  content: CalculatorContent;
  // The logic function: takes input map, returns output map
  calculate: (inputs: Record<string, any>) => Record<string, any>;
}