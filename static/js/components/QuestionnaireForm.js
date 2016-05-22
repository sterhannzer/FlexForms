/* global fetch */
'use strict';

import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import QuestionnaireHeader from './QuestionnaireHeader';
import NotFound from './NotFound'


export default class QuestionnaireForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            schemaLoaded: false
        }
    };

    componentDidMount() {
        this.loadSchema(this.props.schemaSlug);
    }

    render() {
        if (this.state.schemaLoaded && !this.state.schema.url) {
            return <NotFound />;
        }

        return <QuestionnaireHeader
            title={this.state.schema.title}
            description={this.state.schema.description}
        />;
    }

    loadSchema(slug) {
        fetch(this.props.schemaUrl + slug, {})
            .then(response => response.json())
            .then(schema => this.setState({
                schema: schema,
                schemaLoaded: true
            }))
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
