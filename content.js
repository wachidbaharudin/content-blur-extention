// WhatsApp Web Blur Extension - Content Script

// Initialize blur state
(function() {
  'use strict';

  // Check storage for saved blur state (default: enabled/true)
  chrome.storage.sync.get(['blurEnabled'], function(result) {
    const blurEnabled = result.blurEnabled !== undefined ? result.blurEnabled : true;
    applyBlurState(blurEnabled);
  });

  // Listen for messages from popup to toggle blur
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleBlur') {
      applyBlurState(request.enabled);
      sendResponse({ success: true });
    } else if (request.action === 'getBlurState') {
      const isEnabled = !document.body.classList.contains('blur-disabled');
      sendResponse({ enabled: isEnabled });
    }
    return true;
  });

  // Apply or remove blur based on state
  function applyBlurState(enabled) {
    if (enabled) {
      // Enable blur by removing the disabled class
      document.body.classList.remove('blur-disabled');
    } else {
      // Disable blur by adding the disabled class
      document.body.classList.add('blur-disabled');
    }
  }
})();
