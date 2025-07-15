# Activity Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains activity diagrams for the Cover Letter Web Application, following RUP methodology standards and reflecting the current implementation.

## Legend

```
┌─────────┐    Decision Node (Diamond)
│         │
└─────────┘

●              Start Node (Filled Circle)
◐              End Node (Filled Circle with Ring)
┌─────────┐
│ Action  │    Activity/Action Node (Rectangle)
└─────────┘

┌─ ─ ─ ─ ─┐
│ System  │    System Action (Dashed Rectangle)
└─ ─ ─ ─ ─┘

→              Control Flow
[condition]    Gu7. **Template-aware Generation**: AI creates personalized cover letter content with template context
8. **Streaming with Formatting**: Real-time display of generated content with template styling
9. **Enhanced Output Actions**: User can copy, download with template formatting, or share generated documentCondition
```

## Primary Activity Diagram: Complete Cover Letter Generation Process

```
                             ●
                             │
                    ┌────────▼────────┐
                    │  User Accesses  │
                    │  Application    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Display        │
                    │  Template       │
                    │  Selection Page │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                   [Preview]   [Select]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Show Template  │  │  Select         │
              │  Preview Dialog │  │  Template       │
              │  with Mock      │  │  (Professional, │
              │  Content        │  │  Modern, or     │
              │                 │  │  Creative)      │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
                       └──────┬─────────────┘
                              │
                    ┌────────▼────────┐
                    │  Enable         │
                    │  Continue       │
                    │  Button         │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Navigate to    │
                    │  Generation     │
                    │  Form with      │
                    │  Template Param │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Display Form   │
                    │  with Selected  │
                    │  Template Info  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Select Job     │
                    │  Input Method   │
                    │  (Radio Group)  │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [Image]    [Link]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Upload Job     │  │  Enter Job      │
              │  Poster Image   │  │  Posting URL    │
              │  (JPG/PNG)      │  │  in Text Field  │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
               ┌─ ─ ─ ─▼─ ─ ─ ─┐    ┌─ ─ ─ ─▼─ ─ ─ ─┐
               │ Process Image  │    │ Validate URL  │
               │ - File Size    │    │ - Format Check│
               │ - Format Check │    │ - Real-time   │
               │ - Quality      │    │ - Source      │
               │   Assessment   │    │   Detection   │
               └─ ─ ─ ─┬─ ─ ─ ─┘    └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
               ┌─ ─ ─ ─▼─ ─ ─ ─┐    ┌─ ─ ─ ─▼─ ─ ─ ─┐
               │ Display Image │    │ Display URL   │
               │ Quality       │    │ Validation    │
               │ Indicator     │    │ Status &      │
               │ (Good/Fair/   │    │ Job Source    │
               │  Poor)        │    │ (LinkedIn/    │
               │               │    │  Indeed/etc.) │
               └─ ─ ─ ─┬─ ─ ─ ─┘    └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       └──────┬─────────────┘
                              │
                    ┌────────▼────────┐
                    │  Upload CV      │
                    │  File (PDF/     │
                    │  DOCX)          │
                    └────────┬────────┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Process CV     │
                    │ - Format Check │
                    │ - Size Check   │
                    │ - Content      │
                    │   Analysis     │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Display CV     │
                    │ Quality        │
                    │ Indicator      │
                    │ (Good/Fair/    │
                    │  Poor)         │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Show Overall   │
                    │ Quality        │
                    │ Assessment &   │
                    │ Adaptive       │
                    │ Content Banner │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌────────▼────────┐
                    │  Select         │
                    │  Language       │
                    │  (English/      │
                    │  Bahasa)        │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Click Generate │
                    │  Cover Letter   │
                    │  Button         │
                    └────────┬────────┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Display        │
                    │ Progress       │
                    │ Indicator      │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                          ◇──┴──◇
                         /      \
                    [Image]    [Link]
                       /          \
              ┌─ ─ ─ ─▼─ ─ ─ ─┐  ┌─ ─ ─ ─▼─ ─ ─ ─┐
              │ Extract Text   │  │ Extract Job   │
              │ from Image     │  │ Info from URL │
              │ using OpenAI   │  │ using OpenAI  │
              │ Vision API     │  │ Web Search    │
              └─ ─ ─ ─┬─ ─ ─ ─┘  └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                  │
                       └──────┬───────────┘
                              │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Extract Text   │
                    │ from CV using  │
                    │ PDF/DOCX       │
                    │ Parsers        │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Analyze        │
                    │ Content        │
                    │ Quality &      │
                    │ Relevance      │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Generate       │
                    │ Cover Letter   │
                    │ using OpenAI   │
                    │ with Template  │
                    │ Instructions   │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Stream         │
                    │ Generated      │
                    │ Content in     │
                    │ Real-time      │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌────────▼────────┐
                    │  Display        │
                    │  Generated      │
                    │  Cover Letter   │
                    │  in Template    │
                    │  Style          │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Show Download  │
                    │  Options &      │
                    │  Template       │
                    │  Switcher       │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                [Switch Template] [Download]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Open Template  │  │  Select Format  │
              │  Switcher       │  │  (PDF/DOCX)     │
              │  Dialog         │  │                 │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
              ┌────────▼────────┐  ┌─ ─ ─ ─▼─ ─ ─ ─┐
              │  Select New     │  │ Generate       │
              │  Template &     │  │ Document with  │
              │  Apply to       │  │ Template-      │
              │  Existing       │  │ specific       │
              │  Content        │  │ Formatting     │
              └────────┬────────┘  └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       │           ┌─ ─ ─ ─▼─ ─ ─ ─┐
                       │           │ Download File  │
                       │           │ with Smart     │
                       │           │ Filename       │
                       │           └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       └──────┬─────────────┘
                              │
                             ◐
```

                    │  Language       │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Click Generate │
                    │  Button         │
                    └────────┬────────┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Extract Job    │
                    │ Information    │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Extract CV     │
                    │ Content        │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Generate Cover │
                    │ Letter with    │
                    │ Template       │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Stream Content │
                    │ to Interface   │
                    │ with Template  │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌────────▼────────┐
                    │  Display        │
                    │  Generated      │
                    │  Cover Letter   │
                    │  with Template  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Choose Action  │
                    │  (Copy/Download │
                    │  /Share)        │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [Copy]    [Download]
                       /         \
              ┌────────▼────────┐ ┌────────▼────────┐
              │  Copy to        │ │  Select Format  │
              │  Clipboard      │ │  (PDF/DOCX)     │
              └────────┬────────┘ └────────┬────────┘
                       │                   │
                       │          ┌─ ─ ─ ─▼─ ─ ─ ─┐
                       │          │ Generate       │
                       │          │ Document with  │
                       │          │ Template-      │
                       │          │ specific       │
                       │          │ Formatting     │
                       │          └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                   │
                       │          ┌────────▼────────┐
                       │          │  Download File  │
                       │          │  to Device      │
                       │          └────────┬────────┘
                       │                   │
                       └───────────────────┘
                                           │
                                           ▼
                                           ◐
                │          ┌─ ─ ─ ─▼─ ─ ─ ─┐
                │          │ Generate File  │
                │          │ with Template  │
                │          │ Formatting     │
                │          └─ ─ ─ ─┬─ ─ ─ ─┘
                │                   │
                └─────┬─────────────┘
                      │
             ┌─ ─ ─ ─▼─ ─ ─ ─┐
             │ Apply New     │
             │ Template      │
             │ Formatting    │
             └─ ─ ─ ─┬─ ─ ─ ─┘
                      │
             ┌────────▼────────┐
             │  Update Display │
             │  with New       │
             │  Template       │
             └────────┬────────┘
                      │
                     ◐

