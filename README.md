[![Build Status](https://magnum.travis-ci.com/fsegouin/vesta-api.svg?token=4x4UvbeFh8atjWWPoEFD)](https://magnum.travis-ci.com/fsegouin/vesta-api)
# vesta-api

API pour le projet VESTA

## feature-ssl

Cette branche contient une version de vesta-api compatible avec HTTPS. Par défaut, le serveur sera lancé à l'adresse suivante : https://localhost:3000

Cette révision ne sera pas mergée à master car nous hébergeons l'application sur Heroku qui dispose d'un piggyback SSL par défaut, ne nécessitant donc pas une version spéciale du serveur pour supporter HTTPS.
