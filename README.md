# 🌐 Petfolio

Petfolio is a social media platform built for pet lovers to share and connect. Users can create profiles for themselves and their pets, upload and showcase photos, add captions, and interact with the community by liking and commenting on posts.

https://petfolio-0hlh.onrender.com/

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
- Multer

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
│   ├── db/                 # Database schema
│   ├── models/             # Database models (e.g. User, Post, Comment)
│   ├── routes/             # API routes (users, posts, comments)
│   ├── scripts/            # Helper scripts (e.g. database seeding)
│   ├── utils/              # Utility functions (auth helpers, middleware)
│   ├── server.js           # Entry point for backend server
│   └── .env                # Environment variables
│
├── frontend/               # Frontend (React application)
│   └── src/                # Main source code
│       ├── assets/         # Static assets (images, icons, styles)
│       ├── components/     # Reusable UI components
│       ├── contexts/       # Context API providers (auth, posts, etc.)
│       ├── pages/          # Main pages (Home, Settings, etc.)
│       ├── utils/          # Frontend utility functions (error handling)
│       ├── api.jsx         # API configuration & requests
│       ├── App.jsx         # Root React component
│       ├── App.css         # Global styles
│       ├── index.css       # Base styles
│       ├── main.jsx        # React entry point
│       └── api.jsx         # API wrapper for Axios
│
├── mocking/                # Mock data for development/testing
│   ├── middleware/         # Mock API middleware
│   ├── utils/              # Util files used in mock server
│   ├── comments.json       # Sample comments data
│   ├── posts.json          # Sample posts data
│   ├── users.json          # Sample users data
│   ├── config.json         # Mock configuration
│   ├── config-generator.py # Python script for generating config
│   ├── data-generator.py   # Python script for generating test data
│   ├── doc-generator.py    # Script for generating mock docs
│   ├── gui.py              # GUI script for mock server
│   ├── main.py             # Entry point for mock server
│   ├── server.py           # Python mock server module
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

### For local testing including the mock server:

```bash
cd backend
npm run setup
```

If you would prefer to not set up the python mock server, you can run:

```bash
cd backend
npm i
cd ../frontend
npm i
```

Set up environment variables, the setup script will copy .env.example to .env for you, if you ran the alternative you'll need to copy this to .env yourself. You can either use DATABASE_URL or set it up with the individual DB prefixed variables.

Set up mysql and seed the database:

```bash
cd backend
mysql -u root -p
source db/schema.sql;
exit
node scripts/seed.js
```

Run the frontend with vite and backend with nodemon, this'll update on either frontend or backend changes:

```bash
cd frontend
npm run dev-backend
```

Alternatively, run the frontend with vite and mock server, this'll update on frontend changes. Please note certain features won't work due to the limited nature of relationships between data in a mock server:

```
cd frontend
npm run dev-mock
```

### To deploy:

1. Set root directory to backend
2. Set build command to npm install && cd ../frontend && npm install && npm run build
3. Set Start command to node server.js
4. Set up environment variables as required in .env.example. You can either use DATABASE_URL or set it up with the individual DB prefixed variables.
