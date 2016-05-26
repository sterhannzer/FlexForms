#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from forms.models import (
    Schema, SchemaField,
    QuestionnaireValue,
    Questionnaire
)


class SchemaFieldSerializer(serializers.ModelSerializer):
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
    fields = SchemaFieldSerializer(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='forms:schema-detail'
    )

    class Meta:
        model = Schema
        fields = (
            'id',
            'url',
            'title',
            'description',
            'fields',
        )


class QuestionnaireValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireValue
        fields = (
            'field_id',
            'value',
        )


class QuestionnaireSerializer(serializers.HyperlinkedModelSerializer):
    values = QuestionnaireValueSerializer(many=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='forms:questionnaire-detail'
    )
    schema = serializers.HyperlinkedRelatedField(
        view_name='forms:schema-detail',
        queryset=Schema.objects.all()
    )

    class Meta:
        model = Questionnaire
        fields = ('url', 'created_date', 'schema', 'values')

    def create(self, validated_data):
        values = validated_data.pop('values')
        questionnaire = super(QuestionnaireSerializer, self).create(validated_data)
        for value in values:
            QuestionnaireValue.objects.create(
                field_id=value.get('field_id', ''),
                value=value.get('value', ''),
                questionnaire=questionnaire
            )
        return questionnaire
