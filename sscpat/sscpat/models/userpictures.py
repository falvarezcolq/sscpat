"""UserPicture Model."""

#Django
from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import SSCPATModel
from sscpat.sscpat.utils.image_helper import ImageHelper

from .users import User

class UserPicture(SSCPATModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="user" )
    is_current_profile_picture = models.BooleanField(_("current_profile picture"), default=True)
    img_l = models.FileField(_(" picture size large 1024x1024"), max_length=255, null=True, upload_to="x/x1")
    img_m = models.FileField(_(" picture size medium 400x400"), max_length=255, null=True, default="", upload_to="x/x5")
    thumbnail = models.FileField(_("picture size small 70x70"), max_length=255, null=True, default="", upload_to="x/x4")

    def __str__(self):
        return "%s %s %s" % (self.user, self.img_l, self.is_current_profile_picture)


    def save(self, *args, **kwargs):
        # Do extra stuff before saving
        # If new post, get the picture and resize it on the fly
        if self.pk is None:
            imagesave = ImageHelper()
            self.img_l = imagesave.compressImage(self.img_l, 1280, 1280, 50)
            self.img_m = imagesave.compressImage(self.img_l, 400, 400, 50)
            self.thumbnail = imagesave.compressImage(self.img_l, 100, 100, 50)

        super(UserPicture, self).save(*args, **kwargs)