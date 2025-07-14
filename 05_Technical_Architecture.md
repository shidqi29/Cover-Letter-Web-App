# Technical Architecture - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document outlines the technical architecture for the Cover Letter Web Application, following RUP methodology standards and reflecting the current implementation.

## System Architecture Overview

### Architecture Pattern

The application follows a **Modern Full-Stack Architecture** with these key patterns:

1. **Presentation Layer**: React-based frontend with Next.js App Router
2. **API Layer**: Next.js API routes with serverless functions
3. **Service Layer**: External AI services and document processing utilities
4. **Client-Side Processing**: Enhanced browser-based file handling and validation

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Client Browser                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    React Frontend (Next.js 13)                  │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ Template    │ │ Generation  │ │ Result      │ │ Download    │ │   │
│  │  │ Selection   │ │ Form        │ │ Display     │ │ Components  │ │   │
│  │  │ & Preview   │ │ Components  │ │ & Switcher  │ │             │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ File Upload │ │ Quality     │ │ Progress    │ │ Streaming   │ │   │
│  │  │ & Preview   │ │ Indicators  │ │ Tracking    │ │ Display     │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────────────┐ │   │
│  │  │             State Management (React Hooks)                  │ │   │
│  │  │ • Template Selection State  • File Processing State        │ │   │
│  │  │ • Quality Assessment State  • Generation Progress State    │ │   │
│  │  └─────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                               HTTPS/TLS 1.3
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                        Next.js Server (Vercel/Node.js)                 │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      API Routes Layer                           │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ /generate   │ │ File        │ │ Quality     │ │ Template    │ │   │
│  │  │ Endpoint    │ │ Processing  │ │ Assessment  │ │ Switching   │ │   │
│  │  │ (Streaming) │ │ APIs        │ │ APIs        │ │ APIs        │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Service Layer                                │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ Template    │ │ Document    │ │ Quality     │ │ AI Content  │ │   │
│  │  │ Engine      │ │ Processing  │ │ Assessment  │ │ Generation  │ │   │
│  │  │ System      │ │ (PDF/DOCX)  │ │ Engine      │ │ Service     │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ Link        │ │ Content     │ │ File        │ │ Streaming   │ │   │
│  │  │ Validation  │ │ Validation  │ │ Upload      │ │ Response    │ │   │
│  │  │ Service     │ │ Service     │ │ Handler     │ │ Manager     │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                           External Service APIs
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                          External Services                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                       OpenAI API                                │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ GPT-4       │ │ Vision API  │ │ Web Search  │ │ Chat        │ │   │
│  │  │ Text        │ │ (Image OCR  │ │ (Job URL    │ │ Completions │ │   │
│  │  │ Generation  │ │ Processing) │ │ Processing) │ │ Streaming   │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Job Posting Websites                         │   │
│  │  LinkedIn • Indeed • JobStreet • Glassdoor • Company Websites   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

#### 1. Page Components

- **`page.tsx` (Homepage)**: Template selection interface with CDC branding
- **`generate/page.tsx`**: Generation form with template context
- **`generate/result/page.tsx`**: Result display with template switching capabilities
- **`layout.tsx`**: Root layout with global styles and metadata

#### 2. Core Form Components

- **`CoverLetterForm`**: Main generation form with dual input methods (image/URL)
- **`TemplateSelection`**: Interactive template selection with visual previews
- **`TemplatePreview`**: Modal component showing detailed template formatting
- **`TemplatePreviewCard`**: Individual template cards with style indicators
- **`TemplateSwitcher`**: Result page template switching with content preservation
- **`TemplateComparison`**: Side-by-side template comparison functionality

#### 3. Input & Quality Components

- **`InputQualityIndicator`**: Visual status indicators (Good/Fair/Poor/Unknown)
- **`AdaptiveContentBanner`**: Dynamic quality tips and recommendations
- **`ProgressIndicator`**: Multi-stage progress tracking with visual feedback
- **`StreamingText`**: Real-time text display with typewriter effect

#### 4. Output & Download Components

- **`DownloadButton`**: Multi-format download with template-specific styling
- **File generation utilities**: PDF and DOCX creation with template formatting

#### 5. UI Components (shadcn/ui based)

- **`Button`**: Consistent button styling with variants
- **`Card`**: Content containers for templates and information
- **`Dialog`**: Modal dialogs for previews and confirmations
- **`Input`**: Form input components with validation states
- **`RadioGroup`**: Input method selection (Image/URL)
- **`Badge`**: Status indicators and labels
- **`Tooltip`**: Contextual help and information

