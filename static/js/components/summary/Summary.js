'use strict';

import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, Button, Alert } from 'react-bootstrap';

import GlobalLayout from '../layouts/GlobalLayout';
import Message from '../Message';

import SummaryHeader from './SummaryHeader';
import SummaryField from './SummaryField';


export default class Summary extends GlobalLayout {
    constructor(props) {
        super(props);
        this.state = {
            summaryData: [],
            schemaData: {},
            summaryLoaded: false,
            schemaLoaded: false
        }
    }

    getSummaryUrl() {
        return this.props.summaryUrl + this.props.params.schemaSlug + '/';
    }

    getSchemaUrl() {
        return this.props.schemaUrl + this.props.params.schemaSlug + '/';
    }

    componentDidMount() {
        this.loadData(
            this.getSummaryUrl(),
            data => this.setState({
                summaryData: data,
                summaryLoaded: true
            })
        );

        this.loadData(
            this.getSchemaUrl(),
            data => this.setState({
                schemaData: data,
                schemaLoaded: true
            })
        );
    }

    renderFields() {
        return this.state.summaryData.map(function (field) {
            return <SummaryField
                field={field}
                key={field.id}
                ref={"summaryField" + field.id}
            />
        });
    }

    renderContent() {
        if (!this.state.schemaLoaded || !this.state.summaryLoaded)
            return <div></div>;

        else if (!this.state.schemaData.url || !this.state.summaryData.length)
            return this.renderNotFoundMessage();

        return <div>
            <SummaryHeader
                title={this.state.schemaData.title}
                description={this.state.schemaData.description}
            />
            <div className="container">
                {this.renderFields()}
            </div>
        </div>;
    }

    renderNotFoundMessage() {
        var title = "Questionnaire Not Found!",
            body = "Questionnaire cannot be found in current location. Please " +
            "make sure that you have proper access and questionnaire is still valid.";

        return <Message title={title} body={body} renderAsLayout={false} />;
    }
};

Summary.propTypes = {
    schemaUrl: React.PropTypes.string,
    questionnaireUrl: React.PropTypes.string,
    schemaSlug: React.PropTypes.string
};

Summary.defaultProps = {
    summaryUrl: "/forms/api/summary/",
    schemaUrl: "/forms/api/schema/"
};
