function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
}

function showLoader(show) {
    const loader = document.getElementById('loader');
    loader.classList.toggle('hidden', !show);
}

function showErrorMessage(show) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.classList.toggle('hidden', !show);
}

function showMovieCard(show) {
    const movieCard = document.getElementById('movieCard');
    movieCard.classList.toggle('hidden', !show);
}

function searchMovies() {
    const movieNameTag = document.getElementById("movieName");
    const movie = movieNameTag.value.trim();

    if (!movie) {
        showErrorMessage(true);
        showMovieCard(false);
        return;
    }

    showErrorMessage(false);
    showMovieCard(false);
    showLoader(true);

    const apiKey = 'bfc34e7c';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movie)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showLoader(false);
            if (data.Response === "False") {
                showErrorMessage(true);
                return;
            }
            populateMovieDetails(data);
            showErrorMessage(false);
            showMovieCard(true);
        })
        .catch(() => {
            showLoader(false);
            showErrorMessage(true);
        });
}

function populateMovieDetails(movie) {
    document.getElementById("poster").src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.png";
    document.getElementById("title").innerText = movie.Title || "";
    document.getElementById("released").innerText = movie.Released ? "Released: " + movie.Released : "";
    document.getElementById("plot").innerText = movie.Plot || "";

    document.getElementById("actors").innerText = movie.Actors ? "Actors: " + movie.Actors : "";
    document.getElementById("awards").innerText = movie.Awards ? "Awards: " + movie.Awards : "";
    document.getElementById("boxOffice").innerText = movie.BoxOffice ? "Box Office: " + movie.BoxOffice : "";
    document.getElementById("country").innerText = movie.Country ? "Country: " + movie.Country : "";
    document.getElementById("director").innerText = movie.Director ? "Director: " + movie.Director : "";
    document.getElementById("genre").innerText = movie.Genre ? "Genre: " + movie.Genre : "";
    document.getElementById("language").innerText = movie.Language ? "Language: " + movie.Language : "";
    document.getElementById("imdbId").innerText = movie.imdbID ? "IMDB ID: " + movie.imdbID : "";
    document.getElementById("imdbRatings").innerText = movie.imdbRating ? "IMDB Rating: " + movie.imdbRating : "";
    document.getElementById("runtime").innerText = movie.Runtime ? "Runtime: " + movie.Runtime : "";
    document.getElementById("imdbVotes").innerText = movie.imdbVotes ? "IMDB Votes: " + movie.imdbVotes : "";
}
