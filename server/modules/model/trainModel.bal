import server.database;
import ballerinax/mongodb;

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
    string _id?;
    string name;
    Destination[] destinations;
    boolean isDaily;
    string startDate;
    Seats seats;
|};


public function insertTrain(Train train) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    check trainCollection->insertOne(train);

    return ();
}

public function getAllTrains() returns Train[]|error {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    stream<Train, error?> trains = check trainCollection->find();

    Train[] trainArray = [];

    check trains.forEach(function(Train train) {
        trainArray.push(train);
    });

    return trainArray;
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

    _ = check trainCollection->updateOne({ _id: id }, update);

    return ();
}

public function deleteTrainById(string id) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection trainCollection = check db->getCollection("trains");

    _ = check trainCollection->deleteOne({ _id: id });

    return ();
}

