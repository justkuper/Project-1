// recipes api  curl ‘https://api.spoonacular.com/recipes/complexSearch?apiKey=e5463591441e40cbb4749b196b366360&query=pasta&maxFat=25&number=10’
// 9:32
// google api key:AIzaSyB0XEvk44MkvgqFCfBpU2eGm60Nc7hXh6c
// 9:34
const searchBtn = document.getElementById("button");
const containerRecipeResults = document.getElementById("container-recipe-results");
const searchApi = `https://api.spoonacular.com/recipes/complexSearch`
const apiKey = "e5463591441e40cbb4749b196b366360"

// async function searchYouTube(query) {
//   // Base URL for the YouTube API
//   const baseURL = "https://www.googleapis.com/youtube/v3/search";
//   // API key
//   const apiKey = "AIzaSyB0XEvk44MkvgqFCfBpU2eGm60Nc7hXh6c";
//   // Complete URL with query and API key
//   const url = `${baseURL}?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;
//   try {
//     // Fetch the results from the YouTube API
//     const response = await fetch(url);
//     // Parse the response as JSON
//     const data = await response.json();
//     // Check if the response contains any items
//     if (data.items) {
//       return data.items;
//     }
//      else {
//       throw new Error("No results found");
//     }
//   } 
//   catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }
// // Example usage
// searchYouTube("panda").then(results => {
//   if (results) {
//     console.log("Search results:", results);
//   } 
//   else {
//     console.log("No results found or an error occurred.");
//   }
// });


<<<<<<< HEAD



async function searchRecipes(query) {
  return `${baseURL}?apiKey=${apiKey}&query=${encodeURIComponent}${query}&maxFat=25&number=10`;

};


// Base URL for the Spoonacular API
// const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
// // API key
// const apiKey = "e5463591441e40cbb4749b196b366360";
// // Complete URL with query and API key
// const searchApi = `${baseURL}?apiKey=${apiKey}&query=${encodeURIComponent(query)}&maxFat=25&number=10`;
searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const q = containerRecipeResults.value;
  const searchURL = url(q);
  addSearchedQuery(q);


fetch(url) {
  .then(function (response) {
    return response.json();

  })
  then.function(data) {
    console.log(data);
  }
}

})


//   try {
//     // Fetch the results from the Spoonacular API
//     const response = await fetch(url);
//     // Parse the response as JSON
//     const data = await response.json();
//     // Check if the response contains any results
//     if (data.results) {
//       return data.results;
//     } 
//     else {
//       throw new Error("No results found");
//     }
//   } 
//   catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }
// // Example usage
// searchRecipes(query).then(results => {
//   if (results) {
//     console.log("search results", results);
//   } 
//   else {
//     console.log("No results found or an error occurred.");
//   }

// }));
// }
=======
  async function searchRecipes(query) {
    // Base URL for the Spoonacular API
    const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
    // API key
    const apiKey = "e5463591441e40cbb4749b196b366360";
    // Complete URL with query and API key
    const url = `${baseURL}?apiKey=${apiKey}&query=${encodeURIComponent(query)}&maxFat=25&number=10`;
    try {
      // Fetch the results from the Spoonacular API
      const response = await fetch(url);
      // Parse the response as JSON
      const data = await response.json();
      // Check if the response contains any results
      if (data.results) {
        return data.results;
      } 
      else {
        throw new Error("No results found");
      }
    } 
    catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  // Example usage
  searchRecipes("pasta").then(results => {
    if (results) {
      console.log("search results", results);
    } 
    else {
      console.log("No results found or an error occurred.");
    }
  });
  








>>>>>>> dev
