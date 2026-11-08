import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Product, Category, Ingredient, Order, CartItem, SalesReport, AddonOption, OrderType, OrderStatus, PaymentStatus } from '../types';
import { db } from '../services/db';

interface AppContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  loginWithPin: (pin: string) => boolean;
  
  // Products, categories, data
  products: Product[];
  categories: Category[];
  ingredients: Ingredient[];
  users: User[];
  orders: Order[];
  addons: AddonOption[];
  salesReport: SalesReport;
  refreshData: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartItemQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Customizer modal
  customizingProduct: Product | null;
  openCustomizer: (product: Product) => void;
  closeCustomizer: () => void;
  
  // Order & Receipt
  dineOption: OrderType;
  setDineOption: (option: OrderType) => void;
  activeReceiptOrder: Order | null;
  showReceiptModal: boolean;
  openReceipt: (order: Order) => void;
  closeReceipt: () => void;
  checkoutOrder: (
    paymentMethod: Order['paymentMethod'],
    customerName: string,
    customerPhone?: string,
    reference?: string,
    cashAmount?: number
  ) => Order;

  // Status updates
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus, ref?: string) => void;
  
  // Admin Operations
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string) => void;
  saveIngredient: (ing: Ingredient) => void;
  updateIngredientStock: (id: string, delta: number) => void;
  saveUser: (user: User) => void;
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => void;
  resetDatabase: () => void;

  // Active navigation tab (for Admin/Staff/Cashier)
  adminTab: 'dashboard' | 'users' | 'inventory' | 'menu';
  setAdminTab: (tab: 'dashboard' | 'users' | 'inventory' | 'menu') => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize db on mount
  useEffect(() => {
    db.initialize();
  }, []);

  const [currentUser, setCurrentUserState] = useState<User>(() => db.getActiveUser());
  const [products, setProducts] = useState<Product[]>(() => db.getProducts());
  const [categories, setCategories] = useState<Category[]>(() => db.getCategories());
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => db.getIngredients());
  const [users, setUsers] = useState<User[]>(() => db.getUsers());
  const [orders, setOrders] = useState<Order[]>(() => db.getOrders());
  const [addons, setAddons] = useState<AddonOption[]>(() => db.getAddons());
  const [salesReport, setSalesReport] = useState<SalesReport>(() => db.getSalesReport());

  const [cart, setCart] = useState<CartItem[]>([]);
  const [dineOption, setDineOption] = useState<OrderType>('dine_in');
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<Order | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'dashboard' | 'users' | 'inventory' | 'menu'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshData = () => {
    setProducts(db.getProducts());
    setCategories(db.getCategories());
    setIngredients(db.getIngredients());
    setUsers(db.getUsers());
    setOrders(db.getOrders());
    setAddons(db.getAddons());
    setSalesReport(db.getSalesReport());
  };

  const switchRole = (role: UserRole) => {
    const foundUser = db.getUsers().find(u => u.role === role && u.status === 'active');
    if (foundUser) {
      db.setActiveUser(foundUser);
      setCurrentUserState(foundUser);
    } else {
      // Fallback guest user
      const guest: User = {
        id: `user-${role}-${Date.now()}`,
        name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
        email: `${role}@tapalatte.ph`,
        role: role,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      db.setActiveUser(guest);
      setCurrentUserState(guest);
    }
  };

  const loginWithPin = (pin: string): boolean => {
    const allUsers = db.getUsers();
    const matched = allUsers.find(u => u.pin === pin && u.status === 'active');
    if (matched) {
      db.setActiveUser(matched);
      setCurrentUserState(matched);
      return true;
    }
    return false;
  };

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `ci-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };
    setCart(prev => [...prev, newItem]);
  };

  const updateCartItemQty = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            const singleUnitPrice = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: +(singleUnitPrice * nextQty).toFixed(2)
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Customizer
  const openCustomizer = (product: Product) => setCustomizingProduct(product);
  const closeCustomizer = () => setCustomizingProduct(null);

  // Receipts
  const openReceipt = (order: Order) => {
    setActiveReceiptOrder(order);
    setShowReceiptModal(true);
  };

  const closeReceipt = () => {
    setShowReceiptModal(false);
  };

  // Checkout
  const checkoutOrder = (
    paymentMethod: Order['paymentMethod'],
    customerName: string,
    customerPhone?: string,
    reference?: string,
    cashAmount?: number
  ): Order => {
    const subtotal = cartTotal;
    const totalAmount = subtotal;
    const paymentStatus: PaymentStatus = paymentMethod === 'cash' ? 'pending' : 'paid';

    const newOrder = db.createOrder({
      orderType: dineOption,
      customerName: customerName || (currentUser.role === 'customer' ? 'Guest Customer' : currentUser.name),
      customerPhone,
      items: [...cart],
      subtotal,
      discount: 0,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus: paymentStatus === 'paid' ? 'brewing' : 'new',
      paymentReference: reference || (paymentMethod === 'cash' ? undefined : `${paymentMethod.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`),
      cashReceived: cashAmount,
      changeAmount: cashAmount ? Math.max(0, cashAmount - totalAmount) : undefined
    });

    clearCart();
    refreshData();
    openReceipt(newOrder);
    return newOrder;
  };

  // Status updates
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    db.updateOrderStatus(orderId, status);
    refreshData();
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus, ref?: string) => {
    db.updatePaymentStatus(orderId, status, ref);
    refreshData();
  };

  // Admin DB Methods
  const saveProduct = (product: Product) => {
    db.saveProduct(product);
    refreshData();
  };

  const deleteProduct = (id: string) => {
    db.deleteProduct(id);
    refreshData();
  };

  const toggleProductAvailability = (id: string) => {
    db.toggleProductAvailability(id);
    refreshData();
  };

  const saveIngredient = (ing: Ingredient) => {
    db.saveIngredient(ing);
    refreshData();
  };

  const updateIngredientStock = (id: string, delta: number) => {
    db.updateIngredientStock(id, delta);
    refreshData();
  };

  const saveUser = (user: User) => {
    db.saveUser(user);
    refreshData();
  };

  const toggleUserStatus = (id: string) => {
    db.toggleUserStatus(id);
    refreshData();
  };

  const deleteUser = (id: string) => {
    db.deleteUser(id);
    refreshData();
  };

  const resetDatabase = () => {
    db.resetToFactory();
    refreshData();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        loginWithPin,
        products,
        categories,
        ingredients,
        users,
        orders,
        addons,
        salesReport,
        refreshData,
        cart,
        addToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        customizingProduct,
        openCustomizer,
        closeCustomizer,
        dineOption,
        setDineOption,
        activeReceiptOrder,
        showReceiptModal,
        openReceipt,
        closeReceipt,
        checkoutOrder,
        updateOrderStatus,
        updatePaymentStatus,
        saveProduct,
        deleteProduct,
        toggleProductAvailability,
        saveIngredient,
        updateIngredientStock,
        saveUser,
        toggleUserStatus,
        deleteUser,
        resetDatabase,
        adminTab,
        setAdminTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
