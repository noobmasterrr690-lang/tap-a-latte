# ☕ Tap-a-Latte – Self Ordering Kiosk System
**Specialty Coffee Self-Service Kiosk & Cafe Management Platform**  
*Tailored for Coffee Shops in Kabacan, North Cotabato*

---

## 🌟 Overview & Purpose
**Tap-a-Latte** is designed to solve long waiting times, order errors, and inefficient ordering processes in local coffee shops by providing a self-service ordering kiosk and management system. 

It provides:
- **Online & Local Web Access**: Accessible from any desktop or mobile browser.
- **Native Mobile Support**: Configured with Capacitor (`capacitor.config.ts`, Android & iOS) and includes complete Flutter cross-platform architecture (`flutter_app/`).
- **Automatic Responsive Dual Layout**: Automatically switches between a dedicated **Mobile View** and a dedicated **PC/Kiosk View** whenever the screen size or orientation changes. **No manual toggle button required!**
- **Role-Based Access Control**: Strict page separation and quick PIN switching for **Customer**, **Cashier**, **Staff/Barista**, and **Admin/Owner**.
- **Comprehensive Database**: Production-ready relational SQL schema (`database/schema.sql`) and Eloquent Laravel models (`laravel_backend/`).

---

## 🚀 Live Access
The live development server is running and accessible immediately:
- **Local Browser**: [http://localhost:5173/](http://localhost:5173/)
- **Mobile Devices on Local Wi-Fi**: `http://172.20.10.3:5173/`

---

## 📋 System Modules Breakdown (from Specification)

| No. | Module Name | Features Implemented | User Access |
|---|---|---|---|
| **1** | **Dashboard** | View daily sales (₱), total orders count, average order value (AOV), and real-time low-stock inventory alert banners. | **Admin & Staff** |
| **2** | **User Management Module** | 1. Register user<br>2. Edit profile<br>3. Deactivate / Activate account<br>4. Assign roles (Admin, Cashier, Staff, Customer). | **Admin** |
| **3** | **Product / Menu & Inventory** | 1. Add, edit, remove menu items<br>2. Toggle item availability (Available vs Out of Stock)<br>3. Manage base prices, cup sizes, and add-on options<br>4. Track real-time ingredient inventory (Coffee beans, fresh milk, syrups, cups) with minimum threshold warnings. | **Admin** |
| **4** | **Kiosk Ordering Module** | 1. Browse coffee menu by category with search<br>2. Drink Customizer: Sugar level (0%, 25%, 50%, 75%, 100%), Cup size (Regular 12oz, Large 16oz, Grande 22oz), Milk choice (Fresh, Oat, Almond), and Add-ons (Extra shot, vanilla, caramel, coffee jelly)<br>3. Select Dine-In or Take-Out<br>4. Generate digital order receipt/ticket with QR code and queue number (e.g. `#LATT-101`). | **Customer** |
| **5** | **Payment & Checkout Module** | 1. Cashless payments: GCash QR & PayMaya (Maya) QR simulation with reference number input<br>2. Cash payment: Pay at counter ticket generation with Cashier POS change calculator. | **Customer & Cashier** |

---

## 📱 Automatic Dual-Layout Architecture

The application implements a dedicated dual layout architecture without any manual toggle button:
- **Mobile View Layout (`MobileLayout.tsx`)**:
  - Automatically triggered when screen width `< 768px` or when orientation is portrait (`< 900px`).
  - Single-column touch cards, horizontal category pills, slide-up Drink Customizer drawer, floating cart counter, slide-up checkout sheet, and digital receipt modal.
- **PC / Kiosk Split Layout (`DesktopLayout.tsx`)**:
  - Automatically triggered when screen width `>= 768px` in landscape mode.
  - Multi-column layout: Left category sidebar, central high-resolution touch menu grid, and right persistent live order tray.
- **Pure Automatic Switch**:
  - Managed by `src/context/useResponsive.ts` listening to `window.resize`, `orientationchange`, and `window.matchMedia`.

---

## 👥 User Roles & Quick Access PINs

Click the Role Badge in the top right header to switch roles or authenticate:
- 📱 **Customer**: Self-ordering kiosk mode (No PIN needed).
- 💳 **Cashier**: Counter POS, verify cash/GCash/Maya payments, print receipts. **PIN: `2222`**
- ☕ **Staff / Barista**: Kitchen Display System (KDS), drink recipes, order status advance. **PIN: `3333`**
- 👑 **Admin / Owner**: Executive dashboard, sales telemetry, user management, inventory restock. **PIN: `1234`**

---

## 🗄️ Database Architecture
The complete SQL schema is located in `database/schema.sql` and includes:
- `users`: User profiles, roles, and terminal PINs.
- `categories`: Menu categorization with icons and sort order.
- `products`: Coffee items, descriptions, base prices, availability.
- `product_sizes`: Volume and price deltas.
- `addons`: Customizer extras (extra shots, syrups, toppings).
- `ingredients`: Real-time stock levels, units, and minimum alert thresholds.
- `product_recipes`: Ingredient mapping for automated deduction upon checkout.
- `orders`: Queue ticket number, customer name, totals, payment status, order status.
- `order_items`: Drink customizations (sugar, size, milk, add-ons).
- `inventory_logs`: Audit trail for stock deductions and restocks.

---

## 🛠️ Tech Stack & Folders
- **Live Web / Mobile PWA**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Mobile Native**: Capacitor (`capacitor.config.ts`, Android & iOS).
- **Flutter Codebase**: `flutter_app/` (Clean architecture with Models, Views, ResponsiveLayout).
- **Laravel Backend**: `laravel_backend/` (Eloquent Models, API routes, migrations).
