# Class Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document provides comprehensive class diagrams for the Cover Letter Web Application, following standard UML notation for object-oriented design documentation including relationship cardinalities.

## Table of Contents

1. Overview
2. Frontend Component Classes
3. Data Model Classes
4. Service Layer Classes
5. Utility Classes
6. External Interface Classes
7. Class Relationships

---

## Overview

The Cover Letter Web App follows a modern React-TypeScript architecture with component-based design, service layers, and utility abstractions. The class diagrams represent the logical structure of the application components and their relationships using standard UML notation with cardinality indicators.

**UML Relationship Notation Used:**

- **Inheritance/Generalization**: ───▷
- **Implementation**: - - -▷
- **Composition**: ♦───
- **Aggregation**: ◇───
- **Association**: ───
- **Dependency**: - - ->

**Cardinality Notation Used:**

- **1**: Exactly one
- **0..1**: Zero or one
- **\***: Many (zero or more)
- **1..\***: One or more
- **n**: Specific number

---

## Frontend Component Classes

### Core Page Components

```
┌─────────────────────────────────────────────────┐
│               HomePage                          │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null               │
│ - router: NextRouter                            │
├─────────────────────────────────────────────────┤
│ + handleTemplateSelect(templateId: string): void│
│ + handleContinue(): void                        │
│ + render(): JSX.Element                         │
└───────────────────┬─────────────────────────────┘
                    │
                    │ ♦───uses
                    │ 1     1
                    ▼
┌─────────────────────────────────────────────────┐
│             TemplateSelection                   │
├─────────────────────────────────────────────────┤
│ - templates: CoverLetterTemplate[]              │
│ - selectedTemplate: string | null               │
│ - onSelectTemplate: (id: string) => void        │
├─────────────────────────────────────────────────┤
│ + getIcon(style: string): IconComponent         │
│ + getColorClasses(style: string, isSelected): string│
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             GeneratePage                        │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null               │
│ - templateName: string                          │
│ - searchParams: URLSearchParams                 │
│ - router: NextRouter                            │
├─────────────────────────────────────────────────┤
│ + handleBackToTemplates(): void                 │
│ + useEffect(): void                             │
│ + render(): JSX.Element                         │
└───────────────────┬─────────────────────────────┘
                    │
                    │ ♦───uses
                    │ 1     1
                    ▼
┌─────────────────────────────────────────────────┐
│            CoverLetterForm                      │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null               │
│ - jobPosterPreview: string | null               │
│ - cvPreview: string | null                      │
│ - loading: boolean                              │
│ - jobInputType: "image" | "link"                │
│ - jobLink: string                               │
│ - jobInputQuality: InputQualityStatus           │
│ - cvInputQuality: InputQualityStatus            │
├─────────────────────────────────────────────────┤
│ + handleSubmit(e: FormEvent): Promise<void>     │
│ + handleJobPosterChange(e: ChangeEvent): void   │
│ + handleJobLinkChange(e: ChangeEvent): void     │
│ + handleCvChange(e: ChangeEvent): void          │
│ + checkInputQualityBeforeSubmit(): boolean      │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              ResultPage                         │
├─────────────────────────────────────────────────┤
│ - coverLetterContent: string                    │
│ - selectedTemplate: string                      │
│ - searchParams: URLSearchParams                 │
├─────────────────────────────────────────────────┤
│ + handleDownload(): void                        │
│ + handleCopyToClipboard(): void                 │
│ + render(): JSX.Element                         │
└───────────────────┬─────────────────────────────┘
                    │
                    │ ♦───uses
                    │ 1     1
                    ▼
┌─────────────────────────────────────────────────┐
│            DownloadButton                       │
├─────────────────────────────────────────────────┤
│ - content: string                               │
│ - template: string                              │
│ - filename: string                              │
│ - isGenerating: boolean                         │
├─────────────────────────────────────────────────┤
│ + generatePDF(): void                           │
│ + generateDOCX(): void                          │
│ + getTemplateStyles(): TemplateStyles           │
│ + generateSmartFilename(): string               │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘
```

### Template System Components

