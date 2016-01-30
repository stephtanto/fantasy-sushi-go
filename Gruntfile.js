module.exports = function(grunt) {
         grunt.initConfig({

             less: {
                 development: {
                     options: {
                         paths: ["assets/css"]
                     },
                     files: {"public/css/style.css": "less/app.less"}
                 },
                 production: {
                     options: {
                         paths: ["assets/css"],
                         cleancss: true
                     },
                     files: {"public/css/style.css": "less/app.less"}
                 }
             }
         });
         grunt.loadNpmTasks('grunt-contrib-less');
         grunt.registerTask('default', ['less']);
};