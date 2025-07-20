# Sequence Diagrams - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains sequence diagrams for the Cover Letter Web Application, following RUP methodology standards and reflecting the current implementation architecture organized by application pages.

## Legend

```
Actor/Object     Message/Call           Return/Response
┌─────────────┐  ────────────────►      ◄────────────────
│             │  Synchronous Call      Synchronous Return
│ Entity/     │
│ Component   │  ┌ ─ ─ ─ ─ ─ ─ ─►      ◄─ ─ ─ ─ ─ ─ ─ ┐
└─────────────┘  │ Async/Stream Call    Async/Stream Return
     │
     ▼           Self Operation
```

## Page-Based Sequence Diagrams

### Page 1: Homepage - Template Selection Flow

**URL**: `/`

```
Job Seeker    Homepage      Template      Template
              Component     Card          Preview
    │            │             │             │
    │ Access App │             │             │
    ├───────────►│             │             │
    │            │ Load Available Templates  │
    │            ├────────────►│             │
    │            │ Template Data (3 cards)   │
    │            ◄────────────┤             │
    │ View Template Cards      │             │
    ◄────────────┤             │             │
    │            │             │             │
    │ Click Preview Button     │             │
    ├────────────┼────────────►│             │
    │            │             │ Open Preview Modal
    │            │             ├────────────►│
    │            │             │ Get Sample Content
    │            │             ├────────────►│
    │            │             │ Template Sample
    │            │             ◄────────────┤
    │            │             │ Show Preview Dialog
    │            │             ◄────────────┤
    │ View Template Preview    │             │
    ◄────────────┼─────────────┤             │
    │            │             │             │
    │ Select Template from Preview or Card   │
    ├────────────┼────────────►│             │
    │            │             │ Apply Selection
    │            │             ├────────────►│
    │            │             │ Selection Confirmed
    │            │             ◄────────────┤
    │            │ Enable Continue Button    │
    │            ├────────────►│             │
    │            │ Button State Updated      │
    │            ◄────────────┤             │
    │ See Enabled Continue Button           │
    ◄────────────┤             │             │
    │            │             │             │
    │ Click Continue Button    │             │
    ├────────────►│             │             │
    │            │ Navigate to Generation Form
    │            │ (with template parameter) │
    │            ├─────────────────────────►
    │            │ Navigation Complete      │
    │            ◄─────────────────────────┤
    │            │             │             │
```

### Page 2: Generation Form - Input Collection and Processing

**URL**: `/generate`

#### 2a. Form Initialization and Job Input

```
Job Seeker    Generation    Template      Quality       Link          Image
              Form          Context       Assessment    Validator     Processor
    │            │             │             │             │             │
    │ Arrive at Generation Form│             │             │             │
    ├───────────►│             │             │             │             │
    │            │ Load Template Context     │             │             │
    │            ├────────────►│             │             │             │
    │            │ Template Info (name, style)           │             │
    │            ◄────────────┤             │             │             │
    │ View Form with Template Info          │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │             │             │             │
    │ Select Job Input Method (Image/URL)   │             │             │
    ├────────────►│             │             │             │             │
    │            │             │             │             │             │
    │ [IMAGE PATH] Upload Job Image         │             │             │
    ├────────────►│             │             │             │             │
    │            │             │             │             │ Process Image
    │            │             │             │             ├────────────►│
    │            │             │             │             │ File Validation
    │            │             │             │             ├────────────►│
    │            │             │             │             │ Image Valid │
    │            │             │             │             ◄────────────┤
    │            │             │             │ Assess Quality            │
    │            │             │             ├─────────────────────────►│
    │            │             │             │ Quality Score (Good/Fair/Poor)
    │            │             │             ◄─────────────────────────┤
    │            │             │ Update Quality Indicator              │
    │            │             ├────────────►│             │             │
    │            │             │ Image Quality Status      │             │
    │            │             ◄────────────┤             │             │
    │ See Image Quality Indicator           │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │             │             │             │
    │ [URL PATH] Enter Job URL              │             │             │
    ├────────────►│             │             │             │             │
    │            │             │             │ Real-time URL Validation │
    │            │             │             ├────────────►│             │
    │            │             │             │ URL Format Valid         │
    │            │             │             ◄────────────┤             │
    │            │             │             │ Detect Job Source        │
    │            │             │             ├────────────►│             │
    │            │             │             │ Source Info (LinkedIn/Indeed/etc.)
    │            │             │             ◄────────────┤             │
    │            │             │ Show URL Status           │             │
    │            │             ├────────────►│             │             │
    │            │             │ URL Validation Display    │             │
    │            │             ◄────────────┤             │             │
    │ See URL Validation Status             │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │             │             │             │
```

