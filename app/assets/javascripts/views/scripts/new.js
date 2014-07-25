MonkeyScripts.Views.ScriptNew = Backbone.View.extend({
  template: JST["script/new"],

  events: {
    'submit form#new-script': 'submit'
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var formData = $(event.target).serializeJSON();
    var newScript = new MonkeyScripts.Models.Script(formData['script']);

    newScript.save({}, {
      success: function(response) {
        console.log(response);
        Backbone.history.navigate("#/script/"+response.id);
      },
      error: function(response) {
        $errMsg = $theForm.find('.form-alert');
        $errMsg.addClass('alert alert-danger').text(response.responseText);
      }
    });
  }

});