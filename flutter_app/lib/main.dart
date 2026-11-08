import 'package:flutter/material.dart';
import 'responsive/responsive_layout.dart';
import 'models/models.dart';

void main() {
  runApp(const TapALatteApp());
}

class TapALatteApp extends StatelessWidget {
  const TapALatteApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tap-a-Latte Kiosk System',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFFAF7F2),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFC67C4E), // Warm artisan caramel
          primary: const Color(0xFF2E190E),   // Rich roasted espresso
          secondary: const Color(0xFFC67C4E),
          surface: Colors.white,
        ),
      ),
      home: const MainKioskScreen(),
    );
  }
}

class MainKioskScreen extends StatefulWidget {
  const MainKioskScreen({Key? key}) : super(key: key);

  @override
  State<MainKioskScreen> createState() => _MainKioskScreenState();
}

class _MainKioskScreenState extends State<MainKioskScreen> {
  UserRole _activeRole = UserRole.customer;

  void _switchRole(UserRole role) {
    setState(() {
      _activeRole = role;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2E190E),
        foregroundColor: Colors.white,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFFC67C4E),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.coffee, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Tap-a-Latte',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
                Text(
                  'Kabacan, North Cotabato • Kiosk System',
                  style: TextStyle(fontSize: 10, color: Color(0xFFD5B79F)),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Role Persona Switcher Pill
          PopupMenuButton<UserRole>(
            initialValue: _activeRole,
            onSelected: _switchRole,
            child: Container(
              margin: const EdgeInsets.only(right: 16),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: const Color(0xFF4A2D1C),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFC67C4E)),
              ),
              child: Row(
                children: [
                  Icon(_getRoleIcon(_activeRole), size: 16, color: Colors.white),
                  const SizedBox(width: 6),
                  Text(
                    _getRoleName(_activeRole),
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                  const Icon(Icons.arrow_drop_down, size: 16),
                ],
              ),
            ),
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: UserRole.customer,
                child: Text('📱 Customer Kiosk View'),
              ),
              const PopupMenuItem(
                value: UserRole.cashier,
                child: Text('💳 Cashier POS View'),
              ),
              const PopupMenuItem(
                value: UserRole.staff,
                child: Text('☕ Staff / Barista KDS View'),
              ),
              const PopupMenuItem(
                value: UserRole.admin,
                child: Text('👑 Admin / Owner Dashboard'),
              ),
            ],
          ),
        ],
      ),
      // Automatic Dual-Layout: No button needed, changes seamlessly on size / orientation
      body: ResponsiveLayout(
        mobileView: _buildMobileView(),
        desktopView: _buildDesktopView(),
      ),
    );
  }

  IconData _getRoleIcon(UserRole role) {
    switch (role) {
      case UserRole.admin: return Icons.shield;
      case UserRole.cashier: return Icons.point_of_sale;
      case UserRole.staff: return Icons.local_cafe;
      case UserRole.customer: default: return Icons.phone_android;
    }
  }

  String _getRoleName(UserRole role) {
    switch (role) {
      case UserRole.admin: return 'Admin';
      case UserRole.cashier: return 'Cashier';
      case UserRole.staff: return 'Barista';
      case UserRole.customer: default: return 'Customer Kiosk';
    }
  }

  Widget _buildMobileView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.smartphone, size: 48, color: Color(0xFFC67C4E)),
          const SizedBox(height: 12),
          Text(
            '📱 Automatic Mobile View Active (${_getRoleName(_activeRole)})',
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 6),
          const Text(
            'Touch-optimized layout with bottom navigation & gesture sheets.',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.desktop_windows, size: 48, color: Color(0xFF2E190E)),
          const SizedBox(height: 12),
          Text(
            '🖥️ Automatic PC / Kiosk Split View Active (${_getRoleName(_activeRole)})',
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 6),
          const Text(
            'Dual-column widescreen layout with persistent live order tray.',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
