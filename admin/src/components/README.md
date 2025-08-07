# Custom Media Library for Jodit Editor

This directory contains a custom media library implementation for the Jodit Editor plugin, designed to replace the problematic `strapi-plugin-media-extended` dependency.

## Problem Solved

The original implementation used `strapi-plugin-media-extended` which caused the following error in Strapi v5:

```
React Router caught the following error during render Error: No QueryClient set, use QueryClientProvider to set one
```

This error occurred because the external plugin was trying to use React Query hooks without the proper QueryClient context being available.

## Solution

Instead of relying on external plugins, we created a custom `MediaLibraryModal` component that:

1. **Uses Strapi's native API**: Directly calls `/upload/files` endpoint using `useFetchClient`
2. **Integrates with Strapi's Design System**: Uses official Strapi components for consistent UI
3. **Supports all media types**: Images, videos, audio files, and documents
4. **Provides search and pagination**: Built-in search functionality with paginated results
5. **No external dependencies**: Eliminates the QueryClient conflict

## Files

- `MediaLibraryModal.tsx` - Custom media library modal component
- `JoditInput.tsx` - Updated to use the custom media library

## Features

### Media Library Modal
- **Search**: Filter files by name
- **Pagination**: Navigate through large media collections
- **Multiple selection**: Select multiple files at once
- **Media previews**: Visual previews for images and videos
- **File information**: Display file size, dimensions, and type
- **Responsive grid**: Clean, responsive layout

### Integration with Jodit Editor
- **Custom toolbar button**: Adds "Strapi Media Library" button to toolbar
- **Seamless insertion**: Selected media is automatically inserted at cursor position
- **WebP support**: Maintains existing WebP conversion functionality
- **Drag & drop**: Still supports drag and drop file uploads
- **Paste support**: Still supports pasting images from clipboard

## Usage

The media library button will appear in the Jodit editor toolbar (if configured). Clicking it opens the custom media library modal where users can:

1. Browse existing media files
2. Search for specific files
3. Select single or multiple files
4. Insert selected media into the editor

## Configuration

The media library behavior can be configured through the Jodit editor field options:

```json
{
  "buttons": "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,classSpan,spellcheck,cut,copy,paste,selectall,copyformat,hr,table,link,unlink,image,video,file,strapiMedia,preview,print,about,fullsize",
  "removeButtons": "",
  "toolbar": true
}
```

The `strapiMedia` button triggers the custom media library.

## Benefits

1. **No dependency conflicts**: Eliminates React Query version conflicts
2. **Full control**: Complete control over UI and functionality
3. **Strapi native**: Uses official Strapi APIs and components
4. **Better performance**: Direct API calls without extra abstraction layers
5. **Maintainable**: Easier to maintain and customize as needed
