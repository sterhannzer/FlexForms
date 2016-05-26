'use strict';

import React, { Component, PropTypes } from 'react'
import { Nav, NavItem, Navbar } from 'react-bootstrap';


export default class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href={this.props.appUrl}>{this.props.appTitle}</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} href={this.props.adminUrl}>{this.props.adminTitle}</NavItem>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

Header.propTypes = {
    appTitle: React.PropTypes.string,
    appUrl: React.PropTypes.string,
    adminTitle: React.PropTypes.string,
    adminUrl: React.PropTypes.string
};

Header.defaultProps = {
    appTitle: "Questionnaire App",
    appUrl: "/",
    adminTitle: "Administration",
    adminUrl: "/admin/"
};
