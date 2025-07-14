# Sequence Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains sequence diagrams for the Cover Letter Web Application, following RUP methodology standards and reflecting the current implementation architecture.

## Legend

```
Actor/Object     Message/Call           Return/Response
┌─────────────┐  ────────────────►      ◄────────────────
│             │  Synchronous Call      Synchronous Return
│ Entity/     │
│ Component   │  ┌ ─ ─ ─ ─ ─ ─ ─►      ◄─ ─ ─ ─ ─ ─ ─ ┐
└─────────────┘  │ Async/Stream Call    Async/Stream Return
     │
     │           ────────────────►      Loop/Self Call
     ▼           Self Operation
```

## Primary Sequence Diagrams

### 1. Complete Cover Letter Generation Flow with Template System

```
Job Seeker    Homepage    Template     Generation    Quality        API           OpenAI        Document
              Component   Selection    Form         Assessment     Route         Service       Generator
    │            │           │           │              │             │             │             │
    │ Access App │           │           │              │             │             │             │
    ├───────────►│           │           │              │             │             │             │
    │            │ Load Templates        │              │             │             │             │
    │            ├──────────►│           │              │             │             │             │
    │            │ Display Template Cards│              │             │             │             │
    │            ◄──────────┤           │              │             │             │             │
    │ Preview Template       │           │              │             │             │             │
    ├───────────►│           │           │              │             │             │             │
    │            │ Show Preview Modal    │              │             │             │             │
    │            ├──────────►│           │              │             │             │             │
    │            │ Template Preview      │              │             │             │             │
    │            ◄──────────┤           │              │             │             │             │
    │ Select Template        │           │              │             │             │             │
    ├───────────►│           │           │              │             │             │             │
    │            │ Navigate to Generation Form           │             │             │             │
    │            ├─────────────────────►│              │             │             │             │
    │            │           │ Load Form with Template  │             │             │             │
    │            │           ◄─────────┤              │             │             │             │
    │            │           │           │              │             │             │             │
    │ Upload Job Image       │           │              │             │             │             │
    ├─────────────────────────────────►│              │             │             │             │
    │            │           │ Validate & Assess Quality│             │             │             │
    │            │           ├─────────►│              │             │             │             │
    │            │           │ Quality Indicator (Good/Fair/Poor)    │             │             │
    │            │           ◄─────────┤              │             │             │             │
    │ Show Quality Status    │           │              │             │             │             │
    ◄─────────────────────────────────┤              │             │             │             │
    │            │           │           │              │             │             │             │
    │ Upload CV File         │           │              │             │             │             │
    ├─────────────────────────────────►│              │             │             │             │
    │            │           │ Validate & Assess CV Quality         │             │             │
    │            │           ├─────────►│              │             │             │             │
    │            │           │ CV Quality Indicator    │             │             │             │
    │            │           ◄─────────┤              │             │             │             │
    │ Show CV Quality Status │           │              │             │             │             │
    ◄─────────────────────────────────┤              │             │             │             │
    │            │           │           │              │             │             │             │
    │ Click Generate Cover Letter       │              │             │             │             │
    ├─────────────────────────────────►│              │             │             │             │
    │            │           │ POST /api/generate (with template ID) │             │             │
    │            │           ├─────────────────────────►│             │             │             │
    │            │           │           │ Extract Image Text        │             │             │
    │            │           │           │              ├────────────►│             │             │
    │            │           │           │              │ OCR Results │             │             │
    │            │           │           │              ◄────────────┤             │             │
    │            │           │           │ Extract CV Text           │             │             │
    │            │           │           │              ├─────────────────────────►│             │
    │            │           │           │              │ CV Content  │             │             │
    │            │           │           │              ◄─────────────────────────┤             │
    │            │           │           │ Generate with Template Context          │             │
    │            │           │           │              ├────────────►│             │             │
    │            │           │ Stream Cover Letter Content (Template-aware)       │             │
    │            │           ◄┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤             │             │             │
    │ Display Streaming Text with Template Style        │             │             │             │
    ◄┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │             │             │             │
    │            │           │           │              │             │             │             │
    │ Generation Complete    │           │              │             │             │             │
    ◄─────────────────────────────────┤              │             │             │             │
    │            │           │           │              │             │             │             │
```

