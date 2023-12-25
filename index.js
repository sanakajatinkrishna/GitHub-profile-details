// index.js

const express = require('express');
const axios = require('axios');
const app = express();

// Function to retrieve contribution graph
async function getContributionGraph(username) {
  try {
    const response = await axios.get(`https://github.com/users/${username}/contributions`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching contribution graph: ${error.message}`);
  }
}

// Function to retrieve repository image
async function getRepositoryImage(username, repository) {
  try {
    const response = await axios.get(`https://github.com/${username}/${repository}/blob/master/.github/logo.png?raw=true`, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching repository image: ${error.message}`);
  }
}

// Serve static files (HTML, CSS, JavaScript, images, etc.)
app.use(express.static('public'));

// Route to display the contribution graph
app.get('/contribution/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const contributionGraph = await getContributionGraph(username);
    res.send(contributionGraph);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to display repository image
app.get('/repository/:username/:repository', async (req, res) => {
  const { username, repository } = req.params;
  try {
    const repositoryImage = await getRepositoryImage(username, repository);
    res.set('Content-Type', 'image/png');
    res.send(repositoryImage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
