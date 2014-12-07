var mongoUri = process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/mydb';

module.exports = {
  db: {
    name: 'db',
    defaultForType: 'mongodb',
    connector: 'mongodb',
    url: mongoUri
  }
};
