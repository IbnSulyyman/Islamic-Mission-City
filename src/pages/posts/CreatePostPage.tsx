import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  PenTool, 
  Image, 
  Tag, 
  Send, 
  ArrowRight,
  Upload,
  X
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'

// Validation schema
const postSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب').max(200, 'العنوان طويل جداً'),
  content: z.string().min(10, 'المحتوى يجب أن يكون 10 أحرف على الأقل'),
  category: z.string().min(1, 'الفئة مطلوبة'),
  tags: z.string().optional()
})

type PostFormData = z.infer<typeof postSchema>

const CreatePostPage = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'تعليم', label: 'تعليم', icon: '📚' },
    { value: 'فعاليات', label: 'فعاليات', icon: '🎉' },
    { value: 'أسئلة', label: 'أسئلة', icon: '❓' },
    { value: 'تجارب', label: 'تجارب', icon: '💡' },
    { value: 'أخبار', label: 'أخبار', icon: '📰' },
    { value: 'عام', label: 'عام', icon: '💬' }
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema)
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('حجم الصورة كبير جداً (الحد الأقصى 5 ميجابايت)')
        return
      }
      
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true)
    
    try {
      // Here you would typically upload the image and create the post
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('تم نشر المنشور بنجاح!')
      navigate('/feed')
    } catch (error) {
      toast.error('حدث خطأ أثناء نشر المنشور')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowRight className="w-5 h-5 text-navy-500" />
            </button>
            <h1 className="text-3xl font-bold text-navy-500 font-arabic">
              إنشاء منشور جديد
            </h1>
          </div>
          <p className="text-navy-500/70 font-arabic">
            شارك أفكارك وتجاربك مع مجتمع الطلاب
          </p>
        </motion.div>

        {/* Create Post Form */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Author Info */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=00695C&color=fff&size=48`}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-navy-500 font-arabic">{user?.name}</h3>
                <p className="text-sm text-navy-500/60 font-arabic">ينشر في المجتمع</p>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-3 font-arabic">
                <Tag className="w-4 h-4 inline ml-2" />
                فئة المنشور
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={category.value}
                      {...register('category')}
                      className="sr-only peer"
                    />
                    <div className="p-4 border-2 border-gray-200 rounded-lg text-center transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-emerald-300">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-arabic text-navy-500">{category.label}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 font-arabic">{errors.category.message}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                <PenTool className="w-4 h-4 inline ml-2" />
                عنوان المنشور
              </label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                placeholder="اكتب عنواناً جذاباً لمنشورك..."
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 font-arabic">{errors.title.message}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                محتوى المنشور
              </label>
              <textarea
                {...register('content')}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right resize-none"
                placeholder="شارك أفكارك وتجاربك مع المجتمع..."
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-600 font-arabic">{errors.content.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                <Image className="w-4 h-4 inline ml-2" />
                إضافة صورة (اختياري)
              </label>
              
              {!imagePreview ? (
                <label className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-arabic mb-2">اضغط لاختيار صورة</p>
                    <p className="text-sm text-gray-500 font-arabic">PNG, JPG, GIF حتى 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                الكلمات المفتاحية (اختياري)
              </label>
              <input
                type="text"
                {...register('tags')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                placeholder="مثال: دراسة، تقنية، برمجة (افصل بفاصلة)"
              />
              <p className="mt-1 text-sm text-gray-500 font-arabic">
                استخدم الفاصلة للفصل بين الكلمات المفتاحية
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-arabic"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white px-6 py-3 rounded-lg transition-colors font-arabic flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري النشر...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    نشر المنشور
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CreatePostPage
