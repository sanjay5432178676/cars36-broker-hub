import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCars />
    </div>
  );
};

export default Index;
