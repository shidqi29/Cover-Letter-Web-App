# Sequence Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains sequence diagrams for the Cover Letter Web Application, following RUP methodology standards. These diagrams illustrate the interaction between system components over time.

## Legend

```
Actor/Object     Message/Call           Return/Response
┌─────────┐      ────────────────►      ◄────────────────
│         │      Synchronous Call      Synchronous Return
│ Entity  │
└─────────┘      ┌ ─ ─ ─ ─ ─ ─ ─►      ◄─ ─ ─ ─ ─ ─ ─ ┐
     │           │ Asynchronous Call    Asynchronous Return
     │
     │           ────────────────►
     ▼           Self Call/Loop
```

## Primary Sequence Diagrams

### 1. Template Selection and Cover Letter Generation Process

```
Job Seeker    Template UI     Quality Indicator    API Route    Template Engine    OpenAI API
    │             │              │                    │               │               │
    │ Access App   │              │                    │               │               │
    ├─────────────►│              │                    │               │               │
    │             │ Show Templates│                    │               │               │
    │             ├─────────────►│                    │               │               │
    │             │ Template Options                   │               │               │
    │             ◄─────────────┤                    │               │               │
    │ Preview Template           │                    │               │               │
    ├─────────────►│              │                    │               │               │
    │             │ Show Preview Dialog                │               │               │
    │             ├─────────────►│                    │               │               │
    │             │ Template Preview                   │               │               │
    │             ◄─────────────┤                    │               │               │
    │ Select Template            │                    │               │               │
    ├─────────────►│              │                    │               │               │
    │             │ Navigate to Generation Form       │               │               │
    │             ├─────────────►│                    │               │               │
    │             │              │                    │               │               │
    │ Upload Image │              │                    │               │               │
    ├─────────────►│              │                    │               │               │
    │             │ Assess Quality│                    │               │               │
    │             ├─────────────►│                    │               │               │
    │             │ Quality Score (Green/Yellow/Red)   │               │               │
    │             ◄─────────────┤                    │               │               │
    │ Show Quality Indicator     │                    │               │               │
    ◄─────────────┤              │                    │               │               │
    │             │              │                    │               │               │
    │ Upload CV    │              │                    │               │               │
    ├─────────────►│              │                    │               │               │
    │             │ Assess CV Quality                  │               │               │
    │             ├─────────────►│                    │               │               │
    │             │ CV Quality Score                   │               │               │
    │             ◄─────────────┤                    │               │               │
    │ Show CV Quality Indicator  │                    │               │               │
    ◄─────────────┤              │                    │               │               │
    │             │              │                    │               │               │
    │ Click Generate              │                    │               │               │
    ├─────────────►│              │                    │               │               │
    │             │ POST /api/generate with template   │               │               │
    │             ├─────────────────────────────────►│               │               │
    │             │              │                    │ Get Template Context          │
    │             │              │                    ├──────────────►│               │
    │             │              │                    │ Template Info │               │
    │             │              │                    ◄──────────────┤               │
    │             │              │                    │ Generate with Template Context│
    │             │              │                    ├─────────────────────────────►│
    │             │              │                    │ Stream Template-Aware Content │
    │             │              │                    ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┤
    │             │ Stream with Template Styling      │               │               │
    │             ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┤               │               │
    │ Display Styled Content     │                    │               │               │
    ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐│              │                    │               │               │
    │             │              │                    │               │               │
```

### 2. Template Switching with Content Preservation

