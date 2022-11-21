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

prt = [i for i in range(800, 3700, 100)]

#print(prt)

cnt = [0 for _ in range(4000)]

for sl in submission_list:
    try:
        if sl["verdict"] != "OK":
            continue
        
        rating = int(sl["problem"]["rating"])
        cnt[rating] += 1
    except:
        continue
ret = []

for i in range(4000):
    if i in prt:
        ret.append(cnt[i])

print(json.dumps(ret))