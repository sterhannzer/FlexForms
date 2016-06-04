#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from django.contrib.auth.decorators import login_required
from rest_framework import routers

from forms.views import SchemaViewSet, QuestionnaireViewSet, QuestionnaireSummaryView

router = routers.DefaultRouter()
router.register(r'schema', SchemaViewSet)
router.register(r'questionnaire', QuestionnaireViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),

    url(r'^api/v1/summary/(?P<schema_id>\d+)[/]?$', login_required(QuestionnaireSummaryView.as_view()), name='summary_details'),
]
