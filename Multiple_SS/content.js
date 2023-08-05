chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'takeScreenshot') {
      chrome.runtime.sendMessage({ action: 'takeScreenshot' });
    }
  });
  