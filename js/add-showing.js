const form = document.getElementById('addShowingForm');

async function fetchMovies() {
    const response = await fetch('http://localhost:8080/movies');
    const movies = await response.json();

    const movieSelect = document.getElementById('movie');
    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.id;
        option.textContent = movie.title;
        movieSelect.appendChild(option);
    })
}

async function fetchTheatres() {
    const response = await fetch('http://localhost:8080/theatres');
    const theatres = await response.json();

    const theatreSelect = document.getElementById('theatre');
    theatres.forEach(theatre => {
        const option = document.createElement('option');
        option.value = theatre.id;
        option.textContent = theatre.name;
        theatreSelect.appendChild(option);
    })
}

async function submitShowing(event) {
    event.preventDefault();

    const movieId = document.getElementById('movie').value;
    const theatreId = document.getElementById('theatre').value;
    const startTime = document.getElementById('startTime').value;

    const showing = {
        movie: { id: movieId},
        theatre: { id: theatreId},
        startTime: startTime
    };

    const response = await fetch('http://localhost:8080/showings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(showing)
    });

    if (response.ok) {
        alert('Showing added!')
        window.location.href = 'showings.html';
    } else {
        alert('Something went wrong!');
    }
}

fetchMovies();
fetchTheatres();
form.addEventListener('submit', submitShowing);