```
┌─────────────────────────────────────────────────┐
│           TemplateSelection                     │
├─────────────────────────────────────────────────┤
│ - templates: CoverLetterTemplate[]              │
│ - selectedTemplate: string | null               │
│ - onSelectTemplate: (id: string) => void        │
├─────────────────────────────────────────────────┤
│ + getIcon(style: string): IconComponent         │
│ + getColorClasses(style: string, isSelected): string│
│ + render(): JSX.Element                         │
└───────────────────┬─────────────────────────────┘
                    │
                    │ ♦───uses
                    │ 1     3..*
                    ▼
┌─────────────────────────────────────────────────┐
│         TemplatePreviewCard                     │
├─────────────────────────────────────────────────┤
│ - template: CoverLetterTemplate                 │
│ - isSelected: boolean                           │
│ - onClick: () => void                           │
├─────────────────────────────────────────────────┤
│ + getTemplateIcon(): IconComponent              │
│ + getTemplateColorScheme(): object              │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           TemplatePreview                       │
├─────────────────────────────────────────────────┤
│ - content: string                               │
│ - template: string                              │
│ - isOpen: boolean                               │
├─────────────────────────────────────────────────┤
│ + getTemplateInfo(): TemplateInfo               │
│ + formatDate(): string                          │
│ + ProfessionalPreview(): JSX.Element            │
│ + ModernPreview(): JSX.Element                  │
│ + CreativePreview(): JSX.Element                │
│ + render(): JSX.Element                         │
└───────────┬─────────────────────────────────────┘
            │
            │ ◇───refers to
            │ 0..1   1
            ▼
┌─────────────────────────────────────────────────┐
│      CoverLetterTemplate                       │
├─────────────────────────────────────────────────┤
│ + id: string                                    │
│ + name: string                                  │
│ + description: string                           │
│ + preview: string                               │
│ + style: 'professional' | 'creative' | 'modern' │
└─────────────────────────────────────────────────┘
```

### Form and Input Components

```
┌─────────────────────────────────────────────────┐
│             CoverLetterForm                     │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null               │
│ - jobPosterPreview: string | null               │
│ - cvPreview: string | null                      │
│ - loading: boolean                              │
│ - error: string | null                          │
│ - jobInputType: "image" | "link"                │
│ - jobLink: string                               │
│ - jobSource: string                             │
│ - isValidLink: boolean | null                   │
│ - linkValidating: boolean                       │
│ - jobInputQuality: InputQualityStatus           │
│ - cvInputQuality: InputQualityStatus            │
│ - isRelatedInputs: boolean | null               │
├─────────────────────────────────────────────────┤
│ + handleSubmit(e: FormEvent): Promise<void>     │
│ + handleJobPosterChange(e: ChangeEvent): void   │
│ + handleCvChange(e: ChangeEvent): void          │
│ + handleJobLinkChange(e: ChangeEvent): void     │
│ + handleValidateJobLink(url: string): void      │
│ + checkInputQualityBeforeSubmit(): boolean      │
│ + render(): JSX.Element                         │
└───────────────┬───────────────────┬─────────────┘
                │                   │
        ♦───uses│                   │♦───uses
        1     1 │                   │ 1     1
                ▼                   ▼
┌─────────────────────────┐ ┌─────────────────────────────┐
│  InputQualityIndicator  │ │    AdaptiveContentBanner    │
├─────────────────────────┤ ├─────────────────────────────┤
│ - quality: InputQuality  │ │ - hasLimitedJobInfo: boolean│
│ - label: string          │ │ - hasLimitedCvInfo: boolean │
│ - showTooltip: boolean   │ │ - isJobInfoRelevant: boolean│
├─────────────────────────┤ │ - jobInputQuality: Status   │
│ + getQualityIcon()       │ │ - cvInputQuality: Status    │
│ + getQualityColor()      │ ├─────────────────────────────┤
│ + getQualityMessage()    │ │ + shouldShowBanner()        │
│ + render(): JSX.Element   │ │ + getBannerMessage()        │
└─────────────────────────┘ │ + getBannerVariant()         │
                            │ + render(): JSX.Element       │
                            └─────────────────────────────┘
```

### Display and Interaction Components

