class GetGameScore {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }

  // stores data in array
  scoresData = [];

  // API URL
  apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/6Zvc4fYrm4fp0SPaIEde/scores/';

  // Show Scores
  showScores = () => {
    // Get the 'list' element
    const scoresList = document.getElementById('list');

    // Update the HTML content with scoresData
    scoresList.innerHTML = this.scoresData.map((item) => `
    <li>${item.user} : ${item.score}</li>`).join('');
  };

  // fetching data from API
  fetchScores = async () => {
    try {
      // Fetch data from the API
      const data = await fetch(this.apiURL);
      const response = await data.json();

      // Clear existing scoresData array
      this.scoresData = [];

      // Map through the response and add each item to scoresData array
      response.result.map((item) => this.scoresData.push(item));

      // Call showScores to update the displayed scores
      return this.showScores();
    } catch (error) {
      return error;
    }
  };

  // Add a new Score
  addNewScore = async ({ user, score }) => {
    try {
      // Create a config object with method, headers, and body
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, score }),
      };

      // Send a POST request to the API with the provided data
      const data = await fetch(this.apiURL, config);
      const response = await data.json();

      // Add the response to scoresData array
      this.scoresData.push(response);

      // Fetch and update the scores after adding a new score
      return this.fetchScores();
    } catch (error) {
      return error;
    }
  };
}

export default GetGameScore;
