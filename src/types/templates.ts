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
    name: 'Profesional',
    description: 'Template surat lamaran formal tradisional yang cocok untuk lingkungan korporat dan perusahaan mapan.',
    preview: 'Format bisnis klasik dengan paragraf terstruktur dan nada formal.',
    style: 'professional'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Template kontemporer dengan desain bersih dan nada profesional-kasual yang seimbang.',
    preview: 'Pendekatan segar dengan bagian ringkas dan gaya bahasa modern.',
    style: 'modern'
  },
  {
    id: 'creative',
    name: 'Kreatif',
    description: 'Template ekspresif untuk industri kreatif dengan kepribadian dan ciri khas.',
    preview: 'Gaya narasi menarik dengan format kreatif dan sentuhan personal.',
    style: 'creative'
  }
];
