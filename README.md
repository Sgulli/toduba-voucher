# Backend Test Challenge

---

## Features

- **User Authentication**: Secure login and registration using hashed passwords and JWT.
- **Product Management**: Create, update, and delete products with associated prices and assets.
- **Order Processing**: Manage orders with line items, calculate totals, and track order statuses.
- **Asset Management**: Upload and retrieve product-related assets using Supabase.
- **Caching**: Improve performance with Redis caching for frequently accessed data.
- **Validation**: Ensure data integrity using Zod schemas.
- **Error Handling**: Centralized error handling with meaningful error messages.

---

## Tech Stack

- **Node.js**: Runtime environment for executing JavaScript code.
- **TypeScript**: Superset of JavaScript for static typing.
- **Express.js**: Web framework for building RESTful APIs.
- **MySQL**: Relational database for storing application data.
- **Prisma**: ORM for database interactions.
- **Redis**: In-memory data store for caching.
- **Supabase**: Storage service for managing assets.
- **Zod**: Schema validation library.
- **Passport.js**: Middleware for authentication.
- **JWT**: JSON Web Tokens for secure user authentication.

---

## Architecture

The application follows a modular architecture with the following key components:

- **Controllers**: Handle HTTP requests and responses.
- **Services**: Contain business logic and interact with the database.
- **Routes**: Define API endpoints and middleware.
- **Utilities**: Provide reusable helper functions and constants.
- **Middlewares**: Handle validation, authentication, and error handling.
- **Database**: Managed using Prisma ORM with a MySQL backend.

---

## API Documentation

### Authentication

#### Sign Up

- **Endpoint**: `POST /api/v1/auth/signup`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "user": {
          "id": "user-id",
          "email": "john.doe@example.com",
          "name": "John Doe"
        },
        "token": "jwt-token"
      }
    }
    ```

#### Sign In

- **Endpoint**: `POST /api/v1/auth/signin`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "user": {
          "id": "user-id",
          "email": "john.doe@example.com"
        },
        "token": "jwt-token"
      }
    }
    ```

#### Me

- **Endpoint**: `GET /api/v1/auth/me`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "user-id",
        "email": "john.doe@example.com",
        "name": "John Doe"
      }
    }
    ```

---

### Users

#### Get All Users

- **Endpoint**: `GET /api/v1/users`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": [
        {
          "id": "user-id",
          "email": "john.doe@example.com",
          "name": "John Doe"
        }
      ]
    }
    ```

#### Get User by ID

- **Endpoint**: `GET /api/v1/users/:id`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "user-id",
        "email": "john.doe@example.com",
        "name": "John Doe"
      }
    }
    ```

---

### Products

#### Create Product

- **Endpoint**: `POST /api/v1/products`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Voucher A",
    "description": "Description of Voucher A",
    "prices": [{ "id": "price-id" }],
    "assets": [{ "id": "asset-id" }]
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "product-id",
        "name": "Voucher A",
        "description": "Description of Voucher A"
      }
    }
    ```

---

### Orders

#### Create Order

- **Endpoint**: `POST /api/v1/orders`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "lineItems": [
      {
        "productId": "product-id",
        "quantity": 2
      }
    ]
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "order-id",
        "status": "NEW",
        "total": 100.0,
        "currency": "EUR",
        "code": "ORD-ABC123"
      }
    }
    ```

#### Get Orders

- **Endpoint**: `GET /api/v1/orders/:userId`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": [
        {
          "id": "order-id",
          "status": "NEW",
          "total": 100.0,
          "currency": "EUR",
          "code": "ORD-ABC123",
          "userId": "user-id",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
    ```

---

### Assets

#### Upload Asset

- **Endpoint**: `POST /api/v1/assets/:productId/upload`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
  - `Content-Type: multipart/form-data`
