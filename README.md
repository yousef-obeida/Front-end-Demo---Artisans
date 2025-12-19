Front-end Demo – Artisans

This is a simple front-end demo project built using Vue.js, Vite, and Vuetify.
The goal of this project is to demonstrate basic front-end structure, state management, and clean project setup.

Project Setup

1.1 Requirements
Before running the project, make sure you have:
Node.js (version 16 or higher)
npm (comes with Node.js)
You can check if Node.js is installed by running:
node -v
npm -v

1.2 Install Dependencies
After cloning the project, go to the project folder and run:
npm install
This command will install all required packages.

1.3 Run the Project
To start the development server, run:
npm run dev
After running this command, open your browser and go to:
http://localhost:5173

1.4 Build the Project
To create a production build, run:
npm run build
The output files will be created inside the "dist" folder.

How to Run Tests
This project contains basic unit tests.
To run all tests, use:
npm test
The test files are located inside the "tests" folder.

API Usage
This is a front-end-only project and does not include a real backend API.
This project uses a fake API for testing and demo purposes.
The fake API used is JSONPlaceholder.


State Management
State management is handled using a simple centralized approach.
Pinia is used to manage shared data
State is separated into small stores
Components read and update state through the store
This helps keep data organized and easy to manage.

Project Architecture

5.1 Folder Structure

public/
src/
API/
assets/ (images and styles)
components/ (reusable UI components)
views/ (pages/screens)
router/ (app routes)
store/ (state management)
App.vue (root component)
main.js (entry file)
tests/ (unit tests)
vuetify-project/ (Vuetify configuration)

5.2 Data Flow
User interacts with the UI
Components update the store
Store updates the state
UI updates automatically
This flow keeps the app simple and predictable.

5.3 Trade-offs
Vuetify makes UI development faster but adds extra size
Pinia is easy to use but still new for some developers
Vite is very fast but has fewer plugins than older tools

Improvements for the Future
If I had more time, I would:
Add a real backend API
Improve UI design and layout
Add login and authentication
Write more tests
Improve performance
Deploy the project online

