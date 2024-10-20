# iwb007-team-divinus
---

# Train Schedulling with Ballerina

This project includes a **Ballerina** backend and a **React** frontend. Follow the steps below to set up and run the project locally.

---

## Prerequisites

Make sure you have the following tools installed:

1. **Ballerina** – [Install Ballerina](https://ballerina.io/downloads/)  
2. **Node.js** – [Install Node.js](https://nodejs.org/)  
3. **Git** – [Install Git](https://git-scm.com/downloads)  
4. **MongoDB database tools** - [Install MongoDB database tools](https://www.mongodb.com/try/download/database-tools)

---

## Getting Started

### Clone the repository

You can either:

- **Download as ZIP**: Click the **Code** button on the repository page, then select **Download ZIP**. Extract the files once downloaded.

- **Clone using Git**: Open your terminal and run:

   ```bash
   git clone <repository-url>
   ```

By default, the **main** branch will be cloned.

---

## Setup Instructions

### 1. Setting Up the database

We have created a sample database for you. You need to add it to your own mongoDB cluster. You can find the sample databse at `/server/database_dump` directory.

1. **Set Up tour own mongoDB cluster**
2. **Run the below command to initialize your own database and collections**

```bash
mongorestore --uri="<Your Connection String>/<Your databse name>" --nsInclude="<Your database name>.*" "databse dump location"
# example: 
mongorestore --uri="mongodb+srv://<database_user>:<database_password>@<cluster name>.t24qq.mongodb.net/<database name>" --nsInclude="new_db.*" "/server/database_dump"
```

### 2. Frontend Setup

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Follow the steps in [Frontend Readme section(i)](/client/README.md) to set up the frontend.

### 3. Backend Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Follow the steps in [Backend Readme section(i)](/server/README.md) to set up the backend.

** For Your checking purposes we have 

---

## Running the Project

Once both the frontend and backend are set up, you will see the server and frontend running successfully.

---

## License

This project is licensed under MIT LICENSE. See the [LICENSE](/LICENSE) file for more details.
