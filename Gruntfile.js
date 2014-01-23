/* jshint node: true */

module.exports = function (grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')

    , jasmine: {
        src: "src/jquery.ga-track-form-submit.js"
      , options: {
          specs: "spec/*.js"
        , vendor: "spec/javascripts/vendor/*.js"
      }
    }
  })

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['test'])
};