# Portfolio Components

This directory contains the refactored Portfolio components using React Context and clean code principles.

## Architecture Overview

The Portfolio components have been refactored to use a clean, context-based architecture with the following structure:

### Context Layer

- **`context/PortfolioContext.tsx`** - Central state management using React Context
  - Manages all portfolio state (files, edit mode, selected file, etc.)
  - Provides all business logic and handlers
  - Handles API calls and notifications
  - **File Management**: Tracks new uploads, existing files, and removed files

### Utility Layer

- **`utils/fileUtils.ts`** - Pure utility functions for file operations
  - File type detection
  - File URL generation
  - Download link creation
  - File mapping utilities
  - **File Categorization**: Distinguishes between new, existing, and modified files

### Component Layer

- **`components/PortfolioContentContainer.tsx`** - Main container component
- **`components/PortfolioHeader.tsx`** - Header section
- **`components/PortfolioForm.tsx`** - Form section with URL inputs
- **`components/FileUpload.tsx`** - File upload functionality
- **`components/FileList.tsx`** - File list display
- **`components/FileItem.tsx`** - Individual file item
- **`components/FilePreview.tsx`** - File preview modal
- **`components/UploadContent.tsx`** - Upload area content
- **`components/FileDebugInfo.tsx`** - Debug information (for development)

## File Handling Mechanism

The system handles three types of files:

### 1. New Uploaded Files (`originFileObj` exists, no `url`)

- Files that users upload via the upload component
- Stored in `certificationFiles` or `experienceFiles` arrays
- Sent to backend as `File` objects in FormData

### 2. Existing Files (`url` exists, no `originFileObj`)

- Files that already exist on the backend
- Loaded from `getPortfolio.certificateFiles` or `getPortfolio.experienceFiles`
- Not sent to backend (already exist)

### 3. Removed Files

- Existing files that users delete
- Tracked in `removedCertificationFiles` or `removedExperienceFiles` arrays
- Sent to backend as JSON strings for deletion

### API Request Structure

When submitting the form, the system sends:

```typescript
const data = new FormData();
data.append('linkedInUrl', values.linkedInUrl || '');
data.append('githubUrl', values.githubUrl || '');

// New files to upload
newCertificationFiles.forEach((file) => data.append('certificateFiles', file));
newExperienceFiles.forEach((file) => data.append('experienceFiles', file));

// Files to delete (existing file URLs)
if (removedCertificationFiles.length > 0) {
  data.append('removedCertificateFiles', JSON.stringify(removedCertificationFiles));
}
if (removedExperienceFiles.length > 0) {
  data.append('removedExperienceFiles', JSON.stringify(removedExperienceFiles));
}
```

## Key Benefits

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused and tested
3. **Maintainability**: Clean code structure makes it easy to modify and extend
4. **State Management**: Centralized state management with React Context
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **File Management**: Proper handling of file uploads, deletions, and existing files

## Usage

```tsx
import PortfolioContent from './PortfolioContent';

<PortfolioContent
  edit={false}
  portfolio={portfolioData}
  onSave={handleSave}
  onCancel={handleCancel}
/>;
```

## File Structure

```
Portfolio/
├── context/
│   └── PortfolioContext.tsx
├── utils/
│   └── fileUtils.ts
├── components/
│   ├── index.ts
│   ├── PortfolioContentContainer.tsx
│   ├── PortfolioHeader.tsx
│   ├── PortfolioForm.tsx
│   ├── FileUpload.tsx
│   ├── FileList.tsx
│   ├── FileItem.tsx
│   ├── FilePreview.tsx
│   ├── FileDebugInfo.tsx
│   └── UploadContent.tsx
├── PortfolioContent.tsx
├── PortfolioContent.scss
├── constants.ts
├── PortfolioSchema.ts
└── README.md
```

## Context API

The `PortfolioContext` provides the following:

### State

- `isEdit` - Edit mode state
- `selectedFile` - Currently selected file for preview
- `certificationFiles` - Array of certification files (new + existing)
- `experienceFiles` - Array of experience files (new + existing)
- `removedCertificationFiles` - Array of removed certification file URLs
- `removedExperienceFiles` - Array of removed experience file URLs
- `isLoading` - Loading state
- `isOfficeLoading` - Office file loading state
- `docxError` - DOCX preview error state

### Actions

- File operations (remove, preview, download, upload)
- Form operations (submit, cancel, edit toggle)
- State setters for all state properties

### Data

- Portfolio data from API
- Translation function
- Form instance

## Utility Functions

The `fileUtils.ts` provides pure functions for:

- File type detection (image, PDF, DOCX)
- File URL generation
- Download link creation
- File name processing
- Office preview URL generation
- **File categorization** (new, existing, modified)
- **File preparation for upload**
- **Existing file URL extraction**

## Development Tools

- **FileDebugInfo**: A debug component that shows file categorization in real-time (only visible in edit mode)
- Can be removed in production by removing the import and usage from `PortfolioForm.tsx`
