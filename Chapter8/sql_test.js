//sql test
var util = require('util');
var mssql = require('tedious');

var config = { userName: 'Cha9Server', password: 'tnehdfhrls', server: '192.168.4.226', database : 'Cha9TestDB' };

var connection = new mssql.Connection(config);
var Request = mssql.Request;

connection.on('connect', function(error) {
	if(error)
	{
		util.log('connection failed.');
	}
	else
	{
		util.log('connection completed');
	}
});

var request = new Request("LoadFactoryData_New", function(error, rowCount) { 
	util.log('completed Row Count : ' + rowCount); 
});

request.on('columnMetadata', function(columns) {} );
request.on('row', function(columns) {} );
request.on('done', function(rowCount, more) {} );
request.on('doneInProc', function(rowCount, more) { util.log('completed One Proc. Row Count : ' + rowCount); });
request.on('doneProc', function(rowCount, more, returnStatus) { util.log('all proc completed'); });
request.on('returnValue', function(parameterName, value, metadata) {} );
connection.callProcedure(request);