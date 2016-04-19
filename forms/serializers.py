#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from forms.models import Schema


class SchemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schema
        fields = ('title', 'description', 'owner', 'id')
