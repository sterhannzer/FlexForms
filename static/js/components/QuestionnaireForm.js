/* global fetch */
'use strict';

import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import QuestionnaireHeader from './QuestionnaireHeader';


export default class QuestionnaireForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {}
        }
    };

    componentDidMount() {
        this.loadSchema(this.props.schemaSlug);
    }

    render() {
        return <QuestionnaireHeader
            title={this.props.title}
            description={this.props.description}
        />;
    }

    loadSchema(slug) {
        fetch(this.props.schemaUrl + slug, {})
            .then(response => response.json())
            .then(schema => this.setState({ schema: schema }))
            .catch(err => console.error(url, err.toString()));
    }

};

QuestionnaireForm.propTypes = {
    schemaUrl: React.PropTypes.string,
    questionnaireUrl: React.PropTypes.string,
    schemaSlug: React.PropTypes.string
};

QuestionnaireForm.defaultProps = {
    schemaUrl: "/forms/api/schema/",
    questionnaireUrl: "/forms/api/questionnaire/"
};
