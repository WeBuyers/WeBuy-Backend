import copy
import requests
from bs4 import BeautifulSoup
import csv
from selenium import webdriver
import time

NUM_ITEM=480
URL="https://www.target.com/c/grocery-deals/-/N-k4uyqZcl92v"
def getInfo(html):
    dir_list=[]
    soup=BeautifulSoup(html,features="html.parser")
    location=soup.find("div",class_="StoreIdMessageComponent__StoreIdMessageWrapper-vpf6s6-0 gnXjeB").text
    location=location.split(":")[1]
    soup=soup.find("div",{"data-test":"productGridContainer"})
    for div in soup.find_all("li",class_="Col-favj32-0 bZxgbc h-padding-a-none h-display-flex"):
    # #print(soup.find_all(class_="Col-favj32-0 bZxgbc h-padding-a-none h-display-flex"))
    # soup=soup.find("div",id="mainContainer")
    # #print(soup.prettify())
    # soup=soup.find("div",{"data-component":"productgrid"})
    # #soup=soup.find("div",{"data-test":"productGridContainer"})
    # soup=soup.find("div",{"style":"height:600px"})
        #link="www.target.com/"+(div.find("a",class_="Link-sc-1khjl8b-0 kTulu h-display-block"))['href']
        #print(link)
        
        a=div.find_all("a")
        link="www.target.com"+a[0]['href']
        name=(link.split('/'))[2]
       # print(div.prettify())
        price=div.find("span",class_="h-text-bs").text
        
        picLink=(div.find("picture").contents[0])['srcset']
        
        #name=a["aria-label"]
        #print(name)
       # picLink=pic["srcset"]
        #print(picLink)
        dir_list.append({"Location":location,
                          "Name":name,
                          "Price":price,
                          "PicLink":picLink
                        })

      

    #print(soup.find("div",{"data-test":"productgrid"}))
    
        #print(div.prettify())
        # url=div.find("a",class_="")
        # url=url["href"]
        # #print(url)
        # num=div.em.text.strip()
        # title_html=div.find_all("span",class_="title")
        # name=""
        # for stuff in title_html:
        #     name+=stuff.text.strip()
        # other_title_html=div.find_all("span",class_="other")
        # for stuff in other_title_html:
        #     name+=stuff.text.strip()
        # print(name)
        # info_html=div.find("div",class_="bd")
        # description=info_html.find("p",class_="")
        # description=description.text.strip()
        # try:
        #     director=description[4:description.index("主")]
        #     director=director.strip()
        # except:
        #     director="not found"
        # #print(director)
        # temp=description.index("\n")
        # time=description[temp:description.index("/",temp)]
        # time=time.strip()
        # #print(time)
        # timepos=description.index(time)
        # origin=description[timepos+6:description.index("/",timepos+6)]
        # origin=origin.strip()
        # #print(origin)
        
        # temppos=description.index("/",timepos+6)+1
        # genre=description[temppos:]
        # genre=genre.strip()
        # #print(genre)
        # review=info_html.find("div",class_="star")
        # rating=review.find("span",class_="rating_num").text.strip()
        # #print(rating)
        # spanlist=review.find_all("span")
        # num_review=spanlist[len(spanlist)-1].text.strip("人评价")
        # #print(num_review)
        # dir_list.append({
        #     "rank":num,
        #     "name":name,
        #     "director":director,
        #     "time":time,
        #     "origin":origin,
        #     "genre":genre,
        #     "rating":rating,
        #     "num_review":num_review,
        #     "url":url
        # }
        #)
     
        
    return dir_list

options=webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument("--test-type")
options.binary_location = "/usr/bin/chromium"
driver = webdriver.Chrome()
#req_header={"Host":"www.ralphs.com","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0"}
start=72

while(start<=NUM_ITEM):
    items=[]
    URL="https://www.target.com/c/grocery-deals/-/N-k4uyqZcl92v"
    #req_params={"page":start}
    #r=requests.get(URL,headers=req_header,params=req_params)
    URL=URL+"?Nao="+str(start)
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

    start+=24

    with open("items.csv","a+",newline="",encoding="utf-8") as csvfile:
        catagories=["Location","Name","Price","PicLink"]
        writer=csv.DictWriter(csvfile,catagories)
        writer.writerows(items)