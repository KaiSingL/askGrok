// Inject CSS styles (mimicking Tailwind classes from the demo, scoped to extension elements)
const style = document.createElement('style');
style.textContent = `
  #grok-popup-button {
    display: none;
    position: absolute;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translate(-50%, -50%);
    z-index: 50;
    white-space: nowrap;
    display: flex;
    align-items: center;
    background-color: #fcfcfc;
    color: #000;
    border: 1px solid #e5e7eb;
  }
  #grok-popup-button:not(.hidden) {
    display: flex;
  }
  #grok-popup-button svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    display: inline-block;
    flex-shrink: 0;
  }
  @media (prefers-color-scheme: dark) {
    #grok-popup-button {
      background-color: #151515;
      color: #fff;
      border-color: #374151;
    }
  }
  #grok-card-popup {
    display: none;
    position: absolute;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 1px solid #e5e7eb;
    z-index: 50;
    max-width: 28rem;
    width: 20rem;
    transform: translateX(-50%);
  }
  #grok-card-popup:not(.hidden) {
    display: block;
  }
  @media (prefers-color-scheme: dark) {
    #grok-card-popup {
      background-color: #151515;
      border-color: #374151;
    }
  }
  .grok-quote {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #f9fafb;
    border-radius: 0.375rem;
  }
  @media (prefers-color-scheme: dark) {
    .grok-quote {
      background-color: #374151;
    }
  }
  #grok-selected-quote {
    font-style: italic;
    color: #4b5563;
    font-size: 0.875rem;
  }
  @media (prefers-color-scheme: dark) {
    #grok-selected-quote {
      color: #d1d5db;
    }
  }
  .grok-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  #grok-prompt-input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    font-size: inherit;
  }
  @media (prefers-color-scheme: dark) {
    #grok-prompt-input {
      background-color: #374151;
      border-color: #4b5563;
      color: white;
    }
  }
  #grok-prompt-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  @media (prefers-color-scheme: dark) {
    #grok-prompt-input:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  }
  .grok-submit-container {
    display: flex;
    justify-content: flex-end;
  }
  #grok-submit-button {
    background-color: #151515;
    border: none;
    border-radius: 9999px;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  #grok-submit-button:hover {
    background-color: #1f2937;
  }
  #grok-submit-button svg {
    width: 1.25rem;
    height: 1.25rem;
    color: white;
  }
`;
document.head.appendChild(style);

// Create and append popup button
const popupButton = document.createElement('button');
popupButton.id = 'grok-popup-button';
popupButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0.36 0.5 33.33 32">
    <path d="M13.2371 21.0407L24.3186 12.8506C24.8619 12.4491 25.6384 12.6057 25.8973 13.2294C27.2597 16.5185 26.651 20.4712 23.9403 23.1851C21.2297 25.8989 17.4581 26.4941 14.0108 25.1386L10.2449 26.8843C15.6463 30.5806 22.2053 29.6665 26.304 25.5601C29.5551 22.3051 30.562 17.8683 29.6205 13.8673L29.629 13.8758C28.2637 7.99809 29.9647 5.64871 33.449 0.844576C33.5314 0.730667 33.6139 0.616757 33.6964 0.5L29.1113 5.09055V5.07631L13.2343 21.0436" fill="currentColor"/>
    <path d="M10.9503 23.0313C7.07343 19.3235 7.74185 13.5853 11.0498 10.2763C13.4959 7.82722 17.5036 6.82767 21.0021 8.2971L24.7595 6.55998C24.0826 6.07017 23.215 5.54334 22.2195 5.17313C17.7198 3.31926 12.3326 4.24192 8.67479 7.90126C5.15635 11.4239 4.0499 16.8403 5.94992 21.4622C7.36924 24.9165 5.04257 27.3598 2.69884 29.826C1.86829 30.7002 1.0349 31.5745 0.36364 32.5L10.9474 23.0341" fill="currentColor"/>
  </svg>
  Ask Grok
