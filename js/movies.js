async function fetchMovies() {
    const response = await fetch(`${API_BASE}/movies`);
    const movies = await response.json();

    const movieList = document.getElementById('movieList');

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        movieList.appendChild(li);
    });
}

fetchMovies();