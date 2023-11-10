import logging
import json
from google.oauth2 import service_account
from google.cloud import firestore

class DBHandler:
    db = None
    credentials = None
    project = None

    def __init__(self,api_key):
        service_account_info = json.loads(api_key)
        self.credentials = service_account.Credentials.from_service_account_info(service_account_info)
        self.project = service_account_info['project_id']
        self.db = firestore.Client(credentials=self.credentials, project=self.project)

    def get_user(self,user_id):
        user_ref = self.db.collection('users').document(user_id)
        user_doc = user_ref.get()
        if user_doc.exists:
            return user_doc.to_dict()
        else:
            return None        

    def set_user(self,user_id,email,gpt_id):
        user_ref = self.db.collection('users').document(user_id)
        user_ref.set({
            'email': email,
            'gpt_id': gpt_id
        })
