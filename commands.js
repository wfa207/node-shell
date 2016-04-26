var fs = require('fs');
var request = require('request');

module.exports = {
	
	pwd: function(file) {
		process.stdout.write(process.cwd());
		process.stdout.write('\nprompt > ');
	},	
	date: function(file) {
		var newDate = new Date();
		process.stdout.write(newDate.toString());
		process.stdout.write('\nprompt > ');
	},
	ls: function(file) {
		fs.readdir('.', function(err, files) {
  			if (err) throw err;
  			files.forEach(function(file) {
    			process.stdout.write(file.toString() + "\n");
  			});
  			process.stdout.write('prompt > ');
  		});
	},
	echo: function(file) {
		var answer=file.slice(1);
		process.stdout.write(answer.join(" "));
	},
	cat: function(file) {
		var fileToRead=file[1];
		fs.readFile('./'+fileToRead.toString(), 'utf8', function(err, contents) {
    		process.stdout.write(contents);
			process.stdout.write('\nprompt > ');
		});
	},
	head: function(file) {
		var fileToRead=file[1];
		var book;
		fs.readFile('./'+fileToRead.toString(), 'utf8', function(err, contents) {
    		book = contents.toString();
			var lines = book.split('\n');		
			for (var i =0; i<5;i++) {
  				process.stdout.writ`e(lines[i]+'\n');  		
    		}
    		process.stdout.write('prompt > ');	
    	});    	
	},
	tail: function(file) {
		var fileToRead=file[1];
		var book;
		fs.readFile('./'+fileToRead.toString(), 'utf8', function(err, contents) {
    		book = contents.toString();
			var lines = book.split('\n').reverse();
			var output = [];
			for (var i = 0; i < 5; i++) {
  				output.push(lines[i]);
    		}
    		process.stdout.write(output.reverse().join('\n'));
    		process.stdout.write('\n'+'prompt > ');
    	});    	
	},
	sort: function(file) {
		var fileToRead=file[1];
		var book;
		fs.readFile('./'+fileToRead.toString(), 'utf8', function(err, contents) {
    		book = contents.toString();
			var lines = book.split('\n');
			lines = lines.filter(function(elem) {
    			if (elem !== '\n') {
    				return elem;
    			}
    		});
    		lines = lines.map(function(elem) {
    			return elem.replace(/^[\s]+/gi,'');
    		});
    		process.stdout.write(lines.sort().join('\n'));
    		process.stdout.write('\n'+'prompt > ');
    	});    	
	},
	wc: function(file) {
		var fileToRead=file[1];
		var book;
		fs.readFile('./'+fileToRead.toString(), 'utf8', function(err, contents) {
    		book = contents.toString();
			lines = book.split('\n');
    		process.stdout.write(lines.length.toString());
    		process.stdout.write('\n'+'prompt > ');
    	});    	
	},
	uniq: function(file) {
		var fileToRead=file[1];
		var book;
		fs.readFile('./'+fileToRead.toString(), 'utf8', function(err, contents) {
    		book = contents.toString();
			var lines = book.split('\n');
			var output = [];
			lines = lines.filter(function(elem) {
    			if (elem !== '\n') {
    				return elem;
    			}
    		});
    		lines = lines.map(function(elem) {
    			return elem.replace(/^[\s]+/gi,'');
    		}).sort();
    		for (var i = 1; i < lines.length; i++) {
    			if (lines[i] !== lines[i-1]) {
    				output.push(lines[i]);
    			}
    		}
    		process.stdout.write(output.join('\n'));
    		process.stdout.write('\n'+'prompt > ');
    	});    	
	},
	curl: function(file) {
		request(file[1], function (error, response, body) {
    		if(error){
        		process.stdout.write('Error:', error);
    		}
    		if(response.statusCode !== 200){
        		process.stdout.write('Invalid Status Code Returned:', response.statusCode);
    		}
    		process.stdout.write(body); 
    		process.stdout.write('\n'+'prompt > ');
		});
	}
};