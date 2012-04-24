//sql test
var util = require('util');
var mssql = require('tedious');

var config = { userName: 'Cha9Server', password: 'tnehdfhrls', server: '192.168.4.226', options : {database : 'Cha9TestDB'} };

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
		var request = new Request("LoadFactoryData_New", function(error, rowCount) { 
			if(error)
				util.log('error....');
			else
				util.log('completed Row Count : ' + rowCount); 
		});

		request.on('columnMetadata', function(columns) { 
			 var str = '';
			 for(i = 0; i < columns.length; i++)
			 {
				str += columns[i].colName + '('+ columns[i].type.name + ')';
			 }
			util.log('columnMetadata : ' + str);
		} );
		request.on('row', function(columns) { 
			util.log('row : ' + columns.length);
			// var str = '';
			// for(i = 0; i < columns.length; i++)
			// {
				// str += columns[i].value + ' ';
			// }
			// util.log('row : ' + str);
		});
		request.on('done', function(rowCount, more) { util.log('done. Row Count : ' + rowCount) } );
		request.on('doneInProc', function(rowCount, more) { util.log('completed One Proc. Row Count : ' + rowCount); });
		request.on('doneProc', function(rowCount, more, returnStatus) { util.log('all proc completed Row Count : ' + rowCount); });
		request.on('returnValue', function(parameterName, value, metadata) {} );
		connection.callProcedure(request);
	}
});

//for(i = 0; i <= 10000000000; i++);


