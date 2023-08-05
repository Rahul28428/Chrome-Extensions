chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startTimer') {
      var studyTime = parseInt(request.studyTime, 10) * 60 * 1000;
      var breakTime = parseInt(request.breakTime, 10) * 60 * 1000;
      var startTime = Date.now();
      var isStudyTime = true;
  
      var timerId = setInterval(function() {
        var elapsed = Date.now() - startTime;
        var remainingTime = isStudyTime ? studyTime - elapsed : breakTime - elapsed;
  
        chrome.runtime.sendMessage({ action: 'updateTimer', time: remainingTime });
  
        if (elapsed >= studyTime && isStudyTime) {
          isStudyTime = false;
          startTime = Date.now();
          playAlarm();
        } else if (elapsed >= breakTime && !isStudyTime) {
          isStudyTime = true;
          startTime = Date.now();
          playAlarm();
        }
      }, 1000);
    } else if (request.action === 'stopTimer') {
      clearInterval(timerId);
    }
  });
  