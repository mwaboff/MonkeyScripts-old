MonkeyScripts.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  scripts: function() {
    if (!this._scripts) {
      this._scripts = new MonkeyScripts.Collections.Scripts();
    }
    return this._scripts;
  },

  parse: function(response) {
    if (response.scripts) {
      this.scripts().set(response.scripts);
      delete response.scripts;
    }
    return response;
  }
});