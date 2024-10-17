import ballerina/http;
import server.controller;
import server.model;


public http:Service trainService = @http:ServiceConfig{
    cors: {
        allowOrigins: ["*"],
        allowCredentials: true
    }
} service object {
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
        return controller:deleteTrainSchedule(caller, trainId);
    }

    resource function get stations( http:Caller caller ) returns error? {
        return controller:getStations(caller);
    }

    resource function post stations( http:Caller caller, @http:Payload model:Station stations) returns error? {
        return controller:addStations(caller, stations);
    }

    resource function delete stations/[string station]( http:Caller caller ) returns error? {
        return controller:deleteStation(caller, station);
    }

    resource function post search( http:Caller caller, @http:Payload model:TrainFilter filter ) returns error? {
        return controller:filterTrains(caller, filter);
    }
};