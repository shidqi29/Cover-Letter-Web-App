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
│ - Uses: TemplateSelection           │
│ - Uses: CoverLetterForm             │
└─────────────────────────────────────┘
                    │
                    │ composition
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│        TemplateSelection            │
├─────────────────────────────────────┤
│ - templates: CoverLetterTemplate[]  │
│ - selectedTemplate: string | null   │
├─────────────────────────────────────┤
│ + onSelectTemplate(): void          │
│ + getIcon(): JSX.Element            │
│ + getColorClasses(): string         │
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: TemplatePreviewCard         │
└─────────────────────────────────────┘
                    │
                    │ composition
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│         CoverLetterForm             │
├─────────────────────────────────────┤
│ - selectedTemplate: string | null   │
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
                    │
                    │ composition
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│           ResultPage                │
├─────────────────────────────────────┤
│ - coverLetter: string               │
│ - templateName: string              │
│ - loading: boolean                  │
├─────────────────────────────────────┤
│ + handleCopyToClipboard(): void     │
│ + handleShare(): void               │
│ + handleBackToHome(): void          │
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: TemplateSwitcher            │
│ - Uses: TemplatePreview             │
│ - Uses: TemplateComparison          │
│ - Uses: DownloadButton              │
└─────────────────────────────────────┘
```

### Template System Components

```
┌─────────────────────────────────────┐
│          <<Interface>>              │
│    TemplatePreviewCardProps         │
├─────────────────────────────────────┤
│ + template: CoverLetterTemplate     │
│ + isSelected: boolean               │
│ + onSelect: () => void              │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│      TemplatePreviewCard            │
├─────────────────────────────────────┤
│ + getTemplateIcon(): JSX.Element    │
│ + getColorClasses(): string         │
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      TemplatePreviewProps           │
├─────────────────────────────────────┤
│ + content: string                   │
│ + template: string                  │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│        TemplatePreview              │
├─────────────────────────────────────┤
│ - isOpen: boolean                   │
├─────────────────────────────────────┤
│ + getTemplateInfo(): TemplateInfo   │
│ + formatDate(): string              │
│ + ProfessionalPreview(): JSX.Element│
│ + ModernPreview(): JSX.Element      │
│ + CreativePreview(): JSX.Element    │
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│     TemplateSwitcherProps           │
├─────────────────────────────────────┤
│ + currentTemplate: string           │
│ + coverLetterContent: string        │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│       TemplateSwitcher              │
├─────────────────────────────────────┤
│ - isOpen: boolean                   │
│ - isSwitching: boolean              │
├─────────────────────────────────────┤
│ + getTemplateInfo(): TemplateInfo   │
│ + handleTemplateSwitch(): void      │
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: Router                      │
│ - Uses: Toast                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│    TemplateComparisonProps          │
├─────────────────────────────────────┤
│ + content: string                   │
│ + currentTemplate: string           │
└─────────────────────────────────────┘
                    │
                    │ implements
                    ▼
