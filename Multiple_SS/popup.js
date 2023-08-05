document.addEventListener('DOMContentLoaded', function () {
    const takeScreenshotButton = document.getElementById('takeScreenshot');
    const downloadScreenshotsButton = document.getElementById('downloadScreenshots');
    let screenshotUrls = [];
  
    takeScreenshotButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, { action: 'takeScreenshot' }, function (response) {
          if (response && response.screenshotUrl) {
            screenshotUrls.push(response.screenshotUrl);
          }
        });
      });
    });
  
    downloadScreenshotsButton.addEventListener('click', function () {
      if (screenshotUrls.length > 0) {
        screenshotUrls.forEach(function (url) {
          chrome.downloads.download({ url: url });
        });
        screenshotUrls = [];
      }
    });
  });
  