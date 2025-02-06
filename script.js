// Define cakes data with images and Elo ratings
let cakes = [
  { name: "Carrot Cake", elo: 1000, img: "images/Carrot_Cake.JPG" },
  { name: "Orange Dream Cake", elo: 1000, img: "images/Orange_Dream.JPG" },
  { name: "Choco nana Cake", elo: 1000, img: "images/Choco_nana.JPG" },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet.JPG" },
  { name: "Key Lime Cake", elo: 1000, img: "images/Key_Lime.JPG" },
  { name: "Chocolate Fresh Milk Cake", elo: 1000, img: "images/Chocolate_Fresh_Milk.JPG" },
  { name: "Green Tea Tiramisu Cake", elo: 1000, img: "images/Green_Tea_Tiramisu.JPG" },
  { name: "Chocolate Tiramisu Cake", elo: 1000, img: "images/Chocolate_Tiramisu.JPG" },
  { name: "Thai Dream Cake", elo: 1000, img: "images/Thai_Dream.JPG" },
  { name: "Lemon Merengue Cake", elo: 1000, img: "images/Lemon_Merengue.JPG" },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet2.jpg" },
  { name: "Double Chocolate Mocha Cake", elo: 1000, img: "images/Double_Chocolate_Mocha.jpg" },
  { name: "Tuxedo Cake", elo: 1000, img: "images/Tuxedo.jpg" },
  { name: "Funfetti Cake", elo: 1000, img: "images/Funfetti.jpg" },
  { name: "Chocolate Kahlua Cake", elo: 1000, img: "images/Chocolate_K.jpg" },
  { name: "Strawberry Shortcake", elo: 1000, img: "images/Strawberry_Shortcake.jpg" },
  { name: "Birthday Cake", elo: 1000, img: "images/Birthday_Cake.jpg" }
];

// Function to update Elo ratings
function updateElo(winner, loser) {
  const K = 100; // Elo constant
  let expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  let expectedLoser = 1 - expectedWinner;

  winner.elo += K * (1 - expectedWinner);
  loser.elo += K * (0 - expectedLoser);
}

// Function to display the next two cakes or stop the game if one reaches sufficient Elo
function showNewCakes() {
  // Set the Elo threshold for the "ultimate cake"
  const ELO_THRESHOLD = 1200;

  // If any cake's Elo exceeds the threshold, end the game
  let topCake = cakes.find(cake => cake.elo >= ELO_THRESHOLD);
  if (topCake) {
    // Stop the game by not showing new cakes
    displayWinner(topCake);
    return;
  }

  // Randomly select two different cakes
  let cake1 = cakes[Math.floor(Math.random() * cakes.length)];
  let cake2 = cakes[Math.floor(Math.random() * cakes.length)];

  // Ensure the two cakes are not the same
  while (cake1 === cake2) {
    cake2 = cakes[Math.floor(Math.random() * cakes.length)];
  }

  // Update the HTML to show the two cakes with images
  document.getElementById("cake1").innerHTML = `
    <div class="cake">
      <img src="${cake1.img}" alt="${cake1.name}" />
      <p>${cake1.name}</p>
    </div>
  `;
  document.getElementById("cake2").innerHTML = `
    <div class="cake">
      <img src="${cake2.img}" alt="${cake2.name}" />
      <p>${cake2.name}</p>
    </div>
  `;

  // Add click functionality for cake selection
  let cake1Element = document.getElementById("cake1");
  let cake2Element = document.getElementById("cake2");

  cake1Element.onclick = function() {
    updateElo(cake1, cake2);
    showNewCakes(); // Show new cakes after selection
  };

  cake2Element.onclick = function() {
    updateElo(cake2, cake1);
    showNewCakes(); // Show new cakes after selection
  };
}

// Function to display the winner when a cake reaches the Elo threshold
function displayWinner(cake) {
  // Stop the game and show the winning cake
  document.body.innerHTML = `
    <div class="cake-container-wrapper">
      <div class="cake-container">
        <img src="${cake.img}" alt="${cake.name}" />
        <p>${cake.name}</p>
      </div>
    </div>
    <p style="font-size: 24px; color: #ff6f61; font-family: 'Poppins', sans-serif; font-weight: bold;">
      Congratulations Hannah on your 22nd birthday! 🎉🎂
    </p>
  `;
}

// Initialize by displaying the first pair of cakes
showNewCakes();
