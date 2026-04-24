# 🎓 ScholarMatrix: Institutional Intelligence Ecosystem

**ScholarMatrix** is a next-generation, high-security Learning Management System (LMS) designed for modern institutions. It integrates advanced biometrics, geolocation tracking, and high-performance AI to create a unified, secure, and engaging educational environment.

---

## 💎 Premium Design & Performance
Built with a focus on **Rich Aesthetics** and **Liquid Smoothness**, ScholarMatrix features a state-of-the-art Glassmorphism UI, staggered spring animations, and hardware-accelerated performance layers.

- **Dynamic Sidebars**: Elastic transitions and role-based navigation.
- **Micro-Animations**: Staggered list entries and pulsing status nodes.
- **Ultra-Responsive**: Optimized for mobile with dedicated reader modes and touch-optimized scrolling.

---

## 🛡️ Core Institutional Protocols

### 🔒 Biometric MFA & Geofencing
- **Daily Attendance Protocol**: A high-security entry/exit system requiring **Face Identification** (face-api.js) and **GPS Grid Proximity**.
- **Faculty & Student Logs**: Unified attendance infrastructure for all institutional roles.
- **Admin Command Center**: Real-time configuration of geofence boundaries (radius, center) and temporal entry/exit windows.

### 🧠 Intelligence Terminal (AI Assistant)
- **Gemini 2.0 Integration**: Advanced reasoning engine for course-specific queries and general scholarship.
- **Secure Sync**: Isolated AI threads with markdown support and code syntax highlighting.

### 💬 Community Discussion Hub
- **Encrypted Real-time Chat**: Socket.io powered group discussions for every course.
- **Secure Dispatch**: Attachment handling (PDFs, Images) with institutional security scanning.
- **Faculty Oversight**: Designated tags and administrative control within community threads.

---

## 🛠️ Technical Architecture

### **The Shield (Backend)**
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose) with optimized indexing for attendance logs.
- **Real-time**: Socket.io for live updates and chat synchronicity.
- **Security**: JWT-based Authentication + Role-Based Access Control (RBAC).

### **The Prism (Frontend)**
- **Framework**: React.js with Vite
- **Animation**: Framer Motion for premium UI transitions.
- **Icons**: Lucide-React for a crisp, modern aesthetic.
- **State**: Redux Toolkit for global data synchronization.

---

## 🚀 Deployment & Installation

### Local Environment
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ISHU456/ScholarMatrixDeployment.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```
3. **Environment Setup**:
   Create a `.env` in the `server/` directory:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Run the Engine**:
   ```bash
   # In root
   npm run dev
   ```

### Render Production Strategy
The project is optimized for **Render** deployments.
- **Server**: Auto-detects Render environment and adjusts CORS policies dynamically.
- **Client**: Automatic `window.API_URL` detection to switch between `localhost` and your `.onrender.com` subdomain.

---

## 📁 Project Structure
- `client/src/components/`: Premium UI components (Chatbot, PageLoaders, etc.)
- `client/src/pages/attendance/`: Secure attendance protocol views.
- `server/controllers/`: Core business logic and biometric validation.
- `server/models/`: Robust Mongoose schemas for academic data.

---

## 👨‍💻 Developed By
**Ishu Anand Malviya**  
[GitHub Profile](https://github.com/ISHU456)

---

> *"ScholarMatrix was designed to bridge the gap between academic freedom and institutional security."*
