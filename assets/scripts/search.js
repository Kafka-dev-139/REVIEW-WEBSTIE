// Base folder for JSON files
const jsonFolder = "assets/json/";

// List of JSON files to fetch
const jsonFiles = [
  "characters.json",
  "events.json",
  "gameplay.json"];

// Get query parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query")?.toLowerCase();

// Display area for results
const resultsDiv = document.getElementById("results");

// Redults for a Heading ***
const resulstHeading = document.getElementById("searchMessage")

/**
 * 
 * @param {string} text - text
 * @param {string} query - search queery 
 * @returns {string} - text with highlighted queery
 */
function highlightKeywords(text, SearchQuery) {
  if (!SearchQuery) return text;
  const regex = new RegExp(`(${SearchQuery})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
} // ***





// Function to load all JSON files and search
async function search(SearchQuery) {
  if (!SearchQuery) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  //show results heading ***
  searchMessage.innerHTML = `<h2>Showing results for: <mark>"${SearchQuery}"</mark></h2>`;
  // blue color cos we have MARK styles in CSS 0 can be changed **

  let allData = [];

  // Fetch data from all JSON files
  for (const file of jsonFiles) {
    try {
      const response = await fetch(`${jsonFolder}${file}`);
      const data = await response.json();
      allData = allData.concat(data); // Merge data from all files
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }

  // Filter results based on query
  const filteredItems = allData.filter(item =>
    item.title.toLowerCase().includes(SearchQuery) ||
    item.keywords.some(keyword => keyword.toLowerCase().includes(SearchQuery))
  );

  console.log("Filtered Items:", filteredItems); // log filtered items for debugging

  // Display results dynamically
  displayResults(filteredItems, SearchQuery);
}



/**
 * Fetch results dynamiclly and highlight
 * @param {Array} items 
 * @param {string} SearchQuery
 */

// Function to fetch and display results dynamically
function displayResults(items, SearchQuery) {
  if (items.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  resultsDiv.innerHTML - "";

  // Dynamically fetch <h1> (title), first paragraph (description), and <h6> (date) from each linked page
  items.forEach(item => {
    fetch(item.url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const pageTitle = doc.querySelector("h1")?.textContent || "Untitled"; // Title    
        const pageDescribtion = doc.querySelector("p.description")?.textContent || "No describtion available"; // Title             
        const date = doc.querySelector("h6")?.textContent || "No date available."; // Date


        const checkdescription = highlightKeywords(pageDescribtion, SearchQuery); // picture

        // Format and append the result
        resultsDiv.innerHTML += `
            <div class="search-result">
            
              <h2><a href="${item.url}">${pageTitle}</a></h2>
                <div class="container-flex-row search-result-box" >
                  <div class="item-large result-text">
                    <h6>${date}</h6> 
                    <p>${checkdescription}</p>                                 
                    <hr> <!-- Line separator between results -->
                  </div> 
                  <div class="item">
                    <img class="img-border" src="${item.image}" alt="${item.ImageAlt}" class="result-image" />  
                  </div> 
                </div>               
                        
            </div>
            <br>
          `;
      })
      .catch(error => {
        console.error(`Error fetching ${item.url}:`, error);
      });
  });
}


// Perform the search
search(query);

// additional functions

// last search
localStorage.setItem("lastQuery", query);
const lastQuery = localStorage.getItem("lastQuery");




