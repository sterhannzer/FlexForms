from django.contrib import admin
from django.db import models
from django.forms import Textarea

from adminsortable.admin import (
    NonSortableParentAdmin,
    SortableTabularInline,
)

from forms.models import (
    Schema,
    SchemaField,
    Questionnaire,
    QuestionnaireValue
)
from forms.utils import SchemaFilter


class SchemaFieldInline(SortableTabularInline):
    model = SchemaField
    extra = 0
    formfield_overrides = {
        models.TextField: {
            'widget': Textarea(attrs={'rows': 1, 'cols': 30})
        }
    }


class SchemaAdmin(NonSortableParentAdmin):
    save_as = True
    list_display = ('title', 'owner', 'questionnaire_url', 'is_published')
    list_filter_admin = ('owner', 'is_published')
    list_filter = ('is_published',)
    readonly_fields = ('owner',)
    inlines = (SchemaFieldInline,)

    def get_list_filter(self, request):
        if request.user.is_superuser:
            return self.list_filter_admin
        return super(SchemaAdmin, self).get_list_filter(request)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.owner = request.user
        super(SchemaAdmin, self).save_model(
            request, obj, form, change
        )

    def get_queryset(self, request):
        queryset = super(SchemaAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(owner=request.user)


class QuestionnaireValueInline(admin.TabularInline):
    model = QuestionnaireValue
    extra = 1


class QuestionnaireAdmin(admin.ModelAdmin):
    list_display = ('schema', 'created_date')
    list_filter = (SchemaFilter, 'created_date')
    inlines = (QuestionnaireValueInline,)

    def get_queryset(self, request):
        queryset = super(QuestionnaireAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.select_related('schema__owner').filter(
            schema__owner=request.user
        )


admin.site.register(Schema, SchemaAdmin)
admin.site.register(Questionnaire, QuestionnaireAdmin)
