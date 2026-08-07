# The Daily Grind — Coffee Ordering System

## Description
The Daily Grind is a coffee ordering web application for a single coffee shop.
Customers can browse a public drink menu, register/log in (with local auth or
GitHub), and place customized orders (size, milk type, extra shots) ahead of
time to skip the in-store line. Users can view, edit (while still Pending),
and cancel their own orders.

## Live Site


## Tech Stack
- Node.js / Express
- MongoDB Atlas / Mongoose
- HBS (Handlebars) view engine
- Passport.js (Local + GitHub OAuth strategies)
- Bootstrap 5 + custom CSS
- Multer (file uploads)

## Additional Feature: Image Upload for Menu Items
Logged-in users can add a new menu item and upload a photo of the drink
directly from the "Add Item" page. This uses **multer** middleware to handle
`multipart/form-data`, validate the file type/size, save it to
`public/uploads/`, and store the resulting path on the `MenuItem` document.

## Setup Instructions
1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `SESSION_SECRET` — any random string
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` / `GITHUB_CALLBACK_URL` — from a GitHub OAuth App
3. `npm run dev` (or `npm start`)
4. Visit `http://localhost:3000`

## External Code / AI Assistance Disclosure
Portions of this project's scaffolding (Express/Mongoose setup, Passport
configuration, and boilerplate CRUD routes/views) were developed with the
assistance of Claude (Anthropic AI). All code was reviewed, understood, and
customized by the student. Written approval for AI-assisted code was
obtained from the instructor via email per course policy.

## Author
Vedangi Patel — COMP 2068, Group Assignment 2B