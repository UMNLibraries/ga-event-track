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
    var linkHref = function() {
      return $($link).attr('href'); };

    // Private: Capture anchor text value
    var linkText = function() {
      return $.trim($($link).text()); };

    // Private: Capture anchor parent attr ids
    var parents = function() {
      return $.map($($link).parents(), function(v){
        return $(v).attr('id');
      })
        .reverse()
        .join('|');
      };

    // Private: Capture event timestamp
    var date = function() {
      return $.now(); };

    return {
      // Public Methods
      webpage: webpage(),
      media: media(),
      href: linkHref(),
      text: linkText(),
      parents: parents(),
      date: date()
    };
  };

  // Public: Init ga link tracking
  $.ga_event_track_links = function (event) {
    if (($.inArray(event,GaEventTrack._events)!=-1) && event === 'links') {
      return $('a')
        .not('.dropdown-toggle')
        .not('[class^="chosen"]')
        .not('[data-toggle^="tab"]')
          .each(function(idx, element) {

        // Private: Submit the event to GA for tracking
        var submitEvent = function(linkData) {

          try {
            if (JSON && JSON.stringify) {
              var $ga_label = JSON.stringify(linkData);

              // Push the event to GA
              // console.log($ga_label);
              ga('send', 'event', 'Links', 'Click', $ga_label);
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

            event.preventDefault();
            event.stopPropagation();
            var $this = $(this);
            $this.unbind('click');

            // Capture the data
            var $linkData = new GaEventTrack.LinkClick($this);

            // Submit the event data
            submitEvent($linkData);

            // Delay link, to ensure GA event is tracked.
            setTimeout(function() {
              window.location = $this.attr('href');
            }, 250);
          });
      });
    }
  };
}(jQuery,GaEventTrack));
