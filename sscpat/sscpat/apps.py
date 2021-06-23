from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class SSCPATConfig(AppConfig):
    name = "sscpat.sscpat"
    verbose_name = _("SSCPAT")

    # def ready(self):
    #     try:
    #         import sscpat.sscpat.signals  # noqa F401
    #     except ImportError:
    #         pass

