MonkeyScripts.Routers.Router = Backbone.Router.extend({
    routes: {
        "script/new": "renderScriptCreate",
        "script/:id(/:frag)": "renderScriptShow"
    },

    initialize: function(options) {
        this.$target = options.$target;
    },

    renderScriptShow: function(scriptID, frag) {
        var tempScript = new MonkeyScripts.Models.Script({id: scriptID});
        tempScript.fetch();
        var newView = new MonkeyScripts.Views.ScriptShow({model: tempScript,
                                                          fragmen: frag});
        this._swapview(newView);
    },

    renderScriptCreate: function() {
        var newView = new MonkeyScripts.Views.ScriptNew();
        this._swapview(newView);
    },

    _swapview: function(newView) {
        this.currentView && this.currentView.remove();
        this.currentView = newView;
        this.$target.html(this.currentView.render().$el);
    }
}); 