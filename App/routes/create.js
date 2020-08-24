module.exports = function(app, collection) {
   app.post('/app', (request, response) => {
      collection.insertOne(request.body)
         .then(result => {
            response.json('posted');
         })
         .catch(error => console.log(error));
   });
}