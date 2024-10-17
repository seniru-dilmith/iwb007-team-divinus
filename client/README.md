# Initialize the React App

## Prerequisites  
Before running the app, ensure you have **Node.js** installed. Create your own `.env` file by following the provided [`.env.example`](./.env.example) template.  

---

## Available Scripts  

In the project directory, you can run:  

### `npm start`  

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. If you need you can change the default port to run the react server by modifying [package.json](./package.json) with,

```bash
"scripts": {
  "start": "PORT=3001 react-scripts start",
  ...
}
```

The page will reload automatically if you make changes.  
You may also see lint errors in the console.

### `npm test`  

Launches the test runner in interactive watch mode.  
See the [running tests](https://facebook.github.io/create-react-app/docs/running-tests) section for more information.

### `npm run build`  

Builds the app for production to the `build` folder.  
The build is minified, optimized, and ready for deployment.  

See the [deployment guide](https://facebook.github.io/create-react-app/docs/deployment) for more details.

### `npm run eject`  

**Note:** This is a one-way operation. Once you `eject`, you cannot revert back.  
This command copies all configuration files and dependencies into your project, giving you complete control over the build setup.

---

## Create an Environment File  

1. Locate the `.env.example` file in the project directory.
2. Create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Update the environment variables in the `.env` file according to your configuration needs.

---

## Learn More  

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)  
- [React Documentation](https://reactjs.org/)

---

### Additional Topics  

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)  
- [Analyzing Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)  
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)  
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)  

---

### Troubleshooting  

If `npm run build` fails to minify, see the troubleshooting guide:  
[https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)  
