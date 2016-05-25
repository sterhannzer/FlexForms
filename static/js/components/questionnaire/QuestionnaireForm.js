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
        this.loadData(
            this.props.schemaUrl + this.props.params.schemaSlug + '/',
            schema => this.setState({
                schema: schema,
                schemaLoaded: true
            })
        );
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
