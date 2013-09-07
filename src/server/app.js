/**
 * NODEJS Server Definition
 */
var express = require('express'),
	app = express(),
	http = require('http'),
	https = require('https'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.configure(function () {
    // use the system property, or default back to 8080
	app.set('port', process.env.PORT || 8080);

	app.use(express.logger());

    // Define our proxy for the CloverAPIs
	app.use('/v2/', function(request, response, next) {
		if (request._proxy) { return next(); }
		request._proxy = true;

		var options = {
			host: 'api.clover.com',
			port: 443,
			path: request.originalUrl,
			method: request.method,
			headers: {}
		};

		var headerKeys = ['content-type', 'content-length', 'accept', 'accept-encoding', 'accept-language'];

		for (var i = 0; i < headerKeys.length; i++) {
			var key = headerKeys[i];
			console.log(key);
			if (request.headers[key]) {
				options.headers[key] = request.headers[key];
			}
		}

		var prequest = https.request(options, function(presponse) {
			presponse.on('error', function(e){ console.log(e.message); });
			presponse.on('data', function(chunk) {
				response.write(chunk, 'binary');
			});
			presponse.on('end', function() {
				response.end();
			});

			response.writeHead(presponse.statusCode, presponse.headers);
		});

		prequest.on('error', function(err) {
			response.statusCode = 503;
			response.end('connection to application server refused');
			console.log(err);
		});

		request.on('data', function (chunk) {
			prequest.write(chunk, 'binary');
		});

		request.on('end', function () {
			prequest.end();
		});
	});

	// static
	app.use(express.static(__dirname + '/../../dist'));

	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));

	// live reload - for debugging only (remove in production)
	app.use(require('connect-livereload')({
		port: 35729,
		excludeList: ['.woff', '.flv']
	}));
});

// http
server.listen(app.get('port'));

// websockets
/**
io.sockets.on('connection', function (socket) {
	socket.on('tryInStoreRequest', function (data) {
		console.log('tryInStoreRequest');
		console.log(data);
		socket.broadcast.emit('tryInStoreRequest', data);
	});
});
**/

module.exports = app;