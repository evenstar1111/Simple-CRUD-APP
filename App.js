const {MongoClient} = require('mongodb');
const bodyParser    = require('body-parser');
const express       = require('express');
const app           = express();

const PORT          = 8000;

const dbConfig      = require('./App/db-config');
const connString    = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@cluster0.q0uvf.mongodb.net/<dbname>?retryWrites=true&w=majority`;


MongoClient.connect(connString, { useUnifiedTopology: true })
   .then(client => {      
      const db         = client.db('crud-api-1-0-0');
      const collection = db.collection('crud-api-content');

      require('./App/express-helpers')(app, bodyParser, express);

      require('./App/routes')(app, collection);

      app.listen(PORT);
   })
   .catch(error => {
      console.log(error);
   });

