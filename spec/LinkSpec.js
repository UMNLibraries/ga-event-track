// LinkSpec
var clickData = [
  '_trackEvent',
  'Links',
  'Click',
  '{"location":{"hostname":"", "pathname":"/ga-event-track/_SpecRunner.html"},"mouse":{"pageX":200, "pageY":400}, "href":"/services/borrowing","text":"Borrowing Privileges","parents":"jasmine-fixtures|header-nav|primary-nav|services-nav","date":1396971582012}'
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
      // ga should be a function
      expect(typeof ga === 'function').toBe(true);

      // click event should populate $linkData
      var $linkData = GaEventTrack.LinkClick($('a#borrowing').click());
      expect($linkData).not.toEqual([]);
    });
  });

  describe("link data", function() {
    beforeEach(function() {
      loadFixtures('links.html');

      var $linkData = GaEventTrack.LinkClick($('a#borrowing').click());

      // Parse JSON data
      labelHash = JSON.stringify($linkData);
      clickHash = JSON.parse(clickData[3]);
    });

    it("should capture label data", function(){
      // Parse JSON data
      var $labelHash = JSON.parse(labelHash);
      var $clickHash = JSON.parse(clickData[3]);

      // Should have same array length
      expect($labelHash.length).toEqual($clickHash.length);

      // Are Hash keys the same?
      expect(Object.keys($labelHash)).toEqual(Object.keys($clickHash));
    });

    it("should match example data", function(){
      labelHash = JSON.parse(labelHash);

      delete(labelHash['date']); // never the same
      delete(labelHash['location']); // hash
      delete(labelHash['mouse']); // hash

      $.each(labelHash, function(key,value){
        expect(labelHash[key]).toContain(clickHash[key]);
      });
    });
  });
});
