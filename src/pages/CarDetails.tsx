import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Share2, 
  Calendar, 
  Fuel, 
  Settings, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  CheckCircle,
  Car as CarIcon,
  Gauge,
  Palette
} from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock car data - in real app, fetch based on ID
  const car = {
    id: id || "1",
    name: "BMW 3 Series 320d Sport Line",
    year: 2022,
    price: 3500000,
    location: "Mumbai, Maharashtra",
    mileage: "15 kmpl",
    fuel: "Diesel",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "White",
    kmDriven: 25000,
    numOwners: 1,
    registrationNumber: "MH 01 AB 1234",
    description: "Excellent condition BMW 3 Series with full service history. This luxury sedan offers premium comfort and performance with all modern features.",
    features: ["ABS", "Airbags", "AC", "Power Steering", "Power Windows", "Central Locking", "Alloy Wheels", "Sunroof", "Parking Sensors", "Reverse Camera", "Navigation System", "Bluetooth"],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop"
    ],
    seller: {
      name: "Rahul Sharma",
      rating: 4.8,
      totalSales: 12,
      joinDate: "January 2022",
      phone: "+91 9876543210",
      email: "rahul.sharma@email.com"
    }
  };

  const formatPrice = (price: number) => {
    return `₹${(price / 100000).toFixed(0)} Lakh`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>
              Home
            </span>
            {" > "}
            <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/browse")}>
              Browse Cars
            </span>
            {" > "}
            <span className="text-foreground">{car.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={car.images[currentImageIndex]}
                        alt={car.name}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-background/80 hover:bg-background"
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-background/80 hover:bg-background"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {car.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${car.name} ${index + 1}`}
                          className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 ${
                            currentImageIndex === index ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Car Details */}
              <Card>
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">{car.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {car.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {car.year}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Fuel className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Fuel Type</p>
                      <p className="font-semibold">{car.fuel}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Settings className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Transmission</p>
                      <p className="font-semibold">{car.transmission}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Gauge className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">KM Driven</p>
                      <p className="font-semibold">{car.kmDriven.toLocaleString()}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Palette className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Color</p>
                      <p className="font-semibold">{car.color}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Price and Contact */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary mb-2">
                      {formatPrice(car.price)}
                    </p>
                    <Badge variant="secondary" className="mb-4">
                      {car.numOwners === 1 ? "First Owner" : `${car.numOwners} Owners`}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button variant="automotive" className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CarIcon className="h-4 w-4 mr-2" />
                      Schedule Test Drive
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Seller Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" alt={car.seller.name} />
                        <AvatarFallback>
                          {car.seller.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{car.seller.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ★ {car.seller.rating} • {car.seller.totalSales} cars sold
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Member since {car.seller.joinDate}</p>
                      <p>Response time: Usually within 1 hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;