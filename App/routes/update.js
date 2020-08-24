module.exports = function(app, collection) {
   app.put('/app', (request, response) => {
      collection.findOneAndUpdate(
         {title: request.body.filter},
         {
            $set: {
               title: request.body.title,
               content: request.body.content
            }
         },
         {
            upsert: true
         }
      )
         .then(result => {
            const check = result.lastErrorObject.updatedExisting;
            if(check) {
               return response.json(1);
            }
            response.json(0)
         })
         .catch(error => console.log(error));
   });
}