# Cover Letter Web App - Use Case Documentation

## RUP (Rational Unified Process) Methodology

### Project Overview

This document outlines the use cases for the Cover Letter Web Application, developed as part of a thesis project using the Rational Unified Process (RUP) methodology.

### System Description

The Cover Letter Web Application is an AI-powered tool that generates personalized cover letters by analyzing job postings and user CVs/resumes. The system supports multiple input methods and provides quality assessment features.

## Actors

### Primary Actors

1. **Job Seeker (User)** - The main user who needs to generate cover letters
2. **System Administrator** - Manages the application (implicit, for maintenance)

### Secondary Actors

3. **OpenAI API** - External AI service for text extraction and generation
4. **Job Posting Websites** - External sources (JobStreet, LinkedIn, Indeed, etc.)

## Use Cases

### UC1: Generate Cover Letter from Job Poster Image

**Actor:** Job Seeker  
**Description:** User uploads an image of a job posting and their CV to generate a personalized cover letter.

**Preconditions:**

- User has access to the web application
- User has a job posting image file
- User has a CV file (PDF or DOCX format)

**Main Flow:**

1. User navigates to the application homepage
2. User selects "Image" as job information source
3. User uploads job poster image (JPG, PNG, etc.)
4. System validates image file and assesses quality
5. User uploads CV file (PDF or DOCX)
6. System validates CV file and assesses quality
7. User selects preferred language (English or Bahasa Indonesia)
8. User clicks "Generate Cover Letter"
9. System extracts text from job poster image using AI
10. System extracts text from CV file
11. System analyzes input quality and determines generation mode
12. System generates cover letter using AI
13. System streams the generated content to user interface
14. System displays quality assessment feedback

**Alternative Flows:**

- 4a. Image quality is poor: System warns user but continues with generation
- 5a. CV quality is limited: System warns user but continues with generation
- 9a. Image text extraction fails: System returns error message
- 10a. CV text extraction fails: System returns error message

**Postconditions:**

- Cover letter is generated and displayed
- User can copy, download, or regenerate the content

### UC2: Generate Cover Letter from Job Link

**Actor:** Job Seeker  
**Description:** User provides a URL to a job posting and their CV to generate a personalized cover letter.

**Preconditions:**

- User has access to the web application
- User has a valid job posting URL
- User has a CV file (PDF or DOCX format)

**Main Flow:**

1. User navigates to the application homepage
2. User selects "Link" as job information source
3. User enters job posting URL
4. System validates URL format and detects job source
5. User uploads CV file (PDF or DOCX)
6. System validates CV file and assesses quality
7. User selects preferred language (English or Bahasa Indonesia)
8. User clicks "Generate Cover Letter"
9. System extracts job information from URL using web scraping/AI
10. System extracts text from CV file
11. System analyzes input quality and determines generation mode
12. System generates cover letter using AI
13. System streams the generated content to user interface
14. System displays quality assessment feedback

**Alternative Flows:**

- 4a. URL is invalid: System displays error and prompts for valid URL
- 4b. Job source is unrecognized: System warns user but continues
- 9a. Web content extraction fails: System returns error message

**Postconditions:**

- Cover letter is generated and displayed
- User can copy, download, or regenerate the content

### UC3: Download Cover Letter

**Actor:** Job Seeker  
**Description:** User downloads the generated cover letter in their preferred format.

**Preconditions:**

- Cover letter has been successfully generated
- User is viewing the generated cover letter

**Main Flow:**

1. User clicks on "Download" dropdown button
2. System displays format options (PDF, DOCX)
3. User selects preferred format
4. System formats the cover letter content
5. System generates filename based on job title and company
6. System initiates file download
7. System displays success notification

**Alternative Flows:**

- 4a. PDF generation fails: System displays error message
- 4b. DOCX generation fails: System displays error message

**Postconditions:**

- Cover letter file is downloaded to user's device
- File is properly formatted and ready for use

### UC4: Copy Cover Letter to Clipboard

**Actor:** Job Seeker  
**Description:** User copies the generated cover letter text to clipboard for immediate use.

**Preconditions:**

- Cover letter has been successfully generated
- User is viewing the generated cover letter

**Main Flow:**

1. User clicks "Copy" button
2. System copies cover letter text to clipboard
3. System displays success notification

**Postconditions:**

- Cover letter text is available in user's clipboard

### UC5: Validate Job Link

**Actor:** Job Seeker  
**Description:** System validates the job posting URL and provides feedback on its quality.

**Preconditions:**

- User has entered a job posting URL
- User has selected "Link" as job information source

**Main Flow:**

