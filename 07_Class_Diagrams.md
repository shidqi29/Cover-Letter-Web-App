# Class Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document provides comprehensive class diagrams for the Cover Letter Web Application, following RUP methodology for object-oriented design documentation and reflecting the current implementation.

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

The Cover Letter Web App follows a modern React-TypeScript architecture with component-based design, service layers, and utility abstractions. The class diagrams represent the logical structure of the application components and their relationships.

**Architecture Patterns Implemented:**

- **Component Pattern**: React functional components with hooks
- **Service Layer Pattern**: API routes and utility services
- **Observer Pattern**: React state management and real-time streaming
- **Factory Pattern**: Document generation with template-specific formatting
- **Strategy Pattern**: Quality assessment and content generation

**Key Technologies:**

- React 18 with TypeScript
- Next.js 13 App Router
- Tailwind CSS + shadcn/ui
- OpenAI API integration
- Document processing libraries

---

## Frontend Component Classes

### Core Page Components

```
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│                 HomePage                        │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null               │
│ - router: NextRouter                            │
├─────────────────────────────────────────────────┤
│ + handleTemplateSelect(templateId: string): void│
│ + handleContinue(): void                        │
│ + render(): JSX.Element                         │
├─────────────────────────────────────────────────┤
│ - Uses: TemplateSelection                       │
│ - Uses: Image (CDC Logo)                        │
│ - Uses: Button                                  │
└─────────────────────────────────────────────────┘
                        │
                        │ composition
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│              GeneratePage                       │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null               │
│ - templateName: string                          │
│ - searchParams: URLSearchParams                 │
│ - router: NextRouter                            │
├─────────────────────────────────────────────────┤
│ + handleBackToTemplates(): void                 │
│ + useEffect(): void                             │
│ + render(): JSX.Element                         │
├─────────────────────────────────────────────────┤
│ - Uses: CoverLetterForm                         │
│ - Uses: Button (Back Navigation)                │
│ - Uses: ArrowLeft Icon                          │
└─────────────────────────────────────────────────┘
                        │
                        │ composition
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│             ResultPage                          │
├─────────────────────────────────────────────────┤
│ - coverLetterContent: string                    │
│ - selectedTemplate: string                      │
│ - searchParams: URLSearchParams                 │
├─────────────────────────────────────────────────┤
│ + handleTemplateSwitch(): void                  │
│ + handleDownload(): void                        │
│ + render(): JSX.Element                         │
├─────────────────────────────────────────────────┤
│ - Uses: DownloadButton                          │
│ - Uses: TemplatePreview                         │
└─────────────────────────────────────────────────┘
```

### Template System Components

```
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│            TemplateSelection                    │
├─────────────────────────────────────────────────┤
│ - templates: CoverLetterTemplate[]              │
│ - selectedTemplate: string | null               │
│ - onSelectTemplate: (id: string) => void        │
├─────────────────────────────────────────────────┤
│ + getIcon(style: string): IconComponent         │
│ + getColorClasses(style: string, isSelected): string│
│ + render(): JSX.Element                         │
├─────────────────────────────────────────────────┤
│ - Uses: TemplatePreviewCard                     │
│ - Uses: Card, CardContent, CardHeader           │
│ - Uses: Briefcase, Sparkles, FileText Icons    │
└─────────────────────────────────────────────────┘
                        │
                        │ composition
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│           TemplatePreviewCard                   │
├─────────────────────────────────────────────────┤
│ - template: CoverLetterTemplate                 │
│ - isSelected: boolean                           │
│ - onClick: () => void                           │
├─────────────────────────────────────────────────┤
│ + getTemplateIcon(): IconComponent              │
│ + getTemplateColorScheme(): object              │
│ + render(): JSX.Element                         │
├─────────────────────────────────────────────────┤
│ - Uses: Badge, Button                           │
│ - Uses: Check Icon                              │
└─────────────────────────────────────────────────┘
                        │
                        │ sibling
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│             TemplatePreview                     │
├─────────────────────────────────────────────────┤
│ - content: string                               │
│ - template: string                              │
│ - isOpen: boolean                               │
├─────────────────────────────────────────────────┤
│ + getTemplateInfo(): TemplateInfo               │
│ + formatDate(): string                          │
│ + ProfessionalPreview(): JSX.Element           │
│ + ModernPreview(): JSX.Element                 │
│ + CreativePreview(): JSX.Element               │
│ + render(): JSX.Element                         │
├─────────────────────────────────────────────────┤
│ - Uses: Dialog, DialogContent, DialogHeader     │
│ - Uses: Calendar, Eye Icons                     │
└─────────────────────────────────────────────────┘

### Form and Input Components

```

