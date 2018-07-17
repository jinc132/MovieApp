import React, { Component } from 'react';
import MovieRow from './MovieRow';
import MoviePage from './ViewMovie';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import { Route, Switch, Redirect, NavLink} from 'react-router-dom';
import './style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.searchDatabase = this.searchDatabase.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            movies: [],
            isOpen: false
        };
    }

    searchDatabase(searchMovie) {
        let temp = this;
        let data = MovieRow.movieDatabase(searchMovie);
        data.catch(function (er) {
            this.setState({ movies: [] });
        }).then((data) => {
            temp.setState({ movies: data.results });
        });
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ad1fdbb0dcebf0d1cf8ffbfd5c0eb777&language=en-US&page=1')
            .then((res) => res.json())
            .then((data) => {
                this.setState({ movies: data.results });
            });
    }

    render() {
        let renderMovieFunction = (routerProps) => {
            return (
                <div>
                    <main>
                        <Search search={this.searchDatabase} />
                        <div id="movieList" className="col-9">
                            <MovieList {...routerProps} movies={this.state.movies} />
                        </div>
                    </main>
                </div>
            );
        }
        return (
            <div>
                <header>
                    <div>
                        <div>
                            <Navbar color="light" light expand="md">
                                <NavbarBrand href="/"><i className="fa fa-film"> MovRate</i></NavbarBrand>
                                <NavbarToggler onClick={this.toggleMenu} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink exact to="/" activeClassName="activeLink" className="nav-link">View Movies</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="/about" activeClassName="activeLink" className="nav-link">About Us</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                        <div className="col-9">
                            <Switch>
                                <Route exact path='/' render={renderMovieFunction} />
                                {/* <Route path='/login' component={} /> */}
                                <Route path='/movie/:title' component={MoviePage} />
                                <Redirect to='/' />
                            </Switch>
                        </div>
                    </div>
                </header>
                <main>
                    <footer>Data from
                        <a href="https://www.themoviedb.org/documentation/api?language=en">The Movie DB</a>
                    </footer>
                </main>
            </div>
        );
    }

    toggleMenu() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

class MovieList extends Component {
    render() {
        let movies = this.props.movies;
        let movieArray = movies.map((movieObj) => {
            return <MovieCard key={movieObj.title} movieCard={movieObj} />;
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
    constructor(props) {
        super(props);
        this.state = { shouldRedirect: false };
    }

    handleClick() {
        this.setState({ shouldRedirect: true });
    }

    render() {
        let movieCard = this.props.movieCard;

        if (this.state.shouldRedirect) {
            return <Redirect push to={'/movie/' + movieCard.title} />;
        }
        return (
            <div className="card" onClick={() => this.handleClick()}>
                <img className="card-img-top" src={'http://image.tmdb.org/t/p/w200//' + movieCard.poster_path} alt={movieCard.title} />
                <div className="card-body">
                    <h3 className="card-title">{movieCard.title}</h3>
                    <p className="card-date">{movieCard.release_date}</p>
                </div>
            </div>
        );
    }
}

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.changeSearch = this.changeSearch.bind(this);
        this.clickButton = this.clickButton.bind(this);
    }
    changeSearch(e) {
        this.setState({ value: e.target.value });
        console.log(e.target.value)
    }
    clickButton() {
        this.props.search(this.state.value);
        console.log("button")
    }
    render() {
        return (
            <div className="searchMovie">
                <input type="text" className="search" name="q" placeholder="Search Movie" onChange={this.changeSearch} />
                <button type="button" className="button" onClick={this.clickButton}><i className="fa fa-search" onClick={this.clickButton}></i></button>
            </div>
        )
    }
}

export default App;