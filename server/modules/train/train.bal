import ballerina/http;

public http:Service trainService = service object {
    resource function get schedule/[int trainId]() returns string {
        return "train shedule(get details) get moethod";
    }

    resource function post schedule() returns string {
        return "train schedule(add) post method";
    }

    resource function put schedule/[int trainId]() returns string {
        return "train schedule(update) post method";
    }

    resource function delete schedule/[int trainId]() returns string {
        return "train schedule(delete) delete method";
    }
};