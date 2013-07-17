// jQuery Plugin: Capture input names and values onsubmit event.
//
// Usage
// 
//    Include this javascript file in your build.
//    Add the 'ga-track' class attribute to any form you wish to track.
//    Initialize the event handler on your page.
//
// Caveats
//
//    Only pushes GA event if JSON.stringify is available.  Sorry old browsers.
//
// Example
//
//    $('form.ga-track').ga_track_form_submit();
//    => {form: "mncatplus", request: "hemingway", image: "Go", type: "author"}
//
// Returns an associative array.
(function($) { "use strict";

  FormData = function(element) {
    var $form = $(element);

    // Private: Capture input name, or default to input type
    var inputName = function(input) {
          return input.attr('name') || input.attr('type'); };
    
    // Private: Capture input value, handle radio buttons properly
    var inputValue = function(input) {
          if (input.attr('type') === 'radio') {
            return $('input[name=' + inputName(input) + ']:radio:checked').val();
          } 
          return input.attr('value'); };

    // Private: Gather form name
    //
    //    Example
    //
    //    <form name="mncatplus" class="ga-track"...>
    //    <form> (Look for nearest parent with id attribute)
    //    => {form: mncatplus}
    var formName = function() {
          var $name = $form.attr('name') || $($form.parents('[id]')[0]).attr('id');
          return {'form': $name}; };

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
    //    => {request: "hemingway", image: "Go", type: "author"} 
    var gatherInputs = function() {
          var $formData = {};
          $(':input', $form).each(function() {
            var $input = $(this);
            $formData[inputName($input)] = inputValue($input);
          });
          return $formData; };

    return {
      // Public Methods
      name: formName(),
      inputs: gatherInputs()
    };
  }

  // Public: Init ga form tracking
  $.fn.ga_track_form_submit = function () {
    return $('form.ga-track').each(function(idx, element) {
      // Private: Submit the event to GA for tracking
      var submitEvent = function(name, inputs) {
            if (JSON.stringify) {
              var $ga_label = JSON.stringify($.extend(name, inputs));

              // Push the event to GA
              _gaq.push(['_trackEvent', 'Forms', 'Submit', $ga_label]);
              return true;
            }
            return false; };

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
          var $this = $(this);
          var $formData = new FormData($this);

          // Submit the event
          submitEvent($formData.name, $formData.inputs);

          // Delay form submission, to ensure GA event is tracked.
          setTimeout(function() {
            $this.submit();
          }, 500);
        });
    });
  };
}(jQuery));