# Wanderlust

**Wanderlust** is a full-stack travel listing application inspired by Airbnb. It is built with Node.js, Express, MongoDB, and EJS, and allows users to register, create and manage property listings, submit reviews, and explore travel destinations.

## 🚀 Key Features

- User registration and authentication with **Passport.js**
- Create, read, update, and delete **property listings**
- Leave **reviews** on listings
- Secure **session management** with `express-session`
- Flash notifications for success and error messages
- Responsive templated UI using **EJS** and **ejs-mate**
- MongoDB data modeling with **Mongoose**
- Clean routing structure with Express router modules

## 🧩 Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **EJS** + **ejs-mate**
- **Passport.js** + **passport-local**
- **express-session**, **connect-flash**, **cookie-parser**
- **method-override**
- **Joi** for request validation

## 📁 Project Structure

```
├── app.js
├── package.json
├── README.md
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── includes/
│   │   ├── flash.ejs
│   │   └── navbar.ejs
│   └── error.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── init/
│   ├── data.js
│   └── index.js
└── classroom/
    ├── server.js
    └── views/
        └── page.ejs
```

## 💾 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ehtesham910/Wanderlust.git
   cd Wanderlust
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB locally.
4. Run the application:
   ```bash
   node app.js
   ```
5. Open the app in your browser:
   ```bash
   http://localhost:8080
   ```

> If the port is configured differently in `app.js`, use that port instead.

## 🔧 Usage

- Register a new account or log in using existing credentials.
- Create a listing with title, description, location, country, price, and image.
- Browse available listings from the home page.
- View listing details and add reviews.
- Edit or delete listings you own.

## 📌 Routes Overview

- `GET /` - Homepage
- `GET /listings` - List all properties
- `GET /listings/new` - New listing form
- `POST /listings` - Create listing
- `GET /listings/:id` - Show listing details
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review
- `GET /register` - Registration page
- `POST /register` - Create user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `POST /logout` - Log out user

## 🛠️ Notes

- The app uses **local MongoDB** at `mongodb://localhost:27017/wanderlust` by default.
- The default listing image is used when no image URL is provided.
- Reviews are removed automatically when a listing is deleted.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit and push your changes.
4. Open a pull request.

## 📄 License

This project is licensed under the **ISC License**.