#### 2b. CV Upload and Overall Quality Assessment

```
Job Seeker    Generation    Quality       CV            Overall
              Form          Assessment    Processor     Banner
    │            │             │             │             │
    │ Upload CV File           │             │             │
    ├───────────►│             │             │             │
    │            │             │ Process CV File           │
    │            │             ├────────────►│             │
    │            │             │ File Format Check         │
    │            │             ├────────────►│             │
    │            │             │ CV Valid    │             │
    │            │             ◄────────────┤             │
    │            │             │ Assess CV Quality         │
    │            │             ├────────────►│             │
    │            │             │ Content Analysis          │
    │            │             ├────────────►│             │
    │            │             │ CV Quality Score          │
    │            │             ◄────────────┤             │
    │            │ Update CV Quality Indicator             │
    │            ├────────────►│             │             │
    │            │ CV Quality Status         │             │
    │            ◄────────────┤             │             │
    │ See CV Quality Indicator │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
    │            │             │ Calculate Overall Quality │
    │            │             ├─────────────────────────►│
    │            │             │ Job Quality + CV Quality  │
    │            │             ├─────────────────────────►│
    │            │             │ Adaptive Strategy         │
    │            │             ├─────────────────────────►│
    │            │             │ Quality Banner (Green/Yellow/Red)
    │            │             ◄─────────────────────────┤
    │            │ Show Quality Assessment Banner        │
    │            ├────────────►│             │             │
    │            │ Banner with Tips & Strategy           │
    │            ◄────────────┤             │             │
    │ View Overall Quality Assessment       │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
```

#### 2c. Language Selection and Generation Trigger

```
Job Seeker    Generation    Button        API           Generation
              Form          State         Route         Request
    │            │             │             │             │
    │ Select Language (English/Bahasa)      │             │
    ├───────────►│             │             │             │
    │            │ Validate All Required Fields          │
    │            ├────────────►│             │             │
    │            │ All Fields Complete      │             │
    │            ◄────────────┤             │             │
    │            │ Enable Generate Button   │             │
    │            ├────────────►│             │             │
    │            │ Button Enabled (Green)   │             │
    │            ◄────────────┤             │             │
    │ See Enabled Generate Button          │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
    │ Click Generate Cover Letter          │             │
    ├───────────►│             │             │             │
    │            │ Show Loading State       │             │
    │            ├────────────►│             │             │
    │            │ Loading Indicator Active │             │
    │            ◄────────────┤             │             │
    │ See Loading Progress     │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
    │            │ Submit Generation Request             │
    │            ├─────────────────────────►│             │
    │            │             │ POST /api/generate      │
    │            │             │             ├────────────►│
    │            │             │             │ Request Processing
    │            │             │             ├────────────►│
    │            │             │             │             │
    │            │             │ [SUCCESS] Navigate to Result
    │            │             ◄─────────────┤             │
    │            │ Navigation to /generate/result        │
    │            ├─────────────────────────────────────►
    │            │             │             │             │
    │            │             │ [ERROR] Show Error       │
    │            │             ◄─────────────┤             │
    │            │ Display Error Message & Retry         │
    │            ├────────────►│             │             │
    │            │ Error State with Retry   │             │
    │            ◄────────────┤             │             │
    │ View Error Message & Retry Option    │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
```

### Page 3: Result Page - Content Generation and Actions

**URL**: `/generate/result`

#### 3a. Streaming Content Display

```
Job Seeker    Result        Streaming     API           OpenAI        Template
              Page          Display       Route         Service       Engine
    │            │             │             │             │             │
    │ Arrive at Result Page    │             │             │             │
    ├───────────►│             │             │             │             │
    │            │ Initialize Streaming UI  │             │             │
    │            ├────────────►│             │             │             │
    │            │ Setup Stream Connection  │             │             │
    │            ├─────────────────────────►│             │             │
    │            │             │ Begin Generation Process │             │
    │            │             │             ├────────────►│             │
    │            │             │             │ Extract Job Info (Image/URL)
    │            │             │             ├────────────►│             │
    │            │             │             │ Job Content │             │
    │            │             │             ◄────────────┤             │
    │            │             │             │ Extract CV Content       │
    │            │             │             ├────────────►│             │
    │            │             │             │ CV Data     │             │
    │            │             │             ◄────────────┤             │
    │            │             │             │ Generate with Template Context
    │            │             │             ├────────────►│             │
    │            │             │ Stream Text Chunk 1      │             │
    │            │             ◄─────────────┤             │             │
    │            │ Display Chunk 1          │             │             │
    │            ├────────────►│             │             │             │
    │ See Real-time Text Appearing          │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │ Stream Text Chunk 2      │             │
    │            │             ◄─────────────┤             │             │
    │            │ Append Chunk 2           │             │             │
    │            ├────────────►│             │             │             │
    │ See Text Growing in Real-time         │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │ Stream Final Chunk       │             │
    │            │             ◄─────────────┤             │             │
    │            │ Complete Text Display    │             │             │
    │            ├────────────►│             │             │             │
    │            │             │ Apply Template Styling   │             │
    │            │             ├─────────────────────────────────────────►│
    │            │             │ Template Formatting Applied            │
    │            │             ◄─────────────────────────────────────────┤
    │            │ Show Final Formatted Cover Letter    │             │
    │            ├────────────►│             │             │             │
    │ View Complete Cover Letter            │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │             │             │             │
```

