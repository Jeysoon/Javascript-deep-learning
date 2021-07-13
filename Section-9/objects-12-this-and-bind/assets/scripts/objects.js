"use strict";
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  } 
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie;
    console.log(otherProps);
    // const { title: movieTitle } = info;
    let { getFormattedTitle } = movie;
    /*
    How is call() different from bind() then
    well bind prepares a functions for future executions bind returns a new function object in the end wich we can store in constants   
    */
    //getFormattedTitle = getFormattedTitle.bind(movie);

    let text = getFormattedTitle.call(movie) + ' - '; 
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  console.log(this);
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if ( 
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      set title(val){
        if(val.trim() === ''){
          this._title = 'DEFAULT';
          return;
        }
        //this._title is an internal property created on the fly 
        this._title = val;
      }, 
      get title() {
        return this._title.toUpperCase();
      },
      [extraName]: extraValue
    },
    id: Math.random().toString(),
    getFormattedTitle()  {
      console.log('getFormattedTitle this',this); 
      return this.info.title.toUpperCase();
    }
  };

  //Writing to the setter or assigning a value
  newMovie.info.title = title;

  //Reading from a getter
  console.log(newMovie.info.title);

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  console.log("search", this);
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
