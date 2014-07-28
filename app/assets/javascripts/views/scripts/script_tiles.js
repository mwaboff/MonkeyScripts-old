MonkeyScripts.Views.ScriptTile = Backbone.View.extend({
  template: JST['script/subviews/_script_tile'],

  render: function() {
    var compiledTemplate = this.template({thisScript: this.model});
    this.$el.html(compiledTemplate);
    return this;
  }
});