#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from forms.models import  (
    Schema, SchemaField,
    QuestionnaireValue,
    Questionnaire
)


class SchemaFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchemaField
        fields = (
            'label',
            'help_text',
            'type',
            'is_required',
            'initial_value',
            'order',
            'id',
        )


class SchemaSerializer(serializers.ModelSerializer):
    fields = SchemaFieldsSerializer(many=True, read_only=True)

    class Meta:
        model = Schema
        fields = ('title', 'description', 'owner', 'id', 'fields')


class QuestionnaireFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireValue
        fields = (
            'questionnaire',
            'field_id',
            'value'
        )


class QuestionnaireSerializer(serializers.ModelSerializer):
    values = QuestionnaireFieldsSerializer(many=True, read_only=True)

    class Meta:
        model = Questionnaire
        fields = ('id', 'created_date', 'schema', 'values')
