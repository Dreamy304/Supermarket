const mongo = require('mongoose');
const connectionString='mongodb+srv://dbuser:ADVaE5eUD6wG35Fc@supermarketdb-rddx4.mongodb.net/test?retryWrites=true&w=majority';

mongo.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongo.connection.once('open', () => {
    console.log('connected to database');
});
