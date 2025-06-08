// Islamic Mission City - Backend Hooks
// React hooks for easy backend integration

import { useState, useEffect, useCallback } from 'react';
import api, { 
  StudentProfile, 
  MarketplaceItem, 
  NewsItem, 
  FoodListing, 
  AppStats 
} from '../services/api';

// ============================================================================
// STUDENT PROFILES HOOKS
// ============================================================================

export const useStudentProfiles = (filters: {
  nationality?: string;
  skill?: string;
  language?: string;
  page?: number;
  limit?: number;
} = {}) => {
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.studentProfilesAPI.getProfiles(filters);
      
      setProfiles(result.profiles);
      setTotalCount(result.totalCount);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const refetch = useCallback(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return {
    profiles,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    refetch
  };
};

export const useStudentProfile = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProfile = useCallback(async (profileData: Omit<StudentProfile, 'id' | 'isOnline'>) => {
    try {
      setSaving(true);
      setError(null);
      
      const result = await api.studentProfilesAPI.saveProfile(profileData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في حفظ الملف الشخصي';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    saveProfile,
    saving,
    error
  };
};

// ============================================================================
// MARKETPLACE HOOKS
// ============================================================================

export const useMarketplace = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'popular';
  page?: number;
  limit?: number;
} = {}) => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.marketplaceAPI.getItems(filters);
      
      setItems(result.items);
      setTotalCount(result.totalCount);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const incrementViews = useCallback(async (itemId: string) => {
    try {
      await api.marketplaceAPI.incrementViews(itemId);
      // Update local state
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, views: item.views + 1 }
            : item
        )
      );
    } catch (err) {
      console.error('Failed to increment views:', err);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    incrementViews,
    refetch
  };
};

export const useMarketplaceItem = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = useCallback(async (itemData: Omit<MarketplaceItem, 'id' | 'seller' | 'sellerPhone' | 'postedAt' | 'views'>) => {
    try {
      setCreating(true);
      setError(null);
      
      const result = await api.marketplaceAPI.createItem(itemData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في إضافة المنتج';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setCreating(false);
    }
  }, []);

  return {
    createItem,
    creating,
    error
  };
};

// ============================================================================
// NEWS HOOKS
// ============================================================================

export const useNews = (filters: {
  priority?: 'high' | 'medium' | 'low';
  type?: 'announcement' | 'event' | 'lost-found' | 'rule' | 'maintenance';
  building?: string;
  page?: number;
  limit?: number;
} = {}) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.newsAPI.getNews(filters);
      
      setNews(result.news);
      setTotalCount(result.totalCount);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refetch = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    refetch
  };
};

// ============================================================================
// FOOD LISTINGS HOOKS
// ============================================================================

export const useFoodListings = (filters: {
  availableOnly?: boolean;
  page?: number;
  limit?: number;
} = {}) => {
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.foodAPI.getListings(filters);
      
      setListings(result.listings);
      setTotalCount(result.totalCount);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const refetch = useCallback(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    refetch
  };
};

export const useFoodListing = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createListing = useCallback(async (foodData: Omit<FoodListing, 'id' | 'chef' | 'chefPhone' | 'rating'>) => {
    try {
      setCreating(true);
      setError(null);
      
      const result = await api.foodAPI.createListing(foodData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في إضافة الطبق';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setCreating(false);
    }
  }, []);

  return {
    createListing,
    creating,
    error
  };
};

// ============================================================================
// STATISTICS HOOKS
// ============================================================================

export const useAppStats = () => {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await api.statsAPI.getStats();
      setStats(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refetch = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch
  };
};

// ============================================================================
// AUTHENTICATION HOOKS
// ============================================================================

export const useAuth = () => {
  const [user, setUser] = useState(api.authAPI.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    whatsappNumber: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const newUser = await api.authAPI.signUp(userData);
      setUser(newUser);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في إنشاء الحساب';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logIn = useCallback(async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const loggedInUser = await api.authAPI.logIn(username, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في تسجيل الدخول';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await api.authAPI.logOut();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في تسجيل الخروج';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const isLoggedIn = useCallback(() => {
    return api.authAPI.isLoggedIn();
  }, []);

  return {
    user,
    loading,
    error,
    signUp,
    logIn,
    logOut,
    isLoggedIn
  };
};

// ============================================================================
// FILE UPLOAD HOOKS
// ============================================================================

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadImage = useCallback(async (file: File, fileName?: string) => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);
      
      const imageUrl = await api.fileAPI.uploadImage(file, fileName);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل في رفع الصورة';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  return {
    uploadImage,
    uploading,
    error,
    progress
  };
};
