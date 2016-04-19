#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import viewsets
from forms.models import Schema

from forms.serializers import SchemaSerializer


class SchemaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schema.objects.all()
    serializer_class = SchemaSerializer
