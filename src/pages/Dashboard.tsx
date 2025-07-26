import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, PlusCircle, Heart, ShoppingCart, Eye, Edit, Trash2, MapPin, Calendar, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  city: string;
  state: string;
  status: string;
  images: string[];
  created_at: string;
}

interface Order {
  id: string;
  amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  car: {
    title: string;
    brand: string;
    model: string;
    images: string[];
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState<Car[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  if (!user) {
    navigate("/auth");
    return null;
  }

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's cars
      const { data: carsData } = await supabase
        .from('cars')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch user's orders (as buyer)
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          car:cars(title, brand, model, images)
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch favorites
      const { data: favoritesData } = await supabase
        .from('favorites')
        .select(`
          car:cars(*)
        `)
        .eq('user_id', user.id);

      setMyCars(carsData || []);
      setMyOrders(ordersData || []);
      setFavorites(favoritesData?.map(f => f.car).filter(Boolean) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'sold': return 'bg-blue-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your car listings, orders, and favorites
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Listed Cars</p>
                  <p className="text-2xl font-bold">{myCars.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <p className="text-2xl font-bold">{myOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold">{favorites.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">
                    {formatPrice(myCars.reduce((sum, car) => sum + car.price, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-cars" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="my-cars">My Cars</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          {/* My Cars Tab */}
          <TabsContent value="my-cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Car Listings</h2>
              <Button 
                variant="automotive" 
                onClick={() => navigate("/sell")}
                className="flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Car
              </Button>
            </div>
            
            {myCars.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No cars listed yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start selling by listing your first car
                  </p>
                  <Button variant="automotive" onClick={() => navigate("/sell")}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    List Your Car
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={car.images?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"}
                        alt={car.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${getStatusColor(car.status)} text-white`}
                      >
                        {car.status}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{car.title}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {formatPrice(car.price)}
                      </p>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {car.city}, {car.state}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        Listed on {formatDate(car.created_at)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-xl font-semibold">Purchase Orders</h2>
            
            {myOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse cars and make your first purchase
                  </p>
                  <Button variant="automotive" onClick={() => navigate("/browse")}>
                    Browse Cars
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={order.car.images?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop"}
                            alt={order.car.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{order.car.title}</h3>
                            <p className="text-muted-foreground">{order.car.brand} {order.car.model}</p>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {formatDate(order.created_at)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold">{formatPrice(order.amount)}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={order.status === 'confirmed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                            <Badge variant={order.payment_status === 'paid' ? 'default' : 'destructive'}>
                              {order.payment_status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-xl font-semibold">Favorite Cars</h2>
            
            {favorites.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Save cars you're interested in to your favorites
                  </p>
                  <Button variant="automotive" onClick={() => navigate("/browse")}>
                    Browse Cars
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((car) => (
                  <Card key={car.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={car.images?.[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"}
                        alt={car.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{car.title}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {formatPrice(car.price)}
                      </p>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {car.city}, {car.state}
                      </div>
                      
                      <Button variant="automotive" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                </div>
                
                <Button variant="automotive">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;