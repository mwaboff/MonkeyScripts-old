MonkeyScripts.Collections.Scripts = Backbone.Collection.extend({
  url: "/api/scripts/",

  parse: function(response) {
    if (response.scripts) {
      return response.scripts;
    }
   
    return response;
  }
});