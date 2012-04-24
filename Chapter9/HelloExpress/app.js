
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('case sensitive routes', true);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/life',routes.life);
app.get('/product',routes.product);
app.get('/redirect', function(request,response) {
	response.redirect('http://hanb.co.kr');
});
app.get('/cookie', function(request,response) {
	if(request.cookies['name1'])
		response.cookie('name1',parseInt(request.cookies['name1'])+1, {expires: new Date(Date.now() + 1000 )});
	else
		response.cookie('name1', 1, {expires: new Date(Date.now() + 1000 )});
	response.cookie('name2', 'value2');
	
	response.writeHead( {'Content-Type':'text/html'});
	response.end('<h1>' + JSON.stringify(request.cookies) + '</h1>');
});
app.get('/onlychrome', function(request,response) {
	var agent = request.header('User-Agent');
	
	if(agent.toLowerCase().match(/chrome/)) {
		response.writeHead(200, {'Content-Type':'text/html'});
		response.end('<h1>Welcome Chrome!!!!!!</h1>');
	} else
	{
		response.redirect('/');
	}
});
app.get('/product/:id', function(request,response) {
	var output = '';
	output += '<h1>id' + request.param('id') + '</h1>';
	output += '<h1>name'+ request.param('name') + '</h1>';
	
	response.end(output);
});
app.get('/Login', function(request, response) {
	if(request.cookies['auth'] === 'true') {
		response.writeHead(200, { 'Content-Type':'text/html' });
		response.end('<h1>Login Success</h1>');
	}
	else {
		response.render('login',{ title: 'Login Page' });
	}
});
app.post('/Login', function(request, response) {
	var id = 'nine';
	var password = 'abcd1234';
	if(request.body.id === id && request.body.password === password) {
		response.cookie('auth','true');
		response.redirect('/Login');
	}
	else
	{
		response.writeHead(200, {'Content-Type':'text/html'});
		response.end('<h1> Login FAIL</h1>');
	}
});
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
