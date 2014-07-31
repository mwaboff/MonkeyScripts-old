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
    $('.nav.navbar-nav').on('keyup',
                            '.monkey-search-wrapper.expanded-monkey-search',
                            _.throttle(MonkeyScripts.liveSearch, 200));
    //$('.monkey-search-wrapper').on('blur', clickSearchButton);
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
    var $barWrapper = $('.monkey-search-wrapper');
    var $searchResults = $barWrapper.find('#live-results');
    var $searchBar = $barWrapper.find('.monkey-search');

    $barWrapper.toggleClass('expanded-monkey-search');

    if ($barWrapper.hasClass('expanded-monkey-search')) {
      $searchBar.focus();
    } else {
      console.log('removing search stuff');
      $searchResults.html('');
      $searchBar.val('');
    }
  };
})();

$(function(){
  MonkeyScripts.attachHandlers();
});