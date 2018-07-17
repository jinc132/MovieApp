import React, { Component } from 'react'; //import React Component
import { Button } from 'reactstrap';
import _ from 'lodash';

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: undefined };
    }

    componentDidMount() {
        let movieName = this.props.match.params.title;
        //let movObj = _.find(data.results, { title: movieName });
        //this.setState({ movies: movObj });
    }

    render() {
        let movie = this.state.movie;
        if (!movie) return <h2> No movie specified </h2>
        return (
            <div>
                <h2>{movie.title}</h2>
                <img src={'http://image.tmdb.org/t/p/w200//' + movie.poster_path} alt={movie.poster_path} />
                <div className="info">
                    <h3>Release Date</h3>
                    <p>{movie.release_date}</p>
                    <h3>Vote Average</h3>
                    <p>{movie.vote_average}</p>
                </div>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <div className="container">
                    <Button disabled size="large" color="primary">Compare</Button>
                    <Button disabled size="large" color="second">Rate</Button>
                </div>
            </div>
        );
    }
}

export default MoviePage;