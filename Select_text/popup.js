function searchWord() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "searchWord"}, function(response) {
        document.getElementById("meaning").innerHTML = response.meaning;
      });
    });
  }
  
  document.getElementById("search-btn").addEventListener("click", searchWord);
  