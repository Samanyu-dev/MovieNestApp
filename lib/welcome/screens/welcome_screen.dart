import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'account_setup_screen.dart'; // Import the account setup screen

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({Key? key}) : super(key: key);

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  bool _isLoading = false;

  // Movie poster URLs - replace with your actual movie poster assets
  final List<String> moviePosters = [
    'assets/images/movie1.jpg',
    'assets/images/movie2.jpg', 
    'assets/images/movie3.jpg',
    'assets/images/movie4.jpg',
    'assets/images/movie5.jpg',
    'assets/images/movie6.jpg',
    'assets/images/movie7.jpg',
    'assets/images/movie8.jpg',
    'assets/images/movie9.jpg',
  ];

  // Valid BITS Pilani email domains
  final List<String> validDomains = [
    '@hyderabad.bits-pilani.ac.in',
    '@goa.bits-pilani.ac.in',
    '@pilani.bits-pilani.ac.in',
  ];

  bool _isValidEmail(String email) {
    return validDomains.any((domain) => email.endsWith(domain));
  }

  Future<void> _signInWithGoogle() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final GoogleSignInAccount? account = await _googleSignIn.signIn();
      
      if (account != null) {
        if (_isValidEmail(account.email)) {
          // Valid BITS Pilani email - navigate to account setup
          print('Sign in successful: ${account.email}');
          
          // Navigate to AccountSetupScreen
          if (mounted) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => AccountSetupScreen(
                  googleAccount: account,
                ),
              ),
            );
          }
        } else {
          // Invalid email domain
          await _googleSignIn.signOut();
          _showErrorDialog('Please use your BITS Pilani email address to sign in.');
        }
      }
    } catch (error) {
      print('Sign in error: $error');
      _showErrorDialog('Sign in failed. Please try again.');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: const Color(0xFF1a1a1a),
          title: const Text('Authentication Error', style: TextStyle(color: Colors.white)),
          content: Text(message, style: const TextStyle(color: Colors.white70)),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK', style: TextStyle(color: Color(0xFF1DB954))),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Movie posters grid background
          GridView.builder(
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              childAspectRatio: 0.7,
              crossAxisSpacing: 2,
              mainAxisSpacing: 2,
            ),
            itemCount: moviePosters.length,
            itemBuilder: (context, index) {
              return Container(
                decoration: BoxDecoration(
                  color: Colors.grey[800],
                  image: DecorationImage(
                    // Use AssetImage for local assets or NetworkImage for URLs
                    image: AssetImage(moviePosters[index]),
                    fit: BoxFit.cover,
                    onError: (exception, stackTrace) {
                      // Handle image loading error
                    },
                  ),
                ),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.4),
                  ),
                ),
              );
            },
          ),
          
          // Gradient overlay
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  Colors.transparent,
                  Color(0xCC000000),
                  Color(0xF0000000),
                  Colors.black,
                ],
                stops: [0.0, 0.3, 0.6, 0.8, 1.0],
              ),
            ),
          ),

          // Content
          SafeArea(
            child: Column(
              children: [
                const Spacer(flex: 2),
                
                // App logo/icon
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: const Color(0xFF1DB954),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Icon(
                    Icons.movie,
                    color: Colors.white,
                    size: 40,
                  ),
                ),
                
                const SizedBox(height: 40),
                
                // Title
                const Text(
                  'Millions of movies.',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                
                const Text(
                  'Free for BITS students.',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                
                const Spacer(flex: 1),
                
                // Sign in button
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Column(
                    children: [
                      // Google Sign In Button
                      SizedBox(
                        width: double.infinity,
                        height: 56,
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : _signInWithGoogle,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.white,
                            foregroundColor: Colors.black,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(28),
                            ),
                            elevation: 0,
                          ),
                          child: _isLoading
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(Colors.black),
                                  ),
                                )
                              : Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.asset(
                                      'assets/images/google_logo.png', // Add Google logo asset
                                      height: 20,
                                      width: 20,
                                    ),
                                    const SizedBox(width: 12),
                                    const Text(
                                      'Continue with Google',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                        ),
                      ),
                      
                      const SizedBox(height: 20),
                      
                      // Info text
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 16.0),
                        child: Text(
                          'Sign in with your BITS Pilani email address\n(@hyderabad, @goa, or @pilani)',
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 14,
                            height: 1.4,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 40),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Usage in main.dart or your app:
class MovieApp extends StatelessWidget {
  const MovieApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CineVerse',
      theme: ThemeData(
        primarySwatch: Colors.green,
        brightness: Brightness.dark,
      ),
      home: const WelcomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}