1. User enters job posting URL
2. System validates URL format
3. System attempts to detect job posting source
4. System checks if URL points to a known job site
5. System provides validation feedback to user

**Alternative Flows:**

- 2a. Invalid URL format: System displays format error
- 4a. Unknown job site: System warns about potential extraction issues

**Postconditions:**

- URL validation status is displayed
- User receives feedback on link quality

### UC6: Assess Input Quality

**Actor:** System (Internal)  
**Description:** System automatically assesses the quality of user inputs to optimize cover letter generation.

**Preconditions:**

- User has provided job information (image or link)
- User has uploaded CV file

**Main Flow:**

1. System analyzes job information quality
2. System analyzes CV file quality
3. System determines content relevance
4. System selects appropriate generation mode
5. System provides quality indicators to user

**Generation Modes:**

- **Standard Mode:** Both inputs are of good quality
- **Job-Focused Mode:** CV has limited information
- **CV-Focused Mode:** Job information has limited details
- **Generic Mode:** Both inputs have quality issues

**Postconditions:**

- Input quality assessment is complete
- Appropriate generation strategy is selected

### UC7: Stream Generated Content

**Actor:** System (Internal)  
**Description:** System streams the AI-generated cover letter content in real-time to provide immediate feedback.

**Preconditions:**

- Cover letter generation process has started
- User is waiting for results

**Main Flow:**

1. System initiates AI content generation
2. System receives content chunks from AI service
3. System streams content to user interface
4. System displays typing indicator
5. System completes content delivery

**Postconditions:**

- Complete cover letter is displayed
- User can interact with the generated content

## Use Case Relationships

### Include Relationships

- UC1 includes UC6 (Assess Input Quality)
- UC2 includes UC6 (Assess Input Quality)
- UC1 includes UC7 (Stream Generated Content)
- UC2 includes UC7 (Stream Generated Content)
- UC2 includes UC5 (Validate Job Link)

### Extend Relationships

- UC3 extends UC1 and UC2 (Download after generation)
- UC4 extends UC1 and UC2 (Copy after generation)

## Non-Functional Requirements

### Performance

- Cover letter generation should complete within 30-60 seconds
- File downloads should initiate within 2 seconds
- Real-time streaming should have minimal latency

### Usability

- Interface should be responsive across desktop and mobile devices
- Input validation should provide clear feedback
- Quality indicators should guide user decisions

### Security

- File uploads should be validated for size and format
- API keys should be securely managed
- User data should not be permanently stored

### Reliability

- System should handle API failures gracefully
- Alternative generation modes should ensure consistent output
- Error messages should be informative and actionable

## Technical Architecture Support

### Frontend Components

- **CoverLetterForm**: Main interface component
- **StreamingText**: Real-time content display
- **DownloadButton**: File generation and download
- **InputQualityIndicator**: Quality assessment display
- **ProgressIndicator**: Loading state management

### Backend Services

- **Generate API**: Core cover letter generation endpoint
- **Text Extraction**: Image and document processing
- **Link Validation**: URL verification and content extraction
- **Quality Assessment**: Input analysis and optimization

### External Integrations

- **OpenAI API**: AI-powered text extraction and generation
- **PDF Processing**: Document parsing and generation
- **Web Scraping**: Job posting content extraction

## Activity Diagrams

Activity diagrams show the workflow and business logic of the Cover Letter Web Application. These diagrams illustrate the sequence of activities from user interaction to final output generation.

### Main Activity Diagram: Cover Letter Generation Process

