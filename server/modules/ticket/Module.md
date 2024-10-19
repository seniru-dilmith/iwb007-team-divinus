# Module Documentation

---

## Overview  
This module provides an **HTTP-based Ticket Service** to handle ticket-related operations such as retrieving ticket details, booking tickets, and validating tickets. The service interacts with the **controller layer** to process ticket logic and uses Ballerina’s HTTP capabilities to manage CORS and API requests efficiently.

---

## Folder Structure  
server           
├── modules                
│   ├── admin
│   ├── controller 
│   ├── database 
│   ├── model
│   ├── ticket                # Ticket management service and logic
│       └── ticket.bal        # Ticket-related service implementation
│   ├── time                 
│   └── train       
└── target                   
---

## Functions (Ticket Service HTTP Resources)  

### `post /`  
```ballerina
resource function post .(http:Caller caller, @http:Payload record {|string token;|} token) returns error?;
```
**Description:**  
This resource retrieves the **ticket details** based on the provided token by calling the `getTicketDetails()` function from the controller.

**Parameters:**  
- **caller**: The HTTP caller to send responses back to the client.
- **token**: A record containing the ticket token.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `post /bookTicket`  
```ballerina
resource function post bookTicket(http:Caller caller, @http:Payload model:TicketDetails ticketDetails) returns error?;
```
**Description:**  
This resource handles **ticket booking**. It accepts ticket details as payload and calls the `bookTicket()` function in the controller to process the booking.

**Parameters:**  
- **caller**: The HTTP caller to send responses back to the client.
- **ticketDetails**: A record containing the details of the ticket to be booked.

**Return:**  
- **`error?`** – Returns an error if the booking operation fails.

---

### `post /validate`  
```ballerina
resource function post validate(http:Caller caller, http:Request req, @http:Payload record {|string token;|} token) returns error?;
```
**Description:**  
This resource validates a **ticket’s status**. It first **authorizes** the request by calling `authorizeToken()` from the controller. If authorization is successful, it proceeds to validate the ticket using the `validateTicket()` function in the controller.

**Parameters:**  
- **caller**: The HTTP caller to send responses back to the client.
- **req**: The HTTP request to authorize the user.
- **token**: A record containing the ticket token.

**Return:**  
- **`error?`** – Returns an error if the validation fails or the user is not authorized.

---

## Conclusion  
The **Ticket Service module** provides key HTTP endpoints to manage ticket operations such as **retrieving ticket details, booking tickets, and validating tickets**. By interacting with the controller layer, it ensures the business logic remains separate from the HTTP logic, promoting modularity and maintainability. The use of **CORS** ensures that the service can be accessed securely from different origins.