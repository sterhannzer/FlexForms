# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-19 19:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0004_auto_20160419_1824'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schemafield',
            name='schema',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='forms.Schema'),
        ),
    ]