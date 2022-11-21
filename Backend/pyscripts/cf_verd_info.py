import time
import json
import requests
from bs4 import BeautifulSoup
import re
import sys
import json

_http_headers = {'Content-Type': 'application/json'}

username = sys.argv[1]

rs = requests.session()
url = f'http://codeforces.com/api/user.status?handle={username}&from=1&count=10000'
# print(url)
submission_list = rs.get(url=url, headers=_http_headers).json()
submission_list = submission_list['result']

cnt = [0 for _ in range(7)]

for sl in submission_list:
    try:
        if sl["verdict"] == "OK":
            cnt[0] += 1
        elif sl["verdict"] == "WRONG_ANSWER":
            cnt[1] += 1
        elif sl["verdict"] == "TIME_LIMIT_EXCEEDED":
            cnt[2] += 1
        elif sl["verdict"] == "MEMORY_LIMIT_EXCEEDED":
            cnt[3] += 1
        elif sl["verdict"] == "RUNTIME_ERROR":
            cnt[4] += 1
        elif sl["verdict"] == "COMPILATION_ERROR":
            cnt[5] += 1
        else:
            cnt[6] += 1
    except:
        continue


print(json.dumps(cnt))
