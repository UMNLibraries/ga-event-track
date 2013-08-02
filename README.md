ga-track-form-submit
====================

A jQuery plugin to capture form input values during the onsubmit event and send the data to Google Analytics as a tracked event.

### Usage

1. Add the src/jquery.ga-track-form-submit.min.js file to your website

```html
<script src="jquery.ga-track-form-submit.min.js"></script>
```

2. Add an attribute class "ga-track" to any form you wish to track

```html
<form name="mncatplus" class="ga-track"...>
  <input name="request" type="text"/>
  <input type="image" src="../path"/>
  <input type="radio" name="type" value="keyword"/>
  <input type="radio" name="type" value="title"/>
  <input type="radio" name="type" value="author"/>
</form>
```

3. Initialize the tracking via $('form.ga-track').ga_track_form_submit();

```html
<script>
  $('form.ga-track').ga_track_form_submit();
</script>
```

4. When the onsubmit event is triggered, you'll capture:

Event Category > Event Action > Event Label
Form > Submit > Label => {request: "hemingway", image: "Go", type: "author"}