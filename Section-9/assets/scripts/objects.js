
'use strict';
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];
const renderMovies = (filter='') => {
    const movieList = document.getElementById('movie-list');
    if(movies.length === 0){
        movieList.classList.remove('visible');
        return;
    }else{
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));
    console.log("filtered", filteredMovies); 
    filteredMovies.forEach((movie) => {
        //I want to create new elements new dom nodes for every movie
        const movieEl = document.createElement('li');
        if(!movie.info === undefined){
             //We have no info property
        }
        if(!('info' in movie)){
            console.log('info exist in movie');
        } 
        const {info, ...otherProps } = movie;

        console.log(otherProps);
        // const { title: movieTitle } = info;
        

         for(const key in info){>
             if(key !== 'title'){
                //`` <- string literals
                 text = text + `${key}: ${info[key]}`;
             }
            }
            movieEl.textContent = text;
            movieList.append(movieEl);
    })
};


const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;
    if(title.trim() === '' || extraName.trim() === '' || extraValue.trim() === ''){
        return;
    }
    const newMovie = { 
        info: {
            title,
             [extraName]: extraValue
        },  
        id: Math.random().toString(),
        getFormattedTitle: function(){
            return this.info.title.toUpperCase();
        }
    };
    movies.push(newMovie);
    renderMovies();
};

const searchMovieHandler = () =>{
    const filterData = document.getElementById('filter-title').value;
    renderMovies(filterData);
};
addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click',  searchMovieHandler);