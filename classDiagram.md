┌─────────────────────────────────┐                   ┌─────────────────────────────────┐
│           HomePage              │                   │           ResultPage            │
├─────────────────────────────────┤                   ├─────────────────────────────────┤
│- selectedTemplate: string|null  │                   │- coverLetterContent: string     │
│- router: NextRouter             │                   │- selectedTemplate: string       │
├─────────────────────────────────┤                   ├─────────────────────────────────┤
│+ handleTemplateSelect(): void   │                   │+ handleTemplateSwitch(): void   │
│+ handleContinue(): void         │                   │+ handleDownload(): void         │
└───────────────┬─────────────────┘                   └────┬───────────────┬────────────┘
                │                                         │               │
                │ ♦───uses                                │ ♦───uses      │ ♦───uses
                │ 1     1                                 │ 1     1       │ 1     1
                ▼                                         ▼               │
┌─────────────────────────────────┐        ┌─────────────────────────────┐│
│      TemplateSelection          │        │      TemplatePreview        ││
├─────────────────────────────────┤        ├─────────────────────────────┤│
│- templates: CoverLetterTemplate[]│        │- content: string            ││
│- selectedTemplate: string|null   │        │- template: string           ││
├─────────────────────────────────┤        ├─────────────────────────────┤│
│+ getIcon(): IconComponent       │        │+ getTemplateInfo(): TemplateInfo│
│+ getColorClasses(): string      │        │+ ProfessionalPreview(): JSX  ││
└───────────────┬─────────────────┘        │+ ModernPreview(): JSX        ││
                │                          │+ CreativePreview(): JSX      ││
                │ ♦───uses                 └─────────────────┬────────────┘│
                │ 1     3..*                                 │             │
                ▼                                            │             │
┌─────────────────────────────────┐                          │             │
│      TemplatePreviewCard        │                          │             │
├─────────────────────────────────┤                          │             │
│- template: CoverLetterTemplate  │                          │             │
│- isSelected: boolean            │                          │             ▼
├─────────────────────────────────┤                          │    ┌─────────────────────────────────┐
│+ getTemplateIcon(): IconComponent│                          │    │        DownloadButton           │
│+ getTemplateColorScheme(): object│                          │    ├─────────────────────────────────┤
└─────────────────────────────────┘                          │    │- content: string                │
                │                                            │    │- template: string               │
                │                                            │    ├─────────────────────────────────┤
                │ ◇───refers to                              │    │+ generatePDF(): void            │
                │ 0..*  1                                    │    │+ generateDOCX(): void           │
                ▼                                            │    │+ getTemplateStyles(): Template  │
┌─────────────────────────────────┐                          │    └───────────────┬─────────────────┘
│       <<Interface>>            │                          │                    │
│     CoverLetterTemplate        │                          │                    │ ----> depends on
├─────────────────────────────────┤                          │                    │ 1     1
│+ id: string                     │                          │                    │
│+ name: string                   │<─────────────────────────┘    ┌─────────────────────────────────┐
│+ description: string            │                               │      DocumentGenerator          │
│+ style: string                  │                               ├─────────────────────────────────┤
└─────────────────────────────────┘                               │+ generatePDF(): Blob            │
                                                                 │+ generateDOCX(): Blob           │
┌─────────────────────────────────┐                               │+ getTemplateStyles(): Template  │
│       GeneratePage             │                               └─────────────────────────────────┘
├─────────────────────────────────┤
│- selectedTemplate: string|null  │
│- templateName: string           │
├─────────────────────────────────┤
│+ handleBackToTemplates(): void  │
└───────────────┬─────────────────┘
                │
                │ ♦───uses
                │ 1     1
                ▼
┌─────────────────────────────────┐                               ┌─────────────────────────────────┐
│      CoverLetterForm           │───────────────────────────────>│         GenerateRoute           │
├─────────────────────────────────┤          submits to           ├─────────────────────────────────┤
│- selectedTemplate: string|null  │             1     1           │+ POST(): Promise<Response>       │
│- loading: boolean               │                               │+ extractTextFromImage(): Promise │
│- jobInputType: "image"|"link"   │                               │+ extractTextFromJobLink(): Promise│
│- jobInputQuality: InputQuality  │                               │+ generateCoverLetter(): Promise  │
│- cvInputQuality: InputQuality   │                               └───────────────┬─────────────────┘
├─────────────────────────────────┤                                               │
│+ handleSubmit(): Promise<void>  │                                               │ ----> depends on
│+ handleJobPosterChange(): void  │                                               │ 1     1
│+ handleCvChange(): void         │                                               ▼
│+ handleJobLinkChange(): void    │                               ┌─────────────────────────────────┐
└───────┬─────────────┬───────────┘                               │        OpenAIService            │
        │             │                                           ├─────────────────────────────────┤
        │ ♦───uses    │ ♦───uses                                 │- apiKey: string                 │
        │ 1     1     │ 1     1                                  │- client: OpenAI                  │
        ▼             ▼                                           ├─────────────────────────────────┤
┌───────────────┐ ┌───────────────┐                               │+ generateCoverLetter(): Promise  │
│StreamingText  │ │ProgressIndicator│                              │+ extractTextFromImage(): Promise  │
└───────────────┘ └───────────────┘                               │+ extractJobFromUrl(): Promise     │
                                                                 └─────────────────────────────────┘