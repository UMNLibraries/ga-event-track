// FormSpec
describe("Forms", function() {

  describe("when book form has been submitted", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
      $.ga_event_track_forms('forms');
    });

    it("should capture event", function() {
      var spyEvent = spyOnEvent($('body.ga-track-forms form'), 'submit');
      $('form').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });
    });

    it("should push event to GA", function(){
      var spyEvent = spyOnEvent($('body.ga-track-forms form'), 'submit');
      expect(typeof ga === 'function').toBe(true);

      var label = ['_trackEvent', 'Forms', 'Submit', {form: "mncatplus", request: "hemingway", image: "Go", type: "author"}]
      $('form').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
        expect(_gaq).toEqual(label);
      });
    });
  });

  describe("when multi form has been loaded", function() {
    beforeEach(function() {
      loadFixtures('multi_form.html');
      $.ga_event_track_forms('forms');
    });

    it("should have two forms to observe", function() {
      expect($('div.ga-track-forms form').length).toEqual(2);
    });

    it("should capture event for both mncatplus and gsearch", function() {
      var spyEvent = spyOnEvent($('body.ga-track-forms form'), 'submit');
      $('form[name=mncatplug]').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });

      $('form[name=gsearch]').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });
    });
  });

  describe("when no forms to track has been loaded", function() {
    beforeEach(function() {
      loadFixtures('no_forms_to_track.html');
      $.ga_event_track_forms('forms');
    });

    it("should have no forms to observe", function() {
      expect($('body.ga-track-forms form').length).toEqual(0);
    });

    it("should not capture event", function() {
      var spyEvent = spyOnEvent($('body.ga-track-forms form'), 'submit');
      $('form[name=mncatplus]').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveNotBeenTriggered();
      });
    });
  });
});
