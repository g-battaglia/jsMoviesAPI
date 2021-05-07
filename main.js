const searchInput = document.querySelector('.movieName');
const searchBtn = document.querySelector('.searchBtn');
const cardTitles = document.querySelectorAll('.card-title')
const omdbURL = 'http://www.omdbapi.com/?apikey=2f09956a&t='

var oReq = new XMLHttpRequest();


function jsonMovie() {
  searchBtn.addEventListener('click', () => {
    movieName = searchInput.value;
    oReq.open("GET", omdbURL + movieName);
    oReq.send();
    // Register a callback that will be invoked when the response arrives
    oReq.onload = () => {
      if (oReq.status === 200) {
        parsedObj = JSON.parse(oReq.response);
        console.log(parsedObj);
      } else {
          versionCallback(oReq.statusText, null);
      }
  };

  })

}

jsonMovie();


