// A jQuery plugin to capture DOM events and send data regarding the event to
// Google Analytics as a tracked event.
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
//    form.ga-track.onSubmit =>
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
//    a.onClick =>
//      {
//        "location":{
//          "hostname":"drupal.dev",
//          "pathname":"/"
//        },
//        "media":"large",
//        "href":"researchsupport",
//        "text":"Researcher",
//        "parents":"main|featured-items|researcher-support",
//        "date":1409082445329
//      }

var GaEventTrack = (function() {
  var _events = ['forms', 'links', 'scrolldepth'];
  var FormSubmit = {};
  var LinkClick = {};
  var ScrollDepth = {};

  return {
    _events: _events,
    FormSubmit: FormSubmit,
    LinkClick: LinkClick,
    ScrollDepth: ScrollDepth
  };
}(GaEventTrack));
