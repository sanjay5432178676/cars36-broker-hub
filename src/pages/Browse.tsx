import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, Heart, Fuel, Calendar, Settings, MapPin } from "lucide-react";
import Header from "@/components/Header";

// Extended sample data for browse page
const allCars = [
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
    brand: "BMW"
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
    brand: "Audi"
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
    brand: "Mercedes"
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
    brand: "Toyota"
  },
  {
    id: 5,
    name: "Honda Accord",
    year: 2021,
    price: "₹28,00,000",
    location: "Pune, Maharashtra",
    mileage: "16 kmpl",
    fuel: "Petrol",
    transmission: "CVT",
    image: "https://images.unsplash.com/photo-1606152421802-db97b24c9047?w=400&h=300&fit=crop",
    brand: "Honda"
  },
  {
    id: 6,
    name: "Volkswagen Passat",
    year: 2022,
    price: "₹31,00,000",
    location: "Hyderabad, Telangana",
    mileage: "18 kmpl",
    fuel: "Diesel",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop",
    brand: "Volkswagen"
  }
];

const Browse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBrand, setFilterBrand] = useState("all");
  
  const brands = ["BMW", "Audi", "Mercedes", "Toyota", "Honda", "Volkswagen"];

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search and Filter Section */}
      <section className="bg-gradient-card py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
              Browse Cars
            </h1>
            
            {/* Search Bar */}
            <div className="bg-background rounded-2xl p-6 shadow-card-custom mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by brand, model, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Select value={filterBrand} onValueChange={setFilterBrand}>
                  <SelectTrigger className="lg:w-48 h-12">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="automotive" size="lg" className="lg:px-8">
                  <Filter className="h-5 w-5 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>

            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {allCars.length} cars found
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCars.map((car) => (
              <Card key={car.id} className="group overflow-hidden shadow-card-custom hover:shadow-glow transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {car.name}
                    </h3>
                    <p className="text-xl font-bold text-primary mb-2">
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

                  <div className="flex gap-2">
                <Button variant="automotive" className="flex-1" onClick={() => navigate(`/car/${car.id}`)}>
                  View Details
                </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8" onClick={() => console.log('Loading more cars...')}>
              Load More Cars
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Browse;