```
Job Seeker    Result Page     Template Switcher    Template Engine    Router
    │             │              │                    │               │
    │ View Result  │              │                    │               │
    ├─────────────►│              │                    │               │
    │             │ Show Cover Letter with Template   │               │
    │             ├─────────────►│                    │               │
    │             │ Current Template Display          │               │
    │             ◄─────────────┤                    │               │
    │ Click Switch Template      │                    │               │
    ├─────────────►│              │                    │               │
    │             │ Open Template Dialog              │               │
    │             ├─────────────►│                    │               │
    │             │ Available Templates               │               │
    │             ◄─────────────┤                    │               │
    │ Select New Template        │                    │               │
    ├─────────────►│              │                    │               │
    │             │ Confirm Switch│                    │               │
    │             ├─────────────►│                    │               │
    │             │              │ Preserve Content   │               │
    │             │              ├───────────────────►│               │
    │             │              │ Content Preserved  │               │
    │             │              ◄───────────────────┤               │
    │             │              │ Update URL Params  │               │
    │             │              ├─────────────────────────────────►│
    │             │              │ URL Updated        │               │
    │             │              ◄─────────────────────────────────┤
    │             │ Apply New Template Styling        │               │
    │             ├─────────────►│                    │               │
    │             │              │ Get New Template   │               │
    │             │              ├───────────────────►│               │
    │             │              │ Template Info      │               │
    │             │              ◄───────────────────┤               │
    │             │ New Template Applied              │               │
    │             ◄─────────────┤                    │               │
    │ Show Success Notification  │                    │               │
    ◄─────────────┤              │                    │               │
    │             │              │                    │               │
```

### 3. Real-time Quality Assessment Process

```
Job Seeker    Upload Component    Quality Assessor    Indicator    Banner
    │             │                  │                 │             │
    │ Select File  │                  │                 │             │
    ├─────────────►│                  │                 │             │
    │             │ File Selected    │                 │             │
    │             ├─────────────────►│                 │             │
    │             │                  │ Analyze Quality │             │
    │             │                  ├────────────────►│             │
    │             │                  │ Quality Score   │             │
    │             │                  ◄────────────────┤             │
    │             │ Show Indicator   │                 │             │
    │             ├─────────────────────────────────────────────────►│
    │             │                  │                 │ Color Set   │
    │             │                  │                 │ (Green/     │
    │             │                  │                 │ Yellow/Red) │
    │             │                  │                 ◄─────────────┤
    │ Quality Indicator Visible      │                 │             │
    ◄─────────────┤                  │                 │             │
    │             │                  │ Generate Tips   │             │
    │             │                  ├─────────────────────────────────────────►│
    │             │                  │                 │ Adaptive Tips│
    │             │                  │                 │ Generated    │
    │             │                  │                 ◄─────────────┤
    │             │ Show Tips Banner │                 │             │
    │             ├─────────────────────────────────────────────────►│
    │             │                  │                 │ Tips Display│
    │             │                  │                 ◄─────────────┤
    │ View Quality Tips              │                 │             │
    ◄─────────────┤                  │                 │             │
    │             │                  │                 │             │
```

### 4. Template-Aware File Download Process

```
Job Seeker    UI Component    API Route      Template Engine    Document Utils    File System
    │             │              │               │                 │               │
    │ Click Download              │               │                 │               │
    ├─────────────►│              │               │                 │               │
    │             │ Select Format │               │                 │               │
    │             ├──────────────►│               │                 │               │
    │             │ Format Selected               │                 │               │
    │             ◄──────────────┤               │                 │               │
    │             │              │               │                 │               │
    │             │ POST /api/download with template              │               │
    │             ├─────────────►│               │                 │               │
    │             │              │ Get Template Info               │               │
    │             │              ├──────────────►│                 │               │
    │             │              │ Template Config│                 │               │
    │             │              ◄──────────────┤                 │               │
    │             │              │ Format with Template            │               │
    │             │              ├─────────────────────────────────►│               │
    │             │              │               │ Apply Template  │               │
    │             │              │               ├────────────────►│               │
    │             │              │               │ Formatted Doc   │               │
    │             │              │               ◄────────────────┤               │
    │             │              │ Template Document Ready         │               │
    │             │              ◄─────────────────────────────────┤               │
    │             │              │               │                 │               │
    │             │ File Stream with Template     │                 │               │
    │             ◄─────────────┤               │                 │               │
    │ Download Template File     │               │                 │               │
    ◄─────────────┤              │               │                 │               │
    │             │              │               │                 │ Cleanup File  │
    │             │              │               │                 ├──────────────►│
    │             │              │               │                 │ File Deleted  │
    │             │              │               │                 ◄──────────────┤
    │             │              │               │                 │               │
```

### 5. Enhanced Input Quality Assessment with Visual Feedback