- **Request Body**:
  - `file`: The file to upload.
  - `alt`: (Optional) Alternative text for the asset.
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "asset-id",
        "name": "test",
        "path": "path/to/asset",
        "alt": "Alternative text",
        "mime": "image/jpeg",
        "productId": "product-id"
      }
    }
    ```

#### Get Asset

- **Endpoint**: `GET /api/v1/assets/:id`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "url": "https://public-url-to-asset"
      }
    }
    ```

---

### Prices

#### Create Price

- **Endpoint**: `POST /api/v1/prices/:productId`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "amount": 100.0,
    "currency": "EUR"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "price-id",
        "amount": 100.0,
        "currency": "EUR",
        "productId": "product-id",
        "isActive": true
      }
    }
    ```

#### Get Price

- **Endpoint**: `GET /api/v1/prices/:id`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "price-id",
        "amount": 100.0,
        "currency": "EUR",
        "productId": "product-id"
      }
    }
    ```

#### Get All Prices

- **Endpoint**: `GET /api/v1/prices`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": [
        {
          "id": "price-id",
          "amount": 100.0,
          "currency": "EUR",
          "productId": "product-id"
        }
      ]
    }
    ```

#### Update Price

- **Endpoint**: `PATCH /api/v1/prices/:id/product/:productId`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "amount": 120.0,
    "currency": "USD",
    "isActive": false
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "ok",
      "data": {
        "id": "price-id",
        "amount": 120.0,
        "currency": "USD",
        "productId": "product-id",
        "isActive": false
      }
    }
    ```

#### Delete Price

- **Endpoint**: `DELETE /api/v1/prices/:id`
- **Headers**:
  - `Authorization: Bearer <jwt-token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Price deleted successfully",
      "data": {
        "id": "price-id",
        "amount": 100.0,
        "currency": "EUR",
        "productId": "product-id",
        "isActive": false
      }
    }
    ```

---

## Database Schema

### Users Table

| Column    | Type     | Constraints      |
| --------- | -------- | ---------------- |
| id        | String   | Primary Key      |
| email     | String   | Unique, Required |
| name      | String   | Optional         |
| password  | String   | Required         |
| createdAt | DateTime | Default: now()   |
| updatedAt | DateTime | Auto-updated     |

### Products Table

| Column      | Type     | Constraints    |
| ----------- | -------- | -------------- |
| id          | String   | Primary Key    |
| name        | String   | Required       |
| description | String   | Optional       |
| createdAt   | DateTime | Default: now() |
| updatedAt   | DateTime | Auto-updated   |

### Orders Table

| Column    | Type     | Constraints    |
| --------- | -------- | -------------- |
| id        | String   | Primary Key    |
| status    | Enum     | Default: NEW   |
| total     | Float    | Required       |
| currency  | Enum     | Default: EUR   |
| code      | String   | Required       |
| userId    | String   | Foreign Key    |
| createdAt | DateTime | Default: now() |
| updatedAt | DateTime | Auto-updated   |

### Line Items Table

| Column    | Type     | Constraints    |
| --------- | -------- | -------------- |
| id        | String   | Primary Key    |
| quantity  | Integer  | Default: 1     |
| amount    | Float    | Required       |
| currency  | Enum     | Required       |
| orderId   | String   | Foreign Key    |
| productId | String   | Foreign Key    |
| createdAt | DateTime | Default: now() |
| updatedAt | DateTime | Auto-updated   |

---

## Environment Variables

