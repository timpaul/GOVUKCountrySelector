module.exports = {
  bind : function (app) {

    var fs = require('fs');


    var renderPage = function(params, callback){

      var data = {};

      // Load register from JSON file
      data.country = JSON.parse(fs.readFileSync('app/data/country-records.json', 'utf8'));

      // Sort register alphabetically by country name
      data.country.sort(function(a, b) {
        a = a.entry.name.toLowerCase();
        b = b.entry.name.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      })

      return callback(null, data);

    }



    app.get("/", function (req, res, next) {
      var params = {};

      renderPage(params, function(error, data){
        return res.render('index', data);
      })

    });

  }
};
