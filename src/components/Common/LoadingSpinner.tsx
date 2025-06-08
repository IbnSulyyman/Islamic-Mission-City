import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const LoadingSpinner = ({ size = 'md', text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige-500">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-emerald-500/20 border-t-emerald-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <p className="mt-4 text-navy-500/70 font-arabic text-center">
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner
