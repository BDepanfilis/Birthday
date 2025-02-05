let cakes = [
  { name: "Carrot Cake", elo: 1000, img: "images/Carrot_Cake.JPG", selectCount: 0 },
  { name: "Orange Dream Cake", elo: 1000, img: "images/Orange_Dream.JPG", selectCount: 0 },
  { name: "Choco nana Cake", elo: 1000, img: "images/Choco_nana.JPG", selectCount: 0 },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet.JPG", selectCount: 0 },
  { name: "Key Lime Cake", elo: 1000, img: "images/Key_Lime.JPG", selectCount: 0 },
  { name: "Chocolate Fresh Milk Cake", elo: 1000, img: "images/Chocolate_Fresh_Milk.JPG", selectCount: 0 },
  { name: "Green Tea Tiramisu Cake", elo: 1000, img: "images/Green_Tea_Tiramisu.JPG", selectCount: 0 },
  { name: "Chocolate Tiramisu Cake", elo: 1000, img: "images/Chocolate_Tiramisu.JPG", selectCount: 0 },
  { name: "Thai Dream Cake", elo: 1000, img: "images/Thai_Dream.JPG", selectCount: 0 },
  { name: "Lemon Merengue Cake", elo: 1000, img: "images/Lemon_Merengue.JPG", selectCount: 0 },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet2.jpg", selectCount: 0 },
  { name: "Double Chocolate Mocha Cake", elo: 1000, img: "images/Double_Chocolate_Mocha.jpg", selectCount: 0 },
  { name: "Tuxedo Cake", elo: 1000, img: "images/Tuxedo.jpg", selectCount: 0 },
  { name: "Funfetti Cake", elo: 1000, img: "images/Funfetti.jpg", selectCount: 0 },
  { name: "Chocolate Kahlua Cake", elo: 1000, img: "images/Chocolate_K.jpg", selectCount: 0 },
  { name: "Strawberry Shortcake", elo: 1000, img: "images/Strawberry_Shortcake.jpg", selectCount: 0 },
  { name: "Birthday Cake", elo: 1000, img: "images/Birthday_Cake.jpg", selectCount: 0 }
];

// Function to update the selection count when a cake is selected
function updateSelection(cake) {
  cake.selectCount++;
}

// Weighted random selection of cakes based on their selectCount
function getRandomCakes() {
  let weightedCakes = [];
  
  // Create weighted list of cakes based on selectCount
  cakes.forEach(cake => {
    let weight = Math.pow(cake.selectCount + 1, 2); // Weight bias based on select count
    for (let i = 0; i < weight; i++) {
      weightedCakes.push(cake);
    }
  });

  // Pick two random cakes from the weighted array
  let cake1 = weightedCakes[Math.floor(Math.random() * weightedCakes.length)];
  let cake2 = weightedCakes[Math.floor(Math.random() * weightedCakes.length)];

  // Ensure the two cakes are not the same
  while (cake1 === cake2) {
    cake2 = weightedCakes[Math.floor(Math.random() * weightedCakes.length)];
  }

  // Update the HTML to show the two cakes
  document.getElementById("cake1").innerHTML = `
    <img src="${cake1.img}" alt="${cake1.name}" />
    <p>${cake1.name}</p>
  `;
  document.getElementById("cake2").innerHTML = `
    <img src="${cake2.img}" alt="${cake2.name}" />
    <p>${cake2.name}</p>
  `;

  // Add click functionality for cake selection
  document.getElementById("cake1").onclick = function() { updateElo(cake1, cake2); updateSelection(cake1); };
  document.getElementById("cake2").onclick = function() { updateElo(cake2, cake1); updateSelection(cake2); };
}

// Elo rating system logic
function updateElo(winner, loser) {
  const K = 32; // Elo constant
  let expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  let expectedLoser = 1 - expectedWinner;

  winner.elo += K * (1 - expectedWinner);
  loser.elo += K * (0 - expectedLoser);

  // Stop if a cake reaches a sufficient Elo threshold (e.g., 1500 Elo)
  if (winner.elo >= 1500) {
    displayWinner(winner); // Show the winner if a cake reaches 1500 Elo
  } else {
    getRandomCakes(); //
