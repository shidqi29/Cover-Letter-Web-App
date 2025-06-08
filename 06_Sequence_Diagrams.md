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

### 1. Cover Letter Generation from Image Upload

```
Job Seeker    UI Component    API Route      File Processor    OpenAI API    Document Utils
    │             │              │               │               │               │
    │ Upload Image │              │               │               │               │
    ├─────────────►│              │               │               │               │
    │             │ Validate File │               │               │               │
    │             ├──────────────►│               │               │               │
    │             │ File Valid    │               │               │               │
    │             ◄──────────────┤               │               │               │
    │             │              │               │               │               │
    │ Upload CV    │              │               │               │               │
    ├─────────────►│              │               │               │               │
    │             │ Validate CV   │               │               │               │
    │             ├──────────────►│               │               │               │
    │             │ CV Valid      │               │               │               │
    │             ◄──────────────┤               │               │               │
    │             │              │               │               │               │
    │ Click Generate              │               │               │               │
    ├─────────────►│              │               │               │               │
    │             │ POST /api/generate            │               │               │
    │             ├─────────────►│               │               │               │
    │             │              │ Extract Image Text             │               │
    │             │              ├──────────────►│               │               │
    │             │              │ Image Text    │               │               │
    │             │              ◄──────────────┤               │               │
    │             │              │               │               │               │
    │             │              │ Extract CV Text               │               │
    │             │              ├──────────────►│               │               │
    │             │              │ CV Text       │               │               │
    │             │              ◄──────────────┤               │               │
    │             │              │               │               │               │
    │             │              │ Assess Quality│               │               │
    │             │              ├──────────────►│               │               │
    │             │              │ Quality Score │               │               │
    │             │              ◄──────────────┤               │               │
    │             │              │               │               │               │
    │             │              │ Generate Cover Letter         │               │
    │             │              ├─────────────────────────────►│               │
    │             │              │               │ Stream Response               │
    │             │              ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┤               │
    │             │ Stream Data  │               │               │               │
    │             ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐┤               │               │               │
    │ Stream Display             │               │               │               │
    ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐│              │               │               │               │
    │             │              │ Generation Complete           │               │
    │             │              ◄─────────────────────────────┤               │
    │             │ Response     │               │               │               │
    │             ◄─────────────┤               │               │               │
    │ Show Result │              │               │               │               │
    ◄─────────────┤              │               │               │               │
    │             │              │               │               │               │
```

### 2. Cover Letter Generation from URL Link

```
Job Seeker    UI Component    API Route      Link Validator    OpenAI API    Web Scraper
    │             │              │               │               │               │
    │ Enter URL    │              │               │               │               │
    ├─────────────►│              │               │               │               │
    │             │ Validate URL  │               │               │               │
    │             ├─────────────►│               │               │               │
    │             │ URL Valid     │               │               │               │
    │             ◄─────────────┤               │               │               │
    │             │              │               │               │               │
    │ Upload CV    │              │               │               │               │
    ├─────────────►│              │               │               │               │
    │             │              │               │               │               │
    │ Click Generate              │               │               │               │
    ├─────────────►│              │               │               │               │
    │             │ POST /api/generate            │               │               │
    │             ├─────────────►│               │               │               │
    │             │              │ Scrape Job Content            │               │
    │             │              ├─────────────────────────────────────────────►│
    │             │              │               │               │ Job Content   │
    │             │              ◄─────────────────────────────────────────────┤
    │             │              │               │               │               │
    │             │              │ Extract Job Info via AI       │               │
    │             │              ├─────────────────────────────►│               │
    │             │              │               │ Job Details   │               │
    │             │              ◄─────────────────────────────┤               │
    │             │              │               │               │               │
    │             │              │ Generate Cover Letter         │               │
    │             │              ├─────────────────────────────►│               │
    │             │              │               │ Stream Response               │
    │             │              ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐ ┤               │
    │             │ Stream Data  │               │               │               │
    │             ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐┤               │               │               │
    │ Stream Display             │               │               │               │
    ◄┐ ┐ ┐ ┐ ┐ ┐ ┐ ┐│              │               │               │               │
    │             │              │               │               │               │
```

### 3. File Download Process

```
Job Seeker    UI Component    API Route      Document Utils    File System
    │             │              │               │               │
    │ Click Download              │               │               │
    ├─────────────►│              │               │               │
    │             │ Select Format │               │               │
    │             ├──────────────►│               │               │
    │             │ Format Selected               │               │
    │             ◄──────────────┤               │               │
    │             │              │               │               │
    │             │ POST /api/download            │               │
    │             ├─────────────►│               │               │
    │             │              │ Format Document               │
    │             │              ├──────────────►│               │
    │             │              │               │ Create File   │
    │             │              │               ├──────────────►│
    │             │              │               │ File Created  │
    │             │              │               ◄──────────────┤
    │             │              │ Document Ready│               │
    │             │              ◄──────────────┤               │
    │             │              │               │               │
    │             │ File Stream  │               │               │
    │             ◄─────────────┤               │               │
    │ Download File              │               │               │
    ◄─────────────┤              │               │               │
    │             │              │               │ Cleanup File  │
    │             │              │               ├──────────────►│
    │             │              │               │ File Deleted  │
    │             │              │               ◄──────────────┤
    │             │              │               │               │
```

### 4. Input Quality Assessment Process

```
System        File Processor   Quality Assessor   AI Service     Mode Selector
    │               │               │               │               │
    │ Assess Input Quality          │               │               │
    ├──────────────►│               │               │               │
    │               │ Analyze Image/URL             │               │
    │               ├──────────────►│               │               │
    │               │               │ Extract Sample│               │
    │               │               ├──────────────►│               │
    │               │               │ Content Quality               │
    │               │               ◄──────────────┤               │
    │               │ Image Quality │               │               │
    │               ◄──────────────┤               │               │
    │               │               │               │               │
    │               │ Analyze CV    │               │               │
    │               ├──────────────►│               │               │
    │               │               │ Parse CV Content              │
    │               │               ├──────────────►│               │
    │               │               │ CV Completeness               │
    │               │               ◄──────────────┤               │
    │               │ CV Quality    │               │               │
    │               ◄──────────────┤               │               │
    │               │               │               │               │
    │ Quality Scores│               │               │               │
    ◄──────────────┤               │               │               │
    │               │               │               │               │
    │ Determine Generation Mode     │               │               │
    ├─────────────────────────────────────────────────────────────►│
    │               │               │               │ Mode Decision │
    ◄─────────────────────────────────────────────────────────────┤
    │               │               │               │               │

    Mode Types:
    - Standard Mode: Both inputs high quality
    - Job-Focused Mode: Good job info, limited CV
    - CV-Focused Mode: Limited job info, good CV
    - Generic Mode: Both inputs limited quality
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

| Interaction Type  | Expected Duration | Timeout Limit |
| ----------------- | ----------------- | ------------- |
| File Upload       | 1-3 seconds       | 30 seconds    |
| Text Extraction   | 3-10 seconds      | 45 seconds    |
| AI Generation     | 5-15 seconds      | 60 seconds    |
| Document Creation | 1-2 seconds       | 10 seconds    |
| Stream Response   | Real-time         | 90 seconds    |

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Date: June 9, 2025_
