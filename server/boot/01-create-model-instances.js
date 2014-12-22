//
// This boot script is for development purposes only.
// Please do not use in production.
//

module.exports = function(app) {

  var User = app.models.user;
  var Cartoparty = app.models.Cartoparty;
  var Category = app.models.Category;
  var City = app.models.City;
  var Record = app.models.Record;
  // var Point = app.models.Point;

  User.create([
    {email: 'test0@test.fr', password: 'test'},
    {email: 'test1@test.fr', password: 'test'},
    {email: 'test2@test.fr', password: 'test'},
    {email: 'test3@test.fr', password: 'test'},
    {email: 'test4@test.fr', password: 'test'},
    {email: 'test5@test.fr', password: 'test'},
    {email: 'test6@test.fr', password: 'test'},
    {email: 'test7@test.fr', password: 'test'},
    {email: 'test8@test.fr', password: 'test'},
    {email: 'test9@test.fr', password: 'test'}
    ], function (err, users) {
      if (err) {
        console.error(err);
      } else {
        // console.log('10 user accounts have been created:', users);
        Cartoparty.create([
          {description: 'Toilettes publiques de Reims', from: '04-04-15',
          to: '06-05-15', ownerId: users[0].id},
          {description: 'Pharmacies de Paris', from: '01-02-15',
          to: '02-03-15', ownerId: users[1].id},
          {description: 'Boîtes aux lettres de Lyon', from: '05-03-15',
          to: '06-04-15', ownerId: users[5].id},
          {description: 'Parcs de Marseille', from: '11-01-15',
          to: '12-02-15', ownerId: users[6].id}
          ], function (err, cartopartiesCreated) {
            if (err) {
              console.error(err);
            } else {
              // console.log('4 cartoparties instances have been created:',
              // cartopartiesCreated);
              cartopartiesCreated[0].users.add(users[0] ,
                function (err, links) {
                  if (err) {
                    console.error(err);
                  } else {
                    // console.log('User 1 is now subscribed to cartoparty 1');
                  }
                });
                cartopartiesCreated[0].users.add(users[1] ,
                  function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      // console.log('User 2 is now subscribed to cartoparty 1');
                    }
                  });
                  cartopartiesCreated[0].users.add(users[2] ,
                    function (err, links) {
                      if (err) {
                        console.error(err);
                      } else {
                        // console.log('User 3 is now subscribed to cartoparty 1');
                      }
                    });
                    cartopartiesCreated[0].users.add(users[3] ,
                      function (err, links) {
                        if (err) {
                          console.error(err);
                        } else {
                          // console.log('User 4 is now subscribed to cartoparty 1');
                        }
                      });
                      cartopartiesCreated[1].users.add(users[0] ,
                        function (err, links) {
                          if (err) {
                            console.error(err);
                          } else {
                            // console.log('User 1 is now subscribed to cartoparty 2');
                          }
                        });
                        cartopartiesCreated[1].users.add(users[4] ,
                          function (err, links) {
                            if (err) {
                              console.error(err);
                            } else {
                              // console.log('User 5 is now subscribed to cartoparty 2');
                            }
                          });
                          cartopartiesCreated[1].users.add(users[5] ,
                            function (err, links) {
                              if (err) {
                                console.error(err);
                              } else {
                                // console.log('User 6 is now subscribed to cartoparty 2');
                              }
                            });
                            Category.create([
                              {name: 'Bancs publics', description: 'Bancs avec un accès libre'},
                              {name: 'Toilettes publiques', description: 'Uniquement les toilettes sur la place publique'},
                              {name: 'Parcs', description: 'Parcs en accès libre ou payant'},
                              {name: 'Boîtes aux lettres', description: 'Boîtes aux lettres de la Poste'},
                              {name: 'Pharmacies', description: 'Pharmacies ou parapharmacies'}
                              ], function (err, categories) {
                                if (err) {
                                  console.error(err);
                                } else {
                                  // console.log('5 categories have been created:', categories);
                                  cartopartiesCreated[0].records.create(
                                    {name: 'Pharmacie du centre',
									note: 'Ouverte du lundi au vendredi',
									userId: users[0].id,
									points: [
										{coordinates: {lat: 64.124596, lng: -147.86327}}
									]},
                                    function (err, record) {
                                      if (err) {
                                        console.error (err);
                                      } else {
                                        // console.log('Record created by User 1:', record);
                                        categories[0].records.add(record, function (err, link) {
                                          if (err) {
                                            console.error(err);
                                          } else {
                                            // console.log('Record 1 is now in Category 1');
                                              User.login(
                                                {email: 'test0@test.fr', password: 'test'},
                                                function (err, acessToken) {
                                                  if (err) {
                                                    console.error('Error while trying to get a token:', err);
                                                  } else {
                                                    // console.log('Token generated for user test0:', acessToken.id);
                                                  }
                                                });
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          };
