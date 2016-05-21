'use strict';

import React from 'react'
import { render } from 'react-dom'

import Header from './components/Header'
import NotFound from './components/NotFound'

render(
  <div>
      <Header />
      <div className="container">
          <NotFound />
      </div>
  </div>,
  document.getElementById('content')
);
