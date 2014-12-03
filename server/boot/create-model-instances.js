//
// This boot script is for development purposes only.
// Please do not use in production.
//

module.exports = function(app) {

    var User = app.models.user;
    var Cartoparty = app.models.Cartoparty;
    var Contributions = app.models.Contribution;

    User.create([
      {email: 'test@test.fr', password: 'test'},
      {email: 'test1@test.fr', password: 'test'}
      ], function (err, users) {
        if (err) {
            console.error(err);
        } else {
            console.log('2 user accounts has been created:',
            users);
            Cartoparty.create([
              {description: 'Toilettes publiques de Reims', from: '04-04-15',
              to: '06-05-15', ownerId: users[0].id},
              {description: 'Pharmacies de Paris', from: '01-02-15',
              to: '02-03-15', ownerId: users[1].id}
            ], function (err, cartoparties) {
                if (err) {
                  console.error(err);
                } else {
                  console.log('2 cartoparties instances has been created:',
                  cartoparties);
                  Contributions.create([
                    {userId: 1, cartopartyId: '1'},
                    {userId: 2, cartopartyId: '1'},
                    {userId: 1, cartopartyId: '2'},
                    {userId: 2, cartopartyId: '2'}
                    ], function (err, contributions) {
                      if (err) {
                        console.error (err);
                      } else {
                        console.log('4 contributions instances has been created:',
                        contributions);
                      }
                  });
                }
            });
        }
      });
 };
