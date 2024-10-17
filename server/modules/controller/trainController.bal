import server.model;
import ballerina/http;

// Add a new train schedule
public function scheduleTrain(http:Caller caller, model:Train train) returns error? {
    check model:insertTrain(train);

    http:Response res = new;
    res.statusCode = 201;
    res.setJsonPayload({"message": "Train scheduled successfully"});
    check caller->respond(res);

    return ();
}
  
  // Get all train schedules
public function getTrainSchedules( http:Caller caller ) returns error? {

    model:Train[] trains = check model:getAllTrains();
    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload(trains);
    check caller->respond(res);

    return ();
}

 // Update a train schedule
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

// Delete a train schedule
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

// Filter train schedules
public function filterTrains(http:Caller caller,model:TrainFilter filter ) returns ()|error {
    model:Train[] trainArray = check model:filterTrains(filter);

    http:Response res = new;
    res.statusCode = 200;
    res.setPayload(trainArray);
    check caller->respond(res);

    return ();
}

// Get all stations
public function getStations(http:Caller caller) returns error? {
    string[] stations = check model:getStations();

    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload({stations : stations});
    check caller->respond(res);

    return ();
}

// Add stations
public function addStations(http:Caller caller, model:Station stations) returns error? {
    check model:addStations(stations);

    http:Response res = new;
    res.statusCode = 201;
    res.setJsonPayload({"message": "Station added successfully"});
    check caller->respond(res);

    return ();
}

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

