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
                    <Menu toggle={() => this.toggleMenu()} />
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
    render() {
        return (
            <div>
                <Navbar>
                    <Nav>
                        <NavDropdown eventKey={3} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav >
                </Navbar >
            </div>
        );
    }

}
export default App;