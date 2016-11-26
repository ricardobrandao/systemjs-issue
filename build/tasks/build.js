var gulp = require('gulp');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var through2 = require('through2');

var compilerOptions = require('../compiler-options');
var paths = require('../paths');

var jspm = require('jspm');
var builder = new jspm.Builder('.', 'config.js');
jspm.setPackagePath('.');
builder.loader.paths['*'] = 'src/*';
builder.config({
	babelOptions: {
		modules: 'system',
		moduleIds: false,
		comments: false,
		compact: false,
		stage: 2,
		externalHelpers: true,
		optional: [
			'es7.decorators',
			'optimisation.modules.system'
		]
	},
	meta: {}
});

var compileAndWriteToDisk = function (file, en, callback) {
	builder.compile(file.path.replace(file.base, ''),
		file.path.replace('src', 'dev'),
		{ minify: true, transpile: true, sourceMaps: true })
		.then(function (output) {
			callback();
		})
		.catch(function (error) {
			callback(error);
		});
}

gulp.task('build-js', function () {
	return gulp.src(paths.source)
		.pipe(plumber())
		.pipe(through2.obj(compileAndWriteToDisk));
});

gulp.task('build', function (callback) {
	return runSequence(
		'clean',
		'build-js',
		callback
	);
});
