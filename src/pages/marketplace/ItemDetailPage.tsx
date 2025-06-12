import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Eye, 
  User, 
  Share2,
  Heart,
  Flag,
  Edit,
  Trash2
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'
import LoadingSpinner from '../../components/Common/LoadingSpinner'
import { marketplaceAPI } from '../../services/api'

interface MarketplaceItem {
  id: string
  title: string
  price: number
  description: string
  location: string
  category: string
  image: string
  seller: string
  sellerId: string
  sellerPhone: string
  postedAt: string
  views: number
  isNegotiable: boolean
  isAvailable: boolean
}

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthContext()
  const [item, setItem] = useState<MarketplaceItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        // Increment view count
        await marketplaceAPI.incrementViews(id)
        
        // Fetch item details (you'll need to implement this API call)
        // For now, using mock data
        const mockItem: MarketplaceItem = {
          id: id,
          title: 'لابتوب Dell XPS 13 مستعمل بحالة ممتازة',
          price: 15000,
          description: 'لابتوب Dell XPS 13 مستعمل لمدة سنة واحدة فقط، بحالة ممتازة جداً. مناسب للطلاب والمبرمجين. يأتي مع الشاحن الأصلي وحقيبة الحماية.\n\nالمواصفات:\n- معالج Intel Core i7 الجيل الحادي عشر\n- ذاكرة عشوائية 16 جيجابايت\n- قرص صلب SSD بسعة 512 جيجابايت\n- شاشة 13.3 بوصة Full HD\n- نظام التشغيل Windows 11\n\nالسعر قابل للتفاوض للجادين فقط.',
          location: 'المبنى أ - الدور الثالث',
          category: 'إلكترونيات',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
          seller: 'أحمد محمد',
          sellerId: 'user123',
          sellerPhone: '+201234567890',
          postedAt: 'منذ يومين',
          views: 45,
          isNegotiable: true,
          isAvailable: true
        }
        
        setItem(mockItem)
      } catch (err) {
        setError('فشل في تحميل تفاصيل المنتج')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  const handleContact = () => {
    if (!item) return
    const message = `السلام عليكم، أنا مهتم بـ ${item.title} المعروض بسعر ${item.price} جنيه.`
    const whatsappUrl = `https://wa.me/${item.sellerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShare = () => {
    if (!item) return
    const shareText = `${item.title}\nالسعر: ${item.price} جنيه\n\nمن موقع مدينة البحوث الإسلامية`
    const shareUrl = window.location.href
    
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
        url: shareUrl
      })
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Implement favorite functionality
  }

  const handleEdit = () => {
    navigate(`/marketplace/edit/${id}`)
  }

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      // Implement delete functionality
      navigate('/marketplace')
    }
  }

  if (loading) {
    return <LoadingSpinner text="جاري تحميل تفاصيل المنتج..." />
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-500">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-navy-500 mb-4 font-arabic">
            {error || 'المنتج غير موجود'}
          </h1>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors font-arabic"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للسوق
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = user?.id === item.sellerId

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center gap-2 text-sm text-navy-500/70 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="hover:text-emerald-500 font-arabic">الرئيسية</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-emerald-500 font-arabic">السوق</Link>
          <span>/</span>
          <span className="font-arabic">{item.category}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              
              {/* Status Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium font-arabic">
                  {item.category}
                </div>
                {item.isNegotiable && (
                  <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium font-arabic">
                    قابل للتفاوض
                  </div>
                )}
                {!item.isAvailable && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium font-arabic">
                    غير متوفر
                  </div>
                )}
              </div>

              {/* Views Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{item.views} مشاهدة</span>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-navy-500 mb-4 font-arabic">
                {item.title}
              </h1>
              <div className="text-4xl font-bold text-emerald-500 mb-4">
                {item.price} جنيه
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-navy-500/70">
                <User className="w-5 h-5" />
                <span className="font-arabic">{item.seller}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-500/70">
                <MapPin className="w-5 h-5" />
                <span className="font-arabic">{item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-500/70">
                <Clock className="w-5 h-5" />
                <span className="font-arabic">{item.postedAt}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-500/70">
                <Eye className="w-5 h-5" />
                <span>{item.views} مشاهدة</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-navy-500 mb-4 font-arabic">وصف المنتج</h3>
              <p className="text-navy-500/80 leading-relaxed font-arabic whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isOwner ? (
                <div className="flex gap-4">
                  <button
                    onClick={handleEdit}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors font-arabic"
                  >
                    <Edit className="w-5 h-5" />
                    تعديل المنتج
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors font-arabic"
                  >
                    <Trash2 className="w-5 h-5" />
                    حذف المنتج
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleContact}
                  disabled={!item.isAvailable}
                  className={`w-full py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors font-arabic text-lg font-medium ${
                    item.isAvailable
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className="w-6 h-6" />
                  {item.isAvailable ? 'تواصل مع البائع' : 'المنتج غير متوفر'}
                </button>
              )}

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-colors font-arabic flex items-center justify-center gap-2 ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'مضاف للمفضلة' : 'أضف للمفضلة'}
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors font-arabic flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  مشاركة
                </button>
                
                {!isOwner && (
                  <button className="px-4 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                    <Flag className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-navy-500 hover:text-emerald-500 transition-colors font-arabic"
          >
            <ArrowRight className="w-5 h-5" />
            العودة إلى السوق
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ItemDetailPage
