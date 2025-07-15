# Use Cases - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains detailed use case specifications for the Cover Letter Web Application, following RUP methodology standards.

## Actors

### Primary Actors

1. **Job Seeker (User)** - The primary user who generates personalized cover letters
2. **System Administrator** - Manages application configuration and monitoring (implicit)

### Secondary Actors

3. **OpenAI API** - External AI service providing text extraction, generation, and vision capabilities
4. **Job Posting Websites** - External sources (LinkedIn, Indeed, JobStreet, Glassdoor, etc.)
5. **File System** - Temporary storage for document processing and generation

## Use Cases Overview

### Primary Use Cases

1. UC1: Select Cover Letter Template
2. UC2: Preview Template Styles
3. UC3: Generate Cover Letter from Job Poster Image
4. UC4: Generate Cover Letter from Job URL
5. UC5: Download Generated Cover Letter
6. UC6: Assess Input Quality

### Secondary Use Cases

7. UC7: Validate Job Link
8. UC8: Stream Generation Progress
9. UC9: Handle Generation Errors

## Detailed Use Cases

### UC1: Select Cover Letter Template

**Actor:** Job Seeker  
**Description:** User selects a visual template that determines the formatting, styling, and layout of their cover letter.

**Preconditions:**

- User has access to the web application
- Three templates are available: Professional, Modern, Creative
- Templates are properly loaded with preview information

**Main Flow:**

1. User navigates to the application homepage
2. System displays three template options with visual cards
3. System shows template descriptions and style indicators
4. User reviews template characteristics (Professional: traditional business format, Modern: contemporary clean design, Creative: expressive industry-focused)
5. User clicks on preferred template card
6. System highlights selected template with visual feedback
7. System enables "Continue" button
8. User clicks "Continue" to proceed to generation form

**Alternative Flows:**

- 4a. User wants detailed preview: User clicks template preview, system opens detailed template preview dialog
- 5a. User changes selection: User clicks different template, system updates selection highlighting
- 8a. No template selected: System keeps "Continue" button disabled with message "Select Template First"

**Postconditions:**

- Template is selected and stored in application state
- User is redirected to generation form with selected template parameter
- Template selection is preserved throughout the generation process

### UC2: Preview Template Styles

**Actor:** Job Seeker  
**Description:** User views detailed visual previews of available cover letter templates to make an informed selection.

**Preconditions:**

- User is on template selection page
- Template preview data is loaded
- Templates have associated preview content

**Main Flow:**

1. User clicks on template card or preview button
2. System opens template preview dialog/modal
3. System displays mock cover letter content in selected template style
4. System shows template-specific formatting (fonts, colors, layout, spacing)
5. User reviews visual design and professional appearance
6. User can navigate between different template previews
7. User selects template from preview or closes dialog

**Alternative Flows:**

- 6a. User compares templates: User opens multiple previews to compare styles
- 7a. User selects from preview: System selects template and closes preview

**Postconditions:**

- User has viewed detailed template preview
- User understands template visual appearance
- User can make informed template selection

### UC3: Generate Cover Letter from Job Poster Image

**Actor:** Job Seeker  
**Description:** User uploads an image of a job posting and their CV to generate a personalized cover letter using OCR and AI processing.

**Preconditions:**

- User has selected a cover letter template
- User has access to generation form
- User has job posting image file (JPG, PNG, etc.)
- User has CV file (PDF or DOCX format)
- OpenAI API is accessible

**Main Flow:**

1. User navigates to generation form with selected template
2. User selects "Image" as job information input method
3. User uploads job poster image file
4. System validates image format and size
5. System displays image preview and quality indicator
6. User uploads CV file (PDF or DOCX)
7. System validates CV format and displays quality indicator
8. System performs automated quality assessment of both inputs
9. User selects preferred output language (English or Bahasa Indonesia)
10. User clicks "Generate Cover Letter" button
11. System displays progress indicator
12. System extracts text from job poster image using OpenAI Vision API
13. System extracts text from CV file using appropriate parser
14. System analyzes extracted content quality and relevance
15. System generates personalized cover letter using AI with selected template
16. System streams generated content in real-time
17. System displays completed cover letter with download options

