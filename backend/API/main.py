import logging
from . import TokenVerifier
from . import ReadEnvironment
from . import GPTHandler
from . import DBHandler
import azure.functions as func
import json
from datetime import datetime

def my_serializer(o):
    if isinstance(o, datetime):
        return o.isoformat()

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.getLogger().setLevel(logging.DEBUG)
    logging.debug("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
    logging.debug("main: reading environment")

    env_reader = ReadEnvironment.EnvironmentReader()

    logging.debug("main: verifying token")

    token, error = TokenVerifier.TokenVerifier().extract_and_verify_token(req.headers)
    if error:
        logging.debug(f"main: TokenVerifier Error:{error}")
        return func.HttpResponse(
            json.dumps([{"id": 1, "content": f"Not Authorized: {error}"}],default=my_serializer),
            mimetype="application/json"
        )

    db_handler = DBHandler.DBHandler(env_reader.GOOGLE_APPLICATION_CREDENTIALS())

    user_id = token.get('sub')
    user_emails = token.get('emails')
    user_email = user_emails[0]
    user_name = req.params.get('user')
    user = db_handler.get_user(user_id)
    user_pre_gpt_id = user.get("gpt_id") if user is not None else None
    user_pre_email = user.get("email") if user is not None else None
    gpt_handler = GPTHandler.GPTHandler("<REPLACEWITHAPIKEY>")
    result, user_gpt_id =  gpt_handler.get_gpt_response(user_pre_gpt_id, user_name, user_id)
    if user_pre_gpt_id != user_gpt_id or user_email != user_pre_email:
        db_handler.set_user(user_id=user_id, email=user_email, gpt_id= user_gpt_id)

    return func.HttpResponse(
        json.dumps(result,default=my_serializer),
        mimetype="application/json"
    )

