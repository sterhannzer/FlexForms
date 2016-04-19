#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework import routers

from forms.views import SchemaViewSet


router = routers.DefaultRouter()
router.register(r'schema', SchemaViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
]
