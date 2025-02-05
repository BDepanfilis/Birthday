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
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet2.jpg" },
  { name: "Double Chocolate Mocha Cake", elo: 1000, img: "images/Double_Chocolate_Mocha.jpg" },
  { name: "Tuxedo Cake", elo: 1000, img: "images/Tuxedo.jpg" },
  { name: "Funfetti Cake", elo: 1000, img: "images/Funfetti.jpg" },
  { name: "Chocolate Kahlua Cake", elo: 1000, img: "images/Chocolate_K.jpg" },
  { name: "Strawberry Shortcake", elo: 1000, img: "images/Strawberry_Shortcake.jpg" },
  { name: "Birthday Cake", elo: 1000, img: "images/Birthday_Cake.jpg" },
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
  document.getElementById("cake1").innerHTML = `<img src="images/${cake1.img}" alt="${cake1.name}" />`;
  document.getElementById("cake2").innerHTML = `<img src="images/${cake2.img}" alt="${cake2.name}" />`;


  // Add click events to choose cakes
  document.getElementById("cake1").onclick = function() { updateElo(cake1, cake2); };
  document.getElementById("cake2").onclick = function() { updateElo(cake2, cake1); };
}

function updateElo(winner, loser) {
  // Elo rating system logic
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

function checkFinalWinner() {
  // Get the cake with the highest Elo value
  let highestEloCake = cakes.reduce((prev, current) => (prev.elo > current.elo) ? prev : current);

  // Update the HTML to show the final winner and their image
  document.getElementById("cake-container").innerHTML = `
    <h2>Final Winner: ${highestEloCake.name}</h2>
    <img src="images/${highestEloCake.img}" alt="${highestEloCake.name}" />
    <p>Happy Birthday, my love!</p>
  `;
}

