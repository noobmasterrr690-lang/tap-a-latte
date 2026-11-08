export type UserRole = 'customer' | 'cashier' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  pin?: string;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
}

export type SugarLevel = '0%' | '25%' | '50%' | '75%' | '100%';
export type CupSize = 'Regular (12oz)' | 'Large (16oz)' | 'Grande (22oz)';
export type MilkOption = 'Fresh Milk' | 'Oat Milk' | 'Almond Milk' | 'Soy Milk';
export type Temperature = 'Hot' | 'Iced';
export type OrderType = 'dine_in' | 'take_out';
export type PaymentMethod = 'gcash' | 'paymaya' | 'cash';
export type PaymentStatus = 'pending' | 'paid' | 'cancelled';
export type OrderStatus = 'new' | 'brewing' | 'ready' | 'completed' | 'cancelled';

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  category: 'shots' | 'syrups' | 'toppings' | 'milks';
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  isAvailable: boolean;
  isFeatured?: boolean;
  allowsCustomization: boolean;
  tags?: string[];
  recipe?: {
    ingredientId: string;
    amount: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string; // 'kg' | 'L' | 'ml' | 'pcs' | 'bottles'
  currentStock: number;
  minThreshold: number;
  unitCost: number;
  category: 'beans' | 'dairy' | 'syrups' | 'packaging' | 'other';
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  productName: string;
  basePrice: number;
  cupSize: CupSize;
  sizePriceDelta: number;
  sugarLevel: SugarLevel;
  milkOption: MilkOption;
  temperature: Temperature;
  selectedAddons: AddonOption[];
  quantity: number;
  totalPrice: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #LATT-102
  orderType: OrderType;
  customerName: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentReference?: string;
  cashReceived?: number;
  changeAmount?: number;
  createdAt: string;
  estimatedMinutes?: number;
  cashierName?: string;
}

export interface SalesReport {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  pendingCount: number;
  readyCount: number;
  completedCount: number;
  gcashTotal: number;
  paymayaTotal: number;
  cashTotal: number;
  lowStockCount: number;
}
