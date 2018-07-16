import React, { Component } from 'react';
import _ from 'lodash';
import MovieRow from './MovieRow';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.searchDatabase = this.searchDatabase.bind(this);
        this.state = {
            movies: [],
            menu: false,
            modal: false,
            singleMovie: {}
        };
    }
    searchDatabase(searchMovie){
        let temp = this;
        let data = MovieRow.movieDatabase(searchMovie);
        data.catch(function (er){
          this.setState({movies:[]});
        }).then((data) => {
          temp.setState({movies: data.results});
        });
    }
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ad1fdbb0dcebf0d1cf8ffbfd5c0eb777&language=en-US&page=1')
            .then((res) => res.json())
            .then((data) => {
                this.setState({ movies: data.results });
            });
    }
    toggleMenu() {
        let toggle = this.state.menu;
        this.setState({
            menu: !toggle
        });
    }

    render() {
        return (
            <div>
                <header>
                <Search search={this.searchDatabase}/>
                </header>
                <main>
                    <div id="movieList" className="col-9">
                        <MovieList movies= {this.state.movies} adoptCallback={(individualMovie) => this.selectedMovie(individualMovie)} />
                        <Popup movie={this.state.singleMovie} toggle={() => this.toggle()} modal={this.state.modal} />
                    </div>
                    <footer>Data from
                        <a href="https://www.themoviedb.org/documentation/api?language=en">The Movie DB</a>
                    </footer>
                </main>
            </div>
        );
    }
    toggle() {
        let mode = this.state.modal;
        this.setState({
            modal: !mode
        });
    }

    selectedMovie(movie) {
        let selectedMovie = _.find(this.state.movies, { 'title': movie });
        this.setState({ singleMovie: selectedMovie, modal: true });
    }
}

class Popup extends Component {
    render() {
        let current = this.props.movie;
        if (current === undefined) return null;

        return (
            <div>
                <Modal className="modalPopup" isOpen={this.props.modal} fade={false} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>{current.title}</ModalHeader>
                    <ModalBody>
                        <img src={'http://image.tmdb.org/t/p/w200//' + current.poster_path} alt={current.poster_path} />
                        <div className="info">
                            <h3>Release Date</h3>
                            <p>{current.release_date}</p>
                            <h3>Vote Average</h3>
                            <p>{current.vote_average}</p>
                        </div>
                        <h3>Overview</h3>
                        <p>{current.overview}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.toggle()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}
class MovieList extends Component {
    render() {
        let movieArray = this.props.movies.map((movieObj) => {
            return <MovieCard key={movieObj.title} movieCard={movieObj} adoptCallback={this.props.adoptCallback} />;
        });
        return (
            <div>
                <div className="movie-deck">
                    {movieArray}
                </div>
            </div>
        );
    }
}

class MovieCard extends Component {
    render() {
        let movieCard = this.props.movieCard;
        return (
            <div className="card">
                <img className="card-img-top" src={'http://image.tmdb.org/t/p/w200//' + movieCard.poster_path} alt={movieCard.title} onClick={(e) => this.props.adoptCallback(movieCard.title)} />
                <div className="card-body">
                    <h3 className="card-title">{movieCard.title}</h3>
                    <p className="card-date">{movieCard.release_date}</p>
                </div>
            </div>
        );
    }
}

class CheckBoxes extends Component {

    handleClick(maxValue) {
        this.props.toggleCallback(maxValue)
    }

    render() {
        return (
            <ol className="checkbox">
                <li onClick={() => this.handleClick(7)}>MUST SEE!! (Rate > 7)</li>
                <li onClick={() => this.handleClick(5)}>Movies to kill time (Rate > 5)</li>
                <li onClick={() => this.handleClick(0)}>See all the movies</li>
            </ol >
        );
    }
}

export class Search extends Component{
    constructor(props){
      super(props);
      this.state = {value: ''};
      this.changeSearch = this.changeSearch.bind(this);
      this.clickButton = this.clickButton.bind(this);
    }
    changeSearch(e){
      this.setState({value: e.target.value});
      console.log(e.target.value)
    }
    clickButton(){
      this.props.search(this.state.value);
      console.log("button")
    }
    render(){
      return(
        <div className = "searchMovie">
          <input type="text" className="search" name="q" placeholder="Search Movie" onChange = {this.changeSearch}/>
          <button type = "button" className = "button" onClick = {this.clickButton}>Search</button>
        </div>
      )
    }
  }

export default App;