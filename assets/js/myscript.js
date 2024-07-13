const searchBtn = document.getElementById("button");
const recipeResults = document.getElementById("recipe-results");
const searchApi = `https://api.spoonacular./recipes/complexSearch/?`
const apiKey = "5fa9f5e50dce47b9aa6ec8cd7538f0c8"
const containerVideoResults = document.getElementById("container-video-results");
const formInput = document.getElementById("findtext");
const getUrl = document.getElementById("get-url");

const DESCRIPTION_LENGTH = 100; //Characters

function searchrecipeApi(query) {
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


  recipeCardDesc.textContent = description.slice(0, DESCRIPTION_LENGTH) + ' ...'; // format desc so its right length
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
  const apiUrl = searchrecipeApi(q);


  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // clear the recipe results container
      recipeResults.innerHTML = '';

      for (const recipe of data.results) {

        const recipeInfoURL = recipeIdInfo(recipe.id);

        // need to make two api calles for summary, desc and target url 
        fetch(recipeInfoURL)
          .then((response) => {
            return response.json()
          })
          .then((response) => {
            const recipeCard = buildRecipeCardNode(recipe, response.sourceUrl, response.summary, response.readyInMinutes);
            recipeResults.append(recipeCard);
          });
      }
    })
});







