import time
import json
import requests
from bs4 import BeautifulSoup
import re
import sys
import json

_http_headers = {'Content-Type': 'application/json'}

username = sys.argv[1]
while True:
    try:
        rs = requests.session()
        url = f'http://codeforces.com/api/user.info?handles={username}'
        #print(url)
        info_list = rs.get(url=url, headers=_http_headers).json()["result"][0]

        info_list = json.dumps(info_list)

        print(info_list)
        break
    except:
        continue