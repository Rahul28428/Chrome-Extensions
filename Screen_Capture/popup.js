document.getElementById("capture").addEventListener("click", () => {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
      chrome.runtime.sendMessage({ screenshotUrl }, (response) => {
        console.log(response.message);
      });
    });
  });
  