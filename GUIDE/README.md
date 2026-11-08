# ☕ Tap-a-Latte – Proposal Defense Guide
**Self-Ordering Kiosk & Cafe Management System for Coffee Shops in Kabacan, North Cotabato**

> 📄 **PDF Version**: A printable PDF is saved in this folder: [`Tap_a_Latte_Proposal_Defense_Guide.pdf`](./Tap_a_Latte_Proposal_Defense_Guide.pdf).

---

## 1. What is Tap-a-Latte? (Purpose & Objectives)

### Plain English Summary for Your Group:
**Tap-a-Latte** is a self-service ordering kiosk and cafe management system designed for small and medium coffee shops in **Kabacan, North Cotabato** (such as cafes serving students from USM, teachers, and local residents).

It replaces slow, manual paper ordering with a digital touchscreen kiosk where customers can browse, customize drinks, and pay, while giving cashiers, baristas, and owners real-time management tools.

### Problems We Are Solving:
1. **Long Waiting Times:** Lines getting too long during morning and afternoon rush hours.
2. **Order Mistakes:** Mishearing customer requests (wrong sweetness level, wrong cup size, hot vs. iced mistakes).
3. **Payment Delays:** Cashiers having to manually verify GCash and PayMaya reference numbers while managing cash change.
4. **Inventory Surprises:** Baristas suddenly running out of coffee beans or milk during peak hours with no advance warning.

### What the System Delivers:
- **For Customers:** Fast self-service ordering, drink customization, and digital queue tickets.
- **For Cashiers:** A point-of-sale queue to verify GCash/Maya reference numbers and compute cash change.
- **For Baristas:** A Kitchen Display System (KDS) showing incoming drink orders and exact recipes.
- **For Owners/Admins:** Live sales totals, total order counts, menu pricing controls, and real-time low-stock alerts.

---

## 2. Tech Stack: Frameworks & Languages Used

| Category | Technology | Why We Used It (Simple Reason) |
|---|---|---|
| **Frontend Language** | **TypeScript & JavaScript** | Prevents errors and ensures price/order math is 100% accurate. |
| **UI Framework** | **React 18 + Vite** | Extremely fast loading (600ms); instant page updates when cart changes. |
| **Styling** | **Tailwind CSS** | Custom artisan coffee aesthetic (espresso darks, caramel ambers, latte cream). |
| **Mobile Native Engine** | **Capacitor 8 (by Ionic)** | Converts our code into **native Android (APK)** and **Apple iOS (Xcode)** apps without rebuilding from scratch. |
| **Alternative Mobile** | **Flutter (Dart)** | Full cross-platform architecture included in `flutter_app/`. |
| **Database** | **Relational SQL (SQLite / MySQL)** | 11 tables with foreign keys and automatic inventory triggers. Runs offline on phones and in cloud databases. |
| **Backend API** | **Laravel 11 (PHP 8.3)** | Eloquent models and REST API routes included in `laravel_backend/`. |
| **Cloud Hosting** | **Vercel + GitHub Actions** | Vercel provides 24/7 web access; GitHub Actions automatically compiles the Android APK in the cloud. |

---

## 3. How the App Works (5-Step Walkthrough for Defense)

1. **Step 1: Customer Browses & Customizes (Kiosk Ordering)**
   - Customer taps a drink (e.g. *Kabacan Spanish Latte*).
   - Customizes: **Sugar level (50%)**, **Cup size (Large 16oz)**, **Milk (Oat Milk)**, **Add-ons (Extra Espresso Shot)**.
   - Selects **Dine-In** or **Take-Out**.

2. **Step 2: Payment & Digital Ticket Generation**
   - Customer chooses **GCash** (scans QR), **PayMaya** (scans QR), or **Cash at Counter**.
   - Kiosk prints/displays a **Digital Queue Ticket with QR Code** (e.g., `#LATT-101`).

3. **Step 3: Cashier Verifies (POS Terminal)**
   - If Cash: Cashier types the cash amount (e.g. ₱500 bill), system shows exact change, marks ticket as **Paid**.
   - If GCash/Maya: Cashier verifies the customer's reference number on screen.

4. **Step 4: Barista Prepares (Kitchen Display System - KDS)**
   - Order appears on Barista's screen with exact recipe specifications.
   - Barista taps **"Start Brewing"** &rarr; taps **"Mark as Ready for Pickup"**.

5. **Step 5: Automatic Inventory Deduction & Stock Alerts**
   - System automatically deducts beans, milk, and cups used.
   - If stock falls below safety levels, the Admin Dashboard shows a red **Low Stock Alert**.

---

## 4. User Roles & Quick Access PINs

| Role | Quick PIN | Access Scope |
|---|---|---|
| **Customer** | None (Open) | Self-ordering kiosk, drink customizer, payment, digital ticket. |
| **Cashier** | `2222` | Payment queue, cash change calculator, verify GCash/Maya, print receipt. |
| **Staff / Barista** | `3333` | Kitchen Display System (KDS Kanban), incoming recipes, order status advance. |
| **Admin / Owner** | `1234` | Executive Dashboard (sales, orders, AOV), user accounts, menu prices, inventory restock. |

---

## 5. Unique Standout Feature: Automatic Dual-Layout (No Button)

- **Mobile View**: Automatically activates on smartphones (width &lt; 768px or vertical portrait orientation). Displays single-column cards, category pills, slide-up customizer and checkout sheets.
- **PC / Kiosk Split View**: Automatically activates on widescreen monitors or kiosk tablets (&ge; 768px). Features a 3-column split view: Category sidebar, menu grid, and persistent live order tray.
- **Pure Automatic**: Switches on its own when the screen resizes or device rotates—**no manual button required**.

---

## 6. Anticipated Panel Questions & Ready Answers (Cheat Sheet)

* **Q1: "Why did you use Capacitor instead of making two completely separate apps?"**  
  *Answer:* *"Capacitor lets us maintain a single, synchronized codebase. This eliminates bugs between web and mobile, saves development time, and keeps maintenance costs low for small local businesses in Kabacan, while still giving us real native Android APKs and iOS apps."*

* **Q2: "What happens if internet connection is lost in Kabacan?"**  
  *Answer:* *"The native Android APK runs 100% locally on the device using local database persistence. It can browse the menu, customize drinks, and issue cash queue tickets completely offline without needing the internet or a host PC."*

* **Q3: "How does the system ensure ingredients don't run out?"**  
  *Answer:* *"Every menu item is connected to exact recipe ingredient quantities. Placing an order immediately deducts stock. When any item drops to or below its minimum threshold, the Admin Dashboard immediately raises a red Low-Stock Alert banner."*

* **Q4: "Why is there no button to toggle mobile view?"**  
  *Answer:* *"In a real-world kiosk, customers should never be forced to fiddle with layout settings. The app uses automatic responsive viewport observers to seamlessly switch between mobile and kiosk layouts on the fly."*
