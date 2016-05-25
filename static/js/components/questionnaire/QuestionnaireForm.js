'use strict';

import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, Button } from 'react-bootstrap';

import GlobalLayout from '../layouts/GlobalLayout';
import NotFound from '../NotFound';

import QuestionnaireHeader from './QuestionnaireHeader';
import QuestionnaireField from './QuestionnaireField';


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
        var form = null;

        if (this.state.schemaLoaded && !this.state.schema.url) {
            return <NotFound
                title={"Questionnaire Not Found!"}
                body={"Questionnaire cannot be found in current location. Please make sure that you have proper access and questionnaire is still valid."}
                renderAsLayout={false}
            />;
        } else if (this.state.schemaLoaded) {
            form = <Form horizontal>
                {this.renderFields()}
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">{"Save my answers"}</Button>
                    </Col>
                </FormGroup>
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

    renderFields() {
        return this.state.schema.fields.map(function (field) {
            return <QuestionnaireField field={field} key={field.id} />
        });
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
