# For-Sale - Online marketplace backend

A node.js backend with MariaDB database for an online marketplace.

## What's included?

This package contains almost everything one needs to get their online marketplace started. Included is the entire node.js backend,
alongside the .sql file you need to execute to get the database sorted out accordingly.

## How to use
You need to have [node.js installed](https://nodejs.org/en/download/) on your local machine or server, after which you can either download the latest
release of this repo or simply do a ``git pull`` on it. Remember to run ``npm install`` afterwards to install 
all the dependencies. 

After this, you need to [set up a MariaDB database](https://mariadb.com/get-started-with-mariadb/),
after which you can simply run ``mysql db_name < database_queries.sql`` to get the database sorted out.

In your backend folder, create a .env file according to following:
```
DB_HOST=<ip-address-of-server>
DB_USER=<mariadb-username>
DB_PASS=<mariadb-password>
DB_NAME=<mariadb-database-name>
JWT_SECRET=<secret-of-your-choice>
```
Fill the file according to your MariaDB setup. Remember to use ``http://localhost:3000`` as ip if you're running
on local machine. Otherwise, use the server address.

## Misc

This was made as the backend portion of a project for a web dev course @ [Metropolia UAS](https://www.metropolia.fi/en).

## Authors

_Markus Nivasalo_
- Email: _markus.nivasalo (at) metropolia.fi_
- Git: https://github.com/markusniv

_Jani Salo_
- Email: _jani.salo2 (at) metropolia.fi_
- Git: https://github.com/janiksa

_Oskari Arponen_
- Email: _oskari.arponen (at) metropolia.fi_
- Git: https://github.com/AOskari
