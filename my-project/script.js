// To-Do

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGVmNjBjZjY1Njg0Njc1ZWIyMmIxYjJkZWJjM2E3MSIsIm5iZiI6MTc0MDg2NTQxNi4zOTIsInN1YiI6IjY3YzM3Zjg4NjQ2NmJkOGVkMjRkZmZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cL8f5aPbrZen1z0Z6Pm-cCSHZXW7o5vaReq4e-Bmar0' 
    }
};

let currentPage = 1;
const totalPages = 12;

async function fetchMovies(page = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, options);
        const data = await response.json();
        displayMovies(data.results);
        document.querySelector('.pageNumber').textContent = page;
    } catch (error) {
        console.error(error);
    }   
}

function displayMovies(movies) {
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-gallery');

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>Release Date: ${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}</p>
            </div>
        `;

        movieContainer.appendChild(movieElement);
    });
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentPage);
    }
});

fetchMovies(currentPage);