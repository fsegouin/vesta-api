[![Build Status](https://magnum.travis-ci.com/fsegouin/vesta-api.svg?token=4x4UvbeFh8atjWWPoEFD)](https://magnum.travis-ci.com/fsegouin/vesta-api)
# vesta-api

API pour le projet VESTA

## Releases

Stable version available at Heroku: https://vesta-api.herokuapp.com

## Installation

### Step 1 : Clone this repo
Run the following command line in Terminal (Protip: use [iTerm2](http://www.iterm2.com/#/section/home)):

```bash
$ git clone git@github.com:fsegouin/vesta-api.git
```
### Step 2 : Install nvm

```bash
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.21.0/install.sh | bash
```

### Step 2 : Get the latest v0.10.x release of node

```bash
$ nvm install 0.10
$ nvm use 0.10
```

### Step 3 : Install project dependencies

```bash
$ cd vesta-api
$ npm install
```

### Step 3 : Install MongoDB

Depends on your OS. Go to [mongodb.org](http://www.mongodb.org/downloads).

### Step 4 : Launch vesta-api

Do not forget to start mongodb:

```bash
$ mongod
```
Start the API:

```bash
$ slc run
```

Go to http://localhost:3000/explorer/

If you need SSL support, please switch go feature-ssl branch.
