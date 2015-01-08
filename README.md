[![Build Status](https://magnum.travis-ci.com/fsegouin/vesta-api.svg?token=4x4UvbeFh8atjWWPoEFD)](https://magnum.travis-ci.com/fsegouin/vesta-api)
# vesta-api

API pour le projet VESTA

## Releases

Stable version available at Heroku: https://vesta-api.herokuapp.com

## Notes

This current version is made for development purposes only and needs a few tweaks to be used as production. Indeed, a boot script has been written (vesta-api/server/boot/01-create-model-instances.js) to insert random data (users & cartoparties) in order for the developers to work quickly and efficiently.

If you would like to use Vesta as production, please make sure you wipe your mongodb database and then create an admin user. If any user is already added, the boot script will be skipped; or you could simply delete the boot script.

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
