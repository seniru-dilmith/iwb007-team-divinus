# Module Documentation

---

## Overview  
This module manages the connection to a **MongoDB** database, ensuring efficient and reusable database access throughout the system. It uses Ballerina’s MongoDB client to connect to the database, with the connection string and database name defined as configurable parameters. The module ensures that the connection is established only once and reused for subsequent operations, enhancing performance.

---

## Folder Structure  
```
server
│
├── modules
│   └── admin
│   ├── controller   
│   ├── database
│   │   └── mongodb.bal  # MongoDB connection handler
│   ├── model            # Data models (User, Train, Ticket, etc.)
│   └── time             # Time utilities for schedules and operations
```

---

## Functions  

### `getDatabase()`  
```ballerina
public function getDatabase() returns mongodb:Database|error;
```
**Description:**  
Provides a reusable MongoDB database instance. The function ensures that a single connection is established and reused throughout the system, avoiding repeated connections.

**Parameters:**  
- **None**

**Return:**  
- **`mongodb:Database | error`** – The MongoDB database instance if connected successfully, or an error if the connection fails.

**Function Logic:**
1. **Check Existing Connection:**  
   If a connection already exists, it reuses it.
2. **Create Client:**  
   If not, a new MongoDB client is created using the configured connection string.
3. **Retrieve Database:**  
   Fetches the database by the specified name.
4. **Return Database:**  
   The database instance is returned for use in other modules.

---

## Conclusion  
This MongoDB module ensures efficient database management by establishing a connection only when necessary and reusing it for all subsequent operations. The configurable connection string and database name make it adaptable to different environments, enhancing flexibility and performance.