┌─────────────────────────────────────────────────┐
│ <<React.FC>> │
│ CoverLetterForm │
├─────────────────────────────────────────────────┤
│ - selectedTemplate: string | null │
│ - jobPosterPreview: string | null │
│ - cvPreview: string | null │
│ - coverLetter: string | null │
│ - loading: boolean │
│ - error: string | null │
│ - jobInputType: "image" | "link" │
│ - jobLink: string │
│ - jobSource: string │
│ - isValidLink: boolean | null │
│ - linkValidating: boolean │
│ - jobInputQuality: InputQualityStatus │
│ - cvInputQuality: InputQualityStatus │
│ - isRelatedInputs: boolean | null │
├─────────────────────────────────────────────────┤
│ + handleSubmit(e: FormEvent): Promise<void> │
│ + handleJobPosterChange(e: ChangeEvent): void │
│ + handleCvChange(e: ChangeEvent): void │
│ + handleJobLinkChange(e: ChangeEvent): void │
│ + handleValidateJobLink(url: string): void │
│ + checkInputQualityBeforeSubmit(): boolean │
│ + render(): JSX.Element │
├─────────────────────────────────────────────────┤
│ - Uses: StreamingText │
│ - Uses: ProgressIndicator │
│ - Uses: DownloadButton │
│ - Uses: InputQualityIndicator │
│ - Uses: AdaptiveContentBanner │
│ - Uses: RadioGroup, Input, Label, Button │
└─────────────────────────────────────────────────┘
│ composition
▼
┌─────────────────────────────────────────────────┐
│ <<React.FC>> │
│ InputQualityIndicator │
├─────────────────────────────────────────────────┤
│ - quality: InputQualityStatus │
│ - label: string │
│ - showTooltip: boolean │
├─────────────────────────────────────────────────┤
│ + getQualityIcon(): IconComponent │
│ + getQualityColor(): string │
│ + getQualityMessage(): string │
│ + render(): JSX.Element │
├─────────────────────────────────────────────────┤
│ - Uses: CheckCircle, AlertTriangle, AlertCircle │
│ - Uses: Info Icons │
│ - Uses: Tooltip │
└─────────────────────────────────────────────────┘
│ sibling
▼
┌─────────────────────────────────────────────────┐
│ <<React.FC>> │
│ AdaptiveContentBanner │
├─────────────────────────────────────────────────┤
│ - hasLimitedJobInfo: boolean │
│ - hasLimitedCvInfo: boolean │
│ - isJobInfoRelevant: boolean │
│ - jobInputQuality: InputQualityStatus │
│ - cvInputQuality: InputQualityStatus │
├─────────────────────────────────────────────────┤
│ + shouldShowBanner(): boolean │
│ + getBannerMessage(): string │
│ + getBannerVariant(): string │
│ + render(): JSX.Element │
├─────────────────────────────────────────────────┤
│ - Uses: Alert, AlertDescription │
│ - Uses: Info, AlertTriangle Icons │
└─────────────────────────────────────────────────┘

```

### Display and Interaction Components

```

