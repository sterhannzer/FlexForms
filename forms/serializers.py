#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from forms.models import Schema, SchemaField


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
