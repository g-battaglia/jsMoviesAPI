const searchInput = document.querySelector('.movieName');
const searchBtn = document.querySelector('.searchBtn');
const cardTitles = document.querySelectorAll('.card-title');
const cardsContainer = document.getElementById('cardsContainer');

getFromAPI = (movieName) => {
  searchInput.value = '';
  const omdbURL = 'https://movie-api-bt.herokuapp.com/'
  let oReq = new XMLHttpRequest();
  oReq.open("GET", omdbURL + movieName + '?l=20');
  oReq.send();
  cardsContainer.innerHTML = 'Loading'
  // Register a callback that will be invoked when the response arrives
  oReq.onload = () => {
    cardsContainer.innerHTML = ''
    if (oReq.status === 200) {
      parsedList = JSON.parse(oReq.response);
      // Check if empty list:  
      if (parsedList.length == 0) {
        cardsContainer.innerHTML = 'No result';
        return
      }
      // Sort:
      parsedList.sort((a, b) => (a.imdbRating > b.imdbRating) ? 1 : -1)
      console.log('list:', parsedList)
      // Loop:
      for (obj of parsedList) {
        // Check if error in the list:
        if (obj.Error) {
          console.log('Error! Movie not found!')
        } else {
          // Append the movie to the DOM:
          appendSuggestedMovie(obj);
        }
        
      }
    } else {
        versionCallback(oReq.statusText, null);
    }
  };
}



appendSuggestedMovie = (movieData) => {
  let movieDiv  = document.createElement('div')
  movieDiv.classList.add('card', 'bg-light', 'shadow')
  movieDiv.innerHTML = `
  <div class="card-img-top" 
       style="background-image: url('${movieData.Poster}')">
  </div>
  <div class="card-body">
    <h5 class="card-title">
      ${movieData.Title}
    </h5>
    <p class="card-text">
      ${movieData.Plot}
    </p>
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

}

movieHandler = () => {
  if (searchInput.value == '') {
    return
  }
  getFromAPI(searchInput.value);
  
}

searchBtn.addEventListener('click', movieHandler);



