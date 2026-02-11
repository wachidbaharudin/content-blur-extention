// WhatsApp Web Blur Extension - Popup Script

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('blurToggle');
  const statusText = document.getElementById('statusText');
  const statusIndicator = document.getElementById('statusIndicator');

  // Load current blur state from storage
  chrome.storage.sync.get(['blurEnabled'], function(result) {
    const blurEnabled = result.blurEnabled !== undefined ? result.blurEnabled : true;
    toggle.checked = blurEnabled;
    updateStatus(blurEnabled);
  });

  // Handle toggle change
  toggle.addEventListener('change', function() {
    const enabled = toggle.checked;
    
    // Save to storage
    chrome.storage.sync.set({ blurEnabled: enabled }, function() {
      console.log('Blur state saved:', enabled);
    });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleBlur',
          enabled: enabled
        }, function(response) {
          if (chrome.runtime.lastError) {
            console.log('Note: Content script not loaded on this page');
          } else {
            console.log('Blur toggled successfully');
          }
        });
      }
    });

    // Update status UI
    updateStatus(enabled);
  });

  // Update status text and indicator
  function updateStatus(enabled) {
    if (enabled) {
      statusText.textContent = 'Blur is ON';
      statusIndicator.className = 'status-indicator active';
    } else {
      statusText.textContent = 'Blur is OFF';
      statusIndicator.className = 'status-indicator inactive';
    }
  }
});
