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

function searchrecipeApi(query) {
  return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInstructions=${query}&number=5`
}
function recipeIdInfo(id) {
  return `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
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
      console.log(data)
      // getRecipe(data)
      for (let i = 0; i < data.results.length; i++) {
        const resultTitle = document.createElement("h3");
        const resultDescription = document.createElement("p");
        const resultImg = document.createElement("img");
        const resultButton = document.createElement("button");
        resultButton.textContent = "view recipe";
        const itemID = data.results[i].id;
        resultButton.setAttribute("id", itemID);
        resultButton.addEventListener('click', function () {
          const recipeInfoURL = recipeIdInfo(itemID);
          fetch(recipeInfoURL)
            .then((response) => {
              return response.json()
            })
            .then((response) => {
              const recipeURL = response.sourceUrl;
              window.open(recipeURL, "_blank");
              console.log({ response });
            });
        });


        resultTitle.textContent = "" + data.results[i].title;
        resultImg.setAttribute("src", data.results[i].image);

        containerRecipeResults.append(resultTitle, resultDescription, resultImg, resultButton);
      }
    })
});


const baseURL2 = `https://www.googleapis.com/youtube/v3/search`
const apiKey2 = "AIzaSyB0XEvk44MkvgqFCfBpU2eGm60Nc7hXh6c"
const videoCardTitle = document.getElementById("video-card-title")
const thumbnail = document.getElementById("video-card-thumbnail")


searchBtn.addEventListener('click', function (event) {

  event.preventDefault();

  const q2 = formInput.value;
  const apiUrl2 = `${baseURL2}?part=snippet&maxResults=5&q=${q2}&key=${apiKey2}`


  fetch(apiUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.items.length; i++) {

        const videoCardEl = document.createElement("div");
        videoCardEl.classList.add("video-card");
        containerVideoResults.append(videoCardEl);

        const videoImgEl = document.createElement("img");
        videoImgEl.classList.add("video-card-thumbnail");
        videoImgEl.src = data.items[i].snippet.thumbnails.medium.url;
        videoCardEl.append(videoImgEl);

        const videoTitleEl = document.createElement("a");
        videoTitleEl.classList.add("video-card-title");
        videoTitleEl.textContent = "" + data.items[i].snippet.title;
        videoTitleEl.href = `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`;
        videoCardEl.append(videoTitleEl);

        const videoDescEl = document.createElement("a");
        videoDescEl.classList.add("video-card-desc");
        videoDescEl.textContent = "" + data.items[i].snippet.description;
        videoCardEl.append(videoDescEl);

      }

    });

});
