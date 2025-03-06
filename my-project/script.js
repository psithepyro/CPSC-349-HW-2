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
            ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&sort_by=${sort}`
            : `https://api.themoviedb.org/3/movie/popular?page=${page}&sort_by=${sort}`;
        const response = await fetch(url, options);
        const data = await response.json();

        displayMovies(data.results);
        if(totalPages === 1){
            totalPages = data.total_pages;
        }

        document.querySelector('.pageNumber').textContent = `Page: ${page} of ${totalPages}`; // Update page number display
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

document.getElementById('search').addEventListener('input', (event) => {
    currentQuery = event.target.value;
    currentPage = 1;
    fetchMovies(currentPage, currentQuery, currentSort);
});

document.querySelectorAll('.dropdown-content a').forEach(sortOption => {
    sortOption.addEventListener('click', () => {
        Event.preventDefault();
        document.querySelector('.dropdown-content .active').classList.remove('active');
        Event.target.classList.add('active');
        currentSort = Event.target.getAttribute('data-sort');
        currentPage = 1;
        fetchMovies(currentPage, currentQuery, currentSort);
    });
});

fetchMovies(currentPage);