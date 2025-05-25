/**
 * Utility functions for document generation
 */
import { isKnownJobSite } from './link-validation';

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
    
    return defaultName;  } catch (error) {
    console.error("Error generating filename:", error);
    return defaultName;
  }
}

/**
 * Format a date for display
 * @returns Formatted date string
 */
export function formatDate(): string {
  const date = new Date();
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Detect the job source based on the URL
 * @param url The job posting URL
 * @returns The detected source name or "Unknown"
 */
export function detectJobSource(url: string): string {
  if (!url) return "Unknown";
  
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    
    if (hostname.includes('linkedin')) return 'LinkedIn';
    if (hostname.includes('indeed')) return 'Indeed';
    if (hostname.includes('jobstreet')) return 'JobStreet';
    if (hostname.includes('glassdoor')) return 'Glassdoor';
    if (hostname.includes('monster')) return 'Monster';
    if (hostname.includes('ziprecruiter')) return 'ZipRecruiter';

    return "Unknown";
  } catch (error) {
    return "Unknown";
  }
}

/**
 * Assesses the quality of job information input
 * @param type The type of job input (image or link)
 * @param jobData The job data (image or link)
 * @returns Quality assessment status
 */
export function assessJobInputQuality(
  type: "image" | "link",
  jobData: string | null | File
): "unknown" | "good" | "limited" | "poor" {
  if (!jobData) return "poor";
  
  if (type === "image") {
    // For image input, check the size as a proxy for quality
    if (jobData instanceof File) {
      if (jobData.size < 30000) return "poor"; // Very small file, likely low quality
      if (jobData.size < 100000) return "limited"; // Smaller file, might be limited
      return "good"; // Reasonable size
    } else if (typeof jobData === "string") {
      // For base64 image preview
      const estimatedSize = jobData.length * 0.75;
      if (estimatedSize < 30000) return "poor";
      if (estimatedSize < 100000) return "limited";
      return "good";
    }
  } else if (type === "link") {
    // For link input, check if it's a known job site or likely job posting
    if (typeof jobData === "string") {
      if (!jobData.trim()) return "poor";
      if (isKnownJobSite(jobData)) return "good";
      if (jobData.toLowerCase().includes("job") || 
          jobData.toLowerCase().includes("career")) {
        return "limited";
      }
      return "limited"; // Unknown but might work
    }
  }
  
  return "unknown";
}

/**
 * Assesses the quality of CV/resume input
 * @param cvFile The CV file
 * @returns Quality assessment status
 */
export function assessCvInputQuality(cvFile: File | null): "unknown" | "good" | "limited" | "poor" {
  if (!cvFile) return "poor";
  
  // Check file size as a proxy for content
  if (cvFile.size < 10000) return "poor"; // Very small file, likely not enough info
  if (cvFile.size < 50000) return "limited"; // Smaller file, might be limited
  return "good"; // Reasonable size
}

/**
 * Gets the appropriate tooltip message based on input quality
 * @param type The input type (job or cv)
 * @param quality The quality assessment
 * @returns Tooltip message
 */
export function getQualityTooltipMessage(
  type: "job" | "cv",
  quality: "unknown" | "good" | "limited" | "poor"
): string {
  if (type === "job") {
    switch (quality) {
      case "good":
        return "Job information appears complete";
      case "limited":
        return "Job information may be limited - we'll fill in any gaps";
      case "poor":
        return "Minimal job information - cover letter will use generic content";
      default:
        return "Job input quality unknown";
    }
  } else {
    switch (quality) {
      case "good":
        return "CV/Resume information appears complete";
      case "limited":
        return "CV/Resume may have limited information - we'll adapt accordingly";
      case "poor":
        return "Minimal CV information - cover letter will use generic professional qualities";
      default:
        return "CV input quality unknown";
    }
  }
}