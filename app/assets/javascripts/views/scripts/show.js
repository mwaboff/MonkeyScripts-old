MonkeyScripts.Views.ScriptShow = MonkeyScripts.Views.ParentShow.extend({
  template: JST["script/show"],

  selector: "#script-stuff",

  initialize: function(options) {
    this.subviewsByFragment = {
      'source': MonkeyScripts.Views.ScriptShowSource,
      'default': MonkeyScripts.Views.ScriptShowDescription
    };

    this.modelName = "script";

    MonkeyScripts.Views.ParentShow.prototype.initialize.call(this, options);
  }
});