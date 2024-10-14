import server.model;
import ballerina/http;


public function scheduleTrain(http:Caller caller, model:Train train) returns error? {
    check model:insertTrain(train);

    http:Response res = new;
    res.statusCode = 201;
    res.setJsonPayload({"message": "Train scheduled successfully"});
    check caller->respond(res);

    return ();
}
  
public function getTrainSchedules( http:Caller caller ) returns error? {

    model:Train[] trains = check model:getAllTrains();
    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload({trainSchedules : trains});
    check caller->respond(res);

    return ();
}

public function updateTrainSchedule(http:Caller caller, string trainId, model:Train train) returns error? {
    check model:updateTrainById(trainId, train);

    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload({"message": "Train schedule updated successfully"});
    check caller->respond(res);

    return ();
}

public function deleteTrainSchedule(string trainId) returns error? {
    check model:deleteTrainById(trainId);

    http:Response res = new;
    res.statusCode = 200;
    res.setJsonPayload({"message": "Train schedule deleted successfully"});

    return ();
}
