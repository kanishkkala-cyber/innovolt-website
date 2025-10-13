# Innovolt Backend API

Backend API server for Innovolt - Second Hand 3W EVs marketplace.

## 🚀 Features

- **Car Management**: CRUD operations for vehicle listings
- **Contact Forms**: Handle contact form submissions with email notifications
- **Lead Capture**: Process leads from vehicle detail pages
- **Callback Requests**: Manage callback requests from users
- **Email Integration**: Automated email notifications and auto-replies
- **SQLite Database**: Lightweight database for development and production
- **CORS Support**: Configured for frontend communication
- **Data Validation**: Input validation using express-validator

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp config.env .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_PATH=./database.sqlite
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   FRONTEND_URL=http://localhost:3003
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. Initialize the database:
   ```bash
   npm run init-db
   ```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment variables).

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Cars
- `GET /api/cars` - Get all cars (with optional filtering)
- `GET /api/cars/:id` - Get single car by ID
- `POST /api/cars` - Create new car (Admin only)
- `PUT /api/cars/:id` - Update car (Admin only)
- `DELETE /api/cars/:id` - Delete car (Admin only)

### Contact Forms
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (Admin only)
- `PUT /api/contact/:id/status` - Update contact status (Admin only)

### Lead Capture
- `POST /api/leads` - Submit lead capture form
- `GET /api/leads` - Get all leads (Admin only)
- `PUT /api/leads/:id/status` - Update lead status (Admin only)

### Callback Requests
- `POST /api/callback` - Submit callback request
- `GET /api/callback` - Get all callback requests (Admin only)
- `PUT /api/callback/:id/status` - Update callback status (Admin only)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `DB_PATH` | SQLite database path | ./database.sqlite |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | SMTP username | - |
| `EMAIL_PASS` | SMTP password | - |
| `EMAIL_FROM` | From email address | - |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3003 |
| `JWT_SECRET` | JWT secret key | - |

### Email Setup

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 📊 Database Schema

### Tables
- `cars` - Vehicle listings
- `contact_submissions` - Contact form submissions
- `lead_captures` - Lead capture forms
- `callback_requests` - Callback requests
- `user_preferences` - User session data

## 🧪 Testing API

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Test Lead Capture
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "carId": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "message": "Interested in this vehicle"
  }'
```

### Test Callback Request
```bash
curl -X POST http://localhost:5000/api/callback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Smith",
    "phone": "+1234567890",
    "preferredTime": "Evening",
    "message": "Please call me back"
  }'
```

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- SQL injection prevention
- Email validation
- Phone number validation

## 📝 Logs

The server logs all requests and errors to the console. In production, consider using a proper logging library like Winston.

## 🚀 Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Configure proper email settings
3. Use a production database (PostgreSQL, MySQL)
4. Set up proper logging
5. Configure reverse proxy (nginx)
6. Use PM2 for process management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details.
