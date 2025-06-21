💬 ChatStack – Real-time WebSocket Chat App
Live App: https://chat-app-frontend-nine-sand.vercel.app

🧩 Project Overview
ChatStack is a full-stack real-time chat application built with:

Frontend: React (with Vite, deployed on Vercel)

Backend: Node.js + Express + WebSocket + MongoDB (deployed on Render)

It allows users to join a shared chat room, send and receive messages in real time, and view the list of active participants.

🚀 Getting Started Locally
🔧 Prerequisites
Node.js & npm installed

MongoDB URI (for example, from MongoDB Atlas)

Git

📁 Folder Structure
chat-app/
├── client/      # Frontend (Vite + React)
├── server/      # Backend (Express + WebSocket + MongoDB)

1️⃣ Backend Setup
cd server
npm install
🔐 Environment Variables
Create a .env file inside /server:
MONGO_URI=mongodb+srv://gsgagan2003:Gagan123@cluster0.yrhy7.mongodb.net/ChatApp?retryWrites=true&w=majority&appName=Cluster0 
[for testing purpost only] 

PORT=5000
▶️ Run Backend Locally
node server.js
This starts the WebSocket + HTTP server at http://localhost:5000.
2️⃣ Frontend Setup
cd client
npm install
🌐 Update WebSocket URL
In client/src/main.jsx or wherever the WebSocket is initialized, replace with:
const ws = new WebSocket('ws://localhost:5000');
▶️ Run Frontend Locally
npm run dev
Visit: http://localhost:5173

🏗️ Architecture
⚙️ Frontend (React + Vite)
UI built with MUI and custom CSS.

User joins by entering a name → sent via WebSocket to backend.

Messages are sent/received in real-time.

Chat messages and participants displayed dynamically.

🌐 Backend (Express + WS + MongoDB)
Express app upgraded to handle WebSocket connections.

When a client connects and sends type: 'join' → server stores the username and sends chat history.

On type: 'message', the message is saved to MongoDB and broadcast to all connected clients.

Concurrency handled via Node.js async nature – all clients receive updates without blocking.

💡 Design Choices
Feature	Reason
WebSocket API	Enables real-time bi-directional communication.
MongoDB (Mongoose)	Stores persistent chat history.
Participant list from messages	Avoids complex session management.
Validation on join	Prevents invalid usernames (null, special chars).
Minimal UI/UX	Clean, modern design using MUI + custom styles.

🌍 Deployed Application
🔗 Frontend (Vercel)
✅ chat-app-frontend-nine-sand.vercel.app

🔗 Backend (Render)
Replace ws://localhost:5000 with your Render WebSocket URL:

js
Copy
Edit
const ws = new WebSocket('wss://your-render-url.onrender.com');
Ensure wss:// (not ws://) for secure connection in production.

📌 To Do / Improvements
Show online/offline status

Add private rooms or DMs

Message delete/edit functionality

Avatar or profile pic support

📬 Contact
Made with ❤️ by Gagan Pratap Singh
