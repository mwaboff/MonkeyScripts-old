MonkeyScripts.Views.ScriptShow = Backbone.CompositeView.extend({
  template: JST["script/show"],

  events: {
    'click .script-link': 'viewChange'
  },

  initialize: function(options) {
    if (options.frag) {
      this.fragment = "/"+options.frag;
    } else {
      this.fragment = options.frag;
    }
    this.listenTo(this.model, "sync", this.addSubviewsOnFragment);
  },

  addSubviewsOnFragment: function() {
    this.removeAllSubviews('#script-stuff');
    var newView;
    if (this.fragment === "source") {
      newView = new MonkeyScripts.Views.ScriptShowSource({model: this.model});
    } else {
      newView = new MonkeyScripts.Views.ScriptShowDescription({model: this.model});
    }
    this.addSubview("#script-stuff", newView);
    this.render();
  },

  viewChange: function(event) {
    event.preventDefault();
    var newLocation = $(event.target).attr('href');
    var splitPoint = 'script/'+this.model.id+'/';
    this.fragment = newLocation.split(splitPoint)[1];
    
    // Set url bar without loading a new page (HTML5 only)
    var stateObj = {'MonkeyScripts_scriptShowLocation':newLocation};
    history.pushState(stateObj, "", newLocation);

    this.addSubviewsOnFragment();
  },

  render: function() {
    console.log('Rendering!');
    var compiledTemplate = this.template({thisScript: this.model});
    this.$el.html(compiledTemplate);
    this.attachSubviews();
    return this;
  }

});