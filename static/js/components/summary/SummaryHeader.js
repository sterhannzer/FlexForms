'use strict';

import React, { Component, PropTypes } from 'react';
import { PageHeader } from 'react-bootstrap';


export default class SummaryHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader>Summary for: {this.props.title}</PageHeader>
                <p className="lead">{this.props.description}</p>
            </div>
        );
    }
}

SummaryHeader.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};