```
┌─────────────────┐
│   User Access   │
│   Application   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Select Job Info │
│ Source Type     │
└─────────┬───────┘
          │
          ▼
     ◊────────────◊
    ╱              ╲
   ╱   Image or     ╲     ┌─ Image Path ──┐
  ╱     Link?       ╲     │               ▼
 ╱                   ╲    │    ┌─────────────────┐
◊─────────────────────◊   │    │ Upload Job      │
 ╲                   ╱    │    │ Poster Image    │
  ╲     Link        ╱     │    └─────────┬───────┘
   ╲               ╱      │              │
    ╲─────────────╱       │              ▼
          │                │    ┌─────────────────┐
          ▼                │    │ Validate Image  │
┌─────────────────┐        │    │ Quality         │
│ Enter Job       │        │    └─────────┬───────┘
│ Posting URL     │        │              │
└─────────┬───────┘        │              ▼
          │                │    ┌─────────────────┐
          ▼                │    │ Extract Text    │
┌─────────────────┐        │    │ from Image      │
│ Validate URL    │        │    │ (OpenAI API)    │
│ Format & Source │        │    └─────────┬───────┘
└─────────┬───────┘        │              │
          │                └──────────────┘
          ▼                               │
┌─────────────────┐                       │
│ Extract Job     │                       │
│ Info from URL   │                       │
│ (Web Scraping)  │                       │
└─────────┬───────┘                       │
          │                               │
          └───────────┬───────────────────┘
                      │
                      ▼
            ┌─────────────────┐
            │ Upload CV/      │
            │ Resume File     │
            └─────────┬───────┘
                      │
                      ▼
            ┌─────────────────┐
            │ Validate CV     │
            │ File Format     │
            └─────────┬───────┘
                      │
                      ▼
                 ◊────────────◊
                ╱              ╲
               ╱   PDF or       ╲
              ╱    DOCX?        ╲
             ╱                   ╲
            ◊─────────────────────◊
             ╲                   ╱
              ╲     DOCX        ╱
               ╲               ╱
                ╲─────────────╱
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
┌─────────────────┐    ┌─────────────────┐
│ Extract Text    │    │ Extract Text    │
│ from PDF        │    │ from DOCX       │
│ (pdf-parse)     │    │ (mammoth)       │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
                     ▼
           ┌─────────────────┐
           │ Select Language │
           │ (EN/ID)         │
           └─────────┬───────┘
                     │
                     ▼
           ┌─────────────────┐
           │ Assess Input    │
           │ Quality         │
           └─────────┬───────┘
                     │
                     ▼
                ◊────────────◊
               ╱              ╲
              ╱  Determine     ╲
             ╱  Generation     ╲
            ╱     Mode         ╲
           ╱                   ╲
          ◊─────────────────────◊
          │        │        │  │
          ▼        ▼        ▼  ▼
    ┌─────────┐ ┌────────┐ ┌──────┐ ┌─────────┐
    │Standard │ │   Job  │ │  CV  │ │Generic  │
    │  Mode   │ │Focused │ │Focused│ │  Mode   │
    └─────────┘ └────────┘ └──────┘ └─────────┘
          │        │        │       │
          └────────┼────────┼───────┘
                   │        │
                   ▼        ▼
           ┌─────────────────┐
           │ Generate Cover  │
           │ Letter (AI)     │
           └─────────┬───────┘
                     │
                     ▼
           ┌─────────────────┐
           │ Stream Content  │
           │ to User         │
           └─────────┬───────┘
                     │
                     ▼
           ┌─────────────────┐
           │ Display Results │
           │ & Quality Info  │
           └─────────┬───────┘
                     │
                     ▼
                ◊────────────◊
               ╱              ╲
              ╱   User Action  ╲
             ╱    Required?    ╲
            ╱                   ╲
           ◊─────────────────────◊
            ╲                   ╱
             ╲      Copy       ╱
              ╲   Download    ╱
               ╲   Regenerate╱
                ╲___________╱
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐
│Copy to      │ │Download  │ │Regenerate│
│Clipboard    │ │as PDF/   │ │with New  │
│             │ │DOCX      │ │Settings  │
└─────────────┘ └──────────┘ └──────────┘
          │          │          │
          └──────────┼──────────┘
                     ▼
           ┌─────────────────┐
           │    Process      │
           │   Complete      │
           └─────────────────┘
```

### Detailed Activity Diagram: Input Quality Assessment

```
┌─────────────────┐
│ Input Quality   │
│ Assessment      │
│ Started         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Analyze Job     │
│ Information     │
└─────────┬───────┘
          │
     ◊────────────◊
    ╱              ╲
   ╱   Image or     ╲
  ╱     Link?       ╲
 ╱                   ╲
◊─────────────────────◊
 ╲                   ╱
  ╲     Link        ╱
   ╲               ╱
    ╲─────────────╱
          │
┌─────────┴─────────┐
▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Check Image     │ │ Check URL       │
│ Size & Quality  │ │ Validity &      │
│                 │ │ Source          │
└─────────┬───────┘ └─────────┬───────┘
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Analyze CV      │
          │ File Quality    │
          └─────────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Check File Size │
          │ & Content       │
          │ Completeness    │
          └─────────┬───────┘
                    │
                    ▼
               ◊────────────◊
              ╱              ╲
             ╱  Assess Input  ╲
            ╱   Combination   ╲
           ╱                   ╲
          ◊─────────────────────◊
          │        │        │  │
          ▼        ▼        ▼  ▼
    ┌─────────┐ ┌────────┐ ┌──────┐ ┌─────────┐
    │ Both    │ │Limited │ │Limited│ │ Both    │
    │ Good    │ │  Job   │ │  CV   │ │Limited  │
    │Quality  │ │ Info   │ │ Info  │ │ Info    │
    └─────────┘ └────────┘ └──────┘ └─────────┘
          │        │        │       │
          ▼        ▼        ▼       ▼
    ┌─────────┐ ┌────────┐ ┌──────┐ ┌─────────┐
    │Standard │ │   Job  │ │  CV  │ │Generic  │
    │  Mode   │ │Focused │ │Focused│ │  Mode   │
    └─────────┘ └────────┘ └──────┘ └─────────┘
          │        │        │       │
          └────────┼────────┼───────┘
                   │        │
                   ▼        ▼
          ┌─────────────────┐
          │ Set Quality     │
          │ Indicators &    │
          │ User Warnings   │
          └─────────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Return Quality  │
          │ Assessment      │
          │ Results         │
          └─────────────────┘
```

