#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from forms.models import Schema, Questionnaire, SchemaField, QuestionnaireValue

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
        result = []
        if not self.schema:
            return
        schema_fields = SchemaField.objects.filter(schema=self.schema)

        for schema_field in schema_fields:
            field_result = {
                'label': schema_field.label,
                'type': schema_field.type,
                'values': []
            }
            field_values = QuestionnaireValue.objects.filter(field_id=schema_field.id)

            values = field_result['values']
            for value in field_values:
                if field_result['type'] == 'int':
                    values.append(int(value.value))
                else:
                    values.append(value.value)

            if len(values) and field_result['type'] == 'int':
                field_result['average'] = sum(values)/len(values)

            result.append(field_result)
        return result


class QuestionnaireSummaryView(APIView):

    def get(self, request, *args, **kwargs):
        summary = QuestionnaireSummary(schema_id=kwargs.get('schema_id'))
        result = summary.fetch()
        return Response(result, status=200, content_type="application/json")
