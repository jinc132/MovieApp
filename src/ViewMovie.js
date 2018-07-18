import React, { Component } from 'react'; //import React Component
import { Button } from 'reactstrap';
import _ from 'lodash';
import './style.css';

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: undefined };
    }

    componentDidMount() {
        let movieName = this.props.match.params.name;
        let movArray = this.props.movie;
        let movObj = _.find(movArray, { name: movieName });
        this.setState({ movie: movObj });
    }

    render() {
        let movie = this.state.movie;
        if (!movie) return <h2> No movie specified </h2>
        return (
            <div className="moviePage">
                <main>
                    <div className="info col-3">
                        <h2>{movie.title}</h2>
                        <img src={'http://image.tmdb.org/t/p/w200//' + movie.poster_path} alt={movie.poster_path} />
                        <h3>Release Date</h3>
                        <p>{movie.release_date}</p>
                        <h3>Vote Average</h3>
                        <p>{movie.vote_average}</p>
                    </div>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <div className="container">
                        <Button size="large" color="primary">Put in Basket</Button>
                        <Button size="large" color="second">Rate It!</Button>
                    </div>
                </main>
            </div>
        );
    }
}

export default MoviePage;