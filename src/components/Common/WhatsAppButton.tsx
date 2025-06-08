import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, Mail } from 'lucide-react'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      id: 'whatsapp',
      label: 'واتساب',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.open('https://wa.me/201234567890?text=السلام عليكم، أحتاج مساعدة في موقع مدينة البحوث', '_blank')
    },
    {
      id: 'phone',
      label: 'اتصال',
      icon: Phone,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => window.open('tel:+201234567890', '_self')
    },
    {
      id: 'email',
      label: 'إيميل',
      icon: Mail,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => window.open('mailto:support@islamicmissioncity.com?subject=استفسار من موقع مدينة البحوث', '_self')
    }
  ]

  return (
    <>
      {/* Main WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Floating Action Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-16 left-0 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {contactOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={option.action}
                  className={`w-12 h-12 ${option.color} text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 group relative`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <option.icon className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-navy-500 text-white px-3 py-1 rounded-lg text-sm font-arabic whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {option.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-full">
                      <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-navy-500"></div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pulsing Animation */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-6 left-6 w-14 h-14 bg-green-500/30 rounded-full z-40"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Help Text */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-20 left-6 bg-white shadow-lg rounded-lg p-3 max-w-xs z-40"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 3, duration: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-500 font-arabic mb-1">
                  هل تحتاج مساعدة؟
                </p>
                <p className="text-xs text-navy-500/70 font-arabic">
                  تواصل معنا في أي وقت
                </p>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-400 hover:text-gray-600 ml-auto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-2 left-6">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppButton
