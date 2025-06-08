import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { LogIn, Eye, EyeOff, User, Lock } from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'

// Validation schema
const loginSchema = z.object({
  username: z.string().min(1, 'اسم المستخدم مطلوب'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/feed'
    navigate(from, { replace: true })
    return null
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password)
      toast.success('مرحباً بك مرة أخرى!')
      
      // Redirect to intended page or feed
      const from = location.state?.from?.pathname || '/feed'
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'فشل في تسجيل الدخول')
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
            <LogIn className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-navy-500 font-arabic">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-sm text-navy-500/70 font-arabic">
            ادخل إلى حسابك للوصول إلى مجتمع مدينة البحوث
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
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                اسم المستخدم
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('username')}
                  type="text"
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                  placeholder="أدخل اسم المستخدم"
                  dir="ltr"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-crimson-500 font-arabic">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy-500 font-arabic mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-navy-500/40" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 pl-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
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
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-500 hover:text-emerald-600 font-arabic"
            >
              نسيت كلمة المرور؟
            </Link>
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
                  جاري تسجيل الدخول...
                </div>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-navy-500/70 font-arabic">
              ليس لديك حساب؟{' '}
              <Link
                to="/register"
                className="font-medium text-emerald-500 hover:text-emerald-600"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default LoginPage
