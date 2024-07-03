let selectedCount = 0;
let selectedGenres = [];

document.querySelectorAll('.genreButton').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            selectedGenres = selectedGenres.filter(genre => genre !== button.textContent);
            selectedCount--;
        } else if (selectedCount < 4) {
            button.classList.add('selected');
            selectedGenres.push(button.textContent);
            selectedCount++;
        }
        document.getElementById('selectedGenres').innerText = selectedGenres;
        document.getElementById('genreCount').innerText = selectedCount;
    });
});

document.getElementById("clickButton").addEventListener("click", function() {
    if (selectedCount == 4) {
        let selectedGenresStr = selectedGenres.join(',');
        window.location.href = "FilmsChooser/index.html?genres=" + encodeURIComponent(selectedGenresStr);
    } else {
        let header = document.getElementById("header");
        header.innerText = `You chose only ${selectedCount} genre(s)!`;
        header.style.color = red;
    }
});