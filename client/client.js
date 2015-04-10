var io = require('socket.io-client'),
    fs = require('fs'),
    util = require('util'),
    socket = io.connect('localhost', {
        port: 1232
    });

    //Listen if Brain is connected or not
    socket.on('connect', function() {
        console.log("Congrats you are Connected to Brain ! Please ask what do you want to ask..");
    });

    //Listen if there is some reply from brain
    socket.on('reply-from-brain', function(data) {
        console.log("Brain Says: ", data);
    });

    //Listen if brain is not working anymore !!
    socket.on('disconnect', function(){
        console.log("Sorry Brain is not working currently, it needs some sleep !");
    });

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    //Take input from keyboard
    process.stdin.on('data', function (text) {

        //Emit to brain whatever user have typed in console.
        socket.emit("process-brain", {
            data: text,
            type: "NLP" //natural language processing
        });

        //If Client wants to exit then type exit to stop communicate with brain
        if (text === 'quit\n') {
            done();
        }
    });

    //Client wants to disconnect.
    function done() {
        console.log('Now that process.stdin is paused, there is nothing more to do.');
        process.exit();
    }
