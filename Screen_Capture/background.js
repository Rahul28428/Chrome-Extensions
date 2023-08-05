chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const accessToken = localStorage.getItem("access_token");
  
    if (!accessToken) {
      console.error("Access token not found.");
      sendResponse({ message: "Access token not found." });
      return;
    }
  
    const formData = new FormData();
    formData.append("file", request.screenshotUrlToBlob);
  
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
    );
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (response.error) {
        console.error(response.error);
        sendResponse({ message: "Error uploading file to Google Drive." });
      } else {
        console.log(response);
        sendResponse({ message: "File uploaded to Google Drive successfully." });
      }
    };
    xhr.onerror = () => {
      console.error("Error uploading file to Google Drive.");
      sendResponse({ message: "Error uploading file to Google Drive." });
    };
    xhr.send(formData);
  
    return true;
  });
  