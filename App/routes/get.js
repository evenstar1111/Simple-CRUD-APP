module.exports = function(app, collection) {
   app.get('/', (request, response) => {
      collection.find({}).toArray()
         .then(data => {
            response.render('index.ejs', {contents: data});
         })
         .catch(error => console.log(error));
   });

   app.get('/refresh', (request, response) => {
      collection.find({}).toArray()
         .then(data => {
            response.json( data );
         })
         .catch(error => {
            console.log(error);
         })
   })
}