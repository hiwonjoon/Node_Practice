function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if( typeof handle[pathname] == 'function' ) {
		handle[pathname](response, request);
	}
	else
	{
		console.log("No request handlers found for " + pathname );
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write("Hello World");
		response.end();
	}
}
exports.route = route;