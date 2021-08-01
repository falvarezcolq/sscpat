
import datetime
import time
import email.message
import smtplib
from django.conf import settings

def send_email(emailSend,subject,body):
    emailToSend = []
    emailToSend.append('aeumsa.tech@gmail.com')
    # emailToSend.append(emailSend)
    try:
        msg = email.message.Message()
        msg['From'] = settings.DEFAULT_FROM_EMAIL
        msg['To'] = ",".join(emailToSend)
        msg['Subject'] = subject
        msg.add_header('Content-Type', 'text/html')
        msg.set_payload(body)

        server = smtplib.SMTP(settings.SMTP_URL, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(msg['From'], emailToSend, msg.as_string())
        server.quit()
        print("email sent")
    except Exception as e:
        print(e)