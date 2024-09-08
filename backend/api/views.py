from rest_framework import viewsets
from .serializers import CRMSerializer, CommentSerializer
from .models import CRM, Comment

class CRMViewSet(viewsets.ModelViewSet):
    queryset = CRM.objects.all()
    serializer_class = CRMSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer