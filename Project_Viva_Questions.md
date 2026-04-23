# Comprehensive Viva & Interview Questions
## Doctor Appointment & Healthcare Platform - National Level Competition Guide

---

### Section 1: Project Overview & Core Problem
**Q1: What is the main problem your application solves?**
**Ans:** Our application bridges the gap between patients and healthcare providers by offering a centralized platform. It eliminates long waiting times at clinics by providing scheduled bookings, enables remote healthcare access through video consultations, and digitizes health records (using OCR for prescriptions). It also features an emergency blood donation hub to connect donors with patients in critical times.

**Q2: What is your project's Unique Selling Proposition (USP) compared to existing apps like Practo?**
**Ans:** While existing apps focus mainly on bookings, our platform is an all-in-one ecosystem. We integrate an AI Symptom Checker for preliminary self-diagnosis, an OCR feature to digitize handwritten prescriptions, and a community-driven emergency blood donation hub—features rarely combined into a single platform.

---

### Section 2: Technology Stack & Architecture
**Q3: Why did you choose the MERN stack for this project?**
**Ans:** We chose MERN (MongoDB, Express, React, Node.js) because it allows for full-stack JavaScript development, which speeds up the development process. React provides a highly responsive Single Page Application (SPA) experience for the users. Node.js handles asynchronous operations (like API calls and notifications) extremely well, and MongoDB's flexible document structure is perfect for storing unstructured medical data and dynamic AI responses.

**Q4: How are your frontend and backend communicating?**
**Ans:** The React frontend communicates with the Node/Express backend via RESTful APIs using the `axios` or `fetch` library. Data is exchanged in JSON format.

---

### Section 3: Database & Concurrency Handling
**Q5: How do you prevent two patients from booking the same doctor at the exact same time (Double Booking)?**
**Ans:** We implemented concurrency control on the backend. When a booking request is received, the system first queries the MongoDB database to check if an appointment already exists for that specific `doctorId`, `date`, and `timeSlot`. If a match is found, the backend rejects the request and returns a "Slot unavailable" error. We also use MongoDB's indexing to make these queries fast.

**Q6: Why use MongoDB instead of a SQL database like MySQL for healthcare data?**
**Ans:** Healthcare data can be highly variable. A doctor's profile might have different fields than an admin's, and the AI symptom checker or OCR text returns unstructured data. MongoDB's schema-less nature allows us to iterate faster and store complex, nested JSON objects easily.

---

### Section 4: Security, Authentication & Privacy
**Q7: How do you secure patient data and passwords?**
**Ans:** We never store plain-text passwords. We use `bcryptjs` to hash passwords before saving them to the database. For authentication, we use JWT (JSON Web Tokens). When a user logs in, they receive a JWT, which is sent in the headers of subsequent requests to verify their identity and ensure they can only access their own data.

**Q8: How do you handle authorization between Doctors, Patients, and Admins?**
**Ans:** We implemented Role-Based Access Control (RBAC). Our JWT payload includes the user's role (admin, doctor, or patient). Backend middleware intercepts requests, checks the decoded token's role, and blocks unauthorized access (e.g., preventing a patient from accessing the admin dashboard).

---

### Section 5: Integrations (Payments & Video Calls)
**Q9: Explain your payment flow using Razorpay. How do you prevent fake payment confirmations?**
**Ans:** The frontend initiates the payment by requesting an `order_id` from our backend. The backend creates this order securely with Razorpay's API. After the user pays on the frontend, Razorpay sends back a payment ID and a signature. **Crucially**, the frontend sends this data back to our Node.js server. Our server uses our secret Razorpay key to verify the cryptographic signature (`crypto` module). We only mark the appointment as "paid" if the backend signature verification is successful.

**Q10: How does the Video Consultation feature work?**
**Ans:** We integrated the ZegoCloud SDK for WebRTC-based video calling. When an appointment time arrives, the system generates a unique Room ID based on the appointment ID. Both the doctor and patient join this specific virtual room. ZegoCloud handles the peer-to-peer video streaming and signaling infrastructure, ensuring low-latency communication.

---

### Section 6: AI Features & Background Jobs
**Q11: How does your OCR (Handwriting Recognition) system work for prescriptions?**
**Ans:** We integrated an OCR library/API (like Tesseract.js or a cloud Vision API). The user uploads an image of the prescription. The frontend sends this to the server, or processes it locally, to extract the text. Because medical handwriting is notoriously difficult to read, we present the extracted text in an editable text box so the patient or pharmacist can manually correct any AI mistakes before saving it to their digital records.

**Q12: How do your automated email reminders work?**
**Ans:** We use `node-cron` on our Node.js server. A cron job runs at specific intervals (e.g., every hour), queries the database for appointments scheduled within the next 24 hours, and uses `nodemailer` to dispatch automated reminder emails to the respective patients.

---

### Section 7: Scalability & Real-world Scenarios
**Q13: If your app suddenly gets 10,000 concurrent users, what will break first, and how will you fix it?**
**Ans:** The database queries or the Node.js event loop might become a bottleneck. To fix this, I would:
1. Implement **Redis caching** for frequently accessed data (like lists of available doctors).
2. Add database **indexing** to the appointments collection to speed up the double-booking checks.
3. Use a **Load Balancer** to distribute traffic across multiple instances of our Node.js server.

**Q14: What is the future scope of this project?**
**Ans:** Future enhancements could include integrating wearable device data (like Apple Health/Fitbit), adding a pharmacy e-commerce section for ordering prescribed medicines directly, and implementing multi-language support for rural accessibility.
