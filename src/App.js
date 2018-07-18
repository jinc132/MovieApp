import React, { Component } from 'react';
import MovieRow from './MovieRow';
import MoviePage from './ViewMovie';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import './style.css';
import SignUp from './SignUp';
import firebase from 'firebase/app';
import Carousel from './carousel';


class App extends Component {
    constructor(props) {
        super(props);
        this.searchDatabase = this.searchDatabase.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            selectedMovie: '',
            movies: [],
            isOpen: false,
            loading: true,
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

        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({ user: firebaseUser, loading: false });
            } else {
                this.setState({ user: null, loading: false });
            }
        });
    }
    componentWillUnmount() {
        this.authUnRegFunc();
    }

    handleSignUp(email, password, handle) {
        this.setState({ errorMessage: null });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((firebaseUser) => {
                let user = firebase.auth().currentUser;
                let promise = user.updateProfile({
                    displayName: handle,
                })
                return promise;
            })
            .then(() => console.log("done"))
            .catch((error) => {
                this.setState({ errorMessage: error.message });
            })
    }

    handleSignIn(email, password) {
        this.setState({ errorMessage: null });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err.message });
            })
    }

    handleSignOut() {
        this.setState({ errorMessage: null });

        firebase.auth().signOut()
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err.message });
            })
    }

    render() {
        this.encode(this.state.movies);
        let renderMovieFunction = (routerProps) => {
            return (
                <main>
                    <Search search={this.searchDatabase} />
                    <Carousel />
                    <div id="movieList">
                        <MovieList {...routerProps} movie={this.state.movies} />
                    </div>
                </main>
            );
        }

        let renderMoviePage = (routerProps) => {
            console.log(this.state.movies);
            return (
                <MoviePage {...routerProps} movie={this.state.movies} />
            );
        }

        let subject = null;
        if (this.state.loading) {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            )
        }
        if (!this.state.user) {
            subject = (
                <div className="container">
                    <h1>We are <span>Fun Movies</span></h1>
                    <p>Welcome! Log in to your account or register today to leave a review:</p>
                    <SignUp
                        signUpCall={(email, pass, handle) => this.handleSignUp(email, pass, handle)}
                        signInCall={(email, pass) => this.handleSignIn(email, pass)}
                    />
                </div>
            );
        } else {
            subject = (
                <div>
                    <div>
                        {this.state.user &&
                            <button className="btn btn-warning"
                                onClick={() => this.handleSignOut()}>
                                Log Out {this.state.user.displayName}
                            </button>
                        }
                    </div>
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
                                            <NavLink to="/login" activeClassName="activeLink" className="nav-link">Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="/about" activeClassName="activeLink" className="nav-link">About Us</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' render={renderMovieFunction} />
                                <Route path='/login' component={subject} />
                                <Route path='/movie/:name' render={renderMoviePage} />
                                <Redirect to='/' />
                            </Switch>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <header>
                </header>
                <main>
                    {this.state.errorMessage &&
                        <p className="alert alert-danger">{this.state.errorMessage} </p>}
                    {subject}
                    <footer>Data from
                        <a href="https://www.themoviedb.org/documentation/api?language=en">The Movie DB</a>
                    </footer>
                </main>
            </div>
        );
    }

    encode(movie) {
        movie.map((elem) => {
            let name = elem.title.replace(/\W/g, '_');
            elem.name = name;
        });
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
            return <Redirect push to={'/movie/' + movieCard.name} />;
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