WeBuy Backend
---

WeBuy is a shopping recommendation app that helps users to shop efficiently while maintaining maximum degree of social distancing. This app is developed as the final project for CS 97 at UCLA in Spring 2020. This is the back-end git repository. For the fully functioning app, please download the Frontend repo at the same time. 

Contributors (backend)
---
Violet Guo, Oswald He, Qing Shi

Installation and Configuration
---
1. Clone the repository.
2. Install node.js from the [official website](https://nodejs.org/en/).
3. Download npm JavaScript Package Manager using [this instruction](https://www.npmjs.com/get-npm).
4. Install [Expo Cli](https://docs.expo.io/workflow/expo-cli/) using npm. 

Environment Setup
---
run ```npm install``` or ```yarn install```

Usage
---
start the app
```
node app
```
The syntax of responses and requests for each api is 
described as following:

1. Login

Url path: ```http://localhost:8000/auth/login```

Request:
```json
{
  "username": "your username",
  "password": "your password"
}
```
Response: 

status: 200 OK
```json
{
  "success": true,
  "message": "Successfully Logged in!",
  "user_id": "the corresponding user_id",
  "token": "the auth token"
}
```
Status: 400 Bad Request
```
Invalid username and password!
```

2.Allitem
Url path: ```http://localhost:8000/search/allitem```

Response: a list of all the items that could be searched
```
{  
    {  
        "itemname": "xxx_1",  
        "picturelink": "https://xxx_1.jpg"  
    },...  
    {  
     "itemname": "xxx_1",  
        "picturelink": "https://xxx_1.jpg"  
    }  
}  
```
Example is like this: <img src="https://github.com/WeBuyers/WeBuy-Backend/blob/master/screenshot/allitem.jpg">


3.Itemlist
Url path: ```http://localhost:8000/itemlist```

You need to use post method and encode the infomation in the body. 

Request:
```
{  
  "items": "["item1","item2",...,"item_n"]",  
	"latitude": "your_latitude_(double)",   
	"longitude": "your_longitude_(double)"  
}  
```
Response: It should contain a list of the following   

```
{  
  [  
    [  
        {  
            "id": storeid_1,  
            "storename": "xxx1",  
            "latitude": "store_latitude(double)",  
            "longitude": store_longitude(double)"   
        },  
        {  
            "id": itemid1,  
            "itemname": "item_name1",  
            "picturelink": "https://itempicture.jpg",  
            "storeid": "storeid_1",  
            "price": "item_price"  
        }  
    ],...  
    [  
        {  
            "id": storeid_n,  
            "storename": "xxxn",  
            "latitude": "store_latitude(double)",  
            "longitude": store_longitude(double)"   
        },  
        {  
            "id": itemidn,  
            "itemname": "item_namen",  
            "picturelink": "https://itempicture.jpg",  
            "storeid": "storeid_n",  
            "price": "item_price"  
        }  
    ]  
  ]  
}  
```
 Example is like: <img src="https://github.com/WeBuyers/WeBuy-Backend/blob/master/screenshot/itemlist.jpg">

   

4.Item
The url is ```http://localhost:8000/search/item?name=keyword&latitude=num1&longitude=num2```
Request:
```
{
  "items": "keyword",
  "latitude": your_latitude_(double), 
  "longitude": your_longitude_(double)
}
```
Response: 

```
{  
 {  
      &nbsp;  "id": “item_id_1”,  
        "itemname": "item_name_1",  
        "picturelink": "https://item_1.jpg",  
        "storeid": number_1,  
        "price": item_price_1,  
        "distance": a number  
    },...  
   {  
        "id": item_id_n,  
        "itemname": "item_name_n",  
        "picturelink": "https://item_n.jpg",  
        "storeid": number_n,  
        "price": item_price_n,  
        "distance": a number  
    }  
 }  
``` 
 Example is like: <img src="https://github.com/WeBuyers/WeBuy-Backend/blob/master/screenshot/itemkeyword.jpg">














