#!/usr/bin/env node

// Islamic Mission City - Sample Data Seeding Script
// Creates sample data for testing the backend integration

const Parse = require('parse/node');
require('dotenv').config();

// Initialize Parse
Parse.initialize(
  process.env.VITE_BACK4APP_APP_ID,
  process.env.VITE_BACK4APP_JS_KEY
);
Parse.serverURL = process.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com/';

console.log('🌱 Islamic Mission City - Sample Data Seeding');
console.log('=============================================\n');

// Sample student profiles
const sampleProfiles = [
  {
    name: 'أحمد محمد',
    nationality: 'إندونيسيا',
    flag: '🇮🇩',
    languages: ['العربية', 'الإندونيسية', 'الإنجليزية'],
    skills: ['مطور مواقع', 'تصميم جرافيك', 'تدريس القرآن'],
    rating: 5,
    location: 'المبنى أ - الدور الثالث',
    bio: 'طالب دكتوراه في علوم الحاسوب، أحب تعليم البرمجة ومساعدة الطلاب الجدد في التأقلم مع الحياة في القاهرة.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    whatsappNumber: '+201234567890',
    isOnline: true,
    isActive: true
  },
  {
    name: 'فاطمة عبدالله',
    nationality: 'ماليزيا',
    flag: '🇲🇾',
    languages: ['العربية', 'الماليزية', 'الإنجليزية', 'الصينية'],
    skills: ['طبخ آسيوي', 'ترجمة', 'تصوير فوتوغرافي'],
    rating: 5,
    location: 'المبنى ب - الدور الثاني',
    bio: 'طالبة ماجستير في الدراسات الإسلامية، أحب الطبخ وتبادل الوصفات التقليدية من بلدي.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    whatsappNumber: '+201234567891',
    isOnline: false,
    isActive: true
  },
  {
    name: 'عمر حسن',
    nationality: 'نيجيريا',
    flag: '🇳🇬',
    languages: ['العربية', 'الإنجليزية', 'الهوسا', 'اليوروبا'],
    skills: ['كتابة إبداعية', 'خطابة', 'تنظيم فعاليات'],
    rating: 4,
    location: 'المبنى ج - الدور الأول',
    bio: 'طالب ماجستير في الأدب العربي، أحب تنظيم الأمسيات الثقافية وورش الكتابة الإبداعية.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    whatsappNumber: '+201234567892',
    isOnline: true,
    isActive: true
  }
];

// Sample marketplace items
const sampleMarketplaceItems = [
  {
    title: 'لابتوب Dell XPS 13 مستعمل بحالة ممتازة',
    price: 15000,
    description: 'لابتوب Dell XPS 13 مستعمل لمدة سنة واحدة فقط، بحالة ممتازة جداً. مناسب للطلاب والمبرمجين. يأتي مع الشاحن الأصلي وحقيبة الحماية.',
    location: 'المبنى أ - الدور الثالث',
    category: 'إلكترونيات',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    isNegotiable: true,
    isAvailable: true,
    views: 45
  },
  {
    title: 'كتب طبية مستعملة - مجموعة كاملة',
    price: 800,
    description: 'مجموعة كتب طبية مستعملة في حالة جيدة جداً. تشمل كتب التشريح وعلم وظائف الأعضاء والأمراض الباطنة.',
    location: 'المبنى ب - الدور الأول',
    category: 'كتب ومراجع',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    isNegotiable: false,
    isAvailable: true,
    views: 23
  }
];

// Sample news items
const sampleNews = [
  {
    type: 'announcement',
    title: 'انقطاع المياه غداً من الساعة 10 صباحاً حتى 4 عصراً',
    content: 'سيتم قطع المياه عن جميع المباني غداً الثلاثاء للصيانة الدورية. يرجى تخزين المياه مسبقاً.',
    date: '2024-01-15',
    time: '09:30',
    priority: 'high',
    building: 'جميع المباني',
    isActive: true
  },
  {
    type: 'event',
    title: 'أمسية ثقافية: "ليلة التراث العربي"',
    content: 'ندعوكم لحضور أمسية ثقافية مميزة تتضمن شعر وموسيقى تراثية من مختلف البلدان العربية.',
    date: '2024-01-18',
    time: '19:00',
    priority: 'medium',
    building: 'القاعة الكبرى',
    isActive: true
  }
];

// Sample food listings
const sampleFoodListings = [
  {
    name: 'جولوف رايس نيجيري أصلي',
    nationality: '🇳🇬',
    price: 30,
    description: 'أرز جولوف نيجيري تقليدي مطبوخ بالطماطم والتوابل الأفريقية الأصلية مع الدجاج والخضار.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
    rating: 4.8,
    prepTime: '45 دقيقة',
    servings: 4,
    location: 'المبنى أ - الدور الثاني',
    available: true,
    tags: ['حلال', 'حار', 'أفريقي']
  },
  {
    name: 'ناسي لماك الماليزي',
    nationality: '🇲🇾',
    price: 25,
    description: 'أرز جوز الهند الماليزي التقليدي مع السمبل والخيار والبيض المسلوق والفول السوداني.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    rating: 4.9,
    prepTime: '30 دقيقة',
    servings: 2,
    location: 'المبنى ب - الدور الأول',
    available: true,
    tags: ['حلال', 'حار', 'آسيوي']
  }
];

async function createSampleUser(userData) {
  const user = new Parse.User();
  user.set('username', userData.name.replace(/\s+/g, '').toLowerCase());
  user.set('email', `${userData.name.replace(/\s+/g, '').toLowerCase()}@example.com`);
  user.set('password', 'password123');
  user.set('name', userData.name);
  user.set('whatsappNumber', userData.whatsappNumber);
  
  try {
    await user.signUp();
    console.log(`✅ Created user: ${userData.name}`);
    return user;
  } catch (error) {
    console.log(`⚠️  User ${userData.name} might already exist`);
    // Try to find existing user
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', userData.name.replace(/\s+/g, '').toLowerCase());
    const existingUser = await query.first({ useMasterKey: true });
    return existingUser;
  }
}

