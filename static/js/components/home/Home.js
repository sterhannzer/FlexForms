'use strict';

import React, { Component, PropTypes } from 'react';
import { PageHeader } from 'react-bootstrap';

import GlobalLayout from './../layouts/GlobalLayout';


export default class Home extends GlobalLayout {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            dataLoaded: false
        }
    };

    componentDidMount() {
        this.loadData(
            this.props.schemaUrl,
            data => this.setState({
                data: data,
                dataLoaded: true
            })
        );
    }

    renderContent() {
        var questionnaires = this.state.dataLoaded ? this.renderQuestionnaires() : null;

        if (this.state.dataLoaded && questionnaires && !questionnaires.length) {
            questionnaires = <p>{"No questionnaires at this moment, please come back later."}</p>
        }

        return <div>
            <PageHeader>Checkout out our new questionnaires!</PageHeader>
            {questionnaires}
        </div>;
    }

    renderQuestionnaires() {
        return this.state.data.map(function (schema) {
            return <div key={schema.id}>
                <div className="container">
                    <h3><a href={"/questionnaires/" + schema.id}>{schema.title}</a></h3>
                    <p>{schema.description}</p>
                </div>
            </div>;
        });
    }
}


Home.propTypes = {
    schemaUrl: React.PropTypes.string
};

Home.defaultProps = {
    schemaUrl: "/forms/api/schema/"
};
