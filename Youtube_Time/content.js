function startTimer() {
    let minutes = 0;
    let seconds = 0;
    let timerElement = document.getElementById('timer');
    let minutesElement = document.getElementById('minutes');
    let secondsElement = document.getElementById('seconds');
    
    let intervalId = setInterval(() => {
      // Increment seconds
      seconds++;
      if (seconds == 60) {
        // Increment minutes and reset seconds
        minutes++;
        seconds = 0;
      }
  
      // Update timer display
      minutesElement.textContent = formatTime(minutes);
      secondsElement.textContent = formatTime(seconds);
  
      // Stop timer after 1 hour
      if (minutes == 60) {
        clearInterval(intervalId);
        timerElement.textContent = "Time's up!";
      }
    }, 1000);
  }
  
  function formatTime(time) {
    // Add leading zero if time is less than 10
    return time < 10 ? '0' + time : time;
  }
  

    function isEntertainmentVideo(videoId) {
    // Use the YouTube Data API to retrieve the video metadata
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=YOUR_API_KEY`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let videoCategory = data.items[0].snippet.videoCategory;
        let tags = data.items[0].snippet.tags;
        
        // Check if the video category or tags indicate that the video is for entertainment purposes
        if (videoCategory == 'Entertainment' || tags.includes('Entertainment')) {
          // The video is for entertainment purposes
          // Add your code here to start the timer
        } else {
          // The video is not for entertainment purposes
          // Add your code here to stop the timer or do nothing
        }
      })
      .catch(error => console.error(error));
  }
  

// Check if the video is an entertainment purpose video
function isEntertainmentVideo() {
    // Check if the video is an entertainment purpose video
    return true;
}

// Listen for changes in the YouTube player
function onPlayerStateChange(event) {
    if (event.data === 1 && isEntertainmentVideo()) {
        startTimer();
    }
}

// Add an event listener for changes in the YouTube player
window.addEventListener("yt-navigate-finish", function () {
    var player = document.getElementById("movie_player");
    player.addEventListener("onStateChange", onPlayerStateChange);
});
