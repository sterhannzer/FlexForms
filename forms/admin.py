from django.contrib import admin
from django.db import models
from django.forms import Textarea

from forms.models import (
    Schema,
    SchemaField,
    Questionnaire,
    QuestionnaireValue
)


class SchemaFieldInline(admin.TabularInline):
    model = SchemaField
    extra = 1
    formfield_overrides = {
        models.TextField: {
            'widget': Textarea(attrs={'rows': 1, 'cols': 30})
        }
    }


class SchemaAdmin(admin.ModelAdmin):
    save_as = True
    list_display = ('title', 'owner')
    readonly_fields = ('owner',)
    inlines = (SchemaFieldInline,)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.owner = request.user
        super(SchemaAdmin, self).save_model(
            request, obj, form, change
        )


admin.site.register(Schema, SchemaAdmin)
admin.site.register(Questionnaire)
admin.site.register(QuestionnaireValue)
