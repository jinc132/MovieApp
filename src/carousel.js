import Slider from "react-slick";
import React, { Component } from 'react';


class Carousel extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="slider">
        <Slider {...settings}>
          <div>
            <img className="slideimg" src={"img1.jpg"} />
          </div>
          <div>
            <img className="slideimg" src={"img2.jpg"} /> 
          </div>
        </Slider>
      </div>
    );
  }

}


export default Carousel