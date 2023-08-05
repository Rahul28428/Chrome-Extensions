chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.captureVisibleTab(function(screenshotUrl) {
      var downloadLink = document.createElement('a');
      downloadLink.href = screenshotUrl;
      downloadLink.download = 'screenshot.jpg';
      downloadLink.target = '_blank';
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  });
  