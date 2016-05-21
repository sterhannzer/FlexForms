#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from forms.models import (
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


class SchemaSerializer(serializers.HyperlinkedModelSerializer):
    fields = SchemaFieldsSerializer(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='forms:schema-detail'
    )

    class Meta:
        model = Schema
        fields = (
            'url',
            'title',
            'description',
            'fields',
        )


class QuestionnaireFieldsSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionnaireValue
        fields = (
            'field_id',
            'value',
        )


class QuestionnaireSerializer(serializers.HyperlinkedModelSerializer):
    values = QuestionnaireFieldsSerializer(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='forms:questionnaire-detail'
    )
    schema = serializers.HyperlinkedRelatedField(
        view_name='forms:schema-detail',
        many=False,
        read_only=True
    )

    class Meta:
        model = Questionnaire
        fields = ('url', 'created_date', 'schema', 'values')
