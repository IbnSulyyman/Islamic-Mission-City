
import { Heart, MapPin, Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-navy-500 text-white">
      {/* Mashrabiya-style divider */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4 text-gold-500 font-arabic">
              عن مدينة البحوث
            </h3>
            <p className="text-gray-300 leading-relaxed font-arabic">
              مجتمع طلابي متنوع يجمع الطلاب من جميع أنحاء العالم في القاهرة، 
              حيث نتبادل الثقافات والخبرات ونبني صداقات تدوم مدى الحياة.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-gold-500 font-arabic">
              تواصل معنا
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span className="font-arabic">مدينة البحوث، القاهرة، مصر</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-gold-500" />
                <span className="font-english">info@islamicmissioncity.com</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-gold-500" />
                <span className="font-english">+20 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-gold-500 font-arabic">
              روابط سريعة
            </h3>
            <div className="space-y-2">
              <a href="#cultural-exchange" className="block text-gray-300 hover:text-gold-500 transition-colors font-arabic">
                التبادل الثقافي
              </a>
              <a href="#marketplace" className="block text-gray-300 hover:text-gold-500 transition-colors font-arabic">
                السوق الطلابي
              </a>
              <a href="#news" className="block text-gray-300 hover:text-gold-500 transition-colors font-arabic">
                الأخبار والإعلانات
              </a>
              <a href="#food" className="block text-gray-300 hover:text-gold-500 transition-colors font-arabic">
                طعام اليوم
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <span className="font-arabic">صُمم بـ</span>
            <Heart className="w-4 h-4 text-crimson-500" />
            <span className="font-arabic">من قِبل طالب نيجيري في مدينة البحوث</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Islamic Mission City. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
