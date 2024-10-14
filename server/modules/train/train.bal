import ballerina/http;
import server.controller;
import server.model;

public http:Service trainService = service object {
    resource function get schedule( http:Caller caller ) returns error? {
        return controller:getTrainSchedules(caller);
    }

    resource function post schedule( http:Caller caller, @http:Payload model:Train train ) returns error? {

        error? err = controller:scheduleTrain(caller , train);
        return err;

    }

    resource function put schedule/[string trainId]( http:Caller caller, @http:Payload model:Train train ) returns error? {
        return controller:updateTrainSchedule(caller, trainId, train);
    }

    resource function delete schedule/[string trainId]( http:Caller caller ) returns error? {
        return controller:deleteTrainSchedule(trainId);
    }
};