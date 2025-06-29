import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class AccountSetupScreen extends StatefulWidget {
  final GoogleSignInAccount googleAccount;
  
  const AccountSetupScreen({
    Key? key,
    required this.googleAccount,
  }) : super(key: key);

  @override
  State<AccountSetupScreen> createState() => _AccountSetupScreenState();
}

class _AccountSetupScreenState extends State<AccountSetupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _phoneController = TextEditingController();
  final _roomController = TextEditingController();
  
  String? selectedGender;
  String? selectedHostel;
  File? _profileImage;
  final ImagePicker _picker = ImagePicker();
  
  String userName = '';
  String userCampus = '';
  bool _isLoading = false;
  
  // Hostel options for each campus
  final Map<String, List<String>> hostelsByCampus = {
    'Hyderabad': [
      'Kiran', 'Meera', 'Vyas', 'Malviya', 'Gandhi', 'Ram', 'Krishna', 
      'CVR', 'VKV', 'Shankar', 'Bhagirath', 'Ashoka'
    ],
    'Goa': [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
    ],
    'Pilani': [
      'AH-1', 'AH-2', 'AH-3', 'AH-4', 'AH-5', 'AH-6', 'AH-7', 'AH-8', 'AH-9',
      'BH-1', 'BH-2', 'BH-3', 'BH-4', 'CH-1', 'CH-2', 'CH-3',
      'DH-1', 'DH-2', 'DH-3', 'DH-4'
    ],
  };

  @override
  void initState() {
    super.initState();
    _extractUserInfo();
  }

  void _extractUserInfo() {
    // Extract name from email (before @)
    userName = widget.googleAccount.displayName ?? 
               widget.googleAccount.email.split('@')[0].replaceAll('.', ' ');
    
    // Extract campus from email domain
    String email = widget.googleAccount.email;
    if (email.contains('@hyderabad.bits-pilani.ac.in')) {
      userCampus = 'Hyderabad';
    } else if (email.contains('@goa.bits-pilani.ac.in')) {
      userCampus = 'Goa';
    } else if (email.contains('@pilani.bits-pilani.ac.in')) {
      userCampus = 'Pilani';
    }
  }

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 512,
        maxHeight: 512,
        imageQuality: 80,
      );
      
      if (image != null) {
        setState(() {
          _profileImage = File(image.path);
        });
      }
    } catch (e) {
      _showSnackBar('Error picking image: $e');
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: const Color(0xFF1DB954),
      ),
    );
  }

  Future<void> _completeSetup() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      try {
        // Here you would typically save the user data to your backend
        print('Setup completed for: $userName');
        print('Campus: $userCampus');
        print('Phone: ${_phoneController.text}');
        print('Gender: $selectedGender');
        print('Hostel: $selectedHostel');
        print('Room: ${_roomController.text}');

        // Simulate API call delay
        await Future.delayed(const Duration(seconds: 2));

        _showSnackBar('Account setup completed successfully!');

        // Navigate to home screen after successful setup
        // Replace this with your actual home screen navigation
        if (mounted) {
          Navigator.pushReplacementNamed(context, '/home');
          // Or if you don't have named routes:
          // Navigator.pushReplacement(
          //   context,
          //   MaterialPageRoute(builder: (context) => HomeScreen()),
          // );
        }
      } catch (e) {
        _showSnackBar('Setup failed. Please try again.');
      } finally {
        if (mounted) {
          setState(() {
            _isLoading = false;
          });
        }
      }
    }
  }

  Future<void> _handleBackPress() async {
    // Show confirmation dialog before going back
    final bool? shouldPop = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: const Color(0xFF1a1a1a),
          title: const Text('Cancel Setup?', style: TextStyle(color: Colors.white)),
          content: const Text(
            'Are you sure you want to cancel the account setup? Your progress will be lost.',
            style: TextStyle(color: Colors.white70),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Continue Setup', style: TextStyle(color: Color(0xFF1DB954))),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Cancel', style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );

    if (shouldPop == true && mounted) {
      // Sign out the user and navigate back to welcome screen
      await GoogleSignIn().signOut();
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        await _handleBackPress();
        return false; // Prevent default back behavior
      },
      child: Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: _handleBackPress,
          ),
          title: const Text(
            'Setup Your Profile',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
          ),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 20),
                
                // Profile Picture Section
                GestureDetector(
                  onTap: _pickImage,
                  child: Container(
                    width: 120,
                    height: 120,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: const Color(0xFF1a1a1a),
                      border: Border.all(color: const Color(0xFF1DB954), width: 3),
                    ),
                    child: _profileImage != null
                        ? ClipRRect(
                            borderRadius: BorderRadius.circular(60),
                            child: Image.file(
                              _profileImage!,
                              fit: BoxFit.cover,
                            ),
                          )
                        : widget.googleAccount.photoUrl != null
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(60),
                                child: Image.network(
                                  widget.googleAccount.photoUrl!,
                                  fit: BoxFit.cover,
                                ),
                              )
                            : const Icon(
                                Icons.add_a_photo,
                                size: 40,
                                color: Color(0xFF1DB954),
                              ),
                  ),
                ),
                
                const SizedBox(height: 12),
                
                Text(
                  'Tap to ${_profileImage != null || widget.googleAccount.photoUrl != null ? 'change' : 'add'} photo',
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
                
                const SizedBox(height: 40),
                
                // Name Field (Pre-filled, editable)
                _buildTextField(
                  label: 'Full Name',
                  initialValue: userName,
                  onChanged: (value) => userName = value,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your name';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 20),
                
                // Campus Field (Pre-filled, non-editable)
                _buildReadOnlyField('Campus', userCampus),
                
                const SizedBox(height: 20),
                
                // Phone Number Field
                _buildTextField(
                  label: 'Phone Number',
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your phone number';
                    }
                    if (value.length != 10) {
                      return 'Please enter a valid 10-digit phone number';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 20),
                
                // Gender Dropdown
                _buildDropdown(
                  label: 'Gender',
                  value: selectedGender,
                  items: ['Male', 'Female', 'Other', 'Prefer not to say'],
                  onChanged: (value) {
                    setState(() {
                      selectedGender = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Please select your gender';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 20),
                
                // Hostel Dropdown
                _buildDropdown(
                  label: 'Hostel',
                  value: selectedHostel,
                  items: hostelsByCampus[userCampus] ?? [],
                  onChanged: (value) {
                    setState(() {
                      selectedHostel = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Please select your hostel';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 20),
                
                // Room Number Field
                _buildTextField(
                  label: 'Room Number',
                  controller: _roomController,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your room number';
                    }
                    return null;
                  },
                ),
                
                const SizedBox(height: 40),
                
                // Complete Setup Button
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton(
                    onPressed: _isLoading ? null : _completeSetup,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF1DB954),
                      foregroundColor: Colors.white,
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
                              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                            ),
                          )
                        : const Text(
                            'Complete Setup',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                  ),
                ),
                
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required String label,
    TextEditingController? controller,
    String? initialValue,
    TextInputType? keyboardType,
    Function(String)? onChanged,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          initialValue: initialValue,
          keyboardType: keyboardType,
          onChanged: onChanged,
          validator: validator,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            filled: true,
            fillColor: const Color(0xFF1a1a1a),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFF1DB954), width: 2),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.red, width: 2),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          ),
        ),
      ],
    );
  }

  Widget _buildReadOnlyField(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          decoration: BoxDecoration(
            color: const Color(0xFF1a1a1a),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: const Color(0xFF1DB954), width: 1),
          ),
          child: Row(
            children: [
              Text(
                value,
                style: const TextStyle(color: Colors.white, fontSize: 16),
              ),
              const Spacer(),
              const Icon(
                Icons.verified,
                color: Color(0xFF1DB954),
                size: 20,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildDropdown({
    required String label,
    required String? value,
    required List<String> items,
    required Function(String?) onChanged,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<String>(
          value: value,
          onChanged: onChanged,
          validator: validator,
          dropdownColor: const Color(0xFF1a1a1a),
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            filled: true,
            fillColor: const Color(0xFF1a1a1a),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFF1DB954), width: 2),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.red, width: 2),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          ),
          items: items.map((String item) {
            return DropdownMenuItem<String>(
              value: item,
              child: Text(item),
            );
          }).toList(),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _phoneController.dispose();
    _roomController.dispose();
    super.dispose();
  }
}