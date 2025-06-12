// Islamic Mission City - API Service
// Back4App integration for the community platform

import Parse from 'parse';

// Check if Parse should be initialized
const shouldInitializeParse = () => {
  const appId = import.meta.env.VITE_BACK4APP_APP_ID;
  const jsKey = import.meta.env.VITE_BACK4APP_JS_KEY;
  return appId && jsKey && appId !== 'YOUR_APP_ID' && jsKey !== 'YOUR_JS_KEY';
};

// Initialize Parse only if credentials are available
const initializeParse = () => {
  if (shouldInitializeParse()) {
    Parse.initialize(
      import.meta.env.VITE_BACK4APP_APP_ID,
      import.meta.env.VITE_BACK4APP_JS_KEY
    );
    Parse.serverURL = import.meta.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com/';
    console.log('Parse initialized successfully');
  } else {
    console.warn('Parse not initialized - missing environment variables. Using mock data.');
  }
};

// Call initialization
initializeParse();

// Check if Parse is available
const isParseAvailable = () => shouldInitializeParse();

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface StudentProfile {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  languages: string[];
  skills: string[];
  rating: number;
  location: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
  whatsappNumber?: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  description: string;
  location: string;
  category: string;
  image: string;
  seller: string;
  sellerPhone?: string;
  postedAt: Date;
  views: number;
  isNegotiable: boolean;
}

export interface NewsItem {
  id: string;
  type: 'announcement' | 'event' | 'lost-found' | 'rule' | 'maintenance';
  title: string;
  content: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  building: string;
  createdAt: Date;
}

export interface FoodListing {
  id: string;
  name: string;
  chef: string;
  chefPhone?: string;
  nationality: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  prepTime: string;
  servings: number;
  location: string;
  available: boolean;
  tags: string[];
}

export interface AppStats {
  studentsCount: number;
  itemsCount: number;
  foodCount: number;
  newsCount: number;
  countriesCount: number;
  lastUpdated: Date;
}

// ============================================================================
// STUDENT PROFILES API
// ============================================================================

