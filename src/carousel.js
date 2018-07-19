import './style.css';
import React, { Component } from "react";
import Slider from "react-slick";
import firebase from 'firebase/app';

export class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      basketRef: undefined
    };
  }

  componentDidMount() {
    let basketRef = firebase.database().ref('baskets').child(this.props.user.uid);
    basketRef.on('value', (snapshot) => {
      let snap = snapshot.val();
      let keys = Object.keys(snap);
      let array = keys.map((key) => {
        snap[key].key = key;
        return snap[key]
      });
      if (array) {
        this.setState({
          movies: array,
          basketRef: basketRef
        })
      } else {
        return null;
      }
    });
  }

  componentWillUnmount() {
    if (this.state.basketRef) {
      this.state.basketRef.off();
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2
    };
    // let keys = Object.keys(this.state.movies);
    let cards = this.state.movies.map((key) => {
      return <Card movieCard={key} />
    })
    return (
      <div className="carouselCard ">
        <h2> My Basket </h2>
        <Slider {...settings}>

            {cards}

        </Slider>
      </div>
    );
  }
}

class Card extends Component {
  render() {
    let movieCard = this.props.movieCard;
    return (
      <div>
        <div className="carouselCard">
        <div className="card">
          <img className="card-img-top" src={'http://image.tmdb.org/t/p/w185//' + movieCard.poster_path} alt={movieCard.title} />
          <div className="card-body">
            <h3 className="card-title">{movieCard.title}</h3>
            <p className="card-date">{movieCard.release_date}</p>
            <p className="card-popularity">{"Popularity: " + movieCard.popularity}</p>
            <p className="card-review">{"Vote Average: " + movieCard.vote_average}</p>
          </div>
        </div>
        </div>
      </div>
    );
  }


}



export default Carousel