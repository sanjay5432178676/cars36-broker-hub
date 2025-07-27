import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Camera, MapPin, DollarSign, Car as CarIcon, Fuel, Settings, Calendar } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CarFormData {
  title: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  mileage: string;
  kmDriven: string;
  numOwners: string;
  location: string;
  city: string;
  state: string;
  registrationNumber: string;
  description: string;
  features: string[];
}

const SellCar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<CarFormData>({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    color: "",
    mileage: "",
    kmDriven: "",
    numOwners: "1",
    location: "",
    city: "",
    state: "",
    registrationNumber: "",
    description: "",
    features: []
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const brands = ["BMW", "Mercedes", "Audi", "Toyota", "Honda", "Hyundai", "Maruti Suzuki", "Mahindra", "Tata", "Volkswagen", "Ford", "Nissan", "Other"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
  const transmissions = ["Manual", "Automatic", "CVT"];
  const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Wagon"];
  const colors = ["White", "Black", "Silver", "Red", "Blue", "Gray", "Brown", "Green", "Other"];
  const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Telangana", "Andhra Pradesh"];
  const features = ["ABS", "Airbags", "AC", "Power Steering", "Power Windows", "Central Locking", "Alloy Wheels", "Sunroof", "Parking Sensors", "Reverse Camera", "Navigation System", "Bluetooth", "USB Port", "Keyless Entry"];

  const handleInputChange = (field: keyof CarFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // For demo purposes, we'll use placeholder URLs
      // In production, you would upload to Supabase Storage
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&${index}`
      );
      setImages(prev => [...prev, ...newImages].slice(0, 8)); // Max 8 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('cars')
        .insert({
          seller_id: user.id,
          title: formData.title,
          brand: formData.brand,
          model: formData.model,
          year: parseInt(formData.year),
          price: parseFloat(formData.price),
          mileage: formData.mileage,
          fuel_type: formData.fuelType,
          transmission: formData.transmission,
          body_type: formData.bodyType,
          color: formData.color,
          description: formData.description,
          location: formData.location,
          city: formData.city,
          state: formData.state,
          registration_number: formData.registrationNumber,
          km_driven: parseInt(formData.kmDriven),
          num_owners: parseInt(formData.numOwners),
          features: formData.features,
          images: images,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Car Listed Successfully!",
        description: "Your car has been listed on Car36 marketplace.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sell Your Car</h1>
            <p className="text-muted-foreground">
              List your car on Car36 and reach thousands of potential buyers
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Car Details</CardTitle>
              <CardDescription>
                Provide accurate information to attract serious buyers
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <CarIcon className="h-5 w-5 mr-2" />
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Car Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., BMW 3 Series 320d Sport Line"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Select onValueChange={(value) => handleInputChange("brand", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        placeholder="e.g., 3 Series"
                        value={formData.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        min="1990"
                        max="2024"
                        placeholder="2022"
                        value={formData.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="3500000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="kmDriven">KM Driven</Label>
                      <Input
                        id="kmDriven"
                        type="number"
                        placeholder="25000"
                        value={formData.kmDriven}
                        onChange={(e) => handleInputChange("kmDriven", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Technical Specifications
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select onValueChange={(value) => handleInputChange("fuelType", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmission</Label>
                      <Select onValueChange={(value) => handleInputChange("transmission", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          {transmissions.map(trans => (
                            <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bodyType">Body Type</Label>
                      <Select onValueChange={(value) => handleInputChange("bodyType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select body type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bodyTypes.map(body => (
                            <SelectItem key={body} value={body}>{body}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Select onValueChange={(value) => handleInputChange("color", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map(color => (
                            <SelectItem key={color} value={color}>{color}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage</Label>
                      <Input
                        id="mileage"
                        placeholder="15 kmpl"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange("mileage", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="numOwners">Number of Owners</Label>
                      <Select onValueChange={(value) => handleInputChange("numOwners", value)} defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Owner</SelectItem>
                          <SelectItem value="2">2nd Owner</SelectItem>
                          <SelectItem value="3">3rd Owner</SelectItem>
                          <SelectItem value="4">4+ Owners</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Location
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Area/Locality</Label>
                      <Input
                        id="location"
                        placeholder="Bandra West"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="MH 01 AB 1234"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {features.map(feature => (
                      <div
                        key={feature}
                        className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                          formData.features.includes(feature)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:bg-muted"
                        }`}
                        onClick={() => handleFeatureToggle(feature)}
                      >
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Car Images
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Car ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {images.length < 8 && (
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageUpload}
                        />
                        <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Upload up to 8 high-quality images of your car
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <Textarea
                    placeholder="Describe your car's condition, service history, and any additional details..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="automotive"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Listing Car..." : "List My Car"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellCar;