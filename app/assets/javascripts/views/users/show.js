MonkeyScripts.Views.UserShow = MonkeyScripts.Views.ParentShow.extend({
  template: JST["user/show"],

  selector: "#user-stuff",

  initialize: function(options) {
    this.subviewsByFragment = {
      'default': MonkeyScripts.Views.UserShowDescription
    };

    this.modelName = "user";

    MonkeyScripts.Views.ParentShow.prototype.initialize.call(this, options);

    this.listenTo(this.collection, 'add', this.addScriptTile);
  },

  addScriptTile: function(receivedScript) {
    var tileView = new MonkeyScripts.Views.ScriptTile({
      model: receivedScript
    });
    this.addSubview('#users-scripts', tileView);
    this.render();
  }
});