// import {array_genre_ids, selectedFilms} from './../FilmsChooser/script.js';
// console.log(array_genre_ids)
let num_films = localStorage.getItem('number');
let genre_array = JSON.parse(localStorage.getItem('genre_list'));
console.log(num_films)
console.log(genre_array)
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

let page = getRandomInt(5);

let api_string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' + '&page=' + 1 + '&with_genres='+selectedgGenres[0]+','+selectedgGenres[1]+','+selectedgGenres[2]+','+selectedgGenres[3]+','+selectedgGenres[4];
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

for (let i = 0; i < 5; i++) {
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

// let genres = [1, 2, 3, 4, 5, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5];
// let years = [1990, 1995, 2000, 1990, 2000, 2005, 1995, 1995, 2010, 2015, 2020, 2020, 2020];
// let authors = [101, 102, 103, 101, 102, 101, 104, 105, 106, 107, 102, 102, 103, 103, 103];

// function getTop3(array) {
//   let frequencyMap = array.reduce((acc, val) => {
//     acc[val] = (acc[val] || 0) + 1;
//     return acc;
//   }, {});

//   let sortedEntries = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);
//   return sortedEntries.slice(0, 3).map(entry => Number(entry[0]));
// }

// function getYearRange(year) {
//   let start = year - 5;
//   let end = year + 5;
//   let range = [];
//   for (let y = start; y <= end; y++) {
//     range.push(y);
//   }
//   return range;
// }

// function generateCombinations(arrays) {
//   if (arrays.length === 0) {
//     return [[]];
//   }
//   let result = [];
//   let restCombinations = generateCombinations(arrays.slice(1));
//   for (let item of arrays[0]) {
//     for (let combination of restCombinations) {
//       result.push([item, ...combination]);
//     }
//   }
//   return result;
// }

// function allCombinations(genres, years, authors) {
//   let topGenres = getTop3(genres);
//   let topYears = getTop3(years);
//   let topAuthors = getTop3(authors);

//   let yearRanges = topYears.map(year => getYearRange(year)).flat();

//   let allCombinations = generateCombinations([topGenres, yearRanges, topAuthors]);

//   let genreYearCombinations = generateCombinations([topGenres, yearRanges]);

//   let genreCombinations = generateCombinations([topGenres]);

//   return {
//     allCombinations,
//     genreYearCombinations,
//     genreCombinations
//   };
// }

// // Получение всех сочетаний
// let combinations = allCombinations(genres, years, authors);

// // Вывод результатов
// console.log('Все сочетания (жанры, годы, авторы):');
// console.log(combinations.allCombinations);

// console.log('Сочетания (жанры и годы):');
// console.log(combinations.genreYearCombinations);

// console.log('Сочетания (только жанры):');
// console.log(combinations.genreCombinations);
