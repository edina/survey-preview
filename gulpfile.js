(function(){
	'use strict';
	var gulp = require('gulp');
	var pkg = require('./package.json');

	/**
	* Creates or overrides a symlink
	* @target destination path
	* @linkpath path specified to reach @target
	*/
	var symlink = function(target,linkpath,callback){
		var fs = require('fs');
		callback = callback || function(err){
			if(err) throw err;
		};
		fs.symlink(target,linkpath,'file',function(err){
			if(err && err.code === 'EEXIST'){
				fs.unlink(linkpath,function(err){
					if(err)
						callback(err);
					else
						symlink(target,linkpath,callback);
				});
			}
			else
				callback();
		});
	};

	gulp.task('html2js',function(){
		var html2js = require('gulp-html2js');
		return gulp.src('app/partials/*.html')
				.pipe(html2js('partials.js',{
					adapter: 'angular',
					base: 'app/',
					name: 'partials'
				}))
				.pipe(gulp.dest('dist'));
	});

	gulp.task('concat',function(){
		var concat = require('gulp-concat');
		return gulp.src(['app/*.js','app/**/*.js','dist/partials.js'])
				.pipe(concat({
					path: 'index.js'
				}))
				.pipe(gulp.dest('dist'));
	});

	gulp.task('uglify',function(){
		var rename = require('gulp-rename');
		var uglify = require('gulp-uglify');
		return gulp.src('dist/index.js')
				.pipe(rename('index.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest('dist'));
	});

	gulp.task('header',function(){
		var header = require('gulp-header');
		var banner = ['/**',
					'* Copyright (c) '+new Date().getFullYear()+', '+pkg.organization+ 
					'. All rights reserved.',
					'* Author: '+pkg.author.name+' - '+pkg.author.email,
					'* licence: '+pkg.license,
					'*/',
					''
				].join('\n');
				gulp.src('dist/*.js')
					.pipe(header(banner))
					.pipe(gulp.dest('dist'));
	});

	gulp.task('copy-styles',function(){
		var rename = require('gulp-rename');
		return gulp.src('app/style/**/')
				.pipe(rename(function(path){
					var dirname = 'style/'+path.dirname;
					path.dirname = dirname; 
					return path;
				}))
				.pipe(gulp.dest('dist'));
	});

	gulp.task('copy-json',function(){
		return gulp.src('app/env.json')
				.pipe(gulp.dest('dist'));
	});

	gulp.task('processHtml',function(){
		var processhtml = require('gulp-processhtml');
		return gulp.src('app/index.html')
				.pipe(processhtml({}))
				.pipe(gulp.dest('dist'));
	});

	gulp.task('clean',function(){
		var clean = require('gulp-clean');
		return gulp.src('dist/partials.js', {read:false})
				.pipe(clean());
	});

	gulp.task('unit-test',function(done){
		var Server = require('karma').Server;
		new Server({
			configFile: __dirname + '/spec/unit/unit.conf.js',
			singleRun: true,
			browsers: ['PhantomJS']
		},done).start();
	});

	gulp.task('symlink-app',function(){
		symlink('../node_modules','./app/vendor',function(err){
			if(err)
				console.log(err);
		});
	});
	gulp.task('symlink-dist',function(){
		symlink('../node_modules','./dist/vendor',function(err){
			if(err)
				console.log(err);
		});
	});
	gulp.task('bundle',function(done){
		var runSequence = require('run-sequence');
		runSequence('html2js','concat','uglify',['header','copy-styles','copy-json',
			'processHtml','symlink-dist'],
			function(){
				gulp.start('clean');
				done();
			}
		);
	});
})();