┌─────────────────────────────────────┐
│          <<React.FC>>               │
│      TemplateComparison             │
├─────────────────────────────────────┤
│ + renderTemplatePreview(): JSX.Element│
│ + render(): JSX.Element             │
└─────────────────────────────────────┘
```

### Enhanced UI Component Classes

```
┌─────────────────────────────────────┐
│          <<Interface>>              │
│      StreamingTextProps             │
├─────────────────────────────────────┤
│ + text: string                      │
│ + isLoading: boolean                │
│ + template?: string                 │
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
│ + getTemplateStyles(): string       │
│ + render(): JSX.Element             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      DownloadButtonProps            │
├─────────────────────────────────────┤
│ + content: string                   │
│ + template: string                  │
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
│ + generatePdfWithTemplate(): void   │
│ + generateDocxWithTemplate(): void  │
│ + handleDownload(): void            │
│ + applyTemplateFormatting(): void   │
│ + render(): JSX.Element             │
├─────────────────────────────────────┤
│ - Uses: DocumentUtils               │
│ - Uses: TemplateEngine              │
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
│     CoverLetterTemplate             │
├─────────────────────────────────────┤
│ + id: string                        │
│ + name: string                      │
│ + description: string               │
│ + style: string                     │
│ + icon: string                      │
│ + preview: string                   │
│ + formatting: TemplateFormatting    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      TemplateFormatting             │
├─────────────────────────────────────┤
│ + headerStyle: string               │
│ + bodyStyle: string                 │
│ + fontFamily: string                │
│ + fontSize: string                  │
│ + lineHeight: string                │
│ + margins: string                   │
│ + colors: TemplateColors            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│        TemplateColors               │
├─────────────────────────────────────┤
│ + primary: string                   │
│ + secondary: string                 │
│ + text: string                      │
│ + background: string                │
│ + accent: string                    │
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
│ + template: string                  │
│ + generationOptions?: GenerationOptions│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      CoverLetterResponse            │
├─────────────────────────────────────┤
│ + content: string                   │
│ + template: string                  │
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
│ + templateUsed: string              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│      QualityAssessment              │
├─────────────────────────────────────┤
│ + hasLimitedJobInfo: boolean        │
│ + hasLimitedCvInfo: boolean         │
│ + isJobInfoRelevant: boolean        │
│ + overallScore: number              │
│ + jobQualityIndicator: "red"|"yellow"|"green"│
│ + cvQualityIndicator: "red"|"yellow"|"green" │
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
│ - templateEngine: TemplateEngine    │
├─────────────────────────────────────┤
│ + generateFromImage(): Promise<string>│
│ + generateFromLink(): Promise<string>│
│ + generateWithTemplate(): Promise<string>│
│ + extractTextFromImage(): Promise<string>│
│ + extractTextFromJobLink(): Promise<string>│
│ + extractTextFromPdf(): Promise<string>│
│ + extractTextFromDocx(): Promise<string>│
│ + streamResponseWithTemplate(): ReadableStream│
├─────────────────────────────────────┤
│ - Uses: OpenAI API                  │
│ - Uses: TextExtractionService       │
│ - Uses: TemplateEngine              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Service>>                │
│        TemplateEngine               │
├─────────────────────────────────────┤
│ - templates: CoverLetterTemplate[]  │
├─────────────────────────────────────┤
│ + getTemplate(): CoverLetterTemplate│
│ + getAllTemplates(): CoverLetterTemplate[]│
│ + applyTemplateFormatting(): string │
│ + generateTemplateContext(): string │
│ + switchTemplate(): string          │
│ + preserveContent(): string         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Service>>                │
│    TextExtractionService            │
├─────────────────────────────────────┤
│ + extractFromPdf(): Promise<string> │
│ + extractFromDocx(): Promise<string>│
│ + extractFromImage(): Promise<string>│
│ + extractFromUrl(): Promise<string> │
│ + assessExtractionQuality(): QualityStatus│
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
│ + getQualityIndicator(): "red"|"yellow"|"green"│
│ + generateQualityTips(): string[]   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Interface>>              │
│       ValidationResult              │
├─────────────────────────────────────┤
│ + isValid: boolean                  │
│ + normalizedUrl: string             │
│ + isLikelyJobPosting: boolean       │
│ + qualityScore: number              │
│ + qualityIndicator: "red"|"yellow"|"green"│
│ + potentialIssues: string[]         │
│ + improvementTips: string[]         │
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
│ + getQualityIndicatorColor(): string│
│ + generateQualityTips(): string[]   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Utility>>                │
│        LinkValidation               │
├─────────────────────────────────────┤
│ + validateJobLink(): Promise<ValidationResult>│
│ + isKnownJobSite(): boolean         │
│ + extractCompanyFromUrl(): string   │
│ + normalizeUrl(): string            │
│ + getSourceQualityScore(): number   │
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
│ + applyTemplateFormatting(): void   │
│ + exportDocumentWithTemplate(): void│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          <<Constants>>               │
│      TemplateDefinitions            │
├─────────────────────────────────────┤
│ + COVER_LETTER_TEMPLATES: CoverLetterTemplate[]│
│ + PROFESSIONAL_TEMPLATE: CoverLetterTemplate│
│ + MODERN_TEMPLATE: CoverLetterTemplate│
│ + CREATIVE_TEMPLATE: CoverLetterTemplate│
│ + getTemplateById(): CoverLetterTemplate│
│ + getDefaultTemplate(): CoverLetterTemplate│
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
  selectedTemplate: string | null;
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
  template: string;
  options?: {
    tone?: string;
    length?: string;
    includePersonalization?: boolean;
  };
}

interface GenerationResponse {
  content: string;
  template: string;
  metadata: {
    processingTime: number;
    wordCount: number;
    qualityAssessment: QualityAssessment;
    templateApplied: string;
  };
}

interface TemplateSystemState {
  selectedTemplate: string;
  availableTemplates: CoverLetterTemplate[];
  templatePreviewOpen: boolean;
  templateSwitchingInProgress: boolean;
}

interface QualityAssessmentResult {
  jobQuality: {
    score: number;
    indicator: "red" | "yellow" | "green";
    tips: string[];
  };
  cvQuality: {
    score: number;
    indicator: "red" | "yellow" | "green";
    tips: string[];
  };
  overallAssessment: "standard" | "job-focused" | "cv-focused" | "generic";
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

- **Component-Based Architecture**: Modular, reusable React components with template support
- **Template System Architecture**: Centralized template management with visual previews and content-preserving switching
- **Real-time Quality Assessment**: Visual indicators and adaptive feedback for user input optimization
- **Separation of Concerns**: Clear separation between UI, business logic, template management, and data access
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures including template definitions
- **Service Layer**: Abstracted business logic in service classes with template-aware operations
- **Utility Pattern**: Shared functionality in utility classes including template utilities

### Technology Integration

- **Frontend**: React 18+ with TypeScript and Next.js 14+
- **State Management**: React hooks (useState, useEffect, useRef) with template state management
- **UI Components**: shadcn/ui components with Tailwind CSS for template styling
- **Template System**: Custom template engine with real-time preview capabilities
- **Quality Assessment**: Real-time visual indicators with color-coded feedback
- **Styling**: Tailwind CSS with component variants and template-specific styles
- **File Processing**: Specialized libraries (pdf-parse, mammoth, jsPDF) with template-aware formatting
- **API Integration**: OpenAI API with streaming capabilities and template context
- **Build System**: Next.js with App Router architecture and template asset optimization

This class diagram documentation provides a comprehensive view of the Cover Letter Web App's object-oriented structure including the advanced template system, real-time quality assessment, and content-preserving template switching capabilities, following RUP methodology for clear architectural documentation and maintainability.

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Updated: June 23, 2025 - Reflects current implementation with visual template system, real-time quality assessment, content-preserving template switching, enhanced component architecture, and comprehensive type safety for all template operations_
