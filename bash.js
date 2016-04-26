var commands = require('./commands');
var fs = require('fs');
var request = require('request');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var input= data.toString().trim().split(" ");
  var cmd = input[0]; // remove the newline

  if (commands[cmd]) {
  	commands[cmd](input);
  } else {
  	process.stdout.write('Invalid command!');
  }
});