MonkeyScripts.Views.ScriptEdit = Backbone.View.extend({
  template: JST["script/edit"],

  events: {
    'submit form#edit-script': 'submit'
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  contentMirrorizor: function() {
    if (this.$el.find('#monkey-source').length) {
      var that = this;
      this._cm = CodeMirror.fromTextArea(that.$el.find('#monkey-source')[0], {
        lineNumbers: true,
        mode: 'javascript',
        lineWrapping: true
      });
      this._cm.setValue(this.model.escape('code'));
      this._cm.refresh();
    }
  },

  render: function() {
    var compiledTemplate = this.template({thisScript: this.model});
    this.$el.html(compiledTemplate);
    this.contentMirrorizor();
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var $theForm = $(event.target);
    var formData = $theForm.serializeJSON();
    this.model.set(formData['script']);

    this.model.save({}, {
      success: function(response) {
        console.log(response);
        Backbone.history.navigate("#/script/"+response.id);
      },
      error: function(obj, response) {
        console.log(response);
        console.log(event);
        $errMsg = $theForm.find('.form-alert');
        $errMsg.addClass('alert alert-danger').text(response.responseText);
      }
    });
  }

});
