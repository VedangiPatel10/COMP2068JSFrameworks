# The Daily Grind – Coffee Ordering System

## About the Project

The Daily Grind is a coffee ordering web application for a single coffee shop. Customers can view the menu, create an account or sign in (using a local account or GitHub), and place coffee orders online before arriving at the shop. They can also customize their drinks by choosing the size, milk type, and extra espresso shots. Customers can view, edit, or cancel their orders as long as the order is still marked as **Pending**.

## Live Website

https://coffee-ordering-app-assign2.onrender.com

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Handlebars (HBS)
* Passport.js (Local and GitHub Authentication)
* Bootstrap 5
* Custom CSS
* Multer (Image Uploads)

## Extra Feature – Upload Images

Users can add new menu items and upload a picture of the drink from the **Add Item** page. The application uses **Multer** to upload the image, check that it is a valid file, save it in the `public/uploads` folder, and store the image path in MongoDB.

## How to Run the Project

1. Install the required packages:

   ```
   npm install
   ```

2. Create a `.env` file (or copy `.env.example`) and add:

   * `MONGODB_URI` – Your MongoDB Atlas connection string
   * `SESSION_SECRET` – Any random secret string
   * `GITHUB_CLIENT_ID`
   * `GITHUB_CLIENT_SECRET`
   * `GITHUB_CALLBACK_URL`

3. Start the application:

   ```
   npm run dev
   ```

   or

   ```
   npm start
   ```

4. Open your browser and go to:

   ```
   http://localhost:3000
   ```

## AI Assistance

Some parts of this project, including the Express setup, MongoDB configuration, Passport authentication, and basic CRUD structure, were created with the help of Claude AI. All generated code was reviewed, tested, and modified by the student. Permission to use AI assistance was approved by the course instructor.

## Author

**Vedangi Patel**
COMP 2068 – Group Assignment 2B
