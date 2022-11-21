import requests
from bs4 import BeautifulSoup
import urllib3
from datetime import datetime, timedelta
import json

class CodeChef:

    contests = {}
    url = ""

    def __init__(self):

        #self.url = 'https://www.codechef.com/contests'
        #self.url = 'https://www.stopstalk.com/contests'
        self.url = 'https://clist.by:443/api/v1/contest/?end__gt='
        

        self.contests = {
            "Code":[],
            "Name":[],
            "Start":[],
            "End":[]
        }
        self.contestData=[]
    

    def __scrape(self):
        stTime = datetime.today() - timedelta(hours=6, minutes=0)
        enTime = datetime.today() - timedelta(hours=6, minutes=0) + timedelta(hours=480, minutes=0)

        begin = str(stTime.year) + "-" + str(stTime.month) + "-" + str(stTime.day) + "T" + str(stTime.hour) + "%3A" + str(stTime.minute) + "%3A" + str(stTime.second)
        endd = str(enTime.year) + "-" + str(enTime.month) + "-" + str(enTime.day) + "T" + str(enTime.hour) + "%3A" + str(enTime.minute) + "%3A" + str(enTime.second)
        # print(begin)
        # print(endd)
        url3 = "https://clist.by:443/api/v1/contest/?end__gt=" + begin + "&" + "end__lt=" + endd

        # print(url3)
        # print(url)
        res = requests.get(url3,headers={'Authorization': 'ApiKey Ahb_arif:e746f33d1dca698bf9e578774d86dafb916fe288'})
        # print(res.text)
        jsonData = res.json()
        objects = jsonData["objects"]
        #contestData = []
        for x in objects:

            siteName = x["resource"]["name"]
            contestName = x["event"]
            startTime = str(x["start"])
            startTime.replace("T", " , ")
            endTime = str(x["end"])
            endTime.replace("T", " , ")
            sortKey = str(x["end"])
            sortKey =  sortKey.replace("T", " ")
            link = x["href"]
            duration = int(float(x["duration"]) * 0.000277778)

            if duration >=24:
                d = int(duration/24)
                h = duration % 24
                duration = str(d) + " days "
                if h >0:
                    duration+= str(h) + " hours "

            else:
                duration = str(duration) + " hours"

            if siteName == "toph.co" or siteName == "codingcompetitions.withgoogle.com" or siteName == "codeforces.com" or siteName == "csacademy.com" or siteName == "hackerrank.com" or siteName == "codechef.com" or siteName == "spoj.com" or siteName == "hackerearth.com" or siteName == "lightoj.com" or siteName == "atcoder.jp" or siteName == "e-olymp.com" or siteName == "toph.co":
                temp = {}
                temp["sitename"] = siteName
                temp["contest_name"] = contestName
                temp["startTime"] = startTime.replace("T",", ") +" (GMT)"
                temp["endTime"] = endTime.replace("T",", ") +" (GMT)"
                temp["sortKey"] = sortKey
                temp["link"] = link
                temp["duration"] = duration

                # print(temp)
                self.contestData.append(temp)

        self.contestData = sorted(self.contestData, key=lambda k: datetime.strptime(str(k["sortKey"]), "%Y-%m-%d %H:%M:%S"),
                               reverse=False)
        #print(self.contestData)


    
    def getFutureContests(self):

        self.__scrape()
        #return self.contests
        return self.contestData




cc = CodeChef()
constests = cc.getFutureContests()

#print(constests)

c_list = {
    "cf" : [],
    "cc" : [],
    "ac" : [],
    "sp" : [],
    "he" : [],
    "lo" : [],
    "to" : [],
    "ot" : [],
}


for c in constests:
    ob = {
        "link" : c["link"],
        "name" : c["contest_name"],
        "st" : c["startTime"],
        "ed" : c["endTime"],
        "du" : c["duration"]
    }

    site = c["sitename"]

    if "codeforces" in site:
        c_list["cf"].append(ob)
    elif "codechef" in site:
        c_list["cc"].append(ob)
    elif "atcoder" in site:
        c_list["ac"].append(ob)
    elif "spoj" in site:
        c_list["sp"].append(ob)
    elif "hackerearth" in site:
        c_list["he"].append(ob)
    elif "lightoj" in site:
        c_list["lo"].append(ob)
    elif "toph" in site:
        c_list["to"].append(ob)
    else:
        c_list["ot"].append(ob)

print(json.dumps(c_list))