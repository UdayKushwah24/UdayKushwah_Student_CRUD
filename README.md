# 🚀 Spring Boot JDBC CRUD Application

## 📌 Project Overview

This project is a **full-stack Student Management System** built using **Spring Boot (Backend)** and **HTML, CSS, JavaScript (Frontend)**.

It performs complete **CRUD (Create, Read, Update, Delete)** operations on a `Student` entity using **JDBC (JdbcTemplate)** without using any ORM frameworks like Hibernate.

---

## 🎯 Features

* ➕ Add new student
* 📋 View all students
* 🔍 View student by ID
* ✏️ Update student details
* ❌ Delete student
* 🌐 RESTful API integration
* 💻 Interactive frontend UI
* ⚡ Fast and lightweight (JDBC-based)

---

## 🧱 Tech Stack

* **Backend:** Spring Boot, JDBC (JdbcTemplate)
* **Frontend:** HTML, CSS, JavaScript
* **Database:** H2 (In-Memory) / MySQL (optional)
* **Build Tool:** Maven

---

## 🏗️ Project Structure

```
src/main/java/com/example/studentcrud
│
├── controller     → REST API endpoints
├── service        → Business logic
├── repository     → JDBC queries
├── model          → Student entity
└── config         → Configuration

src/main/resources
│
├── static         → Frontend (HTML, CSS, JS)
├── application.properties
└── schema.sql
```

---

## 📊 Entity: Student

| Field  | Type    | Description   |
| ------ | ------- | ------------- |
| id     | Integer | Primary Key   |
| name   | String  | Student Name  |
| email  | String  | Email Address |
| course | String  | Course Name   |

---

## 🔗 API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /students      | Create student    |
| GET    | /students      | Get all students  |
| GET    | /students/{id} | Get student by ID |
| PUT    | /students/{id} | Update student    |
| DELETE | /students/{id} | Delete student    |

---

## ⚙️ Database Configuration (H2)

```
spring.datasource.url=jdbc:h2:mem:student_crud_db
spring.datasource.username=sa
spring.datasource.password=
```

👉 Access H2 Console:

```
http://localhost:8080/h2-console
```

---

## 🧾 SQL Table

```
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    course VARCHAR(100)
);
```

---

## 🚀 How to Run the Project

1. Clone the repository:

```
git clone https://github.com/UdayKushwah24/UdayKushwah_Student_CRUD.git
```

2. Navigate to project folder:

```
cd Student_CRUD
```

3. Run the application:

```
.\mvnw.cmd spring-boot:run
```

4. Open in browser:

```
http://localhost:8080
```

---

## 💡 Key Highlights

* Uses **pure JDBC (no Hibernate)** for better SQL understanding
* Clean **layered architecture**
* Beginner-friendly full-stack project
* Ideal for **interview preparation**

---

## 🔮 Future Enhancements

* 🔐 Add Spring Security (authentication)
* 📄 Add Swagger documentation
* 📊 Pagination & search functionality
* 🌐 Deploy on cloud (Render / Railway)

---

## 👨‍💻 Author

**Uday Kushwah**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
