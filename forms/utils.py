from django.contrib.admin import SimpleListFilter

from forms.models import Schema


class SchemaFilter(SimpleListFilter):
    title = 'schema'
    parameter_name = 'schema'

    def lookups(self, request, model_admin):
        schemas = Schema.objects.all()
        if not request.user.is_superuser:
            schemas = Schema.objects.filter(owner=request.user)
        return set((schema.id, schema.title) for schema in schemas)

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(schema_id=self.value())
        else:
            return queryset
