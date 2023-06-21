import './styles.css';

import { renderLeaderboard, handleFormSubmit } from './modules/leaderboard.js';

// Attach form submit event listener
document.getElementById('scoreForm').addEventListener('submit', handleFormSubmit);

// Initial rendering of the leaderboard
renderLeaderboard();