#### 3b. Copy to Clipboard Action

```
Job Seeker    Result        Copy          Browser       Clipboard
              Page          Button        API           System
    │            │             │             │             │
    │ Click Copy to Clipboard │             │             │
    ├───────────►│             │             │             │
    │            │ Trigger Copy Action      │             │
    │            ├────────────►│             │             │
    │            │             │ Get Full Text Content    │
    │            │             ├────────────►│             │
    │            │             │ Text Content│             │
    │            │             ◄────────────┤             │
    │            │             │ Copy to System Clipboard │
    │            │             ├─────────────────────────►│
    │            │             │ Copy Successful          │
    │            │             ◄─────────────────────────┤
    │            │ Show Success Toast       │             │
    │            ├────────────►│             │             │
    │            │ "Copied to Clipboard!"   │             │
    │            ◄────────────┤             │             │
    │ See Success Notification │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
```

#### 3c. Document Download Process

```
Job Seeker    Result        Download      Document      File          Browser
              Page          Modal         Generator     System        Download
    │            │             │             │             │             │
    │ Click Download Button    │             │             │             │
    ├───────────►│             │             │             │             │
    │            │ Show Format Selection    │             │             │
    │            ├────────────►│             │             │             │
    │            │ Format Options (PDF/DOCX)│             │             │
    │            ◄────────────┤             │             │             │
    │ View Download Options    │             │             │             │
    ◄────────────┤             │             │             │             │
    │            │             │             │             │             │
    │ Select PDF Format        │             │             │             │
    ├───────────►│             │             │             │             │
    │            │ Process PDF Request      │             │             │
    │            ├────────────►│             │             │             │
    │            │             │ Generate PDF with Template│             │
    │            │             ├────────────►│             │             │
    │            │             │ Apply Template Styling   │             │
    │            │             ├────────────►│             │             │
    │            │             │ Formatted PDF Ready      │             │
    │            │             ◄────────────┤             │             │
    │            │             │ Create Smart Filename    │             │
    │            │             ├────────────►│             │             │
    │            │             │ Filename Generated       │             │
    │            │             ◄────────────┤             │             │
    │            │             │ Save to Temp Directory   │             │
    │            │             ├─────────────────────────►│             │
    │            │             │ File Saved │             │             │
    │            │             ◄─────────────────────────┤             │
    │            │ Initiate File Download   │             │             │
    │            ├────────────►│             │             │             │
    │            │             │ Trigger Browser Download │             │
    │            │             ├─────────────────────────────────────────►│
    │            │             │ Download Started         │             │
    │            │             ◄─────────────────────────────────────────┤
    │            │ Show Download Success    │             │             │
    │            ├────────────►│             │             │             │
    │            │ "Download Complete!"     │             │             │
    │            ◄────────────┤             │             │             │
    │ See Success & File Downloads to Device│             │             │
    ◄────────────┤             │             │             │             │
    │            │             │             │ Cleanup Temp File        │
    │            │             │             ├─────────────────────────►│
    │            │             │             │ File Deleted │             │
    │            │             │             ◄─────────────────────────┤
    │            │             │             │             │             │
```

## Supporting Process Sequence Diagrams

### Quality Assessment Real-time Processing

```
Job Seeker    Input         Quality       Visual        Adaptive
              Component     Analyzer      Indicator     Banner
    │            │             │             │             │
    │ Upload File/Enter Data   │             │             │
    ├───────────►│             │             │             │
    │            │ Real-time Analysis       │             │
    │            ├────────────►│             │             │
    │            │             │ Calculate Quality Score   │
    │            │             ├────────────►│             │
    │            │             │ Quality Level (Good/Fair/Poor)
    │            │             ◄────────────┤             │
    │            │             │ Generate Adaptive Tips    │
    │            │             ├─────────────────────────►│
    │            │             │ Tips & Strategy           │
    │            │             ◄─────────────────────────┤
    │            │ Update UI with Quality Feedback       │
    │            ├────────────►│             │             │
    │            │ Visual Indicator Updated │             │
    │            ◄────────────┤             │             │
    │ See Quality Feedback     │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │ Show Banner │
    │            │             │             ├─────────────►│
    │            │             │             │ Banner Displayed
    │            │             │             ◄─────────────┤
    │ View Quality Banner & Tips│             │             │
    ◄────────────┼─────────────┼─────────────┼─────────────┤
    │            │             │             │             │
```

