const searchInput = document.querySelector('.movieName');
const searchBtn = document.querySelector('.searchBtn');
const cardTitles = document.querySelectorAll('.card-title');
const cardsContainer = document.getElementById('cardsContainer');

getOmdb = (movieName) => {
  searchInput.value = '';
  const omdbURL = 'https://www.omdbapi.com/?apikey=2f09956a&t='
  let oReq = new XMLHttpRequest();
  oReq.open("GET", omdbURL + movieName);
  oReq.send();
  // Register a callback that will be invoked when the response arrives
  oReq.onload = () => {
    if (oReq.status === 200) {
      parsedObj = JSON.parse(oReq.response);
      appendMovie(parsedObj);
    } else {
        versionCallback(oReq.statusText, null);
    }
  };
}


getTasteDive = (movieNameT) => {
  const tasteDiveURL = 'https://tastedive.com/api/similar?type=movies&k=410571-StudyApl-KT62OLS2&q='
  let oReq = new XMLHttpRequest();
  oReq.open("GET", tasteDiveURL + movieNameT);
  oReq.send();
  oReq.onload = () => {
    if (oReq.status === 200) {
      parsedObj = JSON.parse(oReq.response);
      console.log(parsedObj)
    } else {
        versionCallback(oReq.statusText, null);
    }
  };
}

appendMovie = (movieData) => {
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
      <small>IMDB Rating: ${movieData.Ratings[0]['Value']}</small>
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
  getTasteDive(searchInput.value);
  getOmdb(searchInput.value);
  
}

searchBtn.addEventListener('click', movieHandler);