┌─────────────────────────────────────────────────┐
│ <<React.FC>> │
│ StreamingText │
├─────────────────────────────────────────────────┤
│ - text: string │
│ - isStreaming: boolean │
│ - speed: number │
│ - onComplete: () => void │
├─────────────────────────────────────────────────┤
│ + useEffect(): void │
│ + startStreaming(): void │
│ + render(): JSX.Element │
├─────────────────────────────────────────────────┤
│ - Uses: useState, useEffect │
└─────────────────────────────────────────────────┘
│ sibling
▼
┌─────────────────────────────────────────────────┐
│ <<React.FC>> │
│ ProgressIndicator │
├─────────────────────────────────────────────────┤
│ - stage: GenerationStage │
│ - progress: number │
│ - message: string │
├─────────────────────────────────────────────────┤
│ + getStageMessage(stage: GenerationStage): string│
│ + getProgressPercentage(): number │
│ + render(): JSX.Element │
├─────────────────────────────────────────────────┤
│ - Uses: Progress component │
│ - Uses: Loader2 Icon │
└─────────────────────────────────────────────────┘
│ sibling
▼
┌─────────────────────────────────────────────────┐
│ <<React.FC>> │
│ DownloadButton │
├─────────────────────────────────────────────────┤
│ - content: string │
│ - template: string │
│ - filename: string │
│ - isGenerating: boolean │
├─────────────────────────────────────────────────┤
│ + generatePDF(): void │
│ + generateDOCX(): void │
│ + getTemplateStyles(): TemplateStyles │
│ + generateSmartFilename(): string │
│ + render(): JSX.Element │
├─────────────────────────────────────────────────┤
│ - Uses: jsPDF, docx libraries │
│ - Uses: Download Icon │
│ - Uses: Button, DropdownMenu │
└─────────────────────────────────────────────────┘

```

├─────────────────────────────────────┤
│ - coverLetter: string │
│ - templateName: string │
│ - loading: boolean │
├─────────────────────────────────────┤
│ + handleCopyToClipboard(): void │
│ + handleShare(): void │
│ + handleBackToHome(): void │
│ + render(): JSX.Element │
├─────────────────────────────────────┤
│ - Uses: TemplatePreview │
│ - Uses: TemplateComparison │
│ - Uses: DownloadButton │
└─────────────────────────────────────┘

```

### Template Interface Components

```
┌─────────────────────────────────────────────────┐
│               <<Interface>>                     │
│          TemplatePreviewCardProps               │
├─────────────────────────────────────────────────┤
│ + template: CoverLetterTemplate                 │
│ + isSelected: boolean                           │
│ + onSelect: () => void                          │
└─────────────────────────────────────────────────┘
                        │ implements
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│           TemplatePreviewCard                   │
├─────────────────────────────────────────────────┤
│ + getTemplateIcon(): JSX.Element                │
│ + getColorClasses(): string                     │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               <<Interface>>                     │
│            TemplatePreviewProps                 │
├─────────────────────────────────────────────────┤
│ + content: string                               │
│ + template: string                              │
└─────────────────────────────────────────────────┘
                        │ implements
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│             TemplatePreview                     │
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

┌─────────────────────────────────────────────────┐
│               <<Interface>>                     │
│           TemplateComparisonProps               │
├─────────────────────────────────────────────────┤
│ + content: string                               │
│ + currentTemplate: string                       │
└─────────────────────────────────────────────────┘
                        │ implements
                        ▼
┌─────────────────────────────────────────────────┐
│               <<React.FC>>                      │
│            TemplateComparison                   │
├─────────────────────────────────────────────────┤
│ + renderTemplatePreview(): JSX.Element          │
│ + render(): JSX.Element                         │
└─────────────────────────────────────────────────┘
```

│ + currentTemplate: string │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ TemplateComparison │
├─────────────────────────────────────┤
│ + renderTemplatePreview(): JSX.Element│
│ + render(): JSX.Element │
└─────────────────────────────────────┘

```

### Enhanced UI Component Classes

```

