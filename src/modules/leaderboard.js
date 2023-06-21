// Function to get leaderboard data from local storage
function getLeaderboardData() {
  const storedData = localStorage.getItem('leaderboardData');
  return storedData ? JSON.parse(storedData) : [];
}

// Function to save leaderboard data to local storage
function saveLeaderboardData(data) {
  localStorage.setItem('leaderboardData', JSON.stringify(data));
}

// Sample placeholder data
const placeholderData = [
  { name: 'Name', score: 100 },
  { name: 'Name', score: 200 },
  { name: 'Name', score: 150 },
  { name: 'Name', score: 300 },
  { name: 'Name', score: 250 },
  { name: 'Name', score: 350 },
];

// Sample leaderboard data
let leaderboardData = getLeaderboardData();

// Function to render the leaderboard
export function renderLeaderboard() {
  const leaderboardElement = document.getElementById('leaderboard');
  leaderboardElement.innerHTML = '';

  const table = document.createElement('table');

  // Display the placeholder data if the leaderboard data is empty
  const dataToDisplay = leaderboardData.length > 0 ? leaderboardData : placeholderData;

  dataToDisplay.forEach((player) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = player.name;
    const scoreCell = document.createElement('td');
    scoreCell.textContent = player.score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    table.appendChild(row);
  });

  leaderboardElement.appendChild(table);
}

// Function to handle form submission
export function handleFormSubmit(event) {
  event.preventDefault();

  const playerName = document.getElementById('playerName').value;
  const playerScore = parseInt(document.getElementById('playerScore').value, 10);

  // Validate input
  if (!playerName || Number.isNaN(playerScore)) {
    alert('Please enter a valid player name and score.');
    return;
  }

  // Add the new player to the leaderboard
  leaderboardData.push({ name: playerName, score: playerScore });

  // Sort the leaderboard based on score (descending order)
  leaderboardData.sort((a, b) => b.score - a.score);

  // Render the updated leaderboard
  renderLeaderboard();

  // Save the updated leaderboard data to local storage
  saveLeaderboardData(leaderboardData);

  // Reset the form
  document.getElementById('scoreForm').reset();
}

// Function to handle refresh button click
function handleRefreshButtonClick() {
  // Clear the leaderboard data
  leaderboardData = [];
  saveLeaderboardData(leaderboardData);

  // Render the empty leaderboard
  renderLeaderboard();
}

// Event listener for form submission
document.getElementById('scoreForm').addEventListener('submit', handleFormSubmit);

// Event listener for refresh button click
document.getElementById('refreshButton').addEventListener('click', handleRefreshButtonClick);

// Initial rendering of the leaderboard
renderLeaderboard();
