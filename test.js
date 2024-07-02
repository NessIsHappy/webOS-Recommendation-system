const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjAzZjBjNjIwYTY0MTM0NjU3MzJmYzE3ZTIxZmI0NCIsIm5iZiI6MTcxOTc0NzY3NS44OTMzODgsInN1YiI6IjY2ODE0MzYxY2JkMzE2ZDRiYWFjMzRjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6McmaAHqRsfHN6Vi4ddza0SMzui-88zaK2_dqdj13LM'
    }
  };

let api_string = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=';
let desired_genre = 28;

api_string += desired_genre;

let savedData;

async function fetchData() {
  try {

    const response = await fetch(api_string, options);
    const data = await response.json();

    savedData = data;

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

fetchData().then(() => {
    let cnt = savedData["results"].length;
    for (let i = 0; i < cnt; i++) {
        console.log(savedData["results"][i]["original_title"]);
    }
});
