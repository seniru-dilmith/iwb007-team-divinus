import ballerinax/mongodb;
import server.database;

# Description.
#
# + firstClass - first class seat quantity  
# + secondClass - second class seat quantity
# + thirdClass - third class seat quantity
public type SeatsQuantity record {|
    int firstClass;
    int secondClass;
    int thirdClass;
|};

# Description.
#
# + name - name of the passenger  
# + nic - national identity card number
# + email - email address
# + phone - phone number 
# + startStation - departure station
# + endStation - arrival station
# + seatsQuantity - booked seat quantity
# + trainScheduleId - train schedule id
public type TicketDetails record {|
    string name;
    string nic;
    string email;
    string phone;
    string startStation;
    string endStation;
    SeatsQuantity seatsQuantity;
    string trainScheduleId;
|};

# Description.
#
# + _id - ticket id
# + token - ticket token
# + status - ticket status
# + price - ticket price
# + details - ticket details
public type Ticket record {|
    json _id?;
    string token;
    string status;
    float price;
    TicketDetails details;
|};

# Description.
#
# + ticket - ticket record to insert
# + return - return error if any
public function addTicket(Ticket ticket) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection ticketCollection = check db->getCollection("ticket");

    check ticketCollection->insertOne(ticket);

    return ();
}

# Description.
#
# + token - ticket token
# + return - return Ticket object or error if any
public function getTicket(string token) returns Ticket|error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection ticketCollection = check db->getCollection("ticket");
    
    Ticket? ticket = check ticketCollection->findOne({"token": token});
    
    return ticket;
}

# Description.
#
# + token - ticket token
# + ticket - updated ticket record
# + return - return error if any
public function updateTicket(string token, Ticket ticket) returns error? {
    mongodb:Database db = check database:getDatabase();
    mongodb:Collection ticketCollection = check db->getCollection("ticket");

    mongodb:Update update = {
        set: {
            "status": ticket.status,
            "price": ticket.price,
            "details": ticket.details
        }
    };

    mongodb:UpdateResult result = check ticketCollection->updateOne({"token": token}, update);
    
    if(result.modifiedCount == 0){
        return error("Ticket not found");
    }

    return ();
}

