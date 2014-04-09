// LinkSpec
var clickData = [
  '_trackEvent', 
  'Links', 
  'Click', 
  '{"webpage":"/ga-event-track/_SpecRunner.html","href":"/services/borrowing","text":"Borrowing Privileges","parents":"jasmine-fixtures|header-nav|primary-nav|services-nav","date":1396971582012}'
  ];

describe("Links", function() {
  describe("when a link has been clicked", function() {
    beforeEach(function() {
      loadFixtures('links.html');
    });
    
    it("should capture event", function() {
      var spyEvent = spyOnEvent($('a#borrowing'), 'click');
      $('a#borrowing').click(function(event){
        event.preventDefault();
        expect(spyEvent).toHaveBeenTriggered();
      });
    });

    it("should push event to GA", function(){
      // _gaq should start empty
      expect(_gaq).toEqual([]);
      // click event should populate _gaq
      $('a#borrowing').click();
      expect(_gaq).not.toEqual([]);
    });
  });

  describe("link data", function() {
    beforeEach(function() {
      loadFixtures('links.html');
      $('a#borrowing').click();
      
      // Parse JSON data
      labelHash = JSON.parse(_gaq[1][3]);
      clickHash = JSON.parse(clickData[3]);
    });

    it("should capture label data", function(){
      // Should have same array length
      expect(_gaq[1].length).toEqual(clickData.length);

      // Are Hash keys the same?
      expect(Object.keys(labelHash)).toEqual(Object.keys(clickHash));
    });

    it("should match example data", function(){
      delete(labelHash['date']);

      $.each(labelHash, function(key,value){ 
        expect(labelHash[key]).toContain(clickHash[key]);
      });
    });
  });
});