async function seedStudentProfiles() {
  console.log('👥 Seeding student profiles...');
  
  for (const profileData of sampleProfiles) {
    try {
      const user = await createSampleUser(profileData);
      if (!user) continue;
      
      const profile = new Parse.Object('StudentProfile');
      profile.set('user', user);
      profile.set('name', profileData.name);
      profile.set('nationality', profileData.nationality);
      profile.set('flag', profileData.flag);
      profile.set('languages', profileData.languages);
      profile.set('skills', profileData.skills);
      profile.set('rating', profileData.rating);
      profile.set('location', profileData.location);
      profile.set('bio', profileData.bio);
      profile.set('avatar', profileData.avatar);
      profile.set('whatsappNumber', profileData.whatsappNumber);
      profile.set('isOnline', profileData.isOnline);
      profile.set('isActive', profileData.isActive);
      
      await profile.save(null, { useMasterKey: true });
      console.log(`✅ Created profile: ${profileData.name}`);
    } catch (error) {
      console.log(`❌ Failed to create profile for ${profileData.name}:`, error.message);
    }
  }
}

async function seedMarketplaceItems() {
  console.log('🛍️  Seeding marketplace items...');
  
  // Get a sample user to be the seller
  const userQuery = new Parse.Query(Parse.User);
  const sampleUser = await userQuery.first({ useMasterKey: true });
  
  if (!sampleUser) {
    console.log('❌ No users found. Please seed student profiles first.');
    return;
  }
  
  for (const itemData of sampleMarketplaceItems) {
    try {
      const item = new Parse.Object('MarketplaceItem');
      item.set('title', itemData.title);
      item.set('price', itemData.price);
      item.set('description', itemData.description);
      item.set('location', itemData.location);
      item.set('category', itemData.category);
      item.set('image', itemData.image);
      item.set('seller', sampleUser);
      item.set('isNegotiable', itemData.isNegotiable);
      item.set('isAvailable', itemData.isAvailable);
      item.set('views', itemData.views);
      
      await item.save(null, { useMasterKey: true });
      console.log(`✅ Created marketplace item: ${itemData.title}`);
    } catch (error) {
      console.log(`❌ Failed to create item ${itemData.title}:`, error.message);
    }
  }
}

async function seedNews() {
  console.log('📰 Seeding news items...');
  
  // Get a sample user to be the author
  const userQuery = new Parse.Query(Parse.User);
  const sampleUser = await userQuery.first({ useMasterKey: true });
  
  if (!sampleUser) {
    console.log('❌ No users found. Please seed student profiles first.');
    return;
  }
  
  for (const newsData of sampleNews) {
    try {
      const newsItem = new Parse.Object('NewsItem');
      newsItem.set('type', newsData.type);
      newsItem.set('title', newsData.title);
      newsItem.set('content', newsData.content);
      newsItem.set('date', newsData.date);
      newsItem.set('time', newsData.time);
      newsItem.set('priority', newsData.priority);
      newsItem.set('building', newsData.building);
      newsItem.set('author', sampleUser);
      newsItem.set('isActive', newsData.isActive);
      
      await newsItem.save(null, { useMasterKey: true });
      console.log(`✅ Created news item: ${newsData.title}`);
    } catch (error) {
      console.log(`❌ Failed to create news ${newsData.title}:`, error.message);
    }
  }
}

async function seedFoodListings() {
  console.log('🍽️  Seeding food listings...');
  
  // Get sample users to be chefs
  const userQuery = new Parse.Query(Parse.User);
  const users = await userQuery.find({ useMasterKey: true });
  
  if (users.length === 0) {
    console.log('❌ No users found. Please seed student profiles first.');
    return;
  }
  
  for (let i = 0; i < sampleFoodListings.length; i++) {
    const foodData = sampleFoodListings[i];
    const chef = users[i % users.length]; // Rotate through available users
    
    try {
      const listing = new Parse.Object('FoodListing');
      listing.set('name', foodData.name);
      listing.set('chef', chef);
      listing.set('nationality', foodData.nationality);
      listing.set('price', foodData.price);
      listing.set('description', foodData.description);
      listing.set('image', foodData.image);
      listing.set('rating', foodData.rating);
      listing.set('prepTime', foodData.prepTime);
      listing.set('servings', foodData.servings);
      listing.set('location', foodData.location);
      listing.set('tags', foodData.tags);
      listing.set('available', foodData.available);
      
      await listing.save(null, { useMasterKey: true });
      console.log(`✅ Created food listing: ${foodData.name}`);
    } catch (error) {
      console.log(`❌ Failed to create food listing ${foodData.name}:`, error.message);
    }
  }
}

async function main() {
  try {
    console.log('Starting sample data seeding...\n');
    
    await seedStudentProfiles();
    console.log();
    
    await seedMarketplaceItems();
    console.log();
    
    await seedNews();
    console.log();
    
    await seedFoodListings();
    console.log();
    
    console.log('🎉 Sample data seeding completed successfully!');
    console.log('\nYou can now test the frontend with real data from the backend.');
    console.log('Run: npm run dev');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

// Check if environment variables are set
if (!process.env.VITE_BACK4APP_APP_ID || !process.env.VITE_BACK4APP_JS_KEY) {
  console.error('❌ Missing Back4App credentials in .env file');
  console.error('Please set VITE_BACK4APP_APP_ID and VITE_BACK4APP_JS_KEY');
  process.exit(1);
}

// Run the seeding
main();