export const studentProfilesAPI = {
  /**
   * Get all student profiles with filtering
   */
  async getProfiles(filters: {
    nationality?: string;
    skill?: string;
    language?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    profiles: StudentProfile[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      if (!isParseAvailable()) {
        // Return mock data when Parse is not available
        const mockProfiles: StudentProfile[] = [
          {
            id: '1',
            name: 'أحمد محمد',
            nationality: 'مصر',
            flag: '🇪🇬',
            languages: ['العربية', 'الإنجليزية'],
            skills: ['البرمجة', 'التصميم'],
            rating: 4.8,
            location: 'القاهرة',
            bio: 'طالب هندسة حاسوب',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            isOnline: true,
            whatsappNumber: '+201234567890'
          }
        ];

        return {
          profiles: mockProfiles,
          totalCount: mockProfiles.length,
          currentPage: 1,
          totalPages: 1
        };
      }

      const result = await Parse.Cloud.run('getStudentProfiles', filters);
      return result;
    } catch (error) {
      console.error('Error fetching student profiles:', error);
      throw new Error('فشل في تحميل ملفات الطلاب');
    }
  },

  /**
   * Save student profile
   */
  async saveProfile(profileData: Omit<StudentProfile, 'id' | 'isOnline'>): Promise<{
    success: boolean;
    profileId: string;
    message: string;
  }> {
    try {
      if (!isParseAvailable()) {
        // Mock response when Parse is not available
        return {
          success: true,
          profileId: 'mock-profile-id',
          message: 'تم حفظ الملف الشخصي بنجاح (وضع التجربة)'
        };
      }

      const result = await Parse.Cloud.run('saveStudentProfile', { profileData });
      return result;
    } catch (error) {
      console.error('Error saving student profile:', error);
      throw new Error('فشل في حفظ الملف الشخصي');
    }
  },

  /**
   * Update online status
   */
  async updateOnlineStatus(isOnline: boolean): Promise<void> {
    try {
      if (!isParseAvailable()) {
        // Mock behavior when Parse is not available
        console.log(`Mock: Updated online status to ${isOnline}`);
        return;
      }

      const user = Parse.User.current();
      if (user) {
        const query = new Parse.Query('StudentProfile');
        query.equalTo('user', user);
        const profile = await query.first();

        if (profile) {
          profile.set('isOnline', isOnline);
          profile.set('lastSeen', new Date());
          await profile.save();
        }
      }
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  }
};

// ============================================================================
// MARKETPLACE API
// ============================================================================

export const marketplaceAPI = {
  /**
   * Get marketplace items with filtering
   */
  async getItems(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'popular';
    page?: number;
    limit?: number;
  } = {}): Promise<{
    items: MarketplaceItem[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const result = await Parse.Cloud.run('getMarketplaceItems', filters);
      return result;
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
      throw new Error('فشل في تحميل منتجات السوق');
    }
  },

  /**
   * Create new marketplace item
   */
  async createItem(itemData: Omit<MarketplaceItem, 'id' | 'seller' | 'sellerPhone' | 'postedAt' | 'views'>): Promise<{
    success: boolean;
    itemId: string;
    message: string;
  }> {
    try {
      const result = await Parse.Cloud.run('createMarketplaceItem', { itemData });
      return result;
    } catch (error) {
      console.error('Error creating marketplace item:', error);
      throw new Error('فشل في إضافة المنتج');
    }
  },

  /**
   * Get single marketplace item
   */
  async getItem(itemId: string): Promise<MarketplaceItem> {
    try {
      const result = await Parse.Cloud.run('getMarketplaceItem', { itemId });
      return result;
    } catch (error) {
      console.error('Error fetching marketplace item:', error);
      throw new Error('فشل في تحميل تفاصيل المنتج');
    }
  },

  /**
   * Update marketplace item
   */
  async updateItem(itemId: string, itemData: Partial<MarketplaceItem>): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const result = await Parse.Cloud.run('updateMarketplaceItem', { itemId, itemData });
      return result;
    } catch (error) {
      console.error('Error updating marketplace item:', error);
      throw new Error('فشل في تحديث المنتج');
    }
  },

  /**
   * Delete marketplace item
   */
  async deleteItem(itemId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const result = await Parse.Cloud.run('deleteMarketplaceItem', { itemId });
      return result;
    } catch (error) {
      console.error('Error deleting marketplace item:', error);
      throw new Error('فشل في حذف المنتج');
    }
  },

  /**
   * Get user's marketplace items
   */
  async getUserItems(userId?: string): Promise<{
    items: MarketplaceItem[];
    totalCount: number;
  }> {
    try {
      const result = await Parse.Cloud.run('getUserMarketplaceItems', { userId });
      return result;
    } catch (error) {
      console.error('Error fetching user marketplace items:', error);
      throw new Error('فشل في تحميل منتجات المستخدم');
    }
  },

  /**
   * Increment item view count
   */
  async incrementViews(itemId: string): Promise<{ success: boolean; views: number }> {
    try {
      const result = await Parse.Cloud.run('incrementItemViews', { itemId });
      return result;
    } catch (error) {
      console.error('Error incrementing views:', error);
      return { success: false, views: 0 };
    }
  }
};

// ============================================================================
// NEWS API
// ============================================================================

