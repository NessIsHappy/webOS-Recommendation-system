// import {array_genre_ids, selectedFilms} from './../FilmsChooser/script.js';
// console.log(array_genre_ids)
let num_films = localStorage.getItem('number');
let genre_array = JSON.parse(localStorage.getItem('genre_list'));
let years_array = JSON.parse(localStorage.getItem('year_list'));
console.log(num_films)
console.log(genre_array)
console.log(years_array)
function topFiveFrequentNumbers(matrix) {
  let flattenedArray = matrix.flat();
  let counts = {};
  flattenedArray.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
  });
  let countsArray = Object.entries(counts);
  countsArray.sort((a, b) => b[1] - a[1]);
  let topFive = countsArray.slice(0, 5).map(item => Number(item[0]));
  
  return topFive;
}
let selectedgGenres = topFiveFrequentNumbers(genre_array);
console.log(selectedgGenres);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjAzZjBjNjIwYTY0MTM0NjU3MzJmYzE3ZTIxZmI0NCIsIm5iZiI6MTcxOTc0NzY3NS44OTMzODgsInN1YiI6IjY2ODE0MzYxY2JkMzE2ZDRiYWFjMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6McmaAHqRsfHN6Vi4ddza0SMzui-88zaK2_dqdj13LM'
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let page = getRandomInt(2);

function generateYearRanges(years) {
  let result = new Set();

  function addYearRange(year) {
    for (let y = year - 5; y <= year + 5; y++) {
      result.add(y);
    }
  }

  for (let year of years) {
    addYearRange(year);
  }

  return Array.from(result).sort((a, b) => a - b);
}
let full_years = generateYearRanges(years_array);
console.log(full_years);
console.log(full_years[2]);

let api_string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' + '&page=' + 1 + '&with_genres='+selectedgGenres[0]+','+selectedgGenres[1]+'|'+selectedgGenres[2]+','+selectedgGenres[3]+'|'+selectedgGenres[4] + '&year=';
for (let i = 0; i < 5; i++){
  api_string += years_array[i] + '|'
}
let desired_genre = [];
let array_api = [api_string, api_string, api_string, api_string];

// let urlParams = new URLSearchParams(window.location.search);
// let selectedGenres = urlParams.get('genres').split(',');

// for (let i = 0; i < 5; i++) {
//   desired_genre[i] = genres[selectedGenres[i]];
// }

// //console.log(desired_genre);
// //console.log(genres['Action']);
// console.log(selectedGenres);
// console.log(genres[selectedGenres[0]]);

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
console.log("!!!!!!!")
//console.log(str(savedData))
console.log("!!!!!!!")

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

let savedDataArray = [];
// savedDataId = 0;

let images = [];

for (let i = 0; i < 1; i++) {
  fetchData(i).then(() => {
    let cnt = 20;
    let uniqueNumbers = generateUniqueRandomNumbers(0, 19, cnt);
    console.log(uniqueNumbers);
    savedDataArray[i] = savedData;
    for (let j = 0; j < cnt; j++) {
      images[j] = ("http://image.tmdb.org/t/p/w500" + savedData["results"][j]["backdrop_path"]);
      console.log(images[j]);

      let genreIndex = j;
      // let genreNameElement = document.getElementById('genreName' + (j + 1));
      // genreNameElement.textContent = selectedGenres[i]; 

      let movieTitle = savedData["results"][j]["original_title"];
      //let movieDiv = document.getElementById('genreName' + (j + 1));
      //console.log(movieTitle, selectedGenres[i]);
      let genreDivs = document.querySelectorAll('.genre');
      let img = document.createElement('img');
      img.src = images[genreIndex];
      genreDivs[genreIndex].appendChild(img);
      //genreDivs[genreIndex](i * 5 + (j + 1)

      let movieTitleDiv = document.getElementById('title' + (j + 1));
      // let movieButtonDiv = document.getElementById('button' + (i * 5 + (j + 1)));
      movieTitleDiv.textContent = movieTitle;
      // movieButtonDiv.setAttribute('data-id', uniqueNumbers[j]);
      // document.querySelectorAll('.genre').forEach(button => {
      //   button.addEventListener('click', () => {
      //     button.setAttribute('data-id', uniqueNumbers[j]);
      //   });
      // });
    };
  });
}