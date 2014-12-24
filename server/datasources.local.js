var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/db';

console.log('MongoDB url: ' + mongoUri);

module.exports = {
  db: {
    name: 'db',
    defaultForType: 'mongodb',
    connector: 'mongodb',
    url: mongoUri
  }
};
