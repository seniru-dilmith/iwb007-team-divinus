import ballerina/http;
import server.ticket;
import server.train;
import server.admin;
import ballerina/io;

configurable int port = ?;

listener http:Listener httpListener = new(port);

public function main() returns error? {
    check httpListener.attach(ticket:ticketService,"/ticket");
    check httpListener.attach(train:trainService,"/train");
    check httpListener.attach(admin:adminService,"/admin");
    check httpListener.start();

    io:println("Server started at http://localhost:" + port.toString());
}