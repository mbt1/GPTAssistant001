import logging
from . import ReadEnvironment
import azure.functions as func
import json
from datetime import datetime

def my_serializer(o):
    if isinstance(o, datetime):
        return o.isoformat()

def main(req: func.HttpRequest) -> func.HttpResponse:

    env_reader = ReadEnvironment.EnvironmentReader()

    logging.debug("main request started")

    result = [{'id': i, 'content': f"Hello, World {i}!"} for i in range(5)]
    
    return func.HttpResponse(
        json.dumps(result,default=my_serializer),
        mimetype="application/json"
    )
