# Jodit Editor Plugin for Strapi v5

A powerful rich text editor plugin for Strapi v5 using the [Jodit Editor](https://xdsoft.net/jodit/docs/index.html) and [React Jodit Editor](https://github.com/jodit/jodit-react). This plugin provides a custom field type that enables content creators to use a full-featured WYSIWYG editor with advanced formatting capabilities and seamless integration with Strapi's media library.

## Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough, superscript, subscript
- **Advanced Typography**: Font family, font size, text brushing, paragraph styling, class spans
- **Lists & Indentation**: Ordered and unordered lists with indent/outdent functionality
- **Text Alignment**: Left, center, right, and justify alignment with line height control
- **Links & Media**: Easy link insertion, image upload, file handling, and video embedding
- **Tables**: Full table creation and editing capabilities
- **Symbols & Special Characters**: Symbol insertion and special character support
- **Code Editing**: Switch between WYSIWYG and source code view
- **Editor Tools**: Copy, cut, paste, format copying, select all functionality
- **History Management**: Full undo/redo functionality
- **Enhanced Features**: Fullscreen mode, print, preview, find & replace, spellcheck
- **Strapi Integration**: Custom `strapiMedia` button for seamless media library integration
- **WebP Support**: Automatic WebP conversion in case you have your own image automatic WebP conversion mechanism
- **Configurable Toolbar**: Completely customizable toolbar with button management
- **Custom Fonts**: Support for custom font configurations
- **Multilingual**: Built-in translation support

## Installation

This plugin is already installed and configured in your Strapi application. It's located in `src/plugins/jodit-editor`.

To build the plugin:
```bash
npm install strapi-plugin-jodit-editor
```

To enable the plugin, add the following configuration to your `config/plugins.ts` file:
```bash
export default ({ env }) => ({
  ...,
  'jodit-editor': {
    enabled: true
  }
});
```

## Custom Development Locally

To develop or customize the plugin locally within your Strapi project, follow these steps:

1. Clone the plugin repository into your `src/plugins` directory:
  ```bash
  cd src/plugins/
  git clone https://github.com/patiparnne/strapi-plugin-jodit-editor.git
  cd strapi-plugin-jodit-editor
  npm install
  npm run build
  ```

2. Reference the local plugin in your `config/plugins.ts` file:
  ```typescript
  export default ({ env }) => ({
    ...,
    'jodit-editor': {
     enabled: true,
     resolve: 'src/plugins/strapi-plugin-jodit-editor'
    }
  });
  ```

3. Restart your Strapi server to apply changes.

**Note:** When using a local plugin, Strapi's Media Library integration may have limitations. For full compatibility, it is recommended to install the plugin via `node_modules` when deploying to production.

## Usage

### Adding Jodit Editor to Content Types

1. Go to **Content-Type Builder** in your Strapi admin panel
2. Create a new content type
3. Click **Add another field**
4. Select **Custom** from the field types
5. Choose **Jodit Editor** from the available custom fields
6. Configure the field name and advanced options
7. Save your content type

### Configuration Options

The plugin provides comprehensive configuration options in the **Advanced Settings** section:

#### Editor Settings

- **Editor Height (px)**: Set the height of the editor in pixels (default: 400px)
- **Read Only**: Make the editor read-only (default: false)
- **Show Toolbar**: Enable or disable the editor toolbar (default: true)

#### Toolbar Configuration

- **Toolbar Buttons**: Comma-separated list of buttons to include in the toolbar
  - Default includes: source, formatting, lists, alignment, media, tables, and utilities
- **Remove Buttons**: Comma-separated list of buttons to remove from the toolbar
  - Example: `source,fullsize,print` to remove specific buttons

#### Advanced Options

- **Custom Fonts**: Define available fonts (one per line)
  - Example: `Arial, Helvetica, sans-serif`
- **WebP Conversion Settings**: Configure automatic WebP image conversion for pasted or dragged media. Since Strapi Media Library returns the original file type, enabling this option helps ensure images are converted to WebP format as needed.
  - Example: `image/jpeg,image/png`

### Default Toolbar Buttons

The plugin includes a comprehensive set of toolbar buttons:

```
source, bold, italic, underline, strikethrough, superscript, subscript, eraser, 
font, fontsize, brush, paragraph, classSpan, ul, ol, indent, outdent, 
left, center, right, justify, link, unlink, strapiMedia, image, file, video, 
table, hr, symbols, lineHeight, copy, cut, paste, copyformat, selectall, 
undo, redo, fullsize, print, preview, find, spellcheck, about
```

### Strapi Media Library Integration

The plugin includes a special `strapiMedia` button that provides seamless integration with Strapi's media library, allowing users to:
- Browse and select existing media files
- Upload new files directly through the editor
- Maintain proper authentication and authorization

## Technical Details

### Plugin Structure

- **Plugin ID**: `jodit-editor`
- **Custom Field Type**: `richtext`
- **Built with**: TypeScript, React, Strapi Design System
- **Dependencies**: `jodit-react` v5.2.19

### Dependencies

- **Core**: `jodit-react` - React wrapper for Jodit editor
- **UI**: `@strapi/design-system`, `@strapi/icons` - Strapi's design system
- **Internationalization**: `react-intl` - Translation support

## Troubleshoots

If you encounter errors such as `undefined 'media-library'` or `No QueryClient set, use QueryClientProvider to set one`, try removing your `node_modules` directory and reinstalling dependencies:

```bash
rm -rf node_modules
npm install
```
If you encounter issues, feel free to open a GitHub issue. Please note that fixes may be delayed, especially after major Strapi updates, as changes can be frequent. However, you are always welcome to apply local fixes as needed.


## Author

Created by **Patiparnne Vongchompue**

## Repository

- **GitHub**: [strapi-plugin-jodit-editor](https://github.com/patiparnne/strapi-plugin-jodit-editor)
- **Issues**: [GitHub Issues](https://github.com/patiparnne/strapi-plugin-jodit-editor/issues)

## License

MIT License

## Credits

- **Jodit Editor**: Built on top of the powerful [Jodit Editor](https://xdsoft.net/jodit/docs/index.html) by XDSoft
- **React Integration**: Uses [jodit-react](https://github.com/jodit/jodit-react) for seamless React integration
- **Strapi Framework**: Designed specifically for Strapi v5 with full design system integration
