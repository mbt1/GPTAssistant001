import logging

class GPTHandler:
    _API_KEY = None

    def __init__(self,api_key):
        self._API_KEY = api_key

    def get_gpt_response(self, user_gpt_id, user_name, user_id):
        logging.debug("main: request loop started")

        result = [{'id': i, 'content': f"Hello, World {i}!"} for i in range(5)]
        result += [{'id': user_id, 'content': f"Hello, {user_name}({'{user_id:'}{user_id}{'}'})!"}]
        return result, user_gpt_id