### Error Handling Activity Diagram

```
┌─────────────────┐
│  System Error   │
│   Occurred      │
└─────────┬───────┘
          │
     ◊────────────◊
    ╱              ╲
   ╱   Error Type   ╲
  ╱                 ╲
 ╱                   ╲
◊─────────────────────◊
│         │         │
▼         ▼         ▼
┌─────────┐ ┌──────┐ ┌─────────┐
│File     │ │ API  │ │Network  │
│Upload   │ │Error │ │Error    │
│Error    │ │      │ │         │
└─────────┘ └──────┘ └─────────┘
│         │         │
└─────────┼─────────┘
          │
          ▼
┌─────────────────┐
│ Log Error       │
│ Details         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Display User-   │
│ Friendly Error  │
│ Message         │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Provide         │
│ Suggested       │
│ Actions         │
└─────────┬───────┘
          │
          ▼
     ◊────────────◊
    ╱              ╲
   ╱   Recoverable  ╲
  ╱     Error?      ╲
 ╱                   ╲
◊─────────────────────◊
 ╲                   ╱
  ╲      No         ╱
   ╲               ╱
    ╲─────────────╱
          │
          ▼
┌─────────────────┐
│ Allow User      │
│ to Retry or     │
│ Reset Form      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Return to       │
│ Previous State  │
└─────────────────┘
```

### Activity Diagram: Download Process

```
┌─────────────────┐
│ User Clicks     │
│ Download Button │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Display Format  │
│ Options Menu    │
└─────────┬───────┘
          │
          ▼
     ◊────────────◊
    ╱              ╲
   ╱   PDF or       ╲
  ╱    DOCX?        ╲
 ╱                   ╲
◊─────────────────────◊
 ╲                   ╱
  ╲     DOCX        ╱
   ╲               ╱
    ╲─────────────╱
          │
┌─────────┴─────────┐
▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Generate PDF    │ │ Generate DOCX   │
│ using jsPDF     │ │ using docx lib  │
└─────────┬───────┘ └─────────┬───────┘
          │                   │
          ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Format Content  │ │ Format Content  │
│ with Header     │ │ with Styling    │
│ & Footer        │ │ & Structure     │
└─────────┬───────┘ └─────────┬───────┘
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Generate Smart  │
          │ Filename from   │
          │ Content         │
          └─────────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Trigger File    │
          │ Download        │
          └─────────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Show Success    │
          │ Notification    │
          └─────────────────┘
```

### Activity Diagram Legend

- **Start/End**: Rounded rectangles (┌─────┐)
- **Activity/Process**: Rectangles (┌─────────┐)
- **Decision Point**: Diamond shapes (◊─────◊)
- **Parallel Activities**: Parallel branches
- **Flow Direction**: Arrows (│, ▼, ├, └)
- **Synchronization**: Horizontal bars

### Activity Flow Description

1. **Initialization**: User accesses the application and begins the cover letter generation process
2. **Input Selection**: User chooses between image upload or URL input for job information
3. **File Processing**: System processes both job information and CV files with appropriate parsers
4. **Quality Assessment**: System evaluates input quality and determines optimal generation strategy
5. **Content Generation**: AI generates cover letter based on assessed inputs and selected mode
6. **Output Delivery**: System streams content to user with real-time feedback
7. **Post-Generation Actions**: User can copy, download, or regenerate content as needed
8. **Error Handling**: System manages errors gracefully with user-friendly messages and recovery options

### Activity Benefits for RUP Methodology

- **Process Visualization**: Clear representation of system workflows
- **Decision Points**: Explicit handling of conditional logic
- **Error Paths**: Comprehensive error handling strategies
- **Parallel Processing**: Efficient resource utilization
- **User Interaction**: Clear user touch points and feedback loops

## Conclusion

This use case documentation provides a comprehensive overview of the Cover Letter Web Application's functionality, designed following RUP methodology principles. The system offers multiple interaction paths while maintaining quality and user experience standards suitable for a thesis-level project.

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Date: June 9, 2025_
