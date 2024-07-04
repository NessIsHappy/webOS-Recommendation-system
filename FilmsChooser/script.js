// Создаем массивы для каждого жанра
let genre1Films = [];
let genre2Films = [];
let genre3Films = [];
let genre4Films = [];

// Функция для добавления выбранного фильма в соответствующий массив
function addFilmToArray(genre, film) {
    switch (genre) {
        case 1:
            genre1Films.push(film);
            break;
        case 2:
            genre2Films.push(film);
            break;
        case 3:
            genre3Films.push(film);
            break;
        case 4:
            genre4Films.push(film);
            break;
        default:
            break;
    }
}

// Обработчики событий для кнопок фильмов
document.querySelectorAll('.genre').forEach(genre => {
    genre.addEventListener('click', event => {
        const filmTitle = event.target.innerText;
        const genreNumber = parseInt(genre.id.replace('title', ''));
        addFilmToArray(genreNumber, filmTitle);
    });
});

// Обработчик события для кнопки продолжить
const continueButton = document.getElementById('clickButton');
continueButton.addEventListener('click', () => {
    if (genre1Films.length > 0 && genre2Films.length > 0 && genre3Films.length > 0 && genre4Films.length > 0) {
        window.location.href = "../FilmsRecommendation/index.html";
        alert('You can continue!');
    } else {
        alert('Please select at least one film from each genre before continuing.');
    }
});
