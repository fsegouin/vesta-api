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

	Record.remoteMethod(
        'allRecords',
        {
			http: {verb: 'get', path: '/fromUser/:id'},
			accepts: {arg: 'id', type: 'any', required: true},
			returns: {arg: 'records', type: 'object'}
        }
    );

};