### 2. Template Switching with Content Preservation

```
Job Seeker    Result Page    Template        Template       Content         Router
                            Switcher        Engine         State
    │             │            │               │             │               │
    │ View Generated Result    │               │             │               │
    ├────────────►│            │               │             │               │
    │             │ Display Cover Letter      │             │               │
    │             ├───────────►│               │             │               │
    │             │ Show Template Style       │             │               │
    │             ◄───────────┤               │             │               │
    │ Click Switch Template    │               │             │               │
    ├────────────►│            │               │             │               │
    │             │ Open Template Switcher Dialog          │               │
    │             ├───────────►│               │             │               │
    │             │ Show Available Templates  │             │               │
    │             ◄───────────┤               │             │               │
    │ Select New Template      │               │             │               │
    ├────────────►│            │               │             │               │
    │             │ Preserve Current Content  │             │               │
    │             ├───────────────────────────►│             │               │
    │             │ Content Stored            │             │               │
    │             ◄───────────────────────────┤             │               │
    │             │ Apply New Template        │             │               │
    │             ├─────────────────────────►│             │               │
    │             │ Template Formatting Applied            │               │
    │             ◄─────────────────────────┤             │               │
    │             │ Update URL with New Template ID        │               │
    │             ├─────────────────────────────────────────►│
    │             │ URL Updated               │             │               │
    │             ◄─────────────────────────────────────────┤
    │ Show Updated Cover Letter│               │             │               │
    ◄────────────┤            │               │             │               │
    │             │            │               │             │               │
```

### 3. Real-time Input Quality Assessment

```
Job Seeker    Form           Quality         Document        Link
              Component      Indicator       Analyzer        Validator
    │             │            │               │               │
    │ Upload Image File        │               │               │
    ├────────────►│            │               │               │
    │             │ Validate File Format      │               │
    │             ├───────────────────────────►│               │
    │             │ File Valid                │               │
    │             ◄───────────────────────────┤               │
    │             │ Assess Image Quality      │               │
    │             ├───────────►│               │               │
    │             │ Quality Score (Good/Fair/Poor)           │
    │             ◄───────────┤               │               │
    │ Show Quality Indicator   │               │               │
    ◄────────────┤            │               │               │
    │             │            │               │               │
    │ Enter Job URL            │               │               │
    ├────────────►│            │               │               │
    │             │ Validate URL Format       │               │
    │             ├─────────────────────────────────────────►│
    │             │ URL Format Valid          │               │
    │             ◄─────────────────────────────────────────┤
    │             │ Detect Job Source         │               │
    │             ├─────────────────────────────────────────►│
    │             │ Source Detected (LinkedIn/Indeed/etc.)   │
    │             ◄─────────────────────────────────────────┤
    │ Show URL Status          │               │               │
    ◄────────────┤            │               │               │
    │             │            │               │               │
```

### 4. Document Download with Template Formatting

```
Job Seeker    Result Page    Download        Document        File
                            Component       Generator       System
    │             │            │               │               │
    │ Click Download Button    │               │               │
    ├────────────►│            │               │               │
    │             │ Show Format Options       │               │
    │             ├───────────►│               │               │
    │             │ Format Selection Dialog   │               │
    │             ◄───────────┤               │               │
    │ Select PDF Format        │               │               │
    ├────────────►│            │               │               │
    │             │ Generate PDF with Template Formatting     │
    │             ├─────────────────────────►│               │
    │             │ Apply Template Styles    │               │
    │             │ (fonts, colors, layout)  │               │
    │             │              │           │               │
    │             │ Generate Smart Filename  │               │
    │             │ (based on job/company)   │               │
    │             │              │           │               │
    │             │ PDF Generated            │               │
    │             ◄─────────────────────────┤               │
    │             │ Initiate Download        │               │
    │             ├─────────────────────────────────────────►│
    │             │ File Downloaded          │               │
    │             ◄─────────────────────────────────────────┤
    │ File Saved to Device     │               │               │
    ◄────────────┤            │               │               │
    │             │            │               │               │
```

