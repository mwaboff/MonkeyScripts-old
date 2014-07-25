MonkeyScripts.Views.ScriptShow = Backbone.CompositeView.extend({
    template: JST["script/show"],

    initialize: function(options) {
      this.listenTo(this.model, "sync", this.render);
    },

    render: function() {
      var compiledTemplate = this.template({thisScript: this.model});
      this.$el.html(compiledTemplate);
      return this;
    }

});