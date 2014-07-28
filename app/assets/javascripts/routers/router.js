MonkeyScripts.Routers.Router = Backbone.Router.extend({
    routes: {
        "script/new": "renderScriptCreate",
        "script/:id(/:frag)": "renderScriptShow",
        "profile/:id(/:frag)": "renderUserProfile",
        "": "renderRoot"
    },

    initialize: function(options) {
        this.$target = options.$target;
    },

    renderScriptShow: function(scriptID, frag) {
        var tempScript = new MonkeyScripts.Models.Script({id: scriptID});
        tempScript.fetch();
        var newView = new MonkeyScripts.Views.ScriptShow({model: tempScript,
                                                          frag: frag});
        this._swapview(newView);
    },

    renderScriptCreate: function() {
        var newView = new MonkeyScripts.Views.ScriptNew();
        this._swapview(newView);
    },

    renderUserProfile: function(profileID, frag){
        var tempProfile = new MonkeyScripts.Models.User({id: profileID});
        tempProfile.fetch();
        var newView = new MonkeyScripts.Views.UserShow({model: tempProfile,
                                                        collection: tempProfile.scripts(),
                                                        frag: frag});
        this._swapview(newView);
    },

    renderRoot: function(profileID){
         var tempScriptCollection = new MonkeyScripts.Collections.Scripts();
         tempScriptCollection.fetch();
         var newView = new MonkeyScripts.Views.IndexShow({allScripts: tempScriptCollection});
         this._swapview(newView);
    },

    _swapview: function(newView) {
        this.currentView && this.currentView.remove();
        this.currentView = newView;
        this.$target.html(this.currentView.render().$el);
    }
});