**Alternative Flows:**

- 4a. Invalid image format: System shows error message and requests valid format
- 6a. Invalid CV format: System shows error message and requests PDF or DOCX
- 8a. Low quality inputs detected: System shows quality warnings but allows continuation
- 12a. OCR extraction fails: System shows error and suggests alternative input method
- 14a. Inputs not relevant: System generates general cover letter with warnings
- 16a. Generation fails: System shows error message and retry options

**Postconditions:**

- Cover letter is generated and displayed
- User can download in multiple formats
- Generated content is ready for template switching

### UC4: Generate Cover Letter from Job URL

**Actor:** Job Seeker  
**Description:** User provides a URL to a job posting and their CV to generate a personalized cover letter using web scraping and AI processing.

**Preconditions:**

- User has selected a cover letter template
- User has access to generation form
- User has a valid job posting URL from supported sites
- User has CV file (PDF or DOCX format)
- OpenAI API with web search capabilities is accessible

**Main Flow:**

1. User navigates to generation form with selected template
2. User selects "Link" as job information input method
3. User enters job posting URL in text field
4. System validates URL format with real-time feedback
5. System detects job source (LinkedIn, Indeed, JobStreet, etc.) and displays indicator
6. System shows link validation status (valid/invalid/unknown source)
7. User uploads CV file (PDF or DOCX)
8. System validates CV format and displays quality indicator
9. System performs automated quality assessment of both inputs
10. User selects preferred output language (English or Bahasa Indonesia)
11. User clicks "Generate Cover Letter" button
12. System displays progress indicator
13. System extracts job information from URL using OpenAI web search capabilities
14. System extracts text from CV file using appropriate parser
15. System analyzes extracted content quality and relevance
16. System generates personalized cover letter using AI with selected template
17. System streams generated content in real-time
18. System displays completed cover letter with download options

**Alternative Flows:**

- 4a. Invalid URL format: System displays real-time validation error
- 5a. Unknown job source: System warns user but allows continuation with unknown source indicator
- 6a. Link validation fails: System shows error and suggests checking URL
- 7a. Invalid CV format: System shows error message and requests PDF or DOCX
- 13a. Web extraction fails: System shows error and suggests alternative input method
- 15a. Inputs not relevant: System generates general cover letter with warnings
- 17a. Generation fails: System shows error message and retry options

**Postconditions:**

- Cover letter is generated and displayed
- User can download in multiple formats

### UC5: Download Generated Cover Letter

**Actor:** Job Seeker  
**Description:** User downloads the generated cover letter in their preferred format with template-specific styling.

**Preconditions:**

- Cover letter has been successfully generated
- User is viewing the generated cover letter result page
- Download functionality is available

**Main Flow:**

1. User clicks "Download" button on result page
2. System presents download format options (PDF, DOCX)
3. User selects preferred format
4. System generates document with template-specific formatting
5. System applies appropriate styling (fonts, colors, layout) based on selected template
6. System creates smart filename based on job title and company if detected
7. System initiates download to user's device
8. Browser downloads file with generated filename

**Alternative Flows:**

- 3a. User wants both formats: User downloads PDF, then repeats process for DOCX
- 4a. Generation fails: System shows error message and retry option
- 6a. Unable to extract job info for filename: System uses default timestamp filename
- 7a. Browser blocks download: System shows instructions to allow downloads

**Postconditions:**

- Cover letter is downloaded in selected format
- File maintains template-specific professional formatting
- User has local copy of generated cover letter

### UC6: Assess Input Quality

**Actor:** Job Seeker  
**Description:** System automatically evaluates the quality of uploaded job posting and CV files, providing visual feedback and recommendations.

**Preconditions:**

- User is on generation form page
- User has uploaded job posting (image or provided URL) and/or CV file
- Quality assessment functionality is enabled

**Main Flow:**

1. User uploads job posting image or enters job URL
2. System analyzes input quality using predefined criteria
3. System displays quality indicator (Good, Fair, Poor, Unknown)
4. System shows quality assessment details and recommendations
5. User uploads CV file
6. System analyzes CV content and format quality
7. System displays CV quality indicator
8. System provides overall quality assessment summary
9. System shows adaptive content banner if quality issues detected
10. System allows user to proceed with generation despite quality warnings

