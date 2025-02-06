// Define cakes data with images and Elo ratings
let cakes = [
  { name: "Carrot Cake", elo: 1000, img: "images/Carrot_Cake.JPG", selected: 0 },
  { name: "Orange Dream Cake", elo: 1000, img: "images/Orange_Dream.JPG", selected: 0 },
  { name: "Choco nana Cake", elo: 1000, img: "images/Choco_nana.JPG", selected: 0 },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet.JPG", selected: 0 },
  { name: "Key Lime Cake", elo: 1000, img: "images/Key_Lime.JPG", selected: 0 },
  { name: "Chocolate Fresh Milk Cake", elo: 1000, img: "images/Chocolate_Fresh_Milk.JPG", selected: 0 },
  { name: "Green Tea Tiramisu Cake", elo: 1000, img: "images/Green_Tea_Tiramisu.JPG", selected: 0 },
  { name: "Chocolate Tiramisu Cake", elo: 1000, img: "images/Chocolate_Tiramisu.JPG", selected: 0 },
  { name: "Thai Dream Cake", elo: 1000, img: "images/Thai_Dream.JPG", selected: 0 },
  { name: "Lemon Merengue Cake", elo: 1000, img: "images/Lemon_Merengue.JPG", selected: 0 },
  { name: "Red Velvet Cake", elo: 1000, img: "images/Red_Velvet2.jpg", selected: 0 },
  { name: "Double Chocolate Mocha Cake", elo: 1000, img: "images/Double_Chocolate_Mocha.jpg", selected: 0 },
  { name: "Tuxedo Cake", elo: 1000, img: "images/Tuxedo.jpg", selected: 0 },
  { name: "Funfetti Cake", elo: 1000, img: "images/Funfetti.jpg", selected: 0 },
  { name: "Chocolate Kahlua Cake", elo: 1000, img: "images/Chocolate_K.jpg", selected: 0 },
  { name: "Strawberry Shortcake", elo: 1000, img: "images/Strawberry_Shortcake.jpg", selected: 0 },
  { name: "Birthday Cake", elo: 1000, img: "images/Birthday_Cake.jpg", selected: 0 }
];

// Function to update Elo ratings
function updateElo(winner, loser) {
  const K = 100; // Elo constant for higher weight
  let expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  let expectedLoser = 1 - expectedWinner;

  // Update Elo ratings
  winner.elo += K * (1 - expectedWinner);
  loser.elo += K * (0 - expectedLoser);
}

// Function to show new cakes and adjust selection probabilities
function showNewCakes() {
  // Calculate selection probabilities (weights based on selection count and Elo)
  let weightedCakes = cakes.map(cake => {
    // Increase the probability of selecting cakes that have been picked more often
    let weight = 1 + (cake.selected / 10); // Boost cakes that have been selected more often
    if (cake.elo > 1000) {
      weight *= 1.5; // Increase the weight more for cakes with higher Elo
    }
    return { cake, weight };
  });

  // Normalize the weights so that the sum of all weights equals 1
  let totalWeight = weightedCakes.reduce((sum, wc) => sum + wc.weight, 0);
  weightedCakes = weightedCakes.map(wc => ({
    ...wc,
    normalizedWeight: wc.weight / totalWeight
  }));

  // Select two cakes based on the weighted probabilities
  let cake1 = selectCake(weightedCakes);
  let cake2 = selectCake(weightedCakes);

  // Ensure the two cakes are not the same
  while (cake1.cake === cake2.cake) {
    cake2 = selectCake(weightedCakes);
  }

  // Update the HTML to show the two cakes with images
  document.getElementById("cake1").innerHTML = `
    <div class="cake">
      <img src="${cake1.cake.img}" alt="${cake1.cake.name}" />
      <p>${cake1.cake.name}</p>
    </div>
  `;
  document.getElementById("cake2").innerHTML = `
    <div class="cake">
      <img src="${cake2.cake.img}" alt="${cake2.cake.name}" />
      <p>${cake2.cake.name}</p>
    </div>
  `;

  // Add click functionality for cake selection
  let cake1Element = document.getElementById("cake1");
  let cake2Element = document.getElementById("cake2");

  cake1Element.onclick = function() {
    updateElo(cake1.cake, cake2.cake);
    cake1.cake.selected++; // Increment the selected count for cake1
    showNewCakes(); // Show new cakes after selection
  };

  cake2Element.onclick = function() {
    updateElo(cake2.cake, cake1.cake);
    cake2.cake.selected++; // Increment the selected count for cake2
    showNewCakes(); // Show new cakes after selection
  };
}

// Function to select a cake based on normalized weights
function selectCake(weightedCakes) {
  let rand = Math.random();
  let cumulativeWeight = 0;
  for (let wc of weightedCakes) {
    cumulativeWeight += wc.normalizedWeight;
    if (rand < cumulativeWeight) {
      return wc.cake;
    }
  }
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


