# authentication-API-project
Voosh - Back-end Engineer Project
# Enhanced Authentication API

This project is an enhanced backend API for an authentication system built using Node.js. It includes features like allowing users to set their profiles as public or private, and providing admin users the ability to view both public and private user profiles, while normal users can only access public profiles.

## Features

- User registration and login
- OAuth integration (Google, Facebook, Twitter, GitHub)
- User profile management (photo, name, bio, phone, email, password)
- Profile visibility settings (public/private)
- Admin functionality to view all profiles (public and private)
- Role-based access control (admin/normal user)
- Error handling and validation
- Secure data transmission and storage

## Installation

1. Clone the repository:

```bash
git clone https://github.com/scrollingtosleep/authentication-API-project.git
```

2. Navigate to the project directory:

```bash
cd enhanced-auth-api
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., MongoDB connection string, JWT secret, OAuth client secrets).

5. Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

## API Documentation

The API documentation is available at [https://documenter.getpostman.com/view/your-postman-id/enhanced-auth-api](https://documenter.getpostman.com/view/your-postman-id/enhanced-auth-api).

You can also use the Swagger UI to interact with the API endpoints:

1. Start the server with the `npm start` command.
2. Open your browser and navigate to `http://localhost:3000/api-docs`.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- multer
- Swagger

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact [scrollingtosleep@gmail.com](mailto:scrollingtosleep@gmail.com).
