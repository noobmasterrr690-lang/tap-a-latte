import 'package:flutter/material.dart';

/// ResponsiveLayout automatically swaps between the Dedicated Mobile View
/// and the Dedicated Desktop / Kiosk View upon window resize or device orientation change.
/// No manual toggle buttons are used.
class ResponsiveLayout extends StatelessWidget {
  final Widget mobileView;
  final Widget desktopView;

  const ResponsiveLayout({
    Key? key,
    required this.mobileView,
    required this.desktopView,
  }) : super(key: key);

  static bool isMobile(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final orientation = MediaQuery.of(context).orientation;
    // Automatic mobile detection: width < 768 OR portrait orientation under 900px
    return size.width < 768 || (orientation == Orientation.portrait && size.width < 900);
  }

  static bool isDesktop(BuildContext context) {
    return !isMobile(context);
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final orientation = MediaQuery.of(context).orientation;
        final isMobileMode = constraints.maxWidth < 768 ||
            (orientation == Orientation.portrait && constraints.maxWidth < 900);

        if (isMobileMode) {
          return mobileView;
        } else {
          return desktopView;
        }
      },
    );
  }
}
