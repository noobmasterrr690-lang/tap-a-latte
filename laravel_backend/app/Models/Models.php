<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'role', 'pin', 'password', 'status'];

    protected $hidden = ['password', 'pin'];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'cashier_id');
    }
}

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'icon', 'description', 'sort_order', 'is_active'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name', 'slug', 'description', 'base_price',
        'image_url', 'is_available', 'is_featured', 'allows_customization'
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'allows_customization' => 'boolean'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function ingredients(): BelongsToMany
    {
        return $this->belongsToMany(Ingredient::class, 'product_recipes')
                    ->withPivot('amount_required');
    }
}

class Ingredient extends Model
{
    protected $fillable = ['name', 'unit', 'current_stock', 'min_threshold', 'unit_cost', 'category'];

    protected $casts = [
        'current_stock' => 'decimal:2',
        'min_threshold' => 'decimal:2',
        'unit_cost' => 'decimal:2'
    ];

    public function isLowStock(): bool
    {
        return $this->current_stock <= $this->min_threshold;
    }
}

class Order extends Model
{
    protected $fillable = [
        'order_number', 'order_type', 'customer_name', 'customer_phone',
        'subtotal', 'discount', 'total_amount', 'payment_method',
        'payment_status', 'order_status', 'payment_reference',
        'cash_tendered', 'change_amount', 'cashier_id'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'cash_tendered' => 'decimal:2',
        'change_amount' => 'decimal:2'
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cashier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }
}

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'product_id', 'product_name', 'cup_size',
        'sugar_level', 'milk_option', 'temperature', 'quantity',
        'unit_price', 'total_price', 'special_instructions'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
