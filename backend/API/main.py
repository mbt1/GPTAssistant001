import logging
from . import TokenVerifier
from . import ReadEnvironment
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

    logging.debug("main: request loop started")

    result = [{'id': i, 'content': f"Hello, World {i}!"} for i in range(5)]
    
    return func.HttpResponse(
        json.dumps(result,default=my_serializer),
        mimetype="application/json"
    )
