const searchInput = document.querySelector('.movieName');
const searchBtn = document.querySelector('.searchBtn');
const cardTitles = document.querySelectorAll('.card-title');
const cardsContainer = document.getElementById('cardsContainer');

getOmdb = (movieName) => {
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
      if (parsedList.length == 0) {
        cardsContainer.innerHTML = 'No result';
        return
      }
      console.log(parsedList)
      for (obj of parsedList) {
        appendMovie(obj);
      }
      //appendMovie(parsedObj);
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
  getOmdb(searchInput.value);
  
}

searchBtn.addEventListener('click', movieHandler);