### Backend Architecture

#### 1. API Routes Structure

```typescript
/api/generate/route.ts    // Main generation endpoint with streaming
├── POST: Generate cover letter
├── Handles: Image OCR, URL scraping, CV parsing
├── Returns: Streaming text response
└── Features: Quality assessment, template-aware generation

/api/helpers/             // Helper API endpoints (if needed)
├── URL validation
├── File processing status
└── Quality assessment endpoints
```

#### 2. Core Service Libraries

**`src/lib/document-utils.ts`**

- File processing and text extraction
- Quality assessment algorithms
- Smart filename generation
- Template-aware content formatting

**`src/lib/link-validation.ts`**

- Real-time URL validation
- Job site source detection
- Link format verification
- Platform compatibility checking

**`src/types/templates.ts`**

- Template type definitions
- Template configuration objects
- Style and formatting specifications

**`src/lib/utils.ts`**

- General utility functions
- Class name utilities (clsx/tailwind-merge)
- Common helper functions

#### 3. Document Processing Pipeline

```typescript
// Image Processing Flow
Image Upload → File Validation → Base64 Conversion → OpenAI Vision API → Text Extraction

// URL Processing Flow
URL Input → Format Validation → Source Detection → OpenAI Web Search → Content Extraction

// CV Processing Flow
CV Upload → Format Detection → PDF/DOCX Parser → Text Extraction → Quality Assessment

// Generation Flow
Extracted Data → Quality Analysis → Template Context → OpenAI Generation → Streaming Response
```

### Template System Architecture

#### 1. Template Definition Structure

```typescript
interface CoverLetterTemplate {
  id: string;                    // 'professional' | 'modern' | 'creative'
  name: string;                 // Display name
  description: string;          // Template description
  preview: string;              // Preview text
  style: 'professional' | 'creative' | 'modern';
}
```

#### 2. Template Processing Flow

```
Template Selection → Context Preservation → AI Generation with Template Instructions →
Formatting Application → Document Generation → Template Switching Support
```

#### 3. Template-Specific Features

- **Professional Template**: Traditional business formatting, formal tone, structured layout
- **Modern Template**: Contemporary design, balanced tone, clean formatting
- **Creative Template**: Expressive styling, personality-focused, industry-adapted formatting

## Data Flow Architecture

### Complete User Journey Data Flow

