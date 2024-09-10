from rest_framework import viewsets
from .serializers import CRMSerializer, CommentSerializer, AttachmentSerializer
from .models import CRM, Comment, Attachment

class CRMViewSet(viewsets.ModelViewSet):
    queryset = CRM.objects.all()
    serializer_class = CRMSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AttachmentSerializer(viewsets.ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer