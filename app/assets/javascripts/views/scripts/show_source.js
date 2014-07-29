MonkeyScripts.Views.ScriptShowSource = Backbone.View.extend({
  template: JST['script/subviews/_show_source'],

  render: function() {
    var that = this;
    var compiledTemplate = this.template({thisScript: this.model});
    this.$el.html(compiledTemplate);
    return this;
  }
});