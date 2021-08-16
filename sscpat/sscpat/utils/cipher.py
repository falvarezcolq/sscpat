from cryptography.fernet import Fernet
from django.conf import settings

# key = Fernet.generate_key()
str_key=settings.CIPHER_KEY
key_pass = str.encode(str_key)


def encrypt(message: bytes, key: bytes) -> bytes:
    return Fernet(key).encrypt(message)

def decrypt(token: bytes, key: bytes) -> bytes:
    return Fernet(key).decrypt(token)


def str_encrypt(message):
    binary = encrypt(message=str.encode(message),key=key_pass)
    return binary.decode()

def str_decrypt(token):
    binary = decrypt(token=str.encode(token),key=key_pass)
    return binary.decode()

