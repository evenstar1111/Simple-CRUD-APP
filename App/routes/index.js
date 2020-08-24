const handleGet    = require('./get');
const handlePost   = require('./create');
const handlePut    = require('./update');
const handleDelete = require('./delete');

module.exports = function(app, collection) {
   handleGet(app, collection);
   handlePost(app, collection);
   handlePut(app, collection);
   handleDelete(app, collection);
}