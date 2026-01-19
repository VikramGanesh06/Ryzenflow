import React, { useState, useRef } from 'react';
import { User, Lock, Settings, LogOut, Upload, X, Eye, EyeOff, Smartphone, Monitor, Check } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useToast, ToastContainer } from './Toast';

interface ProfileUser {
  fullName: string;
  email: string;
  jobTitle: string;
  company: string;
  timeZone: string;
  avatar: string | null;
}

interface AccountSettings {
  username: string;
  workspaceName: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export const Profile: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState<ProfileUser>({
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    jobTitle: 'Product Manager',
    company: 'Tech Innovations Inc',
    timeZone: 'UTC-5 (EST)',
    avatar: null
  });

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    username: 'alexjohnson',
    workspaceName: 'Tech Innovations',
    language: 'English',
    theme: 'system'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toasts, addToast, removeToast } = useToast();

  const activeSessions = [
    { id: 1, name: 'Chrome - Windows', lastActive: 'Now', location: 'New York, USA' },
    { id: 2, name: 'Safari - iPhone', lastActive: '2 hours ago', location: 'San Francisco, USA' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      addToast('File size exceeds 5MB limit', 'error');
      return;
    }

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      addToast('Only JPG and PNG files are supported', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
      addToast('Image preview ready', 'info');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setIsEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      addToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword.length < 8) {
      addToast('Password must be at least 8 characters', 'error');
      return;
    }

    // Simulate password change
    addToast('Password changed successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setShowPasswordForm(false);
  };

  const handleToggle2FA = () => {
    if (!twoFAEnabled) {
      addToast('Two-factor authentication enabled', 'success');
    } else {
      addToast('Two-factor authentication disabled', 'success');
    }
    setTwoFAEnabled(!twoFAEnabled);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      addToast('Logged out successfully', 'success');
      if (onLogout) onLogout();
    } catch {
      addToast('Failed to logout', 'error');
    }
  };

  const getUserInitials = () => {
    return profileData.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-2">
              <button
                onClick={() => setActiveSection('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === 'profile'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User size={18} />
                  Profile
                </div>
              </button>
              <button
                onClick={() => setActiveSection('account')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === 'account'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings size={18} />
                  Account
                </div>
              </button>
              <button
                onClick={() => setActiveSection('security')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === 'security'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock size={18} />
                  Security
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-700 hover:bg-red-50 transition-all mt-4"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={18} />
                  Logout
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Information</h2>

                  {/* Avatar Section */}
                  <div className="mb-8 pb-8 border-b border-slate-200">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {formData.avatar ? (
                          <img
                            src={formData.avatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl border-4 border-emerald-100">
                            {getUserInitials()}
                          </div>
                        )}
                        {isEditing && (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
                          >
                            <Upload size={16} />
                          </button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Profile Picture</h3>
                        <p className="text-sm text-slate-600 mb-3">JPG or PNG, max 5MB</p>
                        {isEditing && (
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={isEditing ? formData.fullName : profileData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={isEditing ? formData.email : profileData.email}
                          disabled
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-slate-500 mt-2">Email cannot be changed</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          value={isEditing ? formData.jobTitle : profileData.jobTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Company</label>
                        <input
                          type="text"
                          value={isEditing ? formData.company : profileData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Time Zone</label>
                      <select
                        value={isEditing ? formData.timeZone : profileData.timeZone}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeZone: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
                      >
                        <option>UTC-5 (EST)</option>
                        <option>UTC-6 (CST)</option>
                        <option>UTC-7 (MST)</option>
                        <option>UTC-8 (PST)</option>
                        <option>UTC (GMT)</option>
                        <option>UTC+1 (CET)</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-8">
                    {!isEditing ? (
                      <button
                        onClick={() => {
                          setFormData(profileData);
                          setIsEditing(true);
                        }}
                        className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2"
                        >
                          <Check size={18} />
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setFormData(profileData);
                            setIsEditing(false);
                          }}
                          className="px-6 py-3 bg-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-300 transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Section */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                      <input
                        type="text"
                        value={accountSettings.username}
                        onChange={(e) => setAccountSettings(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Workspace Name</label>
                      <input
                        type="text"
                        value={accountSettings.workspaceName}
                        onChange={(e) => setAccountSettings(prev => ({ ...prev, workspaceName: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Language</label>
                        <select
                          value={accountSettings.language}
                          onChange={(e) => setAccountSettings(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Theme</label>
                        <select
                          value={accountSettings.theme}
                          onChange={(e) => setAccountSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => addToast('Account settings saved', 'success')}
                      className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Change Password</h2>

                  {!showPasswordForm ? (
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all"
                    >
                      Change Password
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter your current password"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password (min. 8 characters)"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleChangePassword}
                          className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordForm(false);
                            setCurrentPassword('');
                            setNewPassword('');
                          }}
                          className="px-6 py-3 bg-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-300 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={handleToggle2FA}
                      className={`px-6 py-3 font-bold rounded-lg transition-all ${
                        twoFAEnabled
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                    >
                      {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>

                  <div className={`p-4 rounded-lg ${twoFAEnabled ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50 border border-slate-200'}`}>
                    <p className={`text-sm ${twoFAEnabled ? 'text-emerald-800' : 'text-slate-700'}`}>
                      {twoFAEnabled
                        ? '✓ Two-factor authentication is enabled on your account'
                        : 'Two-factor authentication is currently disabled'}
                    </p>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Active Sessions</h3>

                  <div className="space-y-4">
                    {activeSessions.map(session => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                            {session.name.includes('iPhone') ? <Smartphone size={20} /> : <Monitor size={20} />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{session.name}</p>
                            <p className="text-xs text-slate-600">{session.location} • {session.lastActive}</p>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 font-bold text-sm transition-colors">
                          Sign Out
                        </button>
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 px-6 py-3 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-all">
                    Sign Out From All Devices
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};
