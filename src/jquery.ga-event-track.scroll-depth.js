/*!
 * @preserve
 * jquery.scrolldepth.js | v0.7.1
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

// Modified to remove legacy GA conditional branches - EWL 2015.04.21
;(function ( $, window, document, undefined ) {

  "use strict";

  var defaults = {
    minHeight: 0,
    elements: [],
    percentage: true,
    userTiming: true,
    pixelDepth: false,
    nonInteraction: true
  };

  var $window = $(window),
    cache = [],
    lastPixelDepth = 0,
    universalGA;

  /*
   * Plugin
   */

  $.ga_event_track_scroll = function(event,options) {

    var startTime = +new Date();

    options = (typeof options === 'undefined') ? {} : optionalArg;
    options = $.extend({}, defaults, options);

    // Return early if document height is too small
    if ( $(document).height() < options.minHeight ) {
      return;
    }

    universalGA = true;

    if (options.percentage) {
      // Establish baseline (0% scroll)
      sendBaseline('Percentage');
    } else if (options.elements) {
      sendBaseline('Elements');
    }

    /*
     * Functions
     */

    /*
     * Putting this in a separate function because the Baseline event may soon be removed entirely
     */
    function sendBaseline(action) {
      ga('send', 'event', 'Scroll Depth', action, 'Baseline', 1, {'nonInteraction': true });
    }

    function sendEvent(action, label, scrollDistance, timing) {
      ga('send', 'event', 'Scroll Depth', action, label, 1, {'nonInteraction': options.nonInteraction});

      if (options.pixelDepth && arguments.length > 2 && scrollDistance > lastPixelDepth) {
        lastPixelDepth = scrollDistance;
        ga('send', 'event', 'Scroll Depth', 'Pixel Depth', rounded(scrollDistance), 1, {'nonInteraction': options.nonInteraction});
      }

      if (options.userTiming && arguments.length > 3) {
        ga('send', 'timing', 'Scroll Depth', action, timing, label);
      }
    }

    function calculateMarks(docHeight) {
      // Tracking by decile
      return {
        '10%' : parseInt(docHeight * 0.10, 10),
        '20%' : parseInt(docHeight * 0.20, 10),
        '30%' : parseInt(docHeight * 0.30, 10),
        '40%' : parseInt(docHeight * 0.40, 10),
        '50%' : parseInt(docHeight * 0.50, 10),
        '60%' : parseInt(docHeight * 0.60, 10),
        '70%' : parseInt(docHeight * 0.70, 10),
        '80%' : parseInt(docHeight * 0.80, 10),
        '90%' : parseInt(docHeight * 0.90, 10),
        // 1px cushion to trigger 100% event in iOS
        '100%': docHeight - 5
      };
    }

    function checkMarks(marks, scrollDistance, timing) {
      // Check each active mark
      $.each(marks, function(key, val) {
        if ( $.inArray(key, cache) === -1 && scrollDistance >= val ) {
          sendEvent('Percentage', key, scrollDistance, timing);
          cache.push(key);
        }
      });
    }

    function checkElements(elements, scrollDistance, timing) {
      $.each(elements, function(index, elem) {
        if ( $.inArray(elem, cache) === -1 && $(elem).length ) {
          if ( scrollDistance >= $(elem).offset().top ) {
            sendEvent('Elements', elem, scrollDistance, timing);
            cache.push(elem);
          }
        }
      });
    }

    function rounded(scrollDistance) {
      // Returns String
      return (Math.floor(scrollDistance/250) * 250).toString();
    }

    /*
     * Throttle function borrowed from:
     * Underscore.js 1.5.2
     * http://underscorejs.org
     * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Underscore may be freely distributed under the MIT license.
     */

    function throttle(func, wait) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      var later = function() {
        previous = new Date();
        timeout = null;
        result = func.apply(context, args);
      };
      return function() {
        var now = new Date();
        if (!previous) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

    /*
     * Scroll Event
     */

    if ($('body.ga-track-scroll').length) {
      $window.on('scroll.scrollDepth', throttle(function() {
        /*
         * We calculate document and window height on each scroll event to
         * account for dynamic DOM changes.
         */

        var docHeight = $(document).height(),
          winHeight = window.innerHeight ? window.innerHeight : $window.height(),
          scrollDistance = $window.scrollTop() + winHeight,

          // Recalculate percentage marks
          marks = calculateMarks(docHeight),

          // Timing
          timing = +new Date() - startTime;

        // If all marks already hit, unbind scroll event
        if (cache.length >= 10 + options.elements.length) {
          $window.off('scroll.scrollDepth');
          return;
        }

        // Check specified DOM elements
        if (options.elements) {
          checkElements(options.elements, scrollDistance, timing);
        }

        // Check standard marks
        if (options.percentage) {
          checkMarks(marks, scrollDistance, timing);
        }
      }, 500));
    }
  };

})( jQuery, window, document );
