'use strict';

import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, Button, Alert } from 'react-bootstrap';

import GlobalLayout from '../layouts/GlobalLayout';
import Message from '../Message';

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

        if (!this.state.schemaLoaded)
            return <div></div>;

        if (!this.state.schema.url) {
            return this.renderMessageMessage();
        }
        else if (this.state.formValid) {
            return this.renderSuccessMessage();
        }
        else {
            form = <Form horizontal ref="questionnaireForm">
                {this.state.submitted && !this.state.formValid ? this.renderErrorMessage() : null}
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

    renderSuccessMessage() {
        var title = "Congratulations!",
            body = "Your answers has been saved. Thank you for sharing with us your " +
                "opinion. We really appreciate your time and effort.";

        return <Message title={title} body={body} renderAsLayout={false} />;
    }

    renderMessageMessage() {
        var title = "Questionnaire Not Found!",
            body = "Questionnaire cannot be found in current location. Please " +
            "make sure that you have proper access and questionnaire is still valid.";

        return <Message title={title} body={body} renderAsLayout={false} />;
    }

    renderErrorMessage() {
        var body = "I can't send it! Please validate your data.";

        return <Alert bsStyle="danger">{body}</Alert>
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
