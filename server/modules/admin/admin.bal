import ballerina/http;
import server.model;
import server.controller;

public http:Service adminService = service object {
    
    resource function post login( http:Caller caller, @http:Payload model:User user) returns error? {
        error? err = controller:userLogin(caller, user);

        return err;
    }

    resource function post register( http:Caller caller, @http:Payload model:User user) returns error? {
        error? err = controller:userRegister(caller, user);

        return err;
    }

};