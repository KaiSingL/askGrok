// Debug logging utility
const debug = false;
function debugLog(...args) {
  if (debug) {
    console.log('[Quick Grok Debug]', ...args);
  }
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'askGrok') {
    debugLog('Background: Received query:', message.query.substring(0, 50) + '...');
    openGrokTabWithQuery(message.query);
  }
  sendResponse({ status: 'received' });
  return true; // Keep message channel open for async response
});

// Open new Grok tab with pre-filled query via URL parameter
function openGrokTabWithQuery(fullText) {
  const encodedQuery = encodeURIComponent(fullText);
  const grokUrl = `https://grok.com/?q=${encodedQuery}`;
  
  // Create new active tab with the query URL
  chrome.tabs.create({ url: grokUrl, active: true }, (newTab) => {
    debugLog('Background: Created new active tab with query:', newTab.id);
  });
}