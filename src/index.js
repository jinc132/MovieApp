import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import App from './App';


// let myIndex = 0;
// carousel();


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));