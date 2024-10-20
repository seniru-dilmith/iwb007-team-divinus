# Module Documentation

---

## Overview  
This project provides a modular train ticketing and scheduling system implemented in Ballerina. The system is structured into **controllers** to handle operations related to tickets, trains, and users, ensuring better separation of logic. It leverages JWT for user authentication and integrates with the `server.model` for data management.

---

## Architecture Diagram  
```
server
│
├── modules
│   └── admin
│   ├── controller
│       ├── ticketController.bal  # Manages ticket-related operations
│       ├── trainController.bal   # Manages train schedules
│       └── userController.bal    # Manages user authentication and sessions
│
├── database                      
├── model                        
├── ticket                      
└── time                       
```

---

## Module: `ticketController.bal`  
### Overview  
This module manages ticket booking, validation, and retrieval operations. It ensures that tickets are booked only if train schedules are valid and seats are available. It also generates unique tokens for each booked ticket and updates ticket statuses accordingly.

### Functions  

#### `generateToken()`  
```ballerina
public function generateToken(model:TicketDetails details) returns string|error {
    // Implementation of token generation using station names, date, and time.
}
```
**Description:**  
Generates a unique token using the train details, including start station, end station, current date, and time. A random string is also appended to ensure uniqueness.

---

#### `bookTicket()`  
```ballerina
public function bookTicket(http:Caller caller, model:TicketDetails ticketDetails) returns error? {
    // Books a ticket by validating the train schedule and seat availability.
}
```
**Description:**  
Books a ticket for the user. It checks for available seats in the chosen class and ensures the train schedule is valid. If everything is valid, the ticket is generated and saved.

---

#### `getTicketDetails()`  
```ballerina
public function getTicketDetails(http:Caller caller, string token) returns error? {
    // Retrieves ticket details using the provided token.
}
```
**Description:**  
Fetches the details of a ticket based on the token. If the ticket or the associated train schedule is not valid, it responds with an appropriate error message.

---

#### `validateTicket()`  
```ballerina
public function validateTicket(http:Caller caller, string token) returns error? {
    // Validates the status of the ticket and updates it if needed.
}
```
**Description:**  
Validates a ticket by checking its status and expiration. If the ticket is still active, it marks it as expired.

---

## Module: `trainController.bal`  
### Overview  
This module manages train schedules, including adding, updating, and deleting train schedules. It also ensures that seat counts remain consistent and allows filtering of trains based on various criteria.

### Functions  

#### `scheduleTrain()`  
```ballerina
public function scheduleTrain(http:Caller caller, model:Train train) returns error? {
    // Schedules a new train by adding it to the system.
}
```
**Description:**  
Adds a new train schedule to the database with details like seat availability and travel dates.

---

#### `updateTrainSchedule()`  
```ballerina
public function updateTrainSchedule(http:Caller caller, string trainId, model:Train train) returns error? {
    // Updates the schedule and seats for an existing train.
}
```
**Description:**  
Modifies an existing train schedule. Ensures that booked seats are not reduced beyond the available limits.

---

#### `deleteTrainSchedule()`  
```ballerina
public function deleteTrainSchedule(http:Caller caller, string trainId) returns error? {
    // Deletes a train schedule based on its ID.
}
```
**Description:**  
Removes a train schedule from the system. If the train ID is not found, it responds with an appropriate error message.

---

#### `filterTrains()`  
```ballerina
public function filterTrains(http:Caller caller, model:TrainFilter filter) returns ()|error {
    // Filters the trains based on the given criteria.
}
```
**Description:**  
Fetches trains that match the specified filter criteria, such as route, date, or seat availability.

---

## Module: `userController.bal`  
### Overview  
This module provides user authentication and session management using JWT tokens. It handles login, registration, password encryption, and token-based session handling.

### Functions  

#### `userLogin()`  
```ballerina
public function userLogin(http:Caller caller, model:User user) returns error? {
    // Logs in a user and issues JWT tokens for authentication.
}
```
**Description:**  
Authenticates a user by checking the provided credentials. If valid, it generates access and refresh tokens.

---

#### `userRegister()`  
```ballerina
public function userRegister(http:Caller caller, model:User user) returns error? {
    // Registers a new user in the system.
}
```
**Description:**  
Registers a new user by validating the input and encrypting the password. It ensures that duplicate users are not allowed.

---

#### `refreshToken()`  
```ballerina
public function refreshToken(http:Caller caller, http:Request req) returns error? {
    // Issues a new access token using the refresh token.
}
```
**Description:**  
Generates a new access token if the refresh token is valid and unexpired.

---

#### `userLogout()`  
```ballerina
public function userLogout(http:Caller caller, http:Request req) returns error? {
    // Logs out the user by invalidating the refresh token.
}
```
**Description:**  
Logs out the user by removing the refresh token from the session.

---

#### `authorizeToken()`  
```ballerina
public function authorizeToken(http:Caller caller, http:Request req) returns error? {
    // Validates the JWT token for authorization.
}
```
**Description:**  
Validates the JWT token included in the request to ensure the user is authorized to access the protected resource.

---

## Conclusion  
The **ticketController**, **trainController**, and **userController** modules work together to create a seamless train ticketing experience. This modular structure ensures that each component handles its specific responsibility, improving maintainability and scalability. The use of JWT-based authentication and well-defined seat management processes ensures a secure and efficient system.