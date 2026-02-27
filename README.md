# DocSpot-Seamless-Appointment-Booking-for-Health
MERN STACK project 
Introduction  
In today’s fast-paced digital world, accessing healthcare services efficiently has become a 
necessity. Traditional appointment booking methods often involve long waiting times, 
manual scheduling errors, and difficulty in managing patient records. To address these 
challenges, DocSpot: Seamless Appointment Booking for Health is developed as a full-stack 
web application using the MERN stack (MongoDB, Express.js, React.js, and Node.js). 
DocSpot provides a centralized and user-friendly platform where patients can easily browse 
doctors, book appointments, upload medical documents, and track appointment statuses in 
real time. The system also enables doctors to manage their schedules efficiently and allows 
administrators to monitor and control overall platform operations. 
The application follows a client-server architecture, ensuring smooth communication 
between the frontend and backend through RESTful APIs. With secure authentication and 
role-based access control, the system ensures data privacy and authorized access for 
patients, doctors, and administrators. 
The primary objective of this project is to digitalize and simplify the healthcare appointment 
booking process, making it more accessible, reliable, and efficient for all users. 
Project Overview 
1 
Purpose: 
The purpose of DocSpot is to provide a digital solution for managing doctor appointments 
efficiently and securely. Traditional appointment booking methods often involve manual 
processes, long waiting times, scheduling conflicts, and lack of transparency. This project 
eliminates these inefficiencies by offering an automated, user-friendly, and centralized web
based platform. 
The goals of the project are: 
 To simplify the appointment booking process for patients 
 To provide doctors with an organized system to manage schedules 
 To enable administrators to monitor and control platform activities 
 To ensure secure authentication and role-based access control 
 To provide real-time updates on appointment status 
 To create a scalable and maintainable healthcare management system using the 
MERN stack 
Features: 
Patient Features 
 User registration and login with secure authentication 
 Browse and view available doctors 
 Filter doctors based on specialization and availability 
 Book appointments by selecting date and time 
 Upload medical documents during booking 
 Receive confirmation and status updates 
 View booking history 
 Cancel or reschedule appointments 
2 
Doctor Features 
 Register and apply for doctor account 
 Await admin approval 
 View appointment requests 
 Confirm, reschedule, or cancel appointments 
 Manage schedule and update appointment status 
 Update consultation details 
Admin Features 
 Monitor overall platform activities 
 Approve or reject doctor applications 
 Manage users and doctors 
 Maintain system integrity 
 Handle operational issues 
Technical Features 
 RESTful API communication 
 JWT-based authentication 
 Secure password hashing using bcrypt 
 MongoDB for scalable data storage 
 Responsive UI using React, Bootstrap, and Material UI 
 Dynamic data updates without page reload 
Architecture 
The application follows a Client-Server Architecture using the MERN stack. 
Frontend Architecture 
3 
The frontend is developed using React.js with a component-based architecture. 
Architecture Design 
 Reusable components such as Navbar, Forms, Dashboards, and Appointment Cards 
 React Router for navigation 
 Axios for API communication 
 Bootstrap and Material UI for responsive design 
 Role-based dashboard rendering 
Frontend Flow 
User Interaction → Axios API Call → Backend Processing → Response → UI Update 
Key Frontend Modules 
 Authentication Pages 
 User Dashboard 
 Doctor Dashboard 
 Admin Panel 
 Appointment Booking Form 
 Booking History Page 
Backend Architecture 
The backend is built using Node.js and Express.js following the MVC pattern. 
Structure 
 Routes – API endpoints 
 Controllers – Business logic 
 Models – Database schemas 
 Middleware – Authentication and authorization 
4 
Backend Flow 
Client Request → Route → JWT Middleware → Controller → Database → Response 
Backend Features 
 RESTful APIs 
 JWT authentication 
 Password hashing 
 Role-based authorization 
 Error handling middleware 
 File upload handling 
Database Architecture 
MongoDB is used as the database with Mongoose as ODM. 
Users Collection 
Fields: 
 _id 
 name 
 email 
 password (hashed) 
 role 
 timestamps 
Doctors Collection 
Fields: 
 userId 
 specialization 
5 
 experience 
 availability 
 status 
 timestamps 
