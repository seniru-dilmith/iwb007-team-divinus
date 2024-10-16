import ballerina/http;
import server.controller;
import server.model;

public http:Service ticketService = service object {
    resource function post .(http:Caller caller, @http:Payload string token) returns error? {
        return controller:getTicketDetails(caller, token);
    }

    resource function post bookTicket( http:Caller caller, @http:Payload model:TicketDetails ticketDetails ) returns error? {
        return controller:bookTicket(caller, ticketDetails);
    }
};