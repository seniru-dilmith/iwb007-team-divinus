import server.model;
import ballerina/http;
import server.time;
import ballerina/random;

public function generateToken(model:TicketDetails details) returns string|error {
    time:Time timeNow = time:timeNow();
    time:Date today = time:today();

    string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    int charLength = characters.length();
    string randomStr = "";

    foreach int i in 0...4 {
        int randomInt = check random:createIntInRange(0,charLength-1);
        randomStr = string:concat(randomStr, characters[randomInt]);
    }

    string token = string:concat(
        details.startStation.substring(0,2),
        today.day.toString(),
        randomStr,
        timeNow.hours.toString(),
        details.endStation.substring(0,2)
    );

    return token;
}


public function getTicketDetails(http:Caller caller, string token) returns error? {
    model:Ticket? ticket = check model:getTicket(token);

    http:Response res = new;

    if(ticket is ()){
        res.statusCode = 404;
        res.setJsonPayload({"message": "Ticket not found"});
        check caller->respond(res);
        return ();
    } 

    model:Train? trainSchedule = check model:getTrainById(ticket.details.trainScheduleId);

    if(trainSchedule is ()){
        res.statusCode = 404;
        res.setJsonPayload({"message": "Ticket has expired"});
        check caller->respond(res);
        return ();
    }

    time:Date todayDate = time:today();
    time:Date startDate = check time:stringToDate(trainSchedule.startDate);

    if(time:isDateAfter(todayDate, startDate)){
        res.statusCode = 404;
        res.setJsonPayload({"message": "Ticket has expired"});
        check caller->respond(res);
        return ();
    }

    record {|model:Ticket ticket; model:Train train;|} ticketDetails = {
        ticket: ticket,
        train: trainSchedule
    };

    res.statusCode = 200;
    res.setJsonPayload(ticketDetails);
    check caller->respond(res);
    return ();
}

public function bookTicket(http:Caller caller, model:TicketDetails ticketDetails) returns error? {
    model:Train? trainSchedule = check model:getTrainById(ticketDetails.trainScheduleId);

    if(trainSchedule is ()){
        http:Response res = new;
        res.statusCode = 404;
        res.setJsonPayload({"message": "Train schedule not found"});
        check caller->respond(res);
        return ();
    }

    time:Date todayDate = time:today();
    time:Date startDate = check time:stringToDate(trainSchedule.startDate);

    if(time:isDateAfter(todayDate, startDate)){
        http:Response res = new;
        res.statusCode = 404;
        res.setJsonPayload({"message": "Train schedule has expired"});
        check caller->respond(res);
        return ();
    }

    if(ticketDetails.seatsQuantity.firstClass > trainSchedule.seats.firstClass.availableSeats ||
        ticketDetails.seatsQuantity.secondClass > trainSchedule.seats.secondClass.availableSeats ||
        ticketDetails.seatsQuantity.thirdClass > trainSchedule.seats.thirdClass.availableSeats){
          
        http:Response res = new;
        res.statusCode = 404;
        res.setJsonPayload({"message": "Seats are not available"});
        check caller->respond(res);
        return ();
    }

    // claim the cost of the ticket
    float price = 10.0;

    model:Ticket ticket = {
        token: check generateToken(ticketDetails),
        price: price,
        details: ticketDetails
    };

    model:Seats updatedSeats = {
        firstClass: {
            totalSeats: trainSchedule.seats.firstClass.totalSeats, 
            availableSeats: trainSchedule.seats.firstClass.availableSeats - ticketDetails.seatsQuantity.firstClass
        },
        secondClass: {
            totalSeats: trainSchedule.seats.secondClass.totalSeats, 
            availableSeats: trainSchedule.seats.secondClass.availableSeats - ticketDetails.seatsQuantity.secondClass
        },
        thirdClass: {
            totalSeats: trainSchedule.seats.thirdClass.totalSeats, 
            availableSeats: trainSchedule.seats.thirdClass.availableSeats - ticketDetails.seatsQuantity.thirdClass
        }
    };

    trainSchedule.seats = updatedSeats;
    model:Train modifiedTrain = trainSchedule;

    check model:updateTrainById(ticketDetails.trainScheduleId, modifiedTrain);
    check model:addTicket(ticket);

    http:Response res = new;
    res.statusCode = 201;
    res.setJsonPayload({"message": "Ticket booked successfully", "token": ticket.token});
    check caller->respond(res);
    return ();
}




