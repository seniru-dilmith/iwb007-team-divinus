import server.database;
import ballerinax/mongodb;
import server.time;


public type SeatsAvailablity record {|
    int totalSeats;
    int availableSeats;
|};

public type Seats record {|
    SeatsAvailablity firstClass;
    SeatsAvailablity secondClass;
    SeatsAvailablity thirdClass;
|};

public type Destination record {|
    string station;
    string time;
|};

public type Train record {|
    json _id?;
    string name;
    Destination[] destinations;
    boolean isDaily;
    string startDate;
    Seats seats;
|};

public type TrainFilter record {|
    string date; 
    string arrivalStation; 
    string departureStation;
|};

public type Station record {|
    string[] station;
|};


public function insertTrain(Train train) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    check trainCollection->insertOne(train);

    return ();
}

public function getTrainById(string id) returns Train|error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    Train? train = check trainCollection->findOne({"_id": {"$oid": id}});

    return train;
}

public function getAllTrains() returns Train[]|error {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    stream<Train, error?> trains = check trainCollection->find();

    Train[] trainArray = [];

    error? err = trains.forEach(function(Train train) {
        trainArray.push(train);
    });
    
    if(err is ()){
        return trainArray;
    } else {
        return err;
    }

}

public function updateTrainById(string id, Train train) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    mongodb:Update update = {
        set: {
            name: train.name,
            destinations: train.destinations,
            isDaily: train.isDaily,
            startDate: train.startDate,
            seats: train.seats
        }
    };

    mongodb:UpdateResult result = check trainCollection->updateOne({ "_id": {"$oid": id }}, update);

    if(result.modifiedCount == 0){
        return error("Train not found");
    }

    return ();
}

public function deleteTrainById(string id) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    mongodb:DeleteResult result = check trainCollection->deleteOne({"_id": {"$oid": id }});

    if(result.deletedCount == 0){
        return error("Train not found");
    }

    return ();
}

public function getStations() returns string[]|error {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection stationCollection = check db->getCollection("stations");

    stream<record {| string station; |}, error?> stationRecords = check stationCollection->find();

    string[] stationArray = [];

    check stationRecords.forEach(function(record {| string station; |} stationRecord) {
        stationArray.push(stationRecord.station);
    });

    return stationArray;
}


public function addStations(Station stations) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection stationCollection = check db->getCollection("stations");

    record {| string station; |}[] records = [];

    foreach var item in stations.station {
        records.push({station: item});
    }

    check stationCollection->insertMany(records);

    return ();
}

public function filterTrains(TrainFilter filter) returns Train[]|error {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    map<json> query = {
        "$and": [
            { "destinations.station": { "$in" : [filter.arrivalStation]} },
            { "destinations.station": { "$in" : [filter.departureStation]} }
        ],
        "$or" : [
            {"startDate": filter.date},
            {"isDaily": true}
        ]
    };

    stream<Train, error?> trainStream = check trainCollection->find(query);

    Train[] trains = [];

    error? err = trainStream.forEach(function(Train train) {
        string? arrivalStation = ();
        string? departureStation = ();

        foreach var item in train.destinations {
            if(item.station == filter.arrivalStation){
                arrivalStation = item.time;
            } else if(item.station == filter.departureStation){
                departureStation = item.time;
            }
        }

        if(arrivalStation is () || departureStation is ()){
            return;
        } else {
            time:Time|error arrivalTime = time:stringToTime(arrivalStation);
            time:Time|error departureTime = time:stringToTime(departureStation);

            if(arrivalTime is error || departureTime is error){
                return;
            } else if time:isTimeAfter(departureTime, arrivalTime){
                return trains.push(train);
            }
        }
    });

    if(err is ()){
        return trains;
    } else {
        return err;
    }
}


public function deleteStation(string station) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection stationCollection = check db->getCollection("stations");

    mongodb:DeleteResult result = check stationCollection->deleteOne({"station": station});

    if(result.deletedCount == 0){
        return error("Station not found");
    }

    return ();
}



