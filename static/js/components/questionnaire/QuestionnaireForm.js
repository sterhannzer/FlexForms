/* global fetch */
'use strict';

import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

import GlobalLayout from '../layouts/GlobalLayout';
import NotFound from '../NotFound';

import QuestionnaireHeader from './QuestionnaireHeader';


export default class QuestionnaireForm extends GlobalLayout {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            schemaLoaded: false
        }
    };

    componentDidMount() {
        this.loadSchema(this.props.params.schemaSlug);
    }

    renderContent() {
        if (this.state.schemaLoaded && !this.state.schema.url) {
            return <NotFound
                title={"Questionnaire Not Found!"}
                body={"Questionnaire cannot be found in current location. Please make sure that you have proper access and questionnaire is still valid."}
                renderAsLayout={false}
            />;
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
            .catch(err => console.error(slug, err.toString()));
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
