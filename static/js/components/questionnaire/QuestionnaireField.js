'use strict';

import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';


export default class QuestionnaireField extends Component {
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

        return <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                {this.props.field.label}
            </Col>
            <Col sm={9}>
                <FormControl
                    componentClass={field}
                    type={type}
                    placeholder={this.props.field.help_text}
                    defaultValue={this.props.field.initial_value}
                />
            </Col>
        </FormGroup>
    }
}

QuestionnaireField.propTypes = {
    field: PropTypes.object
};
