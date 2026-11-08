<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Ingredient;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

// Module 4: Kiosk Ordering Module (Customer)
Route::prefix('kiosk')->group(function () {
    Route::get('/menu', function () {
        return response()->json(Product::with('category')->where('is_available', true)->get());
    });

    Route::post('/order', function (Request $request) {
        $data = $request->validate([
            'order_type' => 'required|in:dine_in,take_out',
            'customer_name' => 'nullable|string',
            'payment_method' => 'required|in:gcash,paymaya,cash',
            'items' => 'required|array',
        ]);

        $nextNum = Order::count() + 101;
        $order = Order::create([
            'order_number' => "#LATT-{$nextNum}",
            'order_type' => $data['order_type'],
            'customer_name' => $data['customer_name'] ?? 'Guest Customer',
            'subtotal' => $request->subtotal,
            'total_amount' => $request->total_amount,
            'payment_method' => $data['payment_method'],
            'payment_status' => $data['payment_method'] === 'cash' ? 'pending' : 'paid',
            'order_status' => $data['payment_method'] === 'cash' ? 'new' : 'brewing',
            'payment_reference' => $request->payment_reference,
        ]);

        foreach ($data['items'] as $item) {
            $order->items()->create($item);
        }

        return response()->json($order->load('items'), 201);
    });
});

// Module 1: Dashboard (Admin & Staff)
Route::get('/dashboard', function () {
    $todayOrders = Order::whereDate('created_at', today())->get();
    $totalSales = $todayOrders->where('payment_status', 'paid')->sum('total_amount');
    $lowStockCount = Ingredient::whereColumn('current_stock', '<=', 'min_threshold')->count();

    return response()->json([
        'daily_sales' => $totalSales,
        'total_orders' => $todayOrders->count(),
        'low_stock_alerts' => $lowStockCount,
        'recent_orders' => Order::latest()->take(10)->get()
    ]);
});

// Module 2: User Management (Admin)
Route::apiResource('users', UserController::class);

// Module 3: Product / Menu & Inventory (Admin)
Route::apiResource('products', ProductController::class);
Route::apiResource('ingredients', IngredientController::class);
Route::post('/products/{id}/toggle-availability', function ($id) {
    $p = Product::findOrFail($id);
    $p->is_available = !$p->is_available;
    $p->save();
    return response()->json($p);
});

// Module 5: Payment & Cashier Checkout (Customer & Cashier)
Route::post('/orders/{id}/verify-payment', function ($id, Request $request) {
    $order = Order::findOrFail($id);
    $order->payment_status = 'paid';
    $order->order_status = $order->order_status === 'new' ? 'brewing' : $order->order_status;
    $order->cash_tendered = $request->cash_tendered;
    $order->change_amount = $request->change_amount;
    $order->save();

    return response()->json($order);
});
