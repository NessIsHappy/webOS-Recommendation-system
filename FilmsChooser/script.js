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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let page = getRandomInt(5);

let api_string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' + '&page=' + page + '&with_genres=';
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

function generateUniqueRandomNumbers(min, max, count) {
  if (max - min + 1 < count) {
    throw new Error("Диапазон чисел меньше, чем количество требуемых уникальных чисел");
  }

  let result = new Set();
  while (result.size < count) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    result.add(randomNumber);
  }

  return Array.from(result);
}



let images = [];

for (let i = 0; i < 4; i++) {
  fetchData(i).then(() => {
    let cnt = 5;
    let uniqueNumbers = generateUniqueRandomNumbers(0, 19, cnt);
    console.log(uniqueNumbers);
    for (let j = 0; j < cnt; j++) {
      images[i * 5 + j] = ("http://image.tmdb.org/t/p/w500" + savedData["results"][uniqueNumbers[j]]["backdrop_path"]);
      console.log(images[j]);

      let genreIndex = i * 5 + j;
      let genreNameElement = document.getElementById('genreName' + (i + 1));
      genreNameElement.textContent = selectedGenres[i]; 

      let movieTitle = savedData["results"][uniqueNumbers[j]]["original_title"];
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
let arrayOfFilms = [];
let genreArray1 = [];
let genreArray2 = [];
let genreArray3 = [];
let genreArray4 = [];

document.querySelectorAll('.genre').forEach(button => {
  button.addEventListener('click', () => {
    const genreId = button.getAttribute('data-genre');
    const genreName = document.getElementById(genreId).textContent;
    console.log(genreId, genreName);
    const title = button.querySelector('div').textContent;
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      arrayOfFilms.splice(arrayOfFilms.indexOf(title), 1);
      if (genreId == 'genreName1') {
        genreArray1.splice(genreArray1.indexOf(title), 1);
      } else if (genreId == 'genreName2') {
        genreArray2.splice(genreArray2.indexOf(title), 1);
      } else if (genreId == 'genreName3') {
        genreArray3.push(genreArray3.indexOf(title), 1);
      } else {
        genreArray4.push(genreArray4.indexOf(title), 1);
      }
      selectedFilms--;
    } else {
      button.classList.add('selected');
      arrayOfFilms.push(title);
      if (genreId == 'genreName1') {
        genreArray1.push(title);
      } else if (genreId == 'genreName2') {
        genreArray2.push(title);
      } else if (genreId == 'genreName3') {
        genreArray3.push(title);
      } else {
        genreArray4.push(title);
      }
      console.log(`Нажата кнопка с названием "${title}" под заголовком "${genreName}"`);
      selectedFilms++;
    }
  });
});

document.getElementById("clickButton").addEventListener("click", function() {
  if (genreArray1.length > 0 && genreArray2.length > 0 && genreArray3.length > 0 && genreArray4.length > 0) {
    let allGenres = [];
    allGenres.push(document.getElementById('genreName1').textContent);
    allGenres.push(document.getElementById('genreName2').textContent);
    allGenres.push(document.getElementById('genreName3').textContent);
    allGenres.push(document.getElementById('genreName4').textContent);
    console.log(allGenres);
    window.location.href = "../FilmsRecommendation/index.html";
  } else {
    console.log("Not enough!");
  }
});