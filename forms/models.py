from django.contrib.auth.models import User
from django.db import models


class Schema(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField()
    owner = models.ForeignKey(User)
    fields = models.TextField(blank=True)

    def __str__(self):
        return self.title


class SchemaField(models.Model):
    TYPES = (
        ('int', 'Integer'),
        ('char', 'CharField')
    )
    schema = models.ForeignKey(Schema)
    label = models.CharField(max_length=64)
    help_text = models.TextField()
    type = models.CharField(max_length=4, choices=TYPES)
    is_required = models.BooleanField()
    initial_value = models.TextField()
    order = models.IntegerField()


class Questionnaire(models.Model):
    created_date = models.DateTimeField()
    schema = models.ForeignKey(Schema)
    values = models.TextField(blank=True)


class QuestionnaireValue(models.Model):
    questionnaire = models.ForeignKey(Questionnaire)
    field_id = models.IntegerField()
    value = models.TextField()