Appointments Collection 
Fields: 
 userId 
 doctorId 
 appointmentDate 
 appointmentTime 
 status 
 documents 
 timestamps 
MongoDB ensures scalability, flexible schema design, and efficient data retrieval. 
Setup Instructions 
Prerequisites 
1. Software Requirements 
 Node.js (v16 or higher) 
 npm (comes with Node.js) 
 MongoDB Atlas account (for cloud database connection) 
 Git (for cloning the repository) 
 Code Editor (e.g., VS Code) 
2. Optional Tools 
6 
 Postman (for API testing) 
 MongoDB Compass (for database visualization) 
Installation 
Step 1: Clone the Repository 
Open terminal or command prompt and run: 
git clone <repository-link> 
Navigate into the project directory: 
cd docspot 
Step 2: Install Backend Dependencies 
Navigate to the server folder: 
cd server 
Install required dependencies: 
npm install 
Step 3: Configure Environment Variables 
Inside the server folder, create a .env file and add the following: 
PORT=5000 
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_secret_key 
Replace: 
 your_mongodb_connection_string with your MongoDB Atlas connection string. 
 your_secret_key with a secure random string. 
Step 4: Install Frontend Dependencies 
7 
Open a new terminal and navigate to the client folder: 
cd client 
Install frontend dependencies: 
npm install 
Step 5: Start the Application 
Start Backend Server: 
cd server 
npm start 
Backend runs on: 
http://localhost:5000 
Start Frontend Application: 
cd client 
npm start 
Frontend runs on: 
http://localhost:3000 
After completing these steps, the application will be successfully running on your local 
system. 
Folder Structure 
Client Folder Structure 
client/ 
│ 
├── public/ 
│   └── index.html 
│ 
├── src/ 
8 
│   ├── components/ 
│   ├── pages/ 
│   ├── redux/ (or context/) 
│   ├── hooks/ 
│   ├── utils/ 
│   ├── assets/ 
│   ├── App.js 
│   └── index.js 
│ 
└── package.json 
Server Folder Structure 
server/ 
│ 
├── config/ 
├── controllers/ 
├── models/ 
├── routes/ 
├── middleware/ 
├── utils/ 
├── uploads/ (if file upload is used) 
├── server.js 
└── package.json 
Running the Application 
Starting the Backend Server 
1. Open a terminal. 
2. Navigate to the server directory: 
cd server 
3. Start the backend server: 
npm start 
If configured correctly, the backend will run on: 
http://localhost:5000 
9 
Starting the Frontend Server 
1. Open a new terminal window. 
2. Navigate to the client directory: 
cd client 
3. Start the React application: 
npm start 
The frontend application will run on: 
http://localhost:3000 
API Documentation 
Base URL: 
http://localhost:5000/api 
Authentication APIs 
User registration and login with JWT token generation 
Doctor APIs 
Doctor application, listing approved doctors, admin approval 
Appointment APIs 
Book appointment, get appointments, update appointment status 
Admin APIs 
View and manage doctor applications 
All protected routes require Authorization: Bearer <JWT_TOKEN> 
Authentication 
Authentication is implemented using JWT and bcrypt. 
 Passwords are hashed before storing 
 JWT generated on login 
10 
 Token stored on client side 
 Token attached to request headers 
 Middleware verifies token 
 Role-based access control enforced 
Security measures include: 
 Encrypted passwords 
 Secure JWT signing 
 Environment variable protection 
 HTTP 401/403 for unauthorized access 
User Interface 
The UI is responsive, modern, and role-based. 
Includes: 
 Login Page 
 Registration Page 
 Patient Dashboard 
 Appointment Booking Form 
 Booking History 
 Doctor Dashboard 
 Admin Panel 
Designed using React, Bootstrap, and Material UI. 
Testing 
Manual and functional testing was performed. 
11 
Frontend Testing 
 Form validation 
 Navigation testing 
 Role-based rendering 
 Appointment workflow 
Backend Testing 
 API response validation 
 JWT verification 
 CRUD operations 
 Error handling 
Database Testing 
 Data storage validation 
 Password hashing verification 
 Relationship consistency 
Integration Testing 
 Axios API communication 
 Real-time UI updates 
 Data consistency 
All core functionalities were validated successfully. 
