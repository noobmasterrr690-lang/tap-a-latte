# ☕ Tap-a-Latte – Self Ordering Kiosk System
**Specialty Coffee Self-Service Kiosk & Cafe Management Platform**  
*Tailored for Coffee Shops in Kabacan, North Cotabato*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnoobmasterrr690-lang%2Ftap-a-latte)
[![Download Android APK](https://img.shields.io/badge/Download-Android%20APK%20(v1.0.0)-2ea44f?logo=android&logoColor=white)](https://github.com/noobmasterrr690-lang/tap-a-latte/releases/download/v1.0.0/Tap-a-Latte-Kiosk.apk)

---

## 📱 Mobile APK Download (Share with Friends)
- **Direct APK Download**: [Download Tap-a-Latte-Kiosk.apk](https://github.com/noobmasterrr690-lang/tap-a-latte/releases/download/v1.0.0/Tap-a-Latte-Kiosk.apk)
- **GitHub Release Page**: [https://github.com/noobmasterrr690-lang/tap-a-latte/releases/tag/v1.0.0](https://github.com/noobmasterrr690-lang/tap-a-latte/releases/tag/v1.0.0)

---

## 🚀 1-Click Vercel Deployment
To deploy this project to Vercel with your own domain and online URL:
1. Click the button above or visit:  
   👉 [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnoobmasterrr690-lang%2Ftap-a-latte)
2. Connect your GitHub account (`noobmasterrr690-lang`) and click **Deploy**.
3. Vercel will build and assign you a free public link (e.g. `https://tap-a-latte.vercel.app`).

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

---

## 👥 User Roles & Quick Access PINs

Click the Role Badge in the top right header to switch roles or authenticate:
- 📱 **Customer**: Self-ordering kiosk mode (No PIN needed).
- 💳 **Cashier**: Counter POS, verify cash/GCash/Maya payments, print receipts. **PIN: `2222`**
- ☕ **Staff / Barista**: Kitchen Display System (KDS), drink recipes, order status advance. **PIN: `3333`**
- 👑 **Admin / Owner**: Executive dashboard, sales telemetry, user management, inventory restock. **PIN: `1234`**
