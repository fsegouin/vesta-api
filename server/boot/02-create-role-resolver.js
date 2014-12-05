//
// cartopartyMember is a dynamic role created to check if a user is part of a
// cartoparty and thus is allowed to post new records for this cartoparty
//

module.exports = function(app) {
  var Role = app.models.Role;
  Role.registerResolver('cartopartyMember', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }
    if (context.modelName !== 'Cartoparty') {
      // the target model is not cartoparty
      return reject();
    }
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject(); // do not allow anonymous users
    }
    // check if userId is in relation table for the given cartoparty id
    context.model.findById(context.modelId, function(err, cartoparty) {
      if (err || !cartoparty) {
        return reject();
      }
      cartoparty.__count__users({
        userId: userId
      }, function(err, count) {
        if (err) {
          console.log(err);
          console.log('userId:', userId);
          return cb(null, false);
        }
        cb(null, count > 0); // true = is a cartoparty member
      });
    });
  });
};
