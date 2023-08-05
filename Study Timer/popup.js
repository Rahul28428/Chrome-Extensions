document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('start-timer');
    var stopButton = document.getElementById('stop-timer');
    var studyTimeInput = document.getElementById('study-time');
    var breakTimeInput = document.getElementById('break-time');
  
    var studyTime;
    var timerId;
  
    startButton.addEventListener('click', function() {
      studyTime = parseInt(studyTimeInput.value, 10) * 60;
      startButton.disabled = true;
      stopButton.disabled = false;
      window.close(); // Close the popup window
  
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: 'contentScript.js' }, function() {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'startTimer', studyTime: studyTime });
        });
      });
    });
  
    stopButton.addEventListener('click', function() {
      clearInterval(timerId);
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  });
  