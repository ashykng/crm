from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    CRM, Comment, Attachment
)

User = get_user_model()

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'uploaded_at']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    token = serializers.CharField(write_only=True)
    created_datetime = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    attachments = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['user', 'comment', 'created_datetime', 'crm', 'token', 'attachments']

    def get_user(self, obj):
        return obj.user.username if obj.user else None

    def validate(self, data):
        token = data.get('token')
        crm = data.get('crm')

        if not crm:
            raise serializers.ValidationError("CRM object is required")
        
        try:
            user = User.objects.get(auth_token=token)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid token")
        
        if not crm.authenticated_users.filter(pk=user.pk).exists():
            raise serializers.ValidationError("User is not authorized to comment on this CRM object")
        
        data['user'] = user
        
        return data

    def create(self, validated_data):
        token = validated_data.pop('token', None)
        comment = Comment.objects.create(**validated_data)
        return comment

class CRMSerializer(serializers.ModelSerializer):
    authenticated_user_names = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = CRM
        fields = ['id', 'title', 'created_datetime', 'authenticated_user_names', 'comments', 'attachments']

    def get_authenticated_user_names(self, obj):
        return [user.username for user in obj.authenticated_users.all()]