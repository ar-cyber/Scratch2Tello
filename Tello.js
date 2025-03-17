/*

	Rzye Tello
	
	Scratch Ext 1.0.0.0

	http://www.ryzerobotics.com

	1/1/2018
*/

var dataToTrack_keys = ["battery", "x", "y", "z", "speed"];
var lastDataReceived = null;


var http = require('http');
var fs = require('fs');
var url = require('url');



var PORT = 8889;
var HOST = '192.168.10.1';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');

client.on('message',function(msg,info){
	console.log('Data received from server : ' + msg.toString());
	console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});		
http.createServer( (request, response) =>  {  
    var url_params = request.url.split('/');

    if (url_params.length < 2) return;

    var command = url_params[1];
	var clientc = true
	req = new Requests() 	
	  switch (command){
		
        case 'poll':
			clientc = req.respondToPoll(response);
            break;
		
        case 'takeoff':
			clientc = false
			console.log('takeoff');
			req.TakeoffRequest();
			break;
        case 'land':
			clientc = false
			console.log('land');
			req.LandRequest();
			break;
		
        case 'up':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('up ' + dis);
			var message = new Buffer( 'up '+ dis );

        case 'down':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('down ' + dis);
			var message = new Buffer( 'down '+ dis );		

        case 'left':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('left ' + dis);
			var message = new Buffer( 'left '+ dis );

        case 'right':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('right ' + dis);
			var message = new Buffer( 'right '+ dis );		
		
		case 'forward':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('forward ' + dis);
			var message = new Buffer( 'forward '+ dis );
								
		
        case 'back':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('back ' + dis);
			var message = new Buffer( 'back '+ dis );

        case 'cw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('cw ' + dis);
			var message = new Buffer( 'cw '+ dis );

		case 'flip':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('flip' + dis);
			var message = new Buffer( 'flip '+ dis );	

		case 'ccw':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('ccw ' + dis);
			var message = new Buffer( 'ccw '+ dis );
						
		
		case 'setspeed':
			dis = (url_params.length >= 3) ? url_params[2] : 0;
			console.log('setspeed ' + dis);
			var message = new Buffer( 'speed '+ dis );		
			
	  }
	if (clientc) {
		client.send(message, 0, message.length, PORT, HOST, (err) => {if (err) throw err;});
	}
	response.end('Hello Tello.\n');
   
}).listen(8001);


console.log('---------------------------------------');
console.log('Tello Scratch Ext running at http://127.0.0.1:8001/');
console.log('---------------------------------------');




class Requests {
	constructor() {
		this.handler = (err) => {
			if (err) throw err;
		}
	}
	respondToPoll(response){

		var noDataReceived = false;
	
		var resp = "";
		var i;
		for (i = 0; i < dataToTrack_keys.length; i++){
			resp += dataToTrack_keys[i] + " ";
			resp += (i+10);
			resp += "\n";
		}
		response.end(resp);
	}
	
	CommandRequest() {
		var message = new Buffer('command');
	
		client.send(message, 0, message.length, PORT, HOST, this.handler(err));
	}
	
	TakeoffRequest(){
		this.CommandRequest()
	
		var message = new Buffer('takeoff');
		client.send(message, 0, message.length, PORT, HOST, this.handler(err));
	}
	
	LandRequest(){
	
		var message = new Buffer('land');
	
		client.send(message, 0, message.length, PORT, HOST, this.handler(err));
	}
}


