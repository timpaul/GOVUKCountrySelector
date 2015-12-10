module.exports = {
  bind : function (app) {

    var fs = require('fs');


    var renderPage = function(params, callback){

      // Load register from JSON file
      var data = {};
      data.country = JSON.parse(fs.readFileSync('app/data/country-records.json', 'utf8'));

      // Load additional country data from JSON file
      var extension = {};
      extension = JSON.parse(fs.readFileSync('app/data/country-records-extension.json', 'utf8'));

      for(var i = 0; i < data.country.length; i++){

        var entry = data.country[i].entry;
        var country = entry.country

        for(var j = 0; j < extension.length; j++){

          if (country == extension[j].country){
            data.country[i].entry.aliases = extension[j].aliases;  
            data.country[i].entry.weighting = extension[j].weighting;
          }

        } 

      }

      //console.log(JSON.stringify(data.country));


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

    app.get("/register", function (req, res, next) {
      var params = {};

      renderPage(params, function(error, data){
        return res.render('register', data);
      })

    });

  }
};
