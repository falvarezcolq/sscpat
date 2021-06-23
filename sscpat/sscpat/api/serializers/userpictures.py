"""UserPicture Serializer."""

from rest_framework import serializers
from sscpat.sscpat.models import UserPicture


class UserPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserPicture
        fields=('id',
                'user',
                "is_current_profile_picture",
                "img_l",
                "img_m",
                "thumbnail"
                )

        fields_read_only = (
            "is_current_profile_picture",
        )

    def create(self, data):
        """Create a new ProfilePicture for user"""
        ModelClass = self.Meta.model
        ModelClass.objects.filter(user=data["user"],
                                  is_current_profile_picture=True
                                  ).update(is_current_profile_picture=False)
        instance = ModelClass.objects.create(**data)

        return instance