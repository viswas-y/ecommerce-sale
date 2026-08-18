export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  specifications: Record<string, string>;
  tags: string[];
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  productCount?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  title?: string;
  approved: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  paymentMethod: string;
  items: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: 'Standard' | 'Express';
  shippingCost: number;
  discount: number;
  tax: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  avatar?: string;
  addresses?: Array<{
    id: string;
    label: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readingTime: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  expiryDate?: string;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
}