export const newsAPI = {
  /**
   * Get news and announcements
   */
  async getNews(filters: {
    priority?: 'high' | 'medium' | 'low';
    type?: 'announcement' | 'event' | 'lost-found' | 'rule' | 'maintenance';
    building?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    news: NewsItem[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const result = await Parse.Cloud.run('getNews', filters);
      return result;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('فشل في تحميل الأخبار');
    }
  },

  /**
   * Create news item (admin only)
   */
  async createNews(newsData: Omit<NewsItem, 'id' | 'createdAt'>): Promise<{
    success: boolean;
    newsId: string;
    message: string;
  }> {
    try {
      const result = await Parse.Cloud.run('createNewsItem', { newsData });
      return result;
    } catch (error) {
      console.error('Error creating news:', error);
      throw new Error('فشل في إضافة الخبر');
    }
  }
};

// ============================================================================
// FOOD LISTINGS API
// ============================================================================

export const foodAPI = {
  /**
   * Get food listings
   */
  async getListings(filters: {
    availableOnly?: boolean;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    listings: FoodListing[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const result = await Parse.Cloud.run('getFoodListings', filters);
      return result;
    } catch (error) {
      console.error('Error fetching food listings:', error);
      throw new Error('فشل في تحميل قائمة الطعام');
    }
  },

  /**
   * Create food listing
   */
  async createListing(foodData: Omit<FoodListing, 'id' | 'chef' | 'chefPhone' | 'rating'>): Promise<{
    success: boolean;
    listingId: string;
    message: string;
  }> {
    try {
      const result = await Parse.Cloud.run('createFoodListing', { foodData });
      return result;
    } catch (error) {
      console.error('Error creating food listing:', error);
      throw new Error('فشل في إضافة الطبق');
    }
  }
};

// ============================================================================
// STATISTICS API
// ============================================================================

export const statsAPI = {
  /**
   * Get application statistics
   */
  async getStats(): Promise<AppStats> {
    try {
      if (!isParseAvailable()) {
        // Return mock stats when Parse is not available
        return {
          studentsCount: 500,
          itemsCount: 1000,
          foodCount: 150,
          newsCount: 25,
          countriesCount: 50,
          lastUpdated: new Date()
        };
      }

      const result = await Parse.Cloud.run('getAppStats');
      return result;
    } catch (error) {
      console.error('Error fetching app stats:', error);
      throw new Error('فشل في تحميل الإحصائيات');
    }
  }
};

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export const authAPI = {
  /**
   * Sign up new user
   */
  async signUp(userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    whatsappNumber: string;
  }): Promise<Parse.User> {
    try {
      const user = new Parse.User();
      user.set('username', userData.username);
      user.set('email', userData.email);
      user.set('password', userData.password);
      user.set('name', userData.name);
      user.set('whatsappNumber', userData.whatsappNumber);
      user.set('isAdmin', false);
      
      await user.signUp();
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error('فشل في إنشاء الحساب');
    }
  },

  /**
   * Log in user
   */
  async logIn(username: string, password: string): Promise<Parse.User> {
    try {
      const user = await Parse.User.logIn(username, password);
      
      // Update online status
      await studentProfilesAPI.updateOnlineStatus(true);
      
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('فشل في تسجيل الدخول');
    }
  },

  /**
   * Log out user
   */
  async logOut(): Promise<void> {
    try {
      // Update online status before logout
      await studentProfilesAPI.updateOnlineStatus(false);
      
      await Parse.User.logOut();
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('فشل في تسجيل الخروج');
    }
  },

  /**
   * Get current user
   */
  getCurrentUser(): Parse.User | null {
    if (!isParseAvailable()) {
      return null; // No user when Parse is not available
    }
    return Parse.User.current();
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    if (!isParseAvailable()) {
      return false; // Not logged in when Parse is not available
    }
    return Parse.User.current() !== null;
  }
};

// ============================================================================
// FILE UPLOAD API
// ============================================================================

export const fileAPI = {
  /**
   * Upload image file
   */
  async uploadImage(file: File, fileName?: string): Promise<string> {
    try {
      const parseFile = new Parse.File(fileName || file.name, file);
      await parseFile.save();
      return parseFile.url() || '';
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('فشل في رفع الصورة');
    }
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format Arabic date
 */
export const formatArabicDate = (date: Date): string => {
  const arabicMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  const day = date.getDate();
  const month = arabicMonths[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

/**
 * Format time ago in Arabic
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'منذ لحظات';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `منذ ${minutes} دقيقة`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `منذ ${hours} ساعة`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `منذ ${days} يوم`;
  }
};

export default {
  studentProfilesAPI,
  marketplaceAPI,
  newsAPI,
  foodAPI,
  statsAPI,
  authAPI,
  fileAPI,
  formatArabicDate,
  formatTimeAgo
};
