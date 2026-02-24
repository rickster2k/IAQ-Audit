# IAQ Audit Web App

## Purpose

To give an free tool for users to get an indoor air qualiry report. With an option premium information. 

### Context

Initially started with Google AI studio code, was written to work only in the browser and using local storage, with some features being incomplete. Created a blank next js project and imported all the ui components from the initial build and incorporated them to replicate what the client initially had. Decided to use firebase as an a backend and create a ci/cd pipline using cloud run. 

### How To Run Locally

You will need to create .env.local file that will hold all the environment variables needed to have the app run correctly

To run this locally clone this repo locally than run 
```bash
npm run dev
```
to launch the development version. 

To launch the production version 
run 
```bash 
npm run build 
npm run start-standalone
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

Currently deployed at www.iaqaudit.com via domain mapping on a cloud run service. The cloud run service is set up with a ci/cd github pipeline that update via a push to the main branch.
