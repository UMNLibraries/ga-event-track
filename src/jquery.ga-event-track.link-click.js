// jQuery Plugin: Capture link values onclick event.
//
// Usage
//
//    Include this javascript file in your build.
//
// Caveats
//
//    Only pushes GA event if JSON.stringify is available.  Sorry old browsers.
//
// Example
//
//    a.onclick =>
//      {
//        "location":{
//          "hostname":"drupal.dev",
//          "pathname":"/"
//        },
//        "media":"large",
//        "mouse":{
//          "pageX":200,
//          "pageY":400
//        },
//        "href":"researchsupport",
//        "text":"Researcher",
//        "parents":"main|featured-items|researcher-support",
//        "date":1409082445329
//      }
//
// Returns an associative array.
(function($,GaEventTrack) { "use strict";

  GaEventTrack.LinkClick = function(element, pageX, pageY) {
    var $link = $(element);

    // Private: Capture current URL info
    var location = function() {
      return {
        hostname: window.location.hostname,
        pathname: window.location.pathname
      }; };

    // Private: Capture active media query
    var media = function() {
      return $('body').data('media'); };

    // Private: Capture mouse click coordinates
    var mouse = function() {
      return {
        pageX: pageX,
        pageY: pageY
      }; };

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
      location: location(),
      media: media(),
      mouse: mouse(),
      href: linkHref(),
      text: linkText(),
      parents: parents(),
      date: date()
    };
  };

  // Public: Init ga link tracking
  $.ga_event_track_links = function (event) {
    if (($.inArray(event,GaEventTrack._events)!=-1) && event === 'links') {
      return $('body.ga-track-links a')
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
            var $linkData = new GaEventTrack.LinkClick($this, event.pageX, event.pageY);

            // Submit the event data
            submitEvent($linkData);

            // Follow link unless special class is assigned
            if ($this.hasClass('ga-no-follow')) {
              return false;
            } else {
              // Delay link, to ensure GA event is tracked.
              setTimeout(function() {
                window.location = $this.attr('href');
              }, 250);
            }
          });
      });
    }
  };
}(jQuery,GaEventTrack));
