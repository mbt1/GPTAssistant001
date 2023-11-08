import logging
from . import ReadEnvironment
import azure.functions as func
import json
from datetime import datetime



def main(req: func.HttpRequest) -> func.HttpResponse:

    env_reader = ReadEnvironment.EnvironmentReader()

    logging.debug("main request started")

    
    return func.HttpResponse(
        "",
        mimetype="application/json"
    )
