Vessel Routing

Vessel routing is a routing tool that enables users to select a ship
and a destination port and find the optimal sea route. It is based on the sea-routes API https://developer.searoutes.com/

This project consists of two parts:

1. A frontend application written in Vite + React + Typescript + Tailwind CSS
2. A backend NodeJS Express server making API request and providing DBdata for the frontend

To run the front-end do the following.

1. clone the project
2. Make sure you are running a recent version of node (I use v20.0.0)
3. install packages by running "npm -i"
4. run command: "npm run dev" to run a local version - the project should open on http://localhost:5173/ in your browser

To interact with the front-end you need to run the back-end server simultanesouly
To start the server follow the steps:

1. clone the project
2. install packages by running "npm- i"
3. create a .env file in your root folder and copy your searoute key as SEAROUTE_KEY=your_key this is necessary to make api requests
4. start the server using "nodemon server.js" or simply "node server.js"

You are all set to interact with the page
