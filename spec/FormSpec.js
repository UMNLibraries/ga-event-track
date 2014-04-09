// FormSpec
describe("Forms", function() {

  describe("when book form has been submitted", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
      $.ga_event_track('forms');
    });
    
    it("should capture event", function() {
      var spyEvent = spyOnEvent($('form.ga-track'), 'submit');
      $('form.ga-track').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });
    });

    it("should push event to GA", function(){
      var spyEvent = spyOnEvent($('form.ga-track'), 'submit');
      expect(_gaq).toEqual([]);
      var label = ['_trackEvent', 'Forms', 'Submit', {form: "mncatplus", request: "hemingway", image: "Go", type: "author"}]
      $('form.ga-track').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
        expect(_gaq).toEqual(label);        
      });
    });
  });

  describe("when multi form has been loaded", function() {
    beforeEach(function() {
      loadFixtures('multi_form.html');
      $.ga_event_track('forms');
    });
      
    it("should have two forms to observe", function() {
      expect($('form.ga-track').length).toEqual(2);
    });

    it("should capture event for both mncatplus and gsearch", function() {
      var spyEvent = spyOnEvent($('form.ga-track'), 'submit');
      $('form[name=mncatplug].ga-track').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });

      $('form[name=gsearch].ga-track').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });
    });
  });

  describe("when no forms to track has been loaded", function() {
    beforeEach(function() {
      loadFixtures('no_forms_to_track.html');
      $.ga_event_track('forms');
    });
      
    it("should have no forms to observe", function() {
      expect($('form.ga-track').length).toEqual(0);
    });

    it("should not capture event", function() {
      var spyEvent = spyOnEvent($('form.ga-track'), 'submit');
      $('form[name=mncatplus]').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveNotBeenTriggered();
      });
    });
  });
});