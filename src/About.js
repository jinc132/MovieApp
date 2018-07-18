import React, { Component } from 'react';
import AboutCarousel from './AboutCarousel';

class About extends Component{
    render(){
        return(
            <main>   
                    <AboutCarousel/>
                    <div className="aboutContent">
                        <h2>About MovRate</h2>
                            <div className="aboutParagraph">
                                <p>MovRate is a web-application that enables users to rate movies and compare multiple movies in a single page.</p>
                                <p>Users can not only see the current playing movies on the main page, but they can even search for all movies</p>
                                <p>in the database.</p>
                            </div>
                    </div>
            </main>
            
            <footer>Data from
                <a href="https://www.themoviedb.org/documentation/api?language=en">The Movie DB</a>
            </footer>
        )
    }
}

export default About 