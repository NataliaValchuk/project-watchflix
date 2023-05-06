import { RequestServer } from './requestServer';

const requestServer = new RequestServer();

const fetchUpcoming = async () => {
  try {
    const response = await requestServer.newFilms();

    fillData(response);
  } catch (error) {
    console.error(error);
  }
};

const fetchMovieImage = async path => await requestServer.movieImage(path);

const fillData = async response => {
  const movies = response.data.results;
  const movie = movies[Math.round(Math.random() * movies.length)];

  if (!movie) return;

  fillTitle(movie.original_title);
  fillBackdrop(movie.backdrop_path);
  fillReleaseDate(movie.release_date);
  fillVote(movie.vote_average, movie.vote_count);
  fillPopularity(movie.popularity);

  const genresResponse = await requestServer.movieGenre();
  const genres = movie.genre_ids.map(id =>
    genresResponse.data.genres.find(genre => genre.id === id)
  );

  fillGenre(genres);
  fillAbout(movie.overview);
};

const fillReleaseDate = value => {
  const releaseDate = document.querySelector('.release-date-js');

  releaseDate.innerText = `Release Date ${value}`;
};

const fillVote = (voteAverage, voteCount) => {
  const vote = document.querySelector('.vote-js');

  vote.innerText = `Vote / Votes ${voteAverage}/${voteCount}`;
};

const fillPopularity = value => {
  const popularity = document.querySelector('.popularity-js');

  popularity.innerText = `Popularity ${value}`;
};

const fillGenre = genres => {
  const genre = document.querySelector('.genre-js');

  genre.innerText = `Genre ${genres.map(genre => genre.name).join(', ')}`;
};

const fillAbout = value => {
  const about = document.querySelector('.about-js');

  about.innerText = `About ${value}`;
};

const fillTitle = value => {
  const title = document.querySelector('.upcoming-movie-title-js');

  title.innerText = value;
};

const fillBackdrop = async backdropPath => {
  const img = document.querySelector('.upcoming-movie-backdrop-js');

  img.src = `https://image.tmdb.org/t/p/original${backdropPath}`;
};

fetchUpcoming();
