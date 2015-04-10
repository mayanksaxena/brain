var io = require('socket.io').listen(1232),
    assert = require("assert"),
    path = require('path'),
    fs = require('fs'),
    mongoClient = require('mongodb').MongoClient,
    env = process.env.NODE_ENV || 'local',
    config = require('./config/config'),
    ProcessQuery = require('./handlers/ProcessQuery');

//Check Database connection is open.
mongoClient.connect(config[env].db_url, function(err, db) {
    if(err) throw err;
    console.log("DB connection open !!");
    /**
     * Establish connection with socket server.
     */
    io.on('connection', function(socket) {
        //Listen all events in process-brain section
        socket.on('process-brain', function(data) {
            console.log(data.data, data.type);
            //Clean String to process it further.
            data.data = data.data.replace(/\r?\n|\r/g,'');
            //check the type of operation needed to process the query.
            switch(data.type) {
                //If it is natural language processing NLP then execute this case
                case 'NLP':
                    //Search similar Type of Search results and its history.
                    ProcessQuery.searchVocab(db, data.data, function(err, similarRecords) {
                        console.log("similarRecords", similarRecords);
                    });
                    //Increase Vocab so we can increase memory of our brain ;)
                    ProcessQuery.increaseVocab(db, data.data);
                    break;
            }
            socket.emit('reply-from-brain', 'thanks i am thinking about your query!');
        });
    });
});