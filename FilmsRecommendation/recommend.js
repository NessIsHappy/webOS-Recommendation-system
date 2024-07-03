
let genres = [1, 2, 3, 4, 5, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5];
let years = [1990, 1995, 2000, 1990, 2000, 2005, 1995, 1995, 2010, 2015, 2020, 2020, 2020];
let authors = [101, 102, 103, 101, 102, 101, 104, 105, 106, 107, 102, 102, 103, 103, 103];

function getTop3(array) {
  let frequencyMap = array.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  let sortedEntries = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);
  return sortedEntries.slice(0, 3).map(entry => Number(entry[0]));
}

function getYearRange(year) {
  let start = year - 5;
  let end = year + 5;
  let range = [];
  for (let y = start; y <= end; y++) {
    range.push(y);
  }
  return range;
}

function generateCombinations(arrays) {
  if (arrays.length === 0) {
    return [[]];
  }
  let result = [];
  let restCombinations = generateCombinations(arrays.slice(1));
  for (let item of arrays[0]) {
    for (let combination of restCombinations) {
      result.push([item, ...combination]);
    }
  }
  return result;
}

function allCombinations(genres, years, authors) {
  let topGenres = getTop3(genres);
  let topYears = getTop3(years);
  let topAuthors = getTop3(authors);

  let yearRanges = topYears.map(year => getYearRange(year)).flat();

  let allCombinations = generateCombinations([topGenres, yearRanges, topAuthors]);

  let genreYearCombinations = generateCombinations([topGenres, yearRanges]);

  let genreCombinations = generateCombinations([topGenres]);

  return {
    allCombinations,
    genreYearCombinations,
    genreCombinations
  };
}

// Получение всех сочетаний
let combinations = allCombinations(genres, years, authors);

// Вывод результатов
console.log('Все сочетания (жанры, годы, авторы):');
console.log(combinations.allCombinations);

console.log('Сочетания (жанры и годы):');
console.log(combinations.genreYearCombinations);

console.log('Сочетания (только жанры):');
console.log(combinations.genreCombinations);
