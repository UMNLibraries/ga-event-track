// A jQuery plugin to capture DOM events and send data regarding the event to Google Analytics as a tracked event.
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
//    $.ga_event_track('forms');
//    form.ga-track.onSubmit => {form: "mncatplus", request: "hemingway", image: "Go", type: "author"}
//
//    $.ga_event_track('links');
//    a.onClick => {"webpage":""
//        "media":"large",
//        "href":"/services/borrowing",
//        "text":"Borrowing Privileges",
//        "parents":"header-nav|primary-nav|services-nav",
//        "date":1396469586280}

var GaEventTrack = (function() {
  var _events = ['forms', 'links'];
  var FormSubmit = {};
  var LinkClick = {};
  
  return {
    _events: _events,
    FormSubmit: FormSubmit,
    LinkClick: LinkClick
  };
}(GaEventTrack));