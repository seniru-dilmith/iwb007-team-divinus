import ballerina/http;
import server.ticket;
import server.train;

listener http:Listener httpListener = new(8080);

public function main() returns error? {
    check httpListener.attach(ticket:ticketService,"/ticket");
    check httpListener.attach(train:trainService,"/train");
    check httpListener.start();
}