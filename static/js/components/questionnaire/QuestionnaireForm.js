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
            questionnaireSaved: false,
            isSubmitting: false,
            formValid: true
        }
    }

    getSchemaUrl() {
        return this.props.schemaUrl + this.props.params.schemaSlug + '/';
    }

    componentDidMount() {
        this.loadData(
            this.getSchemaUrl(),
            schema => this.setState({
                schema: schema,
                schemaLoaded: true
            })
        );
    }

    handleSubmit() {
        var errors = document.querySelectorAll(".has-error"),
            isSubmitting = false;

        if (!errors.length) {
            isSubmitting = true;

            this.sendData(
                this.props.questionnaireUrl,
                this.getFormData(),
                response => !!response.url && this.setState({
                    questionnaireSaved: true
                })
            );
        }

        this.setState({
            isSubmitting: isSubmitting,
            formValid: !errors.length
        });
    }

    getFormData() {
        var values = [],
            date = new Date(),
            that = this,
            fieldRefs,
            formData;


        fieldRefs = Object.keys(this.refs).filter(
            field => field.startsWith("questionnaireField")
        );

        fieldRefs.forEach(function (field) {
            var value = that.refs[field].state.value,
                fieldId = that.refs[field].props.field.id;

            if (value) {
                values.push({
                    value: value,
                    field_id: fieldId
                });
            }
        });

        formData = {
            created_date: date.toISOString(),
            schema: this.getSchemaUrl(),
            values: values
        };

        return JSON.stringify(formData);
    }

    renderContent() {
        var form = null;

        if (!this.state.schemaLoaded)
            return <div></div>;

        if (!this.state.schema.url) {
            return this.renderNotFoundMessage();
        }
        else if (this.state.questionnaireSaved) {
            return this.renderSuccessMessage();
        }
        else {
            form = <Form horizontal ref="questionnaireForm">
                {!this.state.formValid ? this.renderValidationMessage() : null}
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

    renderNotFoundMessage() {
        var title = "Questionnaire Not Found!",
            body = "Questionnaire cannot be found in current location. Please " +
            "make sure that you have proper access and questionnaire is still valid.";

        return <Message title={title} body={body} renderAsLayout={false} />;
    }

    renderValidationMessage() {
        var body = "I can't send it! Please validate your data.";

        return <Alert bsStyle="danger">{body}</Alert>
    }

    renderFields() {
        return this.state.schema.fields.map(function (field) {
            return <QuestionnaireField
                field={field}
                key={field.id}
                ref={"questionnaireField" + field.id}
            />
        });
    }

    renderSubmitButton() {
        var text = "Save my answers",
            disabled = false;

        if (this.state.isSubmitting) {
            text = "Saving...";
            disabled = true;
        }

        return <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button onClick={this.handleSubmit.bind(this)} disabled={disabled}>
                    {text}
                </Button>
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
