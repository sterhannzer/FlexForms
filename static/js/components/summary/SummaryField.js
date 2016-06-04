'use strict';

import React, { Component, PropTypes } from 'react';


export default class SummaryField extends Component {

    render() {
        var type = this.props.field.type,
            average = null,
            answers = "";

        if (type == 'int') {
            average = <span>
                <dt>{"Average"}</dt>
                <dd>{this.props.field.average}</dd>
            </span>;

        }

        for (var i = 0; i < this.props.field.values.length; i++) {
            answers += this.props.field.values[i] + ", ";
        }

        return <dl className="dl-horizontal">
            <dt>{"Field name"}</dt>
            <dd>{this.props.field.label}</dd>
            <dt>{"Answers"}</dt>
            <dd>{answers}</dd>
            {average}
        </dl>;
    }
}

SummaryField.propTypes = {
    field: PropTypes.object
};
