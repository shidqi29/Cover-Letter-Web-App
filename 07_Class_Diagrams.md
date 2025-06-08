# Class Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document provides comprehensive class diagrams for the Cover Letter Web Application, following RUP methodology for object-oriented design documentation.

## Table of Contents

1. [Overview](#overview)
2. [Frontend Component Classes](#frontend-component-classes)
3. [Data Model Classes](#data-model-classes)
4. [Service Layer Classes](#service-layer-classes)
5. [Utility Classes](#utility-classes)
6. [External Interface Classes](#external-interface-classes)
7. [Class Relationships](#class-relationships)

---

## Overview

The Cover Letter Web App follows a modern React-based architecture with TypeScript interfaces, component classes, and service abstractions. The class diagrams below represent the logical structure of the application components and their relationships.

**Design Patterns Used:**

- Component Pattern (React Components)
- Service Layer Pattern (API and Utility Services)
- Observer Pattern (React State Management)
- Factory Pattern (Document Generation)

---

## Frontend Component Classes

### Main Application Components

```
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│             Home                    │
├─────────────────────────────────────┤
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: CoverLetterForm             │
└─────────────────────────────────────┘
                    │
                    │ composition
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│         CoverLetterForm             │
├─────────────────────────────────────┤
│ - jobPosterPreview: string | null   │
│ - cvPreview: string | null          │
│ - coverLetter: string | null        │
│ - loading: boolean                  │
│ - error: string | null              │
│ - jobInputType: "image" | "link"    │
│ - jobLink: string                   │
│ - isValidLink: boolean | null       │
│ - jobInputQuality: InputQualityStatus│
│ - cvInputQuality: InputQualityStatus │
├─────────────────────────────────────┤
│ + handleSubmit(): void              │
│ + handleJobPosterChange(): void     │
│ + handleCvChange(): void            │
│ + handleJobLinkChange(): void       │
│ + validateLink(): void              │
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: StreamingText               │
│ - Uses: ProgressIndicator           │
│ - Uses: DownloadButton              │
│ - Uses: InputQualityIndicator       │
│ - Uses: AdaptiveContentBanner       │
└─────────────────────────────────────┘
```

### UI Component Classes

```
┌─────────────────────────────────────┐
│          <<Interface>>              │
│      StreamingTextProps             │
├─────────────────────────────────────┤
│ + text: string                      │
│ + isLoading: boolean                │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│         StreamingText               │
├─────────────────────────────────────┤
│ - textContainerRef: RefObject<HTMLDivElement> │
├─────────────────────────────────────┤
│ + useEffect(): void                 │
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      DownloadButtonProps            │
├─────────────────────────────────────┤
│ + content: string                   │
│ + fileName?: string                 │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│         DownloadButton              │
├─────────────────────────────────────┤
│ - isDownloading: boolean            │
│ - fileName: string                  │
├─────────────────────────────────────┤
│ + generateTxtFile(): void           │
│ + generatePdfFile(): void           │
│ + generateDocxFile(): void          │
│ + handleDownload(): void            │
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: DocumentUtils               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│   InputQualityIndicatorProps        │
├─────────────────────────────────────┤
│ + quality: InputQualityStatus       │
│ + type: "job" | "cv"                │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│     InputQualityIndicator           │
├─────────────────────────────────────┤
│ + renderIcon(): JSX.Element         │
│ + getTooltipMessage(): string       │
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│   AdaptiveContentBannerProps        │
├─────────────────────────────────────┤
│ + hasLimitedJobInfo: boolean        │
│ + hasLimitedCvInfo: boolean         │
│ + isJobInfoRelevant: boolean        │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│      AdaptiveContentBanner          │
├─────────────────────────────────────┤
│ + determineBannerStyle(): BannerStyle│
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│     ProgressIndicatorProps          │
├─────────────────────────────────────┤
│ + loading: boolean                  │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│        ProgressIndicator            │
├─────────────────────────────────────┤
│ + render(): JSX.Element             │
└─────────────────────────────────────┘
```

### Shared UI Components

```
┌─────────────────────────────────────┐
│          <<Interface>>              │
│          ButtonProps                │
├─────────────────────────────────────┤
│ + variant?: ButtonVariant           │
│ + size?: ButtonSize                 │
│ + asChild?: boolean                 │
│ + className?: string                │
│ + children?: React.ReactNode        │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│             Button                  │
├─────────────────────────────────────┤
│ + forwardRef(): RefForwardingComponent│
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│           CardProps                 │
├─────────────────────────────────────┤
│ + className?: string                │
│ + children: React.ReactNode         │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│             Card                    │
├─────────────────────────────────────┤
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<React.FC>>               │
│           Input                     │
├─────────────────────────────────────┤
│ + forwardRef(): RefForwardingComponent│
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<React.FC>>               │
│           Label                     │
├─────────────────────────────────────┤
│ + forwardRef(): RefForwardingComponent│
│ + render(): JSX.Element             │
└─────────────────────────────────────┘
```

---

## Data Model Classes

### Type Definitions and Interfaces

```
┌─────────────────────────────────────┐
│          <<Type>>                   │
│      InputQualityStatus             │
├─────────────────────────────────────┤
│ "unknown" | "good" | "limited" | "poor" │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│        JobInputData                 │
├─────────────────────────────────────┤
│ + type: "image" | "link"            │
│ + content: string | File            │
│ + source?: string                   │
│ + quality: InputQualityStatus       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│         CvInputData                 │
├─────────────────────────────────────┤
│ + file: File                        │
│ + content: string                   │
│ + quality: InputQualityStatus       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      CoverLetterRequest             │
├─────────────────────────────────────┤
│ + jobInput: JobInputData            │
│ + cvInput: CvInputData              │
│ + generationOptions?: GenerationOptions│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      CoverLetterResponse            │
├─────────────────────────────────────┤
│ + content: string                   │
│ + metadata: ResponseMetadata        │
│ + quality: QualityAssessment        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│       ResponseMetadata              │
├─────────────────────────────────────┤
│ + generatedAt: Date                 │
│ + processingTime: number            │
│ + wordCount: number                 │
│ + jobSource?: string                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      QualityAssessment              │
├─────────────────────────────────────┤
│ + hasLimitedJobInfo: boolean        │
│ + hasLimitedCvInfo: boolean         │
│ + isJobInfoRelevant: boolean        │
│ + overallScore: number              │
└─────────────────────────────────────┘
```

---

## Service Layer Classes

### API Service Classes

```
┌─────────────────────────────────────┐
│          <<Service>>                │
│      CoverLetterGenerator           │
├─────────────────────────────────────┤
│ - openaiClient: OpenAI              │
├─────────────────────────────────────┤
│ + generateFromImage(): Promise<string>│
│ + generateFromLink(): Promise<string>│
│ + extractTextFromImage(): Promise<string>│
│ + extractTextFromJobLink(): Promise<string>│
│ + extractTextFromPdf(): Promise<string>│
│ + extractTextFromDocx(): Promise<string>│
│ + streamResponse(): ReadableStream  │
├─────────────────────────────────────┤
│ - Uses: OpenAI API                  │
│ - Uses: TextExtractionService       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Service>>                │
│    TextExtractionService            │
├─────────────────────────────────────┤
│ + extractFromPdf(): Promise<string> │
│ + extractFromDocx(): Promise<string>│
│ + extractFromImage(): Promise<string>│
│ + extractFromUrl(): Promise<string> │
├─────────────────────────────────────┤
│ - Uses: pdf-parse                   │
│ - Uses: mammoth                     │
│ - Uses: OpenAI Vision API           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Service>>                │
│      ValidationService              │
├─────────────────────────────────────┤
│ + validateJobLink(): Promise<ValidationResult>│
│ + isKnownJobSite(): boolean         │
│ + extractCompanyFromUrl(): string   │
│ + calculateQualityScore(): number   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│       ValidationResult              │
├─────────────────────────────────────┤
│ + isValid: boolean                  │
│ + normalizedUrl: string             │
│ + isLikelyJobPosting: boolean       │
│ + qualityScore: number              │
│ + potentialIssues: string[]         │
└─────────────────────────────────────┘
```

---

## Utility Classes

### Document Processing Utilities

```
┌─────────────────────────────────────┐
│          <<Utility>>                │
│        DocumentUtils                │
├─────────────────────────────────────┤
│ + generateCoverLetterFilename(): string│
│ + formatDate(): string              │
│ + detectJobSource(): string         │
│ + assessJobInputQuality(): InputQualityStatus│
│ + assessCvInputQuality(): InputQualityStatus│
│ + getQualityTooltipMessage(): string│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Utility>>                │
│        LinkValidation               │
├─────────────────────────────────────┤
│ + validateJobLink(): Promise<ValidationResult>│
│ + isKnownJobSite(): boolean         │
│ + extractCompanyFromUrl(): string   │
│ + normalizeUrl(): string            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Utility>>                │
│           Utils                     │
├─────────────────────────────────────┤
│ + cn(): string                      │
│ + clsx(): string                    │
│ + twMerge(): string                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Factory>>                │
│      DocumentExportFactory          │
├─────────────────────────────────────┤
│ + createPdfDocument(): jsPDF        │
│ + createDocxDocument(): Document    │
│ + createTxtFile(): Blob             │
│ + exportDocument(): void            │
└─────────────────────────────────────┘
```

---

## External Interface Classes

### Third-Party API Interfaces

```
┌─────────────────────────────────────┐
│          <<External>>               │
│           OpenAI                    │
├─────────────────────────────────────┤
│ + chat.completions.create(): Promise│
│ + models.list(): Promise           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<External>>               │
│          NextJS                     │
├─────────────────────────────────────┤
│ + NextRequest: Interface            │
│ + NextResponse: Interface           │
│ + Image: Component                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<External>>               │
│           React                     │
├─────────────────────────────────────┤
│ + useState(): Hook                  │
│ + useEffect(): Hook                 │
│ + useRef(): Hook                    │
│ + FC: Type                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<External>>               │
│         FileLibraries               │
├─────────────────────────────────────┤
│ + pdf-parse: Library                │
│ + mammoth: Library                  │
│ + jsPDF: Library                    │
│ + docx: Library                     │
│ + file-saver: Library               │
└─────────────────────────────────────┘
```

---

## Class Relationships

### Component Composition Diagram

```
Application Architecture Overview:

┌─────────────────────────────────────┐
│            RootLayout               │
│  (Next.js App Router Layout)       │
├─────────────────────────────────────┤
│ + children: React.ReactNode         │
│ + metadata: Metadata                │
└─────────────────────────────────────┘
                    │
                    │ contains
                    ▼
┌─────────────────────────────────────┐
│              Home                   │
│        (Main Page Component)        │
└─────────────────────────────────────┘
                    │
                    │ uses
                    ▼
┌─────────────────────────────────────┐
│         CoverLetterForm             │
│     (Primary Business Logic)       │
└─────────────────────────────────────┘
            │       │       │
            │       │       │ uses
            ▼       ▼       ▼
    ┌─────────┐ ┌─────────┐ ┌─────────┐
    │Streaming│ │Download │ │Quality  │
    │Text     │ │Button   │ │Indicator│
    └─────────┘ └─────────┘ └─────────┘
```

### Service Layer Dependencies

```
Service Dependencies:

┌─────────────────────────────────────┐
│       API Route Handler             │
│    (/api/generate/route.ts)         │
└─────────────────────────────────────┘
                    │
                    │ depends on
                    ▼
┌─────────────────────────────────────┐
│    CoverLetterGenerator             │
│      (Core Business Logic)          │
└─────────────────────────────────────┘
            │               │
            │ uses          │ uses
            ▼               ▼
┌─────────────────┐ ┌─────────────────┐
│TextExtraction   │ │ValidationService│
│Service          │ │                 │
└─────────────────┘ └─────────────────┘
            │               │
            │ uses          │ uses
            ▼               ▼
┌─────────────────┐ ┌─────────────────┐
│External APIs    │ │Utility Functions│
│(OpenAI, etc.)   │ │(DocumentUtils)  │
└─────────────────┘ └─────────────────┘
```

### Data Flow Class Diagram

```
Data Flow Architecture:

User Input → Form Component → API Service → External APIs → Response

┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───▶│CoverLetter  │───▶│API Route    │───▶│OpenAI API   │
│   Input     │    │Form         │    │Handler      │    │             │
│             │    │             │    │             │    │             │
│ - Image     │    │ - Validation│    │ - Text      │    │ - Vision    │
│ - CV File   │    │ - State Mgmt│    │   Extraction│    │ - Chat      │
│ - Job Link  │    │ - UI Logic  │    │ - Generation│    │   Completion│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                           │                   │                   │
                           ▼                   ▼                   ▼
                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                   │Utility      │    │Text         │    │Streaming    │
                   │Services     │    │Extraction   │    │Response     │
                   │             │    │Services     │    │             │
                   │ - Document  │    │             │    │ - Real-time │
                   │   Utils     │    │ - PDF Parse │    │   Content   │
                   │ - Link      │    │ - DOCX Read │    │ - Progress  │
                   │   Validation│    │ - Image OCR │    │   Updates   │
                   └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Component Interface Specifications

### Main Component Interfaces

```typescript
// Primary component interfaces used throughout the application

interface CoverLetterFormState {
  jobPosterPreview: string | null;
  cvPreview: string | null;
  coverLetter: string | null;
  loading: boolean;
  error: string | null;
  jobInputType: "image" | "link";
  jobLink: string;
  isValidLink: boolean | null;
  jobInputQuality: InputQualityStatus;
  cvInputQuality: InputQualityStatus;
}

interface GenerationRequest {
  jobInput: {
    type: "image" | "link";
    content: string;
    source?: string;
  };
  cvContent: string;
  options?: {
    tone?: string;
    length?: string;
    includePersonalization?: boolean;
  };
}

interface GenerationResponse {
  content: string;
  metadata: {
    processingTime: number;
    wordCount: number;
    qualityAssessment: QualityAssessment;
  };
}
```

---

## Architecture Notes

### Design Principles Applied

1. **Single Responsibility Principle**: Each component and service has a focused responsibility
2. **Open/Closed Principle**: Components are open for extension through props and composition
3. **Dependency Inversion**: High-level components depend on abstractions, not concretions
4. **Composition over Inheritance**: React functional components use composition patterns

### Key Architectural Decisions

- **Component-Based Architecture**: Modular, reusable React components
- **Separation of Concerns**: Clear separation between UI, business logic, and data access
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Service Layer**: Abstracted business logic in service classes
- **Utility Pattern**: Shared functionality in utility classes

### Technology Integration

- **Frontend**: React 18+ with TypeScript and Next.js 14+
- **State Management**: React hooks (useState, useEffect, useRef)
- **Styling**: Tailwind CSS with component variants
- **File Processing**: Specialized libraries (pdf-parse, mammoth, jsPDF)
- **API Integration**: OpenAI API with streaming capabilities
- **Build System**: Next.js with App Router architecture

This class diagram documentation provides a comprehensive view of the Cover Letter Web App's object-oriented structure, following RUP methodology for clear architectural documentation and maintainability.