```

## Activity Diagram: Template Selection and Preview Process

```

                             ●
                             │
                    ┌────────▼────────┐
                    │  Display        │
                    │  Template       │
                    │  Options        │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Show Template  │
                    │  Cards with     │
                    │  Descriptions   │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                   [Preview]   [Select]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Open Preview   │  │  Highlight      │
              │  Dialog         │  │  Selected       │
              └────────┬────────┘  │  Template       │
                       │           └────────┬────────┘
              ┌────────▼────────┐           │
              │  Display Sample │           │
              │  Cover Letter   │           │
              │  with Template  │           │
              │  Formatting     │           │
              └────────┬────────┘           │
                       │                    │
              ┌────────▼────────┐           │
              │  Show Template  │           │
              │  Features and   │           │
              │  Style Details  │           │
              └────────┬────────┘           │
                       │                    │
                    ◇──┴──◇                │
                   /      \                │
              [Close]    [Select]          │
                 /          \              │
        ┌────────▼────────┐  ┌────────▼────────┐
        │  Return to      │  │  Highlight      │
        │  Template       │  │  Selected       │
        │  Selection      │  │  Template       │
        └────────┬────────┘  └────────┬────────┘
                 │                    │
                 └──────┬─────────────┘
                        │
               ┌────────▼────────┐
               │  Enable         │
               │  Continue       │
               │  Button         │
               └────────┬────────┘
                        │
               ┌────────▼────────┐
               │  Navigate to    │
               │  Generation     │
               │  Form           │
               └────────┬────────┘
                        │
                       ◐

