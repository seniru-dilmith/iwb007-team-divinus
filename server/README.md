# Initialize the Ballerina Backend

---
## Section(i)

## Prerequisites  
Before running the backend, ensure you have the following installed:  

1. **Ballerina** – [Download and install](https://ballerina.io/downloads/)  
2. **Git** – [Install Git](https://git-scm.com/downloads)  
3. Create your own `Config.toml` file by following the [Config.toml.example](./Config.toml.example)

run:

```bash
bal build
```

---

## Available Commands  

In the `server` directory, you can use the following commands:  

### `bal run`  

Runs the Ballerina backend in development mode. It will start the server, and you will see logs in the terminal indicating the service has started.

### `bal test`  

Launches the test suite to ensure everything is working correctly.  
For more details on testing, refer to [Ballerina testing](https://ballerina.io/learn/testing-ballerina-code/).

### `bal build`  

Compiles and packages the project into an executable `.jar` file.  
The build artifacts will be placed in the `target` directory, optimized for production deployment.

---

---

## Project Structure  

```bash
server/
├── modules/                # Directory for Ballerina modules
├── target/                 # Directory for build artifacts
├── .devcontainer.json      # Dev container configuration file
├── .gitignore              # Git ignore rules
├── Ballerina.toml          # Ballerina configuration file
├── Config.toml             # Configuration file used by the backend
├── Config.toml.example     # Example configuration file
├── Dependencies.toml       # Dependencies specification
├── main.bal                # Main Ballerina entry point
└── README.md               # Documentation for the backend

```

---

## Learn More  

- [Ballerina Documentation](https://ballerina.io/learn/)  

---

### Troubleshooting  

- If you encounter issues, run:  
  ```bash
  bal clean
  ```  
  This clears the build cache.
