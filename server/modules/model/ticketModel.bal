import ballerinax/mongodb;
import server.database;

public type SeatsQuantity record {|
    int firstClass;
    int secondClass;
    int thirdClass;
|};

public type TicketDetails record {|
    string name;
    string nic;
    string email;
    string phone;
    string startStation;
    string endStation;
    SeatsQuantity seatsQuantity;
    json trainScheduleId;
|};

public type Ticket record {|
    json _id?;
    string token;
    float price;
    TicketDetails details;
|};

public function addTicket(Ticket ticket) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection ticketCollection = check db->getCollection("ticket");

    check ticketCollection->insertOne(ticket);

    return ();
}

public function getTicket(string token) returns Ticket|error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection ticketCollection = check db->getCollection("ticket");

    Ticket? ticket = check ticketCollection->findOne({"token" : token});

    return ticket;
}


