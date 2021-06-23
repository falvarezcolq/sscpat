""" Manager for General models"""
from django.conf import settings
from django.db import models



class GeneralManager(models.Manager):
    """Default manager for the SafeDeleteModel.

    """


    def get_queryset(self):
        # Backwards compatibility, no need to move options to QuerySet.
        queryset = self._queryset_class(self.model, using=self._db,hints=self._hints)

        return queryset.filter(active=True);


