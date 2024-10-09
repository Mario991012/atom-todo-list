
# Todo List App

This repository contains the frontend and backend code for the To-do List application, a task management platform built with Angular 17, Angular Material, and a Node.js API that integrates Firebase with Firestore and Authentication. You will find details about the design decisions and technologies of this project, as well as the setup instructions.
## Table of Contents
- [Atom Todo List App](#atom-todo-list-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Try the App](#try-the-app)
  - [Design Decisions](#design-decisions)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Running the Backend](#running-the-backend)
    - [Running the Frontend](#running-the-frontend)
  - [Build and Deployment](#build-and-deployment)
    - [Building the Frontend](#building-the-frontend)
    - [Deploying the Frontend to Firebase](#deploying-the-frontend-to-firebase)
    - [Deploying the Backend](#deploying-the-backend)

## Project Overview
The Todo List App is intended to offer the users an easy experience of managing their tasks. This application comprises features like user authentication, creating tasks, updating tasks, and deleting tasks. The application is divided into two parts:
- **Frontend**: Angular 17/Angular Material, Jasmine/Karma which provides a responsive and user-friendly interface.
- **Backend**: Node.js API with Firebase for storage and authentication, assured scalability and cleanliness of code with all the necessary capabilities.

## Try the App
You can access the live version of the To-do List App here:
[https://atom-angular-todo.web.app](https://atom-angular-todo.web.app)

### Desktop view
![atom-todo-list-ezgif com-optimize](https://github.com/user-attachments/assets/a595c761-16b0-44ad-9405-f6bf93383509)

### Mobile view
![atom-todo-list-mobile](https://github.com/user-attachments/assets/ca8a281d-c99f-4bcb-8f4f-84e965dad728)


## Design Decisions
- **Separation of Concerns**: The project follows a clear separation between frontend and backend responsibilities. This allows clean code as possible for better maintainability and easier scaling in the future. **For Atom's purposes these are included in the same repository and I would recommend to separate them in two repositories for a real use case.**
- **Firebase Integration**: Firebase is used for user authentication and as the backend database, providing access to the project's data and ease of setup thanks to the packages that Firebase provides allowing seamless integrations.
- **Modular and component Architecture**: Both frontend and backend follow a modular and component architecture, with components and services split into logically separated folders to enhance code readability and maintainability based on a onion layer architecture and SOLID principles.
- **Use of TypeScript**: TypeScript is utilized for its static typing, which helps catch errors early and ensures a more robust codebase.

## Technologies Used
### Frontend
- **Angular 17**: Framework for building the user interface with standalone components.
- **Angular Material**: For pre-styled UI components.
- **Firebase**: Used for deployment using Firebase Hosting.
- **SCSS**: Styling for components.
- **Karma/Jasmine**: Unit testing for services and components.

### Backend
- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for creating the API.
- **Firebase Admin SDK**: For server-side interactions with Firebase such as authentication, database interaction and serverless deployment.
- **Jest**: Unit testing for controllers, providers and services.
- **TypeScript**: For better code quality and maintainability.
- **EsLint**: To maintain high code quality, catch common errors and enforce code style and best practices.

## Getting Started
### Prerequisites
- **Node.js** (version 18+)
- **Angular CLI** (version 17+)
- **Firebase CLI** (for deployment and configuration)

### Running the Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/Mario991012/atom-todo-list.git
   cd atom-todo-list/todo-list-API
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `todo-list-API` directory with your Firebase service account credentials and other environment variables:
   ```
    FIREBASE_PROJECT_ID=your-value
    FIREBASE_CLIENT_EMAIL=your-value
    FIREBASE_PRIVATE_KEY=your-value
    AUTH_DOMAIN=your-value
    PROJECT_ID=your-value
    TYPE=your-value
    PRIVATE_KEY_ID=your-value
    PRIVATE_KEY=your-value
    CLIENT_EMAIL=your-value
    CLIENT_ID=your-value
    AUTH_URI=your-value
    TOKEN_URI=your-value
    AUTH_PROVIDER_X509_CERT_URL=your-value
    CLIENT_X509_CERT_URL=your-value
    UNIVERSE_DOMAIN=your-value
    ENV=your-value
    STORAGE_BUCKET=your-value
    MESSAGING_SENDER_ID=your-value
    APP_ID=your-value
   ```
4. Start the backend server:
   ```bash
   npm run start:local
   ```
   The backend server will run at `http://localhost:8080`.

### Running the Frontend
1. Navigate to the `todo-list-UI` directory:
   ```bash
   cd ../todo-list-UI
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
   The frontend will be available at `http://localhost:4200`.

## Build and Deployment
### Building the Frontend
To build the Angular application for production, run:
```bash
npm run build:prod
```
The build content will be stored in the `dist/` directory.

### Deploying the Frontend to Firebase
1. Ensure you are logged into Firebase:
   ```bash
   firebase login
   ```
2. Deploy the frontend:
   ```bash
   npm run deploy
   ```

### Deploying the Backend
The backend can be hosted (and currently is) using Firebase Cloud Functions or other Node.js hosting services. If using Firebase:
1. Deploy the backend functions:
   ```bash
   npm run deploy
   ```
