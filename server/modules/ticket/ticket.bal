import ballerina/http;

public http:Service ticketService = service object {
    resource function get getTicket() returns string {
        return "getTicket get moethod";
    }

    resource function post validate() returns string {
        return "ticket validate post method";
    }

    resource function put book() returns string {
        return "ticket book post method";
    }
};