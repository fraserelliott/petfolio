# 🌐 Petfolio
Petfolio is a social media platform built for pet lovers to share and connect. Users can create profiles for themselves and their pets, upload and showcase photos, add captions, and interact with the community by liking and commenting on posts.

## 🚀 Features
1. User Profiles – Create and personalize a profile for yourself and your pets.

2. Photo Sharing – Upload pet photos with captions to share with others.

3. Social Interaction – View other users’ posts, leave comments, and engage with the community.

4. Community Feed – Browse a feed of pet posts from users across the platform.

## 💻 Technologies Used 
1. Frontend: 
- HTML
- CSS
- JavaScript
- React

2. Backend: 
- Node.js
- Express.js

3. Database: 
- MySQL
- Sequelize ORM
4. Image Hosting: 
- Cloudinary 

5. Tools & Environment: 
- GitHub
- Postman
- npm

## 📁 Project Structure 
```
Petfolio/
├── backend/                # Backend (Node.js / Express server)
│   ├── config/             # Configuration files (e.g., database, environment setup)
│   ├── db/                 # Database-related files
│   ├── models/             # Database models (e.g., User, Post, Comment)
│   ├── routes/             # API routes (users, posts, comments)
│   ├── scripts/            # Helper scripts (e.g., seeders, migrations)
│   ├── utils/              # Utility functions (auth helpers, middleware)
│   ├── server.js           # Entry point for backend server
│   └── .env                # Environment variables
│
├── frontend/               # Frontend (React application)
│   └── src/                # Main source code
│       ├── assets/         # Static assets (images, icons, styles)
│       ├── components/     # Reusable UI components
│       ├── contexts/       # Context API providers (auth, theme, etc.)
│       ├── pages/          # Main pages (Home, Profile, Post, etc.)
│       ├── utils/          # Frontend utility functions (API calls, helpers)
│       ├── api.jsx         # API configuration & requests
│       ├── App.jsx         # Root React component
│       ├── App.css         # Global styles
│       ├── index.css       # Base styles
│       ├── main.jsx        # React entry point
│       └── userApi.jsx     # User-specific API calls
│
├── mocking/                # Mock data for development/testing
│   ├── middleware/         # Mock API middleware
│   ├── utils/              # Helpers for generating mock data
│   ├── comments.json       # Sample comments data
│   ├── posts.json          # Sample posts data
│   ├── users.json          # Sample users data
│   ├── config.json         # Mock configuration
│   ├── config-generator.py # Python script for generating config
│   ├── data-generator.py   # Python script for generating test data
│   ├── doc-generator.py    # Script for generating mock docs
│   ├── gui.py              # GUI script for mock data
│   ├── main.py             # Entrypoint for mock server
│   ├── server.py           # Python mock server
│   └── requirements.txt    # Python dependencies for mock server
│
├── index.html              # Root HTML file
├── vite.config.js          # Vite configuration for frontend
├── package.json            # Project metadata & dependencies
├── package-lock.json       # Dependency lockfile
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation

```

 ## 🔨 How to Use 
There are pre-made scripts to ensure the correct servers run and URLs are set for API access.
Please do not change these; if anything isn't working or you're unsure, ask Fraser.

For Frontend:
 1. 
 ```
 Use npm run dev-mock while the backend is still in development or use npm run dev-render to use the live server instead of locally host.
```
 2. 
 ```
 Use npm run dev-backend once you get the go-ahead.
```
 For Backend:
 1. 
 ```
 Use npm run dev
 ``` 

```


