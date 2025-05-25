/**
 * Enhanced job link validation utilities
 */

/**
 * Validate and enhance job link URLs
 * @param url The URL to validate
 * @returns Object with validation results
 */
export async function validateJobLink(url: string): Promise<{
  isValid: boolean;
  normalizedUrl: string;
  isLikelyJobPosting: boolean;
  qualityScore: number;
  potentialIssues: string[];
}> {
  // Basic URL validation
  const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?].*)?$/;
  let isValid = urlPattern.test(url);
  
  // If the link doesn't start with http/https, add it and try validation again
  let normalizedUrl = url;
  if (!isValid && !url.startsWith('http')) {
    normalizedUrl = `https://${url}`;
    isValid = urlPattern.test(normalizedUrl);
  }
  
  if (!isValid) {
    return { 
      isValid: false, 
      normalizedUrl: url, 
      isLikelyJobPosting: false,
      qualityScore: 0,
      potentialIssues: ['Invalid URL format']
    };
  }
  
  // Initialize potential issues array
  const potentialIssues: string[] = [];
  
  // Verify if it's likely a job posting URL based on common patterns
  const jobKeywords = ['job', 'career', 'position', 'opening', 'vacancy', 'apply', 'employment', 'work'];
  const hasJobKeyword = jobKeywords.some(keyword => 
    normalizedUrl.toLowerCase().includes(keyword)
  );
  
  // Check if it's a known job site
  const isKnownSite = isKnownJobSite(normalizedUrl);
  
  // Calculate a quality score (0-100)
  let qualityScore = 0;
  
  // Base score just for being a valid URL
  qualityScore += 20;
  
  // Bonus points for being a known job site
  if (isKnownSite) {
    qualityScore += 40;
  } else {
    potentialIssues.push('URL is not from a known job posting site');
  }
  
  // Bonus points for having job-related keywords in URL
  if (hasJobKeyword) {
    qualityScore += 20;
  } else {
    potentialIssues.push('URL does not contain job-related keywords');
  }
  
  // Bonus points for likely path structure
  try {
    const urlObj = new URL(normalizedUrl);
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    
    // Check if path structure suggests job listing
    if (pathSegments.length > 1) {
      qualityScore += 10;
    }
    
    // Check if URL has query parameters which might indicate a job listing
    if (urlObj.search && urlObj.search.length > 1) {
      qualityScore += 10;
    }
    
    // If path is too short or homepage-like
    if (pathSegments.length <= 1 && urlObj.search.length <= 1) {
      potentialIssues.push('URL appears to be a homepage or generic page rather than a specific job posting');
    }
  } catch (err) {
    // URL parsing failed
  }
  
  // Cap score at 100
  qualityScore = Math.min(100, qualityScore);
  
  return { 
    isValid, 
    normalizedUrl, 
    isLikelyJobPosting: hasJobKeyword || isKnownSite,
    qualityScore,
    potentialIssues
  };
}

/**
 * Check if a URL is a job aggregator site
 * @param url The URL to check
 * @returns Boolean indicating if it's a known job site
 */
export function isKnownJobSite(url: string): boolean {
  const jobSites = [
    'linkedin.com/jobs',
    'indeed.com',
    'monster.com',
    'glassdoor.com',
    'jobstreet.com',
    'careerbuilder.com',
    'simplyhired.com',
    'dice.com',
    'ziprecruiter.com'
  ];
  
  return jobSites.some(site => url.toLowerCase().includes(site));
}

/**
 * Makes a best effort to extract the company name from a job URL
 * @param url The URL to analyze
 * @returns Possible company name or empty string
 */
export function extractCompanyFromUrl(url: string): string {
  try {
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const hostname = parsedUrl.hostname;
    
    // Remove common prefixes and suffixes
    const domain = hostname
      .replace(/^www\./, '')
      .replace(/\.com$|\.org$|\.net$|\.co\..*$|\.io$/, '');
    
    // Split by dots and take the main domain part
    const parts = domain.split('.');
    const mainDomain = parts.length > 0 ? parts[0] : '';
    
    // Capitalize first letter
    return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
  } catch (error) {
    return '';
  }
}
