// Capture the visible tab and send the screenshot URL to the background script
chrome.runtime.sendMessage({ type: "capture" }, (response) => {
    if (response.type === "screenshotUrl") {
      const screenshotUrl = response.screenshotUrl;
      const screenshotUrlToBlob = dataURItoBlob(screenshotUrl);
      chrome.runtime.sendMessage({ screenshotUrlToBlob });
    } else {
      console.error(response.message);
    }
  });
  
  // Convert data URI to Blob object
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }
  