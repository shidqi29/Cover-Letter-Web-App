export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  style: 'professional' | 'creative' | 'modern';
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A traditional, formal cover letter template suitable for corporate environments and established companies.',
    preview: 'Classic business format with structured paragraphs and formal tone.',
    style: 'professional'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary template with clean design and balanced professional-casual tone.',
    preview: 'Fresh approach with concise sections and modern language style.',
    style: 'modern'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'An expressive template for creative industries with personality and flair.',
    preview: 'Engaging narrative style with creative formatting and personal touch.',
    style: 'creative'
  }
];
