import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { KeyRound, Mail, ArrowRight } from 'lucide-react'
import Parse from 'parse'

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح')
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await Parse.User.requestPasswordReset(data.email)
      setIsSubmitted(true)
      toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني')
    } catch (error) {
      toast.error('فشل في إرسال رابط إعادة التعيين. تأكد من صحة البريد الإلكتروني')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-500 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mx-auto h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Mail className="h-10 w-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-navy-500 font-arabic mb-4">
            تم إرسال الرابط
          </h2>
          
          <p className="text-navy-500/70 font-arabic mb-8 leading-relaxed">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. 
            يرجى التحقق من صندوق الوارد وصندوق الرسائل غير المرغوب فيها.
          </p>
          
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 font-arabic"
          >
            <ArrowRight className="w-4 h-4" />
            العودة إلى تسجيل الدخول
          </Link>
        </motion.div>
      </div>
    )
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
            <KeyRound className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-navy-500 font-arabic">
            نسيت كلمة المرور؟
          </h2>
          <p className="mt-2 text-sm text-navy-500/70 font-arabic">
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
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
                className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gold-500/20 placeholder-navy-500/40 text-navy-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
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
                  جاري الإرسال...
                </div>
              ) : (
                'إرسال رابط إعادة التعيين'
              )}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-600 font-arabic"
            >
              <ArrowRight className="w-4 h-4" />
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage
