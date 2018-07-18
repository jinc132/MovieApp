import React, { Component } from 'react'; //import React Component
import { Button } from 'reactstrap';
import _ from 'lodash';
import './style.css';
import ReviewBox from './ReviewBox';
import ReviewList from './ReviewList';

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            toggle: false
        };
    }

    componentDidMount() {
        let movieName = this.props.match.params.name;
        let movArray = this.props.movie;
        console.log(movArray);
        let movObj = _.find(movArray, { name: movieName });
        this.setState({ movie: movObj });
    }

    render() {
        let movie = this.state.movie;
        let buttons = undefined;
        if (!this.props.userStatus) {
            buttons = (
                <div>
                    <Button size="large" color="success" onClick={() => this.props.handleClick(movie)}>Put in Basket</Button>
                    <Button size="large" color="success" onClick={() => this.props.history.push('/login')}>Rate It!</Button>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <Button size="large" color="success" onClick={() => this.props.handleClick(movie)}>Put in Basket</Button>
                    <Button size="large" color="success">Rate It!</Button>
                </div>
            )
        }
        if (!movie) return <h2> No movie specified </h2>

        return (
            <div className="moviePage">
                <main>
                    <div className="info .col-sm-12 .col-md-6 .col-md-offset-3">
                        <h2>{movie.title}</h2>
                        <img src={'http://image.tmdb.org/t/p/w200//' + movie.poster_path} alt={movie.poster_path} />
                        <h3>Release Date</h3>
                        <p>{movie.release_date}</p>
                        <h3>Vote Average</h3>
                        <p>{movie.vote_average}</p>
                    </div>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <div className="buttons">
                        {buttons}
                    </div>
                    <div>
                            <ReviewBox currentUser ={this.props.reviewBox}>
                                    
                            </ReviewBox>
                        <ReviewList currentUser ={this.props.reviewBox}></ReviewList>
                    </div>
                </main>
            </div>
        );
    }
}

export default MoviePage;