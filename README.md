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
run 
```
npm install 
```

Usage
---
```
npm start
```

Example
---
The app will be listened at localhost:8000 by default. And you could also download Postman from [here](https://www.postman.com/) to use it to run the backend code. 

To see the full list of available items to be searched:  
http://localhost:8000/search/allitem  
You don't need to send any request to the website and by using the get method, the website would return you all the 500 items that can be searched. 

To see a list of items containing the search keywrods 


To see the wishlist of a certain user with user_id id:  
http://localhost:8000/wishlist/listall?user_id=id  














