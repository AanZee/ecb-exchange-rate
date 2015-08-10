'use strict';

var xml2js = require('xml2js'),
	http = require('http');

module.exports = {
	getCurrentRate: function() {

		var options = {
			hostname: 'www.ecb.europa.eu',
			port: 80,
			path: '/stats/eurofxref/eurofxref-daily.xml',
			method: 'GET'
		};

		http.get(options).on('response', function (response) {
			var body = '';
			var i = 0;
			response.on('data', function (chunk) {
				i++;
				body += chunk;
			});
			response.on('end', function () {
				var parser = new xml2js.Parser({
					trim: true,
					normalizeTags: true,
					mergeAttrs: true
				});
				parser.parseString(body, function(err,result){
					return result;
				});
			});
		});

	}
};