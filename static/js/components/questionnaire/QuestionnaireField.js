'use strict';

import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';


export default class QuestionnaireField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.field.initial_value
        }
    }

    getValidationState() {
        var isRequired = this.props.field.is_required,
            length = this.state.value.length;

        if (isRequired && length == 0) return 'error';
    }

    isValid() {
        return this.getValidationState() !== 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        var field = 'input',
            type = 'text';

        if (this.props.field.type == 'text') {
            field = 'textarea';
        } else if (this.props.field.type == 'date') {
            type = 'date';
        } else if (this.props.field.type == 'int') {
            type = 'number';
        }

        return <FormGroup validationState={this.getValidationState()}>
            <Col componentClass={ControlLabel} sm={2}>
                {this.props.field.label}
            </Col>
            <Col sm={9}>
                <FormControl
                    componentClass={field}
                    type={type}
                    placeholder={this.props.field.help_text}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                />
            </Col>
        </FormGroup>
    }
}

QuestionnaireField.propTypes = {
    field: PropTypes.object
};
