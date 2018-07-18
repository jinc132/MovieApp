import Slider from "react-slick";
import React, { Component } from 'react';
import './style.css';

class Carousel extends Component {
  findTopFive() {
    let movie = this.props.movies;
    let topMovie = movie.filter(function (elem) {
      return elem.vote_average > 7;
    });
    return topMovie;
  }

  render() {
    let topFive = this.findTopFive();
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    let movieBackDrops = topFive.map((elem) => {
      return (
        <div>
          <img key= {elem.id} src={'http://image.tmdb.org/t/p/w500//' + elem.backdrop_path} alt={elem.title + 'image'} />
        </div>
      )
    });
    return (
      <div className="slider">
        <h2>Top Movies</h2>
        <Slider {...settings}>
          {movieBackDrops}
        </Slider>
      </div>
    );
  }

}


export default Carousel