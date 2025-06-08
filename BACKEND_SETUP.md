# 🚀 Back4App Backend Setup Guide

This guide will help you set up the Back4App backend for the Islamic Mission City website.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Back4App Account Setup](#back4app-account-setup)
- [Database Schema](#database-schema)
- [Cloud Code Deployment](#cloud-code-deployment)
- [Environment Configuration](#environment-configuration)
- [Testing the Backend](#testing-the-backend)
- [Security Configuration](#security-configuration)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

- Back4App account (free tier available)
- Node.js 18.0.0 or higher
- Git for version control
- Basic understanding of Parse Server

## 🌐 Back4App Account Setup

### Step 1: Create Back4App Account

1. Go to [Back4App](https://www.back4app.com/)
2. Click "Sign Up" and create your account
3. Verify your email address

### Step 2: Create New App

1. Click "Build new app"
2. Choose "Backend as a Service"
3. Enter app name: `Islamic Mission City`
4. Select your preferred region (choose closest to Cairo, Egypt)
5. Click "Create app"

### Step 3: Get App Credentials

1. Go to your app dashboard
2. Navigate to "App Settings" → "Security & Keys"
3. Copy the following credentials:
   - **Application ID**
   - **JavaScript Key**
   - **REST API Key**
   - **Master Key** (keep this secure!)

## 🗄️ Database Schema

### Step 1: Create Database Classes

Go to "Database" in your Back4App dashboard and create the following classes:

#### 1. StudentProfile Class

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| user | Pointer to _User | Yes | Reference to user account |
| name | String | Yes | Student's full name |
| nationality | String | Yes | Student's nationality |
| flag | String | Yes | Country flag emoji |
| languages | Array | Yes | Spoken languages |
| skills | Array | Yes | Student's skills |
| rating | Number | No | Average rating (default: 5.0) |
| location | String | Yes | Building and room location |
| bio | String | Yes | Student's biography |
| avatar | String | No | Profile picture URL |
| whatsappNumber | String | Yes | WhatsApp contact number |
| isOnline | Boolean | No | Online status (default: false) |
| isActive | Boolean | No | Profile active status (default: true) |
| lastSeen | Date | No | Last activity timestamp |

#### 2. MarketplaceItem Class

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| title | String | Yes | Item title |
| price | Number | Yes | Item price in EGP |
| description | String | Yes | Item description |
| location | String | Yes | Item location |
| category | String | Yes | Item category |
| image | String | No | Item image URL |
| seller | Pointer to _User | Yes | Reference to seller |
| isNegotiable | Boolean | No | Price negotiable (default: false) |
| isAvailable | Boolean | No | Item availability (default: true) |
| views | Number | No | View count (default: 0) |

#### 3. NewsItem Class

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| type | String | Yes | News type (announcement, event, etc.) |
| title | String | Yes | News title |
| content | String | Yes | News content |
| date | String | Yes | Event/news date |
| time | String | Yes | Event/news time |
| priority | String | Yes | Priority level (high, medium, low) |
| building | String | Yes | Affected building |
| author | Pointer to _User | Yes | News author |
| isActive | Boolean | No | News active status (default: true) |

#### 4. FoodListing Class

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| name | String | Yes | Dish name |
| chef | Pointer to _User | Yes | Reference to chef |
| nationality | String | Yes | Cuisine nationality |
| price | Number | Yes | Dish price in EGP |
| description | String | Yes | Dish description |
| image | String | No | Dish image URL |
| rating | Number | No | Dish rating (default: 5.0) |
| prepTime | String | Yes | Preparation time |
| servings | Number | Yes | Number of servings |
| location | String | Yes | Chef's location |
| tags | Array | Yes | Dietary tags (حلال, حار, etc.) |
| available | Boolean | No | Availability status (default: true) |

### Step 2: Set Class Permissions

For each class, configure the following permissions in "Database" → "Class Name" → "Security":

#### StudentProfile Permissions
- **Find**: Public Read
- **Get**: Public Read  
- **Create**: Authenticated Users
- **Update**: Owner only
- **Delete**: Owner only

#### MarketplaceItem Permissions
- **Find**: Public Read
- **Get**: Public Read
- **Create**: Authenticated Users
- **Update**: Owner only
- **Delete**: Owner only

#### NewsItem Permissions
- **Find**: Public Read
- **Get**: Public Read
- **Create**: Admin only (requires custom logic)
- **Update**: Admin only
- **Delete**: Admin only

#### FoodListing Permissions
- **Find**: Public Read
- **Get**: Public Read
- **Create**: Authenticated Users
- **Update**: Owner only
- **Delete**: Owner only

## ☁️ Cloud Code Deployment

### Step 1: Install Back4App CLI

```bash
npm install -g back4app-cli
```

### Step 2: Login to Back4App

```bash
b4a login
```

### Step 3: Initialize Cloud Code

```bash
# In your project root directory
b4a new
```

Select your app from the list when prompted.

### Step 4: Deploy Cloud Code

```bash
# Copy the cloud/main.js file to your Back4App cloud folder
cp cloud/main.js ./cloud/main.js

# Deploy to Back4App
b4a deploy
```

### Step 5: Verify Deployment

1. Go to "Cloud Code" in your Back4App dashboard
2. Check that all functions are listed:
   - `getStudentProfiles`
   - `saveStudentProfile`
   - `getMarketplaceItems`
   - `createMarketplaceItem`
   - `incrementItemViews`
   - `getNews`
   - `createNewsItem`
   - `getFoodListings`
   - `createFoodListing`
   - `getAppStats`

## 🔐 Environment Configuration

### Step 1: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit the `.env` file with your Back4App credentials:

```env
# Back4App Configuration
VITE_BACK4APP_APP_ID=your_actual_app_id
VITE_BACK4APP_JS_KEY=your_actual_javascript_key
VITE_BACK4APP_SERVER_URL=https://parseapi.back4app.com/

# Other configurations...
```

### Step 3: Install Dependencies

```bash
npm install
```

## 🧪 Testing the Backend

### Step 1: Test Cloud Functions

Use the Back4App dashboard to test cloud functions:

1. Go to "Cloud Code" → "Cloud Functions"
2. Select a function (e.g., `getAppStats`)
3. Click "Run Function"
4. Check the response

### Step 2: Test Frontend Integration

```bash
# Start the development server
npm run dev
```

### Step 3: Verify Data Flow

1. Open the website in your browser
2. Check browser console for any API errors
3. Verify that data loads correctly in each section

## 🔒 Security Configuration

### Step 1: Configure App Settings

In Back4App dashboard → "App Settings" → "Security & Keys":

1. **Enable Client Class Creation**: Disabled
2. **Require Revocable Sessions**: Enabled
3. **Require Authentication**: For sensitive operations

### Step 2: Set Up User Roles

Create the following roles in "Database" → "_Role":

#### Admin Role
- **Name**: `admin`
- **Users**: Add admin users
- **Roles**: None

#### Student Role  
- **Name**: `student`
- **Users**: All registered students
- **Roles**: None

### Step 3: Configure Class-Level Permissions

Update class permissions to use roles:

- **NewsItem Create/Update/Delete**: Admin role only
- **All other operations**: Student role or public as appropriate

## 🐛 Troubleshooting

### Common Issues

#### 1. "Invalid function" Error
**Solution**: Ensure cloud code is properly deployed
```bash
b4a deploy
```

#### 2. "Permission denied" Error
**Solution**: Check class permissions in Back4App dashboard

#### 3. "Network request failed" Error
**Solution**: Verify environment variables are correct

#### 4. Arabic Text Not Displaying
**Solution**: Ensure UTF-8 encoding in database

### Debug Mode

Enable debug mode in your `.env`:
```env
VITE_APP_ENVIRONMENT=development
```

### Logs

Check logs in Back4App dashboard:
1. Go to "Server Settings" → "Logs"
2. Monitor real-time logs for errors

## 📊 Database Seeding

### Step 1: Create Sample Data

Use the Back4App dashboard to create sample data:

#### Sample Student Profile
```json
{
  "name": "أحمد محمد",
  "nationality": "إندونيسيا", 
  "flag": "🇮🇩",
  "languages": ["العربية", "الإندونيسية", "الإنجليزية"],
  "skills": ["مطور مواقع", "تصميم جرافيك"],
  "rating": 5,
  "location": "المبنى أ - الدور الثالث",
  "bio": "طالب دكتوراه في علوم الحاسوب",
  "whatsappNumber": "+201234567890",
  "isOnline": true,
  "isActive": true
}
```

#### Sample Marketplace Item
```json
{
  "title": "لابتوب Dell XPS 13 مستعمل",
  "price": 15000,
  "description": "لابتوب في حالة ممتازة",
  "location": "المبنى أ - الدور الثالث", 
  "category": "إلكترونيات",
  "isNegotiable": true,
  "isAvailable": true,
  "views": 0
}
```

### Step 2: Test with Sample Data

1. Create a few sample records in each class
2. Test the frontend with real data
3. Verify all features work correctly

## 🚀 Production Deployment

### Step 1: Environment Variables

Set production environment variables:
```env
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
```

### Step 2: Security Hardening

1. Rotate all API keys
2. Enable additional security features
3. Set up monitoring and alerts

### Step 3: Performance Optimization

1. Enable database indexing for frequently queried fields
2. Set up caching for static data
3. Monitor performance metrics

---

## 📞 Support

If you encounter issues during setup:

1. **Back4App Documentation**: [docs.back4app.com](https://docs.back4app.com)
2. **Community Support**: Back4App community forums
3. **Project Issues**: GitHub Issues page

## 🔄 Frontend Integration

### Step 1: Install Dependencies

```bash
npm install parse axios
```

### Step 2: Update Components

The frontend components have been updated to use the backend hooks. Key changes:

#### Hero Section
- Now displays real-time statistics from the database
- Shows loading states while fetching data

#### Cultural Exchange
- Replace mock data with `useStudentProfiles` hook
- Add real-time filtering and search

#### Marketplace
- Replace mock data with `useMarketplace` hook
- Add view tracking and real-time updates

#### News Section
- Replace mock data with `useNews` hook
- Add priority-based filtering

#### Food Section
- Replace mock data with `useFoodListings` hook
- Add availability tracking

### Step 3: Example Component Update

```tsx
// Before (with mock data)
const mockProfiles = [/* static data */];

// After (with backend integration)
import { useStudentProfiles } from '../../hooks/useBackend';

const CulturalExchange = () => {
  const { profiles, loading, error } = useStudentProfiles({
    nationality: selectedNationality,
    skill: selectedSkill,
    page: 1,
    limit: 20
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    // Render profiles from backend
  );
};
```

## 📱 Mobile App Integration

### React Native Setup

For future mobile app development:

```bash
# Install React Native Parse SDK
npm install parse/react-native
```

### Expo Integration

```bash
# For Expo projects
expo install parse
```

## 🔔 Push Notifications

### Setup Parse Push

1. Enable Push Notifications in Back4App dashboard
2. Configure FCM/APNS credentials
3. Add push notification cloud functions

```javascript
// Cloud function for sending notifications
Parse.Cloud.define("sendNotification", async (request) => {
  const { message, userIds } = request.params;

  const query = new Parse.Query(Parse.Installation);
  if (userIds) {
    query.containedIn("userId", userIds);
  }

  return Parse.Push.send({
    where: query,
    data: {
      alert: message,
      sound: "default"
    }
  });
});
```

## 🔍 Search & Analytics

### Full-Text Search

Enable full-text search in Back4App:

```javascript
// Add search indexes
Parse.Cloud.define("searchContent", async (request) => {
  const { query, type } = request.params;

  let searchQuery;

  switch (type) {
    case 'students':
      searchQuery = new Parse.Query("StudentProfile");
      searchQuery.matches("name", query, "i");
      break;
    case 'marketplace':
      searchQuery = new Parse.Query("MarketplaceItem");
      searchQuery.matches("title", query, "i");
      break;
    // Add more search types
  }

  return searchQuery.find();
});
```

### Analytics Integration

```javascript
// Track user actions
Parse.Cloud.define("trackEvent", async (request) => {
  const { eventName, properties } = request.params;
  const user = request.user;

  const analytics = new Parse.Object("Analytics");
  analytics.set("eventName", eventName);
  analytics.set("properties", properties);
  analytics.set("user", user);
  analytics.set("timestamp", new Date());

  return analytics.save();
});
```

**Built with ❤️ for the Islamic Mission City community**

*صُمم بحب لمجتمع مدينة البحوث الإسلامية*