┌─────────────────────────────────────┐
│ <<Interface>> │
│ StreamingTextProps │
├─────────────────────────────────────┤
│ + text: string │
│ + isLoading: boolean │
│ + template?: string │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ StreamingText │
├─────────────────────────────────────┤
│ - textContainerRef: RefObject<HTMLDivElement> │
├─────────────────────────────────────┤
│ + useEffect(): void │
│ + getTemplateStyles(): string │
│ + render(): JSX.Element │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<Interface>> │
│ DownloadButtonProps │
├─────────────────────────────────────┤
│ + content: string │
│ + template: string │
│ + fileName?: string │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ DownloadButton │
├─────────────────────────────────────┤
│ - isDownloading: boolean │
│ - fileName: string │
├─────────────────────────────────────┤
│ + generateTxtFile(): void │
│ + generatePdfWithTemplate(): void │
│ + generateDocxWithTemplate(): void │
│ + handleDownload(): void │
│ + applyTemplateFormatting(): void │
│ + render(): JSX.Element │
├─────────────────────────────────────┤
│ - Uses: DocumentUtils │
│ - Uses: TemplateEngine │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<Interface>> │
│ InputQualityIndicatorProps │
├─────────────────────────────────────┤
│ + quality: InputQualityStatus │
│ + type: "job" | "cv" │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ InputQualityIndicator │
├─────────────────────────────────────┤
│ + renderIcon(): JSX.Element │
│ + getTooltipMessage(): string │
│ + render(): JSX.Element │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<Interface>> │
│ AdaptiveContentBannerProps │
├─────────────────────────────────────┤
│ + hasLimitedJobInfo: boolean │
│ + hasLimitedCvInfo: boolean │
│ + isJobInfoRelevant: boolean │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ AdaptiveContentBanner │
├─────────────────────────────────────┤
│ + determineBannerStyle(): BannerStyle│
│ + render(): JSX.Element │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<Interface>> │
│ ProgressIndicatorProps │
├─────────────────────────────────────┤
│ + loading: boolean │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ ProgressIndicator │
├─────────────────────────────────────┤
│ + render(): JSX.Element │
└─────────────────────────────────────┘

```

### Shared UI Components

```

┌─────────────────────────────────────┐
│ <<Interface>> │
│ ButtonProps │
├─────────────────────────────────────┤
│ + variant?: ButtonVariant │
│ + size?: ButtonSize │
│ + asChild?: boolean │
│ + className?: string │
│ + children?: React.ReactNode │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ Button │
├─────────────────────────────────────┤
│ + forwardRef(): RefForwardingComponent│
│ + render(): JSX.Element │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<Interface>> │
│ CardProps │
├─────────────────────────────────────┤
│ + className?: string │
│ + children: React.ReactNode │
└─────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────┐
│ <<React.FC>> │
│ Card │
├─────────────────────────────────────┤
│ + render(): JSX.Element │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<React.FC>> │
│ Input │
├─────────────────────────────────────┤
│ + forwardRef(): RefForwardingComponent│
│ + render(): JSX.Element │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ <<React.FC>> │
│ Label │
├─────────────────────────────────────┤
│ + forwardRef(): RefForwardingComponent│
│ + render(): JSX.Element │
└─────────────────────────────────────┘

```

---

## Data Model Classes

### Core Data Interfaces

```

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ CoverLetterTemplate │
├─────────────────────────────────────────────────┤
│ + id: string │
│ + name: string │
│ + description: string │
│ + preview: string │
│ + style: 'professional' | 'creative' | 'modern' │
└─────────────────────────────────────────────────┘
│
│ implements
▼
┌─────────────────────────────────────────────────┐
│ <<constant>> │
│ COVER_LETTER_TEMPLATES │
├─────────────────────────────────────────────────┤
│ + [0]: ProfessionalTemplate │
│ + [1]: ModernTemplate │
│ + [2]: CreativeTemplate │
├─────────────────────────────────────────────────┤
│ + find(id: string): CoverLetterTemplate │
│ + map(): CoverLetterTemplate[] │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<type union>> │
│ InputQualityStatus │
├─────────────────────────────────────────────────┤
│ + "good" | "fair" | "poor" | "unknown" │
├─────────────────────────────────────────────────┤
│ + getQualityColor(): string │
│ + getQualityIcon(): IconComponent │
│ + getQualityMessage(): string │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ GenerationStage │
├─────────────────────────────────────────────────┤
│ + stage: 'processing' | 'extracting' | 'generating' | 'complete'│
│ + message: string │
│ + progress: number │
├─────────────────────────────────────────────────┤
│ + getStageMessage(): string │
│ + getProgressPercentage(): number │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ TemplateInfo │
├─────────────────────────────────────────────────┤
│ + icon: IconComponent │
│ + color: string │
│ + name: string │
│ + bgColor: string │
│ + borderColor: string │
│ + headerBg: string │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ TemplateStyles │
├─────────────────────────────────────────────────┤
│ + fontFamily: string │
│ + fontSize: number │
│ + lineHeight: number │
│ + headerColor: string │
│ + textColor: string │
│ + marginTop: number │
│ + marginBottom: number │
├─────────────────────────────────────────────────┤
│ + applyToDocument(): void │
│ + getPDFStyles(): object │
│ + getDOCXStyles(): object │
└─────────────────────────────────────────────────┘

