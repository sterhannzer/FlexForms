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
}
