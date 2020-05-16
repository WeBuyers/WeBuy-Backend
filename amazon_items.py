import copy
import requests
from bs4 import BeautifulSoup
import csv
from selenium import webdriver
import time

NUM_ITEM=20
URL="https://www.amazon.com/s?i=grocery&rh=n%3A16310101&page="
def getInfo(html):
    dir_list=[]
    soup=BeautifulSoup(html,features="html.parser")
    # soup=soup.find("div",{"data-test":"productGridContainer"})
    soup=soup.find("div", {"class":"s-result-list s-search-results sg-row"})
    for div in soup.find_all("div", class_="sg-col-4-of-24 sg-col-4-of-12 sg-col-4-of-36 s-result-item s-asin sg-col-4-of-28 sg-col-4-of-16 sg-col sg-col-4-of-20 sg-col-4-of-32"):
        a=div.find_all("a")
        link="www.amazon.com"+a[0]['href']
        name=(link.split('/'))[1]
        try:
            price=div.find("span",class_="a-offscreen").text
        except(AttributeError):
            pass

        picLinks=div.find("img")['srcset']
        picLink=picLinks.split(' ')[0]
        dir_list.append({"Name":name,
                         "Price":price,
                         "PicLink":picLink
                         })
    return dir_list

options=webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument("--test-type")
options.binary_location = "/usr/bin/chromium"
driver = webdriver.Chrome()
#req_header={"Host":"www.ralphs.com","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0"}
start=2

while(start<=NUM_ITEM):
    items=[]
    URL="https://www.amazon.com/s?i=grocery&rh=n%3A16310101&page="

    URL=URL+str(start)
    driver.get(URL)
    print(URL)
    time.sleep(0.5)
    for i in range(0,10):
        driver.execute_script("window.scrollTo(0,{}*document.body.scrollHeight/10);".format(i))
        time.sleep(0.5)
    time.sleep(0.5)
    page_html=driver.page_source

    itemlist=getInfo(page_html)
    items+=copy.deepcopy(itemlist)

    start+=1

    with open("amazon_items.csv","a+",newline="",encoding="utf-8") as csvfile:
        catagories=["Name","Price","PicLink"]
        writer=csv.DictWriter(csvfile,catagories)
        writer.writerows(items)