```
┌─────────────────────────────────────────────────┐
│              StreamingText                      │
├─────────────────────────────────────────────────┤
│ - text: string                                  │
│ - isStreaming: boolean                          │
│ - speed: number                                 │
│ - onComplete: () => void                        │
├─────────────────────────────────────────────────┤
│ + useEffect(): void                             │
│ + startStreaming(): void                        │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│            ProgressIndicator                    │
├─────────────────────────────────────────────────┤
│ - stage: GenerationStage                        │
│ - progress: number                              │
│ - message: string                               │
├─────────────────────────────────────────────────┤
│ + getStageMessage(stage: GenerationStage): string│
│ + getProgressPercentage(): number               │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              DownloadButton                     │
├─────────────────────────────────────────────────┤
│ - content: string                               │
│ - template: string                              │
│ - filename: string                              │
│ - isGenerating: boolean                         │
├─────────────────────────────────────────────────┤
│ + generatePDF(): void                           │
│ + generateDOCX(): void                          │
│ + getTemplateStyles(): TemplateStyles           │
│ + generateSmartFilename(): string               │
│ + render(): JSX.Element                         │
└───────────────────┬─────────────────────────────┘
                    │
                    │ ----> depends on
                    │ 1     1
                    ▼
┌─────────────────────────────────────────────────┐
│            DocumentGenerator                    │
├─────────────────────────────────────────────────┤
│                                                 │
├─────────────────────────────────────────────────┤
│ + generatePDF(content, template): Blob          │
│ + generateDOCX(content, template): Blob         │
│ + getTemplateStyles(template): TemplateStyles   │
│ + generateSmartFilename(content): string        │
└─────────────────────────────────────────────────┘
```

### Template Interface Classes

```
┌─────────────────────────────────────────────────┐
│        <<Interface>>                           │
│     TemplatePreviewCardProps                   │
├─────────────────────────────────────────────────┤
│ + template: CoverLetterTemplate                 │
│ + isSelected: boolean                           │
│ + onSelect: () => void                          │
└────────────────────┬────────────────────────────┘
                     │
                     │ - - -▷ implements
                     │ 1     1
                     │
┌─────────────────────────────────────────────────┐
│           TemplatePreviewCard                   │
├─────────────────────────────────────────────────┤
│                                                 │
├─────────────────────────────────────────────────┤
│ + getTemplateIcon(): JSX.Element                │
│ + getColorClasses(): string                     │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        <<Interface>>                           │
│       TemplatePreviewProps                     │
├─────────────────────────────────────────────────┤
│ + content: string                               │
│ + template: string                              │
└────────────────────┬────────────────────────────┘
                     │
                     │ - - -▷ implements
                     │ 1     1
                     │
┌─────────────────────────────────────────────────┐
│           TemplatePreview                       │
├─────────────────────────────────────────────────┤
│ - isOpen: boolean                               │
├─────────────────────────────────────────────────┤
│ + getTemplateInfo(): TemplateInfo               │
│ + formatDate(): string                          │
│ + ProfessionalPreview(): JSX.Element            │
│ + ModernPreview(): JSX.Element                  │
│ + CreativePreview(): JSX.Element                │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘
```

## Data Model Classes

### Core Data Interfaces

