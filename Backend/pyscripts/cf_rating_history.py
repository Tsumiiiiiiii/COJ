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
        url = f'https://codeforces.com/api/user.rating?handle={username}'
        # print(url)
        rating_list = rs.get(url=url, headers=_http_headers).json()["result"]
        #print(rating_list)

        ret = []

        for rt in rating_list:
            ret.append(rt["newRating"])

        print(json.dumps(ret))
        break
    except:
        continue
