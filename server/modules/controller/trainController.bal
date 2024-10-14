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