import 'whatwg-fetch';

const apiKey = "ad1fdbb0dcebf0d1cf8ffbfd5c0eb777";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w185"; 

let movieRow = {
  movieDatabase: function(search) {
    let databaseUrl = baseUrl + '/search/movie?api_key=' + apiKey + '&query=' + search;
    return fetch(databaseUrl)
    .then(function(element) { 
        return element.json();
    });
  },

  popularMovie: function(){
    let popMovieUrl = baseUrl + '/discover/movie?api_key=' + apiKey + '&sort_by=vote_count.desc';
    return fetch(popMovieUrl)
    .then(function(e) { 
      return e.json()
    });
  },
  
  poster: function(movie){
    if(movie.poster_path){
      return imageUrl + movie.poster_path;
    }else{
      return "";
    }
  }
}
export default movieRow;


