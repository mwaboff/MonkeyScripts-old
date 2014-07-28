MonkeyScripts.Views.IndexShow = Backbone.CompositeView.extend({
  template: JST["index/index"],

  initialize: function(options) {
    this.allScripts = options.allScripts;
    this.latestScripts = options.latestScripts;
    this.listenTo(this.allScripts, "sync", this.render);

    this.listenTo(this.allScripts, "add", function(theScript){
      this.addScriptTile(theScript, "#all-scripts");
    });
    this.listenTo(this.latestScripts, "add", function(theScript){
      this.addScriptTile(theScript, "#latest-scripts");
    });
  },

  addScriptTile: function(returnedScript, location) {
    var newView = new MonkeyScripts.Views.ScriptTile({model: returnedScript});
    this.addSubview(location, newView);
  },

  render: function() {
    console.log("rendering");
    var compiledTemplate = this.template();
    this.$el.html(compiledTemplate);
    this.attachSubviews();
    return this;
  }
});