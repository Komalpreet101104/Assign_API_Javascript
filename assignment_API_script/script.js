let map; // Variable to store the map object

function initMap() {
  // Initializes the map with default options
  map = new google.maps.Map(document.getElementById("map"), {
   
    center: { lat: 40.7128, lng: -74.0060 }, //  New York City coordinates
    zoom: 8, // Initial zoom level
  });

  // Attaches event listener to the search button
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", searchLocation);
}

function searchLocation() {
  // Retrieves the search query from the input field
  const query = document.getElementById("searchInput").value;

  // Fetches geolocation data from Google Maps Geocoding API using the provided query
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyDxSlhtS-cj9oauFcEduk0gFgbvnzUaHm0`
  )
  // Parses the JSON response
    .then((response) => response.json()) 
    .then((data) => {
      // Handles the response data
      
      // If at least one result is found
      if (data.results.length > 0) { 
        const location = data.results[0].geometry.location; // Extracts the location coordinates

        // Sets the map center to the searched location
        map.setCenter(location); 
        map.setZoom(12); 
      } else {
        console.log("No results found"); // Logs a message if no results are found
      }
    })
    // Handles errors during the fetch
    .catch((error) => console.error("Error searching location:", error)); 
}
