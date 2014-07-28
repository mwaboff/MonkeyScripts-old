MonkeyScripts.Collections.Scripts = Backbone.Collection.extend({
  url: "/api/scripts/",

  parse: function(response) {
    var result = {};
   
    return response;
  }
});