document.getElementById("clickButton").addEventListener("click", function() {
    window.location.href = "FilmsChooser/index.html"; // Замените ссылку на нужную вам
});

let selectedCount = 0;

document.querySelectorAll('.genreButton').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            selectedCount--;
        } else if (selectedCount < 4) {
            button.classList.add('selected');
            selectedCount++;
        }

        document.getElementById('genreCount').innerText = selectedCount;
    });
});

