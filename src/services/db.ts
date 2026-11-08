import { Product, Category, Ingredient, User, Order, CartItem, SalesReport, AddonOption } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_INGREDIENTS, INITIAL_USERS, INITIAL_ORDERS, INITIAL_ADDONS } from '../data/mockData';

const STORAGE_KEYS = {
  CATEGORIES: 'tap_a_latte_categories',
  PRODUCTS: 'tap_a_latte_products',
  INGREDIENTS: 'tap_a_latte_ingredients',
  USERS: 'tap_a_latte_users',
  ORDERS: 'tap_a_latte_orders',
  ADDONS: 'tap_a_latte_addons',
  ACTIVE_USER: 'tap_a_latte_active_user',
};

class DatabaseService {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // Initialize with seed data if empty
  public initialize(): void {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.set(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.INGREDIENTS)) {
      this.set(STORAGE_KEYS.INGREDIENTS, INITIAL_INGREDIENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      this.set(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADDONS)) {
      this.set(STORAGE_KEYS.ADDONS, INITIAL_ADDONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_USER)) {
      this.set(STORAGE_KEYS.ACTIVE_USER, INITIAL_USERS[3]); // Customer by default
    }
  }

  public resetToFactory(): void {
    this.set(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    this.set(STORAGE_KEYS.INGREDIENTS, INITIAL_INGREDIENTS);
    this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    this.set(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    this.set(STORAGE_KEYS.ADDONS, INITIAL_ADDONS);
  }

  // Products
  public getProducts(): Product[] {
    return this.get<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  public saveProduct(product: Product): Product[] {
    const list = this.getProducts();
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.push(product);
    }
    this.set(STORAGE_KEYS.PRODUCTS, list);
    return list;
  }

  public deleteProduct(id: string): Product[] {
    const list = this.getProducts().filter(p => p.id !== id);
    this.set(STORAGE_KEYS.PRODUCTS, list);
    return list;
  }

  public toggleProductAvailability(id: string): Product[] {
    const list = this.getProducts().map(p => {
      if (p.id === id) {
        return { ...p, isAvailable: !p.isAvailable };
      }
      return p;
    });
    this.set(STORAGE_KEYS.PRODUCTS, list);
    return list;
  }

  // Categories
  public getCategories(): Category[] {
    return this.get<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  // Addons
  public getAddons(): AddonOption[] {
    return this.get<AddonOption[]>(STORAGE_KEYS.ADDONS, INITIAL_ADDONS);
  }

  public saveAddon(addon: AddonOption): AddonOption[] {
    const list = this.getAddons();
    const idx = list.findIndex(a => a.id === addon.id);
    if (idx >= 0) list[idx] = addon;
    else list.push(addon);
    this.set(STORAGE_KEYS.ADDONS, list);
    return list;
  }

  // Ingredients / Inventory
  public getIngredients(): Ingredient[] {
    return this.get<Ingredient[]>(STORAGE_KEYS.INGREDIENTS, INITIAL_INGREDIENTS);
  }

  public saveIngredient(ing: Ingredient): Ingredient[] {
    const list = this.getIngredients();
    const idx = list.findIndex(i => i.id === ing.id);
    if (idx >= 0) list[idx] = ing;
    else list.push(ing);
    this.set(STORAGE_KEYS.INGREDIENTS, list);
    return list;
  }

  public updateIngredientStock(id: string, delta: number): Ingredient[] {
    const list = this.getIngredients().map(i => {
      if (i.id === id) {
        const nextStock = Math.max(0, +(i.currentStock + delta).toFixed(2));
        return { ...i, currentStock: nextStock };
      }
      return i;
    });
    this.set(STORAGE_KEYS.INGREDIENTS, list);
    return list;
  }

  // Users
  public getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  public saveUser(user: User): User[] {
    const list = this.getUsers();
    const idx = list.findIndex(u => u.id === user.id);
    if (idx >= 0) list[idx] = user;
    else list.push(user);
    this.set(STORAGE_KEYS.USERS, list);
    return list;
  }

  public toggleUserStatus(id: string): User[] {
    const list = this.getUsers().map(u => {
      if (u.id === id) {
        return { ...u, status: (u.status === 'active' ? 'inactive' : 'active') as 'active' | 'inactive' };
      }
      return u;
    });
    this.set(STORAGE_KEYS.USERS, list);
    return list;
  }

  public deleteUser(id: string): User[] {
    const list = this.getUsers().filter(u => u.id !== id);
    this.set(STORAGE_KEYS.USERS, list);
    return list;
  }

  public getActiveUser(): User {
    return this.get<User>(STORAGE_KEYS.ACTIVE_USER, INITIAL_USERS[3]);
  }

  public setActiveUser(user: User): void {
    this.set(STORAGE_KEYS.ACTIVE_USER, user);
  }

  // Orders
  public getOrders(): Order[] {
    return this.get<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }

  public createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const nextNum = orders.length + 101;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `#LATT-${nextNum}`,
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder);
    this.set(STORAGE_KEYS.ORDERS, orders);

    // Deduct ingredient inventory based on recipes
    this.deductIngredientsForOrder(newOrder.items);

    return newOrder;
  }

  private deductIngredientsForOrder(items: CartItem[]): void {
    const products = this.getProducts();
    const ingredients = this.getIngredients();

    items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod && prod.recipe) {
        prod.recipe.forEach(rec => {
          const ingIndex = ingredients.findIndex(i => i.id === rec.ingredientId);
          if (ingIndex >= 0) {
            const deduction = rec.amount * item.quantity;
            ingredients[ingIndex].currentStock = Math.max(
              0,
              +(ingredients[ingIndex].currentStock - deduction).toFixed(2)
            );
          }
        });
      }
    });

    this.set(STORAGE_KEYS.INGREDIENTS, ingredients);
  }

  public updateOrderStatus(orderId: string, status: Order['orderStatus']): Order[] {
    const orders = this.getOrders().map(o => {
      if (o.id === orderId) {
        return { ...o, orderStatus: status };
      }
      return o;
    });
    this.set(STORAGE_KEYS.ORDERS, orders);
    return orders;
  }

  public updatePaymentStatus(orderId: string, status: Order['paymentStatus'], ref?: string): Order[] {
    const orders = this.getOrders().map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentStatus: status,
          paymentReference: ref || o.paymentReference,
          orderStatus: status === 'paid' && o.orderStatus === 'new' ? 'brewing' : o.orderStatus
        };
      }
      return o;
    });
    this.set(STORAGE_KEYS.ORDERS, orders);
    return orders;
  }

  // Dashboard Stats
  public getSalesReport(): SalesReport {
    const orders = this.getOrders();
    const ingredients = this.getIngredients();

    let totalSales = 0;
    let gcashTotal = 0;
    let paymayaTotal = 0;
    let cashTotal = 0;
    let pendingCount = 0;
    let readyCount = 0;
    let completedCount = 0;

    orders.forEach(o => {
      if (o.paymentStatus === 'paid') {
        totalSales += o.totalAmount;
        if (o.paymentMethod === 'gcash') gcashTotal += o.totalAmount;
        else if (o.paymentMethod === 'paymaya') paymayaTotal += o.totalAmount;
        else if (o.paymentMethod === 'cash') cashTotal += o.totalAmount;
      }
      if (o.orderStatus === 'new' || o.paymentStatus === 'pending') pendingCount++;
      if (o.orderStatus === 'ready') readyCount++;
      if (o.orderStatus === 'completed') completedCount++;
    });

    const lowStockCount = ingredients.filter(i => i.currentStock <= i.minThreshold).length;
    const averageOrderValue = orders.length > 0 ? +(totalSales / (orders.filter(o => o.paymentStatus === 'paid').length || 1)).toFixed(2) : 0;

    return {
      totalSales,
      totalOrders: orders.length,
      averageOrderValue,
      pendingCount,
      readyCount,
      completedCount,
      gcashTotal,
      paymayaTotal,
      cashTotal,
      lowStockCount
    };
  }
}

export const db = new DatabaseService();
