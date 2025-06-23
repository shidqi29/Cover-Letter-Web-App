# Use Cases - Cover Letter Web App

## RUP (Rational Unified Process) Methodology

This document contains detailed use case specifications for the Cover Letter Web Application, following RUP methodology standards.

## Actors

### Primary Actors

1. **Job Seeker (User)** - The main user who needs to generate cover letters
2. **System Administrator** - Manages the application (implicit, for maintenance)

### Secondary Actors

3. **OpenAI API** - External AI service for text extraction and generation
4. **Job Posting Websites** - External sources (JobStreet, LinkedIn, Indeed, etc.)

## Use Cases

### UC1: Select Cover Letter Template

**Actor:** Job Seeker  
**Description:** User selects a visual template that will determine the formatting and style of their cover letter.

**Preconditions:**

- User has access to the web application
- Templates are available in the system

**Main Flow:**

1. User navigates to the application homepage
2. System displays available template options (Professional, Modern, Creative)
3. User views template previews and descriptions
4. User selects preferred template
5. System highlights selected template
6. User proceeds to cover letter generation

**Alternative Flows:**

- 4a. User wants to preview template: System shows detailed template preview
- 5a. User changes template selection: System updates selection

**Postconditions:**

- Template is selected for cover letter generation
- User can proceed to input job information

### UC2: Preview Template Styles

**Actor:** Job Seeker  
**Description:** User views detailed previews of available cover letter templates before making a selection.

**Preconditions:**

- User is on template selection page
- Templates are loaded in the system

**Main Flow:**

1. User clicks "Preview" on a template card
2. System opens template preview dialog
3. System displays sample cover letter in selected template style
4. User reviews formatting, layout, and visual design
5. User can compare different template styles
6. User closes preview or selects template

**Postconditions:**

- User has viewed template preview
- User can make informed template selection

### UC3: Generate Cover Letter from Job Poster Image

**Actor:** Job Seeker  
**Description:** User uploads an image of a job posting and their CV to generate a personalized cover letter using their selected template.

**Preconditions:**

- User has selected a cover letter template
- User has access to the web application
- User has a job posting image file
- User has a CV file (PDF or DOCX format)

**Main Flow:**

1. User navigates to generation form with selected template
2. User selects "Image" as job information source
3. User uploads job poster image (JPG, PNG, etc.)
4. System validates image file and displays quality indicator
5. User uploads CV file (PDF or DOCX)
6. System validates CV file and displays quality indicator
7. System analyzes input quality and shows quality assessment
8. User selects preferred language (English or Bahasa Indonesia)
9. User clicks "Generate Cover Letter"
10. System extracts text from job poster image using AI
11. System extracts text from CV file
12. System determines generation mode based on input quality
13. System generates cover letter using AI with selected template
14. System streams the generated content to user interface
15. System displays formatted cover letter with template styling

**Alternative Flows:**

- 4a. Image quality is poor: System shows warning indicator but continues with generation
- 5a. CV quality is limited: System shows warning indicator but continues with generation
- 7a. Input quality is low: System displays adaptive content banner with quality tips
- 10a. Image text extraction fails: System returns error message
- 11a. CV text extraction fails: System returns error message

**Postconditions:**

- Cover letter is generated with selected template styling
- User can view, copy, download, or switch templates
- Quality feedback is provided to user

### UC4: Generate Cover Letter from Job Link

**Actor:** Job Seeker  
**Description:** User provides a URL to a job posting and their CV to generate a personalized cover letter using their selected template.

**Preconditions:**

- User has selected a cover letter template
- User has access to the web application
- User has a valid job posting URL
- User has a CV file (PDF or DOCX format)

**Main Flow:**

1. User navigates to generation form with selected template
2. User selects "Link" as job information source
3. User enters job posting URL
4. System validates URL format and displays validation status
5. System detects job source and shows quality indicator
6. User uploads CV file (PDF or DOCX)
7. System validates CV file and displays quality indicator
8. System analyzes input quality and shows quality assessment
9. User selects preferred language (English or Bahasa Indonesia)
10. User clicks "Generate Cover Letter"
11. System extracts job information from URL using web scraping/AI
12. System extracts text from CV file
13. System determines generation mode based on input quality
14. System generates cover letter using AI with selected template
15. System streams the generated content to user interface
16. System displays formatted cover letter with template styling

**Alternative Flows:**

- 4a. URL is invalid: System displays error and prompts for valid URL
- 5a. Job source is unrecognized: System warns user but continues
- 8a. Input quality is low: System displays adaptive content banner with quality tips
- 11a. Web content extraction fails: System returns error message

**Postconditions:**

- Cover letter is generated with selected template styling
- User can view, copy, download, or switch templates
- Quality feedback is provided to user

### UC5: Switch Cover Letter Template

