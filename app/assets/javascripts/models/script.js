MonkeyScripts.Models.Script = Backbone.Model.extend({
  urlRoot: "/api/scripts",

  parse: function(response){
    console.log('RECEIVED RESPONSE');
    return response;
  }
});