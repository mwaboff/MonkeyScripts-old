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
    addSearchResults(response);
  };
  
  var reportError = function(response) {
  };

  var addSearchResults = function(results) {
    var script, frag;
    // if (!results[0].title) {
    //   return;
    // }
    var $documentFragment = $(document.createDocumentFragment());
    for (var idx in results) {
      script = results[idx];
      frag = "<a href='#/script/"+script.id+"'> \
              <div class='result'> \
              <div class='result-title'>"+script.title+"</div> \
              <div class='result-short-desc'>"+script.short_desc+"</div></div></a>";
      if (script.id) {
        $documentFragment.append(frag);
      }
    }
    $('.monkey-search-wrapper > #live-results').html($documentFragment);
    };
})();