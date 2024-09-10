from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CRMViewSet, CommentViewSet, AttachmentSerializer
)


router = DefaultRouter()
router.register("crm", CRMViewSet, basename="crm")
router.register("comment", CommentViewSet, basename="comment")
router.register("attachment", AttachmentSerializer, basename="attachment")

urlpatterns = [
    path("api/", include(router.urls)),
]