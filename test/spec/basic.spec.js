var fs = require('fs');
var browserify = require('browserify');
var through = require('through2');
var stylifyRequireTransform = require('../../index');

describe('basic style bundles', function() {
	it('should include plain.css element when loaded', function(done) {
		var data = '';
		browserify({
			entries: require.resolve('../basic/main.js')
		}).transform(stylifyRequireTransform).bundle()		//rootDir: '.'
			.pipe(through(function(buf, enc, cb) {
				data += buf;
				cb();
			}, function(cb) {
				var err;
				if (data.indexOf('plain.css') === -1) {
					err = new Error('expected the bundle to include prependStyle function and one call');
				}

				cb();
				done(err);
			}));
	});

	it('should include both main.css with paragraph color red with 30px font size', function(done) {

		var data = '';
		browserify({
			entries: require.resolve('../basic/main.js')
		}).transform({compress: true, sourceMap: true}, stylifyRequireTransform).bundle()		//rootDir: '.'
			.pipe(through(function(buf, enc, cb) {
			data += buf;
			cb();
		}, function(cb) {
			var err;
			if (!(data.split('prependStyle(').length === 4)) {
				err = new Error('expected the bundle to include prependStyle function and one call');
			} else {
				var createdCss = fs.readFileSync('./test/basic/less/main.css', 'utf8');
				if (createdCss.indexOf('p{font-size:30px}p{color:#ff0000}') === -1) {
					err = new Error('css file was not compiled from less as expected');
				}

			}

			cb();
			done(err);
		}));
	});

});

