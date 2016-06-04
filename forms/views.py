#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from forms.models import Schema, Questionnaire

from forms.serializers import SchemaSerializer, QuestionnaireSerializer


class SchemaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schema.objects.filter(is_published=True).order_by('-id')
    serializer_class = SchemaSerializer


class QuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer


class QuestionnaireSummary(object):
    schema = None

    def __init__(self, schema_id=None):
        if schema_id:
            self.schema = Schema.objects.get(id=schema_id)

    def fetch(self):
        if not self.schema:
            return

        return []


class QuestionnaireSummaryView(APIView):

    def get(self, request, *args, **kwargs):
        summary = QuestionnaireSummary(schema_id=kwargs.get('schema_id'))
        result = summary.fetch()
        return Response(result, status=200)
