## 1. The challenge code in Docker

By: Gustavo Condezo Camayo
linkdin: https://www.linkedin.com/in/gustavo-condezo-camayo-52ab3b196/


For the project Two environment variables are required:
-  PORT=
-  CLIENT_ID=
-  CLIENT_SECRET=
-  REDIRECT_URI=

These variables must be set to execute the code.
Examples:
````dotenv
PORT=3000
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=http://localhost:3000/configuration
````

# Run in local environment
1. Define file .env in root projects with values

2. Install dependency
````shell
npm install
````
Run project in development.
When we run the project, a window will open in the browser for you to accept the connection on the Multivende website
````shell
npm run start:dev
````
##