### 5. Error Handling and Recovery Flow

```
Job Seeker    Form           API            Error          Recovery
              Component      Route          Handler        System
    │             │            │               │               │
    │ Submit Generation Request │               │               │
    ├────────────►│            │               │               │
    │             │ POST /api/generate         │               │
    │             ├───────────►│               │               │
    │             │            │ Processing Error              │
    │             │            ├──────────────►│               │
    │             │            │ Error Classification         │
    │             │            │ (Network/API/Validation)     │
    │             │            │               │               │
    │             │            │ Determine Recovery Strategy  │
    │             │            │               ├──────────────►│
    │             │            │               │ Auto-retry    │
    │             │            │               │ Strategy      │
    │             │            │               ◄──────────────┤
    │             │ Error Response with Recovery Options      │
    │             ◄───────────┤               │               │
    │ Show Error Message       │               │               │
    ◄────────────┤            │               │               │
    │ User-friendly Error + Retry Button       │               │
    │             │            │               │               │
    │ Click Retry              │               │               │
    ├────────────►│            │               │               │
    │             │ Retry Request with Same Data             │
    │             ├───────────►│               │               │
    │             │ Success Response          │               │
    │             ◄───────────┤               │               │
    │ Show Success Result      │               │               │
    ◄────────────┤            │               │               │
    │             │            │               │               │
```

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

Job Seeker Upload Component Quality Assessor Indicator Banner
│ │ │ │ │
│ Select File │ │ │ │
├─────────────►│ │ │ │
│ │ File Selected │ │ │
│ ├─────────────────►│ │ │
│ │ │ Analyze Quality │ │
│ │ ├────────────────►│ │
│ │ │ Quality Score │ │
│ │ ◄────────────────┤ │
│ │ Show Indicator │ │ │
│ ├─────────────────────────────────────────────────►│
│ │ │ │ Color Set │
│ │ │ │ (Green/ │
│ │ │ │ Yellow/Red) │
│ │ │ ◄─────────────┤
│ Quality Indicator Visible │ │ │
◄─────────────┤ │ │ │
│ │ │ Generate Tips │ │
│ │ ├─────────────────────────────────────────►│
│ │ │ │ Adaptive Tips│
│ │ │ │ Generated │
│ │ │ ◄─────────────┤
│ │ Show Tips Banner │ │ │
│ ├─────────────────────────────────────────────────►│
│ │ │ │ Tips Display│
│ │ │ ◄─────────────┤
│ View Quality Tips │ │ │
◄─────────────┤ │ │ │
│ │ │ │ │

```

### 4. Template-Aware File Download Process

```

Job Seeker UI Component API Route Template Engine Document Utils File System
│ │ │ │ │ │
│ Click Download │ │ │ │
├─────────────►│ │ │ │ │
│ │ Select Format │ │ │ │
│ ├──────────────►│ │ │ │
│ │ Format Selected │ │ │
│ ◄──────────────┤ │ │ │
│ │ │ │ │ │
│ │ POST /api/download with template │ │
│ ├─────────────►│ │ │ │
│ │ │ Get Template Info │ │
│ │ ├──────────────►│ │ │
│ │ │ Template Config│ │ │
│ │ ◄──────────────┤ │ │
│ │ │ Format with Template │ │
│ │ ├─────────────────────────────────►│ │
│ │ │ │ Apply Template │ │
│ │ │ ├────────────────►│ │
│ │ │ │ Formatted Doc │ │
│ │ │ ◄────────────────┤ │
│ │ │ Template Document Ready │ │
│ │ ◄─────────────────────────────────┤ │
│ │ │ │ │ │
│ │ File Stream with Template │ │ │
│ ◄─────────────┤ │ │ │
│ Download Template File │ │ │ │
◄─────────────┤ │ │ │ │
│ │ │ │ │ Cleanup File │
│ │ │ │ ├──────────────►│
│ │ │ │ │ File Deleted │
│ │ │ │ ◄──────────────┤
│ │ │ │ │ │

