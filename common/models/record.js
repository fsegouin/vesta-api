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
			where: 
				{'points':
					{'coordinates': 
						{
							'lat': {between: [lat1, lat2]},
							'lng': {between: [lng1, lng2]}
						}
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

	

	
	
	Record.remoteMethod(
        'allRecords',
        {
			http: {verb: 'get', path: '/fromUser/:id'},
			accepts: {arg: 'id', type: 'number', required: true},
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

};
