MonkeyScripts.Views.IndexScriptTile = Backbone.View.extend({
  template: JST['index/subviews/_script_tile_index'],

  render: function() {
    var compiledTemplate = this.template({thisScript: this.model});
    this.$el.html(compiledTemplate);
    console.log(this.$el);
    return this;
  }
});