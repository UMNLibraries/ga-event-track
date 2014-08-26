// jQuery Plugin: Capture input names and values onsubmit event.
//
// Usage
//
//    Include this javascript file in your build.
//    Add the 'ga-track' class attribute to any form you wish to track.
//
// Caveats
//
//    Only pushes GA event if JSON.stringify is available.  Sorry old browsers.
//
// Example
//
//    form.ga-track.onsubmit =>
//      {
//        "location":{
//          "hostname":"www.lib.umn.edu",
//          "pathname":"/"
//        },
//        "name":"mncat-discovery",
//        "inputs":{
//          "submit":"",
//          "phrase":"beer"
//         },
//        "media":"large",
//        "date":1409081954817
//      }
//
// Returns an associative array.
(function($,GaEventTrack) { "use strict";

  GaEventTrack.FormSubmit = function(element) {
    var $form = $(element);

    // Private: Capture current URL info
    var location = function() {
      return {
        hostname: window.location.hostname,
        pathname: window.location.pathname
      }; };

    // Private: Capture input name, or default to input type
    var inputName = function(input) {
          return input.attr('name') || input.attr('type'); };

    // Private: Capture input value, handle radio buttons properly
    var inputValue = function(input) {
          if (input.attr('type') === 'radio') {
            return $('input[name=' + inputName(input) + ']:radio:checked').val();
          }
          return input.val(); };

    // Private: Gather form name
    //
    //    Example
    //
    //    <form name="mncatplus" class="ga-track"...>
    //    <form> (Look for nearest parent with id attribute)
    //    => {form: "mncatplus"}
    var formName = function() {
          var $name = $form.attr('name') || $($form.parents('[id]')[0]).attr('id');
          return $name; };

    // Private: For each input, gather name and value
    //
    //    Example
    //
    //    <form name="mncatplus" class="ga-track"...>
    //      <input name="request" type="text"/>
    //      <input type="image" src="../path"/>
    //      <input type="radio" name="type" value="keyword"/>
    //      <input type="radio" name="type" value="title"/>
    //      <input type="radio" name="type" value="author"/>
    //    </form>
    //    => {form: "mncatplus", request: "hemingway", image: "Go", type: "author"}
    var gatherInputs = function() {
          var $formData = {};
          $(':input', $form).each(function() {
            var $input = $(this);
            $formData[inputName($input)] = inputValue($input);
          });
          return $formData; };

    // Private: Capture active media query
    var media = function() {
      return $('body').data('media'); };

    // Private: Capture event timestamp
    var date = function() {
      return $.now(); };

    return {
      // Public Methods
      location: location(),
      name: formName(),
      inputs: gatherInputs(),
      media: media(),
      date: date()
    };
  };

  // Public: Init ga form tracking
  $.ga_event_track_forms = function (event) {
    if (($.inArray(event,GaEventTrack._events)!=-1) && event === 'forms') {
      return $('form.ga-track').each(function(idx, element) {
        // Private: Submit the event to GA for tracking
        var submitEvent = function(formData) {

          try {
            if (JSON && JSON.stringify) {
              var $ga_label = JSON.stringify(formData);

              // Push the event to GA
              ga('send', 'event', 'Forms', 'Submit', $ga_label);
              return true;
            }
          }
          catch(error) {
            return false;
          }
        };

        // Event Handler: Process the submit event
        //
        // Steps
        //
        //    1) Gather Data - all form input elements names and values
        //    2) Push Event to GA
        //    3) Delay submit for 0.5s to ensure GA can track event
        //
        // Returns the form submit event.
        $(element)
          .submit(function(event) {

            event.preventDefault();
            event.stopPropagation();
            var $this = $(this);
            $this.unbind('submit');

            // Capture the data
            var $formData = new GaEventTrack.FormSubmit($this);

            // Submit the event data
            submitEvent($formData);

            // Delay form submission, to ensure GA event is tracked.
            setTimeout(function() {
              $this.submit();
            }, 250);
          });
      });
    }
  };
}(jQuery,GaEventTrack));
