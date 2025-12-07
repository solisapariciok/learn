const dogImage = document.getElementById('dogImage');
const dogBreed = document.getElementById('dogBreed');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let dogs = [];
let currentIndex = 0;

// Fetch dog images with breed info
async function fetchDogs() {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=true');
    const data = await response.json();
    dogs = data;
    displayDog(currentIndex);
  } catch (error) {
    console.error('Error fetching dogs:', error);
  }
}

// Display current dog image and breed
function displayDog(index) {
  const dog = dogs[index];
  if (dog) {
    dogImage.src = dog.url;
    dogBreed.textContent = `Breed: ${dog.breeds[0].name}`;
  }
}

// Navigation buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dogs.length;
  displayDog(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dogs.length) % dogs.length;
  displayDog(currentIndex);
});

// Load dogs initially
fetchDogs();
