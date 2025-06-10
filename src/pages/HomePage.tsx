import HeroSection from '../components/Hero/HeroSection'
import CulturalExchange from '../components/CulturalExchange/CulturalExchange'
import Marketplace from '../components/Marketplace/Marketplace'
import NewsSection from '../components/News/NewsSection'
import FoodSection from '../components/Food/FoodSection'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-beige-500">
      <div className="pt-16">
        <HeroSection />
        <CulturalExchange />
        <Marketplace />
        <NewsSection />
        <FoodSection />
      </div>
    </div>
  )
}

export default HomePage
