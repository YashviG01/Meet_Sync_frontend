# 🚀 MeetSync Frontend

> **A production-inspired video conferencing platform built with React, WebRTC, and Socket.IO, designed to deliver a seamless real-time collaboration experience similar to Zoom and Google Meet.**

MeetSync is a full-stack video conferencing application developed as a learning project to gain hands-on experience with scalable frontend architecture, real-time communication, WebRTC, and backend integration. The project focuses not only on implementing core video conferencing features but also on following production-level development practices, modular architecture, and clean code organization.

---

## ✨ Why MeetSync?

Modern video conferencing applications are far more than just video calls—they involve authentication, scheduling, real-time messaging, peer-to-peer communication, media management, and scalable application architecture.

MeetSync is my attempt to understand and build these systems from the ground up while following industry best practices.
---

# 🌟 Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* Forgot Password
* Password Reset
* Persistent Authentication

---

## 🏠 Dashboard

* Start Instant Meeting
* Join Existing Meeting
* Schedule New Meeting
* Clean and Responsive Dashboard
* Meeting Action Shortcuts
* Modern UI inspired by Zoom & Google Meet

---

## 📅 Meeting Scheduling

* Schedule meetings in advance
* Meeting title & description
* Start & end time selection
* Automatic meeting link generation
* Copy invite link
* Success dialog with animations
* Host identification

---

## 🎥 Video Conferencing

* WebRTC Mesh Architecture
* Real-time Audio & Video
* Multi-participant Meetings
* Camera Controls
* Microphone Controls
* Screen Sharing
* Leave Meeting
* Remote Stream Rendering

---

## 💬 Real-Time Communication

* Live Chat
* Typing Indicators
* Real-time Participant Count
* Dynamic Participant List
* Socket.IO based communication

---

## 🎨 User Experience

* Responsive Design
* Modern Dashboard
* Animated Components
* Loading States
* Toast Notifications
* Error Handling
* Smooth Navigation
* Clean Meeting Interface

---

# 🛠 Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* Zustand
* Sonner

### Real-Time Communication

* WebRTC
* Socket.IO Client

### Backend Communication

* REST APIs
* JWT Authentication
* Cookie-based Authentication

---

# 🏗 Project Structure

```
src
│
├── api
├── assets
├── components
│
├── features
│   ├── auth
│   ├── dashboard
│   ├── join
│   ├── meetings
│   ├── scheduling
│   └── shared
│
├── pages
│
├── services
│
├── socket
│
└── utils
```

The project follows a **feature-based architecture**, where each feature owns its own components, hooks, APIs, and business logic. This keeps the codebase modular, maintainable, and easy to scale as new functionality is added.

---

# ⚙️ Application Flow

## 🔑 Authentication

```
User
   │
   ▼
Login / Signup
   │
   ▼
Backend Authentication
   │
   ▼
JWT Cookie
   │
   ▼
Protected Dashboard
```

---

## ⚡ Instant Meeting

```
Dashboard
     │
     ▼
Start Instant Meeting
     │
     ▼
Backend creates meeting
     │
     ▼
Returns Room ID
     │
     ▼
Navigate to Meeting Room
```

---

## 🤝 Join Meeting

```
Dashboard
      │
      ▼
Join
      │
      ▼
Enter Meeting ID
      │
      ▼
Backend Validation
      │
      ▼
Meeting Exists
      │
      ▼
Navigate to Meeting Room
```

---

## 📅 Schedule Meeting

```
Dashboard
      │
      ▼
Schedule Meeting
      │
      ▼
Meeting Details
      │
      ▼
Backend Scheduling
      │
      ▼
Meeting Link Generated
      │
      ▼
Success Dialog
      │
      ▼
Copy Invite Link
```

---

## 🎥 Meeting Room

```
Meeting Room
      │
      ▼
Meeting Engine
      │
      ├── WebRTC
      ├── Socket.IO
      ├── Media Controls
      ├── Chat
      └── Participants
```

---

# 🧠 Frontend Architecture

The frontend is organized using a layered architecture that separates UI, business logic, and backend communication.

```
Pages
   │
   ▼
Feature Components
   │
   ▼
Custom Hooks
   │
   ▼
Meeting Engine
   │
   ▼
API Layer
   │
   ▼
Backend
```

### Responsibilities

### Pages

Responsible for rendering complete screens.

### Components

Reusable UI components responsible only for presentation.

### Hooks

Contain business logic, API calls, navigation, and state management.

### Engine

Encapsulates complex meeting logic, including:

* WebRTC peer connections
* Media handling
* Socket event registration
* Participant synchronization
* Chat communication

### API Layer

Centralized communication with backend endpoints using Axios.

---

# 📌 Current Progress

### ✅ Completed

* Authentication
* Dashboard
* Instant Meetings
* Join Meetings
* Meeting Scheduling
* Meeting Room
* WebRTC Integration
* Socket.IO Integration
* Screen Sharing
* Chat
* Typing Indicators
* Participant Management
* Responsive UI

---

### 🚧 In Progress

* **My Meetings Dashboard** (displaying and managing scheduled meetings)
* Edit Scheduled Meeting
* Delete / Cancel Meeting
* Dashboard Meeting Management

---

# 🚀 Upcoming Features

* Waiting Lobby
* Meeting Recording
* Raise Hand
* Emoji Reactions
* Virtual Backgrounds
* Calendar Integration
* Email Invitations
* Host Controls
* Meeting History
* Notifications
* Participant Permissions
* Network Quality Indicator
* Device Selection (Camera & Microphone)
* Grid / Speaker View
* Pagination for Dashboard Meetings
* Search & Filters for Meetings
* Meeting Analytics

---

# 💻 Local Setup

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# 🔗 Backend

The frontend communicates with the MeetSync backend for:

* Authentication
* User Management
* Meeting Scheduling
* Instant Meetings
* Join Meetings
* Dashboard Data
* Socket Authentication

---

# 🎯 Learning Outcomes

This project has been an opportunity to explore and implement:

* Production-inspired frontend architecture
* Feature-based project organization
* Real-time communication using Socket.IO
* Peer-to-peer media streaming with WebRTC
* Authentication using JWT and HTTP-only cookies
* Custom React hooks for business logic
* REST API integration
* Responsive UI development
* Modular and scalable React applications

---

# 🤝 Contributing

Contributions, feedback, and suggestions are always welcome. Feel free to open an issue or submit a pull request to improve MeetSync.

---

# 📄 License

This project is developed for educational purposes, portfolio showcasing, and continuous learning.

---

## ⭐ If you found this project interesting, consider giving it a star!

It motivates me to continue building, learning, and improving MeetSync.
