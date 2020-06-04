import subprocess
import chardet

from flask import Flask
from flask_cors import CORS

import base64

app = Flask(__name__)
CORS(app)

@app.route('/test/<message>')
def cmd(message):
    print(message)

    data = base64.b64decode(message)
    print(data)
    encoding = chardet.detect(data)['encoding']
    print(data.decode(encoding))

    response = subprocess.check_output("dir", shell=True)
    print(response)

    response_encoded = base64.b64encode(response)
    print(response_encoded)

    encoding = chardet.detect(response)['encoding']
    return response_encoded.decode(encoding)




if __name__ == '__main__':
    app.run()
