// FormDataSpec
describe("FormData", function() {

  describe("initializing a new FormData object", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
    });

    $.each(['name', 'inputs'], function(index, method){
      it("should define the public class method: " + method, function() {
        var $formData = new FormData($('form'));
        expect($formData[method]).toBeDefined();
      });
    });
  });

  describe("when loading the book form fixture", function() {
    beforeEach(function() {
      loadFixtures('book_form.html');
    });

    it("should have a form name of mncatplus", function() {
      var $formData = new FormData($('form'));
      expect($formData.name['form']).toEqual('mncatplus');
    });
    
    $.each(['request', 'image', 'type'], function(index, key){
      it("should contain the key: " + key, function() {
        var $formData = new FormData($('form'));
        expect($formData.inputs).toBeDefined(key);
      });
    });

    it("should have a query value of Kerouac", function() {
      var $formData = new FormData($('form'));
      expect($formData.inputs['request']).toEqual('Kerouac');
    });

    it("should have a type value of author", function() {
      var $formData = new FormData($('form'));
      expect($formData.inputs['type']).toEqual('author');
    });

    it("should have an image value of Go", function() {
      var $formData = new FormData($('form'));
      expect($formData.inputs['image']).toEqual('Go');
    });
  });    
});