'use strict';

import React from 'react'
import { render } from 'react-dom'

import Header from './components/Header'
import QuestionnaireForm from './components/QuestionnaireForm'


render(
  <div>
      <Header />
      <div className="container">
          <QuestionnaireForm schemaSlug={window.location.pathname.split('/')[2]} />
      </div>
  </div>,
  document.getElementById('content')
);
