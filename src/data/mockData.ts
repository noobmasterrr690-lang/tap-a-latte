import { Category, Product, AddonOption, Ingredient, User, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-espresso', name: 'Espresso & Classics', icon: 'Coffee', description: 'Freshly pulled artisan espresso drinks' },
  { id: 'cat-lattes', name: 'Signature Lattes', icon: 'Sparkles', description: 'Creamy specialty espresso & milk recipes' },
  { id: 'cat-coldbrew', name: 'Cold Brew & Iced', icon: 'IceCream', description: 'Steeped 16 hours for velvet smoothness' },
  { id: 'cat-frappes', name: 'Blended Frappes', icon: 'Zap', description: 'Rich blended treats with whipped cream' },
  { id: 'cat-noncoffee', name: 'Non-Coffee & Matcha', icon: 'CupSoda', description: 'Tea lattes, chocolate & refreshers' },
  { id: 'cat-pastries', name: 'Pastries & Bakes', icon: 'Cookie', description: 'Freshly baked local & cafe treats' }
];

export const INITIAL_ADDONS: AddonOption[] = [
  { id: 'addon-shot', name: 'Extra Espresso Shot', price: 25, category: 'shots' },
  { id: 'addon-vanilla', name: 'French Vanilla Syrup', price: 20, category: 'syrups' },
  { id: 'addon-caramel', name: 'Salted Caramel Drizzle', price: 20, category: 'syrups' },
  { id: 'addon-hazelnut', name: 'Roasted Hazelnut Syrup', price: 20, category: 'syrups' },
  { id: 'addon-whip', name: 'Whipped Cream Cloud', price: 20, category: 'toppings' },
  { id: 'addon-jelly', name: 'Coffee Jelly Pearls', price: 25, category: 'toppings' },
  { id: 'addon-oat', name: 'Oat Milk Sub (Gluten-Free)', price: 35, category: 'milks' },
  { id: 'addon-almond', name: 'Almond Milk Sub', price: 35, category: 'milks' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-spanish-latte',
    name: 'Kabacan Spanish Latte',
    categoryId: 'cat-lattes',
    description: 'Espresso with rich condensed milk and velvety steamed fresh milk. Our #1 bestseller in Kabacan!',
    basePrice: 135,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: true,
    allowsCustomization: true,
    tags: ['Bestseller', 'Sweet', 'House Special'],
    recipe: [
      { ingredientId: 'ing-beans', amount: 0.02 },
      { ingredientId: 'ing-milk', amount: 0.2 },
      { ingredientId: 'ing-condensed', amount: 0.04 },
      { ingredientId: 'ing-cup-16oz', amount: 1 }
    ]
  },
  {
    id: 'prod-caramel-macchiato',
    name: 'Salted Caramel Macchiato',
    categoryId: 'cat-lattes',
    description: 'Layered vanilla-infused fresh milk marked with bold espresso and topped with golden caramel grid.',
    basePrice: 145,
    imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: true,
    allowsCustomization: true,
    tags: ['Popular', 'Iced or Hot'],
    recipe: [
      { ingredientId: 'ing-beans', amount: 0.02 },
      { ingredientId: 'ing-milk', amount: 0.2 },
      { ingredientId: 'ing-caramel', amount: 0.03 },
      { ingredientId: 'ing-cup-16oz', amount: 1 }
    ]
  },
  {
    id: 'prod-americano',
    name: 'Cotabato Highland Americano',
    categoryId: 'cat-espresso',
    description: 'Double shot of locally sourced Mt. Apo / Cotabato Arabica espresso lengthened with purified hot water or over ice.',
    basePrice: 100,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: false,
    allowsCustomization: true,
    tags: ['Classic', 'Bold', 'Zero Sugar'],
    recipe: [
      { ingredientId: 'ing-beans', amount: 0.02 },
      { ingredientId: 'ing-cup-12oz', amount: 1 }
    ]
  },
  {
    id: 'prod-matcha-latte',
    name: 'Kyoto Dirty Matcha Latte',
    categoryId: 'cat-noncoffee',
    description: 'Ceremonial grade Uji matcha whisked with fresh milk, crowned with a rich shot of espresso.',
    basePrice: 155,
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: true,
    allowsCustomization: true,
    tags: ['Signature', 'Energy'],
    recipe: [
      { ingredientId: 'ing-matcha', amount: 0.015 },
      { ingredientId: 'ing-milk', amount: 0.2 },
      { ingredientId: 'ing-beans', amount: 0.01 },
      { ingredientId: 'ing-cup-16oz', amount: 1 }
    ]
  },
  {
    id: 'prod-mocha-frappe',
    name: 'Dark Mocha Java Chip Frappe',
    categoryId: 'cat-frappes',
    description: 'Blended espresso, Belgian dark chocolate sauce, chocolate chips, and fresh mountain dairy with mountain-high whipped cream.',
    basePrice: 165,
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: false,
    allowsCustomization: true,
    tags: ['Sweet Treat', 'Decadent'],
    recipe: [
      { ingredientId: 'ing-beans', amount: 0.02 },
      { ingredientId: 'ing-milk', amount: 0.15 },
      { ingredientId: 'ing-chocolate', amount: 0.04 },
      { ingredientId: 'ing-cup-22oz', amount: 1 }
    ]
  },
  {
    id: 'prod-coldbrew-sweetcream',
    name: 'Vanilla Sweet Cream Cold Brew',
    categoryId: 'cat-coldbrew',
    description: 'Slow-steeped 16-hour single origin cold brew float topped with handmade sweet vanilla foam.',
    basePrice: 140,
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: true,
    allowsCustomization: true,
    tags: ['Smooth', 'High Caffeine'],
    recipe: [
      { ingredientId: 'ing-beans', amount: 0.03 },
      { ingredientId: 'ing-milk', amount: 0.1 },
      { ingredientId: 'ing-vanilla', amount: 0.02 },
      { ingredientId: 'ing-cup-16oz', amount: 1 }
    ]
  },
  {
    id: 'prod-croissant',
    name: 'Butter Flaky Artisan Croissant',
    categoryId: 'cat-pastries',
    description: 'Freshly baked all-butter French croissant with honeycomb crumb and crispy golden crust.',
    basePrice: 95,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isFeatured: false,
    allowsCustomization: false,
    tags: ['Fresh Baked', 'Warm Pairing'],
    recipe: []
  },
  {
    id: 'prod-cinnamon-roll',
    name: 'Cream Cheese Glazed Cinnamon Roll',
    categoryId: 'cat-pastries',
    description: 'Pillow-soft brioche swirled with Ceylon cinnamon and drenched in tangy cream cheese glaze.',
    basePrice: 110,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    isAvailable: false, // demonstrates Out Of Stock toggle!
    isFeatured: false,
    allowsCustomization: false,
    tags: ['Sold Out Sample'],
    recipe: []
  }
];

