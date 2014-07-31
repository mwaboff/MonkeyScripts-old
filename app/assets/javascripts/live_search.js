(function(){
  var MonkeyScripts = window.MonkeyScripts = (window.MonkeyScripts || {});

  var liveSearch = MonkeyScripts.liveSearch = function(event) {
    var searchString = event.target.value;
    $.ajax({
      type: "GET",
      url: "/api/search",
      data: {
        "term": encodeURIComponent(searchString)
      },
      success: parseResults,
      error: reportError
    });
  };

  var parseResults = function(response) {
    console.log('Success!');
    console.log(response);
  };
  
  var reportError = function(response) {
    console.log('Error!');
    console.log(response.responseText);
  };
})();