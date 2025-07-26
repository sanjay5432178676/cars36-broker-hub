import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Fuel, Calendar, Settings, MapPin } from "lucide-react";

// Sample car data
const featuredCars = [
  {
    id: 1,
    name: "BMW 3 Series",
    year: 2022,
    price: "₹35,00,000",
    location: "Mumbai, Maharashtra",
    mileage: "15 kmpl",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    name: "Audi A4",
    year: 2021,
    price: "₹42,00,000",
    location: "Delhi, NCR",
    mileage: "17 kmpl",
    fuel: "Diesel",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 3,
    name: "Mercedes C-Class",
    year: 2023,
    price: "₹48,00,000",
    location: "Bangalore, Karnataka",
    mileage: "14 kmpl",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    featured: true
  },
  {
    id: 4,
    name: "Toyota Camry",
    year: 2022,
    price: "₹32,00,000",
    location: "Chennai, Tamil Nadu",
    mileage: "19 kmpl",
    fuel: "Hybrid",
    transmission: "CVT",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    featured: true
  }
];

const FeaturedCars = () => {
  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Cars
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles from trusted dealers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredCars.map((car) => (
            <Card key={car.id} className="group overflow-hidden shadow-card-custom hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  {car.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {car.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {car.price}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {car.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {car.year}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Fuel className="h-4 w-4 mr-2" />
                    {car.fuel}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Settings className="h-4 w-4 mr-2" />
                    {car.transmission}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Fuel className="h-4 w-4 mr-2" />
                    {car.mileage}
                  </div>
                </div>

                <Button variant="automotive" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Cars
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;