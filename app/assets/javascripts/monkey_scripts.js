window.MonkeyScripts = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new MonkeyScripts.Routers.Router({$target: $('#main')});
    Backbone.history.start();
  }
};

$(function(){
  MonkeyScripts.initialize();
});