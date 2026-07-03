/* makes sidebar appear or dissapear on click */
function myFunction() {
  var x = document.getElementById("MySidebar");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

/* Accordion */
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


/* TEST TEST TEST */
/* Fiters ------------- Pending ------ Test */
// Get all character cards
const characterCards = document.querySelectorAll('.character-card');

// Get the no results image and message
const noResultsDiv = document.getElementById('no-results');

// Get filter buttons and reset button
const elementButtons = document.querySelectorAll('#element-buttons button');
const typeButtons = document.querySelectorAll('#type-buttons button');
const roleButtons = document.querySelectorAll('#role-buttons button'); // New role buttons
const resetButton = document.getElementById('reset-filters');

// State variables to keep track of selected filters
let selectedElement = '';
let selectedType = '';
let selectedRole = '';  // New role filter
let searchValue = '';

// Set up event listeners for search bar
document.getElementById('search-bar').addEventListener('input', function () {
  searchValue = this.value.toLowerCase();
  filterCards();
});

// Set up event listeners for element buttons
elementButtons.forEach(button => {
  button.addEventListener('click', function () {
    selectedElement = this.getAttribute('data-element');
    filterCards();
  });
});

// Set up event listeners for type buttons
typeButtons.forEach(button => {
  button.addEventListener('click', function () {
    selectedType = this.getAttribute('data-type');
    filterCards();
  });
});

// Set up event listeners for role buttons (new!)
roleButtons.forEach(button => {
  button.addEventListener('click', function () {
    selectedRole = this.getAttribute('data-role');
    filterCards();
  });
});

// Set up event listener for reset button
resetButton.addEventListener('click', function () {
  // Reset filters and search bar
  selectedElement = '';
  selectedType = '';
  selectedRole = '';  // Reset role filter
  searchValue = '';

  // Clear search input
  document.getElementById('search-bar').value = '';

  // Reset all filters
  filterCards();
});

// Filter function
function filterCards() {
  let matchFound = false;

  characterCards.forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    const element = card.getAttribute('data-element');
    const type = card.getAttribute('data-type');
    const role = card.getAttribute('data-role');  // New role attribute

    // Check if the card matches the current filters and search term
    const matchesSearch = name.includes(searchValue);
    const matchesElement = !selectedElement || element === selectedElement;
    const matchesType = !selectedType || type === selectedType;
    const matchesRole = !selectedRole || role === selectedRole;  // New role matching

    if (matchesSearch && matchesElement && matchesType && matchesRole) {
      card.style.display = ''; // Show the card
      matchFound = true; // Mark that we found a match
    } else {
      card.style.display = 'none'; // Hide the card
    }
  });

  // If no matches are found, show the "no results" image, otherwise hide it
  if (!matchFound) {
    noResultsDiv.style.display = 'block';
  } else {
    noResultsDiv.style.display = 'none';
  }
}




