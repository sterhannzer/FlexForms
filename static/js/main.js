'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home/Home';
import QuestionnaireForm from './components/questionnaire/QuestionnaireForm';

import NotFound from './components/NotFound';


render(
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/questionnaires/:schemaSlug" component={QuestionnaireForm} />
        <Route path="*" component={NotFound} />
    </Router>,
    document.getElementById('content')
);
