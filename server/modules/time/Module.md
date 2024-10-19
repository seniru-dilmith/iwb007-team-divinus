# Module Documentation

---

## Overview  
This module provides essential utilities for **working with dates and times**. It includes functions to **convert dates and times to and from strings**, retrieve the **current date and time**, and **compare dates and times**. These utilities are critical for ensuring accurate scheduling and validation in the system, especially for train services and ticket management.

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
│   └── time                     # Date and time utilities
│       └── time.bal             # Date and time utility functions
```

---

## Functions  

### `stringToDate()`  
```ballerina
public function stringToDate(string date) returns Date|error;
```
**Description:**  
Converts a **string** in the `yyyy-MM-dd` format to a `Date` record.

**Parameters:**  
- **date**: A string representing the date (e.g., `"2024-10-19"`).

**Return:**  
- **`Date | error`** – A `Date` record or an error if the conversion fails.

---

### `dateToString()`  
```ballerina
public function dateToString(Date date) returns string;
```
**Description:**  
Converts a `Date` record to a **string** in the `yyyy-MM-dd` format.

**Parameters:**  
- **date**: A `Date` record.

**Return:**  
- **`string`** – The date as a string in the `yyyy-MM-dd` format.

---

### `today()`  
```ballerina
public function today() returns Date;
```
**Description:**  
Retrieves the **current date** as a `Date` record.

**Parameters:**  
- **None**

**Return:**  
- **`Date`** – The current date.

---

### `timeNow()`  
```ballerina
public function timeNow() returns Time;
```
**Description:**  
Retrieves the **current time** as a `Time` record.

**Parameters:**  
- **None**

**Return:**  
- **`Time`** – The current time.

---

### `stringToTime()`  
```ballerina
public function stringToTime(string time) returns Time|error;
```
**Description:**  
Converts a **string** in the `HH:mm` format to a `Time` record.

**Parameters:**  
- **time**: A string representing the time (e.g., `"14:30"`).

**Return:**  
- **`Time | error`** – A `Time` record or an error if the conversion fails.

---

### `timeToString()`  
```ballerina
public function timeToString(Time time) returns string;
```
**Description:**  
Converts a `Time` record to a **string** in the `HH:mm` format.

**Parameters:**  
- **time**: A `Time` record.

**Return:**  
- **`string`** – The time as a string in the `HH:mm` format.

---

### `isDateAfter()`  
```ballerina
public function isDateAfter(Date date1, Date date2) returns boolean;
```
**Description:**  
Compares two dates to determine if the **first date is after the second date**.

**Parameters:**  
- **date1**: The first date.
- **date2**: The second date.

**Return:**  
- **`boolean`** – `true` if the first date is after the second date, `false` otherwise.

---

### `isTimeAfter()`  
```ballerina
public function isTimeAfter(Time time1, Time time2) returns boolean;
```
**Description:**  
Compares two times to determine if the **first time is after the second time**.

**Parameters:**  
- **time1**: The first time.
- **time2**: The second time.

**Return:**  
- **`boolean`** – `true` if the first time is after the second time, `false` otherwise.

---

## Conclusion  
The **Time Module** provides a comprehensive set of utilities to handle date and time operations. These functions ensure accurate **conversion, retrieval, and comparison** of dates and times, which are essential for scheduling tasks, managing train operations, and validating tickets. By centralizing these utilities, the module promotes consistency and maintainability throughout the system.