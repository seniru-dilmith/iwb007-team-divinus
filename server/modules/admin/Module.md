# Admin Service Module Documentation

---

## Overview
This module provides an HTTP-based **Admin Service** that allows users to perform 
**authentication and authorization-related operations** such as login, logout, registration, 
and refreshing tokens. The service interacts with the **controller layer** for business logic 
and the **model layer** for data management. CORS is enabled to allow cross-origin access.

## Diagram of Architecture  
Below is an overview of the architecture for the `adminService` module:  

```
server
│
├── modules
│   ├── admin                    # Handles admin-specific logic
│       ├── admin.bal            # Admin HTTP service logic
│   ├── controller               # Business logic handlers
│   ├── database                 # MongoDB connection logic
│   ├── model                    # Data models (e.g., User, Train, Ticket)
│   ├── ticket                   # Ticket management logic
│   ├── time                     # Time utility functions
│   └── train                    # Train service logic
```

---  

## Functions  

### `login()`  
**Definition:**  
```ballerina
resource function post login(http:Caller caller, @http:Payload model:User user) returns error?
```
**Description:**  
Handles the user login by validating the credentials provided in the request payload. If the credentials are valid, the `userLogin()` function from the controller is invoked to initiate the user session.  

**Parameters:**  
- `caller`: The HTTP caller to send responses.  
- `user`: A `User` object containing the login credentials.  

---

### `logout()`  
**Definition:**  
```ballerina
resource function post logout(http:Caller caller, http:Request req) returns error?
```
**Description:**  
This function is responsible for ending the user session. It calls the `userLogout()` function from the controller to invalidate the session.  

**Parameters:**  
- `caller`: The HTTP caller to send responses.  
- `req`: The HTTP request object, potentially containing session details.

---

### `register()`  
**Definition:**  
```ballerina
resource function post register(http:Caller caller, @http:Payload model:User user) returns error?
```
**Description:**  
Registers a new user with the data provided in the request payload. It invokes the `userRegister()` function from the controller to store the user data.  

**Parameters:**  
- `caller`: The HTTP caller to send responses.  
- `user`: A `User` object containing the registration information.  

---

### `refreshToken()`  
**Definition:**  
```ballerina
resource function post refreshToken(http:Caller caller, http:Request req) returns error?
```
**Description:**  
Issues a new token to the authenticated user to maintain the session. It uses the `refreshToken()` function from the controller to generate and return a new token.  

**Parameters:**  
- `caller`: The HTTP caller to send responses.  
- `req`: The HTTP request object, potentially containing the expired token.

---

This module offers a foundational framework for user management, with flexibility for future enhancements like session management, input validation, and security improvements.