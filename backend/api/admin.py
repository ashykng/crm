from django.contrib import admin
from .models import (
    CRM, Comment, Attachment
)

class CRMAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_datetime', 'display_authenticated_users']

    def display_authenticated_users(self, obj):
        return ", ".join([f"{user.first_name} {user.last_name}" for user in obj.authenticated_users.all()])  # Use 'first_name' and 'last_name'

    display_authenticated_users.short_description = 'Authenticated Users'

class CommentsAdmin(admin.ModelAdmin):
    list_display = ["user", "comment", "created_datetime", "crm"]

class AttachmentAdmin(admin.ModelAdmin):
    list_display = ('file', 'uploaded_at')

admin.site.register(CRM, CRMAdmin)
admin.site.register(Comment, CommentsAdmin)
admin.site.register(Attachment, AttachmentAdmin)