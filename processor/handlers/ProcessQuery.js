/**
 * Process Search/Ask Query, find the results in DB and return
 */
var ProcessQuery = {
    /**
     * Insert newly asked query to DB
     * @param db database instance
     * @param data User input data
     */
    increaseVocab: function(db, data) {
        //TODO:: Need to remove duplicate Records from vocab collection.
        var collection = db.collection('vocab');
        // Insert some documents 
        collection.insert([{
            "data" : data,
            "created_at" : new Date()
        }], function(err, result) {
            if(!err && result) {
                //Good to Go Record saved.
            } else {
                console.log("DATA is not saving in memory.");
            }
        });
    },
    /**
     * Search Data in DB and return similar Records.
     * @param db database instance
     * @param data User input data
     * @param cb Callback function to return similar type of records.
     */
    searchVocab: function(db, data, cb) {
        // Find some documents 
        db.collection('vocab').find({data: {$regex: data}}).toArray(function(err, docs) {
            //Return results searched from vocab collection.
            cb(err, docs);
        });
    }
}

module.exports = ProcessQuery;