


module.exports = function (app) {
    app.get("/", function(req, res) {
        res.render("index.handlebars", res)
      });

      app.get("/saved", function(req, res) {
        res.render("saved.handlebars", res)
      });
    
}