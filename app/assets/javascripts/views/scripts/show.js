MonkeyScripts.Views.ScriptShow = MonkeyScripts.Views.ParentShow.extend({
  template: JST["script/show"],

  selector: "#script-stuff",

  initialize: function(options) {
    this.subviewsByFragment = {
      'source': MonkeyScripts.Views.ScriptShowSource,
      'default': MonkeyScripts.Views.ScriptShowDescription
    };

    this.modelName = "script";

    MonkeyScripts.Views.ParentShow.prototype.initialize.call(this, options);
  },

  contentMirrorizor: function() {
    if (this.$el.find('#monkey-source').length) {
      var that = this;
      this._cm = CodeMirror.fromTextArea(that.$el.find('#monkey-source')[0], {
        lineNumbers: true,
        mode: 'javascript',
        lineWrapping: true,
        readOnly: true
      });
      this._cm.setValue(this.model.get('code'));
      this._cm.refresh();
    }
  },

  render: function() {
    console.log('renderbuddy');
    var that = this;
    var compiledTemplate = this.template({theModel: this.model});
    this.$el.html(compiledTemplate);
    this.attachSubviews();

    this.contentMirrorizor();
    return this;
  }
});