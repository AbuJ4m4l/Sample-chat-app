# Sample Chat Application

![GitHub last commit](https://img.shields.io/github/last-commit/abuj4m4l/sample-chat-app)
![GitHub top language](https://img.shields.io/github/languages/top/abuj4m4l/sample-chat-app)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/abuj4m4l/sample-chat-app)
![GitHub](https://img.shields.io/github/license/abuj4m4l/sample-chat-app)
![Bun](https://img.shields.io/badge/bun-2CA5E0?style=for-the-badge&logo=bun&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A sample chat application that demonstrates real-time messaging with Express.js, Bun.js, TailwindCSS, and MongoDB. This project provides a basic chat interface where users can send and receive messages instantly.

## Features

- Real-time messaging
- Sleek interface with TailwindCSS
- Backend with Express.js and Bun.js
- Data storage with MongoDB

## Installation

To get the Sample Chat Application running on your local machine, follow these steps:

### Prerequisites

- Ensure you have Bun installed on your machine. If not, install it by running `bun install` from your terminal.
- MongoDB must be set up either locally or as a cloud instance. Ensure you have access to a MongoDB URI.

### Setup

1. **Clone the repository:**

```bash
git clone https://github.com/abuj4m4l/sample-chat-app.git
```

2. **Navigate to the project directory:**

```bash
cd sample-chat-app
```

3. **Install dependencies with Bun:**

```bash
bun install
```

4. **Setup MongoDB:**
   
- Create a `.env` file based on the `.env.sample` provided in the project.
- Add your MongoDB URI to the `.env` file as `MONGODB_URI=your_mongodb_uri_here`.

### Running the project

1. **Start the server with Bun:**

```bash
bun run index.js
```

**"You can also use Node.js insted of Bun.js"**

After starting the server, navigate to `http://localhost:3000` in your browser to access the Sample Chat Application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