```
Homepage Load → Template Selection → Form Load → Input Processing →
Quality Assessment → Generation → Streaming Display → Template Operations → Download
      │               │              │               │                │              │
      ▼               ▼              ▼               ▼                ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│Template     │ │Template     │ │File/URL     │ │Content      │ │OpenAI API   │ │Document     │
│Cards        │ │Preview      │ │Validation   │ │Extraction   │ │Generation   │ │Generation   │
│Display      │ │Modal        │ │& Quality    │ │& Quality    │ │with Template│ │with Template│
│             │ │             │ │Assessment   │ │Analysis     │ │Context      │ │Formatting   │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

### Request Processing Pipeline

1. **Template Selection Phase**

   - Load template definitions from `types/templates.ts`
   - Display interactive template cards with previews
   - Handle template preview modal display
   - Store selected template in URL parameters

2. **Input Collection Phase**

   - Render generation form with selected template context
   - Handle dual input methods (image upload vs URL input)
   - Perform real-time validation and quality assessment
   - Display visual quality indicators and adaptive guidance

3. **Processing Phase**

   - Extract content from images using OpenAI Vision API
   - Extract job information from URLs using OpenAI Web Search
   - Parse CV documents using PDF/DOCX libraries
   - Assess overall input quality and provide feedback

4. **Generation Phase**

   - Combine extracted data with template-specific instructions
   - Call OpenAI API with streaming enabled
   - Display real-time generation progress
   - Apply template-specific formatting and styling

5. **Output Phase**

   - Display generated content with template styling
   - Enable template switching with content preservation
   - Provide multi-format download options
   - Generate smart filenames based on content analysis

   - Real-time input quality analysis
   - Color-coded indicators (green/yellow/red)
   - Adaptive content banners with improvement tips
   - Generation mode selection based on quality

6. **Content Extraction**

   - Image text extraction via OCR
   - PDF/DOCX text parsing
   - Web content scraping with source detection

7. **Template-Aware AI Processing**

   - Template-specific prompt engineering
   - OpenAI API integration with template context
   - Response streaming with formatting

8. **Template Application & Output Generation**
   - Apply selected template styling to content
   - Template-specific formatting for downloads
   - Content-preserving template switching capability

## Technology Stack

### Frontend Technologies

| Component        | Technology   | Version  | Purpose                         |
| ---------------- | ------------ | -------- | ------------------------------- |
| Framework        | Next.js      | 14.x     | React framework with SSR        |
| UI Library       | React        | 18.x     | Component-based UI              |
| Styling          | Tailwind CSS | 3.x      | Utility-first CSS               |
| UI Components    | shadcn/ui    | Latest   | Pre-built accessible components |
| State Management | React Hooks  | Built-in | Local state management          |
| Type Safety      | TypeScript   | 5.x      | Static type checking            |
| Icons            | Lucide React | Latest   | Consistent icon library         |
| Notifications    | Sonner       | Latest   | Toast notifications             |
| Build Tool       | Webpack      | Built-in | Module bundling                 |

### Backend Technologies

| Component           | Technology  | Version | Purpose                      |
| ------------------- | ----------- | ------- | ---------------------------- |
| Runtime             | Node.js     | 18.x    | JavaScript runtime           |
| Framework           | Next.js API | 14.x    | API route handling           |
| AI Integration      | OpenAI API  | 4.x     | Template-aware generation    |
| File Processing     | pdf-parse   | Latest  | PDF text extraction          |
| Document Generation | docx        | Latest  | Template-aware DOCX creation |
| PDF Generation      | jsPDF       | Latest  | Template-aware PDF creation  |
| OCR Processing      | Tesseract   | Latest  | Image text extraction        |

### Development Tools

| Tool       | Purpose         | Configuration           |
| ---------- | --------------- | ----------------------- |
| ESLint     | Code linting    | Standard config         |
| Prettier   | Code formatting | Standard config         |
| TypeScript | Type checking   | Strict mode             |
| Git        | Version control | Feature branch workflow |

## Integration Architecture

### External API Integration

#### OpenAI API Integration with Template Context

```typescript
// Template-Aware API Configuration
const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4",
  maxTokens: 2000,
  temperature: 0.7
}

// Template-Specific Prompt Engineering
const generateTemplatePrompt = (jobInfo: string, cvInfo: string, template: string) => {
  const templateContext = {
    professional: "formal, conservative tone with traditional business language",
    modern: "contemporary, balanced tone with clean, direct communication",
    creative: "engaging, dynamic tone that showcases personality and innovation"
  };

  return `Generate a cover letter with ${templateContext[template]} style...`;
};

// Streaming Response Handler with Template Context
const streamResponse = async (prompt: string, template: string) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: `You are generating content for a ${template} cover letter template.` },
      { role: "user", content: prompt }
    ],
    stream: true
  });

  // Stream chunks to frontend with template metadata
  for await (const chunk of stream) {
    yield {
      content: chunk.choices[0]?.delta?.content || '',
      template: template,
      timestamp: Date.now()
    };
  }
}
```

#### Quality Assessment Integration

```typescript
// Real-time Quality Assessment
const assessInputQuality = (inputType: 'image' | 'link', data: any) => {
  let qualityScore = 0;
  let indicator: 'red' | 'yellow' | 'green' = 'red';

  if (inputType === 'image') {
    // Assess image quality factors
    qualityScore = assessImageQuality(data);
  } else {
    // Assess link quality factors
    qualityScore = assessLinkQuality(data);
  }

  if (qualityScore >= 80) indicator = 'green';
  else if (qualityScore >= 50) indicator = 'yellow';

  return { score: qualityScore, indicator, tips: getQualityTips(qualityScore) };
};

// Template Switching with Content Preservation
const switchTemplate = (content: string, newTemplate: string) => {
  // Preserve content completely unchanged
  const preservedContent = content;

  // Update URL parameters for template context
  const updatedParams = {
    content: encodeURIComponent(preservedContent),
    template: newTemplate
  };

  return { content: preservedContent, template: newTemplate, params: updatedParams };
};
```

#### File Processing Integration with Quality Assessment

```typescript
// Enhanced File Upload Handler with Quality Assessment
const processFile = async (file: File) => {
  const fileType = file.type;
  const fileSize = file.size;
  let extractedText = '';
  let qualityAssessment = { score: 0, indicator: 'red' as const, tips: [] };

  // Assess file quality before processing
  qualityAssessment = assessFileQuality(file);

  switch (fileType) {
    case 'application/pdf':
      extractedText = await extractPDFText(file);
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      extractedText = await extractDOCXText(file);
      break;
    case 'image/jpeg':
    case 'image/png':
      extractedText = await extractImageText(file);
      break;
  }

  return { text: extractedText, quality: qualityAssessment };
};

