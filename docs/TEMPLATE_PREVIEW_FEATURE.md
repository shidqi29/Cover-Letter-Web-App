# Template Preview Feature Documentation

## Overview

The Template Preview feature allows users to visualize how their cover letter will appear in different template styles before downloading. This feature includes both individual template previews and template comparison functionality.

## Components

### 1. TemplatePreview Component

**Location:** `src/components/TemplatePreview.tsx`

**Purpose:** Shows a modal preview of how the cover letter looks in the selected template style.

**Features:**

- Modal dialog with template-specific styling
- Shows preview of first 3 paragraphs
- Template-specific icons and colors
- Professional PDF layout simulation
- Information about full document length

**Props:**

```typescript
interface TemplatePreviewProps {
  content: string;    // Cover letter content
  template: string;   // Template ID (professional/modern/creative)
}
```

### 2. TemplateComparison Component

**Location:** `src/components/TemplateComparison.tsx`

**Purpose:** Comprehensive comparison view showing all three templates side-by-side with interactive selection.

**Features:**

- Grid layout showing all template styles
- Interactive template selection
- Live preview updates
- Current template indicator
- Detailed template descriptions
- Template switching recommendations

**Props:**

```typescript
interface TemplateComparisonProps {
  content: string;         // Cover letter content
  currentTemplate: string; // Currently selected template ID
}
```

## Template Styles

### Professional Template

- **Visual Style:** Traditional business letter format
- **Font:** Times New Roman (serif)
- **Colors:** Black text, gray accents
- **Layout:** Standard margins, date top-right, simple footer
- **Icon:** Shield
- **Use Case:** Conservative industries, formal applications

### Modern Template

- **Visual Style:** Contemporary design with colored header
- **Font:** Arial (sans-serif)
- **Colors:** Blue header (#2980B9), clean typography
- **Layout:** Blue header bar, structured sections, accent footer
- **Icon:** Zap (lightning)
- **Use Case:** Tech companies, startups, modern workplaces

### Creative Template

- **Visual Style:** Artistic design with unique elements
- **Font:** Arial with varied styling
- **Colors:** Purple accents (#9B59B6), decorative elements
- **Layout:** Circular decorative elements, creative positioning
- **Icon:** Palette
- **Use Case:** Design agencies, creative roles, innovative companies

## Implementation Details

### Preview Generation

Each template preview shows:

- Truncated content (first 2-3 paragraphs)
- Template-specific styling and colors
- Proper typography and spacing
- Header and footer elements
- Date formatting

### User Experience Flow

1. User generates cover letter with selected template
2. On result page, user sees:
   - Template info banner with current selection
   - "Compare Templates" button for full comparison
   - Enhanced download button with template indicators
3. Template comparison modal allows:
   - Side-by-side preview of all templates
   - Interactive selection of different styles
   - Detailed view of selected template
4. Download button generates PDF/DOCX in selected template style

### Technical Features

- **Responsive Design:** Works on desktop and mobile
- **Accessibility:** Proper ARIA labels and keyboard navigation
- **Performance:** Lightweight previews, lazy loading
- **State Management:** Proper React state handling
- **Error Handling:** Graceful degradation if content is missing

## Usage in Application

### Result Page Integration

```tsx
import TemplateComparison from "@/components/TemplateComparison";

// In result page
<TemplateComparison
  content={coverLetter}
  currentTemplate={searchParams.get("template") || "professional"}
/>
```

### Download Button Enhancement

The download button now shows:

- Template-specific icons and colors
- Template name and description in dropdown
- Enhanced visual feedback during download

## Benefits

### For Users

- **Visual Confidence:** See exactly how their document will look
- **Template Flexibility:** Easy comparison and switching
- **Professional Assurance:** Preview ensures formatting meets expectations
- **Decision Support:** Helps choose the right template for their industry

### For Developers

- **Modular Design:** Reusable components
- **Scalable Architecture:** Easy to add new templates
- **Consistent Styling:** Centralized template definitions
- **Maintainable Code:** Clear separation of concerns

## Future Enhancements

- **Custom Template Builder:** Allow users to create custom templates
- **Industry-Specific Templates:** Templates tailored for specific industries
- **Real-time Editing:** Edit content directly in preview mode
- **Template Recommendations:** AI-suggested templates based on job type
- **Export Options:** Additional format support (HTML, plain text)

## Dependencies

- **@radix-ui/react-dialog:** Modal dialog functionality
- **class-variance-authority:** Component variant styling
- **lucide-react:** Icons
- **tailwindcss:** Styling and responsive design

## Browser Support

- **Modern Browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile:** iOS Safari, Chrome Mobile
- **Features:** CSS Grid, Flexbox, Modern JavaScript
