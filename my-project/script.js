// To-Do

let currentPage = 1;
let totalPages = 1;

let currentQuery = '';
let currentSort = 'popularity.desc';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGVmNjBjZjY1Njg0Njc1ZWIyMmIxYjJkZWJjM2E3MSIsIm5iZiI6MTc0MDg2NTQxNi4zOTIsInN1YiI6IjY3YzM3Zjg4NjQ2NmJkOGVkMjRkZmZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cL8f5aPbrZen1z0Z6Pm-cCSHZXW7o5vaReq4e-Bmar0' 
    }
};

async function fetchMovies(page = 1, query = '', sort = 'popularity.desc') {
    try {
        const url = query 
            ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`
            : `https://api.themoviedb.org/3/movie/popular?page=${page}`;
        console.log(`Fetching URL: ${url}`); // Debugging: Log the URL being fetched
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(`API Response:`, data); // Debugging: Log the API response
        console.log(`Sorting Method:`, sort); //Debugging: Log the sorting method

        const sortedMovies = sortMovies(data.results, sort);
        displayMovies(sortedMovies);
        totalPages = data.total_pages; // Update totalPages with the value from the API response
        document.querySelector('.pageNumber').textContent = `Page: ${page} of ${totalPages}`; // Update page number display
    } catch (error) {
        console.error(error);
    }   
}

function sortMovies(movies, sort) {
    switch (sort) {
        case 'release_date.asc':
            return movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        case 'release_date.desc':
            return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        case 'vote_average.asc':
            return movies.sort((a, b) => a.vote_average - b.vote_average);
        case 'vote_average.desc':
            return movies.sort((a, b) => b.vote_average - a.vote_average);
        case 'popularity.desc':
        default:
            return movies.sort((a, b) => b.popularity - a.popularity);
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
        fetchMovies(currentPage, currentQuery, currentSort);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentPage, currentQuery, currentSort);
    }
});

document.getElementById('search').addEventListener('input', (event) => {
    currentQuery = event.target.value;
    currentPage = 1; // Reset to first page
    fetchMovies(currentPage, currentQuery, currentSort);
});

document.querySelectorAll('.dropdown-content a').forEach(sortOption => {
    sortOption.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.dropdown-content .active').classList.remove('active');
        event.target.classList.add('active');
        currentSort = event.target.getAttribute('data-sort');
        document.querySelector('.drop_btn').innerHTML = `${event.target.textContent.trim()} <i class="arrow down"></i>`; // Update dropdown button text
        currentPage = 1; // Reset to first page
        fetchMovies(currentPage, currentQuery, currentSort);
    });
});

fetchMovies(currentPage);