chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startTimer') {
      var studyTime = request.studyTime;
      var timerDisplay = document.createElement('div');
      timerDisplay.id = 'study-break-timer';
      timerDisplay.style.position = 'fixed';
      timerDisplay.style.bottom = '20px';
      timerDisplay.style.right = '20px';
      timerDisplay.style.backgroundColor = '#000';
      timerDisplay.style.color = '#fff';
      timerDisplay.style.padding = '10px';
      timerDisplay.style.fontSize = '24px';
      document.body.appendChild(timerDisplay);
  
      var timeLeft = studyTime;
      timerDisplay.textContent = formatTime(timeLeft);
  
      timerId = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
  
        if (timeLeft <= 0) {
          clearInterval(timerId);
          playAlarm();
          document.body.removeChild(timerDisplay);
        }
      }, 1000);
    }
  });
  
  function formatTime(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds % 60;
    return padZero(minutes) + ':' + padZero(seconds);
  }
  
  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }
  
  function playAlarm() {
    var audio = new Audio('alarm_sound.mp3'); // Replace 'alarm_sound.mp3' with the path to your alarm sound file
    audio.play();
    alert('Study time is over!');
  }
  