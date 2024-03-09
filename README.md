# WeatherForecast

SETUP:
Node: 
version 14

Redis: 
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gzcd 
redis-stable
make

Confirm installation by running

make test

You can then copy redis to your path by running

sudo make install

To confirm that redis has been properly setup, start the redis server by running

redis-server

Sql:
MySql local setup.
Run below queries:
CREATE SCHEMA `WeatherForecast`;

CREATE TABLE WeatherForecast.Users (
	`Id` varchar(36) NOT NULL,
    `Contact` varchar(13),
    `IsGuest` tinyint(2) DEFAULT 1,
    PRIMARY KEY(`Id`)
);

CREATE TABLE WeatherForecast.Locations (
	`Id` int AUTO_INCREMENT NOT NULL,
    `UserId` varchar(36) NOT NULL,
    `Name` varchar(100),
    `Latitude` decimal(8,6) NOT NULL,
    `Longitude` decimal(9,6) NOT NULL,
    PRIMARY KEY(`Id`),
    FOREIGN KEY(`UserId`) REFERENCES Users(`Id`),
    UNIQUE(`UserId`, `Latitude`, `Longitude`)
);

Set password for mysql to Test$123 or change password in .env.development for READ_DB_PASSWORD and WRITE_DB_PASSWORD.

RUN: (Branch: main or development)
npm install
npm run dev

ABOUT:
We have used express with Typescript to create a backend application with REST API as follows:

/api/locations (GET, POST): Get all locations or add a new location
/api/locations/<location_id> (GET, PUT, DELETE): Get, update, or delete a specific
location by ID
/api/weather/<location_id> (GET): Get the weather forecast for a specific location
/api/weather/history (last 7 days, last 15 days, last 30 days) (GET): Get the historical data and
show the summary. (days: 0 (last 7 days), 1 (last 15 days), 2 (last 30 days))

Taking scalability and encapsulation into account, we have used a MVC like architecture, where
we have Models, Controllers and Views (Routes as Views since they are exposed to the users).
Additionally, we have Services and Database for connecting to and manipulating the database.
The division across these components is done so that encapsulation is maintained as well as
maintenance and scalability is better with developers not required to know internal functions
while creating new routes and controller actions and similarly writing and executing queries.

We have given a guest login option to maintain a user's data while managing locations since
data is not sensitive and a login system was out of scope for this project.


