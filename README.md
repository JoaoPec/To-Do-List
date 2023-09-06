# To-Do List Web App

This is a simple to-do list web application built with Node.js, Express.js, and MongoDB. It allows you to create, manage, and customize to-do lists.

## Prerequisites

Make sure you have Node.js and MongoDB installed on your system.

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## How to Use

1. Clone the repository to your local system.

   ```bash
   git clone https://github.com/your-username/to-do-list-app.git
   ```

2. Navigate to the project directory.

   ```bash
   cd to-do-list-app
   ```

3. Install the dependencies.

   ```bash
   npm install
   ```

4. Start the server.

   ```bash
   node app.js
   ```

5. Open a web browser and access [http://localhost:3000](http://localhost:3000) to use the application.

## Features

- **Add Tasks**: You can add new tasks to the "Today" list.

- **Customize Lists**: Create custom lists by providing a name in the URL, like [http://localhost:3000/my-project](http://localhost:3000/my-project).

- **Delete Tasks**: Remove tasks from the list by clicking the "Delete" button.

- **Additional Features**: This application uses the Lodash library to standardize the names of custom lists with Title Case.