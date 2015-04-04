/**
 * Author: Clint Small Cain
 * Date: 4/2/2015
 * Time: 8:20 AM
 * Description:
 */
var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('default',['allTests'] );

var mochaPipe = function(){
    return gulpPlugins.mocha({reporter:'nyan'});
};
var unitTestPaths = ['./test/server/*.js','./server/**/*.js'];
gulp.task('watchtest', function() {
    gulpPlugins.watch(unitTestPaths,
        function() {
            gulp.start('allTests');
        }
    );
});

gulp.task('allTests', function() {
    return gulp.src(unitTestPaths, {read: false})
        .pipe(mochaPipe());
});