```

## Service Layer Classes

### API Route Handlers

```

┌─────────────────────────────────────────────────┐
│ <<API Route>> │
│ GenerateRoute │
├─────────────────────────────────────────────────┤
│ + dynamic: 'force-dynamic' │
│ + runtime: 'nodejs' │
├─────────────────────────────────────────────────┤
│ + POST(request: NextRequest): Promise<Response> │
│ + extractTextFromImage(buffer: ArrayBuffer): Promise<string>│
│ + extractTextFromJobLink(url: string): Promise<string>│
│ + extractTextFromPDF(buffer: ArrayBuffer): Promise<string>│
│ + extractTextFromDOCX(buffer: ArrayBuffer): Promise<string>│
│ + assessCVQuality(text: string): QualityAssessment│
│ + generateCoverLetter(params: GenerationParams): Promise<string>│
├─────────────────────────────────────────────────┤
│ - Uses: OpenAI API │
│ - Uses: pdf-parse, mammoth libraries │
│ - Uses: Template context │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ GenerationParams │
├─────────────────────────────────────────────────┤
│ + jobText: string │
│ + cvText: string │
│ + template: string │
│ + language: 'english' | 'indonesian' │
│ + quality: QualityAssessment │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ QualityAssessment │
├─────────────────────────────────────────────────┤
│ + score: number │
│ + issues: string[] │
│ + recommendations: string[] │
│ + hasMinimumInfo: boolean │
└─────────────────────────────────────────────────┘

```

### Utility Service Classes

```

┌─────────────────────────────────────────────────┐
│ <<utility class>> │
│ DocumentUtils │
├─────────────────────────────────────────────────┤
│ + generateCoverLetterFilename(content: string): string│
│ + formatDate(): string │
│ + detectJobSource(url: string): string │
│ + assessJobInputQuality(type: string, input: any): InputQualityStatus│
│ + assessCvInputQuality(file: File): InputQualityStatus│
│ + getQualityTooltipMessage(quality: InputQualityStatus): string│
├─────────────────────────────────────────────────┤
│ - extractCompanyName(content: string): string │
│ - extractJobTitle(content: string): string │
│ - analyzeFileSize(file: File): number │
│ - analyzeContentStructure(text: string): object │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<utility class>> │
│ LinkValidation │
├─────────────────────────────────────────────────┤
│ + validateJobLink(url: string): Promise<boolean>│
│ + isKnownJobSite(url: string): boolean │
│ + extractCompanyFromUrl(url: string): string │
│ + normalizeUrl(url: string): string │
│ + getJobSiteInfo(url: string): JobSiteInfo │
├─────────────────────────────────────────────────┤
│ - checkUrlFormat(url: string): boolean │
│ - detectJobPlatform(hostname: string): string │
│ - validateJobSiteAccess(url: string): Promise<boolean>│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ JobSiteInfo │
├─────────────────────────────────────────────────┤
│ + platform: string │
│ + isSupported: boolean │
│ + extractionMethod: 'web-search' | 'scraping' │
│ + reliability: 'high' | 'medium' | 'low' │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<utility class>> │
│ Utils │
├─────────────────────────────────────────────────┤
│ + cn(...classes: string[]): string │
│ + clsx(...classes: any[]): string │
│ + twMerge(classes: string): string │
├─────────────────────────────────────────────────┤
│ - mergeClassNames(classes: string[]): string │
└─────────────────────────────────────────────────┘

```

## External Interface Classes

### OpenAI API Integration

```

