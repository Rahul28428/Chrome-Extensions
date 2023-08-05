document.addEventListener('DOMContentLoaded', function() {
    // Fetch live scores
    fetch('https://api.football-data.org/v2/matches?status=LIVE', {
      headers: {
        'X-Auth-Token': 'YOUR_API_KEY'
      }
    })
    .then(response => response.json())
    .then(data => {
      const liveScoresElement = document.getElementById('live-scores');
  
      if (data.matches.length === 0) {
        liveScoresElement.textContent = 'No live matches currently.';
        return;
      }
  
      data.matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match');
  
        const homeTeamElement = document.createElement('span');
        homeTeamElement.classList.add('team');
        homeTeamElement.textContent = match.homeTeam.name;
  
        const scoreElement = document.createElement('span');
        scoreElement.classList.add('score');
        scoreElement.textContent = `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`;
  
        const awayTeamElement = document.createElement('span');
        awayTeamElement.classList.add('team');
        awayTeamElement.textContent = match.awayTeam.name;
  
        matchElement.appendChild(homeTeamElement);
        matchElement.appendChild(scoreElement);
        matchElement.appendChild(awayTeamElement);
  
        liveScoresElement.appendChild(matchElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    // Fetch upcoming matches
    fetch('https://api.football-data.org/v2/matches?status=SCHEDULED', {
      headers: {
        'X-Auth-Token': 'https://api.football-data.org/v4/matches'
      }
    })
    .then(response => response.json())
    .then(data => {
      const upcomingMatchesElement = document.getElementById('upcoming-matches');
  
      if (data.matches.length === 0) {
        upcomingMatchesElement.textContent = 'No upcoming matches.';
        return;
      }
  
      data.matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match');
  
        const homeTeamElement = document.createElement('span');
        homeTeamElement.classList.add('team');
        homeTeamElement.textContent = match.homeTeam.name;
  
        const timeElement = document.createElement('span');
        timeElement.classList.add('time');
        timeElement.textContent = new Date(match.utcDate).toLocaleString();
  
        const awayTeamElement = document.createElement('span');
        awayTeamElement.classList.add('team');
        awayTeamElement.textContent = match.awayTeam.name;
  
        matchElement.appendChild(homeTeamElement);
        matchElement.appendChild(timeElement);
        matchElement.appendChild(awayTeamElement);
  
        upcomingMatchesElement.appendChild(matchElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  