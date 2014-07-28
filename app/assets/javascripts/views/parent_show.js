MonkeyScripts.Views.ParentShow = Backbone.CompositeView.extend({
  template: JST[""],

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
    this.removeAllSubviews(this.selector);
    var newView;
    if (this.subviewsByFragment[this.fragment]) {
      newView = new this.subviewsByFragment[this.fragment]({model: this.model});
    } else {
      newView = new this.subviewsByFragment["default"]({model: this.model});
    }
    this.addSubview(this.selector, newView);
    this.render();
  },

  viewChange: function(event) {
    event.preventDefault();
    var newLocation = $(event.target).attr('href');
    var splitPoint = this.modelName+'/'+this.model.id+'/';
    this.fragment = newLocation.split(splitPoint)[1];
    
    // Set url bar without loading a new page (HTML5 only)
    var stateObj = {'MonkeyScripts_showLocation':newLocation};
    history.pushState(stateObj, "", newLocation);

    this.addSubviewsOnFragment();
  },

  render: function() {
    console.log('rendering');
    var compiledTemplate = this.template({theModel: this.model});
    this.$el.html(compiledTemplate);
    this.attachSubviews();
    return this;
  }
});