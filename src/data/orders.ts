import { Customer, Order } from "../types";

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    ordersCount: 4,
    totalSpent: 915,
    joinedDate: "Jan 15, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    addresses: [
      {
        id: "addr-1",
        label: "Home (Default)",
        firstName: "Sarah",
        lastName: "Jenkins",
        address: "124 W 18th St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10011",
        country: "United States",
        phone: "+1 (555) 234-5678",
        isDefault: true
      }
    ]
  },
  {
    id: "cust-2",
    name: "Liam O'Connor",
    email: "liam.oc@example.com",
    phone: "+1 (555) 876-5432",
    ordersCount: 2,
    totalSpent: 584,
    joinedDate: "Feb 03, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    addresses: [
      {
        id: "addr-2",
        label: "Office",
        firstName: "Liam",
        lastName: "O'Connor",
        address: "500 Sansome St, Fl 3",
        city: "San Francisco",
        state: "CA",
        zip: "94111",
        country: "United States",
        phone: "+1 (555) 876-5432",
        isDefault: true
      }
    ]
  },
  {
    id: "cust-3",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+1 (555) 432-1098",
    ordersCount: 1,
    totalSpent: 1200,
    joinedDate: "Mar 10, 2025",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    addresses: [
      {
        id: "addr-3",
        label: "Home",
        firstName: "Elena",
        lastName: "Rostova",
        address: "742 Evergreen Terrace",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        country: "United States",
        phone: "+1 (555) 432-1098",
        isDefault: true
      }
    ]
  },
  {
    id: "cust-4",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1 (555) 901-2345",
    ordersCount: 0,
    totalSpent: 0,
    joinedDate: "May 20, 2025",
    status: "Inactive"
  }
];

export const orders: Order[] = [
  {
    id: "ORD-9821",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@example.com",
    date: "2026-08-10",
    amount: 345,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard",
    shippingCost: 0,
    discount: 30,
    tax: 25,
    shippingAddress: {
      address: "124 W 18th St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10011",
      country: "United States"
    },
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        name: "Minimalist Linen Trench",
        price: 195,
        quantity: 1,
        color: "Oatmeal",
        size: "M",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "item-2",
        productId: "prod-13",
        name: "Minimalist desk light",
        price: 150,
        quantity: 1,
        color: "Matt Black",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ORD-9750",
    customerName: "Liam O'Connor",
    customerEmail: "liam.oc@example.com",
    date: "2026-08-14",
    amount: 584,
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
    shippingMethod: "Express",
    shippingCost: 15,
    discount: 0,
    tax: 42,
    shippingAddress: {
      address: "500 Sansome St, Fl 3",
      city: "San Francisco",
      state: "CA",
      zip: "94111",
      country: "United States"
    },
    items: [
      {
        id: "item-3",
        productId: "prod-9",
        name: "Acoustic H1 Over-Ear Headphones",
        price: 349,
        quantity: 1,
        color: "Space Black",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "item-4",
        productId: "prod-18",
        name: "Organic Waffle Bedding Set",
        price: 210,
        quantity: 1,
        color: "Clay",
        size: "Queen",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ORD-9610",
    customerName: "Elena Rostova",
    customerEmail: "elena.r@example.com",
    date: "2026-08-15",
    amount: 1200,
    status: "Pending",
    paymentStatus: "Unpaid",
    paymentMethod: "Cash on Delivery",
    shippingMethod: "Standard",
    shippingCost: 0,
    discount: 0,
    tax: 85,
    shippingAddress: {
      address: "742 Evergreen Terrace",
      city: "Springfield",
      state: "IL",
      zip: "62704",
      country: "United States"
    },
    items: [
      {
        id: "item-5",
        productId: "prod-16",
        name: "Modernist Oak Sideboard",
        price: 1200,
        quantity: 1,
        color: "Natural White Oak",
        size: "180cm Width",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
      }
    ]
  }
];
