# 🚀 Islamic Mission City - Backend Integration Guide

This guide provides step-by-step instructions for setting up and using the complete Back4App backend integration.

## 📋 Quick Start

### 1. Automated Setup (Recommended)

Run the complete setup script:

```bash
npm run setup-complete
```

This script will:
- Configure environment variables
- Install Back4App CLI
- Deploy cloud code
- Guide you through database setup
- Test the integration

### 2. Manual Setup

If you prefer manual setup, follow these steps:

#### Step 1: Environment Configuration

```bash
# Copy and configure environment variables
cp .env.example .env
# Edit .env with your Back4App credentials
```

#### Step 2: Deploy Cloud Code

```bash
# Install Back4App CLI
npm install -g back4app-cli

# Login to Back4App
b4a login

# Deploy cloud code
npm run deploy-cloud
```

#### Step 3: Create Database Schema

Create the following classes in your Back4App dashboard:
- StudentProfile
- MarketplaceItem  
- NewsItem
- FoodListing

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed schema.

#### Step 4: Seed Sample Data

```bash
npm run seed-data
```

#### Step 5: Test Integration

```bash
npm run dev
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run setup-complete` | Complete automated backend setup |
| `npm run deploy-cloud` | Deploy cloud code to Back4App |
| `npm run seed-data` | Create sample data for testing |
| `npm run dev` | Start development server |

## 🏗️ Architecture Overview

### Frontend Components

All components have been updated to use the backend:

- **HeroSection**: Displays real-time statistics
- **CulturalExchange**: Student profiles with filtering
- **Marketplace**: Items with search and pagination
- **NewsSection**: News and announcements
- **FoodSection**: Food listings with availability

### Backend Services

- **Parse SDK**: Initialized in `src/services/api.ts`
- **React Hooks**: Custom hooks in `src/hooks/useBackend.ts`
- **Cloud Functions**: Deployed from `cloud/main.js`
- **Authentication**: Parse User management

### Data Flow

```
Frontend Components → React Hooks → Parse SDK → Back4App Cloud Functions → Database
```

## 📊 Database Schema

### StudentProfile
- User profiles with skills, languages, and contact info
- Real-time online status
- Rating system

### MarketplaceItem
- Student marketplace for buying/selling
- Categories, pricing, and availability
- View tracking

### NewsItem
- Announcements and news
- Priority levels and building filters
- Admin-only creation

### FoodListing
- Food offerings from student chefs
- Ratings, preparation time, and dietary tags
- WhatsApp ordering integration

## 🔐 Security Features

- **Authentication**: Parse User sessions
- **Authorization**: Role-based permissions
- **Data Validation**: Server-side validation in cloud functions
- **Rate Limiting**: Built-in Parse protections

## 🧪 Testing

### Manual Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check each section:
   - Hero statistics should load from backend
   - Cultural Exchange should show student profiles
   - Marketplace should display items
   - News should show announcements
   - Food should list available dishes

3. Test interactions:
   - Search and filtering
   - Pagination
   - WhatsApp integration
   - Error handling

### Automated Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build
```

## 🚀 Production Deployment

### Frontend Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Backend Configuration

1. Update environment variables for production
2. Configure class permissions in Back4App
3. Set up monitoring and alerts
4. Enable additional security features

## 🔧 Troubleshooting

### Common Issues

#### "Parse not initialized" Error
- Check environment variables in `.env`
- Ensure Back4App credentials are correct

#### "Invalid function" Error
- Verify cloud code is deployed: `npm run deploy-cloud`
- Check function names in Back4App dashboard

#### "Permission denied" Error
- Configure class permissions in Back4App
- Check user authentication status

#### Data Not Loading
- Verify database classes exist
- Check browser console for errors
- Ensure sample data is seeded

### Debug Mode

Enable debug logging:
```env
VITE_APP_ENVIRONMENT=development
```

### Getting Help

1. Check [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed setup
2. Review Back4App documentation
3. Check browser console for errors
4. Verify cloud function logs in Back4App dashboard

## 📈 Performance Optimization

### Frontend
- Components use React.memo for optimization
- Pagination reduces data load
- Loading states improve UX
- Error boundaries handle failures

### Backend
- Cloud functions use efficient queries
- Indexes on frequently queried fields
- Pagination limits data transfer
- Caching for static data

## 🔄 Data Management

### Adding New Data

Use the admin interface or cloud functions:
```javascript
// Example: Create news item
Parse.Cloud.run('createNewsItem', {
  newsData: {
    type: 'announcement',
    title: 'New Announcement',
    content: 'Content here...',
    priority: 'high',
    building: 'All Buildings'
  }
});
```

### Backup and Recovery

- Back4App provides automatic backups
- Export data using Parse dashboard
- Use cloud functions for bulk operations

## 🌟 Features

### Real-time Updates
- Online status tracking
- Live statistics
- Instant notifications

### Multi-language Support
- Arabic and English interface
- RTL text support
- Cultural content

### Mobile Responsive
- Works on all devices
- Touch-friendly interface
- Progressive Web App ready

### WhatsApp Integration
- Direct messaging for orders
- Contact sharing
- Group communication

## 📱 Mobile App Integration

The backend is ready for mobile app development:

```bash
# React Native
npm install parse/react-native

# Expo
expo install parse
```

## 🔔 Push Notifications

Enable push notifications in Back4App:
1. Configure FCM/APNS credentials
2. Add push notification cloud functions
3. Register devices for notifications

## 📊 Analytics

Track user engagement:
- Page views and interactions
- Popular content
- User behavior patterns
- Performance metrics

## 🎯 Next Steps

1. **Production Setup**: Configure for production environment
2. **User Testing**: Get feedback from real users
3. **Feature Enhancement**: Add new features based on needs
4. **Performance Monitoring**: Set up monitoring and alerts
5. **Mobile App**: Develop companion mobile application

---

**Built with ❤️ for the Islamic Mission City community**

*صُمم بحب لمجتمع مدينة البحوث الإسلامية*
