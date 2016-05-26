'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/home/Home';
import QuestionnaireForm from './components/questionnaire/QuestionnaireForm';

import Message from './components/Message';


render(
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/questionnaires/:schemaSlug" component={QuestionnaireForm} />
        <Route path="*" component={Message} />
    </Router>,
    document.getElementById('content')
);
