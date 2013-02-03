
/*
 * GET users listing.
 */

exports.list = function(req, res){
    res.writeHead(200, {
	'Content-Type'  : 'text/event-stream',
	'Cache-Control' : 'no-cache',
	'Connection'    : 'keep-alive',
    });

    console.log('Client connect');
 
    var t = setInterval(function () {
        console.log('Send data');
        res.write('data: DATA\n\n');
    }, 1000);
 
    res.socket.on('close', function () {
        console.log('Client leave');
        clearInterval(t);
    });

};
