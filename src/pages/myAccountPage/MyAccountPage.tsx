// src/pages/myAccountPage/MyAccountPage.tsx
import React, { useState, useRef } from 'react'; // Import useRef for file input

// Importing the local components from the 'components' subfolder
import StatusBar from './components/StatusBar';

const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'settings'

  // --- Profile Data States ---
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Avid reader and book sharer!');
  // State for profile image URL (could be base64, object URL, or server URL)
  // Initialize with a default placeholder image if no actual image is set
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>('https://via.placeholder.com/150/F3E8FF/8B5CF6?text=JD');
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input

  // --- Handlers for Profile Picture ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For previewing, we can use URL.createObjectURL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result as string); // Set the Data URL as image source
      };
      reader.readAsDataURL(file); // Read file as Data URL
      
      // In a real application, you would typically upload this 'file' object to your backend.
      console.log('File selected for upload:', file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImageUrl(null); // Clear the image
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
    console.log('Profile image removed');
    // In a real application, you would send a request to your backend to remove the image.
  };

  const handleEditImage = () => {
    // Programmatically click the hidden file input
    fileInputRef.current?.click();
  };

  // --- Handlers for Form Submissions ---
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile Updated:', { name, email, bio, profileImageUrl });
    alert('Profile updated!');
    // In a real app, send this data to your backend
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send old and new passwords to backend
    console.log('Password changed (mock)');
    alert('Password changed!');
    // Clear password fields (you'd manage these with useState too)
    (e.target as HTMLFormElement).reset(); // Simple way to clear form for demo
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-6 flex items-start justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">My Account</h1>

          {/* Tabs for Profile / Account Settings */}
          <div className="flex justify-center mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-sm font-semibold ${activeTab === 'profile' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`ml-4 px-4 py-2 text-sm font-semibold ${activeTab === 'settings' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Account Settings
            </button>
            {/* Add more tabs here as needed: My Books, Rentals, etc. */}
          </div>

          {/* Content based on active tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>

              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={profileImageUrl || 'https://via.placeholder.com/150/F3E8FF/8B5CF6?text=No+Photo'} // Fallback placeholder
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-md mb-4"
                />
                <div className="flex space-x-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden" // Hide the default file input
                  />
                  <button
                    type="button"
                    onClick={handleEditImage}
                    className="bg-purple-100 text-purple-700 py-1 px-4 rounded-md text-sm hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {profileImageUrl ? 'Change Photo' : 'Add Photo'}
                  </button>
                  {profileImageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-100 text-red-700 py-1 px-4 rounded-md text-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>


              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="bio" className="block text-gray-700 text-sm font-semibold mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Save Profile
              </button>
            </form>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Change Password
              </button>
            </form>
          )}

        </div>
      </main>

      <StatusBar issuesCount={3} /> {/* Local StatusBar for MyAccountPage */}
    </div>
  );
};

export default MyAccountPage;