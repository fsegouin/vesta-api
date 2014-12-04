//
// This boot script is for development purposes only.
// Please do not use in production.
//

module.exports = function(app) {

    var User = app.models.user;
    var Cartoparty = app.models.Cartoparty;

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
            console.log('10 user accounts have been created:', users);
            Cartoparty.create([
              {description: 'Toilettes publiques de Reims', from: '04-04-15',
              to: '06-05-15', ownerId: users[0].id},
              {description: 'Pharmacies de Paris', from: '01-02-15',
              to: '02-03-15', ownerId: users[1].id},
              {description: 'Boîtes aux lettres de Lyon', from: '05-03-15',
              to: '09-04-15', ownerId: users[5].id},
              {description: 'Parcs de Marseille', from: '11-01-15',
              to: '31-02-15', ownerId: users[6].id}
            ], function (err, cartopartiesCreated) {
                if (err) {
                  console.error(err);
                } else {
                  console.log('4 cartoparties instances have been created:',
                  cartopartiesCreated);
                  cartopartiesCreated[0].users.add(users[1] , function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('User 2 is now subscribed to cartoparty 1');
                    }
                  });
                  cartopartiesCreated[0].users.add(users[2] , function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('User 3 is now subscribed to cartoparty 1');
                    }
                  });
                  cartopartiesCreated[0].users.add(users[3] , function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('User 4 is now subscribed to cartoparty 1');
                    }
                  });
                  cartopartiesCreated[1].users.add(users[0] , function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('User 1 is now subscribed to cartoparty 2');
                    }
                  });
                  cartopartiesCreated[1].users.add(users[4] , function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('User 5 is now subscribed to cartoparty 2');
                    }
                  });
                  cartopartiesCreated[1].users.add(users[5] , function (err, links) {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('User 6 is now subscribed to cartoparty 2');
                    }
                  });
                }
            });
        }
      });
 };
