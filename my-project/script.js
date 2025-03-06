// To-Do

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGVmNjBjZjY1Njg0Njc1ZWIyMmIxYjJkZWJjM2E3MSIsIm5iZiI6MTc0MDg2NTQxNi4zOTIsInN1YiI6IjY3YzM3Zjg4NjQ2NmJkOGVkMjRkZmZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cL8f5aPbrZen1z0Z6Pm-cCSHZXW7o5vaReq4e-Bmar0' 
    }
};

async function fetchMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular', options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }   
}

fetchMovies();