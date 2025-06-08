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

## Main Activity Diagram: Cover Letter Generation Process

```
                             ●
                             │
                    ┌────────▼────────┐
                    │  User Accesses  │
                    │  Application    │
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
               │ Quality        │    │ Format        │
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
                    │ Quality        │
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
                    │ Assess Input   │
                    │ Quality        │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Generate Cover │
                    │ Letter via AI  │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌─ ─ ─ ─▼─ ─ ─ ─┐
                    │ Stream Content │
                    │ to Interface   │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                    ┌────────▼────────┐
                    │  Display        │
                    │  Generated      │
                    │  Cover Letter   │
                    └────────┬────────┘
                             │
                          ◇──┴──◇
                         /      \
                    [Copy]    [Download]
                       /          \
              ┌────────▼────────┐  ┌────────▼────────┐
              │  Copy to        │  │  Select Format  │
              │  Clipboard      │  │  (PDF/DOCX)     │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
                       │           ┌─ ─ ─ ─▼─ ─ ─ ─┐
                       │           │ Generate File  │
                       │           │ Download       │
                       │           └─ ─ ─ ─┬─ ─ ─ ─┘
                       │                    │
                       └──────┬─────────────┘
                              │
                             ◐
```

## Detailed Activity Diagram: Input Quality Assessment

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
                    │ Calculate      │
                    │ Quality Scores │
                    └─ ─ ─ ─┬─ ─ ─ ─┘
                             │
                          ◇──┴──◇
                         /      \
            [Job: Good,        [Job: Good,
             CV: Good]          CV: Limited]
                /                      \
       ┌────────▼────────┐    ┌────────▼────────┐
       │ Set Standard    │    │ Set Job-Focused │
       │ Generation Mode │    │ Generation Mode │
       └────────┬────────┘    └────────┬────────┘
                │                      │
                └──────┬───────────────┘
                       │
                    ◇──┴──◇
                   /      \
        [Job: Limited,  [Job: Limited,
         CV: Good]       CV: Limited]
             /              \
    ┌────────▼────────┐  ┌────────▼────────┐
    │ Set CV-Focused  │  │ Set Generic     │
    │ Generation Mode │  │ Generation Mode │
    └────────┬────────┘  └────────┬────────┘
             │                    │
             └──────┬─────────────┘
                    │
           ┌────────▼────────┐
           │ Return Quality  │
           │ Assessment      │
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

## Activity Diagram: Download Process

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
              │ Format Content  │  │ Format Content  │
              │ for PDF         │  │ for DOCX        │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
              ┌─ ─ ─ ─▼─ ─ ─ ─┐    ┌─ ─ ─ ─▼─ ─ ─ ─┐
              │ Generate PDF   │    │ Generate DOCX  │
              │ Document       │    │ Document       │
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
            │ Filename        │  │ Message         │
            └────────┬────────┘  └────────┬────────┘
                     │                    │
            ┌─ ─ ─ ─▼─ ─ ─ ─┐             │
            │ Initiate File  │             │
            │ Download       │             │
            └─ ─ ─ ─┬─ ─ ─ ─┘             │
                     │                    │
            ┌────────▼────────┐            │
            │ Show Success    │            │
            │ Notification    │            │
            └────────┬────────┘            │
                     │                    │
                     └──────┬─────────────┘
                            │
                           ◐
```

## Flow Descriptions

### Main Flow Descriptions

1. **Input Selection**: User chooses between image upload or URL link input
2. **Validation**: System validates input quality and provides feedback
3. **Content Extraction**: AI extracts relevant information from inputs
4. **Quality Assessment**: System determines optimal generation strategy
5. **Generation**: AI creates personalized cover letter content
6. **Streaming**: Real-time display of generated content
7. **Output Actions**: User can copy or download the result

### Quality Assessment Flow

- **Standard Mode**: Both job info and CV are high quality
- **Job-Focused Mode**: Good job info, limited CV data
- **CV-Focused Mode**: Limited job info, good CV data
- **Generic Mode**: Both inputs have quality limitations

### Error Handling Strategy

- **File Errors**: Invalid format, corrupted files, size limits
- **Network Errors**: API timeouts, connection issues, service unavailable
- **Validation Errors**: Missing required fields, invalid URLs

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Date: June 9, 2025_
