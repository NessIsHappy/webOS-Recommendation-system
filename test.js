const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjAzZjBjNjIwYTY0MTM0NjU3MzJmYzE3ZTIxZmI0NCIsIm5iZiI6MTcxOTc0NzY3NS44OTMzODgsInN1YiI6IjY2ODE0MzYxY2JkMzE2ZDRiYWFjMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6McmaAHqRsfHN6Vi4ddza0SMzui-88zaK2_dqdj13LM'
    }
  };

let api_string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=';
let desired_genre = [28, 12, 16, 35];
let array_api = [api_string, api_string, api_string, api_string];

for (let i = 0; i < 4; i++) {
    array_api[i] += desired_genre[i];
}

let savedData;

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
        let cnt = savedData["results"].length;
        for (let j = 0; j < cnt; j++) {
            //console.log(savedData["results"][j]);
            images[i * 5 + j] = ("http://image.tmdb.org/t/p/w500" + savedData["results"][j]["backdrop_path"]);
            console.log(images[i]);
        }
        console.log(i, "___________");
        let genreDivs = document.querySelectorAll('.genre');

        genreDivs.forEach((genreDiv, index) => {
            let img = document.createElement('img');
            img.src = images[index];
            genreDiv.appendChild(img);
        });
    });
}
