# Taskly - Task Management Application
Taskly is a simple and efficient task management application that helps users organize their tasks into different categories: To-Do, In Progress, and Done. It features drag-and-drop functionality, Firebase authentication, and seamless re

# Live Demo
    Frontend: https://github.com/adnanahid/TasklyClientSide
    Backend: https://github.com/adnanahid/TasklyServerSide

# Features
- User authentication with Firebase.
- Create, update, and delete tasks.
- Drag and drop tasks between different categories.
- Real-time data updates using MongoDB and Express.js.
- Responsive design for seamless use on all devices.


# Technologies Used

- Frontend: React.js (Vite), Tailwind CSS, React DnD
- Backend: Node.js, Express.js, MongoDB
- Authentication: Firebase Auth
- State Management: React Context API
- Deployment: Firebase (Frontend), Vercel (Backend)

# Dependencies   

### Frontend:

    "dependencies": {
        "@tailwindcss/vite": "^4.0.7",
        "@tanstack/react-query": "^4.36.1",
        "axios": "^1.7.9",
        "firebase": "^11.3.1",
        "react": "^18.3.1",
        "react-dnd": "^16.0.1",
        "react-dnd-html5-backend": "^16.0.1",
        "react-dom": "^18.3.1",
        "react-hot-toast": "^2.5.2",
        "react-icons": "^5.5.0",
        "react-router-dom": "^7.2.0",
        "tailwindcss": "^4.0.7"
    },

### Backend: 

    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.4.7",
        "express": "^4.21.2",
        "mongodb": "^6.13.0",
        "nodemon": "^3.1.9",
        "socket.io": "^4.8.1"
    },

 # Installation Guide

Follow these steps to set up Taskly locally.   

## Clone the Repository
    git clone https://github.com/yourusername/taskly.git
    cd taskly

## Install Dependencies
## Backend:
    cd client
    npm 
    
## Frontend:
    cd server
    npm install    

# Set Up Environment Variables
Create a .env file inside the server/ folder and add the following:

    PORT=3000
    MONGO_URI=your_mongodb_connection_string   

# Run the Application    
    cd server
    npm start

# Future Improvements

- Add due date and priority levels for tasks.
- Implement team collaboration features.
- Enable task sharing via email.    