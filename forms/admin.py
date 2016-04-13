from django.contrib import admin
from forms.models import (
    Schema,
    SchemaField,
    Questionnaire,
    QuestionnaireValue
)


class SchemaAdmin(admin.ModelAdmin):
    save_as = True
    list_display = ('title', 'owner')
    readonly_fields = ('fields',)


admin.site.register(Schema, SchemaAdmin)
admin.site.register(SchemaField)
admin.site.register(Questionnaire)
admin.site.register(QuestionnaireValue)
