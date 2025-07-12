# 🚗 CarRental - Car Booking Website

## 📌 Overview

**CarRental** is a fully functional car booking web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. Users can browse and book cars by selecting pickup locations and dates, while admins can manage listings and bookings through a secure dashboard. The platform integrates email functionality and media optimization to offer a smooth booking experience.

🚀 **Live Demo**: [https://car-rental-client-theta.vercel.app/](https://car-rental-client-theta.vercel.app/)  
📂 **GitHub Repo**: [CarRental Repository](https://github.com/balmukund18/CarRental-fullstack/tree/main)

---

## 🎯 Key Features

### 🧑‍💻 For Users
- **User Authentication** using JWT (JSON Web Tokens)
- **Browse Car Listings** with real-time availability
- **Location Autocomplete** using LocationIQ API
- **Select Pickup Location & Date**
- **Book Cars** and contact the owner via email upon confirmation

### 🛠️ For Admins
- **Admin Dashboard** with secure access
- **Add New Cars** to inventory
- **Manage All Bookings**
- **Media Management** using ImageKit (fast loading and optimized delivery)

---

## 🧪 Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| **Frontend**   | React.js, Tailwind CSS            |
| **Backend**    | Node.js, Express.js               |
| **Database**   | MongoDB (with Atlas)              |
| **Authentication** | JWT                           |
| **Media Handling** | ImageKit                      |
| **Maps/Autocomplete** | LocationIQ                |
| **Hosting**     | Vercel (Frontend), Render/etc. (Backend) |

---

## 🛠️ Installation Guide

### 🔧 Backend Setup (Server)

```bash
# Clone the repository
git clone https://github.com/balmukund18/CarRental-fullstack.git

# Navigate to the server directory
cd CarRental-fullstack/server

# Install backend dependencies
npm install

# Create a .env file in the /server folder and add the following:
# - MONGODB_URI
# - IMAGEKIT_PUBLIC_KEY
# - IMAGEKIT_PRIVATE_KEY
# - IMAGEKIT_URL_ENDPOINT
# - LOCATIONIQ_API_KEY
# - JWT_SECRET
# - Other required credentials

# Start the backend server
npm run server
```
### 🎨 Frontend Setup (Client)

```bash
# Navigate to the client directory
cd ../client

# Install frontend dependencies
npm install

# Create a .env file in the /client folder and add:
# - VITE_CLERK_PUBLISHABLE_KEY
# - VITE_BACKEND_URL

# Start the React development server
npm run dev
```
## 👥 Contributors

Feel free to contribute! Open a pull request or report issues to help improve the project.

## 📜 License

This project is open-source under the MIT License

## 📞 Contact

For queries, suggestions, or collaborations, feel free to reach out:

- 📧 Email: [sm1370530@gmail.com](mailto:sm1370530@gmail.com)
- 🔗 GitHub: [@balmukund18](https://github.com/balmukund18)

Open to feedback, issues, or contributions! 🤝