| Variable              | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `DATABASE_URL`        | MySQL connection string                                 |
| `MYSQL_ROOT_PASSWORD` | Root password for MySQL                                 |
| `MYSQL_DATABASE`      | MySQL database name                                     |
| `MYSQL_USER`          | MySQL username                                          |
| `MYSQL_PASSWORD`      | MySQL user password                                     |
| `MIN_SALT_LENGTH`     | Minimum salt length for bcrypt                          |
| `MIN_PASSWORD_LENGTH` | Minimum password length for validation                  |
| `PORT`                | Port on which the application runs                      |
| `HOST`                | Hostname for the application                            |
| `JWT_SECRET`          | Secret key for JWT                                      |
| `JWT_EXPIRES_IN`      | JWT expiration time (seconds)                           |
| `NODE_ENV`            | Application environment (e.g., production, development) |
| `SUPABASE_URL`        | Supabase storage URL                                    |
| `SUPABASE_API_KEY`    | Supabase API key                                        |
| `BUCKET_NAME`         | Supabase bucket name                                    |
| `REDIS_HOST`          | Redis host (e.g., service name in Docker)               |
| `REDIS_PORT`          | Redis port                                              |

### Generating a Secure JWT Secret

To generate a secure base64 string for `JWT_SECRET`, you can use the following OpenSSL command:

```bash
openssl rand -base64 32
```

---

## Running the Application

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ivoucher
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

5. Access the API at `http://localhost:<PORT>`.

---

## Docker Setup

1. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:<PORT>`.

---

## Prisma Migrations

### Step 1: Grant Privileges to the Database User

Before running Prisma migrations, ensure the database user has the necessary privileges to manage the schema.

1. **Log in as the root database user**:
   Use the MySQL client or any database management tool to log in as the root user. For example:

   ```bash
   mysql -u root -p
   ```

2. **Grant privileges to the database user**:
   Run the following SQL commands to grant privileges. Replace `<DATABASE_NAME>`, `<DATABASE_USER>`, and `<DATABASE_PASSWORD>` with the appropriate values:

   ```sql
   CREATE USER '<DATABASE_USER>'@'%' IDENTIFIED BY '<DATABASE_PASSWORD>';
   GRANT ALL PRIVILEGES ON <DATABASE_NAME>.* TO '<DATABASE_USER>'@'%';
   FLUSH PRIVILEGES;
   ```

3. **Exit the MySQL client**:
   After granting privileges, exit the MySQL client:
   ```bash
   exit
   ```

Once this step is completed, you can proceed with running Prisma migrations using the `prisma migrate dev` or `prisma migrate deploy` commands.

---

## Errors

The following errors are used throughout the application:

### General Errors

| Error Code | Error Message         |
| ---------- | --------------------- |
| 500        | Internal server error |
| 400        | Bad request           |
| 404        | Not found             |
| 401        | Unauthorized          |
| 403        | Forbidden             |
| 409        | Conflict              |

### Authentication Errors

| Error Code | Error Message       |
| ---------- | ------------------- |
| 401        | Invalid credentials |
| 401        | Invalid password    |
| 401        | Invalid token       |
| 401        | Token expired       |

### User Errors

| Error Code | Error Message       |
| ---------- | ------------------- |
| 404        | User not found      |
| 409        | User already exists |
| 400        | Password mismatch   |

### Product Errors

| Error Code | Error Message          |
| ---------- | ---------------------- |
| 404        | Product not found      |
| 409        | Product already exists |
| 400        | Invalid price          |
| 400        | Invalid currency       |

### Order Errors

| Error Code | Error Message        |
| ---------- | -------------------- |
| 404        | Order not found      |
| 409        | Order already exists |
| 400        | Invalid order status |
| 400        | Invalid quantity     |
| 400        | Invalid line item    |
| 400        | Invalid total amount |
| 400        | Invalid currency     |

### Price Errors

| Error Code | Error Message                  |
| ---------- | ------------------------------ |
| 404        | Price not found                |
| 409        | Price already exists           |
| 400        | Invalid amount                 |
| 400        | Invalid currency               |
| 400        | Price and product do not match |

### Asset Errors

| Error Code | Error Message    |
| ---------- | ---------------- |
| 400        | File is required |

---

## License

This project is licensed under the ISC License.

## Author

Simone Guglielmi

## Notes

The order flow is intentionally simplified due to timing constraints.
