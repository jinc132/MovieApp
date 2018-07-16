import React, { Component } from 'react';
import Navbar from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }

    toggleMenu() {
        let toggle = this.state.menu;
        this.setState({
            menu: !toggle
        });
    }

    render() {
        return (
            <div>
                <header>
                    <Menu toggle={() => this.toggleMenu()}/>
                </header>
                <main>
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}

class Menu extends Component {

}
export default App;