# Activity Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains activity diagrams for the Cover Letter Web Application, following RUP methodology standards.

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
```

## Main Activity Diagram: Cover Letter Generation Process with Template System

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
                    │  Selection      │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                   [Preview]   [Select]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Show Template  │  │  Select         │
              │  Preview Dialog │  │  Template       │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
                       └──────┬─────────────┘
                              │
                    ┌────────▼────────┐
                    │  Navigate to    │
                    │  Generation     │
                    │  Form           │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Select Input   │
                    │  Method         │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [Image]    [Link]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Upload Job     │  │  Enter Job      │
              │  Poster Image   │  │  Posting URL    │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
               ┌─ ─ ─ ─▼─ ─ ─ ─┐    ┌─ ─ ─ ─▼─ ─ ─ ─┐
               │ Validate Image │    │ Validate URL  │
               │ Quality & Show │    │ Format & Show │
               │ Indicator      │    │ Indicator     │
               └─ ─ ─ ─┬─ ─ ─ ─┘    └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       └──────┬─────────────┘
                              │
                    ┌────────▼────────┐
                    │  Upload CV      │
                    │  File           │
                    └────────┬────────┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Validate CV    │
                    │ Quality & Show │
                    │ Indicator      │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Display        │
                    │ Quality        │
                    │ Assessment     │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌────────▼────────┐
                    │  Select         │
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
                          ◇──┴──◇
                         /      \
               [More Actions]  [Template Switch]
                       /             \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Choose Action  │  │  Open Template  │
              │  (Copy/Download │  │  Switch Dialog  │
              │  /Preview)      │  └────────┬────────┘
              └────────┬────────┘           │
                       │           ┌────────▼────────┐
                    ◇──┴──◇        │  Select New     │
                   /      \        │  Template       │
             [Copy]    [Download]   └────────┬────────┘
                /         \                 │
       ┌────────▼────────┐ ┌────────▼────────┐
       │  Copy to        │ │  Select Format  │
       │  Clipboard      │ │  (PDF/DOCX)     │
       └────────┬────────┘ └────────┬────────┘
                │                   │
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

## Activity Diagram: Template Switching Process

```
                             ●
                             │
                    ┌────────▼────────┐
                    │  User on        │
                    │  Result Page    │
                    │  with Generated │
                    │  Content        │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Click Switch   │
                    │  Template       │
                    │  Button         │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Open Template  │
                    │  Switch Dialog  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Display        │
                    │  Available      │
                    │  Templates      │
                    │  (excluding     │
                    │  current)       │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                   [Cancel]    [Select New]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Close Dialog   │  │  Confirm        │
              │  No Changes     │  │  Template       │
              └────────┬────────┘  │  Selection      │
                       │           └────────┬────────┘
                       │                    │
                       │           ┌─ ─ ─ ─▼─ ─ ─ ─┐
                       │           │ Update URL     │
                       │           │ Parameters     │
                       │           └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       │           ┌─ ─ ─ ─▼─ ─ ─ ─┐
                       │           │ Preserve       │
                       │           │ Content        │
                       │           │ Unchanged      │
                       │           └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       │           ┌────────▼────────┐
                       │           │  Apply New      │
                       │           │  Template       │
                       │           │  Styling        │
                       │           └────────┬────────┘
                       │                    │
                       │           ┌────────▼────────┐
                       │           │  Update         │
                       │           │  Display        │
                       │           └────────┬────────┘
                       │                    │
                       │           ┌────────▼────────┐
                       │           │  Show Success   │
                       │           │  Notification   │
                       │           └────────┬────────┘
                       │                    │
                       └──────┬─────────────┘
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
- **Switching Phase**: Select new template → Preserve content → Apply new styling → Update display

### Quality Assessment Flow with Visual Indicators

- **Green Indicators**: High quality inputs - Standard generation mode
- **Yellow Indicators**: Mixed quality - Job-focused or CV-focused modes
- **Red Indicators**: Low quality inputs - Generic mode with adaptive guidance
- **Real-time Feedback**: Instant visual feedback as users upload files or enter URLs

### Template Switching Strategy

- **Content Preservation**: Original text content remains completely unchanged
- **Style Application**: New template formatting applied to existing content
- **URL Management**: Template parameter updated while preserving content parameter
- **User Feedback**: Success notifications confirm template changes

### Error Handling Strategy

- **File Errors**: Invalid format, corrupted files, size limits with quality indicators
- **Network Errors**: API timeouts, connection issues, service unavailable
- **Validation Errors**: Missing required fields, invalid URLs with real-time feedback
- **Template Errors**: Template switching failures, formatting issues

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Updated: June 23, 2025 - Reflects current implementation with visual template system, real-time quality indicators, content-preserving template switching, and enhanced user experience workflows_
