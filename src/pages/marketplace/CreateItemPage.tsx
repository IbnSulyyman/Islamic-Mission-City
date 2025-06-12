import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Upload, 
  MapPin, 
  DollarSign, 
  Package, 
  FileText,
  Save,
  X
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'
import { marketplaceAPI } from '../../services/api'
import toast from 'react-hot-toast'

const categories = ['إلكترونيات', 'كتب ومراجع', 'رياضة ولياقة', 'أدوات منزلية', 'ملابس وأزياء', 'أخرى']

const CreateItemPage = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    isNegotiable: false,
    image: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('حجم الصورة يجب أن يكون أقل من 5 ميجابايت')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('يرجى اختيار ملف صورة صحيح')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان المنتج مطلوب'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف المنتج مطلوب'
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'السعر مطلوب ويجب أن يكون أكبر من صفر'
    }

    if (!formData.category) {
      newErrors.category = 'فئة المنتج مطلوبة'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'موقع المنتج مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('يرجى تصحيح الأخطاء في النموذج')
      return
    }

    try {
      setLoading(true)
      
      const itemData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        location: formData.location.trim(),
        isNegotiable: formData.isNegotiable,
        image: formData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
      }

      const result = await marketplaceAPI.createItem(itemData)
      
      if (result.success) {
        toast.success('تم إضافة المنتج بنجاح!')
        navigate(`/marketplace/item/${result.itemId}`)
      }
    } catch (error) {
      toast.error('فشل في إضافة المنتج. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-navy-500 mb-4 font-arabic">
            إضافة منتج جديد
          </h1>
          <p className="text-navy-500/70 font-arabic">
            أضف منتجك للبيع في سوق الطلاب
          </p>
        </motion.div>

        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center gap-2 text-sm text-navy-500/70 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link to="/" className="hover:text-emerald-500 font-arabic">الرئيسية</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-emerald-500 font-arabic">السوق</Link>
          <span>/</span>
          <span className="font-arabic">إضافة منتج</span>
        </motion.nav>

        {/* Form */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                صورة المنتج
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="معاينة المنتج"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-arabic mb-2">اضغط لرفع صورة المنتج</p>
                  <p className="text-sm text-gray-500 font-arabic">PNG, JPG, WEBP (حد أقصى 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                عنوان المنتج *
              </label>
              <div className="relative">
                <Package className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="مثال: لابتوب Dell XPS 13 مستعمل"
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 font-arabic">{errors.title}</p>
              )}
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                  الفئة *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 font-arabic">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                  السعر (جنيه) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 font-arabic">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                الموقع *
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="مثال: المبنى أ - الدور الثالث"
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 font-arabic">{errors.location}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                وصف المنتج *
              </label>
              <div className="relative">
                <FileText className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="اكتب وصفاً مفصلاً للمنتج، حالته، مواصفاته، وأي معلومات مهمة أخرى..."
                  rows={6}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 font-arabic">{errors.description}</p>
              )}
            </div>

            {/* Negotiable Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isNegotiable"
                id="isNegotiable"
                checked={formData.isNegotiable}
                onChange={handleInputChange}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="isNegotiable" className="text-navy-500 font-arabic">
                السعر قابل للتفاوض
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors font-arabic"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {loading ? 'جاري النشر...' : 'نشر المنتج'}
              </button>
              
              <Link
                to="/marketplace"
                className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors font-arabic"
              >
                <ArrowRight className="w-5 h-5" />
                إلغاء
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateItemPage
