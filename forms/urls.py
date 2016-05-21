#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework import routers

from forms.views import SchemaViewSet, QuestionnaireViewSet

router = routers.DefaultRouter()
router.register(r'schema', SchemaViewSet)
router.register(r'questionnaire', QuestionnaireViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^(?P<id>\d+)$', TemplateView.as_view(template_name="base.html")),
]
