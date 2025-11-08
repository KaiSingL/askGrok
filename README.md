# Quick Grok Browser Extension

A Chrome browser extension that lets you select text on any webpage and quickly ask Grok about it with an optional prompt.

## Features

- **Text Selection**: Select any text on any webpage
- **Quick Access**: Click the "Ask Grok" button that appears above your selection
- **Context Enhancement**: Add additional context or questions in the popup
- **Automatic Integration**: Opens Grok.com and automatically injects your query
- **Clean UI**: Modern, responsive interface that works on all websites
- **Dark Mode Support**: Automatically adapts to your system theme

## How to Use

1. **Select Text**: Highlight any text on a webpage
2. **Click "Ask Grok"**: A button will appear above your selection
3. **Add Context** (Optional): Use the popup to add more context or specific questions
4. **Submit**: Click the submit button or press Enter to send to Grok
5. **View Result**: A new Grok tab will open with your query ready to be answered

## Installation

### Development Mode (Recommended)

1. **Download the Extension**
   - Download all extension files to a local directory
   - Ensure you have all required files: `manifest.json`, `background.js`, `content.js`, and icon files

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/` in your Chrome browser
   - Or go to Chrome Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the directory containing the extension files
   - The "Quick Grok" extension should now appear in your extensions list

5. **Pin the Extension** (Optional)
   - Click the extensions puzzle piece icon in your Chrome toolbar
   - Pin "Quick Grok" for easy access

## Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension manifest format
- **Service Worker**: Background script handles tab management and injection
- **Content Script**: Injects UI elements and handles user interactions
- **Content Scripts**: Runs on all websites with proper permissions

### File Structure

```
quick-grok-extension/
├── manifest.json          # Extension manifest and configuration
├── background.js          # Service worker for tab management
├── content.js             # Content script for UI and interactions
├── icon16.png             # 16x16 extension icon
├── icon48.png             # 48x48 extension icon
├── icon128.png            # 128x128 extension icon
└── README.md              # This file
```

### Permissions

The extension requires the following permissions:

- `tabs`: To create new tabs and interact with them
- `scripting`: To inject scripts into the Grok website
- `host_permissions`: `https://grok.com/*` to access and interact with Grok

### How It Works

1. **Text Selection Detection**: The content script monitors for text selection on any webpage
2. **UI Injection**: When text is selected, a "Ask Grok" button appears positioned above the selection
3. **Popup Interface**: Clicking the button opens a popup with the selected text and an input field for additional context
4. **Background Processing**: The content script sends the query to the background service worker
5. **Tab Management**: The background script creates a new Grok tab and waits for it to load
6. **Text Injection**: Once loaded, the extension automatically injects the selected text and any additional context into Grok's input field
7. **Auto-submit**: The extension simulates pressing Enter to automatically submit the query

## Development

### Local Development

1. **Make Changes**: Edit the source files as needed
2. **Reload Extension**: Go to `chrome://extensions/` and click the refresh icon for "Quick Grok"
3. **Test**: Visit a webpage and test the extension functionality

### Build Process

This extension requires no build process - it's a pure JavaScript extension using modern web standards.

### Debugging

- **Extension Errors**: Check `chrome://extensions/` → "Quick Grok" → "Details" → "Inspect views: service worker"
- **Content Script**: Right-click on any webpage → "Inspect" → Console tab
- **Background Script**: Check the service worker console for error messages

## Browser Compatibility

- **Chrome**: Fully supported (Manifest V3)
- **Microsoft Edge**: Compatible (Chromium-based)
- **Other Chromium Browsers**: Should work with minor adjustments

*Note: This extension uses Manifest V3 which is only available in modern Chromium-based browsers.*

## Privacy & Security

- **No Data Collection**: The extension does not collect, store, or transmit any personal data
- **Local Operation**: All processing happens locally in your browser
- **Secure Permissions**: Only requests minimum necessary permissions
- **No External Servers**: All communication is directly with grok.com

## Troubleshooting

### Button Not Appearing
- Ensure text is actually selected (highlighted)
- Try refreshing the webpage
- Check that the extension is enabled in `chrome://extensions/`

### Text Not Injecting
- Ensure you're logged into grok.com
- Check if grok.com has changed their interface (the extension targets common selectors)
- Try manually reloading the extension

### Extension Not Working
- Check the extension's background script console for errors
- Ensure all required files are present
- Try reloading the extension in developer mode

## License

This project is open source. Please check the repository for specific license details.



---

**Version**: 1.0  
**Last Updated**: November 2025