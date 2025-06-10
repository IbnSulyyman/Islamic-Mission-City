#!/usr/bin/env node

// Islamic Mission City - Backend Deployment Script
// Automates the deployment of cloud code to Back4App

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Islamic Mission City - Backend Deployment');
console.log('============================================\n');

// Check if Back4App CLI is installed
function checkB4ACLI() {
  try {
    execSync('b4a --version', { stdio: 'ignore' });
    console.log('✅ Back4App CLI is installed');
    return true;
  } catch (error) {
    console.log('❌ Back4App CLI is not installed');
    console.log('📦 Installing Back4App CLI...\n');
    
    try {
      execSync('npm install -g back4app-cli', { stdio: 'inherit' });
      console.log('✅ Back4App CLI installed successfully\n');
      return true;
    } catch (installError) {
      console.error('❌ Failed to install Back4App CLI');
      console.error('Please install it manually: npm install -g back4app-cli');
      return false;
    }
  }
}

// Check if user is logged in to Back4App
function checkB4ALogin() {
  try {
    execSync('b4a whoami', { stdio: 'ignore' });
    console.log('✅ Logged in to Back4App');
    return true;
  } catch (error) {
    console.log('❌ Not logged in to Back4App');
    console.log('🔐 Please login to Back4App:');
    console.log('   b4a login\n');
    return false;
  }
}

// Check if cloud code exists
function checkCloudCode() {
  const cloudPath = path.join(process.cwd(), 'cloud', 'main.js');
  if (fs.existsSync(cloudPath)) {
    console.log('✅ Cloud code found');
    return true;
  } else {
    console.log('❌ Cloud code not found at cloud/main.js');
    return false;
  }
}

// Deploy cloud code
function deployCloudCode() {
  try {
    console.log('🚀 Deploying cloud code to Back4App...\n');
    execSync('b4a deploy', { stdio: 'inherit' });
    console.log('\n✅ Cloud code deployed successfully!');
    return true;
  } catch (error) {
    console.error('\n❌ Failed to deploy cloud code');
    console.error('Error:', error.message);
    return false;
  }
}

// Verify deployment
function verifyDeployment() {
  console.log('\n🔍 Verifying deployment...');
  console.log('Please check your Back4App dashboard:');
  console.log('1. Go to Cloud Code section');
  console.log('2. Verify all functions are listed:');
  console.log('   - getStudentProfiles');
  console.log('   - saveStudentProfile');
  console.log('   - getMarketplaceItems');
  console.log('   - createMarketplaceItem');
  console.log('   - getNews');
  console.log('   - createNewsItem');
  console.log('   - getFoodListings');
  console.log('   - createFoodListing');
  console.log('   - getAppStats');
  console.log('3. Test a function (e.g., getAppStats) to ensure it works\n');
}

// Main deployment process
async function main() {
  console.log('Step 1: Checking prerequisites...');
  
  if (!checkB4ACLI()) {
    process.exit(1);
  }
  
  if (!checkB4ALogin()) {
    console.log('Please run: b4a login');
    process.exit(1);
  }
  
  if (!checkCloudCode()) {
    process.exit(1);
  }
  
  console.log('\nStep 2: Deploying cloud code...');
  
  if (!deployCloudCode()) {
    process.exit(1);
  }
  
  console.log('\nStep 3: Verification...');
  verifyDeployment();
  
  console.log('🎉 Deployment completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Update your .env file with Back4App credentials');
  console.log('2. Create database classes in Back4App dashboard');
  console.log('3. Test the frontend integration');
  console.log('\nFor detailed setup instructions, see BACKEND_SETUP.md');
}

// Run the deployment
main().catch(error => {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
});