**Actor:** Job Seeker  
**Description:** User switches to a different template while preserving the existing cover letter content.

**Preconditions:**

- Cover letter has been successfully generated
- User is viewing the generated cover letter
- Multiple templates are available

**Main Flow:**

1. User clicks "Switch Template" button on result page
2. System opens template switching dialog
3. System displays available alternative templates
4. User previews different template styles
5. User selects new template
6. System applies new template formatting to existing content
7. System updates the display with new template styling
8. System shows success notification

**Alternative Flows:**

- 5a. User cancels template switch: System closes dialog without changes
- 6a. Template switching fails: System displays error message

**Postconditions:**

- Cover letter content remains unchanged
- New template styling is applied
- User can continue with other actions (download, copy, etc.)

### UC6: Download Cover Letter

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

### UC6: Download Cover Letter

**Actor:** Job Seeker  
**Description:** User downloads the generated cover letter in their preferred format with the selected template formatting.

**Preconditions:**

- Cover letter has been successfully generated
- User is viewing the generated cover letter
- Template styling has been applied

**Main Flow:**

1. User clicks on "Download" dropdown button
2. System displays format options (PDF, DOCX)
3. User selects preferred format
4. System formats the cover letter content with selected template styling
5. System generates filename based on job title and company
6. System initiates file download with proper formatting
7. System displays success notification

**Alternative Flows:**

- 4a. PDF generation fails: System displays error message
- 4b. DOCX generation fails: System displays error message

**Postconditions:**

- Cover letter file is downloaded with template formatting
- File is properly formatted and ready for professional use

### UC7: Copy Cover Letter to Clipboard

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

### UC8: Preview Generated Cover Letter Template

**Actor:** Job Seeker  
**Description:** User previews how their generated cover letter will look with the current template formatting.

**Preconditions:**

- Cover letter has been successfully generated
- User is viewing the cover letter result

**Main Flow:**

1. User clicks "Preview" button
2. System opens preview dialog
3. System displays cover letter with full template formatting
4. User reviews the styled document layout
5. User can see header, footer, and content formatting
6. User closes preview or proceeds with other actions

**Postconditions:**

- User has viewed the formatted cover letter preview
- User can make informed decisions about downloads or template changes

### UC9: Validate Job Link

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

### UC9: Validate Job Link

**Actor:** Job Seeker  
**Description:** System validates the job posting URL and provides real-time feedback on its quality and compatibility.

**Preconditions:**

- User has entered a job posting URL
- User has selected "Link" as job information source

**Main Flow:**

1. User enters job posting URL
2. System validates URL format in real-time
3. System attempts to detect job posting source
4. System checks if URL points to a known job site
5. System displays validation status with visual indicators
6. System provides feedback on extraction quality potential

**Alternative Flows:**

- 2a. Invalid URL format: System displays format error with red indicator
- 4a. Unknown job site: System warns about potential extraction issues with yellow indicator
- 4b. Known job site: System shows positive validation with green indicator

**Postconditions:**

- URL validation status is displayed with visual feedback
- User receives real-time feedback on link quality

### UC10: Assess Input Quality

**Actor:** System (Internal)  
**Description:** System automatically assesses the quality of user inputs and provides visual feedback to optimize cover letter generation.

**Preconditions:**

- User has provided job information (image or link)
- User has uploaded CV file

**Main Flow:**

1. System analyzes job information quality in real-time
2. System analyzes CV file quality upon upload
3. System determines content relevance between job and CV
4. System displays quality indicators with color-coded feedback
5. System selects appropriate generation mode
6. System shows adaptive content banner with quality tips if needed

**Generation Modes:**

- **Standard Mode:** Both inputs are of good quality (green indicators)
- **Job-Focused Mode:** CV has limited information (yellow CV indicator)
- **CV-Focused Mode:** Job information has limited details (yellow job indicator)
- **Generic Mode:** Both inputs have quality issues (red indicators)

**Postconditions:**

- Input quality assessment is complete with visual feedback
- Appropriate generation strategy is selected
- User receives guidance for improving input quality

### UC11: Stream Generated Content

**Actor:** System (Internal)  
**Description:** System streams the AI-generated cover letter content in real-time with template formatting applied.

**Preconditions:**

- Cover letter generation process has started
- Template has been selected
- User is waiting for results

**Main Flow:**

1. System initiates AI content generation with template context
2. System receives content chunks from AI service
3. System applies template formatting to content
4. System streams formatted content to user interface
5. System displays typing indicator and progress
6. System completes content delivery with full template styling

**Postconditions:**

- Complete cover letter is displayed with template formatting
- User can interact with the generated content
- Template-specific styling is properly applied

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

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Updated: June 23, 2025 - Reflects current implementation with visual template system, template previews, content-preserving template switching, and enhanced user experience features_