// Template-Aware Document Generation
const generateDocument = async (content: string, template: string, format: 'pdf' | 'docx') => {
  const templateConfig = COVER_LETTER_TEMPLATES.find(t => t.id === template);

  if (format === 'pdf') {
    return generatePDFWithTemplate(content, templateConfig);
  } else {
    return generateDOCXWithTemplate(content, templateConfig);
  }
};
```

## Security Architecture

### Security Layers

1. **Transport Security**

   - HTTPS/TLS 1.3 encryption
   - Secure headers configuration
   - CORS policy enforcement

2. **Input Security**

   - File type validation
   - File size limitations
   - Content sanitization
   - URL validation

3. **API Security**

   - Rate limiting implementation
   - API key management
   - Request validation

4. **Data Security**
   - Temporary file cleanup
   - No persistent data storage
   - Memory cleanup after processing

### Security Implementation

```typescript
// Rate Limiting with Template Operations
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  // Different limits for different operations
  skipSuccessfulRequests: true
});

// Enhanced File Validation with Quality Checks
const validateFile = (file: File) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB for images, 5MB for documents

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  const sizeLimit = file.type.startsWith('image/') ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > sizeLimit) {
    throw new Error('File too large');
  }

  // Additional security checks for image files
  if (file.type.startsWith('image/')) {
    validateImageIntegrity(file);
  }
};

// Template Security Validation
const validateTemplateOperation = (templateId: string, operation: string) => {
  const allowedTemplates = ['professional', 'modern', 'creative'];
  const allowedOperations = ['select', 'preview', 'switch', 'download'];

  if (!allowedTemplates.includes(templateId) || !allowedOperations.includes(operation)) {
    throw new Error('Invalid template operation');
  }
};
```

## Performance Architecture

### Performance Optimization Strategies

1. **Frontend Optimization**

   - Component lazy loading for template previews
   - Template asset optimization and caching
   - Image optimization for template previews
   - Bundle size optimization with code splitting
   - Real-time indicator caching strategies

2. **Backend Optimization**

   - Streaming responses for AI generation
   - Template-aware caching for repeated operations
   - Asynchronous quality assessment processing
   - Memory management for template operations
   - Connection pooling for external APIs

3. **Network Optimization**
   - Compression (gzip/brotli) for template assets
   - CDN integration potential for template resources
   - Efficient API design with template context
   - Minimal payload sizes for quality indicators
   - Optimized template switching operations

### Caching Strategy

```typescript
// Enhanced Response Caching with Template Support
const cacheConfig = {
  'text/html': 'no-cache',
  'application/json': 'no-cache',
  'application/pdf': 'private, max-age=3600',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'private, max-age=3600',
  // Template-specific caching
  'template-preview': 'public, max-age=86400', // 24 hours
  'quality-assessment': 'private, max-age=300' // 5 minutes
};

// Template Preview Caching
const templatePreviewCache = new Map();
const getCachedTemplatePreview = (templateId: string) => {
  return templatePreviewCache.get(templateId);
};
```

## Scalability Considerations

### Horizontal Scaling Preparation

1. **Stateless Design**

   - No server-side session storage
   - Functional component architecture with template context
   - Immutable data patterns for template operations
   - Template state managed client-side

2. **Load Balancing Ready**

   - Health check endpoints
   - Graceful shutdown handling
   - Connection draining
   - Template resource distribution

3. **Database Preparation**
   - NoSQL document structure ready for template metadata
   - Read replica architecture for template assets
   - Caching layer integration for quality assessments

### Vertical Scaling Optimization

1. **Resource Efficiency**

   - Memory leak prevention in template operations
   - CPU optimization for quality assessment algorithms
   - I/O optimization for template switching
   - Efficient template asset loading

2. **Monitoring Integration**
   - Performance metrics for template operations
   - Error tracking for quality assessment failures
   - Resource usage monitoring for AI operations
   - Template switching performance analytics

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Updated: June 23, 2025 - Reflects current implementation with visual template system, real-time quality assessment, content-preserving template switching, enhanced security, and optimized performance for template operations_
