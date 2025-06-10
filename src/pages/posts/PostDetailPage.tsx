import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock,
  Eye,
  Tag,
  Send,
  MoreVertical
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'

// Mock data - replace with actual API call
const mockPost = {
  id: '1',
  title: 'تجربتي في تعلم البرمجة كطالب دولي',
  content: `السلام عليكم ورحمة الله وبركاته

أردت أن أشارككم تجربتي في تعلم البرمجة كطالب دولي في ماليزيا. بدأت رحلتي منذ سنتين تقريباً، وكانت مليئة بالتحديات والإنجازات.

## التحديات التي واجهتها:

1. **اللغة**: كان التعامل مع المصطلحات التقنية باللغة الإنجليزية تحدياً في البداية
2. **الوقت**: موازنة الوقت بين الدراسة الأكاديمية وتعلم البرمجة
3. **الموارد**: العثور على موارد تعليمية مناسبة ومجانية

## الحلول التي اتبعتها:

- **الممارسة اليومية**: خصصت ساعة يومياً على الأقل للبرمجة
- **المشاريع العملية**: بدأت بمشاريع صغيرة وتدرجت للأكبر
- **المجتمع**: انضممت لمجتمعات البرمجة المحلية والعالمية

## النصائح للمبتدئين:

1. ابدأ بلغة برمجة واحدة وأتقنها
2. لا تخف من الأخطاء - هي جزء من التعلم
3. ابني مشاريع حقيقية لتطبيق ما تعلمته
4. شارك في المجتمعات والفعاليات التقنية

أتمنى أن تكون تجربتي مفيدة لكم. إذا كان لديكم أي أسئلة، لا تترددوا في السؤال!`,
  excerpt: 'تجربة شخصية في تعلم البرمجة كطالب دولي مع التحديات والحلول والنصائح للمبتدئين...',
  author: {
    id: '1',
    name: 'أحمد محمد',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    nationality: '🇪🇬',
    title: 'طالب هندسة حاسوب'
  },
  category: 'تعليم',
  tags: ['برمجة', 'تعليم', 'تجربة شخصية', 'نصائح'],
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
  createdAt: '2024-01-15T10:30:00Z',
  likes: 45,
  comments: 12,
  shares: 8,
  views: 234,
  isLiked: false
}

const mockComments = [
  {
    id: '1',
    author: {
      name: 'فاطمة أحمد',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      nationality: '🇸🇦'
    },
    content: 'تجربة رائعة! شكراً لك على المشاركة. أنا أيضاً أتعلم البرمجة وواجهت نفس التحديات.',
    createdAt: '2024-01-15T11:00:00Z',
    likes: 5
  },
  {
    id: '2',
    author: {
      name: 'محمد علي',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      nationality: '🇯🇴'
    },
    content: 'نصائح قيمة جداً. هل يمكنك أن تنصحني بأفضل المصادر لتعلم JavaScript؟',
    createdAt: '2024-01-15T12:15:00Z',
    likes: 3
  }
]

const PostDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [post, setPost] = useState(mockPost)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You would show a toast here
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: {
        name: user?.name || 'مستخدم',
        avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=00695C&color=fff&size=150`,
        nationality: '🇲🇾' // Default or from user profile
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0
    }

    setComments(prev => [...prev, comment])
    setNewComment('')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-navy-500 hover:text-emerald-500 transition-colors"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ArrowRight className="w-5 h-5" />
          <span className="font-arabic">العودة</span>
        </motion.button>

        {/* Post Content */}
        <motion.article
          className="bg-white rounded-lg shadow-sm overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Post Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy-500 font-arabic">{post.author.name}</h3>
                    <span className="text-lg">{post.author.nationality}</span>
                  </div>
                  <p className="text-sm text-navy-500/60 font-arabic">{post.author.title}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-navy-500/60" />
              </button>
            </div>

            {/* Post Meta */}
            <div className="flex items-center gap-4 text-sm text-navy-500/60">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="font-arabic">{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views} مشاهدة</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span className="font-arabic">{post.category}</span>
              </div>
            </div>
          </div>

          {/* Post Title */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-navy-500 mb-6 font-arabic leading-relaxed">
              {post.title}
            </h1>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none font-arabic text-navy-500 leading-relaxed">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-bold text-navy-500 mt-6 mb-3 font-arabic">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="mb-2 font-arabic">
                      {paragraph.replace('- ', '')}
                    </li>
                  )
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <li key={index} className="mb-2 font-arabic list-decimal">
                      {paragraph.replace(/^\d+\.\s*/, '')}
                    </li>
                  )
                }
                return paragraph.trim() ? (
                  <p key={index} className="mb-4 font-arabic">
                    {paragraph}
                  </p>
                ) : null
              })}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-arabic"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-colors ${
                    isLiked 
                      ? 'text-crimson-500' 
                      : 'text-navy-500/70 hover:text-crimson-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{likesCount}</span>
                </button>
                
                <div className="flex items-center gap-2 text-navy-500/70">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{comments.length}</span>
                </div>
                
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-navy-500/70 hover:text-gold-500 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Comments Section */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-navy-500 mb-6 font-arabic">
            التعليقات ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex gap-4">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=00695C&color=fff&size=48`}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors font-arabic flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-navy-500 font-arabic">{comment.author.name}</h4>
                      <span className="text-lg">{comment.author.nationality}</span>
                      <span className="text-sm text-navy-500/60 font-arabic">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-navy-500 font-arabic leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-navy-500/60 hover:text-crimson-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                    <button className="text-sm text-navy-500/60 hover:text-emerald-500 transition-colors font-arabic">
                      رد
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PostDetailPage
