let searchInput = document.querySelector(".movieName");
const searchBtn = document.querySelector(".searchBtn");
const cardTitles = document.querySelectorAll(".card-title");
const cardsContainer = document.getElementById("cardsContainer");
let sortTypeInput = document.querySelector(".sortTypeInput");

const getFromAPI = async (movieName) => {
  let searchInput = document.querySelector(".movieName");
  cardsContainer.innerHTML = "Loading";
  searchInput.value = "";
  sortTypeInput = sortTypeInput.value;
  const omdbURL = "https://movie-api-bt.herokuapp.com/" + movieName + "?l=20";
  const res = await fetch(omdbURL);
  const data = await res.json();
  console.log(data);
  cardsContainer.innerHTML = "";
  if (data.length == 0) {
    cardsContainer.innerHTML = "No result";
    return;
  }
  switch (sortTypeInput) {
    case "Title":
      data.sort((a, b) => (a.Title > b.Title ? 1 : -1)).reverse();
      break;
    case "Rating":
      data.sort((a, b) => (a.imdbRating > b.imdbRating ? 1 : -1));
      break;
    case "Year":
      data.sort((a, b) => (b.Year > a.Year ? 1 : -1));
      break;
  }

  for (obj of data) {
    // Check if error in the list:
    if (obj.Error) {
      console.log("Error! Movie not found!");
      return;
    } else {
      // Append the movie to the DOM:
      appendSuggestedMovie(obj);
    }
  }
};

const appendSuggestedMovie = (movieData) => {
  let movieDiv = document.createElement("div");
  movieDiv.classList.add("card", "bg-light", "shadow", "m-3");
  movieDiv.innerHTML = `
  <div class="card-img-top" 
       style="background-image: url('${movieData.Poster}')">
  </div>
  <div class="card-body">
    <h5 class="card-title">${movieData.Title}</h5>
    <p class="card-text">${movieData.Plot}</p>
    <p class="card-text">
      <small>Director: ${movieData.Director}</small>
      <br>
      <small>Year: ${movieData.Year}</small>
      <br>
      <small>IMDB Rating: ${movieData.imdbRating}</small>
    </p>
    <a class="btn btn-outline-dark" href="#">Go somewhere</a>
  </div>
  `;
  cardsContainer.prepend(movieDiv);
};

movieHandler = () => {
  console.log(searchInput);
  if (searchInput.value == "") {
    console.log("empty");
    return;
  }
  getFromAPI(searchInput.value);
};

searchBtn.addEventListener("click", movieHandler);
