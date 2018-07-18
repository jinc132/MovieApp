import React, { Component } from 'react'; 
import './style.css'; 

export default class ReviewHeader extends Component {
  render() {
    return (
      <header className="container-fluid bg-white p-3 mb-3">
        <div className="text-center">
          <i className="fa fa-comments fa-3x" aria-label="Review logo"></i>
        </div>
        {this.props.children}
      </header>
    );
  }
}
