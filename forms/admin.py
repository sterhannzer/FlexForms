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
    readonly_fields = ('fields', 'owner')

    def save_model(self, request, obj, form, change):
        if not change:
            obj.owner = request.user
        super(SchemaAdmin, self).save_model(
            request, obj, form, change
        )


admin.site.register(Schema, SchemaAdmin)
admin.site.register(SchemaField)
admin.site.register(Questionnaire)
admin.site.register(QuestionnaireValue)