### Error Handling and Recovery

```
Job Seeker    UI            API           Error         Recovery
              Component     Route         Handler       System
    │            │             │             │             │
    │ Submit Request           │             │             │
    ├───────────►│             │             │             │
    │            │ Process Request          │             │
    │            ├────────────►│             │             │
    │            │             │ [Error Occurs]           │
    │            │             ├────────────►│             │
    │            │             │ Classify Error Type      │
    │            │             ├────────────►│             │
    │            │             │ Error Classification     │
    │            │             ◄────────────┤             │
    │            │             │ Determine Recovery       │
    │            │             ├─────────────────────────►│
    │            │             │ Recovery Strategy        │
    │            │             ◄─────────────────────────┤
    │            │ Error Response with Recovery Options  │
    │            ◄────────────┤             │             │
    │ View Error Message       │             │             │
    ◄────────────┤             │             │             │
    │ User-friendly Error + Retry Button    │             │
    │            │             │             │             │
    │ Click Retry              │             │             │
    ├───────────►│             │             │             │
    │            │ Retry with Same Data     │             │
    │            ├────────────►│             │             │
    │            │ Success Response         │             │
    │            ◄────────────┤             │             │
    │ See Success Result       │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
```

### URL Job Link Processing

```
Job Seeker    Form          Link          OpenAI        Content
              Component     Validator     Web Search    Processor
    │            │             │             │             │
    │ Enter Job URL            │             │             │
    ├───────────►│             │             │             │
    │            │ Real-time URL Validation │             │
    │            ├────────────►│             │             │
    │            │ Format Valid │             │             │
    │            ◄────────────┤             │             │
    │            │ Detect Job Source        │             │
    │            ├────────────►│             │             │
    │            │ Source Info (LinkedIn/Indeed/etc.)   │
    │            ◄────────────┤             │             │
    │ See URL Status & Source  │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
    │ Submit for Processing    │             │             │
    ├───────────►│             │             │             │
    │            │ Extract Job Info from URL│             │
    │            ├─────────────────────────►│             │
    │            │ Raw Job Content          │             │
    │            ◄─────────────────────────┤             │
    │            │ Process & Structure Content           │
    │            ├─────────────────────────────────────►│
    │            │ Structured Job Information           │
    │            ◄─────────────────────────────────────┤
    │ Processing Complete      │             │             │
    ◄────────────┤             │             │             │
    │            │             │             │             │
```

## Integration Flow Summary

### Complete Application Flow

```
Job Seeker    Page 1        Page 2        Page 3        External
              (Homepage)    (Generate)    (Result)      Services
    │            │             │             │             │
    │ Template Selection & Preview Flow     │             │
    ├───────────►│             │             │             │
    │            │ Navigation with Template Parameter    │
    │            ├────────────►│             │             │
    │            │             │ Input Collection & Processing
    │            │             ├────────────►│             │
    │            │             │             │ AI Generation│
    │            │             │             ├────────────►│
    │            │             │             │ Generated Content
    │            │             │             ◄────────────┤
    │            │             │ Results Display & Actions │
    │            │             ◄────────────┤             │
    │ Complete User Journey    │             │             │
    ◄────────────┴─────────────┴─────────────┘             │
    │            │             │             │             │
```

## Key Interaction Patterns by Page

### Page 1 (Homepage) Patterns

- **Template Selection**: Click to select, preview modal for detailed view
- **State Management**: Continue button enabled only after template selection
- **Navigation**: Template parameter passed to generation form

### Page 2 (Generate) Patterns

- **Dual Input Methods**: Image upload OR URL entry with real-time validation
- **Quality Assessment**: Immediate feedback with visual indicators
- **Progressive Enhancement**: Generate button enabled when all requirements met

### Page 3 (Result) Patterns

- **Streaming Display**: Real-time text generation with template formatting
- **Action Options**: Copy to clipboard and multi-format download
- **Template Integration**: All outputs maintain template styling consistency

### Error Handling Patterns

- **Graceful Degradation**: Continue with reduced functionality during failures
- **User-Friendly Feedback**: Clear error messages with actionable recovery steps
- **Retry Mechanisms**: Automatic and manual retry options for failed operations

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Updated: July 20, 2025 - Reorganized by application pages with detailed interaction flows for improved clarity and documentation structure_
