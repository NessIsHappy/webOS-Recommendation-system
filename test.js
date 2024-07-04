const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjAzZjBjNjIwYTY0MTM0NjU3MzJmYzE3ZTIxZmI0NCIsIm5iZiI6MTcxOTc0NzY3NS44OTMzODgsInN1YiI6IjY2ODE0MzYxY2JkMzE2ZDRiYWFjMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6McmaAHqRsfHN6Vi4ddza0SMzui-88zaK2_dqdj13LM'
  }
};

let genres = {
  'Action': 28,
  'Adventure': 12,
  'Animation': 16,
  'Comedy': 35,
  'Crime': 80,
  'Documentary': 99,
  'Drama': 18,
  'Fantasy': 14,
  'History': 36,
  'Horror': 27,
  'Sci-Fi': 878,
  'Thriller': 53,
};

let api_string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=';
let desired_genre = [];
let array_api = [api_string, api_string, api_string, api_string];

let urlParams = new URLSearchParams(window.location.search);
let selectedGenres = urlParams.get('genres').split(',');

for (let i = 0; i < 4; i++) {
  desired_genre[i] = genres[selectedGenres[i]];
}

console.log(desired_genre);
console.log(genres['Action']);
console.log(selectedGenres);
console.log(genres[selectedGenres[0]]);

for (let i = 0; i < 4; i++) {
  array_api[i] += desired_genre[i];
}

let savedData;
let savedNames = [];

async function fetchData(i) {
  try {
    const response = await fetch(array_api[i], options);
    const data = await response.json();

    savedData = data;

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

let images = [];

for (let i = 0; i < 4; i++) {
  fetchData(i).then(() => {
    let cnt = 5;
    for (let j = 0; j < cnt; j++) {
      images[i * 5 + j] = ("http://image.tmdb.org/t/p/w500" + savedData["results"][j]["backdrop_path"]);
      console.log(images[j]);

      let genreIndex = i * 5 + j;
      let genreNameElement = document.getElementById('genreName' + (i + 1));
      genreNameElement.textContent = selectedGenres[i]; 

      let movieTitle = savedData["results"][j]["original_title"];
      console.log(movieTitle, selectedGenres[i]);
      let genreDivs = document.querySelectorAll('.genre');
      let img = document.createElement('img');
      img.src = images[genreIndex];
      genreDivs[genreIndex].appendChild(img);

      let movieTitleDiv = document.getElementById('title' + (i * 5 + (j + 1)));
      movieTitleDiv.textContent = movieTitle;
    }
  });
}

let selectedFilms = 0;

document.querySelectorAll('.genre').forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      selectedFilms--;
    } else {
      button.classList.add('selected');
      const genreId = button.getAttribute('data-genre');
      const genreName = document.getElementById(genreId).textContent;
      const title = button.querySelector('div').textContent;
      console.log(`Нажата кнопка с названием "${title}" под заголовком "${genreName}"`);
      selectedFilms++;
    }
  });
});

document.getElementById("clickButton").addEventListener("click", function() {
  if (selectedFilms >= 4) {
    window.location.href = "../FilmsRecommendation/index.html";
  } else {
    alert(selectedCount);
    document.getElementsByTagName('h1').textContent = 'oops!';
  }
});