```

### 5. Enhanced Input Quality Assessment with Visual Feedback

```

System File Processor Quality Assessor Visual Indicator Adaptive Banner Mode Selector
│ │ │ │ │ │
│ Assess Input Quality │ │ │ │
├──────────────►│ │ │ │ │
│ │ Analyze Image/URL │ │ │
│ ├──────────────►│ │ │ │
│ │ │ Calculate Score │ │ │
│ │ ├────────────────►│ │ │
│ │ │ Green/Yellow/Red│ │ │
│ │ ◄────────────────┤ │ │
│ │ Image Quality │ │ │ │
│ ◄──────────────┤ │ │ │
│ │ │ │ │ │
│ │ Analyze CV │ │ │ │
│ ├──────────────►│ │ │ │
│ │ │ Calculate CV Score │ │
│ │ ├────────────────►│ │ │
│ │ │ CV Quality Color│ │ │
│ │ ◄────────────────┤ │ │
│ │ CV Quality │ │ │ │
│ ◄──────────────┤ │ │ │
│ │ │ │ │ │
│ Quality Scores│ │ │ │ │
◄──────────────┤ │ │ │ │
│ │ │ Generate Quality Tips │ │
│ │ ├─────────────────────────────────►│ │
│ │ │ │ Show Tips Banner│ │
│ │ │ ◄─────────────────┤ │
│ │ │ │ │ │
│ Determine Generation Mode │ │ │ │
├─────────────────────────────────────────────────────────────────────────────────►│
│ │ │ │ │ Mode Decision │
◄─────────────────────────────────────────────────────────────────────────────────┤
│ │ │ │ │ │

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

Job Seeker UI Component API Route Error Handler Notification
│ │ │ │ │
│ Submit Request │ │ │
├─────────────►│ │ │ │
│ │ Process Request │ │
│ ├─────────────►│ │ │
│ │ │ [Error Occurs]│ │
│ │ ├──────────────►│ │
│ │ │ │ Log Error │
│ │ │ ├──────────────►│
│ │ │ │ Error Logged │
│ │ │ ◄──────────────┤
│ │ │ Error Details │ │
│ │ ◄──────────────┤ │
│ │ Error Response│ │ │
│ ◄─────────────┤ │ │
│ Show Error │ │ │ │
◄─────────────┤ │ │ │

```

### 6. URL Job Link Processing Flow

```

Job Seeker Form Link OpenAI Content
Component Validator Web Search Processor
│ │ │ │ │
│ Enter Job URL │ │ │
├────────────►│ │ │ │
│ │ Real-time URL Validation │ │
│ ├───────────►│ │ │
│ │ Validation Status │ │
│ ◄───────────┤ │ │
│ │ Detect Job Source │ │
│ ├───────────►│ │ │
│ │ Source Info (LinkedIn/Indeed/etc.) │
│ ◄───────────┤ │ │
│ Show URL Status │ │ │
◄────────────┤ │ │ │
│ │ │ │ │
│ Submit for Processing │ │ │
├────────────►│ │ │ │
│ │ Extract Job Info from URL │ │
│ ├─────────────────────────►│ │
│ │ Job Content Extracted │ │
│ ◄─────────────────────────┤ │
│ │ Process & Structure Content │
│ ├─────────────────────────────────────────►│
│ │ Structured Job Information │
│ ◄─────────────────────────────────────────┤
│ Return Processed Content │ │ │
◄────────────┤ │ │ │
│ │ │ │ │

```

## Secondary Sequence Diagrams

### 7. Template Preview Modal Flow

```

Job Seeker Template Preview Template
Selection Modal Engine
│ │ │ │
│ Click Template Preview │ │
├────────────►│ │ │
│ │ Open Preview Modal │
│ ├───────────►│ │
│ │ Get Template Sample │
│ ├─────────────────────────►│
│ │ Template Preview Content │
│ ◄─────────────────────────┤
│ │ Display Formatted Sample │
│ ◄───────────┤ │
│ Review Template Style │ │
◄────────────┤ │ │
│ │ │ │
│ Close Preview or Select │ │
├────────────►│ │ │
│ │ Close Modal/Update Selection │
│ ├───────────►│ │
│ │ Modal Closed │
│ ◄───────────┤ │
│ Continue with Selection │ │
◄────────────┤ │ │
│ │ │ │

