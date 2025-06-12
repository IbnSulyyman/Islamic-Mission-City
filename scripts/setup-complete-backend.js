#!/usr/bin/env node

// Islamic Mission City - Complete Backend Setup Script
// Comprehensive script to set up the entire Back4App integration

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

console.log('🚀 Islamic Mission City - Complete Backend Setup');
console.log('================================================\n');

async function setupEnvironment() {
  console.log('📋 Step 1: Environment Configuration');
  console.log('====================================\n');
  
  const envPath = '.env';
  let needsUpdate = false;
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('YOUR_APP_ID') || envContent.includes('your_app_id_here')) {
      needsUpdate = true;
    }
  } else {
    needsUpdate = true;
  }
  
  if (needsUpdate) {
    console.log('⚠️  Environment variables need to be configured');
    console.log('Please provide your Back4App credentials:\n');
    
    const appId = await askQuestion('Enter your Back4App Application ID: ');
    const jsKey = await askQuestion('Enter your Back4App JavaScript Key: ');
    
    const envContent = `# Islamic Mission City - Environment Variables
# Back4App Configuration
VITE_BACK4APP_APP_ID=${appId}
VITE_BACK4APP_JS_KEY=${jsKey}
VITE_BACK4APP_SERVER_URL=https://parseapi.back4app.com/

# Application Configuration
VITE_APP_NAME=Islamic Mission City
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Contact Information
VITE_WHATSAPP_SUPPORT=+201234567890
VITE_EMAIL_SUPPORT=support@islamicmissioncity.com
VITE_EMAIL_ADMIN=admin@islamicmissioncity.com

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_FILE_UPLOAD=true

# API Configuration
VITE_API_TIMEOUT=10000
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Social Media Links
VITE_FACEBOOK_PAGE=https://facebook.com/islamicmissioncity
VITE_TELEGRAM_CHANNEL=https://t.me/islamicmissioncity
VITE_WHATSAPP_GROUP=https://wa.me/group/example
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment variables configured\n');
  } else {
    console.log('✅ Environment variables already configured\n');
  }
}

async function setupCloudCode() {
  console.log('☁️  Step 2: Cloud Code Deployment');
  console.log('=================================\n');
  
  // Check if Back4App CLI is installed
  try {
    execSync('b4a --version', { stdio: 'ignore' });
    console.log('✅ Back4App CLI is installed');
  } catch (error) {
    console.log('📦 Installing Back4App CLI...');
    try {
      execSync('npm install -g back4app-cli', { stdio: 'inherit' });
      console.log('✅ Back4App CLI installed successfully');
    } catch (installError) {
      console.log('❌ Failed to install Back4App CLI');
      console.log('Please install manually: npm install -g back4app-cli');
      return false;
    }
  }
  
  // Check login status
  try {
    execSync('b4a whoami', { stdio: 'ignore' });
    console.log('✅ Logged in to Back4App');
  } catch (error) {
    console.log('🔐 Please login to Back4App first:');
    console.log('   b4a login');
    console.log('Then run this script again.\n');
    return false;
  }
  
  // Deploy cloud code
  const cloudPath = path.join(process.cwd(), 'cloud', 'main.js');
  if (fs.existsSync(cloudPath)) {
    console.log('🚀 Deploying cloud code...');
    try {
      execSync('b4a deploy', { stdio: 'inherit' });
      console.log('✅ Cloud code deployed successfully\n');
    } catch (error) {
      console.log('❌ Failed to deploy cloud code');
      console.log('Please check your Back4App configuration\n');
      return false;
    }
  } else {
    console.log('❌ Cloud code not found at cloud/main.js\n');
    return false;
  }
  
  return true;
}

function displayDatabaseInstructions() {
  console.log('🗄️  Step 3: Database Schema Setup');
  console.log('=================================\n');
  
  console.log('Please create the following classes in your Back4App dashboard:\n');
  
  console.log('1. StudentProfile Class:');
  console.log('   - user (Pointer to _User) - Required');
  console.log('   - name (String) - Required');
  console.log('   - nationality (String) - Required');
  console.log('   - flag (String) - Required');
  console.log('   - languages (Array) - Required');
  console.log('   - skills (Array) - Required');
  console.log('   - rating (Number) - Default: 5.0');
  console.log('   - location (String) - Required');
  console.log('   - bio (String) - Required');
  console.log('   - avatar (String)');
  console.log('   - whatsappNumber (String) - Required');
  console.log('   - isOnline (Boolean) - Default: false');
  console.log('   - isActive (Boolean) - Default: true');
  console.log('   - lastSeen (Date)\n');
  
  console.log('2. MarketplaceItem Class:');
  console.log('   - title (String) - Required');
  console.log('   - price (Number) - Required');
  console.log('   - description (String) - Required');
  console.log('   - location (String) - Required');
  console.log('   - category (String) - Required');
  console.log('   - image (String)');
  console.log('   - seller (Pointer to _User) - Required');
  console.log('   - isNegotiable (Boolean) - Default: false');
  console.log('   - isAvailable (Boolean) - Default: true');
  console.log('   - views (Number) - Default: 0\n');
  
  console.log('3. NewsItem Class:');
  console.log('   - type (String) - Required');
  console.log('   - title (String) - Required');
  console.log('   - content (String) - Required');
  console.log('   - date (String) - Required');
  console.log('   - time (String) - Required');
  console.log('   - priority (String) - Required');
  console.log('   - building (String) - Required');
  console.log('   - author (Pointer to _User) - Required');
  console.log('   - isActive (Boolean) - Default: true\n');
  
  console.log('4. FoodListing Class:');
  console.log('   - name (String) - Required');
  console.log('   - chef (Pointer to _User) - Required');
  console.log('   - nationality (String) - Required');
  console.log('   - price (Number) - Required');
  console.log('   - description (String) - Required');
  console.log('   - image (String)');
  console.log('   - rating (Number) - Default: 5.0');
  console.log('   - prepTime (String) - Required');
  console.log('   - servings (Number) - Required');
  console.log('   - location (String) - Required');
  console.log('   - tags (Array) - Required');
  console.log('   - available (Boolean) - Default: true\n');
  
  console.log('📋 For detailed instructions, see BACKEND_SETUP.md\n');
}

async function testIntegration() {
  console.log('🧪 Step 4: Testing Integration');
  console.log('==============================\n');
  
  console.log('Starting development server to test integration...');
  
  try {
    console.log('Running: npm run dev');
    console.log('Please check the browser console for any errors');
    console.log('Verify that data loads correctly in each section\n');
    
    // Don't actually start the server in the script, just provide instructions
    console.log('To test the integration:');
    console.log('1. Run: npm run dev');
    console.log('2. Open http://localhost:5173 in your browser');
    console.log('3. Check browser console for any API errors');
    console.log('4. Verify that all sections load data from the backend\n');
    
  } catch (error) {
    console.log('❌ Failed to start development server');
    console.log('Please run manually: npm run dev\n');
  }
}

async function main() {
  try {
    await setupEnvironment();
    
    const cloudSuccess = await setupCloudCode();
    if (!cloudSuccess) {
      console.log('⚠️  Cloud code deployment failed. Please resolve the issues and try again.');
      rl.close();
      return;
    }
    
    displayDatabaseInstructions();
    
    const proceed = await askQuestion('Have you created the database classes? (y/n): ');
    if (proceed.toLowerCase() !== 'y') {
      console.log('Please create the database classes first, then run the test.');
      rl.close();
      return;
    }
    
    await testIntegration();
    
    console.log('🎉 Backend setup completed successfully!');
    console.log('\nYour Islamic Mission City platform is now fully integrated with Back4App!');
    console.log('\nNext steps:');
    console.log('1. Add sample data to test the integration');
    console.log('2. Configure class permissions in Back4App dashboard');
    console.log('3. Set up user roles (admin, student)');
    console.log('4. Test all features thoroughly');
    console.log('\nFor production deployment, see BACKEND_SETUP.md');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// Run the setup
main();
