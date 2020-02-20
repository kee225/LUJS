const {Sequelize} = require('sequelize');
const config = require('config');

// Set up connection information
let sequelize = new Sequelize('cdclient', null, null, {
    dialect: config.get('cdclient.type'),
    operatorsAliases: false,
    storage: config.get('cdclient.connection'),
    logging: false,
});

let models = {};

// Test connection
sequelize.authenticate().then(function(err) {
    if (err) throw 'Unable to connect to the database:' + err;
    console.log("Connected to the CDClient database");
});

// import models
models.ComponentsRegistry = require('./CDClient/ComponentsRegistry')(sequelize);
models.ItemComponent = require('./CDClient/ItemComponent')(sequelize);
models.ZoneTable = require('./CDClient/ZoneTable')(sequelize);

// relationships

models.sequelize = sequelize;

module.exports = models;