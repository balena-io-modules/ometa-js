var ometajs = require('../ometajs'),
	q = require('q'),
	fs = require('fs'),
	chalk = require('chalk');

//
// ### function run (options)
// #### @options {Object} Compiler options
// Compiles input stream or file and writes result to output stream or file
//
exports.run = function run(options) {
	var deferred = q.defer(),
		input = [];

	options.input.on('data', function(chunk) {
		input.push(chunk);
	});

	options.input.once('end', function() {
		finish(input.join(''));
	});

	options.input.resume();

	function finish(input) {
		try {
			var out = ometajs.compile(input, options);
		} catch (e) {
			if (e.OMeta != null && e.OMeta.line != null) {
				var idx = e.OMeta.idx,
					start = Math.max(idx - 30, input.lastIndexOf('\n', idx - 1) + 1, 0),
					end = Math.min(idx + 30, input.indexOf('\n', idx), input.length);
				console.error('Parsing error at: ' + e.OMeta.line + ':' + e.OMeta.col);
				console.error(input.substring(start, idx) + chalk.red.underline(input[idx]) + input.substring(idx + 1, end));
			}

			deferred.reject(e);
			return;
		}

		options.output.write(out);
		if (options.output !== process.stdout) {
			options.output.end();
		} else {
			options.output.write('\n');
		}

		deferred.resolve();
	};

	return deferred.promise;
};
