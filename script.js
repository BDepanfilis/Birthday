// Sample cakes and their initial Elo values
let cakes = [
  { name: "Carrot Cake", elo: 1000, img: "images/Carrot_Cake.JPG", wins: 0 },
  { name: "Orange Dream Cake", elo: 1000, img: "images/Orange_Dream.JPG", wins: 0 },
  { name: "Choco nana Cake", elo: 1000, img: "images/Choco_nana.JPG", wins: 0 },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet.JPG", wins: 0 },
  { name: "Key Lime Cake", elo: 1000, img: "images/Key_Lime.JPG", wins: 0 },
  { name: "Chocolate Fresh Milk Cake", elo: 1000, img: "images/Chocolate_Fresh_Milk.JPG", wins: 0 },
  { name: "Green Tea Tiramisu Cake", elo: 1000, img: "images/Green_Tea_Tiramisu.JPG", wins: 0 },
  { name: "Chocolate Tiramisu Cake", elo: 1000, img: "images/Chocolate_Tiramisu.JPG", wins: 0 },
  { name: "Thai Dream Cake", elo: 1000, img: "images/Thai_Dream.JPG", wins: 0 },
  { name: "Lemon Merengue Cake", elo: 1000, img: "images/Lemon_Merengue.JPG", wins: 0 },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet2.jpg", wins: 0 },
  { name: "Double Chocolate Mocha Cake", elo: 1000, img: "images/Double_Chocolate_Mocha.jpg", wins: 0 },
  { name: "Tuxedo Cake", elo: 1000, img: "images/Tuxedo.jpg", wins: 0 },
  { name: "Funfetti Cake", elo: 1000, img: "images/Funfetti.jpg", wins: 0 },
  { name: "Chocolate Kahlua Cake", elo: 1000, img: "images/Chocolate_K.jpg", wins: 0 },
  { name: "Strawberry Shortcake", elo: 1000, img: "images/Strawberry_Shortcake.jpg", wins: 0 },
  { name: "Birthday Cake", elo: 1000, img: "images/Birthday_Cake.jpg", wins: 0 },
];

const eloThreshold = 2000; // Set the Elo score threshold for crowning a winner

// Function to get two random cakes and display them
function getRandomCakes() {
  // Check if there's a winner
  const winner = getWinner();
  if (winner) {
    displayWinner(winner); // Display the winner if Elo threshold is reached
    return; // Stop the game from continuing
  }

  // Pick two random cakes
  let cake1 = cakes[Math.floor(Math.random() * cakes.length)];
  let cake2 = cakes[Math.floor(Math.random() * cakes.length)];

  // Ensure they are not the same cake
  while (cake1 === cake2) {
    cake2 = cakes[Math.floor(Math.random() * cakes.length)];
  }

  // Update the HTML with the correct image paths and cake names
  document.getElementById("cake1").innerHTML = `
    <img src="${cake1.img}" alt="${cake1.name}" />
    <p>${cake1.name}</p>
  `;
  document.getElementById("cake2").innerHTML = `
    <img src="${cake2.img}" alt="${cake2.name}" />
    <p>${cake2.name}</p>
  `;

  // Add click events to choose cakes
  document.getElementById("cake1").onclick = function() { updateElo(cake1, cake2); };
  document.getElementById("cake2").onclick = function() { updateElo(cake2, cake1); };
}

// Elo rating system logic
function updateElo(winner, loser) {
  const K = 32; // Constant (you can change this to fine-tune)
  let expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  let expectedLoser = 1 - expectedWinner;

  // Update Elo values
  winner.elo += K * (1 - expectedWinner);
  loser.elo += K * (0 - expectedLoser);

  // Increment win counter for the winner
  winner.wins++;

  // Display next cakes after Elo is updated
  getRandomCakes();
}

// Get the cake with the highest Elo score that has crossed the threshold
function getWinner() {
  // Find the cake with the highest Elo score
  let highestEloCake = cakes.reduce((prev, current) => (prev.elo > current.elo) ? prev : current);

  // If the highest Elo score exceeds the threshold, return the winner
  if (highestEloCake.elo >= eloThreshold) {
    return highestEloCake;
  }

  // If no winner, return null
  return null;
}

// Display the winner's image and a congratulatory message
function displayWinner(cake) {
  document.getElementById("cake-container").innerHTML = `
    <h2>The Winner is: ${cake.name}</h2>
    <img src="${cake.img}" alt="${cake.name}" />
    <p>Congratulations! This cake has claimed victory!</p>
  `;
  // Optionally, disable the "Next" button after a winner is crowned
  document.querySelector("button").disabled = true;
}

// Start with random cakes
getRandomCakes();
