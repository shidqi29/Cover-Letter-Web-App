/**
 * Utility functions for document generation
 */

/**
 * Generates a filename for a cover letter based on its content
 * @param content The cover letter content
 * @returns A suggested filename based on job title and company if found, or a default name
 */
export function generateCoverLetterFilename(content: string): string {
  // Default filename with date
  const defaultName = `cover-letter-${new Date().toISOString().split('T')[0]}`;
  
  if (!content) return defaultName;
  
  try {
    // Try to extract company name
    let companyName = '';
    let jobTitle = '';
    
    // Common patterns to look for company name
    const companyPatterns = [
      /(?:at|for|join)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\.|,|\s+as|\s+in)/i,
      /(?:interest\s+in|applying\s+to)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\.|,|\s+as|\s+in)/i,
      /position\s+(?:at|with)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\.|,|\s+as|\s+in)/i,
      /Dear\s+([^,\n]+)/i // From salutation
    ];
    
    // Common patterns to look for job title
    const jobPatterns = [
      /(?:position\s+of|role\s+of|as\s+(?:an?|the))\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s+at|\s+with|\s+in|\.)/i,
      /(?:applying\s+for\s+the|interested\s+in\s+the)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s+at|\s+with|\s+in|\.)/i,
      /(?:the|your)\s+([A-Z][A-Za-z0-9\s&]+?)\s+(?:position|opening|role|opportunity)/i
    ];
    
    // Try each pattern until we find a match
    for (const pattern of companyPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        companyName = match[1].trim();
        break;
      }
    }
    
    for (const pattern of jobPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        jobTitle = match[1].trim();
        break;
      }
    }
    
    // Clean up extracted text
    companyName = companyName.replace(/[^\w\s-]/g, '').trim();
    jobTitle = jobTitle.replace(/[^\w\s-]/g, '').trim();
    
    // Create filename based on what we found
    if (jobTitle && companyName) {
      return `cover-letter-${jobTitle.toLowerCase().replace(/\s+/g, '-')}-${companyName.toLowerCase().replace(/\s+/g, '-')}`;
    } else if (companyName) {
      return `cover-letter-${companyName.toLowerCase().replace(/\s+/g, '-')}`;
    } else if (jobTitle) {
      return `cover-letter-${jobTitle.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    return defaultName;
  } catch (error) {
    console.error("Error generating filename:", error);
    return defaultName;
  }
}