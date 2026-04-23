# Banking Ledger

## Overview
A banking ledger system for managing financial transactions and records.

## Features
- Transaction logging
- Balance tracking
- Account management
- Data persistence

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the project root with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
CLIENT_ID=your_oauth_client_id
CLIENT_SECRET=your_oauth_client_secret
REFRESH_TOKEN=your_oauth_refresh_token
```

### Usage
```bash
npm start
```

### Development
```bash
npm run dev
```

The server runs on `http://localhost:3000`.

## Project Structure
```text
.
|-- README.md
|-- package.json
|-- package-lock.json
|-- server.js
`-- src
    |-- app.js
    |-- config
    |   `-- db.js
    |-- controllers
    |   |-- account.controller.js
    |   |-- auth.controller.js
    |   `-- transaction.controller.js
    |-- middleware
    |   `-- auth.middleware.js
    |-- models
    |   |-- account.model.js
    |   |-- blackList.model.js
    |   |-- ledger.model.js
    |   |-- transaction.model.js
    |   `-- user.model.js
    |-- routes
    |   |-- account.routes.js
    |   |-- auth.routes.js
    |   `-- transaction.routes.js
    `-- services
        `-- email.service.js
```

## Authentication
Protected routes accept a JWT either through the `token` cookie or the `Authorization: Bearer <token>` header.

- Standard protected routes use `authMiddleware`
- System-only transaction seeding uses `authSystemUserMiddleware`
- Login and register both return a token and also set the cookie

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in an existing user |
| POST | `/api/auth/logout` | Log out and blacklist the current token |

### Accounts
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/accounts/` | Create a new account for the logged-in user |
| GET | `/api/accounts/` | Get all accounts for the logged-in user |
| GET | `/api/accounts/balance/:accountId` | Get the balance for one account |

### Transactions
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/transactions/` | Create a transfer between two accounts |
| POST | `/api/transactions/system/initial-funds` | Seed initial funds from a system user account |

## Example Request Body

### Register
```json
{
  "name": "Avinash",
  "email": "avinash@example.com",
  "password": "strongPassword123"
}
```

### Login
```json
{
  "email": "avinash@example.com",
  "password": "strongPassword123"
}
```

### Create Transaction
```json
{
  "fromAccount": "account_id_1",
  "toAccount": "account_id_2",
  "amount": 500,
  "idempotencyKey": "txn-unique-key-001"
}
```

## Notes
- MongoDB must be available before starting the server.
- Email credentials are required for registration and transaction email flows.
- There is currently no automated test suite configured in `package.json`.