**Alternative Flows:**

- 2a. Quality assessment fails: System shows unknown quality status
- 8a. Very poor quality detected: System shows strong warnings but still allows continuation
- 9a. High quality inputs: System shows positive confirmation without warnings

**Postconditions:**

- User understands input quality status
- User has received quality improvement recommendations
- System is prepared for adaptive generation based on quality assessment

### UC7: Validate Job Link

**Actor:** Job Seeker  
**Description:** System validates job posting URLs in real-time and detects the job source platform.

**Preconditions:**

- User is on generation form with link input method selected
- User is entering or has entered a job posting URL
- Link validation functionality is enabled

**Main Flow:**

1. User types job posting URL in link input field
2. System performs real-time URL format validation with debounce
3. System attempts to detect job source platform (LinkedIn, Indeed, JobStreet, etc.)
4. System displays validation status indicator (Valid, Invalid, Unknown)
5. System shows detected job source name or "Unknown" for unrecognized platforms
6. System provides visual feedback (colors, icons) for validation status
7. System enables/disables form submission based on validation result

**Alternative Flows:**

- 2a. Invalid URL format: System shows red indicator and error message
- 3a. Network error during validation: System shows unknown status
- 4a. Valid URL but unknown platform: System shows warning but allows continuation

**Postconditions:**

- User knows URL validation status
- User understands which job platform was detected
- Form submission is appropriately enabled/disabled

### UC8: Stream Generation Progress

**Actor:** Job Seeker  
**Description:** System provides real-time feedback during cover letter generation process with streaming text and progress indicators.

**Preconditions:**

- User has initiated cover letter generation
- Generation process is active
- Streaming functionality is enabled

**Main Flow:**

1. User clicks "Generate Cover Letter" button
2. System displays progress indicator showing generation stages
3. System shows current stage (Processing job info, Analyzing CV, Generating content)
4. System begins streaming generated text in real-time
5. System displays partial content as it's generated
6. System updates progress indicator throughout process
7. System shows completion status when generation finishes
8. System displays full generated cover letter

**Alternative Flows:**

- 4a. Streaming connection fails: System shows loading indicator until completion
- 6a. Generation takes longer than expected: System shows extended patience message
- 7a. Generation completes with warnings: System shows success with quality notes

**Postconditions:**

- User has seen real-time generation progress
- User understands generation was successful
- Full cover letter content is displayed

### UC9: Handle Generation Errors

**Actor:** Job Seeker  
**Description:** System gracefully handles various error conditions during cover letter generation and provides helpful feedback.

**Preconditions:**

- User has attempted cover letter generation
- An error condition has occurred during processing
- Error handling functionality is enabled

**Main Flow:**

1. System encounters error during generation process
2. System identifies error type (API failure, parsing error, validation error, etc.)
3. System displays user-friendly error message
4. System provides specific guidance based on error type
5. System offers retry options or alternative solutions
6. System logs error details for troubleshooting
7. System maintains user's input data for retry attempts

**Alternative Flows:**

- 2a. Unknown error: System shows generic error message with support contact
- 5a. Critical system error: System suggests trying again later
- 6a. Persistent errors: System tracks error patterns for system improvement

**Postconditions:**

- User understands what went wrong
- User has clear next steps to resolve the issue
- User's input data is preserved for retry

## Use Case Relationships

### Include Relationships

- UC1 includes UC2 (Select Template includes Preview Template Styles)
- UC3 includes UC10 (Generate from Image includes Assess Input Quality)
- UC4 includes UC10 (Generate from Link includes Assess Input Quality)
- UC3 includes UC11 (Generate from Image includes Stream Generated Content)
- UC4 includes UC11 (Generate from Link includes Stream Generated Content)
- UC4 includes UC9 (Generate from Link includes Validate Job Link)

### Extend Relationships

- UC5 extends UC3 and UC4 (Switch Template after generation)
- UC6 extends UC3 and UC4 (Download after generation)
- UC7 extends UC3 and UC4 (Copy after generation)
- UC8 extends UC3 and UC4 (Preview after generation)

