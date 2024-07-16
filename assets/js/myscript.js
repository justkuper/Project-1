const searchBtn = document.getElementById("button");
const recipeResults = document.getElementById("recipe-results");
const searchApi = `https://api.spoonacular./recipes/complexSearch/?`
const apiKey = "5fa9f5e50dce47b9aa6ec8cd7538f0c8"
const containerVideoResults = document.getElementById("container-video-results");
const videoResults = document.getElementById("video-results");
const formInput = document.getElementById("findtext");
const getUrl = document.getElementById("get-url");

const DESCRIPTION_LENGTH = 100; //Characters


function searchRecipeApi(query) {
  return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInstructions=${query}&number=5`
}
function recipeIdInfo(id) {
  return `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
}

function buildRecipeCardThumbnail(result) {
  // building recipe thumbnail
  const recipeThumbnail = document.createElement("div");
  recipeThumbnail.setAttribute("class", "recipe-card-thumbnail");
  const recipeLink = document.createElement("a")
  const recipeCardImage = document.createElement("img");

  // setting attributes
  recipeCardImage.setAttribute('src', result.image);
  recipeLink.setAttribute("href", result.image);

  // appending nodes to parent
  recipeThumbnail.append(recipeLink);
  recipeLink.append(recipeCardImage);

  return recipeThumbnail;
}

function buildRecipeCardInfo(result, description, prop1) {
  // Building recipe card info 
  const recipeCardInfo = document.createElement("div");
  const recipeCardTitle = document.createElement("h5");
  const recipeCardDesc = document.createElement("span");
  const recipeCardProp1 = document.createElement("span");

  //setting attributes
  recipeCardInfo.setAttribute("class", "recipe-card-info");
  recipeCardTitle.setAttribute("class", "recipe-card-title");
  recipeCardDesc.setAttribute("class", "recipe-card-desc");
  recipeCardProp1.setAttribute('class', 'recipe-card-prop');


  recipeCardDesc.innerHTML = description.slice(0, DESCRIPTION_LENGTH) + ' ...'; // format desc so its right length
  recipeCardProp1.textContent = `Ready in ${prop1} minutes.`;
  recipeCardTitle.textContent = result.title;

  // appending nodes
  recipeCardInfo.append(recipeCardTitle);
  recipeCardInfo.append(recipeCardDesc);
  recipeCardInfo.append(recipeCardProp1);

  return recipeCardInfo;
}

function buildRecipeCardButton(result, sourceUrl) {
  const recipeCardButton = document.createElement('div');
  recipeCardButton.setAttribute('class', 'recipe-card-button');

  const recipeButton = document.createElement('button');
  recipeButton.setAttribute('type', 'submit');
  recipeButton.setAttribute('id', 'get-url');
  recipeButton.textContent = 'View Recipe';

  const itemID = result.id;
  // create onClick listener
  recipeButton.addEventListener('click', function () {
    window.open(sourceUrl, '_blank');
  });

  recipeCardButton.append(recipeButton);
  return recipeCardButton;
}


function buildRecipeCardNode(result, srcURL, description, prop1) {
  const recipeCard = document.createElement('div');
  recipeCard.setAttribute('class', 'recipe-card');
  
  const thumbnail = buildRecipeCardThumbnail(result);

  const info = buildRecipeCardInfo(result, description, prop1);

  const button = buildRecipeCardButton(result, srcURL);

  recipeCard.append(thumbnail);

  recipeCard.append(info);

  recipeCard.append(button);

  return recipeCard;
}


searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const q = formInput.value;
  const apiUrl = searchRecipeApi(q);

  // const recipeResultsTitle = document.createElement("h3");
  // recipeResultsTitle.textContent = 'Recipe Search Results';
  // recipeResultsTitle.classList.add("recipe-results-container-title")
  // recipeCard.append(recipeResultsTitle);

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // clear the recipe results container
      recipeResults.innerHTML = '';

      for (const recipe of data.results) {

        const recipeInfoURL = recipeIdInfo(recipe.id);

        // need to make two api calls for summary, desc and target url 
        fetch(recipeInfoURL)
          .then((response) => {
            console.log(recipeInfoURL)
            return response.json()
          })
          .then((response) => {
            const recipeCard = buildRecipeCardNode(recipe, response.spoonacularSourceUrl, response.summary, response.readyInMinutes);
            recipeResults.append(recipeCard);
          });
      }
    })
});






const baseURL2 = `https://www.googleapis.com/youtube/v3/search`
const apiKey2 = "AIzaSyD8QzBDdcKqSRbjORWHMwjopcfkRH22zY0"
const videoCardTitle = document.getElementById("video-card-title")
const thumbnail = document.getElementById("video-card-thumbnail")


searchBtn.addEventListener('click', function (event) {

  event.preventDefault();

  videoResults.innerHTML = '';

  const q2 = formInput.value + " food network cooking video";
  const apiUrl2 = `${baseURL2}?part=snippet&maxResults=5&q=${q2}&key=${apiKey2}`
  const videoCardEl = document.createElement("div");
  videoCardEl.classList.add("video-card");
  videoResults.append(videoCardEl);
  // const videoResultsTitle = document.createElement("h3");
  // videoResultsTitle.textContent = 'Cooking Videos';
  // videoResultsTitle.classList.add("video-results-container-title")
  // videoCardEl.append(videoResultsTitle);


  fetch(apiUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
        for (let i = 0; i < data.items.length; i++) {

        // const favoriteButtonEl = document.createElement("button");
        // favoriteButtonEl.classList.add("favorites");
        // favoriteButtonEl.textContent = String.fromCodePoint(9734);
        // videoCardEl.append(favoriteButtonEl);
        
        const videoImgEl = document.createElement("img");
        videoImgEl.classList.add("video-card-thumbnail");
        videoImgEl.src = data.items[i].snippet.thumbnails.medium.url;
        videoCardEl.append(videoImgEl);
            

        const videoTitleEl = document.createElement("a");
        videoTitleEl.classList.add("video-card-title");
        videoTitleEl.innerHTML = data.items[i].snippet.title;
        videoTitleEl.href = `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`;
        videoCardEl.append(videoTitleEl);

        const videoDescEl = document.createElement("p");
        videoDescEl.classList.add("video-card-desc");
        videoDescEl.innerHTML = "" + data.items[i].snippet.description.slice(0, DESCRIPTION_LENGTH) + ' ...';
        videoCardEl.append(videoDescEl);

        // favoriteButtonEl.addEventListener('click', function (event) {
        //   event.preventDefault();
        //   if (favoriteButtonEl.textContent === String.fromCodePoint(9734)) {
        //     favoriteButtonEl.textContent = String.fromCodePoint(9733);
        //   } else {
        //     favoriteButtonEl.textContent = String.fromCodePoint(9734)
        //   }
        //   localStorage.setItem('favoriteButtonEl', value);
        // });

        formInput.value = '';

      }

    });

});

