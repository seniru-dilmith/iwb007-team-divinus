import ballerina/http;
import server.controller;
import server.model;

public http:Service trainService = service object {
    resource function get schedule/[int trainId]() returns string {
        return "train shedule(get details) get moethod";
    }

    resource function post schedule( http:Caller caller, @http:Payload model:Train train ) returns error? {

        error? err = controller:scheduleTrain(caller , train);
        return err;

    }

    resource function put schedule/[int trainId]() returns string {
        return "train schedule(update) post method";
    }

    resource function delete schedule/[int trainId]() returns string {
        return "train schedule(delete) delete method";
    }
};