```

### 8. Streaming Text Display Flow

```

Job Seeker Result Page Streaming API OpenAI
Component Route API
│ │ │ │ │
│ Generation Started │ │ │
├────────────►│ │ │ │
│ │ Initialize Streaming Display │
│ ├───────────►│ │ │
│ │ Start Stream Connection │ │
│ ├─────────────────────────►│ │
│ │ │ Stream Request to OpenAI │
│ │ │ ├──────────────►│
│ │ │ │ Chunk 1 │
│ │ │ ◄──────────────┤
│ │ Stream Chunk 1 │ │
│ ◄─────────────────────────┤ │
│ │ Display Partial Text │ │
│ ◄───────────┤ │ │
│ See Real-time Text │ │ │
◄────────────┤ │ │ │
│ │ │ │ Chunk 2 │
│ │ │ ◄──────────────┤
│ │ Stream Chunk 2 │ │
│ ◄─────────────────────────┤ │
│ │ Append to Display │ │
│ ◄───────────┤ │ │
│ See Updated Text │ │ │
◄────────────┤ │ │ │
│ │ │ │ Final Chunk │
│ │ │ ◄──────────────┤
│ │ Complete Text │ │
│ ◄─────────────────────────┤ │
│ │ Finalize Display │ │
│ ◄───────────┤ │ │
│ See Complete Cover Letter│ │ │
◄────────────┤ │ │ │
│ │ │ │ │

```

## System Integration Sequence

### 9. Complete End-to-End Flow

```

Job Seeker Frontend Backend OpenAI File System Browser
│ │ │ │ │ │
│ Start Application │ │ │ │
├────────────►│ │ │ │ │
│ │ Load Templates & Initialize │ │
│ ├───────────►│ │ │ │
│ │ Template Data│ │ │ │
│ ◄───────────┤ │ │ │
│ Template Selection & Preview │ │ │
├────────────►│ │ │ │ │
│ │ Navigation to Generation Form │ │
│ ├───────────►│ │ │ │
│ File Uploads & Quality Assessment │ │ │
├────────────►│ │ │ │ │
│ │ Process Files & Validate │ │ │
│ ├───────────►│ │ │ │
│ Submit Generation Request│ │ │ │
├────────────►│ │ │ │ │
│ │ Extract Content from Sources │ │
│ ├─────────────────────────►│ │ │
│ │ AI Processing & Generation │ │
│ ├─────────────────────────►│ │ │
│ │ Stream Generated Content │ │ │
│ ◄┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤ │ │
│ Real-time Content Display │ │ │
◄┌ ─ ─ ─ ─ ─ ─│ │ │ │ │
│ Template Operations (Switch/Download) │ │ │
├────────────►│ │ │ │ │
│ │ Generate Documents │ │ │
│ ├───────────►│ │ ├──────────────►│
│ │ │ │ │ File Download │
│ │ │ │ ◄──────────────┤
│ Completed Process │ │ │ │
◄────────────┤ │ │ │ │
│ │ │ │ │ │

```

## Key Interaction Patterns

### Asynchronous Operations
- **Streaming Generation**: Real-time text display during AI processing
- **File Processing**: Background quality assessment and content extraction
- **Template Switching**: Non-blocking template changes with content preservation

### Error Handling Patterns
- **Graceful Degradation**: Continue with reduced functionality during service failures
- **Retry Mechanisms**: Automatic retry for transient failures
- **User Feedback**: Clear error messages with actionable recovery steps

### Performance Optimizations
- **Progressive Loading**: Template previews and content loaded on-demand
- **Client-side Validation**: Immediate feedback without server round-trips
- **Streaming Responses**: Immediate user feedback during long operations

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Last Updated: July 15, 2025 - Reflects current implementation with complete template system, streaming generation, and quality assessment features_
```