### Use Case Dependencies

- UC3 and UC4 depend on UC1 (Template must be selected before generation)
- UC5, UC6, UC7, UC8 depend on successful completion of UC3 or UC4
- UC2 supports UC1 (Preview helps with template selection)
- UC9 supports UC4 (Link validation improves generation quality)
- UC10 supports UC3 and UC4 (Quality assessment optimizes generation)

## Use Case Relationships Diagram

```
                    ┌─────────────────────────┐
                    │    UC1: Select Cover    │
                    │    Letter Template      │
                    └─────────────────────────┘
                                │
                                │ «include»
                                ▼
                    ┌─────────────────────────┐
                    │   UC2: Preview          │
                    │   Template Styles       │
                    └─────────────────────────┘
                                │
                                │ «extend»
                                ▼
            ┌─────────────────────────────────────────────────┐
            │                                                 │
            ▼                                                 ▼
┌─────────────────────────┐                   ┌─────────────────────────┐
│  UC3: Generate Cover    │                   │  UC4: Generate Cover    │
│  Letter from Job        │                   │  Letter from Job URL    │
│  Poster Image           │                   │                         │
└─────────────────────────┘                   └─────────────────────────┘
            │                                                 │
            │ «include»                                       │ «include»
            ▼                                                 ▼
┌─────────────────────────┐                   ┌─────────────────────────┐
│  UC6: Assess Input      │◄──────────────────┤  UC7: Validate Job Link │
│  Quality                │     «extend»      │                         │
└─────────────────────────┘                   └─────────────────────────┘
            │
            │ «include»
            ▼
┌─────────────────────────┐
│  UC8: Stream            │
│  Generation Progress    │
└─────────────────────────┘
            │
            │ «extend»
            ▼
┌─────────────────────────┐
│  UC9: Handle            │
│  Generation Errors      │
└─────────────────────────┘
            │
            │ flows to
            ▼
┌─────────────────────────┐
│  UC5: Download          │
│  Generated Cover Letter │
└─────────────────────────┘
```

### Relationship Descriptions

**Include Relationships («include»):**

- UC1 → UC2: Template selection always includes the ability to preview templates
- UC3 → UC6: Image-based generation always includes input quality assessment
- UC4 → UC7: URL-based generation always includes job link validation
- UC6 → UC8: Quality assessment always includes streaming progress during generation

**Extend Relationships («extend»):**

- UC2 → UC3/UC4: Template preview can extend to either generation method
- UC7 → UC6: Link validation can extend to general quality assessment
- UC8 → UC9: Streaming progress can extend to error handling when issues occur

**Flow Relationships:**

- UC8 → UC5: Successful generation flows to download functionality

---

## Use Case Relationships

### Primary Use Case Flow

1. UC1 (Select Template) → UC3/UC4 (Generate from Image/URL) → UC5 (Download)
2. UC2 (Preview Templates) supports UC1 (Template Selection)
3. UC6 (Quality Assessment) runs parallel to UC3/UC4 (Generation)
4. UC7 (Link Validation) supports UC4 (URL Generation)
5. UC8 (Progress Streaming) runs during UC3/UC4 (Generation)
6. UC9 (Error Handling) supports all generation use cases

### Dependencies

- UC1 must complete before UC3/UC4 can begin
- UC6 and UC7 provide feedback during UC3/UC4
- UC5 requires successful completion of UC3/UC4

### Quality Attributes

#### Usability

- Intuitive template selection with visual previews
- Real-time feedback during all input processes
- Clear error messages and recovery options
- Progressive disclosure of complex features

#### Performance

- Real-time streaming for immediate feedback
- Fast template switching without regeneration
- Efficient file processing and validation
- Responsive UI during long operations

#### Reliability

- Robust error handling with graceful degradation
- Quality assessment prevents common failures
- Retry mechanisms for transient errors
- Data preservation during error recovery

#### Security

- Client-side file processing when possible
- Secure API communication with external services
- No permanent storage of user documents
- Privacy-focused design with minimal data retention

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_
_Last Updated: July 15, 2025_
