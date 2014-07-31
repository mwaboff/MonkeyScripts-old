// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require underscore
//= require backbone
//= require ./utils/backbone_trigger_logger
//= require bootstrap
//= require monkey_scripts
//= require serializeJSON

//= require codemirror

//= require_tree ../templates
//= require_tree ./utils
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree ../templates
//= require_tree .


(function(){
  var MonkeyScripts = window.MonkeyScripts = (window.MonkeyScripts || {});
  
  MonkeyScripts.attachHandlers = function() {
    $('#signup-form,#login-form').on('submit', handleLoginSubmission);
    $('#logout-button').on('click', handleLogOut);
    $('#search-button').on('click', clickSearchButton);
  };
  
  var handleLogOut = function(event) {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      success: function() {
        location.reload();
      }
    });
  };
  
  var handleLoginSubmission = function(event) {
    event.preventDefault();
    var $theForm = $(event.target);
    var targetLocation = $theForm.attr('action');
    var submissionData = $theForm.serializeJSON();
    $.ajax({
      type: "POST",
      url: targetLocation,
      data: submissionData,
      success: function() {
        location.reload();
      },
      error: function(response) {
        $errMsg = $theForm.find('.form-alert');
        $errMsg.addClass('alert alert-danger').text(response.responseText);
      }
    });
  };

  var clickSearchButton = function(event) {
    event.preventDefault();
    console.log("RUNNING");
    var $barWrapper = $('.monkey-search-wrapper');
    var $searchBar = $($barWrapper.find('.monkey-search'));
    if ($barWrapper.hasClass('expanded-monkey-search')) {
      $barWrapper.removeClass('expanded-monkey-search');
      $searchBar.off('keyup blur');
    } else {
      $barWrapper.addClass('expanded-monkey-search');
      $searchBar.focus();
      $searchBar.on('keyup', _.throttle(MonkeyScripts.liveSearch, 200));
      $searchBar.on('blur', function(){
        console.log('BLURRED');
        $searchBar.off('keyup blur');
        $barWrapper.removeClass('expanded-monkey-search');
      });
    }
  };
})();

$(function(){
  MonkeyScripts.attachHandlers();
});