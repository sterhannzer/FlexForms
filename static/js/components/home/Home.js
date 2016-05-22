'use strict';

import React, { Component, PropTypes } from 'react';

import GlobalLayout from './../layouts/GlobalLayout';


export default class Home extends GlobalLayout {
    renderContent() {
        return <div>
            <h1>Checkout out our new questionnaires!</h1>
        </div>;
    }
}
