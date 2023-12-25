// script.js

async function getUserData() {
  const username = document.getElementById('username').value;
  try {
    const response = await fetch(`/user/${username}`);
    const data = await response.json();

    document.getElementById('profileImage').src = data.profileImage;

    const userDetails = `
      <h2>${username}</h2>
      <p>Profile URL: <a href="${data.profileImage}" target="_blank">${data.profileImage}</a></p>
    `;
    document.getElementById('userDetails').innerHTML = userDetails;

    document.getElementById('contributionGraph').innerHTML = data.contributionGraph;
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Failed to fetch user data');
  }
}