```
System        File Processor   Quality Assessor   Visual Indicator   Adaptive Banner   Mode Selector
    │               │               │                 │                 │               │
    │ Assess Input Quality          │                 │                 │               │
    ├──────────────►│               │                 │                 │               │
    │               │ Analyze Image/URL               │                 │               │
    │               ├──────────────►│                 │                 │               │
    │               │               │ Calculate Score │                 │               │
    │               │               ├────────────────►│                 │               │
    │               │               │ Green/Yellow/Red│                 │               │
    │               │               ◄────────────────┤                 │               │
    │               │ Image Quality │                 │                 │               │
    │               ◄──────────────┤                 │                 │               │
    │               │               │                 │                 │               │
    │               │ Analyze CV    │                 │                 │               │
    │               ├──────────────►│                 │                 │               │
    │               │               │ Calculate CV Score                │               │
    │               │               ├────────────────►│                 │               │
    │               │               │ CV Quality Color│                 │               │
    │               │               ◄────────────────┤                 │               │
    │               │ CV Quality    │                 │                 │               │
    │               ◄──────────────┤                 │                 │               │
    │               │               │                 │                 │               │
    │ Quality Scores│               │                 │                 │               │
    ◄──────────────┤               │                 │                 │               │
    │               │               │ Generate Quality Tips             │               │
    │               │               ├─────────────────────────────────►│               │
    │               │               │                 │ Show Tips Banner│               │
    │               │               │                 ◄─────────────────┤               │
    │               │               │                 │                 │               │
    │ Determine Generation Mode     │                 │                 │               │
    ├─────────────────────────────────────────────────────────────────────────────────►│
    │               │               │                 │                 │ Mode Decision │
    ◄─────────────────────────────────────────────────────────────────────────────────┤
    │               │               │                 │                 │               │

    Quality Indicators:
    - Green: High quality input (>80% score)
    - Yellow: Medium quality input (50-80% score)
    - Red: Low quality input (<50% score)

    Generation Modes:
    - Standard Mode: Both inputs green
    - Job-Focused Mode: Green job, yellow/red CV
    - CV-Focused Mode: Yellow/red job, green CV
    - Generic Mode: Both inputs yellow/red
```

### 5. Error Handling Sequence

```
Job Seeker    UI Component    API Route      Error Handler     Notification
    │             │              │               │               │
    │ Submit Request              │               │               │
    ├─────────────►│              │               │               │
    │             │ Process Request               │               │
    │             ├─────────────►│               │               │
    │             │              │ [Error Occurs]│               │
    │             │              ├──────────────►│               │
    │             │              │               │ Log Error     │
    │             │              │               ├──────────────►│
    │             │              │               │ Error Logged  │
    │             │              │               ◄──────────────┤
    │             │              │ Error Details │               │
    │             │              ◄──────────────┤               │
    │             │ Error Response│               │               │
    │             ◄─────────────┤               │               │
    │ Show Error  │              │               │               │
    ◄─────────────┤              │               │               │
    │             │              │               │               │
    │ Retry Action│              │               │               │
    ├─────────────►│              │               │               │
    │             │ Retry Request │               │               │
    │             ├─────────────►│               │               │
    │             │              │               │               │

    Error Types:
    - File Upload Errors
    - Network Timeouts
    - API Rate Limits
    - Processing Failures
    - Validation Errors
```

### 6. Real-time Content Streaming

```
Job Seeker    UI Component    API Route      OpenAI API      Stream Handler
    │             │              │               │               │
    │ Request Generation          │               │               │
    ├─────────────►│              │               │               │
    │             │ Start Generation              │               │
    │             ├─────────────►│               │               │
    │             │              │ Create Stream │               │
    │             │              ├──────────────►│               │
    │             │              │               │ Initialize    │
    │             │              │               ├──────────────►│
    │             │              │               │ Stream Ready  │
    │             │              │               ◄──────────────┤
    │             │              │ Stream Token 1│               │
    │             │              ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐┤               │
    │             │ Token 1      │               │               │
    │             ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐┤               │               │
    │ Display Token 1            │               │               │
    ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐│              │               │               │
    │             │              │ Stream Token 2│               │
    │             │              ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐┤               │
    │             │ Token 2      │               │               │
    │             ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐┤               │               │
    │ Display Token 2            │               │               │
    ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐│              │               │               │
    │             │              │ [Continue streaming...]       │
    │             │              │               │               │
    │             │              │ Stream Complete               │
    │             │              ◄──────────────┤               │
    │             │ Generation Complete          │               │
    │             ◄─────────────┤               │               │
    │ Show Complete Result       │               │               │
    ◄─────────────┤              │               │               │
    │             │              │               │               │
```

