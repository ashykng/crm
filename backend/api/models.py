from django.db import models
from django.contrib.auth.models import User

class CRM(models.Model):
    title = models.CharField(max_length=300, default="")
    created_datetime = models.DateTimeField(auto_now_add=True)
    authenticated_users = models.ManyToManyField(User)
    attachments = models.ManyToManyField('Attachment', blank=True, related_name='crms')

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    comment = models.CharField(max_length=300, default="")
    created_datetime = models.DateTimeField(auto_now_add=True)
    crm = models.ForeignKey(CRM, on_delete=models.CASCADE, related_name='comments')
    attachments = models.ManyToManyField('Attachment', blank=True, related_name='comments')

    def __str__(self):
        return self.comment[:50]

class Attachment(models.Model):
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name