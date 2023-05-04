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

const fillData = response => {
  const movie = response.data.results[0];

  if (!movie) return;

  fillTitle(movie.original_title);
  fillBackdrop(movie.backdrop_path);
};

const fillTitle = value => {
  const title = document.querySelector('.upcoming-movie-title-js');

  title.innerText = value;
};

const fillBackdrop = async backdropPath => {
  try {
    const img = await fetchMovieImage(backdropPath);

    const imgEl = document.querySelector('.upcoming-movie-backdrop-js');

    imgEl.src = URL.createObjectURL(img.data);
  } catch (e) {
    console.log(e);
  }
};

fetchUpcoming();
