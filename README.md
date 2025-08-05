# E-Commerce Backend API

A full-stack e-commerce backend application built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization (JWT)
- Product management (CRUD operations)
- Order management
- Role-based access control (Admin/User)
- Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce_backend_internship
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/ecommerce_db
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Place order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `DELETE /api/orders/:id` - Cancel order (Protected)

## Request/Response Examples

### User Registration
```json
POST /api/users/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "address": "123 Main St, City, Country"
}
```

### User Login
```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Product (Admin)
```json
POST /api/products
Authorization: Bearer <admin_token>
{
  "name": "iPhone 13",
  "description": "Latest iPhone model",
  "price": 999.99,
  "stock": 50
}
```

### Place Order
```json
POST /api/orders
Authorization: Bearer <user_token>
{
  "order_items": [
    {
      "product_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "total_amount": 1999.98
}
```

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  address: String,
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  price: Number (required),
  stock: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  total_amount: Number (required),
  status: String (enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled']),
  order_items: [{
    product_id: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Testing

To test the API endpoints, you can use Postman or any API testing tool. Make sure to:

1. Register a user first
2. Login to get the JWT token
3. Use the token in the Authorization header for protected routes
4. Create an admin user by manually setting `isAdmin: true` in the database

## Deployment

The application can be deployed to platforms like:
- Heroku
- Vercel
- Railway
- DigitalOcean

Make sure to set the environment variables in your deployment platform.

## License

ISC 