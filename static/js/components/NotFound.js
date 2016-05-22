'use strict';

import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import GlobalLayout from './layouts/GlobalLayout'


export default class NotFound extends GlobalLayout {
    renderContent() {
        return (
            <Jumbotron>
                <h1>{this.props.title}</h1>
                <p>{this.props.body}</p>
                <p><Button bsStyle="primary" href={this.props.homeUrl}>Go back to the home page</Button></p>
            </Jumbotron>
        );
    }

    render() {
        if (this.props.renderAsLayout) {
            return super.render();
        }
        return this.renderContent();
    }
}

NotFound.propTypes = {
    homeUrl: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    renderAsLayout: PropTypes.bool
};

NotFound.defaultProps = {
    homeUrl: "/",
    title: "Page Not Found!",
    body: "Page cannot be found. Make sure that you have proper access and page still exists.",
    renderAsLayout: true
};
