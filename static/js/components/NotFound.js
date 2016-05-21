'use strict';

import React, { Component, PropTypes } from 'react'
import { Jumbotron, Button } from 'react-bootstrap';


export default class NotFound extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Questionnaire Not Found!</h1>
                <p>Questionnaire cannot be found in current location. Make sure that you have proper access and questionnaire is still valid.</p>
                <p><Button bsStyle="primary" href={this.props.homeUrl}>Go back to the home page</Button></p>
            </Jumbotron>
        );
    }
}

NotFound.propTypes = {
    homeUrl: React.PropTypes.string
};

NotFound.defaultProps = {
    homeUrl: "/"
};
