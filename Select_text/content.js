chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "searchWord") {
      var selectedWord = window.getSelection().toString().trim();
      if (selectedWord.length > 0) {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + selectedWord)
          .then(response => response.json())
          .then(data => {
            var meaning = data[0].meanings[0].definitions[0].definition;
            sendResponse({meaning: meaning});
          })
          .catch(error => {
            sendResponse({meaning: "Unable to find meaning"});
          });
        return true;
      }
    }
  });
  