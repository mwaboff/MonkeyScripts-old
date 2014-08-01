(function(){
  var MonkeyScripts = window.MonkeyScripts = (window.MonkeyScripts || {});
  
  MonkeyScripts.buildListeners = function() {
    $('#signup-form,#login-form').on('submit', handleLoginSubmission);
    $('#guest-login').on('click', handleGuestLoginSubmission);
    $('#logout-button').on('click', handleLogOut);
    $('#search-button').on('click', clickSearchButton);
    $('.nav.navbar-nav').on('keyup',
                            '.monkey-search-wrapper.expanded-monkey-search',
                            _.throttle(MonkeyScripts.liveSearch, 200));
    $('body').on('keyup', keystrokeHandler);
    // $('body').on('click', bodyClicker);
    $('#welcome-notice-close').on('click', closeWindowSetCookie);
  };

  var bodyClicker = function(event) {
    console.log(event);
  };
  
  var canary = function(event) {
    console.log('HELLO THER');
    console.log(event);
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

  var handleGuestLoginSubmission = function(event) {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "/api/session/guestlogin",
      success: function() {
        location.reload();
      },
      error: function(response) {
        console.log("Error logging in as guest!", response);
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
      $searchResults.html('');
      $searchBar.val('');
    }
  };

  var keystrokeHandler = function(event) {
    if (event.keyCode === 27) {
      clickSearchButton(event);
    } else if (event.keyCode === 13) {
      var $searchResults = $('#live-results');
      if ($('.monkey-search').val().length && $('.expanded-monkey-search').length &&
          $searchResults.length) {
        var firstResultLink = $searchResults.find('a:first').attr('href');
        Backbone.history.navigate(firstResultLink);
        clickSearchButton(event);
      }
    }

    // console.log(event.keyCode);
  };
  
  var closeWindowSetCookie = function(event) {
    $(event.target).parent().remove();
    $.cookie('_MonkeyScripts_welcomewindow', '0');
    console.log('set cookie!');
  };

})();

$(function(){
  MonkeyScripts.buildListeners();
});