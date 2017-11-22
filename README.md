# **Note: please keep in mind that it is currently this project under development and rebuilding from AngularJS to ReactJS**

# Search events service

This is a client side part for event notification service. This app created to help people quickly find interesting 
activities depending on the a lot of filters like location (eg. country, city, street, etc.), distance, categories, 
time interval, etc. With this service you are always updated with the latest events for every taste.

<img src="http://moikartinki.ru/pics/9396.jpg" width="900">

## Getting started

To get you started you can simply clone this repository and install the dependencies:

Clone the goevent-client repository using git:

```
git clone https://github.com/melyourhero/goevent-client
cd goevent-client
```

### Install dependencies

**The entire project**

```
yarn install
```

or

```
npm install
```

**You need also run a goevent server for making requests:** 

*At the moment, we are engaged in the problem of deployment* 

- Clone the project [Goevent API](https://github.com/melyourhero/goevent-api)
- Follow [these](https://github.com/melyourhero/goevent-api#search-events-service) instructions 

### Run the application

**In the root folder type:**

```
yarn start
```

### You may have problems with CORS

**You need to install simple extension:**

[Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)

Then start a project and toggle CORS button

> Enable cross-origin resourse sharing

<img src="http://moikartinki.ru/pics/9397.jpg" width="400">
