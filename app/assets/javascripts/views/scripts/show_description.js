MonkeyScripts.Views.ScriptShowDescription = Backbone.View.extend({
  template: JST['script/subviews/_show_description'],

  render: function() {
    var compiledTemplate = this.template({thisScript: this.model});
    this.$el.html(compiledTemplate);
    return this;
  }
});