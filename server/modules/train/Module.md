# Module Documentation

---

## Overview  
The **Train Service Module** provides HTTP-based endpoints to **manage train schedules, stations, and train search operations**. It interacts with the **controller layer** to handle operations such as **adding, updating, and deleting train schedules and stations**. Additionally, it includes functionality to **search for trains** based on user-provided filters. 

This module also integrates **CORS policies** to allow cross-origin access and uses **authorization tokens** to secure specific operations.

---

## Folder Structure  
```
server
│
├── modules
│   ├── admin                   
│   ├── controller          
│   ├── database               
│   ├── model               
│   ├── ticket                 
│   └── time                     
│   └── train                    # module for train management
│       └── trainService.bal     # Train-related HTTP service
```

---

## Functions (Train Service HTTP Resources)

### `get /schedule`  
```ballerina
resource function get schedule(http:Caller caller) returns error?;
```
**Description:**  
Retrieves **all train schedules** from the system by calling `getTrainSchedules()` from the controller.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `post /schedule`  
```ballerina
resource function post schedule(http:Caller caller, @http:Payload model:Train train) returns error?;
```
**Description:**  
Adds a **new train schedule** to the system using the `scheduleTrain()` function from the controller.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.
- **train**: The train details to be added.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `put /schedule/{trainId}`  
```ballerina
resource function put schedule/[string trainId](http:Caller caller, http:Request req, @http:Payload model:Train train) returns error?;
```
**Description:**  
Updates the **train schedule** for the given train ID. This endpoint requires **authorization** using the `authorizeToken()` function.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.
- **req**: The HTTP request for authorization.
- **trainId**: The ID of the train to update.
- **train**: The updated train details.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `delete /schedule/{trainId}`  
```ballerina
resource function delete schedule/[string trainId](http:Caller caller) returns error?;
```
**Description:**  
Deletes a **train schedule** based on the given train ID.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.
- **trainId**: The ID of the train to delete.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `get /stations`  
```ballerina
resource function get stations(http:Caller caller) returns error?;
```
**Description:**  
Retrieves **all stations** from the system.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `post /stations`  
```ballerina
resource function post stations(http:Caller caller, http:Request req, @http:Payload model:Station stations) returns error?;
```
**Description:**  
Adds **new stations** to the system. This endpoint requires **authorization** using the `authorizeToken()` function.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.
- **req**: The HTTP request for authorization.
- **stations**: The station details to be added.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `delete /stations/{station}`  
```ballerina
resource function delete stations/[string station](http:Caller caller, http:Request req) returns error?;
```
**Description:**  
Deletes a **station** based on the given station name. This endpoint requires **authorization**.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.
- **req**: The HTTP request for authorization.
- **station**: The name of the station to delete.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

### `post /search`  
```ballerina
resource function post search(http:Caller caller, @http:Payload model:TrainFilter filter) returns error?;
```
**Description:**  
Searches for **trains** based on user-provided **filters**, such as departure and arrival stations.

**Parameters:**  
- **caller**: The HTTP caller to respond back to the client.
- **filter**: The search filter criteria.

**Return:**  
- **`error?`** – Returns an error if the operation fails.

---

## Conclusion  
The **Train Service Module** provides comprehensive HTTP endpoints for **managing train schedules, stations**, and **search operations**. It ensures secure access to certain operations through **authorization tokens** and allows **CORS-enabled** access. With these endpoints, users can **add, update, delete, and search** for trains and stations efficiently.