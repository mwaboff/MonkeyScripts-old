MonkeyScripts.Views.IndexShow = Backbone.CompositeView.extend({
  template: JST["index/index"],

  initialize: function(options) {
    this.allScripts = options.allScripts;
    this.latestScripts = options.latestScripts;
    this.listenTo(this.allScripts, "sync", this.generateSublists);

    this.listenTo(this.allScripts, "add", function(theScript){
      this.addScriptTile(theScript, "#all-scripts");
    });
  },

  generateSublists: function(allScripts) {
    var that = this;
    var latestScripts = allScripts.slice(-6).reverse();
    _(latestScripts).each(function(aSlice){
      that.addScriptTile(aSlice, "#latest-scripts");
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