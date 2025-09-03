# Interns KT TypeScript example
This repo contains the step-by-step on how to set up the tools needed to build an example project using Vite with a backend API on Express.

## Project Setup
The following steps explain the steps you need to take to install the tools and initialize the Vite app as well as the Express API. The rest is up to you to engineer!

### 1. Install nvm, node and npm
Go to https://nodejs.org/en/download and follow the instructures on how to install the tools.
### 2. Project Structure
Be careful to keep the following project structure:
```
/my-project
  /client  <-- Vite project lives here
  /server  <-- Express API lives here
  package.json <-- Root package.json to run both
```
For this, create a file for your project, run `npm init -y` and keep on following the steps.
### 3. Initialize vite project
On the root of the project, type the following: (change `react-ts` to whatever you framework you wish to use)
```
npm create vite@latest client -- --template react-ts
cd client && npm install
```
This will create a vite app using the template for react and typescript.
### 4. Initialize express API
On the root of the project, type the following:
```
mkdir server && cd server/
npm init -y
npm install express cors 
npm install -D tsx typescript @types/express @types/node @types/cors ts-node-dev
mkdir src && cd src
touch index.ts
```
Now we have to configure typescript. For this, go to your `server/` directory and run `touch tsconfig.json` and paste into it the following json:
```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],

    "outDir": "./dist",
    "rootDir": "./src",

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,

    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    "sourceMap": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```
And also add a start script to our package.json file, so you should add to your config as follows:
```
"scripts" {
    // ...
    "dev": "tsx watch src/index.ts" // <-- Add this line to your package.json
}
```
You can now run each service by going to their root and running `npm run dev`. Note that you have to run both application, each on a different terminal. The express API isn't implemented yet, so it will not give you any output.
### 5. Have fun building!
Now you have fully functional configuration, all that remains is building the project! 
I encourage you to research on how Express to build a simple API with express and a simple webserver with Vite. Start by having a 'hello world' route on your API, and reach it from your client.
