(function(){
  var MonkeyScripts = window.MonkeyScripts = (window.MonkeyScripts || {});

  MonkeyScripts.listenDescCounter = function() {
    $('#short-desc').on('keyup', shortDescCounter);
  };

  var shortDescCounter = function(event) {
    this.$counter = (this.$counter || $('.short-desc-char-count'));
    var newCount = 140 - $(event.target).val().length;
    console.log(newCount);
    this.$counter.text = toString(newCount);
  };
})();