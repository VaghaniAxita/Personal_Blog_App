
# Personal Blog App API

This is a Personal Blog API that allows users to register, log in, and manage blog posts. The API supports authentication and CRUD (Create, Read, Update, Delete) operations for blog posts. 


 - Deploy on Render: https://personal-blog-app-idab.onrender.com
____________________________________________________




## Tech Stack

- Node.js (Backend)
- Express.js (Web framework)
- MongoDB (Database)
- JWT (Authentication)
- Multer (File uploads)
- dotenv (Environment variables)
- cookie-parser (For parsing cookies)


## Features

- User Registration: New users can create an account.
- User Login: Users can log in with their email and password to get an authentication token.
- User Profile: Authenticated users can view their personal profile information.
- Create Post: Authenticated users can create new blog posts with a title, content, and an image upload.
- View All Posts: Anyone can view all blog posts.
- View Single Post: View the details of a specific post by its ID.
- Update Post: Authenticated users can update their blog posts (title, content, and image).
- Delete Post: Authenticated users can delete their blog posts.
___________________________________________________


## Setup

1. Clone the Repository

```bash
 https://github.com/VaghaniAxita/Personal_Blog_App
```

2. Navigate to the Project Directory:

```bash
  cd backend  
```

3. Run the server:
```bash
  nodemon
```




# Routes

### User Authentication Routes
  
  **Register  User**

- Route:POST /register
- Description: Register a new user
- Request Body:
```bash
  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
- Sample Response:
  - Status: 201 Created
   - Body:
```bash
 {
    "message": "User registered successfully",
    "user": {
        "_id": "64bdbf28f1c5b2e57d37edb6",
        "username": "john_doe",
        "email": "john@example.com"
    }
}
```

**User Login**

- Route: POST /login
- Description:Login an existing user
- Request Body:
```bash
 {
  "email": "john@example.com",
  "password": "123456"
}
```
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
 {
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjJkNDE1MTJlZGY0ZjU1M2ZiNTViMyIsImlhdCI6MTczNDUzMDExOSwiZXhwIjoxNzM3MTIyMTE5fQ.GuvWtrmShK-1v7hOfBmPvL1T74g3BT2varjMnStFEeg"
 }
```

**User Profile**

- Route: GET /profile
- Description:Get the profile of the logged-in user.
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
 {
    "_id": "64bdbf28f1c5b2e57d37edb6",
    "username": "john_doe",
    "email": "john@example.com"
}
```
### Post Routes

**Create a New Post**

- Route:POST /post
- Request Body:  (form Data)
```bash
Field   |  Type  | Required
---------------------------
title	| string |	Yes
content	| string |  Yes
file	| file	 |  Yes
```
- Sample Response:
  - Status: 201 Created
   - Body:
```bash
{
    "message": "Post created successfully",
    "post": {
        "_id": "64bdc020f1c5b2e57d37edb7",
        "title": "My First Blog Post",
        "content": "This is the content of the post",
        "fileUrl": "/uploads/image.jpg"
    }
}
```

**Get All Posts**

- Route:GET /post
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
[
    {
        "_id": "64bdc020f1c5b2e57d37edb7",
        "title": "My First Blog Post",
        "content": "This is the content of the post",
        "fileUrl": "/uploads/image.jpg"
    },
    {
        "_id": "64bdc021f1c5b2e57d37edb8",
        "title": "My Second Blog Post",
        "content": "This is the second post content",
        "fileUrl": "/uploads/image2.jpg"
    }
]
```

**Get Single Post**

- Route:GET /post/:id
- Request Body:
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
{
    "_id": "64bdc020f1c5b2e57d37edb7",
    "title": "My First Blog Post",
    "content": "This is the content of the post",
    "fileUrl": "/uploads/image.jpg"
}
```
**Update a Post**

- Route:PUT /post/:id
- Request Body:
```bash
 Field  |	Type  |	Required
 -----------------------------
title	| string  |	Yes
content	| string  | Yes
file	| file	  |Optional
```
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
{
    "message": "Post updated successfully",
    "post": {
        "_id": "64bdc020f1c5b2e57d37edb7",
        "title": "Updated Blog Title",
        "content": "This is the updated content of the post",
        "fileUrl": "/uploads/updated_image.jpg"
    }
}
```