`;
document.body.appendChild(popupButton);

// Create and append card popup
const cardPopup = document.createElement('div');
cardPopup.id = 'grok-card-popup';
cardPopup.innerHTML = `
  <div class="grok-quote">
    <p id="grok-selected-quote" class="grok-quote-text"></p>
  </div>
  <div class="grok-input-container">
    <textarea id="grok-prompt-input" rows="3" placeholder="Add more context or a question..."></textarea>
    <div class="grok-submit-container">
      <button id="grok-submit-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0.36 0.5 33.33 32">
          <path d="M13.2371 21.0407L24.3186 12.8506C24.8619 12.4491 25.6384 12.6057 25.8973 13.2294C27.2597 16.5185 26.651 20.4712 23.9403 23.1851C21.2297 25.8989 17.4581 26.4941 14.0108 25.1386L10.2449 26.8843C15.6463 30.5806 22.2053 29.6665 26.304 25.5601C29.5551 22.3051 30.562 17.8683 29.6205 13.8673L29.629 13.8758C28.2637 7.99809 29.9647 5.64871 33.449 0.844576C33.5314 0.730667 33.6139 0.616757 33.6964 0.5L29.1113 5.09055V5.07631L13.2343 21.0436" fill="currentColor"/>
          <path d="M10.9503 23.0313C7.07343 19.3235 7.74185 13.5853 11.0498 10.2763C13.4959 7.82722 17.5036 6.82767 21.0021 8.2971L24.7595 6.55998C24.0826 6.07017 23.215 5.54334 22.2195 5.17313C17.7198 3.31926 12.3326 4.24192 8.67479 7.90126C5.15635 11.4239 4.0499 16.8403 5.94992 21.4622C7.36924 24.9165 5.04257 27.3598 2.69884 29.826C1.86829 30.7002 1.0349 31.5745 0.36364 32.5L10.9474 23.0341" fill="currentColor"/>
        </svg>
      </button>
    </div>
  </div>
`;
document.body.appendChild(cardPopup);

// Get elements
const selectedQuote = document.getElementById('grok-selected-quote');
const promptInput = document.getElementById('grok-prompt-input');

// Position button at bottom center of selection
function positionButton() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0 && !selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    popupButton.style.left = (rect.left + rect.width / 2) + 'px';
    popupButton.style.top = (rect.bottom + window.scrollY + 8) + 'px';
    popupButton.style.position = 'absolute';
    popupButton.style.display = 'flex';
  } else {
    popupButton.style.display = 'none';
  }
}

// Handle button click to show card
function handleButtonClick() {
  const selection = window.getSelection().toString().trim();
  if (!selection) {return};
  selectedQuote.textContent = selection;
  const buttonRect = popupButton.getBoundingClientRect();
  cardPopup.style.left = (buttonRect.left + buttonRect.width / 2) + 'px';
  cardPopup.style.top = (buttonRect.bottom + window.scrollY + 8) + 'px';
  cardPopup.style.position = 'absolute';
  cardPopup.classList.remove('hidden');
  popupButton.style.display = 'none';
  window.getSelection().removeAllRanges();
  promptInput.value = '';
  promptInput.focus();
}

// Handle submit (placeholder: log/alert; extend later to send to Grok API via fetch or background script)
function handleSubmit() {
  const quote = selectedQuote.textContent;
  const prompt = promptInput.value.trim();
  console.log('Quote:', quote);
  console.log('Additional prompt:', prompt);
  alert(`Submitting to Grok:\nQuote: "${quote}"\nPrompt: "${prompt || 'None'}"`);
  cardPopup.classList.add('hidden');
  popupButton.classList.remove('hidden');
}

// Event listeners
document.addEventListener('mouseup', positionButton);

document.addEventListener('mousedown', (e) => {
  if (!popupButton.contains(e.target) && !cardPopup.contains(e.target)) {
    popupButton.classList.add('hidden');
    cardPopup.classList.add('hidden');
  }
});

document.addEventListener('scroll', () => {
  popupButton.classList.add('hidden');
  cardPopup.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (!popupButton.contains(e.target) && !cardPopup.contains(e.target)) {
    popupButton.classList.add('hidden');
    cardPopup.classList.add('hidden');
  }
});

// Button event listeners
popupButton.addEventListener('click', handleButtonClick);
document.getElementById('grok-submit-button').addEventListener('click', handleSubmit);

// Enter key to submit in textarea (without Shift)
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
});