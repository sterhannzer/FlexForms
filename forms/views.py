#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import viewsets
from forms.models import Schema, Questionnaire

from forms.serializers import SchemaSerializer, QuestionnaireSerializer


class SchemaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schema.objects.all()
    serializer_class = SchemaSerializer


class QuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