```

## Detailed Activity Diagram: Input Quality Assessment with Visual Indicators

```

                             ●
                             │
                    ┌────────▼────────┐
                    │  Receive Job    │
                    │  Information    │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [Image]    [Link]
                       /          \
           ┌──────────▼──────────┐  ┌────────▼────────┐
           │ Analyze Image       │  │ Analyze Link    │
           │ - Resolution        │  │ - URL Format    │
           │ - Text Clarity      │  │ - Job Source    │
           │ - Content Quality   │  │ - Accessibility │
           └──────────┬──────────┘  └────────┬────────┘
                      │                      │
           ┌─ ─ ─ ─ ─▼─ ─ ─ ─ ─┐    ┌─ ─ ─ ─▼─ ─ ─ ─┐
           │ Display Quality   │    │ Display Link   │
           │ Indicator         │    │ Validation     │
           │ (Red/Yellow/Green)│    │ Status         │
           └─ ─ ─ ─ ─┬─ ─ ─ ─ ─┘    └─ ─ ─ ─┬─ ─ ─ ─┘
                      │                      │
                      └──────┬───────────────┘
                             │
                    ┌────────▼────────┐
                    │  Receive CV     │
                    │  File           │
                    └────────┬────────┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Analyze CV     │
                    │ - File Format  │
                    │ - Content      │
                    │ - Completeness │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Display CV     │
                    │ Quality        │
                    │ Indicator      │
                    │ (Red/Yellow/   │
                    │ Green)         │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Calculate      │
                    │ Overall        │
                    │ Quality Scores │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                          ◇──┴──◇
                         /      \
            [Both Good]         [Mixed Quality]
                /                      \
       ┌────────▼────────┐             │
       │ Set Standard    │             │
       │ Generation Mode │             │
       │ (Green Banner)  │             │
       └────────┬────────┘             │
                │                      │
                │                   ◇──┴──◇
                │                  /      \
                │        [Job Good,      [Job Limited,
                │         CV Limited]     CV Good]
                │             /              \
                │    ┌────────▼────────┐  ┌────────▼────────┐
                │    │ Set Job-Focused │  │ Set CV-Focused  │
                │    │ Generation Mode │  │ Generation Mode │
                │    │ (Yellow Banner) │  │ (Yellow Banner) │
                │    └────────┬────────┘  └────────┬────────┘
                │             │                    │
                │             └──────┬─────────────┘
                │                    │
                │                 ◇──┴──◇
                │                /      \
                │     [Both Limited]   [Continue]
                │           /               \
                │  ┌────────▼────────┐      │
                │  │ Set Generic     │      │
                │  │ Generation Mode │      │
                │  │ (Red Banner)    │      │
                │  └────────┬────────┘      │
                │           │               │
                └───────────┼───────────────┘
                            │
                   ┌────────▼────────┐
                   │ Display         │
                   │ Adaptive        │
                   │ Content Banner  │
                   │ with Tips       │
                   └────────┬────────┘
                            │
                   ┌────────▼────────┐
                   │ Return Quality  │
                   │ Assessment &    │
                   │ Visual Feedback │
                   └────────┬────────┘
                            │
                           ◐

