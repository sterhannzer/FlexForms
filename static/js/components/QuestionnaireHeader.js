'use strict';

import React, { Component, PropTypes } from 'react';
import { PageHeader } from 'react-bootstrap';


export default class QuestionnaireHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader>{this.props.title}</PageHeader>
                <p className="lead">{this.props.description}</p>
            </div>
        );
    }
}

QuestionnaireHeader.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};
