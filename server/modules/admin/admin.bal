import ballerina/http;
import server.model;
import server.controller;

public http:Service adminService = @http:ServiceConfig{
    cors: {
        allowOrigins: ["*"],
        allowCredentials: true
    }
} service object {
    resource function post login( http:Caller caller, @http:Payload model:User user) returns error? {
        error? err = controller:userLogin(caller, user);

        return err;
    }

    //need to implement logout

    resource function post register( http:Caller caller, @http:Payload model:User user) returns error? {
        error? err = controller:userRegister(caller, user);

        return err;
    }

    resource function post refreshToken( http:Caller caller, http:Request req) returns error? {
        error? err = controller:refreshToken(caller, req);

        return err;
    }

};