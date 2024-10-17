import server.database;
import ballerinax/mongodb;
import server.time;


# Description.
#
# + totalSeats - total number of seats
# + availableSeats - available number of seats
public type SeatsAvailablity record {|
    int totalSeats;
    int availableSeats;
|};

# Description.
#
# + firstClass - first class seat quantity
# + secondClass - second class seat quantity
# + thirdClass - third class seat quantity
public type Seats record {|
    SeatsAvailablity firstClass;
    SeatsAvailablity secondClass;
    SeatsAvailablity thirdClass;
|};

# Description.
#
# + station - station name
# + time - time to reach the station
public type Destination record {|
    string station;
    string time;
|};

# Description.
#
# + _id - train id
# + name - train name
# + destinations - train destinations
# + isDaily - is train daily
# + startDate - train start date 
# + seats - train seats
public type Train record {|
    json _id?;
    string name;
    Destination[] destinations;
    boolean isDaily;
    string startDate;
    Seats seats;
|};

# Description.
#
# + date - date to filter
# + arrivalStation - arrivalStation - field description
# + departureStation - departureStation - field description
public type TrainFilter record {|
    string date; 
    string arrivalStation; 
    string departureStation;
|};

# Description.
#
# + station - station names
public type Station record {|
    string[] station;
|};


# Description.
#
# + train - train record to insert
# + return - return error if any
public function insertTrain(Train train) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    check trainCollection->insertOne(train);

    return ();
}

# Description.
#
# + id - train id
# + return - return Train object or error if any
public function getTrainById(string id) returns Train|error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    Train? train = check trainCollection->findOne({"_id": {"$oid": id}});

    return train;
}

# Description.
# + return - return all Trains or error if any
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

# Description.
#
# + id - train id
# + train - updated train record
# + return - return error if any
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

# Description.
#
# + id - train id
# + return - return error if any
public function deleteTrainById(string id) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    mongodb:DeleteResult result = check trainCollection->deleteOne({"_id": {"$oid": id }});

    if(result.deletedCount == 0){
        return error("Train not found");
    }

    return ();
}

# Description.
# + return - return all stations or error if any
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


# Description.
#
# + stations - stations to add
# + return - return error if any
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

# Description.
#
# + filter - filter object to filter trains
# + return - return filtered trains or error if any
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


# Description.
#
# + station - station to delete
# + return - return error if any
public function deleteStation(string station) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection stationCollection = check db->getCollection("stations");

    mongodb:DeleteResult result = check stationCollection->deleteOne({"station": station});

    if(result.deletedCount == 0){
        return error("Station not found");
    }

    return ();
}



