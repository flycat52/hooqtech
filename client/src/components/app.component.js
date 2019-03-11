import React, { Component } from "react";
import { Route } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import TVShows from "./tvshows.component";
import TVDetails from "./tvdetails.component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    const toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    return (
      <div className="app">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">HOOQ</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">TV Shows</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <Route exact path="/" component={TVShows} />
        <Route path="/tv/:tvId" component={TVDetails} />
      </div>
    );
  }
}

export default App;