```

## Activity Diagram: Error Handling Workflow

```

                             ●
                             │
                    ┌────────▼────────┐
                    │  Process User   │
                    │  Input          │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [Valid]   [Invalid]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Continue       │  │  Determine      │
              │  Processing     │  │  Error Type     │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
                       │                 ◇──┴──◇
                       │                /      \
                       │         [File]      [Network]
                       │            /            \
                       │   ┌────────▼────────┐  ┌────────▼────────┐
                       │   │ Display File    │  │ Display Network │
                       │   │ Error Message   │  │ Error Message   │
                       │   └────────┬────────┘  └────────┬────────┘
                       │            │                    │
                       │            └──────┬─────────────┘
                       │                   │
                       │          ┌────────▼────────┐
                       │          │  Prompt User    │
                       │          │  to Retry       │
                       │          └────────┬────────┘
                       │                   │
                       │                ◇──┴──◇
                       │               /      \
                       │          [Retry]   [Cancel]
                       │             /          \
                       └─────────────┘          ┌────────▼────────┐
                                                │ Return to       │
                                                │ Main Interface  │
                                                └────────┬────────┘
                                                         │
                                                        ◐

```

## Activity Diagram: Download Process with Template Formatting

```

                             ●
                             │
                    ┌────────▼────────┐
                    │  User Clicks    │
                    │  Download       │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Display Format │
                    │  Options        │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [PDF]      [DOCX]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │ Apply Template  │  │ Apply Template  │
              │ Formatting      │  │ Formatting      │
              │ for PDF         │  │ for DOCX        │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
              ┌─ ─ ─ ─▼─ ─ ─ ─┐    ┌─ ─ ─ ─▼─ ─ ─ ─┐
              │ Generate PDF   │    │ Generate DOCX  │
              │ with Template  │    │ with Template  │
              │ Styling        │    │ Styling        │
              └─ ─ ─ ─┬─ ─ ─ ─┘    └─ ─ ─ ─┬─ ─ ─ ─┘
                      │                     │
                      └──────┬──────────────┘
                             │
                          ◇──┴──◇
                         /      \
                  [Success]   [Error]
                     /          \
            ┌────────▼────────┐  ┌────────▼────────┐
            │ Generate        │  │ Display Error   │
            │ Filename with   │  │ Message         │
            │ Job/Company     │  └────────┬────────┘
            │ Info            │           │
            └────────┬────────┘           │
                     │                   │
            ┌─ ─ ─ ─▼─ ─ ─ ─┐            │
            │ Initiate File  │            │
            │ Download with  │            │
            │ Template       │            │
            │ Formatting     │            │
            └─ ─ ─ ─┬─ ─ ─ ─┘            │
                     │                   │
            ┌────────▼────────┐           │
            │ Show Success    │           │
            │ Notification    │           │
            └────────┬────────┘           │
                     │                   │
                     └──────┬────────────┘
                            │
                           ◐

```

## Flow Descriptions

### Main Flow Descriptions

1. **Template Selection**: User chooses from professional, modern, or creative templates with preview capability
2. **Input Selection**: User chooses between image upload or URL link input
3. **Real-time Validation**: System validates input quality and provides visual feedback with color-coded indicators
4. **Content Extraction**: AI extracts relevant information from inputs
5. **Quality Assessment**: System determines optimal generation strategy and shows adaptive banners
6. **Template-aware Generation**: AI creates personalized cover letter content with template context
7. **Streaming with Formatting**: Real-time display of generated content with template styling
8. **Template Switching**: Content-preserving template changes for optimal presentation
9. **Enhanced Output Actions**: User can copy, download with template formatting, or preview styled document

### Template System Flow

- **Selection Phase**: Choose template → Preview options → Confirm selection
- **Generation Phase**: Generate content with template context → Apply formatting → Display styled result
- **Output Phase**: Copy to clipboard or download with template formatting

### Quality Assessment Flow with Visual Indicators

- **Green Indicators**: High quality inputs - Standard generation mode
- **Yellow Indicators**: Mixed quality - Job-focused or CV-focused modes
- **Red Indicators**: Low quality inputs - Generic mode with adaptive guidance
- **Real-time Feedback**: Instant visual feedback as users upload files or enter URLs

### Error Handling Strategy

- **File Errors**: Invalid format, corrupted files, size limits with quality indicators
- **Network Errors**: API timeouts, connection issues, service unavailable
- **Validation Errors**: Missing required fields, invalid URLs with real-time feedback
- **Generation Errors**: AI processing failures, content generation issues

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Updated: July 15, 2025 - Reflects current implementation with visual template system, real-time quality indicators, and enhanced user experience workflows_
```
