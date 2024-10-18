import server.model;
import ballerina/http;


# Description.
#
# + caller - Caller object to respond back to the client
# + train - Train object to be scheduled
# + return - returns an error if there is an error in the model
public function scheduleTrain(http:Caller caller, model:Train train) returns error? {
    check model:insertTrain(train);

    http:Response res = new;
    res.statusCode = 201;
    res.setJsonPayload({"message": "Train scheduled successfully"});
    check caller->respond(res);

    return ();
}
  
# Description.
#
# + caller - Caller object to respond back to the client
# + return - returns an error if there is an error in the model
public function getTrainSchedules( http:Caller caller ) returns error? {

    model:Train[] trains = check model:getAllTrains();
    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload(trains);
    check caller->respond(res);

    return ();
}

# Description.
#
# + caller - Caller object to respond back to the client
# + trainId - train id to update
# + train - updated train record
# + return - returns an error if there is an error in the model
public function updateTrainSchedule(http:Caller caller, string trainId, model:Train train) returns error? {
    model:Train? existingTrain = check model:getTrainById(trainId);

    if(existingTrain is ()){
        http:Response res = new;
        res.statusCode = 404;
        res.setJsonPayload({"message": "Train not found"});
        check caller->respond(res);
        return ();
    }

    int firstClassBooked = existingTrain.seats.firstClass.totalSeats - existingTrain.seats.firstClass.availableSeats;
    int secondClassBooked = existingTrain.seats.secondClass.totalSeats - existingTrain.seats.secondClass.availableSeats;
    int thirdClassBooked = existingTrain.seats.thirdClass.totalSeats - existingTrain.seats.thirdClass.availableSeats;

    if(train.seats.firstClass.totalSeats < firstClassBooked || 
    train.seats.secondClass.totalSeats < secondClassBooked || 
    train.seats.thirdClass.totalSeats < thirdClassBooked){
        http:Response res = new;
        res.statusCode = 400;
        res.setJsonPayload({"message": "Total seats cannot be less than booked seats"});
        check caller->respond(res);
        return ();
    }

    error? err = model:updateTrainById(trainId, train);

    http:Response res = new;
    if(err is error && err.message() == "Train not found"){
        res.statusCode = 404;
        res.setJsonPayload({"message": "Train not found"});
    }else {
        res.statusCode = 200;
        res.setJsonPayload({"message": "Train schedule updated successfully"});
    }

    check caller->respond(res);
    return err;
}


# Description.
#
# + caller - Caller object to respond back to the client
# + trainId - train id to delete
# + return - returns an error if there is an error in the model
public function deleteTrainSchedule(http:Caller caller, string trainId) returns error? {
    error? err = model:deleteTrainById(trainId);

    http:Response res = new;

    if(err is error && err.message() == "Train not found"){
        res.statusCode = 404;
        res.setJsonPayload({"message": "Train not found"});
    } else {
        res.statusCode = 200;
        res.setJsonPayload({"message": "Train schedule deleted successfully"});
    }

    check caller->respond(res);

    return err;
}

# Description.
#
# + caller - Caller object to respond back to the client
# + filter - filter object to filter trains
# + return - returns an error if there is an error in the model
public function filterTrains(http:Caller caller,model:TrainFilter filter ) returns ()|error {
    model:Train[] trainArray = check model:filterTrains(filter);

    http:Response res = new;
    res.statusCode = 200;
    res.setPayload(trainArray);
    check caller->respond(res);

    return ();
}

# Description.
#
# + caller - Caller object to respond back to the client
# + return - returns an error if there is an error in the model
public function getStations(http:Caller caller) returns error? {
    string[] stations = check model:getStations();

    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload({stations : stations});
    check caller->respond(res);

    return ();
}

# Description.
#
# + caller - Caller object to respond back to the client
# + stations - stations to add
# + return - returns an error if there is an error in the model
public function addStations(http:Caller caller, model:Station stations) returns error? {
    check model:addStations(stations);

    http:Response res = new;
    res.statusCode = 201;
    res.setJsonPayload({"message": "Station added successfully"});
    check caller->respond(res);

    return ();
}

# Description.
#
# + caller - Caller object to respond back to the client
# + station - station to delete
# + return - returns an error if there is an error in the model
public function deleteStation(http:Caller caller, string station) returns error? {
    error? err = model:deleteStation(station);

    http:Response res = new;
    if(err is error && err.message() == "Station not found"){
        res.statusCode = 404;
        res.setJsonPayload({"message": "Station not found"});
    }else {
        res.statusCode = 200;
        res.setJsonPayload({"message": "Station deleted successfully"});
    }

    check caller->respond(res);
    return err;
}

