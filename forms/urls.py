#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework import routers

from forms.views import SchemaViewSet, QuestionnaireViewSet, QuestionnaireSummaryView

router = routers.DefaultRouter()
router.register(r'schema', SchemaViewSet)
router.register(r'questionnaire', QuestionnaireViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),

    url(r'^api/summary/(?P<schema_id>\d+)[/]?$', QuestionnaireSummaryView.as_view(), name='summary_details'),
]
