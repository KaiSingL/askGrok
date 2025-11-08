// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'askGrok') {
    console.log('Background: Received query:', message.query.substring(0, 50) + '...');
    openGrokTabAndInject(message.query);
  }
  sendResponse({ status: 'received' });
  return true; // Keep message channel open for async response
});

// Open new Grok tab and inject query
function openGrokTabAndInject(fullText) {
  // Create new active tab
  chrome.tabs.create({ url: 'https://grok.com/', active: true }, (newTab) => {
    console.log('Background: Created new active tab:', newTab.id);
    
    // Wait for load complete, then inject
    const loadListener = (updatedTabId, changeInfo) => {
      if (updatedTabId === newTab.id && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(loadListener);
        console.log('Background: Tab loaded, injecting...');
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
        console.log('Grok Page: Injecting:', text.substring(0, 50) + '...');
        
        // Robust selectors for input
        let input = document.querySelector('div[contenteditable="true"], textarea, input[type="text"], .prompt-textarea, [placeholder*="Ask"], [role="textbox"]');
        if (!input) {
          const container = document.querySelector('div.flex.gap-1\\.5.absolute.inset-x-0.bottom-0');
          if (container) {
            input = container.querySelector('div[contenteditable], textarea, input');
          }
        }
        if (!input) {
          console.error('Grok Page: Input not found - DOM may have changed');
          return;
        }
        console.log('Grok Page: Found input:', input.tagName);
        
        // Set text
        if (input.tagName === 'DIV' || input.contentEditable === 'true') {
          input.textContent = text;
          input.innerHTML = text.replace(/\n/g, '<br>');
        } else {
          input.value = text;
        }
        console.log('Grok Page: Text set');
        
        input.focus();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Simulate Enter after delay
        setTimeout(() => {
          const enterDown = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true });
          input.dispatchEvent(enterDown);
          const enterUp = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true });
          input.dispatchEvent(enterUp);
          console.log('Grok Page: Enter simulated');
        }, 500);
      },
      args: [fullText]
    });
  }, 2000);  // Wait for stability
}