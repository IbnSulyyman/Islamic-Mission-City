import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  TrendingUp,
  BookOpen,
  Users,
  Calendar
} from 'lucide-react'
import { useAuthContext } from '../contexts/AuthContext'
import { formatTimeAgo } from '../services/api'

// Mock data for the feed
const mockPosts = [
  {
    id: '1',
    type: 'article',
    title: 'تجربتي في تعلم اللغة العربية كطالب إندونيسي',
    excerpt: 'أشارككم رحلتي في تعلم اللغة العربية والتحديات التي واجهتها والنصائح التي ساعدتني...',
    content: 'محتوى المقال الكامل...',
    author: {
      id: '1',
      name: 'أحمد سوريا',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      nationality: '🇮🇩'
    },
    category: 'تعليم',
    tags: ['اللغة العربية', 'تعلم', 'تجربة شخصية'],
    likes: 24,
    comments: 8,
    shares: 3,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop'
  },
  {
    id: '2',
    type: 'announcement',
    title: 'فعالية ثقافية: ليلة التراث الآسيوي',
    excerpt: 'ندعوكم لحضور أمسية ثقافية مميزة نتعرف فيها على تراث وثقافات دول آسيا...',
    author: {
      id: '2',
      name: 'إدارة الأنشطة',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      nationality: '🏛️'
    },
    category: 'فعاليات',
    tags: ['فعالية', 'ثقافة', 'تراث'],
    likes: 45,
    comments: 12,
    shares: 8,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=300&fit=crop'
  },
  {
    id: '3',
    type: 'question',
    title: 'هل يمكن أن تساعدوني في فهم النحو العربي؟',
    excerpt: 'أواجه صعوبة في فهم قواعد النحو العربي، خاصة في موضوع الإعراب. هل لديكم نصائح أو مصادر مفيدة؟',
    author: {
      id: '3',
      name: 'فاطمة رحمن',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      nationality: '🇧🇩'
    },
    category: 'أسئلة',
    tags: ['نحو', 'قواعد', 'مساعدة'],
    likes: 12,
    comments: 15,
    shares: 2,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '4',
    type: 'experience',
    title: 'كيف تكيفت مع الحياة في القاهرة',
    excerpt: 'بعد سنة من العيش في القاهرة، أشارككم تجربتي والدروس التي تعلمتها...',
    author: {
      id: '4',
      name: 'عمر عبدالله',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      nationality: '🇳🇬'
    },
    category: 'تجارب',
    tags: ['القاهرة', 'تكيف', 'حياة'],
    likes: 31,
    comments: 9,
    shares: 5,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=300&fit=crop'
  }
]

const FeedPage = () => {
  const { user } = useAuthContext()
  const [selectedCategory, setSelectedCategory] = useState('الكل')

  const categories = ['الكل', 'تعليم', 'فعاليات', 'أسئلة', 'تجارب', 'أخبار']

  const filteredPosts = selectedCategory === 'الكل' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory)

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log('Liked post:', postId)
  }

  const handleShare = (post: any) => {
    const shareText = `${post.title}\n\nمن موقع مدينة البحوث الإسلامية`
    const shareUrl = `${window.location.origin}/post/${post.id}`
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    }
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-navy-500 mb-4 font-arabic">
            تدفق المجتمع
          </h1>
          <p className="text-navy-500/70 font-arabic">
            تابع آخر المنشورات والمقالات من زملائك الطلاب
          </p>
        </motion.div>

        {/* Create Post Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/create-post"
            className="block w-full bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gold-500/20"
          >
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=00695C&color=fff&size=48`}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-full px-4 py-3 text-navy-500/60 font-arabic text-right">
                  ما الذي تريد مشاركته مع المجتمع؟
                </div>
              </div>
              <div className="bg-emerald-500 text-white p-3 rounded-full">
                <Plus className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-arabic transition-colors ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-navy-500 hover:bg-emerald-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Post Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-navy-500 font-arabic">{post.author.name}</h3>
                      <span className="text-lg">{post.author.nationality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-navy-500/70">
                      <Clock className="w-4 h-4" />
                      <span className="font-arabic">{formatTimeAgo(post.createdAt)}</span>
                      <span className="text-gold-500">•</span>
                      <span className="font-arabic">{post.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <Link to={`/post/${post.id}`} className="block group">
                  <h2 className="text-xl font-bold text-navy-500 mb-3 font-arabic group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-navy-500/80 leading-relaxed font-arabic mb-4">
                    {post.excerpt}
                  </p>
                </Link>

                {/* Post Image */}
                {post.image && (
                  <Link to={`/post/${post.id}`} className="block mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg hover:opacity-95 transition-opacity"
                    />
                  </Link>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gold-50 text-gold-600 text-xs rounded-full font-arabic"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-navy-500/70 hover:text-crimson-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    
                    <Link
                      to={`/post/${post.id}#comments`}
                      className="flex items-center gap-2 text-navy-500/70 hover:text-emerald-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </Link>
                    
                    <button
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-2 text-navy-500/70 hover:text-gold-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>

                  <Link
                    to={`/post/${post.id}`}
                    className="text-emerald-500 hover:text-emerald-600 text-sm font-arabic"
                  >
                    قراءة المزيد
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-arabic transition-colors">
            تحميل المزيد من المنشورات
          </button>
        </motion.div>

        {/* Sidebar Suggestions */}
        <motion.div
          className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden xl:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-white rounded-lg p-4 shadow-lg w-64">
            <h3 className="font-bold text-navy-500 mb-4 font-arabic">اقتراحات</h3>
            
            <div className="space-y-3">
              <Link
                to="/study-groups"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span className="font-arabic text-sm">انضم لمجموعة دراسية</span>
              </Link>
              
              <Link
                to="/events"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gold-50 transition-colors"
              >
                <Calendar className="w-5 h-5 text-gold-500" />
                <span className="font-arabic text-sm">تصفح الفعاليات</span>
              </Link>
              
              <Link
                to="/students"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-navy-50 transition-colors"
              >
                <Users className="w-5 h-5 text-navy-500" />
                <span className="font-arabic text-sm">تعرف على طلاب جدد</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FeedPage