## Supporting Sequence Diagrams

### 7. Authentication & Rate Limiting

```
Job Seeker    Rate Limiter    API Route      OpenAI API
    │             │              │               │
    │ API Request │              │               │
    ├─────────────►│              │               │
    │             │ Check Rate Limit              │
    │             ├─────────────►│               │
    │             │ Within Limit │               │
    │             ◄─────────────┤               │
    │ Request Allowed            │               │
    ◄─────────────┤              │               │
    │             │              │ Forward Request
    │             │              ├──────────────►│
    │             │              │ API Response  │
    │             │              ◄──────────────┤
    │             │ Response     │               │
    │             ◄─────────────┤               │
    │ Final Response             │               │
    ◄─────────────┤              │               │
    │             │              │               │

    Alternative Flow - Rate Limit Exceeded:
    │ API Request │              │               │
    ├─────────────►│              │               │
    │             │ Check Rate Limit              │
    │             ├─────────────►│               │
    │             │ Limit Exceeded               │
    │             ◄─────────────┤               │
    │ Rate Limit Error           │               │
    ◄─────────────┤              │               │
```

### 8. File Validation Process

```
User          UI Component    Validator      File Processor
    │             │              │               │
    │ Select File │              │               │
    ├─────────────►│              │               │
    │             │ Pre-validate │               │
    │             ├─────────────►│               │
    │             │              │ Check Size    │
    │             │              ├──────────────►│
    │             │              │ Size OK       │
    │             │              ◄──────────────┤
    │             │              │ Check Type    │
    │             │              ├──────────────►│
    │             │              │ Type Valid    │
    │             │              ◄──────────────┤
    │             │ Validation OK│               │
    │             ◄─────────────┤               │
    │ File Accepted              │               │
    ◄─────────────┤              │               │
    │             │              │               │

    Alternative Flow - Validation Failure:
    │             │              │ Check Failed  │
    │             │              ◄──────────────┤
    │             │ Validation Error              │
    │             ◄─────────────┤               │
    │ Show Error  │              │               │
    ◄─────────────┤              │               │
```

## Interaction Patterns

### Synchronous Interactions

- File uploads and validation
- API route processing
- Document generation
- Error handling

### Asynchronous Interactions

- Real-time content streaming
- Background file processing
- Progressive quality assessment
- Non-blocking UI updates

### Error Propagation

- Client-side validation errors
- Server-side processing errors
- External API failures
- Network connectivity issues

## Timing Considerations

| Interaction Type           | Expected Duration | Timeout Limit |
| -------------------------- | ----------------- | ------------- |
| Template Selection         | 0.5-1 seconds     | 5 seconds     |
| Template Preview           | 1-2 seconds       | 10 seconds    |
| Template Switching         | 1-3 seconds       | 15 seconds    |
| File Upload                | 1-3 seconds       | 30 seconds    |
| Real-time Quality Check    | 0.5-2 seconds     | 8 seconds     |
| Text Extraction            | 3-10 seconds      | 45 seconds    |
| Template-Aware Generation  | 5-15 seconds      | 60 seconds    |
| Template Document Creation | 2-5 seconds       | 20 seconds    |
| Stream Response            | Real-time         | 90 seconds    |

## Template System Interactions

### Template Selection Flow

- User browses templates → Preview selection → Confirm choice
- Immediate visual feedback for selections
- Template context passed to generation process

### Template Switching Flow

- Content preservation during template changes
- URL parameter updates for state management
- No re-generation required, only re-styling

### Quality Assessment Flow

- Real-time visual indicators during file upload
- Color-coded feedback (green/yellow/red)
- Adaptive content banners with improvement suggestions

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Updated: June 23, 2025 - Reflects current implementation with visual template system, real-time quality indicators, content-preserving template switching, and enhanced user interaction patterns_
