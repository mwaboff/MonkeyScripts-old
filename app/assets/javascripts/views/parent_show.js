MonkeyScripts.Views.ParentShow = Backbone.CompositeView.extend({
  template: JST[""],

  events: {
    'click .script-link': 'viewChange'
  },

  initialize: function(options) {
    this.fragment = options.frag;
    // if (options.frag) {
    //   this.fragment = ""+options.frag;
    // } else {
    //   this.fragment = options.frag;
    // }
    
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
    var stateObj = {'MonkeyScripts_showLocation': newLocation};
    history.pushState(stateObj, "", newLocation);

    this.addSubviewsOnFragment();
  },

  activateTab: function() {
    $('.active').removeClass('active');
    var $allTabs = $('.script-link');
    var $tab = $allTabs.find('a[href*="'+this.fragment+'"]');
    if ($tab.length) {
      $tab.addClass('active');
    } else {
      $allTabs.find('a').first().addClass('active');
    }
  },

  render: function() {
    var compiledTemplate = this.template({theModel: this.model});
    this.$el.html(compiledTemplate);
    this.attachSubviews();

    return this;
  }
});