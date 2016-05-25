'use strict';

import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, Button, Alert } from 'react-bootstrap';

import GlobalLayout from '../layouts/GlobalLayout';
import NotFound from '../NotFound';

import QuestionnaireHeader from './QuestionnaireHeader';
import QuestionnaireField from './QuestionnaireField';


export default class QuestionnaireForm extends GlobalLayout {
    constructor(props) {
        super(props);
        this.state = {
            schema: {},
            schemaLoaded: false,
            submitted: false,
            formValid: false
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

    handleSubmit(e) {
        var errors = document.querySelectorAll(".has-error"),
            isValid = false;

        if (!errors.length) {
            isValid = true
        }

        this.setState({
            submitted: true,
            formValid: isValid
        });
    }

    renderContent() {
        var form = null;

        if (this.state.schemaLoaded && !this.state.schema.url) {
            return this.renderNotFoundMessage();
        } else if (this.state.schemaLoaded) {
            form = <Form horizontal ref="questionnaireForm">
                {this.renderErrorMessage()}
                {this.renderFields()}
                {this.renderSubmitButton()}
            </Form>;
        }

        return <div>
            <QuestionnaireHeader
                title={this.state.schema.title}
                description={this.state.schema.description}
            />
            <div className="container">
                {form}
            </div>
        </div>;
    }

    renderNotFoundMessage() {
        var title = "Questionnaire Not Found!",
            body = "Questionnaire cannot be found in current location. Please " +
            "make sure that you have proper access and questionnaire is still valid.";

        return <NotFound title={title} body={body} renderAsLayout={false} />;
    }

    renderErrorMessage() {
        if (this.state.submitted && !this.state.formValid) {
            return <Alert bsStyle="danger">{"I can't send it! Please validate your data."}</Alert>
        }
    }

    renderFields() {
        return this.state.schema.fields.map(function (field) {
            return <QuestionnaireField field={field} key={field.id} />
        });
    }

    renderSubmitButton() {
        return <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button onClick={this.handleSubmit.bind(this)}>{"Save my answers"}</Button>
            </Col>
        </FormGroup>;
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
