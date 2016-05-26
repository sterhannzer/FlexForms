from django.contrib.auth.models import User
from django.db import models

from adminsortable.models import SortableMixin


class Schema(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField()
    owner = models.ForeignKey(User, null=True)
    is_published = models.BooleanField()

    def __str__(self):
        return self.title

    def questionnaire_url(self):
        return "/questionnaire/{}/".format(self.id)


class SchemaField(SortableMixin):
    TYPES = (
        ('int', 'Integer'),
        ('date', 'Date'),
        ('str', 'String'),
        ('text', 'Text'),
    )
    schema = models.ForeignKey(Schema, related_name='fields')
    label = models.CharField(max_length=64)
    help_text = models.TextField(blank=True)
    type = models.CharField(max_length=4, choices=TYPES, default='char')
    is_required = models.BooleanField()
    initial_value = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0, editable=False, db_index=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


class Questionnaire(models.Model):
    created_date = models.DateTimeField()
    schema = models.ForeignKey(Schema)


class QuestionnaireValue(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, related_name='values')
    field_id = models.IntegerField()
    value = models.TextField()
