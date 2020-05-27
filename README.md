# WeBuy Backend

WeBuy is a shopping recommendation app that helps users to shop efficiently while maintaining maximum degree of social distancing. This app is developed as the final project for CS 97 at UCLA in Spring 2020. 

## Contributors (backend):
Violet Guo, Oswald He, Qing Shi

## Environment Setup
```
npm install 
```

## Usage
```
npm start
```

## Example
The app will be listened at localhost:8000 
To see the full list of available items to be searched:  
localhost:8000/search/allitem
To see the wishlist of a certain user with user_id value:  
http://localhost:8000/wishlist/listall?user_id=value  
To add an item to the wishlist with user_id value:  
http://localhost:8000/wishlist/additem?user_id=value  
To delete an item from the wishlist with user_id value:  
http://localhost:8000/wishlist/deleteitem?user_id=value














