// Islamic Mission City - Back4App Cloud Code
// Main cloud functions for the community platform

// Import required modules
const Parse = require('parse/node');

// ============================================================================
// STUDENT PROFILES CLOUD FUNCTIONS
// ============================================================================

/**
 * Get all student profiles with filtering and pagination
 */
Parse.Cloud.define("getStudentProfiles", async (request) => {
  const { nationality, skill, language, page = 1, limit = 20 } = request.params;
  
  try {
    const query = new Parse.Query("StudentProfile");
    
    // Apply filters
    if (nationality && nationality !== 'جميع الجنسيات') {
      query.equalTo("nationality", nationality);
    }
    
    if (skill) {
      query.containsAll("skills", [skill]);
    }
    
    if (language) {
      query.containsAll("languages", [language]);
    }
    
    // Only show active profiles
    query.equalTo("isActive", true);
    
    // Pagination
    query.skip((page - 1) * limit);
    query.limit(limit);
    
    // Sort by rating and online status
    query.descending("rating");
    query.descending("isOnline");
    
    const profiles = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });
    
    return {
      profiles: profiles.map(profile => ({
        id: profile.id,
        name: profile.get('name'),
        nationality: profile.get('nationality'),
        flag: profile.get('flag'),
        languages: profile.get('languages'),
        skills: profile.get('skills'),
        rating: profile.get('rating'),
        location: profile.get('location'),
        bio: profile.get('bio'),
        avatar: profile.get('avatar'),
        isOnline: profile.get('isOnline'),
        whatsappNumber: profile.get('whatsappNumber')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create or update student profile
 */
Parse.Cloud.define("saveStudentProfile", async (request) => {
  const { profileData } = request.params;
  const user = request.user;
  
  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }
  
  try {
    let profile;
    
    // Check if profile already exists for this user
    const existingQuery = new Parse.Query("StudentProfile");
    existingQuery.equalTo("user", user);
    const existingProfile = await existingQuery.first({ useMasterKey: true });
    
    if (existingProfile) {
      profile = existingProfile;
    } else {
      profile = new Parse.Object("StudentProfile");
      profile.set("user", user);
      profile.set("createdAt", new Date());
    }
    
    // Set profile data
    profile.set("name", profileData.name);
    profile.set("nationality", profileData.nationality);
    profile.set("flag", profileData.flag);
    profile.set("languages", profileData.languages);
    profile.set("skills", profileData.skills);
    profile.set("location", profileData.location);
    profile.set("bio", profileData.bio);
    profile.set("avatar", profileData.avatar);
    profile.set("whatsappNumber", profileData.whatsappNumber);
    profile.set("isActive", true);
    profile.set("isOnline", true);
    profile.set("updatedAt", new Date());
    
    await profile.save(null, { useMasterKey: true });
    
    return {
      success: true,
      profileId: profile.id,
      message: "تم حفظ الملف الشخصي بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// MARKETPLACE CLOUD FUNCTIONS
// ============================================================================

/**
 * Get marketplace items with filtering and search
 */
Parse.Cloud.define("getMarketplaceItems", async (request) => {
  const { 
    category, 
    minPrice, 
    maxPrice, 
    searchTerm, 
    sortBy = 'newest',
    page = 1, 
    limit = 20 
  } = request.params;
  
  try {
    const query = new Parse.Query("MarketplaceItem");
    
    // Apply filters
    if (category && category !== 'جميع الفئات') {
      query.equalTo("category", category);
    }
    
    if (minPrice) {
      query.greaterThanOrEqualTo("price", parseInt(minPrice));
    }
    
    if (maxPrice) {
      query.lessThanOrEqualTo("price", parseInt(maxPrice));
    }
    
    if (searchTerm) {
      const titleQuery = new Parse.Query("MarketplaceItem");
      titleQuery.contains("title", searchTerm);
      
      const descQuery = new Parse.Query("MarketplaceItem");
      descQuery.contains("description", searchTerm);
      
      query = Parse.Query.or(titleQuery, descQuery);
    }
    
    // Only show available items
    query.equalTo("isAvailable", true);
    
    // Sorting
    switch (sortBy) {
      case 'price-low':
        query.ascending("price");
        break;
      case 'price-high':
        query.descending("price");
        break;
      case 'popular':
        query.descending("views");
        break;
      default:
        query.descending("createdAt");
    }
    
    // Pagination
    query.skip((page - 1) * limit);
    query.limit(limit);
    
    // Include seller information
    query.include("seller");
    
    const items = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });
    
    return {
      items: items.map(item => ({
        id: item.id,
        title: item.get('title'),
        price: item.get('price'),
        description: item.get('description'),
        location: item.get('location'),
        category: item.get('category'),
        image: item.get('image'),
        seller: item.get('seller').get('name'),
        sellerPhone: item.get('seller').get('whatsappNumber'),
        postedAt: item.get('createdAt'),
        views: item.get('views') || 0,
        isNegotiable: item.get('isNegotiable')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create new marketplace item
 */
Parse.Cloud.define("createMarketplaceItem", async (request) => {
  const { itemData } = request.params;
  const user = request.user;
  
  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }
  
  try {
    const item = new Parse.Object("MarketplaceItem");
    
    item.set("title", itemData.title);
    item.set("price", itemData.price);
    item.set("description", itemData.description);
    item.set("location", itemData.location);
    item.set("category", itemData.category);
    item.set("image", itemData.image);
    item.set("seller", user);
    item.set("isNegotiable", itemData.isNegotiable);
    item.set("isAvailable", true);
    item.set("views", 0);
    item.set("createdAt", new Date());
    
    await item.save(null, { useMasterKey: true });
    
    return {
      success: true,
      itemId: item.id,
      message: "تم إضافة المنتج بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Increment item view count
 */
Parse.Cloud.define("incrementItemViews", async (request) => {
  const { itemId } = request.params;
  
  try {
    const query = new Parse.Query("MarketplaceItem");
    const item = await query.get(itemId, { useMasterKey: true });
    
    const currentViews = item.get('views') || 0;
    item.set('views', currentViews + 1);
    
    await item.save(null, { useMasterKey: true });
    
    return { success: true, views: currentViews + 1 };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// NEWS & ANNOUNCEMENTS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get news and announcements
 */
Parse.Cloud.define("getNews", async (request) => {
  const { priority, type, building, page = 1, limit = 20 } = request.params;
  
  try {
    const query = new Parse.Query("NewsItem");
    
    // Apply filters
    if (priority) {
      query.equalTo("priority", priority);
    }
    
    if (type) {
      query.equalTo("type", type);
    }
    
    if (building && building !== 'جميع المباني') {
      query.equalTo("building", building);
    }
    
    // Only show active news
    query.equalTo("isActive", true);
    
    // Sort by priority and date
    query.descending("priority");
    query.descending("createdAt");
    
    // Pagination
    query.skip((page - 1) * limit);
    query.limit(limit);
    
    const news = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });
    
    return {
      news: news.map(item => ({
        id: item.id,
        type: item.get('type'),
        title: item.get('title'),
        content: item.get('content'),
        date: item.get('date'),
        time: item.get('time'),
        priority: item.get('priority'),
        building: item.get('building'),
        createdAt: item.get('createdAt')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create news item (admin only)
 */
Parse.Cloud.define("createNewsItem", async (request) => {
  const { newsData } = request.params;
  const user = request.user;
  
  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }
  
  // Check if user is admin
  const isAdmin = user.get('isAdmin') || false;
  if (!isAdmin) {
    throw new Parse.Error(Parse.Error.OPERATION_FORBIDDEN, "Only admins can create news");
  }
  
  try {
    const newsItem = new Parse.Object("NewsItem");
    
    newsItem.set("type", newsData.type);
    newsItem.set("title", newsData.title);
    newsItem.set("content", newsData.content);
    newsItem.set("date", newsData.date);
    newsItem.set("time", newsData.time);
    newsItem.set("priority", newsData.priority);
    newsItem.set("building", newsData.building);
    newsItem.set("author", user);
    newsItem.set("isActive", true);
    newsItem.set("createdAt", new Date());
    
    await newsItem.save(null, { useMasterKey: true });
    
    return {
      success: true,
      newsId: newsItem.id,
      message: "تم إضافة الخبر بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// FOOD LISTINGS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get food listings
 */
Parse.Cloud.define("getFoodListings", async (request) => {
  const { availableOnly = true, page = 1, limit = 20 } = request.params;
  
  try {
    const query = new Parse.Query("FoodListing");
    
    if (availableOnly) {
      query.equalTo("available", true);
    }
    
    // Sort by rating and creation date
    query.descending("rating");
    query.descending("createdAt");
    
    // Pagination
    query.skip((page - 1) * limit);
    query.limit(limit);
    
    // Include chef information
    query.include("chef");
    
    const listings = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });
    
    return {
      listings: listings.map(listing => ({
        id: listing.id,
        name: listing.get('name'),
        chef: listing.get('chef').get('name'),
        chefPhone: listing.get('chef').get('whatsappNumber'),
        nationality: listing.get('nationality'),
        price: listing.get('price'),
        description: listing.get('description'),
        image: listing.get('image'),
        rating: listing.get('rating'),
        prepTime: listing.get('prepTime'),
        servings: listing.get('servings'),
        location: listing.get('location'),
        available: listing.get('available'),
        tags: listing.get('tags')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create food listing
 */
Parse.Cloud.define("createFoodListing", async (request) => {
  const { foodData } = request.params;
  const user = request.user;
  
  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }
  
  try {
    const listing = new Parse.Object("FoodListing");
    
    listing.set("name", foodData.name);
    listing.set("chef", user);
    listing.set("nationality", foodData.nationality);
    listing.set("price", foodData.price);
    listing.set("description", foodData.description);
    listing.set("image", foodData.image);
    listing.set("prepTime", foodData.prepTime);
    listing.set("servings", foodData.servings);
    listing.set("location", foodData.location);
    listing.set("tags", foodData.tags);
    listing.set("available", true);
    listing.set("rating", 5.0); // Default rating
    listing.set("createdAt", new Date());
    
    await listing.save(null, { useMasterKey: true });
    
    return {
      success: true,
      listingId: listing.id,
      message: "تم إضافة الطبق بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get application statistics
 */
Parse.Cloud.define("getAppStats", async (request) => {
  try {
    const studentsQuery = new Parse.Query("StudentProfile");
    studentsQuery.equalTo("isActive", true);
    const studentsCount = await studentsQuery.count({ useMasterKey: true });
    
    const itemsQuery = new Parse.Query("MarketplaceItem");
    itemsQuery.equalTo("isAvailable", true);
    const itemsCount = await itemsQuery.count({ useMasterKey: true });
    
    const foodQuery = new Parse.Query("FoodListing");
    foodQuery.equalTo("available", true);
    const foodCount = await foodQuery.count({ useMasterKey: true });
    
    const newsQuery = new Parse.Query("NewsItem");
    newsQuery.equalTo("isActive", true);
    const newsCount = await newsQuery.count({ useMasterKey: true });
    
    // Get unique nationalities
    const nationalitiesQuery = new Parse.Query("StudentProfile");
    nationalitiesQuery.equalTo("isActive", true);
    nationalitiesQuery.select("nationality");
    const profiles = await nationalitiesQuery.find({ useMasterKey: true });
    const uniqueNationalities = [...new Set(profiles.map(p => p.get('nationality')))];
    
    return {
      studentsCount,
      itemsCount,
      foodCount,
      newsCount,
      countriesCount: uniqueNationalities.length,
      lastUpdated: new Date()
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// BACKGROUND JOBS
// ============================================================================

/**
 * Clean up old news items (runs daily)
 */
Parse.Cloud.job("cleanupOldNews", async (request) => {
  const { log } = request;
  
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const query = new Parse.Query("NewsItem");
    query.lessThan("createdAt", thirtyDaysAgo);
    query.equalTo("priority", "low");
    
    const oldNews = await query.find({ useMasterKey: true });
    
    for (const news of oldNews) {
      news.set("isActive", false);
      await news.save(null, { useMasterKey: true });
    }
    
    log(`Deactivated ${oldNews.length} old news items`);
  } catch (error) {
    log(`Error cleaning up old news: ${error.message}`);
  }
});

/**
 * Update student online status (runs every 5 minutes)
 */
Parse.Cloud.job("updateOnlineStatus", async (request) => {
  const { log } = request;
  
  try {
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    
    const query = new Parse.Query("StudentProfile");
    query.lessThan("lastSeen", fiveMinutesAgo);
    query.equalTo("isOnline", true);
    
    const inactiveProfiles = await query.find({ useMasterKey: true });
    
    for (const profile of inactiveProfiles) {
      profile.set("isOnline", false);
      await profile.save(null, { useMasterKey: true });
    }
    
    log(`Updated ${inactiveProfiles.length} profiles to offline`);
  } catch (error) {
    log(`Error updating online status: ${error.message}`);
  }
});

// ============================================================================
// ARTICLES & POSTS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get articles/posts with filtering and pagination
 */
Parse.Cloud.define("getArticles", async (request) => {
  const { category, authorId, searchTerm, sortBy = 'newest', page = 1, limit = 20 } = request.params;

  try {
    const query = new Parse.Query("Article");

    // Apply filters
    if (category && category !== 'جميع الفئات') {
      query.equalTo("category", category);
    }

    if (authorId) {
      const author = new Parse.User();
      author.id = authorId;
      query.equalTo("author", author);
    }

    if (searchTerm) {
      const titleQuery = new Parse.Query("Article");
      titleQuery.contains("title", searchTerm);

      const contentQuery = new Parse.Query("Article");
      contentQuery.contains("content", searchTerm);

      query = Parse.Query.or(titleQuery, contentQuery);
    }

    // Only show published articles
    query.equalTo("isPublished", true);

    // Sorting
    switch (sortBy) {
      case 'popular':
        query.descending("likes");
        break;
      case 'comments':
        query.descending("commentsCount");
        break;
      default:
        query.descending("createdAt");
    }

    // Pagination
    query.skip((page - 1) * limit);
    query.limit(limit);

    // Include author information
    query.include("author");

    const articles = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });

    return {
      articles: articles.map(article => ({
        id: article.id,
        title: article.get('title'),
        content: article.get('content'),
        excerpt: article.get('excerpt'),
        category: article.get('category'),
        tags: article.get('tags'),
        image: article.get('image'),
        author: {
          id: article.get('author').id,
          name: article.get('author').get('name'),
          avatar: article.get('author').get('avatar')
        },
        likes: article.get('likes') || 0,
        commentsCount: article.get('commentsCount') || 0,
        createdAt: article.get('createdAt'),
        updatedAt: article.get('updatedAt')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create new article/post
 */
Parse.Cloud.define("createArticle", async (request) => {
  const { articleData } = request.params;
  const user = request.user;

  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }

  try {
    const article = new Parse.Object("Article");

    article.set("title", articleData.title);
    article.set("content", articleData.content);
    article.set("excerpt", articleData.excerpt);
    article.set("category", articleData.category);
    article.set("tags", articleData.tags);
    article.set("image", articleData.image);
    article.set("author", user);
    article.set("isPublished", articleData.isPublished || false);
    article.set("likes", 0);
    article.set("commentsCount", 0);
    article.set("createdAt", new Date());

    await article.save(null, { useMasterKey: true });

    return {
      success: true,
      articleId: article.id,
      message: "تم نشر المقال بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Get single article with comments
 */
Parse.Cloud.define("getArticle", async (request) => {
  const { articleId } = request.params;

  try {
    const query = new Parse.Query("Article");
    query.include("author");
    const article = await query.get(articleId, { useMasterKey: true });

    // Get comments
    const commentsQuery = new Parse.Query("Comment");
    commentsQuery.equalTo("article", article);
    commentsQuery.include("author");
    commentsQuery.ascending("createdAt");
    const comments = await commentsQuery.find({ useMasterKey: true });

    return {
      article: {
        id: article.id,
        title: article.get('title'),
        content: article.get('content'),
        category: article.get('category'),
        tags: article.get('tags'),
        image: article.get('image'),
        author: {
          id: article.get('author').id,
          name: article.get('author').get('name'),
          avatar: article.get('author').get('avatar')
        },
        likes: article.get('likes') || 0,
        commentsCount: article.get('commentsCount') || 0,
        createdAt: article.get('createdAt'),
        updatedAt: article.get('updatedAt')
      },
      comments: comments.map(comment => ({
        id: comment.id,
        content: comment.get('content'),
        author: {
          id: comment.get('author').id,
          name: comment.get('author').get('name'),
          avatar: comment.get('author').get('avatar')
        },
        createdAt: comment.get('createdAt')
      }))
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// COMMENTS CLOUD FUNCTIONS
// ============================================================================

/**
 * Add comment to article
 */
Parse.Cloud.define("addComment", async (request) => {
  const { articleId, content } = request.params;
  const user = request.user;

  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }

  try {
    const article = new Parse.Object("Article");
    article.id = articleId;

    const comment = new Parse.Object("Comment");
    comment.set("content", content);
    comment.set("article", article);
    comment.set("author", user);
    comment.set("createdAt", new Date());

    await comment.save(null, { useMasterKey: true });

    // Update comments count
    const articleQuery = new Parse.Query("Article");
    const articleObj = await articleQuery.get(articleId, { useMasterKey: true });
    const currentCount = articleObj.get('commentsCount') || 0;
    articleObj.set('commentsCount', currentCount + 1);
    await articleObj.save(null, { useMasterKey: true });

    return {
      success: true,
      commentId: comment.id,
      message: "تم إضافة التعليق بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// STUDY GROUPS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get study groups
 */
Parse.Cloud.define("getStudyGroups", async (request) => {
  const { subject, level, page = 1, limit = 20 } = request.params;

  try {
    const query = new Parse.Query("StudyGroup");

    if (subject) {
      query.equalTo("subject", subject);
    }

    if (level) {
      query.equalTo("level", level);
    }

    query.equalTo("isActive", true);
    query.descending("createdAt");
    query.skip((page - 1) * limit);
    query.limit(limit);
    query.include("creator");

    const groups = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });

    return {
      groups: groups.map(group => ({
        id: group.id,
        name: group.get('name'),
        description: group.get('description'),
        subject: group.get('subject'),
        level: group.get('level'),
        maxMembers: group.get('maxMembers'),
        currentMembers: group.get('currentMembers') || 0,
        meetingTime: group.get('meetingTime'),
        location: group.get('location'),
        creator: {
          id: group.get('creator').id,
          name: group.get('creator').get('name')
        },
        createdAt: group.get('createdAt')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create study group
 */
Parse.Cloud.define("createStudyGroup", async (request) => {
  const { groupData } = request.params;
  const user = request.user;

  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }

  try {
    const group = new Parse.Object("StudyGroup");

    group.set("name", groupData.name);
    group.set("description", groupData.description);
    group.set("subject", groupData.subject);
    group.set("level", groupData.level);
    group.set("maxMembers", groupData.maxMembers);
    group.set("currentMembers", 1);
    group.set("meetingTime", groupData.meetingTime);
    group.set("location", groupData.location);
    group.set("creator", user);
    group.set("members", [user]);
    group.set("isActive", true);
    group.set("createdAt", new Date());

    await group.save(null, { useMasterKey: true });

    return {
      success: true,
      groupId: group.id,
      message: "تم إنشاء المجموعة الدراسية بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// EVENTS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get events
 */
Parse.Cloud.define("getEvents", async (request) => {
  const { type, upcoming = true, page = 1, limit = 20 } = request.params;

  try {
    const query = new Parse.Query("Event");

    if (type) {
      query.equalTo("type", type);
    }

    if (upcoming) {
      query.greaterThan("eventDate", new Date());
    }

    query.equalTo("isActive", true);
    query.ascending("eventDate");
    query.skip((page - 1) * limit);
    query.limit(limit);
    query.include("organizer");

    const events = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });

    return {
      events: events.map(event => ({
        id: event.id,
        title: event.get('title'),
        description: event.get('description'),
        type: event.get('type'),
        eventDate: event.get('eventDate'),
        eventTime: event.get('eventTime'),
        location: event.get('location'),
        maxAttendees: event.get('maxAttendees'),
        currentAttendees: event.get('currentAttendees') || 0,
        organizer: {
          id: event.get('organizer').id,
          name: event.get('organizer').get('name')
        },
        createdAt: event.get('createdAt')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// NOTIFICATIONS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get user notifications
 */
Parse.Cloud.define("getNotifications", async (request) => {
  const { unreadOnly = false, page = 1, limit = 20 } = request.params;
  const user = request.user;

  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }

  try {
    const query = new Parse.Query("Notification");
    query.equalTo("recipient", user);

    if (unreadOnly) {
      query.equalTo("isRead", false);
    }

    query.descending("createdAt");
    query.skip((page - 1) * limit);
    query.limit(limit);

    const notifications = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });

    return {
      notifications: notifications.map(notification => ({
        id: notification.id,
        type: notification.get('type'),
        title: notification.get('title'),
        message: notification.get('message'),
        isRead: notification.get('isRead'),
        relatedId: notification.get('relatedId'),
        createdAt: notification.get('createdAt')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Mark notification as read
 */
Parse.Cloud.define("markNotificationRead", async (request) => {
  const { notificationId } = request.params;
  const user = request.user;

  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }

  try {
    const query = new Parse.Query("Notification");
    query.equalTo("recipient", user);
    const notification = await query.get(notificationId, { useMasterKey: true });

    notification.set("isRead", true);
    await notification.save(null, { useMasterKey: true });

    return { success: true };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

// ============================================================================
// ARTICLES & POSTS CLOUD FUNCTIONS
// ============================================================================

/**
 * Get articles/posts with filtering and pagination
 */
Parse.Cloud.define("getArticles", async (request) => {
  const { category, authorId, searchTerm, sortBy = 'newest', page = 1, limit = 20 } = request.params;

  try {
    const query = new Parse.Query("Article");

    // Apply filters
    if (category && category !== 'جميع الفئات') {
      query.equalTo("category", category);
    }

    if (authorId) {
      const author = new Parse.User();
      author.id = authorId;
      query.equalTo("author", author);
    }

    if (searchTerm) {
      const titleQuery = new Parse.Query("Article");
      titleQuery.contains("title", searchTerm);

      const contentQuery = new Parse.Query("Article");
      contentQuery.contains("content", searchTerm);

      query = Parse.Query.or(titleQuery, contentQuery);
    }

    // Only show published articles
    query.equalTo("isPublished", true);

    // Sorting
    switch (sortBy) {
      case 'popular':
        query.descending("likes");
        break;
      case 'comments':
        query.descending("commentsCount");
        break;
      default:
        query.descending("createdAt");
    }

    // Pagination
    query.skip((page - 1) * limit);
    query.limit(limit);

    // Include author information
    query.include("author");

    const articles = await query.find({ useMasterKey: true });
    const count = await query.count({ useMasterKey: true });

    return {
      articles: articles.map(article => ({
        id: article.id,
        title: article.get('title'),
        content: article.get('content'),
        excerpt: article.get('excerpt'),
        category: article.get('category'),
        tags: article.get('tags'),
        image: article.get('image'),
        author: {
          id: article.get('author').id,
          name: article.get('author').get('name'),
          avatar: article.get('author').get('avatar')
        },
        likes: article.get('likes') || 0,
        commentsCount: article.get('commentsCount') || 0,
        createdAt: article.get('createdAt'),
        updatedAt: article.get('updatedAt')
      })),
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Create new article/post
 */
Parse.Cloud.define("createArticle", async (request) => {
  const { articleData } = request.params;
  const user = request.user;

  if (!user) {
    throw new Parse.Error(Parse.Error.SESSION_MISSING, "User must be logged in");
  }

  try {
    const article = new Parse.Object("Article");

    article.set("title", articleData.title);
    article.set("content", articleData.content);
    article.set("excerpt", articleData.excerpt);
    article.set("category", articleData.category);
    article.set("tags", articleData.tags);
    article.set("image", articleData.image);
    article.set("author", user);
    article.set("isPublished", articleData.isPublished || false);
    article.set("likes", 0);
    article.set("commentsCount", 0);
    article.set("createdAt", new Date());

    await article.save(null, { useMasterKey: true });

    return {
      success: true,
      articleId: article.id,
      message: "تم نشر المقال بنجاح"
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

/**
 * Get single article with comments
 */
Parse.Cloud.define("getArticle", async (request) => {
  const { articleId } = request.params;

  try {
    const query = new Parse.Query("Article");
    query.include("author");
    const article = await query.get(articleId, { useMasterKey: true });

    // Get comments
    const commentsQuery = new Parse.Query("Comment");
    commentsQuery.equalTo("article", article);
    commentsQuery.include("author");
    commentsQuery.ascending("createdAt");
    const comments = await commentsQuery.find({ useMasterKey: true });

    return {
      article: {
        id: article.id,
        title: article.get('title'),
        content: article.get('content'),
        category: article.get('category'),
        tags: article.get('tags'),
        image: article.get('image'),
        author: {
          id: article.get('author').id,
          name: article.get('author').get('name'),
          avatar: article.get('author').get('avatar')
        },
        likes: article.get('likes') || 0,
        commentsCount: article.get('commentsCount') || 0,
        createdAt: article.get('createdAt'),
        updatedAt: article.get('updatedAt')
      },
      comments: comments.map(comment => ({
        id: comment.id,
        content: comment.get('content'),
        author: {
          id: comment.get('author').id,
          name: comment.get('author').get('name'),
          avatar: comment.get('author').get('avatar')
        },
        createdAt: comment.get('createdAt')
      }))
    };
  } catch (error) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, error.message);
  }
});

module.exports = Parse.Cloud;