export const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: 'ing-beans', name: 'Arabica Coffee Beans (Mt. Apo/Cotabato)', unit: 'kg', currentStock: 3.5, minThreshold: 5.0, unitCost: 650, category: 'beans' }, // Low Stock!
  { id: 'ing-milk', name: 'Full Cream Dairy Fresh Milk', unit: 'L', currentStock: 18.0, minThreshold: 10.0, unitCost: 95, category: 'dairy' },
  { id: 'ing-oatmilk', name: 'Barista Edition Oat Milk', unit: 'L', currentStock: 2.0, minThreshold: 4.0, unitCost: 190, category: 'dairy' }, // Low Stock!
  { id: 'ing-condensed', name: 'Sweetened Condensed Milk', unit: 'kg', currentStock: 12.0, minThreshold: 5.0, unitCost: 85, category: 'dairy' },
  { id: 'ing-caramel', name: 'Salted Caramel Sauce & Syrup', unit: 'L', currentStock: 1.5, minThreshold: 3.0, unitCost: 350, category: 'syrups' }, // Low Stock!
  { id: 'ing-vanilla', name: 'Madagascar Vanilla Syrup', unit: 'L', currentStock: 4.5, minThreshold: 2.0, unitCost: 320, category: 'syrups' },
  { id: 'ing-chocolate', name: 'Belgian Dark Chocolate Sauce', unit: 'kg', currentStock: 6.0, minThreshold: 3.0, unitCost: 450, category: 'syrups' },
  { id: 'ing-matcha', name: 'Ceremonial Matcha Powder', unit: 'kg', currentStock: 1.2, minThreshold: 0.8, unitCost: 1200, category: 'other' },
  { id: 'ing-cup-12oz', name: '12oz Hot Paper Cups & Sleeves', unit: 'pcs', currentStock: 120, minThreshold: 100, unitCost: 4.5, category: 'packaging' },
  { id: 'ing-cup-16oz', name: '16oz Clear Iced Cups', unit: 'pcs', currentStock: 85, minThreshold: 150, unitCost: 5.0, category: 'packaging' }, // Low Stock!
  { id: 'ing-cup-22oz', name: '22oz Heavy Duty Frappe Cups', unit: 'pcs', currentStock: 240, minThreshold: 100, unitCost: 6.5, category: 'packaging' },
  { id: 'ing-straws', name: 'Eco Bio-Degradable Straws', unit: 'pcs', currentStock: 450, minThreshold: 200, unitCost: 1.2, category: 'packaging' }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Kier Dela Cruz',
    email: 'admin@tapalatte.ph',
    role: 'admin',
    phone: '0917-555-0192',
    pin: '1234',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-01-10'
  },
  {
    id: 'user-cashier',
    name: 'Maria Santos (Cashier Desk)',
    email: 'cashier@tapalatte.ph',
    role: 'cashier',
    phone: '0928-555-4421',
    pin: '2222',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-02-14'
  },
  {
    id: 'user-staff',
    name: 'Rico Tan (Lead Barista)',
    email: 'barista@tapalatte.ph',
    role: 'staff',
    phone: '0919-555-8812',
    pin: '3333',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-02-15'
  },
  {
    id: 'user-customer',
    name: 'Self-Service Kiosk Guest',
    email: 'guest@tapalatte.ph',
    role: 'customer',
    status: 'active',
    createdAt: '2026-03-01'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#LATT-101',
    orderType: 'dine_in',
    customerName: 'Atty. Hernandez',
    items: [
      {
        id: 'ci-1',
        productId: 'prod-spanish-latte',
        productName: 'Kabacan Spanish Latte',
        basePrice: 135,
        cupSize: 'Large (16oz)',
        sizePriceDelta: 20,
        sugarLevel: '50%',
        milkOption: 'Fresh Milk',
        temperature: 'Iced',
        selectedAddons: [INITIAL_ADDONS[0]], // Extra Shot
        quantity: 1,
        totalPrice: 180
      }
    ],
    subtotal: 180,
    discount: 0,
    totalAmount: 180,
    paymentMethod: 'gcash',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    paymentReference: 'GCASH-9823412',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: 'ord-102',
    orderNumber: '#LATT-102',
    orderType: 'take_out',
    customerName: 'Dr. Alonto (USM Faculty)',
    items: [
      {
        id: 'ci-2',
        productId: 'prod-caramel-macchiato',
        productName: 'Salted Caramel Macchiato',
        basePrice: 145,
        cupSize: 'Grande (22oz)',
        sizePriceDelta: 35,
        sugarLevel: '25%',
        milkOption: 'Oat Milk',
        temperature: 'Iced',
        selectedAddons: [INITIAL_ADDONS[6]], // Oat Milk Sub
        quantity: 2,
        totalPrice: 430
      }
    ],
    subtotal: 430,
    discount: 0,
    totalAmount: 430,
    paymentMethod: 'paymaya',
    paymentStatus: 'paid',
    orderStatus: 'brewing',
    paymentReference: 'MAYA-662391',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  },
  {
    id: 'ord-103',
    orderNumber: '#LATT-103',
    orderType: 'dine_in',
    customerName: 'Patricia G.',
    items: [
      {
        id: 'ci-3',
        productId: 'prod-matcha-latte',
        productName: 'Kyoto Dirty Matcha Latte',
        basePrice: 155,
        cupSize: 'Regular (12oz)',
        sizePriceDelta: 0,
        sugarLevel: '50%',
        milkOption: 'Fresh Milk',
        temperature: 'Hot',
        selectedAddons: [],
        quantity: 1,
        totalPrice: 155
      },
      {
        id: 'ci-4',
        productId: 'prod-croissant',
        productName: 'Butter Flaky Artisan Croissant',
        basePrice: 95,
        cupSize: 'Regular (12oz)',
        sizePriceDelta: 0,
        sugarLevel: '0%',
        milkOption: 'Fresh Milk',
        temperature: 'Hot',
        selectedAddons: [],
        quantity: 1,
        totalPrice: 95
      }
    ],
    subtotal: 250,
    discount: 0,
    totalAmount: 250,
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    orderStatus: 'new',
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString()
  }
];
