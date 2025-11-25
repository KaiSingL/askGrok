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
    openGrokTabAndInject(message.query);
  }
  sendResponse({ status: 'received' });
  return true; // Keep message channel open for async response
});

// Open new Grok tab and inject query
function openGrokTabAndInject(fullText) {
  // Create new active tab
  chrome.tabs.create({ url: 'https://grok.com/', active: true }, (newTab) => {
    debugLog('Background: Created new active tab:', newTab.id);

    // Wait for load complete, then inject
    const loadListener = (updatedTabId, changeInfo) => {
      if (updatedTabId === newTab.id && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(loadListener);
        debugLog('Background: Tab loaded, injecting...');
        injectAndSubmit(newTab.id, fullText);
      }
    };
    chrome.tabs.onUpdated.addListener(loadListener);
  });
}

// Inject query into input and simulate Enter
function injectAndSubmit(tabId, fullText) {
  setTimeout(() => {
    chrome.scripting.executeScript({
      target: { tabId },
      func: (text) => {
        debugLog('Grok Page: Injecting:', text.substring(0, 50) + '...');

        // Robust selectors for input
        let input = document.querySelector('div[contenteditable="true"], textarea, input[type="text"], .prompt-textarea, [placeholder*="Ask"], [role="textbox"]');
        if (!input) {
          const container = document.querySelector('div.flex.gap-1\\.5.absolute.inset-x-0.bottom-0');
          if (container) {
            input = container.querySelector('div[contenteditable], textarea, input');
          }
        }
        if (!input) {
          debugLog('Grok Page: Input not found - DOM may have changed');
          return;
        }
        debugLog('Grok Page: Found input:', input.tagName);

        // Split text into lines and wrap each in <p> tags
        const lines = text.split('\n').map(line => {
          const trimmed = line.trimEnd();
          if (trimmed === '') {
            return '<p><br class="ProseMirror-trailingBreak"></p>';
          } else {
            return `<p>${trimmed}</p>`;
          }
        });
        const htmlContent = lines.join('');

        // Set text
        if (input.tagName === 'DIV' || input.contentEditable === 'true') {
          input.innerHTML = htmlContent;
        } else {
          input.value = text; // Fallback for non-rich inputs
        }
        debugLog('Grok Page: HTML set');

        input.focus();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // Simulate Enter after delay
        setTimeout(() => {
          const enterDown = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true });
          input.dispatchEvent(enterDown);
          const enterUp = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true });
          input.dispatchEvent(enterUp);
          debugLog('Grok Page: Enter simulated');
        }, 500);
      },
      args: [fullText]
    });
  }, 2000);  // Wait for stability
}