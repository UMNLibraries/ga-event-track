// jQuery Plugin: Capture link values onclick event.
//
// Usage
// 
//    Include this javascript file in your build.
//    Initialize the event handler on your page.
//
// Caveats
//
//    Only pushes GA event if JSON.stringify is available.  Sorry old browsers.
//
// Example
//
//    $.ga_event_track('links');
//    => {"webpage":"/",
//        "media":"large",
//        "href":"/services/borrowing",
//        "text":"Borrowing Privileges",
//        "parents":"header-nav|primary-nav|services-nav",
//        "date":1396469586280}
//
// Returns an associative array.
(function($,GaEventTrack) { "use strict";

  GaEventTrack.LinkClick = function(element) {
    var $link = $(element);

    // Private: Capture the current URL
    var webpage = function() {
      return $(location).attr('pathname'); };

    // Private: Capture active media query
    var media = function() {
      return $('body').data('media'); };

    // Private: Capture anchor href
    var href = function() {
      return $($link).attr('href'); };

    // Private: Capture anchor text value
    var text = function() {
      return $.trim($($link).text()); };

    // Private: Capture anchor parent attr ids
    var parents = function() {
      return $.map($($link).parents(), function(v,i){ 
        return $(v).attr('id');
      })
        .reverse()
        .join('|')
      };

    // Private: Capture event timestamp
    var date = function() {
      return $.now(); };

    return {
      // Public Methods
      webpage: webpage(),
      media: media(),
      href: href(),
      text: text(),
      parents: parents(),
      date: date()
    };
  };

  // Public: Init ga link tracking
  $.ga_event_track = function (event) {
    if ($.inArray(event,GaEventTrack._events) && event === 'links') {
      return $('a').each(function(idx, element) {

        // Private: Submit the event to GA for tracking
        var submitEvent = function(linkData) {

          try {
            if (JSON && JSON.stringify) {
              var $ga_label = JSON.stringify($.extend(linkData));

              // Push the event to GA
              var _gaq = _gaq || [];
              _gaq.push(['_trackEvent', 'Links', 'Click', $ga_label]);
              return true;
            }
          } 
          catch(error) {
            return false; 
          }
        };  

        // Event Handler: Process the click event
        // 
        // Steps
        //
        //    1) Gather Data - all link values
        //    2) Push Event to GA
        //
        // Returns the link click event. 
        $(element)
          .click(function(event) {
            var $linkData = new GaEventTrack.LinkClick($(this));

            // Submit the event
            submitEvent($linkData);
          });
      });
    }
  };
}(jQuery,GaEventTrack));