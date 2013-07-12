// FormSpec
describe("Forms", function() {

  describe("when book form has been submitted", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
      $('form.ga-track').ga_track_form_submit();
    });
    
    it("should capture event", function() {
      var spyEvent = spyOnEvent($('form.ga-track'), 'submit');
      $('form.ga-track').submit(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });
    });
  });

  describe("when multi form has been loaded", function() {
    beforeEach(function() {
      loadFixtures('multi_form.html');
      $('form.ga-track').ga_track_form_submit();
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
      $('form.ga-track').ga_track_form_submit();
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