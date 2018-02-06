// GaEventTrack.FormDataSpec
describe("GaEventTrack.FormSubmit", function() {

  describe("initializing a new GaEventTrack.FormSubmit object", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
      GaTrackFormData = new GaEventTrack.FormSubmit($('form'));
    });

    $.each(['name', 'inputs'], function(index, method){
      it("should define the public class method: " + method, function() {
        expect(GaTrackFormData[method]).toBeDefined();
      });
    });
  });

  describe("when loading the password form fixture", function() {
    beforeEach(function() {
      loadFixtures('form_with_password.html');
      GaTrackFormData = new GaEventTrack.FormSubmit($('form'));
    });

    it("should have a query value of Kerouac", function() {
      expect(GaTrackFormData.inputs['request']).toEqual('Kerouac');
    });

    it("should not have a privateval password input", function() {
      expect(GaTrackFormData.inputs.privateval).not.toBeDefined();
    });
  });

  describe("when loading the book form fixture", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
      GaTrackFormData = new GaEventTrack.FormSubmit($('form'));
    });

    it("should have a form name of mncatplus", function() {
      expect(GaTrackFormData.name).toEqual('mncatplus');
    });
    
    $.each(['request', 'image', 'type'], function(index, key){
      it("should contain the key: " + key, function() {
        expect(GaTrackFormData.inputs).toBeDefined(key);
      });
    });

    it("should have a query value of Kerouac", function() {
      expect(GaTrackFormData.inputs['request']).toEqual('Kerouac');
    });

    it("should have a type value of author", function() {
      expect(GaTrackFormData.inputs['type']).toEqual('author');
    });

    it("should have an image value of Go", function() {
      expect(GaTrackFormData.inputs['image']).toEqual('Go');
    });
  });    
});
