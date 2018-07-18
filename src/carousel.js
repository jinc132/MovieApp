import './style.css';
import React, { Component } from "react";
import Slider from "../src/slider";

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slidesToShow: 3,
      slidesToScroll: 3
    };
<<<<<<< Updated upstream
=======
    let movieBackDrops = topFive.map((elem) => {
      return (
        <div key= {elem.id}>
          <img src={'http://image.tmdb.org/t/p/w500//' + elem.backdrop_path} alt={elem.title + 'image'} />
        </div>
      )
    });
>>>>>>> Stashed changes
    return (
      <div>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

export default Carousel