#!/usr/bin/env node

// Islamic Mission City - Backend Setup Script
// Automated setup for Back4App backend

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🕌 Islamic Mission City - Backend Setup');
console.log('=====================================\n');

// Check if running in correct directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: Please run this script from the project root directory');
  process.exit(1);
}

// Step 1: Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install parse axios', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Step 2: Create environment file if it doesn't exist
console.log('🔧 Setting up environment configuration...');
const envPath = '.env';
const envExamplePath = '.env.example';

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('⚠️  Please update .env with your Back4App credentials\n');
  } else {
    // Create basic .env file
    const envContent = `# Islamic Mission City - Environment Variables
# Back4App Configuration
VITE_BACK4APP_APP_ID=your_app_id_here
VITE_BACK4APP_JS_KEY=your_javascript_key_here
VITE_BACK4APP_SERVER_URL=https://parseapi.back4app.com/

# Application Configuration
VITE_APP_NAME=Islamic Mission City
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Contact Information
VITE_WHATSAPP_SUPPORT=+201234567890
VITE_EMAIL_SUPPORT=support@islamicmissioncity.com
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with default values');
    console.log('⚠️  Please update .env with your Back4App credentials\n');
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Step 3: Verify cloud code exists
console.log('☁️  Checking cloud code...');
const cloudPath = path.join('cloud', 'main.js');

if (fs.existsSync(cloudPath)) {
  console.log('✅ Cloud code found at cloud/main.js');
  console.log('📝 Remember to deploy cloud code to Back4App using: b4a deploy\n');
} else {
  console.log('⚠️  Cloud code not found. Please ensure cloud/main.js exists\n');
}

// Step 4: Check TypeScript configuration
console.log('🔍 Checking TypeScript configuration...');
const tsConfigPath = 'tsconfig.json';

if (fs.existsSync(tsConfigPath)) {
  console.log('✅ TypeScript configuration found\n');
} else {
  console.log('⚠️  TypeScript configuration not found\n');
}

// Step 5: Display next steps
console.log('🚀 Setup Complete! Next Steps:');
console.log('================================\n');

console.log('1. 🌐 Create Back4App Account:');
console.log('   - Go to https://www.back4app.com/');
console.log('   - Create a new app named "Islamic Mission City"');
console.log('   - Get your App ID and JavaScript Key\n');

console.log('2. 🔑 Update Environment Variables:');
console.log('   - Open .env file');
console.log('   - Replace "your_app_id_here" with your actual App ID');
console.log('   - Replace "your_javascript_key_here" with your actual JavaScript Key\n');

console.log('3. 🗄️  Setup Database Schema:');
console.log('   - Follow the database schema guide in BACKEND_SETUP.md');
console.log('   - Create the required classes: StudentProfile, MarketplaceItem, NewsItem, FoodListing\n');

console.log('4. ☁️  Deploy Cloud Code:');
console.log('   - Install Back4App CLI: npm install -g back4app-cli');
console.log('   - Login: b4a login');
console.log('   - Deploy: b4a deploy\n');

console.log('5. 🧪 Test the Integration:');
console.log('   - Start development server: npm run dev');
console.log('   - Check browser console for any API errors');
console.log('   - Verify data loads correctly in each section\n');

console.log('📚 For detailed instructions, see BACKEND_SETUP.md');
console.log('🤝 For support, create an issue on GitHub\n');

console.log('🕌 جزاكم الله خيراً (May Allah reward you with good)');
console.log('Built with ❤️  for the Islamic Mission City community\n');

// Check if Back4App CLI is installed
console.log('🔍 Checking for Back4App CLI...');
try {
  execSync('b4a --version', { stdio: 'pipe' });
  console.log('✅ Back4App CLI is installed');
} catch (error) {
  console.log('⚠️  Back4App CLI not found. Install with: npm install -g back4app-cli');
}

console.log('\n🎉 Setup script completed successfully!');
