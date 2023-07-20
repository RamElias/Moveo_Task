# Real-Time Coding Web Application

## website available at [realtimecoding](realtimecoding.up.railway.app)
## Introduction

This is a real-time coding web application that allows a mentor to share a piece of code with a student and observe him while he writes and changes the code in real-time. The application has two main pages: the Lobby page and the Code block page.

## Features

- **Lobby Page:**
  The Lobby page displays a list of code blocks to choose from. Each code block represents a specific programming case or example. The user can click on a code block item to navigate to the Code block page and view the details of the selected code block.

- **Code Block Page:**
  The Code block page is designed for both mentors and students. 
  *Code Syntax Highlighting:* The code on the Code block page is displayed with syntax highlighting using react-highlight.
  This ensures a clear and readable representation of the code.

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the server using `node server.js` or `npm start`
4. open a new terminal and type `cd client`
5. run `npm start`
6. The application will be accessible at `http://localhost:3000`.

## API Endpoints

- **GET `/api/codeblocks`:** Fetches the list of available code blocks from the database.
- **GET `/api/codeblocks/:id`:** Fetches a specific code block by ID from the database.

## WebSocket

WebSocket is utilized to provide real-time updates of the code block between the mentor and students.
When a student makes changes to the code, the WebSocket sends the updated code to all connected clients in real-time.

## Technologies Used

- **Frontend:** React
- **Backend:** Express, MySQL (for database storage), WebSocket (for real-time updates)

