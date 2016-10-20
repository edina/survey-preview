(function(){
	'use strict';
	var gulp = require('gulp');

	gulp.task('unit-test',function(done){
		var Server = require('karma').Server;
		new Server({
			configFile: __dirname + '/spec/unit/unit.conf.js',
			singleRun: true,
			browsers: ['PhantomJS']
		},done).start();
	});

	gulp.task('bump',function(){
		var bump = require('gulp-bump');
		gulp.src('./package.json')
			.pipe(bump())
			.pipe(gulp.dest('./'));
	});
})();