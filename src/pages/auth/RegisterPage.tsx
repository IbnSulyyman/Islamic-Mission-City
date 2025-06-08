import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { UserPlus, Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  username: z.string().min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  whatsappNumber: z.string().min(10, 'رقم الواتساب غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/feed', { replace: true })
    return null
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        whatsappNumber: data.whatsappNumber
      })
      
      toast.success('تم إنشاء الحساب بنجاح! مرحباً بك في مجتمع مدينة البحوث')
      navigate('/feed', { replace: true })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'فشل في إنشاء الحساب')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-500 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            className="mx-auto h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <UserPlus className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-navy-500 font-arabic">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-sm text-navy-500/70 font-arabic">
            انضم إلى مجتمع طلاب مدينة البحوث الإسلامية
          </p>
        </div>

        {/* Form */}
        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                الاسم الكامل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('name')}
                  type="text"
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('username')}
                  type="text"
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right"
                  placeholder="اختر اسم مستخدم"
                  dir="ltr"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right"
                  placeholder="أدخل بريدك الإلكتروني"
                  dir="ltr"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                رقم الواتساب
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('whatsappNumber')}
                  type="tel"
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right"
                  placeholder="+201234567890"
                  dir="ltr"
                />
              </div>
              {errors.whatsappNumber && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.whatsappNumber.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 pl-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right"
                  placeholder="أدخل كلمة المرور"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-navy-500/40 hover:text-navy-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-navy-500/40 hover:text-navy-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 pl-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-right"
                  placeholder="أعد إدخال كلمة المرور"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-navy-500/40 hover:text-navy-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-navy-500/40 hover:text-navy-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-arabic"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  جاري إنشاء الحساب...
                </div>
              ) : (
                'إنشاء الحساب'
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-navy-500/70 font-arabic">
              لديك حساب بالفعل؟{' '}
              <Link
                to="/login"
                className="font-medium text-emerald-500 hover:text-emerald-600"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default RegisterPage