```
┌─────────────────────────────────────────────────┐
│        <<Interface>>                           │
│      CoverLetterTemplate                       │
├─────────────────────────────────────────────────┤
│ + id: string                                    │
│ + name: string                                  │
│ + description: string                           │
│ + preview: string                               │
│ + style: 'professional' | 'creative' | 'modern' │
└────────────────────┬────────────────────────────┘
                     │
                     │ - - -▷ implements
                     │ 1     *
                     │
┌─────────────────────────────────────────────────┐
│             <<Constant>>                        │
│         COVER_LETTER_TEMPLATES                 │
├─────────────────────────────────────────────────┤
│ + [0]: ProfessionalTemplate                     │
│ + [1]: ModernTemplate                           │
│ + [2]: CreativeTemplate                         │
├─────────────────────────────────────────────────┤
│ + find(id: string): CoverLetterTemplate         │
│ + map(): CoverLetterTemplate[]                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             <<Type Union>>                      │
│          InputQualityStatus                    │
├─────────────────────────────────────────────────┤
│ + "good" | "fair" | "poor" | "unknown"          │
├─────────────────────────────────────────────────┤
│ + getQualityColor(): string                     │
│ + getQualityIcon(): IconComponent               │
│ + getQualityMessage(): string                   │
└─────────────────────────────────────────────────┘
       △
       │ used by
       │ *     1
       │
┌─────────────────────────────────────────────────┐
│  InputQualityIndicator                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        <<Interface>>                           │
│        GenerationStage                         │
├─────────────────────────────────────────────────┤
│ + stage: 'processing' | 'extracting'            │
│         | 'generating' | 'complete'             │
│ + message: string                               │
│ + progress: number                              │
├─────────────────────────────────────────────────┤
│ + getStageMessage(): string                     │
│ + getProgressPercentage(): number               │
└─────────────────────────────────────────────────┘
       △
       │ used by
       │ 1     1
       │
┌─────────────────────────────────────────────────┐
│  ProgressIndicator                            │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        <<Interface>>                           │
│         TemplateStyles                         │
├─────────────────────────────────────────────────┤
│ + fontFamily: string                            │
│ + fontSize: number                              │
│ + lineHeight: number                            │
│ + headerColor: string                           │
│ + textColor: string                             │
│ + marginTop: number                             │
│ + marginBottom: number                          │
├─────────────────────────────────────────────────┤
│ + applyToDocument(): void                       │
│ + getPDFStyles(): object                        │
│ + getDOCXStyles(): object                       │
└─────────────────────────────────────────────────┘
       △
       │ used by
       │ 1     1
       │
┌─────────────────────────────────────────────────┐
│  DocumentGenerator                            │
└─────────────────────────────────────────────────┘
```

## Service Layer Classes

### API Route Handlers

```
┌─────────────────────────────────────────────────┐
│             GenerateRoute                       │
├─────────────────────────────────────────────────┤
│ + dynamic: 'force-dynamic'                      │
│ + runtime: 'nodejs'                             │
├─────────────────────────────────────────────────┤
│ + POST(request: NextRequest): Promise<Response> │
│ + extractTextFromImage(buffer): Promise<string> │
│ + extractTextFromJobLink(url): Promise<string>  │
│ + extractTextFromPDF(buffer): Promise<string>   │
│ + extractTextFromDOCX(buffer): Promise<string>  │
│ + assessCVQuality(text): QualityAssessment      │
│ + generateCoverLetter(params): Promise<string>  │
└───────────────────┬─────────────────────────────┘
                    │
                    │ ----> depends on
                    │ 1     1
                    ▼
┌─────────────────────────────────────────────────┐
│             OpenAIService                       │
├─────────────────────────────────────────────────┤
│ - apiKey: string                                │
│ - client: OpenAI                                │
├─────────────────────────────────────────────────┤
│ + generateCoverLetter(params): Promise<string>  │
│ + extractTextFromImage(base64): Promise<string> │
│ + extractJobFromUrl(url): Promise<string>       │
│ + createStreamingResponse(): AsyncIterator      │
└─────────────────────────────────────────────────┘
                    △
                    │ uses
                    │ 1     *
┌─────────────────────────────────────────────────┐
│         <<Interface>>                          │
│         GenerationParams                       │
├─────────────────────────────────────────────────┤
│ + jobText: string                               │
│ + cvText: string                                │
│ + template: string                              │
│ + language: 'english' | 'indonesian'            │
│ + quality: QualityAssessment                    │
└─────────────────────────────────────────────────┘
                    △
                    │ includes
                    │ 1     1
┌─────────────────────────────────────────────────┐
│         <<Interface>>                          │
│        QualityAssessment                       │
├─────────────────────────────────────────────────┤
│ + score: number                                 │
│ + issues: string[]                              │
│ + recommendations: string[]                     │
│ + hasMinimumInfo: boolean                       │
└─────────────────────────────────────────────────┘
```

### Utility Service Classes

