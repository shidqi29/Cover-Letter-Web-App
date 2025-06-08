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

---

_Document prepared for thesis project using RUP (Rational Unified Process) methodology_  
_Date: June 9, 2025_
