module.exports = function(Record) {

	Record.allRecords = function(id, cb){
		Record.find({where: {userId: id}},function(err, records){
			if(err) {
				cb(err);
			} else {
				cb(err, records);
			}
		});
	};
	
	Record.inZone = function(lat1, lng1, lat2, lng2, limit, cb){
		Record.find({
			where: {
        'points.lat': {
          between: [lat1, lat2]
        },
        'points.lng': {
          between: [lng1, lng2]
        }
      },
      limit: limit
      
      
		}, function(err, records){
			if(err) {
				cb(err);
			} else {
				cb(err, records);
			}
		});
	};
	
	Record.findAll = function(cb){
		Record.find({fields:{'id': true, 'name':true}},	function(err, records) {
			if(err) {
				cb(err);
			} else {
				cb(err, records);
			}
		});
	};

	

	
	
	Record.remoteMethod(
        'allRecords',
        {
          http: {verb: 'get', path: '/fromUser/:id'},
          accepts: {arg: 'id', type: 'any', required: true},
          returns: {arg: 'records', type: 'object'}
        }
    );
	
	Record.remoteMethod(
        'inZone',
        {
          http: {verb: 'get', path: '/inZone/:lat1/:lng1/:lat2/:lng2'},
          accepts: [
            {arg: 'lat1', type: 'number', required: true},
            {arg: 'lng1', type: 'number', required: true},
            {arg: 'lat2', type: 'number', required: true},
            {arg: 'lng2', type: 'number', required: true}, 
            {arg: 'limit', type: 'number', default:30}
          ],
          returns: {arg: 'records', type: 'object'}
        }
    );
	
	Record.remoteMethod(
        'findAll',
        {
          http: {verb: 'get', path: '/findAll'},
          returns: {arg: 'records', type: 'object'}
        }
    );

};
