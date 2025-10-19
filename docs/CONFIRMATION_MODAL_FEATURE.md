# Confirmation Modal for Limited Input Quality

## Overview

This feature adds a confirmation modal dialog that appears when users attempt to generate a cover letter with limited input quality. The modal warns users about potential quality issues and gives them the option to continue or go back to improve their inputs.

## Implementation Details

### When the Modal Appears

The confirmation modal is triggered when the user clicks the "Buat Cover Letter" button and **at least one** of the following conditions is met:

- Job information quality is assessed as "limited"
- CV/Resume quality is assessed as "limited"

### User Experience Flow

1. User fills in the form with job information and CV
2. System automatically assesses input quality in real-time
3. User clicks "Buat Cover Letter" button
4. If input quality is "limited", modal appears with:
   - Warning icon and title
   - Specific information about which inputs are limited
   - Explanation of the impact on cover letter quality
   - Two action buttons:
     - **"Kembali & Perbaiki"** (Go Back & Fix) - Cancels submission
     - **"Lanjutkan Tetap"** (Continue Anyway) - Proceeds with generation

### Technical Implementation

#### State Management

```typescript
const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
const [pendingSubmit, setPendingSubmit] = useState<boolean>(false);
```

#### Modified handleSubmit Function

The submit handler now includes:

1. Quality check before processing
2. Modal trigger for limited inputs
3. Pending submit flag to handle confirmation flow

#### Modal Component

Uses the existing Dialog component from `@/components/ui/dialog` with:

- Responsive design (mobile-friendly)
- Clear visual indicators (icons, color-coded warnings)
- Detailed explanations for each limited input type
- Accessible keyboard navigation

### Visual Design

- **Warning Color**: Amber/yellow theme for "limited" quality indicators
- **Info Sections**: Blue-themed boxes explaining the adaptive generation
- **Icons**:
  - AlertTriangle for modal title
  - Info icons for each warning section
- **Responsive Layout**: Mobile-first design with proper spacing

### User Benefits

1. **Transparency**: Users are informed about potential quality issues
2. **Choice**: Users can decide whether to proceed or improve inputs
3. **Guidance**: Clear explanation of what "limited" means and its impact
4. **Confidence**: Reassurance that the system will still generate a cover letter

### Code Files Modified

- `src/components/CoverLetterForm.tsx`: Main form component with modal logic

### Dependencies

- `@radix-ui/react-dialog`: Dialog primitive component
- `lucide-react`: Icons (AlertTriangle, Info)
- Existing UI components from shadcn/ui

## Future Enhancements

Potential improvements for future versions:

1. Add recommendations for improving input quality
2. Show examples of good vs. limited inputs
3. Add a "Don't show again" option for experienced users
4. Track user choices for analytics
5. Add more granular quality indicators (poor, limited, good, excellent)

## Testing Scenarios

To test the feature:

1. Upload a small/low-quality job image (< 50KB) → Modal should appear
2. Upload a small CV file (< 10KB) → Modal should appear
3. Use an unknown job site link → Modal should appear
4. Upload good quality inputs → Modal should NOT appear
5. Test both action buttons (cancel and continue)
6. Verify responsive design on mobile and desktop

## Related Files

- Input quality assessment: `src/lib/document-utils.ts`
- Quality indicator component: `src/components/InputQualityIndicator.tsx`
- Dialog UI component: `src/components/ui/dialog.tsx`
