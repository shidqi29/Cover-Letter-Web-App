# Technical Architecture - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document outlines the technical architecture for the Cover Letter Web Application, following RUP methodology standards.

## System Architecture Overview

### Architecture Pattern

The application follows a **Three-Tier Architecture** pattern:

1. **Presentation Tier**: React-based frontend with Next.js framework
2. **Business Logic Tier**: Next.js API routes with server-side processing
3. **Data Tier**: External APIs and temporary file storage

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │             React Frontend                          │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │ Template    │ │ Quality     │ │ Download    │   │   │
│  │  │ System      │ │ Indicators  │ │ Components  │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │ File Upload │ │ Streaming   │ │ Template    │   │   │
│  │  │ Components  │ │ Text        │ │ Switcher    │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                           HTTPS/TLS
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Server                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               API Routes                            │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │ /generate   │ │ /validate   │ │ /download   │   │   │
│  │  │ endpoint    │ │ endpoint    │ │ endpoint    │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │             Utility Libraries                       │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │ Template    │ │ Quality     │ │ Document    │   │   │
│  │  │ Engine      │ │ Assessment  │ │ Generation  │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │   │
│  │  │ File        │ │ Link        │ │ Content     │   │   │
│  │  │ Processing  │ │ Validation  │ │ Validation  │   │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                         External APIs
                              │
┌─────────────────────────────────────────────────────────────┐
│                   External Services                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               OpenAI API                            │   │
│  │  ┌─────────────┐ ┌─────────────┐                   │   │
│  │  │ Text        │ │ Template-   │                   │   │
│  │  │ Extraction  │ │ Aware       │                   │   │
│  │  │ & OCR       │ │ Generation  │                   │   │
│  │  └─────────────┘ └─────────────┘                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

#### 1. Core Components

- **`CoverLetterForm`**: Main form component handling user inputs and template selection
- **`TemplateSelection`**: Template selection interface with preview capabilities
- **`TemplatePreview`**: Template preview dialog with sample formatting
- **`TemplateSwitcher`**: Content-preserving template switching component
- **`TemplatePreviewCard`**: Individual template preview cards
- **`DownloadButton`**: File download functionality with template-aware formatting
- **`StreamingText`**: Real-time display of AI-generated content
- **`InputQualityIndicator`**: Visual quality assessment indicators (red/yellow/green)
- **`AdaptiveContentBanner`**: Dynamic content tips based on input quality
- **`ProgressIndicator`**: Enhanced progress tracking for generation process

#### 2. Layout Components

- **`Header`**: Application header with navigation
- **`Footer`**: Application footer with links
- **`Layout`**: Main layout wrapper component

#### 3. Utility Components

- **`ErrorBoundary`**: Error handling and display
- **`LoadingSpinner`**: Loading state indicators
- **`Toast`**: Notification system for template switches and operations

### Backend Components

#### 1. API Routes

```typescript
/api/generate          // Main cover letter generation endpoint with template support
/api/validate          // Input validation and quality assessment endpoint
/api/download          // Template-aware file download endpoint
/api/health           // Health check endpoint
```

#### 2. Core Libraries

- **`document-utils.ts`**: Document processing, generation utilities, and quality assessment
- **`link-validation.ts`**: Job link validation and source detection
- **`templates.ts`**: Template definitions and formatting logic
- **`utils.ts`**: General utility functions and helpers

## Data Flow Architecture

### Request Processing Flow

```
Template Selection → User Input → Validation → Processing → AI Generation → Template Application → Response
        │               │           │            │            │                  │                │
        ▼               ▼           ▼            ▼            ▼                  ▼                ▼
   ┌─────────┐     ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        ┌─────────┐      ┌─────────┐
   │Template │     │File/URL │ │Quality  │ │Content  │ │OpenAI   │        │Template │      │Streaming│
   │Preview  │     │Upload   │ │Check &  │ │Extract  │ │API Call │        │Format   │      │Response │
   │& Select │     │         │ │Indicate │ │         │ │w/Template│       │Apply    │      │w/Style  │
   └─────────┘     └─────────┘ └─────────┘ └─────────┘ └─────────┘        └─────────┘      └─────────┘
```

### Data Processing Pipeline

1. **Template Selection**

   - Display template options (Professional, Modern, Creative)
   - Preview template formatting
   - Store template choice for generation context

2. **Input Reception**

   - File upload handling with progress indicators
   - URL validation with real-time feedback
   - Format verification with quality assessment

3. **Quality Assessment & Visual Feedback**

   - Real-time input quality analysis
   - Color-coded indicators (green/yellow/red)
   - Adaptive content banners with improvement tips
   - Generation mode selection based on quality

4. **Content Extraction**

   - Image text extraction via OCR
   - PDF/DOCX text parsing
   - Web content scraping with source detection

5. **Template-Aware AI Processing**

   - Template-specific prompt engineering
   - OpenAI API integration with template context
   - Response streaming with formatting

6. **Template Application & Output Generation**
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
