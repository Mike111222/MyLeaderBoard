import './styles.css';
import GetGameScore from './modules/leaderboard.js';

const currentScore = new GetGameScore();
const addScore = document.querySelector('.add-form');

addScore.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = addScore.name.value;
  const score = addScore.score.value;
  currentScore.addNewScore({ user, score });
  addScore.reset();
});

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', currentScore.fetchScores);
document.addEventListener('DOMContentLoaded', currentScore.showScores);