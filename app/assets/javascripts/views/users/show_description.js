MonkeyScripts.Views.UserShowDescription = Backbone.View.extend({
  template: JST['user/subviews/_show_description'],

  render: function() {
    var compiledTemplate = this.template({thisUser: this.model});
    this.$el.html(compiledTemplate);
    return this;
  }
});