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
    json _id?;
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
