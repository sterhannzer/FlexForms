/* global fetch */
'use strict';

import React, { Component, PropTypes } from 'react';

import Header from '../Header';


export default class GlobalLayout extends Component {
    render() {
          return <div>
              <Header />
              <div className="container">
                  {this.renderContent()}
              </div>
          </div>;
    }

    renderContent() {
        return null;
    }

    loadData(url, callback) {
        fetch(url, {})
            .then(response => response.json())
            .then(callback)
            .catch(err => console.error(url, err.toString()));
    }
}
