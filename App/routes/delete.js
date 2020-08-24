module.exports = function(app, collection) {
   app.delete('/app', (request, response) => {
      collection.deleteOne(
         {title: request.body.filter}
      )
         .then(result => {       
            if (result.deletedCount === 0) {
               response.json(2);
               return;
            }
            response.json(3);
         })
         .catch(error => {console.log(error)});
   });
}