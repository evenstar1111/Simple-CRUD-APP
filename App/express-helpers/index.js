module.exports = function(app, bodyParser, express) {
   app.set('view engine', 'ejs');
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());
   app.use(express.static('public'));
}