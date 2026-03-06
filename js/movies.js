async function fetchMovies() {
    const response = await fetch('http://localhost:8080/movies');
    const movies = await response.json();

    const movieList = document.getElementById('movieList');

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        movieList.appendChild(li);
    });
}

fetchMovies();