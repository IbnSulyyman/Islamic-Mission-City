import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Languages,
  Award,
  Star
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useStudentProfile, useFileUpload } from '../../hooks/useBackend'
import LoadingSpinner from '../../components/Common/LoadingSpinner'

// Validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  bio: z.string().max(500, 'الوصف يجب أن يكون أقل من 500 حرف'),
  location: z.string().min(1, 'الموقع مطلوب'),
  nationality: z.string().min(1, 'الجنسية مطلوبة'),
  languages: z.array(z.string()).min(1, 'يجب إضافة لغة واحدة على الأقل'),
  skills: z.array(z.string()).min(1, 'يجب إضافة مهارة واحدة على الأقل'),
  whatsappNumber: z.string().min(10, 'رقم الواتساب غير صحيح')
})

type ProfileFormData = z.infer<typeof profileSchema>

const ProfilePage = () => {
  const { user } = useAuthContext()
  const { saveProfile, saving } = useStudentProfile()
  const { uploadImage, uploading } = useFileUpload()
  const [isEditing, setIsEditing] = useState(false)
  const [newLanguage, setNewLanguage] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      bio: '',
      location: '',
      nationality: '',
      languages: ['العربية'],
      skills: [],
      whatsappNumber: user?.whatsappNumber || ''
    }
  })

  const watchedLanguages = watch('languages')
  const watchedSkills = watch('skills')

  useEffect(() => {
    // Load existing profile data if available
    // This would typically come from the backend
    if (user) {
      reset({
        name: user.name,
        bio: '',
        location: '',
        nationality: '',
        languages: ['العربية'],
        skills: [],
        whatsappNumber: user.whatsappNumber || ''
      })
      setProfileImage(user.avatar || null)
    }
  }, [user, reset])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage(file)
      setProfileImage(imageUrl)
      toast.success('تم رفع الصورة بنجاح')
    } catch (error) {
      toast.error('فشل في رفع الصورة')
    }
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !watchedLanguages.includes(newLanguage.trim())) {
      setValue('languages', [...watchedLanguages, newLanguage.trim()])
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    setValue('languages', watchedLanguages.filter(l => l !== language))
  }

  const addSkill = () => {
    if (newSkill.trim() && !watchedSkills.includes(newSkill.trim())) {
      setValue('skills', [...watchedSkills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setValue('skills', watchedSkills.filter(s => s !== skill))
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await saveProfile({
        ...data,
        avatar: profileImage || '',
        flag: '🇪🇬', // Default flag, could be dynamic based on nationality
        rating: 5.0
      })
      
      toast.success('تم حفظ الملف الشخصي بنجاح')
      setIsEditing(false)
    } catch (error) {
      toast.error('فشل في حفظ الملف الشخصي')
    }
  }

  if (!user) {
    return <LoadingSpinner text="جاري تحميل الملف الشخصي..." />
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-gold-500 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg">
                      <Camera className="w-4 h-4 text-navy-500" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>

                {/* User Info */}
                <div className="text-white">
                  <h1 className="text-2xl font-bold font-arabic">{user.name}</h1>
                  <p className="text-white/80 font-arabic">@{user.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-current text-gold-300" />
                    <span className="text-sm">5.0</span>
                    <span className="text-white/60 text-sm font-arabic">(عضو جديد)</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-arabic"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    إلغاء
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    تعديل الملف الشخصي
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/40 w-5 h-5" />
                    <input
                      {...register('name')}
                      disabled={!isEditing}
                      className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 font-arabic text-right"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-crimson-500 font-arabic">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/40 w-5 h-5" />
                    <input
                      value={user.email}
                      disabled
                      className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg bg-gray-50 text-navy-500/70 text-right"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                    رقم الواتساب
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/40 w-5 h-5" />
                    <input
                      {...register('whatsappNumber')}
                      disabled={!isEditing}
                      className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 text-right"
                      dir="ltr"
                    />
                  </div>
                  {errors.whatsappNumber && (
                    <p className="mt-1 text-sm text-crimson-500 font-arabic">
                      {errors.whatsappNumber.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                    الموقع
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/40 w-5 h-5" />
                    <input
                      {...register('location')}
                      disabled={!isEditing}
                      placeholder="المبنى أ - الدور الثالث"
                      className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 font-arabic text-right"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-crimson-500 font-arabic">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                  نبذة عني
                </label>
                <textarea
                  {...register('bio')}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="اكتب نبذة مختصرة عن نفسك..."
                  className="w-full px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 font-arabic text-right resize-none"
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-crimson-500 font-arabic">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                  اللغات
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {watchedLanguages.map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-arabic"
                    >
                      <Languages className="w-3 h-3" />
                      {language}
                      {isEditing && language !== 'العربية' && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(language)}
                          className="text-emerald-500 hover:text-emerald-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="أضف لغة جديدة"
                      className="flex-1 px-3 py-2 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                    />
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-arabic"
                    >
                      إضافة
                    </button>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                  المهارات
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {watchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-arabic"
                    >
                      <Award className="w-3 h-3" />
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-gold-500 hover:text-gold-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="أضف مهارة جديدة"
                      className="flex-1 px-3 py-2 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 font-arabic"
                    >
                      إضافة
                    </button>
                  </div>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-arabic disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        حفظ التغييرات
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
