// Sample cakes and their initial Elo values
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
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet2.JPG" },
  { name: "Double Chocolate Mocha Cake", elo: 1000, img: "images/Double_Chocolate_Mocha.JPG" },
  { name: "Tuxedo Cake", elo: 1000, img: "images/Tuxedo.JPG" },
  { name: "Funfetti Cake", elo: 1000, img: "images/Funfetti.JPG" },
  { name: "Chocolate Kahlua Cake", elo: 1000, img: "images/Chocolate_K.JPG" },
  { name: "Strawberry Shortcake", elo: 1000, img: "images/Strawberry_Shortcake.JPG" },
  { name: "Birthday Cake", elo: 1000, img: "images/Birthday_Cake.JPG" },
  // Add more cakes as needed
];

function getRandomCakes() {
  // Pick two random cakes
  let cake1 = cakes[Math.floor(Math.random() * cakes.length)];
  let cake2 = cakes[Math.floor(Math.random() * cakes.length)];

  // Ensure they are not the same cake
  while (cake1 === cake2) {
    cake2 = cakes[Math.floor(Math.random() * cakes.length)];
  }

  // Update the HTML with the correct image paths
  document.getElementById("cake1").innerHTML = `<img src="${cake1.img}" alt="${cake1.name}" />`;
  document.getElementById("cake2").innerHTML = `<img src="${cake2.img}" alt="${cake2.name}" />`;

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

  // Display next cakes after Elo is updated
  getRandomCakes();
}

// Start with random cakes
getRandomCakes();

