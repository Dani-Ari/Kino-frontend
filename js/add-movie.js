const form = document.getElementById('addMovieForm');

async function submitMovie(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const duration = document.getElementById('duration').value;
    const ageLimit = document.getElementById('ageLimit').value;

    const movie = {
        title: title,
        duration: duration,
        ageLimit: ageLimit
    };

    const response = await fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });

    if (response.ok) {
        const data = await response.json();
        alert('Movie added: ' + data.title)
        window.location.href = 'movies.html'
    } else {
        alert('Something went wrong!')
    }
}

form.addEventListener('submit', submitMovie);