```
┌─────────────────────────────────────────────────┐
│            DocumentUtils                        │
├─────────────────────────────────────────────────┤
│                                                 │
├─────────────────────────────────────────────────┤
│ + generateCoverLetterFilename(content): string  │
│ + formatDate(): string                          │
│ + detectJobSource(url): string                  │
│ + assessJobInputQuality(type, input): Status    │
│ + assessCvInputQuality(file): Status            │
│ + getQualityTooltipMessage(quality): string     │
├─────────────────────────────────────────────────┤
│ - extractCompanyName(content): string           │
│ - extractJobTitle(content): string              │
│ - analyzeFileSize(file): number                 │
│ - analyzeContentStructure(text): object         │
└─────────────────────────────────────────────────┘
                    △
                    │ used by
                    │ 1     *
                    │
┌─────────────────────────────────────────────────┐
│   Components (CoverLetterForm, DownloadButton) │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             LinkValidation                      │
├─────────────────────────────────────────────────┤
│                                                 │
├─────────────────────────────────────────────────┤
│ + validateJobLink(url): Promise<boolean>        │
│ + isKnownJobSite(url): boolean                  │
│ + extractCompanyFromUrl(url): string            │
│ + normalizeUrl(url): string                     │
│ + getJobSiteInfo(url): JobSiteInfo              │
├─────────────────────────────────────────────────┤
│ - checkUrlFormat(url): boolean                  │
│ - detectJobPlatform(hostname): string           │
│ - validateJobSiteAccess(url): Promise<boolean>  │
└───────────────────┬─────────────────────────────┘
                    │
                    │ creates
                    │ 1     *
                    ▼
┌─────────────────────────────────────────────────┐
│         <<Interface>>                          │
│           JobSiteInfo                          │
├─────────────────────────────────────────────────┤
│ + platform: string                              │
│ + isSupported: boolean                          │
│ + extractionMethod: 'web-search' | 'scraping'   │
│ + reliability: 'high' | 'medium' | 'low'        │
└─────────────────────────────────────────────────┘
```

## External Interface Classes

### OpenAI API Integration

```
┌─────────────────────────────────────────────────┐
│             OpenAIService                       │
├─────────────────────────────────────────────────┤
│ - apiKey: string                                │
│ - client: OpenAI                                │
├─────────────────────────────────────────────────┤
│ + generateCoverLetter(params): Promise<string>  │
│ + extractTextFromImage(base64): Promise<string> │
│ + extractJobFromUrl(url): Promise<string>       │
│ + createStreamingResponse(): AsyncIterator      │
├─────────────────────────────────────────────────┤
│ - buildPrompt(params): string                   │
│ - getTemplateInstructions(template): string     │
│ - handleStreamingResponse(response): Iterator   │
└───────────────────┬─────────────────────────────┘
                    │
                    │ uses
                    │ 1     *
                    ▼
┌─────────────────────────────────────────────────┐
│          <<Interface>>                         │
│           OpenAIModels                         │
├─────────────────────────────────────────────────┤
│ + GPT_4: 'gpt-4'                                │
│ + GPT_4_VISION: 'gpt-4-vision-preview'          │
│ + GPT_4_SEARCH: 'gpt-4o-search-preview'         │
│ + GPT_4O_MINI: 'o4-mini'                        │
└─────────────────────────────────────────────────┘
```

### Document Generation Services

```
┌─────────────────────────────────────────────────┐
│          DocumentGenerator                      │
├─────────────────────────────────────────────────┤
│                                                 │
├─────────────────────────────────────────────────┤
│ + generatePDF(content, template): Blob          │
│ + generateDOCX(content, template): Blob         │
│ + getTemplateStyles(template): TemplateStyles   │
│ + generateSmartFilename(content): string        │
├─────────────────────────────────────────────────┤
│ - applyPDFStyling(doc, template): void          │
│ - applyDOCXStyling(doc, template): void         │
│ - extractMetadata(content): DocumentMetadata    │
└────────────────────┬────────────────────────────┘
                     │
                     │ ----> produces
                     │ 1     1
                     ▼
┌─────────────────────────────────────────────────┐
│          <<Interface>>                         │
│          DocumentMetadata                      │
├─────────────────────────────────────────────────┤
│ + companyName: string | null                    │
│ + jobTitle: string | null                       │
│ + applicantName: string | null                  │
│ + date: Date                                    │
└─────────────────────────────────────────────────┘
```

