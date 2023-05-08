![](./client/src/assets/2.png)

###### Hey there 👋

###### I'm Shyam, a creative coder and self-proclaimed full-stack developer. I make it my mission to translate user-focused designs into pixel-perfect websites as well as developed robust backend for it.

<br/>

![](./client/src/assets/p12.webp)

# Full-Stack MERN Developer - Blogging Site

> I Deployed my Project frontend(client) part on Vercel. so you can check it out 👇
> <br> [http://dotblogs.vercel.app/](http://dotblogs.vercel.app/)

> I Deployed my Project backend(api) part on Render.com. so you can check it out 👇
> <br> [https://dotblogs.onrender.com/api/v1](https://dotblogs.onrender.com/api/v1)

<br>

## Project Description

Developed a fully functional and responsive blogging website using MERN stack, hosted on Render.com for back-end and Vercel for front-end. Implemented features allowing users to write, edit,delete, and share their blog posts, as well as add high-quality images to their content using Cloudinary and Multer for image uploading at the back-end. User input was gathered using React Quill, a rich text editor, to allow bloggers to create content in a more user-friendly format. Password encryption using bcryptjs and user authentication through JSON Web Tokens (JWT) was also implemented for secure user access. Built using React.js and pure CSS for a modern and sleek design.

<br />

## Key skills and technologies used:

- MERN stack (MongoDB, Express, React.js, Node.js)
  Render.com and Vercel for hosting
- Cloudinary and Multer for image uploading at the backend
- React Quill for user input
- bcrypt.js for password encryption
- JSON Web Tokens (JWT) for user authentication
- React.js and pure CSS for front-end development
- Responsive design and user-friendly interface implementation

<br>
To get started with this project, you need to first clone the repository to your local machine:

```bash
  git clone https://github.com/shyamtala003/blogging-site
```

<br>

> ## frontend set-up

<br>

Then, navigate to the project directory and then goto client folder and install the required dependencies:

```bash
cd blogging-site/client
npm install
```

then set the following environment variables in .env
(📌 paste backend api url)

```js
VITE_API_URL=http://localhost:4000/api/v1
```

Then, run command

```bash
npm run dev
```

<br>

> ## backend set-up

<br>
Then, navigate to the project directory and then goto api folder and install the required dependencies:

```bash
cd ..
cd blogging-site/api
npm install
```

then set the following environment variables in .env
(📌 for backend)

```js
PORT=4000
MONGO_URL=mongodb+srv://shyamtala003:shyam1234@cluster0.fcadqu5.mongodb.net/DotBlogs
JWT_SECRET=acbshdcsh12@x$%$
JWT_EXPIRY=2d
COOKIE_EXPIRY=2

CORS_ORIGIN=http://localhost:5173

CLOUD_NAME=dohkle54p
API_KEY=771776985633828
API_SECRET=p2KsnaBOBrfMyveD7tOLFLmtnrs
```

Then, run command

```bash
npm run dev
```

## mind mapping

![](./client/src/assets/Mind%20Map.jpg)

<br>

## This Project took around 35:00 Hours ⏲️ to complate.

## Author

- [@shyamtala](https://github.com/shyamtala003)
