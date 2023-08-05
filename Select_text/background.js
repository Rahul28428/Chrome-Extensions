chrome.contextMenus.create({
    title: "Search Meaning",
    contexts:["selection"],
    onclick: function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {action: "searchWord"}, function(response) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "logo.png",
          title: "Search Meaning",
          message: response.meaning
        });
      });
    }
  });
  