## Class Relationships

### Component Hierarchy

```
┌───────────────┐    ♦───    ┌──────────────────┐    ♦───    ┌────────────────┐
│   HomePage    │──────────▶│TemplateSelection │──────────▶│TemplatePreview │
└───────────────┘   1    1  └──────────────────┘   1    1  └────────────────┘
                                    │
                                    │ ♦───uses
                                    │ 1     3..*
                                    ▼
                            ┌──────────────────┐
                            │TemplatePreviewCard│
                            └──────────────────┘

┌───────────────┐    ♦───    ┌──────────────────┐
│ GeneratePage  │──────────▶│ CoverLetterForm  │
└───────────────┘   1    1  └──────────────────┘
                                    │
             ┌───────────────────┬──┴───┬───────────────────┐
             │ ♦───uses          │      │ ♦───uses          │
             │ 1     1           │      │ 1     1           │
             ▼                   ▼      ▼                   ▼
┌───────────────────┐ ┌─────────────┐ ┌─────────────────┐ ┌────────────────┐
│InputQualityIndicator│ │StreamingText│ │ProgressIndicator│ │AdaptiveBanner │
└───────────────────┘ └─────────────┘ └─────────────────┘ └────────────────┘

┌───────────────┐    ♦───    ┌──────────────────┐    ---▶    ┌────────────────┐
│  ResultPage   │──────────▶│  DownloadButton  │──────────▶│DocumentGenerator│
└───────────────┘   1    1  └──────────────────┘   1    1  └────────────────┘
```

### Service Dependencies

```
┌───────────────┐    ---▶    ┌──────────────────┐    ---▶    ┌────────────────┐
│  UI Components│──────────▶│  DocumentUtils   │──────────▶│   OpenAI API   │
└───────────────┘   *    1  └──────────────────┘   1    1  └────────────────┘
        │                            │                             │
        │                            │                             │
        ▼                            ▼                             ▼
┌───────────────┐    ---▶    ┌──────────────────┐    ---▶    ┌────────────────┐
│ Form Handling │──────────▶│ LinkValidation   │──────────▶│   Job Sites    │
└───────────────┘   1    1  └──────────────────┘   1    *  └────────────────┘
```

### Data Flow Diagram

```
┌───────────────┐    ▶     ┌──────────────┐    ▶     ┌───────────────┐
│Template Select│───────▶│  Form Input  │───────▶│   Validation   │
└───────────────┘   1:1    └──────────────┘   1:*   └───────────────┘
        │                                                  │
        │                                                  ▼
┌───────────────┐    ◀     ┌──────────────┐    ◀     ┌───────────────┐
│  Result Page  │◀────────│  Generation  │◀────────│   Processing   │
└───────────────┘   1:1    └──────────────┘   1:1   └───────────────┘
```

### Key Relationship Cardinalities

1. **Page to Form Component Relationships**

   - HomePage : TemplateSelection = 1 : 1
   - GeneratePage : CoverLetterForm = 1 : 1
   - ResultPage : DownloadButton = 1 : 1

2. **Form to UI Component Relationships**

   - CoverLetterForm : InputQualityIndicator = 1 : 1
   - CoverLetterForm : AdaptiveContentBanner = 1 : 1

3. **Data Collection Relationships**

   - TemplateSelection : TemplatePreviewCard = 1 : 3..\* (one selection contains multiple preview cards)
   - COVER_LETTER_TEMPLATES : CoverLetterTemplate = 1 : \* (collection contains multiple templates)

4. **Service Consumption Relationships**

   - GenerateRoute : OpenAIService = 1 : 1
   - UI Components : DocumentUtils = \* : 1 (many components use the same utility)
   - LinkValidation : JobSiteInfo = 1 : \* (validator creates multiple job site info objects)

5. **Template Context Relationships**
   - TemplatePreview : CoverLetterTemplate = 0..1 : 1 (preview optionally refers to a template)
   - DownloadButton : DocumentGenerator = 1 : 1
   - DocumentGenerator : DocumentMetadata = 1 : 1 (generator produces exactly one metadata object)

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Last Updated: July 20, 2025 - Standard UML notation for class attributes, methods, and relationships with cardinality indicators_