┌─────────────────────────────────────────────────┐
│ <<external service>> │
│ OpenAIService │
├─────────────────────────────────────────────────┤
│ - apiKey: string │
│ - client: OpenAI │
├─────────────────────────────────────────────────┤
│ + generateCoverLetter(params: GenerationParams): Promise<string>│
│ + extractTextFromImage(base64: string): Promise<string>│
│ + extractJobFromUrl(url: string): Promise<string>│
│ + createStreamingResponse(params: any): AsyncIterator<string>│
├─────────────────────────────────────────────────┤
│ - buildPrompt(params: GenerationParams): string │
│ - getTemplateInstructions(template: string): string│
│ - handleStreamingResponse(response: any): AsyncIterator<string>│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ OpenAIModels │
├─────────────────────────────────────────────────┤
│ + GPT_4: 'gpt-4' │
│ + GPT_4_VISION: 'gpt-4-vision-preview' │
│ + GPT_4_SEARCH: 'gpt-4o-search-preview' │
│ + GPT_4O_MINI: 'o4-mini' │
└─────────────────────────────────────────────────┘

```

### Document Generation Services

```

┌─────────────────────────────────────────────────┐
│ <<service class>> │
│ DocumentGenerator │
├─────────────────────────────────────────────────┤
│ + generatePDF(content: string, template: string): Blob│
│ + generateDOCX(content: string, template: string): Blob│
│ + getTemplateStyles(template: string): TemplateStyles│
│ + generateSmartFilename(content: string): string│
├─────────────────────────────────────────────────┤
│ - applyPDFStyling(doc: jsPDF, template: string): void│
│ - applyDOCXStyling(doc: Document, template: string): void│
│ - extractMetadata(content: string): DocumentMetadata│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ <<interface>> │
│ DocumentMetadata │
├─────────────────────────────────────────────────┤
│ + companyName: string | null │
│ + jobTitle: string | null │
│ + applicantName: string | null │
│ + date: Date │
└─────────────────────────────────────────────────┘

```

## Class Relationships

### Component Hierarchy

```

Application
├── HomePage
│ ├── TemplateSelection
│ │ └── TemplatePreviewCard
│ └── TemplatePreview (Modal)
│
├── GeneratePage
│ └── CoverLetterForm
│ ├── InputQualityIndicator
│ ├── AdaptiveContentBanner
│ ├── ProgressIndicator
│ ├── StreamingText
│ └── DownloadButton
│
└── ResultPage
├── TemplatePreview
├── TemplateComparison
└── DownloadButton

```

```

### Service Dependencies

```

Components → Utility Classes → External Services
│ │ │
▼ ▼ ▼
UI Components → DocumentUtils → OpenAI API
│ │ │
▼ ▼ ▼
Form Handling → LinkValidation → Job Sites
│ │ │
▼ ▼ ▼
State Management → Utils → File Processing

```

### Data Flow Patterns

```

Template Selection → Form Input → Validation → Processing → Generation → Display
│ │ │ │ │ │
▼ ▼ ▼ ▼ ▼ ▼
CoverLetterTemplate → FormData → QualityAssessment → APICall → StreamingText → ResultPage

```

## Key Design Decisions

### Component Design

- **Functional Components**: All components use React hooks for state management
- **Composition Pattern**: Complex components built from smaller, reusable pieces
- **Props Interface**: Type-safe component interfaces with TypeScript

### State Management

- **Local State**: useState for component-specific state
- **URL State**: Next.js router for template selection persistence
- **Global State**: Minimal global state, prefer prop drilling for simplicity

### Service Architecture

- **Utility Classes**: Pure functions for data processing and validation
- **API Routes**: Next.js API routes for server-side processing
- **External Services**: Abstracted interfaces for third-party integrations

### Error Handling

- **Graceful Degradation**: Components handle missing data gracefully
- **Error Boundaries**: React error boundaries for component-level error handling
- **Validation Layers**: Multiple validation layers (client-side, API, external service)

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Last Updated: July 15, 2025 - Reflects current implementation with complete template system, quality assessment, and streaming capabilities_

```

```
