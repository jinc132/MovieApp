import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";



ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));