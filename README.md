ga-event-track
====================

[![Build Status](https://travis-ci.org/UMNLibraries/ga-event-track.png?branch=master)](https://travis-ci.org/UMNLibraries/ga-event-track)
[![Code Climate](https://codeclimate.com/github/UMNLibraries/ga-event-track.png)](https://codeclimate.com/github/UMNLibraries/ga-event-track)

A jQuery plugin to capture DOM events and send data regarding the event to Google Analytics as a tracked event.

### Dependencies

* jQuery (tested with ~1.11.0)
* Google Analytics Web Tracking - analytics.js

### Install

```
bower install ga-event-track
```

### Usage

1. Add the dist folder's jquery.ga-event-track.min.js file to your website

  ```html
  <script src="jquery.ga-event-track.min.js"></script>
  ```

2. Forms: Add an attribute class "ga-track-forms" to any form you wish to track

  ```html
  <body class="ga-track-forms">
  ...
    <form name="mncatplus"...>
      <input name="request" type="text"/>
      <input type="image" src="../path"/>
      <input type="radio" name="type" value="keyword"/>
      <input type="radio" name="type" value="title"/>
      <input type="radio" name="type" value="author"/>
    </form>
  ```

3. When the form's onsubmit event is triggered, you'll capture:

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
        <td>
        {
          "location":{
            "hostname":"www.lib.umn.edu",
            "pathname":"/"
            },
          "name":"mncat-discovery",
          "inputs":{
            "submit":"",
            "phrase":"beer"
            },
          "media":"large",
          "date":1409081954817
        }
        </td>
    </tbody>
  </table>

4. Links: Add an attribute class "ga-track-links" to the body tag if you wish to track links

  ```html
  <body class="ga-track-links">
    ...
  </body>
  ```

5. When a link's onclick event is triggered, you'll capture:

  <table>
    <thead>
      <th>Event Category</th>
      <th>Event Action</th>
      <th>Event Label</th>
    </thead>
    <tbody>
      <tr>
        <td>Links</td>
        <td>Click</td>
        <td>
          {
            "location":{
              "hostname":"drupal.dev",
              "pathname":"/"
              },
            "media":"large",
            "mouse":{
              "pageX":200,
              "pageY":400
              },
            "href":"researchsupport",
            "text":"Researcher",
            "parents":"main|featured-items|researcher-support",
            "date":1409082445329
          }
        </td>
    </tbody>
  </table>

6. Scroll Depth: Add an attribute class "ga-track-scroll" to the body tag if you wish to capture scroll depth

  ```html
  <body class="ga-track-scroll">
    ...
  </body>
  ```

### Tests

Install the project's dependencies

```bash
npm install
```

Run the test suite

```bash
grunt test
```

### Minify Javascript

```bash
uglifyjs src/jquery.ga-event-track.core.js src/jquery.ga-event-track.form-submit.js src/jquery.ga-event-track.link-click.js --source-map "dist/jquery.ga-event-track.min.js.map" -o "dist/jquery.ga-event-track.min.js"
```
### Author

Eric Larson

### Copyright and License

Copyright (c) 2013-2015 Regents of the University of Minnesota - The MIT License (MIT)
