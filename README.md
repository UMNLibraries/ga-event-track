ga-track-form-submit
====================

[![Build Status](https://travis-ci.org/UMNLibraries/ga-track-form-submit.png?branch=master)](https://travis-ci.org/UMNLibraries/ga-track-form-submit)
[![Code Climate](https://codeclimate.com/github/UMNLibraries/ga-track-form-submit.png)](https://codeclimate.com/github/UMNLibraries/ga-track-form-submit)

A jQuery plugin to capture form input values during the onsubmit event and send the data to Google Analytics as a tracked event.

### Dependencies

* jQuery (tested with 1.10.2)
* Google Analytics Web Tracking - ga.js

### Install

```
bower install ga-track-form-submit
```

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

  <table>
    <thead>
      <th>Event Category</th>
      <th>Event Action</th>
      <th>Event Label</th>
    </thead>
    <tbody>
      <tr>
        <td>Form</td>
        <td>Submit</td>
        <td>{form: "mncatplus", request: "hemingway", image: "Go", type: "author"}</td>
    </tbody>
  </table>

### Tests

Install the project's dependencies

```bash
npm install
```

Run the test suite

```bash
grunt test
```

### Author

Eric Larson

### Copyright and License

Copyright (c) 2013 Regents of the University of Minnesota - The MIT License (MIT)