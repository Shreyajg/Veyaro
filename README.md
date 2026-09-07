# Veyaro

Veyaro is a school-management web application for managing student profiles, classes, timetables, assignments, announcements, and other academic information.

## Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
Veyaro/
├── Frontend/
│   ├── index.html
│   ├── src/
│   └── styles/
│
└── Backend/
    ├── package.json
    ├── package-lock.json
    └── src/

```
### How to run

#### 1.Clone the repo:
- git clone <repository-url>
- cd Veyaro

#### 2.Start the backend:
- cd Backend
- npm install

#### 3.create your .env:
- PORT=8000
- MONGO_URI=<your-mongodb-connection-string>
- JWT_SECRET=<your-jwt-secret>

#### 4.start the backend:
npm run dev

#### 5.start the frontend:
- cd Frontend
- python -m http.server 5500
