# Innovolt - Second Hand 3W EVs Marketplace

A full-stack web application for buying and selling second-hand 3-wheeler electric vehicles, built with React frontend and Node.js backend.

## 🚀 Features

### Frontend (React)
- **Modern UI**: Responsive design with Tailwind CSS integration
- **Car Listings**: Browse and filter vehicles by location, brand, price, year
- **Car Details**: Detailed vehicle pages with image galleries
- **Lead Capture**: Forms for interested buyers to request information
- **Contact System**: Contact forms and callback requests
- **User Preferences**: Like cars, compare vehicles, location selection
- **Search & Filter**: Advanced filtering and sorting options
- **Mobile Responsive**: Optimized for all device sizes

### Backend (Node.js)
- **RESTful API**: Complete CRUD operations for all resources
- **Database**: SQLite database with proper schema design
- **Form Handling**: Contact forms, lead capture, callback requests
- **Email Integration**: Automated email notifications and auto-replies
- **Data Validation**: Input validation and sanitization
- **CORS Support**: Configured for frontend communication
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - Global state management
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
innovolt-website/
├── src/                          # React frontend
│   ├── components/               # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CarWidget.jsx
│   │   ├── CallPopup.jsx
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── Home.jsx
│   │   ├── Catalogue.jsx
│   │   ├── Vehicle.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   ├── contexts/                 # React contexts
│   │   └── GlobalContext.jsx
│   ├── services/                 # API services
│   │   └── api.js
│   ├── data/                     # Static data
│   │   └── carData.js
│   └── App.jsx                   # Main app component
├── backend/                      # Node.js backend
│   ├── routes/                   # API routes
│   │   ├── cars.js
│   │   ├── contact.js
│   │   ├── leads.js
│   │   └── callback.js
│   ├── models/                   # Database models
│   │   └── database.js
│   ├── scripts/                  # Utility scripts
│   │   └── initDatabase.js
│   ├── server.js                 # Main server file
│   └── config.env                # Environment variables
├── styles.css                    # Original CSS
├── widget-styles.css             # Widget-specific styles
├── lead-capture.css              # Lead form styles
└── package.json                  # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3003` (or the port shown in terminal)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
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

4. **Initialize database:**
   ```bash
   npm run init-db
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:5000`

## 📡 API Endpoints

### Cars
- `GET /api/cars` - Get all cars (with filtering)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (Admin)
- `PUT /api/contact/:id/status` - Update contact status (Admin)

### Leads
- `POST /api/leads` - Submit lead capture
- `GET /api/leads` - Get all leads (Admin)
- `PUT /api/leads/:id/status` - Update lead status (Admin)

### Callback
- `POST /api/callback` - Submit callback request
- `GET /api/callback` - Get callback requests (Admin)
- `PUT /api/callback/:id/status` - Update callback status (Admin)

### Health Check
- `GET /api/health` - Server health status

## 🎨 Styling

The project uses a combination of:
- **Tailwind CSS** - For utility classes and rapid styling
- **Original CSS** - Preserved from the original design
- **Custom Components** - React components with integrated styling

### Using Tailwind CSS

```jsx
// Example Tailwind usage
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800">Modern Styling</h2>
  <button className="bg-primary hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
    Click Me
  </button>
</div>
```

## 📊 Database Schema

### Tables
- `cars` - Vehicle listings with images, pricing, specifications
- `contact_submissions` - Contact form submissions
- `lead_captures` - Lead capture forms from vehicle pages
- `callback_requests` - Callback request forms
- `user_preferences` - User session data (liked cars, compared cars, location)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
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

## 🧪 Testing

### Test API Endpoints

**Contact Form:**
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

**Lead Capture:**
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

**Callback Request:**
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

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production database
3. Set up proper email configuration
4. Use PM2 for process management
5. Configure reverse proxy (nginx)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: innovoltsales@turno.club
- Create an issue in the repository

## 🔄 Recent Updates

- ✅ Converted vanilla HTML/CSS/JS to React
- ✅ Integrated Tailwind CSS
- ✅ Built comprehensive Node.js backend
- ✅ Added form handling and email notifications
- ✅ Implemented database with SQLite
- ✅ Added API endpoints for all functionality
- ✅ Connected frontend to backend APIs
- ✅ Added loading states and error handling