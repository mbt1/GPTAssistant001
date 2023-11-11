import os
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential
import logging

# For local development on mac use these to set the variables
# launchctl setenv GOOGLE_APPLICATION_CREDENTIALS value

# for Azure use this in an Azure Cloud Shell
# az account set --subscription [...]
# az functionapp config appsettings set --name <function> --resource-group <resourcegroup> --settings "VARIABLE=value"
# az keyvault secret set --vault-name "<KVName>" --content-type "text/plain" --name "<name>" --value "<value>"

class EnvironmentReader:
    __instance = None #singleton pattern

    _VARIABLE = None
    _SOMESECRET = None
    _KEY_VAULT_NAME = None
    
    _GOOGLE_APPLICATION_CREDENTIALS = None
    _ENV_VARIABLE_NAME_FOR_GOOGLE_APPLICATION_CREDENTIALS = "GOOGLE_APPLICATION_CREDENTIALS"
    _KEY_VAULT_SECRET_NAME_FOR_GOOGLE_APPLICATION_CREDENTIALS = "GOOGLEFIRESTORECREDENTIALS"

    _ENV_VARIABLE_NAME_FOR_VARIABLE = 'something'

    _KEY_VAULT_SECRET_NAME_FOR_SOMESECRET = "something"
    _ENV_VARIABLE_NAME_FOR_SOMESECRET = 'something'


    _ENV_VARIABLE_NAME_FOR_KEY_VAULT_NAME = 'GPTASSISTANT001_KEY_VAULT_NAME'

    def _get_environment_variable(self, key):
        logging.debug(f'Reading {key} from environment.')
        return os.environ.get(key)

    def _get_secret(self, secret_name):
        keyVaultUri = f"https://{self._KEY_VAULT_NAME}.vault.azure.net"
        keyVaultCredential = DefaultAzureCredential()
        keyVaultClient = SecretClient(vault_url=keyVaultUri, credential=keyVaultCredential)

        secret = keyVaultClient.get_secret(secret_name)
        logging.debug(f'Reading {secret_name} from keyvault.')
        return secret.value

    def _use_keyvault(self):
        return self._ENV_VARIABLE_NAME_FOR_KEY_VAULT_NAME in os.environ

    def _get_secret_locally_or_vault(self, env_variable_name, secret_name):
        if self._use_keyvault():
            return self._get_secret(secret_name)
        else:
            return self._get_environment_variable(env_variable_name)

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super(EnvironmentReader, cls).__new__(cls)
            cls.__instance._init_secrets()
        return cls.__instance

    def _init_secrets(self):
        logging.debug("EnvironmentReader instantiated")
        self._KEY_VAULT_NAME = self._get_environment_variable(self._ENV_VARIABLE_NAME_FOR_KEY_VAULT_NAME)
        logging.debug(f'This is the keyvault name: {self._KEY_VAULT_NAME}')
        logging.debug(f'This is whether we should use the keyvault : {self._use_keyvault()}')

        self._VARIABLE = self._get_environment_variable(self._ENV_VARIABLE_NAME_FOR_VARIABLE)
        self._SOMESECRET = self._get_secret_locally_or_vault(self._ENV_VARIABLE_NAME_FOR_SOMESECRET, self._KEY_VAULT_SECRET_NAME_FOR_SOMESECRET)

        self._GOOGLE_APPLICATION_CREDENTIALS = self._get_secret_locally_or_vault(self._ENV_VARIABLE_NAME_FOR_GOOGLE_APPLICATION_CREDENTIALS, self._KEY_VAULT_SECRET_NAME_FOR_GOOGLE_APPLICATION_CREDENTIALS)

    def VARIABLE(self):
        logging.debug("VARIABLE called")
        return self._VARIABLE
    
    def SOMESECRET(self):
        logging.debug("SOMESECRET called")
        return self._SOMESECRET

    def GOOGLE_APPLICATION_CREDENTIALS(self):
        logging.debug("GOOGLE_APPLICATION_CREDENTIALS called")
        return self._GOOGLE_APPLICATION_CREDENTIALS
    
