const searchBtn = document.getElementById("button");
const containerRecipeResults = document.getElementById("container-recipe-results");
const searchApi = `https://api.spoonacular./recipes/complexSearch/?`
const apiKey = "5fa9f5e50dce47b9aa6ec8cd7538f0c8"
const containerVideoResults = document.getElementById("container-video-results");
const formInput = document.getElementById("findtext");
const getUrl = document.getElementById("get-url");

function getParams() {
    
    const searchParamsArr = document.location.search.split('&');
    const query = searchParamsArr[0].split('=').pop();
    const format = searchParamsArr[1].split('=').pop();
  
    searchApi(query, format);
  }

  function searchrecipeApi (query) {
return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInstructions=${query}&number=5`
  }
  function recipeIdInfo (query) {
    return `https://api.spoonacular.com/recipes/{id}/informationapiKey=${apiKey}&query=${query}&addRecipeInstructions=${query}&number=5`
      }
     

  searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const q = formInput.value;
    const apiUrl = searchrecipeApi(q);
    

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        // getRecipe(data)

        });
    })
    // function getRecipe (recipesData) {
    //     console.log(recipesData)
    //     getUrl.addEventListener('click', function (event) {
    //         const recipeId = recipesData.results.id
    //         const q = recipeId
    //         function recipeIdInfo (query) {
    //             return `https://api.spoonacular.com/recipes/id=${recipeId}/informationapiKey=${apiKey}`
    //               }
    //               console.log(recipesData)
    //         const recipeIdUrl = recipeIdInfo(q);
           
    //      fetch(recipeIdInfo)
    //     .then(function (response) {
    //     return response.json();
    //     })
    //     .then(function (data) {
    //     console.log(data);
    //     // getRecipe(data)

    // });
    // //     })

       

    // }
    //         // const resultTitle = document.createElement("h3");
            // const resultDescription = document.createElement("p");
            // const resultImg = document.createElement("p");
          
            // resultTitle.textContent = data.results.title;
            // resultDescription.textContent = data.results.image;
            // resultImg.textContent = data;
            
            

            // containerRecipeResults.append(resultTitle, resultDescription, resultImg);


            
