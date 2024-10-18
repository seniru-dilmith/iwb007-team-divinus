import ballerina/http;
import server.controller;
import server.model;

public http:Service ticketService = @http:ServiceConfig{
    cors: {
        allowOrigins: ["*"]
    }
} service object {
    resource function post .(http:Caller caller, @http:Payload record {|string token;|} token) returns error? {
        return controller:getTicketDetails(caller, token.token);
    }

    resource function post bookTicket( http:Caller caller, @http:Payload model:TicketDetails ticketDetails ) returns error? {
        return controller:bookTicket(caller, ticketDetails);
    }

    resource function post validate(http:Caller caller, http:Request req, @http:Payload record {|string token;|} token) returns error? {
        error? err = controller:authorizeToken(caller, req);
        if (err is ()) {
            return controller:validateTicket(caller, token.token);
        }
        return ();
    }
};