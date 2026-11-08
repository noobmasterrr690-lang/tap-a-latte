enum UserRole { customer, cashier, staff, admin }
enum OrderType { dineIn, takeOut }
enum PaymentMethod { gcash, paymaya, cash }
enum PaymentStatus { pending, paid, cancelled }
enum OrderStatus { newOrder, brewing, ready, completed, cancelled }

class Product {
  final String id;
  final String name;
  final String categoryId;
  final String description;
  final double basePrice;
  final String imageUrl;
  final bool isAvailable;
  final bool allowsCustomization;

  Product({
    required this.id,
    required this.name,
    required this.categoryId,
    required this.description,
    required this.basePrice,
    required this.imageUrl,
    this.isAvailable = true,
    this.allowsCustomization = true,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'category_id': categoryId,
      'description': description,
      'base_price': basePrice,
      'image_url': imageUrl,
      'is_available': isAvailable ? 1 : 0,
      'allows_customization': allowsCustomization ? 1 : 0,
    };
  }

  factory Product.fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'],
      name: map['name'],
      categoryId: map['category_id'],
      description: map['description'],
      basePrice: (map['base_price'] as num).toDouble(),
      imageUrl: map['image_url'],
      isAvailable: map['is_available'] == 1,
      allowsCustomization: map['allows_customization'] == 1,
    );
  }
}

class Ingredient {
  final String id;
  final String name;
  final String unit;
  double currentStock;
  final double minThreshold;
  final double unitCost;

  Ingredient({
    required this.id,
    required this.name,
    required this.unit,
    required this.currentStock,
    required this.minThreshold,
    required this.unitCost,
  });

  bool get isLowStock => currentStock <= minThreshold;

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'unit': unit,
      'current_stock': currentStock,
      'min_threshold': minThreshold,
      'unit_cost': unitCost,
    };
  }

  factory Ingredient.fromMap(Map<String, dynamic> map) {
    return Ingredient(
      id: map['id'],
      name: map['name'],
      unit: map['unit'],
      currentStock: (map['current_stock'] as num).toDouble(),
      minThreshold: (map['min_threshold'] as num).toDouble(),
      unitCost: (map['unit_cost'] as num).toDouble(),
    );
  }
}

class UserAccount {
  final String id;
  final String name;
  final String email;
  final UserRole role;
  final String? pin;
  bool isActive;

  UserAccount({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.pin,
    this.isActive = true,
  });
}

class OrderItem {
  final String productId;
  final String productName;
  final String cupSize;
  final String sugarLevel;
  final String milkOption;
  final String temperature;
  final int quantity;
  final double totalPrice;
  final List<String> addons;

  OrderItem({
    required this.productId,
    required this.productName,
    required this.cupSize,
    required this.sugarLevel,
    required this.milkOption,
    required this.temperature,
    required this.quantity,
    required this.totalPrice,
    required this.addons,
  });
}

class OrderTicket {
  final String id;
  final String orderNumber;
  final OrderType orderType;
  final String customerName;
  final List<OrderItem> items;
  final double totalAmount;
  final PaymentMethod paymentMethod;
  PaymentStatus paymentStatus;
  OrderStatus orderStatus;
  final String? paymentReference;
  final DateTime createdAt;

  OrderTicket({
    required this.id,
    required this.orderNumber,
    required this.orderType,
    required this.customerName,
    required this.items,
    required this.totalAmount,
    required this.paymentMethod,
    required this.paymentStatus,
    required this.orderStatus,
    this.paymentReference,
    required this.createdAt,
  });
}
