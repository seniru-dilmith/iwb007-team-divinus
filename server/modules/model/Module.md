# Module Documentation

---

## Overview  
This module handles operations related to **tickets, trains, stations**, and **users** using MongoDB as the underlying database. It includes various functions to **add, update, retrieve, and delete** records for these entities, ensuring seamless integration between the business logic and the database.

The functions in this module interact with the **MongoDB database** through collections such as `tickets`, `trains`, `stations`, and `users`. It leverages **Ballerina's MongoDB client** to manage database connections and perform CRUD operations efficiently.

---

## Folder Structure  
```
server
│
├── modules
│   |── admin
│   ├── controller
│   ├── model  
|         |──ticketModel.bal            # proccesses related to ticket management in database
|         |──trainModel.bal             # proccesses related to train management in database
|         |──userModel.bal              # proccesses related to user management in database    
|   |──time                              
```

---

## Functions  

### **Ticket Management**  

#### `addTicket()`  
```ballerina
public function addTicket(Ticket ticket) returns error?;
```
**Description:**  
Inserts a new ticket record into the **`ticket`** collection in MongoDB. This function ensures that all required ticket details are saved correctly.

---

#### `getTicket()`  
```ballerina
public function getTicket(string token) returns Ticket|error?;
```
**Description:**  
Retrieves a ticket record from the **`ticket`** collection based on the provided token. If the token is invalid, it returns an error.

---

#### `updateTicket()`  
```ballerina
public function updateTicket(string token, Ticket ticket) returns error?;
```
**Description:**  
Updates an existing ticket record in the **`ticket`** collection using the provided token. If the update fails or the ticket is not found, it returns an error.

---

### **Train Management**  

#### `insertTrain()`  
```ballerina
public function insertTrain(Train train) returns error?;
```
**Description:**  
Inserts a new train schedule into the **`trains`** collection in MongoDB.

---

#### `getTrainById()`  
```ballerina
public function getTrainById(string id) returns Train|error?;
```
**Description:**  
Retrieves a train record from the **`trains`** collection based on the provided train ID.

---

#### `getAllTrains()`  
```ballerina
public function getAllTrains() returns Train[]|error;
```
**Description:**  
Fetches all train records from the **`trains`** collection.

---

#### `updateTrainById()`  
```ballerina
public function updateTrainById(string id, Train train) returns error?;
```
**Description:**  
Updates a specific train record using its ID. This function ensures that all seat counts and destinations are correctly updated.

---

#### `deleteTrainById()`  
```ballerina
public function deleteTrainById(string id) returns error?;
```
**Description:**  
Deletes a train record from the **`trains`** collection using the given train ID.

---

#### `filterTrains()`  
```ballerina
public function filterTrains(TrainFilter filter) returns Train[]|error;
```
**Description:**  
Filters trains based on departure and arrival stations, as well as travel dates.

---

### **Station Management**  

#### `getStations()`  
```ballerina
public function getStations() returns string[]|error;
```
**Description:**  
Retrieves all station names from the **`stations`** collection.

---

#### `addStations()`  
```ballerina
public function addStations(Station stations) returns error?;
```
**Description:**  
Adds multiple station names to the **`stations`** collection.

---

#### `deleteStation()`  
```ballerina
public function deleteStation(string station) returns error?;
```
**Description:**  
Deletes a specific station from the **`stations`** collection.

---

### **User Management**  

#### `getUserByEmail()`  
```ballerina
public function getUserByEmail(string email) returns User|error?;
```
**Description:**  
Retrieves a user record from the **`users`** collection using the provided email address.

---

#### `addUser()`  
```ballerina
public function addUser(User user) returns error?;
```
**Description:**  
Adds a new user record to the **`users`** collection with the necessary details, such as email and password.

---

## Conclusion  
This module provides a comprehensive solution for managing tickets, trains, stations, and users within a MongoDB database. Each function interacts with the relevant MongoDB collection to perform operations efficiently. The modular structure ensures that different components, such as tickets and trains, are handled independently, improving maintainability and scalability.