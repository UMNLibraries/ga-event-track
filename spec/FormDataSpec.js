// GaTrackFormDataSpec
describe("GaTrackFormData", function() {

  describe("initializing a new GaTrackFormData object", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
    });

    $.each(['name', 'inputs'], function(index, method){
      it("should define the public class method: " + method, function() {
        var $GaTrackFormData = new GaTrackFormData($('form'));
        expect($GaTrackFormData[method]).toBeDefined();
      });
    });
  });

  describe("when loading the book form fixture", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
    });

    it("should have a form name of mncatplus", function() {
      var $GaTrackFormData = new GaTrackFormData($('form'));
      expect($GaTrackFormData.name['form']).toEqual('mncatplus');
    });
    
    $.each(['request', 'image', 'type'], function(index, key){
      it("should contain the key: " + key, function() {
        var $GaTrackFormData = new GaTrackFormData($('form'));
        expect($GaTrackFormData.inputs).toBeDefined(key);
      });
    });

    it("should have a query value of Kerouac", function() {
      var $GaTrackFormData = new GaTrackFormData($('form'));
      expect($GaTrackFormData.inputs['request']).toEqual('Kerouac');
    });

    it("should have a type value of author", function() {
      var $GaTrackFormData = new GaTrackFormData($('form'));
      expect($GaTrackFormData.inputs['type']).toEqual('author');
    });

    it("should have an image value of Go", function() {
      var $GaTrackFormData = new GaTrackFormData($('form'));
      expect($GaTrackFormData.inputs['image']).toEqual('Go');
    });
  });    
});