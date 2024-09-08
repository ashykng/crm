from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CRMViewSet, CommentViewSet
)


router = DefaultRouter()
router.register("crm", CRMViewSet, basename="crm")
router.register("comment", CommentViewSet, basename="comment")

urlpatterns = [
    path("api/", include(router.urls)),
]