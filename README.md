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















