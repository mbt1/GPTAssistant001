# token_verifier.py
import logging
import requests
from jose import jwt, JWTError

class TokenVerifier:

# Your Azure AD B2C configuration
    TENANT_NAME = "GTPAssistant001"
    POLICY_NAME = "B2C_1_GPTAssistant001_login"
    CLIENT_ID = "119d0196-38ae-4f1a-a16f-905cd34466af"
    DIRECTORY_ID = "e9105bfe-31bc-428e-9a7b-2bf57313a512"
    ISSUER = f"https://{TENANT_NAME.lower()}.b2clogin.com/{DIRECTORY_ID}/v2.0/"
    JWKS_URI = f"https://{TENANT_NAME}.b2clogin.com/{TENANT_NAME}.onmicrosoft.com/discovery/v2.0/keys?p={POLICY_NAME}"

    def get_public_keys(self):
        jwks_response = requests.get(self.JWKS_URI)
        jwks_response.raise_for_status()
        return jwks_response.json()

    def verify_token(self, token):
        jwks = self.get_public_keys()
        logging.debug(f"TokenVerifier: Keys received: {jwks}")
        try:
            logging.debug(f"TokenVerifier: Token verify result started")
            verify_result = jwt.decode(token, jwks, algorithms=['RS256'], audience=self.CLIENT_ID, issuer=self.ISSUER)
            logging.debug(f"TokenVerifier: Token verify result: {verify_result}")
            return verify_result, None
        except JWTError as e:
            logging.debug(f"TokenVerifier: Token verify result: ERROR: {str(e)}")
            return None, str(e)

    def extract_and_verify_token(self, headers):
        auth_header = headers.get('Authorization', None)
        if not auth_header:
            logging.debug(f"TokenVerifier: Token error: no authorization header")
            return None, "Authorization header is expected"

        parts = auth_header.split()
        if parts[0].lower() != 'bearer':
            logging.debug(f"TokenVerifier: Token error: authorization header does not start with Bearer")
            return None, "Authorization header must start with Bearer"
        elif len(parts) == 1:
            logging.debug(f"TokenVerifier: Token error: no token found")
            return None, "Token not found"
        elif len(parts) > 2:
            logging.debug(f"TokenVerifier: Token error: authorization header misformat")
            return None, "Authorization header must be Bearer token"

        token = parts[1]
        logging.debug(f"TokenVerifier: Token received: {token}")
        result, error = self.verify_token(token)
        if error:
            return None,error
            
        return result, None
