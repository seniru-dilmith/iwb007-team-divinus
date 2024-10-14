import ballerina/http;
import server.ticket;
import server.train;
import server.admin;

listener http:Listener httpListener = new(8080);

public function main() returns error? {
    check httpListener.attach(ticket:ticketService,"/ticket");
    check httpListener.attach(train:trainService,"/train");
    check httpListener.attach(admin:adminService,"/admin");
    check httpListener.start();
}